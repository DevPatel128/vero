import Foundation
import SwiftData
import CryptoKit

@MainActor
final class AuthService {
    private let context: ModelContext
    private let signingKey: SymmetricKey
    private let encryptionKey: SymmetricKey

    init(context: ModelContext) throws {
        self.context = context
        self.signingKey = try KeychainStore.loadOrCreateKey(.signingKey)
        self.encryptionKey = try KeychainStore.loadOrCreateKey(.encryptionKey)
    }

    var currentUser: UserAccount? {
        guard let raw = KeychainStore.getString(.sessionToken) else { return nil }
        do {
            let token = try TokenSigner.verify(raw, key: signingKey)
            let userId = token.userId
            var descriptor = FetchDescriptor<UserAccount>(predicate: #Predicate { $0.id == userId })
            descriptor.fetchLimit = 1
            return try context.fetch(descriptor).first
        } catch {
            try? KeychainStore.delete(.sessionToken)
            return nil
        }
    }

    func register(displayName: String, email: String, password: String) throws -> UserAccount {
        let trimmedEmail = email.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        guard trimmedEmail.contains("@"), trimmedEmail.count >= 5 else { throw AuthError.invalidEmail }
        guard password.count >= 8 else { throw AuthError.weakPassword }
        let username = displayName.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        guard !username.isEmpty else { throw AuthError.invalidDisplayName }

        let emailHash = sha256(trimmedEmail)
        let dupDescriptor = FetchDescriptor<UserAccount>(predicate: #Predicate { $0.emailHash == emailHash })
        if try context.fetch(dupDescriptor).first != nil {
            throw AuthError.emailTaken
        }
        let userDescriptor = FetchDescriptor<UserAccount>(predicate: #Predicate { $0.usernameLower == username })
        if try context.fetch(userDescriptor).first != nil {
            throw AuthError.usernameTaken
        }

        let pwHash = try PasswordHasher.hash(password)
        let emailEnc = try Encryption.encrypt(trimmedEmail, key: encryptionKey)
        let user = UserAccount(
            usernameLower: username,
            displayName: displayName.trimmingCharacters(in: .whitespacesAndNewlines),
            emailEncrypted: emailEnc,
            emailHash: emailHash,
            passwordHash: pwHash
        )
        for d in Domain.allCases {
            user.domains.append(DomainProgress(domain: d))
        }
        user.trust = TrustScoreRecord()
        context.insert(user)
        try context.save()
        try issueToken(for: user)
        return user
    }

    func login(email: String, password: String) throws -> UserAccount {
        let trimmedEmail = email.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        let emailHash = sha256(trimmedEmail)
        let descriptor = FetchDescriptor<UserAccount>(predicate: #Predicate { $0.emailHash == emailHash })
        guard let user = try context.fetch(descriptor).first else { throw AuthError.invalidCredentials }
        guard PasswordHasher.verify(password, against: user.passwordHash) else { throw AuthError.invalidCredentials }
        user.lastLoginAt = Date()
        try context.save()
        try issueToken(for: user)
        return user
    }

    func logout() {
        try? KeychainStore.delete(.sessionToken)
    }

    func decryptEmail(_ user: UserAccount) -> String {
        (try? Encryption.decrypt(user.emailEncrypted, key: encryptionKey)) ?? ""
    }

    private func issueToken(for user: UserAccount) throws {
        let token = SessionToken(userId: user.id, issuedAt: Date(), expiresAt: Date().addingTimeInterval(60 * 60 * 24 * 30))
        let signed = try TokenSigner.sign(token, key: signingKey)
        try KeychainStore.setString(signed, for: .sessionToken)
    }

    private func sha256(_ s: String) -> String {
        let digest = SHA256.hash(data: Data(s.utf8))
        return digest.map { String(format: "%02x", $0) }.joined()
    }
}

enum AuthError: LocalizedError {
    case invalidEmail
    case invalidDisplayName
    case weakPassword
    case emailTaken
    case usernameTaken
    case invalidCredentials

    var errorDescription: String? {
        switch self {
        case .invalidEmail: return "Enter a valid email address."
        case .invalidDisplayName: return "Display name cannot be empty."
        case .weakPassword: return "Password must be at least 8 characters."
        case .emailTaken: return "An account with that email already exists."
        case .usernameTaken: return "That display name is already taken."
        case .invalidCredentials: return "Incorrect email or password."
        }
    }
}
