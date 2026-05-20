import Foundation
import CryptoKit

enum Encryption {
    static func encrypt(_ plaintext: String, key: SymmetricKey) throws -> String {
        guard let data = plaintext.data(using: .utf8) else { throw CryptoError.encryptionFailure }
        let sealed = try AES.GCM.seal(data, using: key)
        guard let combined = sealed.combined else { throw CryptoError.encryptionFailure }
        return combined.base64EncodedString()
    }

    static func decrypt(_ ciphertext: String, key: SymmetricKey) throws -> String {
        guard let data = Data(base64Encoded: ciphertext) else { throw CryptoError.decryptionFailure }
        let box = try AES.GCM.SealedBox(combined: data)
        let opened = try AES.GCM.open(box, using: key)
        guard let str = String(data: opened, encoding: .utf8) else { throw CryptoError.decryptionFailure }
        return str
    }

    static func encryptData(_ plain: Data, key: SymmetricKey) throws -> Data {
        let sealed = try AES.GCM.seal(plain, using: key)
        guard let combined = sealed.combined else { throw CryptoError.encryptionFailure }
        return combined
    }

    static func decryptData(_ ciphertext: Data, key: SymmetricKey) throws -> Data {
        let box = try AES.GCM.SealedBox(combined: ciphertext)
        return try AES.GCM.open(box, using: key)
    }
}
