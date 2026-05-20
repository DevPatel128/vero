import Foundation
import CryptoKit
import CommonCrypto

enum PasswordHasher {
    static let iterations: UInt32 = 210_000
    static let saltLength = 16
    static let keyLength = 32

    static func hash(_ password: String) throws -> String {
        var salt = Data(count: saltLength)
        let status = salt.withUnsafeMutableBytes { ptr in
            SecRandomCopyBytes(kSecRandomDefault, saltLength, ptr.baseAddress!)
        }
        guard status == errSecSuccess else { throw CryptoError.randomFailure }
        let derived = try pbkdf2(password: password, salt: salt)
        return "pbkdf2-sha512$\(iterations)$\(salt.base64EncodedString())$\(derived.base64EncodedString())"
    }

    static func verify(_ password: String, against encoded: String) -> Bool {
        let parts = encoded.split(separator: "$", omittingEmptySubsequences: false).map(String.init)
        guard parts.count == 4,
              parts[0] == "pbkdf2-sha512",
              let iter = UInt32(parts[1]),
              let salt = Data(base64Encoded: parts[2]),
              let expected = Data(base64Encoded: parts[3])
        else { return false }
        do {
            let derived = try pbkdf2(password: password, salt: salt, iterations: iter, length: expected.count)
            return constantTimeEqual(derived, expected)
        } catch {
            return false
        }
    }

    private static func pbkdf2(password: String, salt: Data, iterations: UInt32? = nil, length: Int? = nil) throws -> Data {
        let iter = iterations ?? self.iterations
        let len = length ?? keyLength
        let passwordBytes = Array(password.utf8)
        var derived = Data(count: len)
        let status = derived.withUnsafeMutableBytes { derivedPtr in
            salt.withUnsafeBytes { saltPtr in
                CCKeyDerivationPBKDF(
                    CCPBKDFAlgorithm(kCCPBKDF2),
                    passwordBytes, passwordBytes.count,
                    saltPtr.bindMemory(to: UInt8.self).baseAddress, salt.count,
                    CCPseudoRandomAlgorithm(kCCPRFHmacAlgSHA512),
                    iter,
                    derivedPtr.bindMemory(to: UInt8.self).baseAddress, len
                )
            }
        }
        guard status == kCCSuccess else { throw CryptoError.kdfFailure }
        return derived
    }

    private static func constantTimeEqual(_ a: Data, _ b: Data) -> Bool {
        guard a.count == b.count else { return false }
        var diff: UInt8 = 0
        for i in 0..<a.count { diff |= a[i] ^ b[i] }
        return diff == 0
    }
}

enum CryptoError: Error {
    case randomFailure
    case kdfFailure
    case encryptionFailure
    case decryptionFailure
    case keyMissing
    case tokenInvalid
}
