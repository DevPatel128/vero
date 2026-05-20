import Foundation

struct GameSessionSummary {
    let platform: GamePlatform
    let title: String
    let externalId: String
    let handle: String
    let startedAt: Date
    let endedAt: Date
    let minutes: Int
    let ranked: Bool
    let outcome: String?
    let difficulty: Difficulty
    let signature: String
}

protocol GamePlatformAdapter {
    var platform: GamePlatform { get }
    func resolve(handle: String) async throws -> (externalId: String, displayName: String)
    func fetchRecent(account: GameAccount, since: Date) async throws -> [GameSessionSummary]
}

enum GameAdapterError: LocalizedError {
    case invalidHandle
    case notFound
    case httpError(Int)
    case missingCredentials(String)
    case decodeFailed

    var errorDescription: String? {
        switch self {
        case .invalidHandle: return "Username is empty or invalid."
        case .notFound: return "Account not found on that platform."
        case .httpError(let code): return "Platform returned HTTP \(code)."
        case .missingCredentials(let key): return "\(key) not configured. Add to Info.plist."
        case .decodeFailed: return "Could not parse platform response."
        }
    }
}

enum AdapterRegistry {
    static let all: [GamePlatform: GamePlatformAdapter] = [
        .steam: SteamAdapter(),
        .chessDotCom: ChessDotComAdapter(),
        .lichess: LichessAdapter(),
        .gameCenter: GameCenterAdapter(),
        .xbox: XboxAdapter(),
    ]

    static func adapter(for platform: GamePlatform) -> GamePlatformAdapter {
        all[platform] ?? SteamAdapter()
    }
}

enum AdapterHTTP {
    static func getJSON<T: Decodable>(_ url: URL, headers: [String: String] = [:]) async throws -> T {
        var req = URLRequest(url: url)
        req.timeoutInterval = 20
        headers.forEach { req.setValue($1, forHTTPHeaderField: $0) }
        let (data, resp) = try await URLSession.shared.data(for: req)
        guard let http = resp as? HTTPURLResponse else { throw GameAdapterError.httpError(0) }
        guard (200..<300).contains(http.statusCode) else {
            if http.statusCode == 404 { throw GameAdapterError.notFound }
            throw GameAdapterError.httpError(http.statusCode)
        }
        do { return try JSONDecoder().decode(T.self, from: data) }
        catch { throw GameAdapterError.decodeFailed }
    }

    static func infoPlistKey(_ key: String) -> String? {
        guard let v = Bundle.main.object(forInfoDictionaryKey: key) as? String, !v.isEmpty else { return nil }
        return v
    }
}
