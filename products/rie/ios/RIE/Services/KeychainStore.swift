import Foundation
import Security
import CryptoKit

enum KeychainStore {
    static let service = "app.rie.RIE"

    enum Item: String {
        case sessionToken = "session.token"
        case encryptionKey = "encryption.key"
        case signingKey = "signing.key"
    }

    static func set(_ data: Data, for item: Item) throws {
        try delete(item)
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: item.rawValue,
            kSecValueData as String: data,
            kSecAttrAccessible as String: kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly,
        ]
        let status = SecItemAdd(query as CFDictionary, nil)
        guard status == errSecSuccess else { throw KeychainError.write(status) }
    }

    static func get(_ item: Item) -> Data? {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: item.rawValue,
            kSecReturnData as String: true,
            kSecMatchLimit as String: kSecMatchLimitOne,
        ]
        var result: AnyObject?
        let status = SecItemCopyMatching(query as CFDictionary, &result)
        guard status == errSecSuccess else { return nil }
        return result as? Data
    }

    static func delete(_ item: Item) throws {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: item.rawValue,
        ]
        let status = SecItemDelete(query as CFDictionary)
        guard status == errSecSuccess || status == errSecItemNotFound else {
            throw KeychainError.delete(status)
        }
    }

    static func loadOrCreateKey(_ item: Item, byteCount: Int = 32) throws -> SymmetricKey {
        if let existing = get(item) {
            return SymmetricKey(data: existing)
        }
        let key = SymmetricKey(size: .bits256)
        let data = key.withUnsafeBytes { Data($0) }
        try set(data, for: item)
        return SymmetricKey(data: data)
    }

    static func setString(_ s: String, for item: Item) throws {
        guard let data = s.data(using: .utf8) else { throw KeychainError.encoding }
        try set(data, for: item)
    }

    static func getString(_ item: Item) -> String? {
        guard let data = get(item) else { return nil }
        return String(data: data, encoding: .utf8)
    }
}

enum KeychainError: Error {
    case write(OSStatus)
    case delete(OSStatus)
    case encoding
}
