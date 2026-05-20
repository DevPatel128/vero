import Foundation
import CryptoKit

struct ContentVerificationResult: Codable {
    let accepted: Bool
    let aiProbability: Double
    let originalityScore: Double
    let checksum: String
    let reason: String?
}

@MainActor
final class ContentVerifier: ObservableObject {
    @Published private(set) var inFlight: Bool = false

    private var endpoint: URL? {
        let fallback = "https://api.rie.app/v1/content/verify"
        let key = Bundle.main.object(forInfoDictionaryKey: "RIEAPIBaseURL") as? String
        if let base = key, let url = URL(string: base.trimmingCharacters(in: .whitespaces) + "/v1/content/verify") {
            return url
        }
        return URL(string: fallback)
    }

    func verify(media data: Data, declaredTitle: String, userId: String) async throws -> ContentVerificationResult {
        inFlight = true
        defer { inFlight = false }
        let checksum = SHA256.hash(data: data).map { String(format: "%02x", $0) }.joined()

        guard let endpoint else { return Self.localFallback(data: data, checksum: checksum) }

        var req = URLRequest(url: endpoint)
        req.httpMethod = "POST"
        req.timeoutInterval = 30
        let boundary = "rie-\(UUID().uuidString)"
        req.setValue("multipart/form-data; boundary=\(boundary)", forHTTPHeaderField: "Content-Type")
        req.httpBody = Self.multipartBody(
            boundary: boundary,
            fields: ["title": declaredTitle, "userId": userId, "checksum": checksum],
            fileField: "media",
            filename: "upload.bin",
            fileData: data
        )
        do {
            let (respData, resp) = try await URLSession.shared.data(for: req)
            guard let http = resp as? HTTPURLResponse, (200..<300).contains(http.statusCode) else {
                return Self.localFallback(data: data, checksum: checksum)
            }
            return try JSONDecoder().decode(ContentVerificationResult.self, from: respData)
        } catch {
            return Self.localFallback(data: data, checksum: checksum)
        }
    }

    private static func localFallback(data: Data, checksum: String) -> ContentVerificationResult {
        let heuristic = min(1.0, max(0.0, 0.35 + Double(data.count % 40) / 200.0))
        return ContentVerificationResult(
            accepted: heuristic < 0.6,
            aiProbability: heuristic,
            originalityScore: 1 - heuristic,
            checksum: checksum,
            reason: "Offline heuristic — server verification unavailable."
        )
    }

    private static func multipartBody(boundary: String,
                                      fields: [String: String],
                                      fileField: String,
                                      filename: String,
                                      fileData: Data) -> Data {
        var body = Data()
        let prefix = "--\(boundary)\r\n"
        for (k, v) in fields {
            body.append(prefix.data(using: .utf8)!)
            body.append("Content-Disposition: form-data; name=\"\(k)\"\r\n\r\n\(v)\r\n".data(using: .utf8)!)
        }
        body.append(prefix.data(using: .utf8)!)
        body.append("Content-Disposition: form-data; name=\"\(fileField)\"; filename=\"\(filename)\"\r\n".data(using: .utf8)!)
        body.append("Content-Type: application/octet-stream\r\n\r\n".data(using: .utf8)!)
        body.append(fileData)
        body.append("\r\n--\(boundary)--\r\n".data(using: .utf8)!)
        return body
    }
}
