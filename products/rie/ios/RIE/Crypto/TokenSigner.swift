import Foundation
import CryptoKit

struct SessionToken: Codable, Equatable {
    let userId: String
    let issuedAt: Date
    let expiresAt: Date
}

enum TokenSigner {
    static func sign(_ token: SessionToken, key: SymmetricKey) throws -> String {
        let header = #"{"alg":"HS256","typ":"JWT"}"#
        let headerB64 = base64URL(Data(header.utf8))
        let payload = try JSONEncoder.iso.encode(token)
        let payloadB64 = base64URL(payload)
        let signingInput = "\(headerB64).\(payloadB64)"
        let sig = HMAC<SHA256>.authenticationCode(for: Data(signingInput.utf8), using: key)
        let sigB64 = base64URL(Data(sig))
        return "\(signingInput).\(sigB64)"
    }

    static func verify(_ jwt: String, key: SymmetricKey) throws -> SessionToken {
        let parts = jwt.split(separator: ".").map(String.init)
        guard parts.count == 3 else { throw CryptoError.tokenInvalid }
        let signingInput = "\(parts[0]).\(parts[1])"
        guard let sigData = base64URLDecode(parts[2]) else { throw CryptoError.tokenInvalid }
        let isValid = HMAC<SHA256>.isValidAuthenticationCode(
            sigData,
            authenticating: Data(signingInput.utf8),
            using: key
        )
        guard isValid else { throw CryptoError.tokenInvalid }
        guard let payloadData = base64URLDecode(parts[1]) else { throw CryptoError.tokenInvalid }
        let token = try JSONDecoder.iso.decode(SessionToken.self, from: payloadData)
        guard token.expiresAt > Date() else { throw CryptoError.tokenInvalid }
        return token
    }

    private static func base64URL(_ data: Data) -> String {
        data.base64EncodedString()
            .replacingOccurrences(of: "+", with: "-")
            .replacingOccurrences(of: "/", with: "_")
            .replacingOccurrences(of: "=", with: "")
    }

    private static func base64URLDecode(_ s: String) -> Data? {
        var str = s.replacingOccurrences(of: "-", with: "+").replacingOccurrences(of: "_", with: "/")
        while str.count % 4 != 0 { str += "=" }
        return Data(base64Encoded: str)
    }
}

extension JSONEncoder {
    static let iso: JSONEncoder = {
        let e = JSONEncoder()
        e.dateEncodingStrategy = .iso8601
        return e
    }()
}

extension JSONDecoder {
    static let iso: JSONDecoder = {
        let d = JSONDecoder()
        d.dateDecodingStrategy = .iso8601
        return d
    }()
}
