import Foundation

struct ChessDotComAdapter: GamePlatformAdapter {
    let platform: GamePlatform = .chessDotCom

    private struct Profile: Decodable {
        let username: String
        let player_id: Int
        let name: String?
    }

    private struct ArchivesList: Decodable { let archives: [String] }

    private struct ArchiveGames: Decodable {
        struct Player: Decodable { let username: String; let rating: Int?; let result: String? }
        struct Game: Decodable {
            let url: String
            let time_class: String?
            let rated: Bool?
            let end_time: Int
            let white: Player
            let black: Player
        }
        let games: [Game]
    }

    func resolve(handle: String) async throws -> (externalId: String, displayName: String) {
        let user = handle.trimmingCharacters(in: .whitespaces).lowercased()
        guard !user.isEmpty else { throw GameAdapterError.invalidHandle }
        let url = URL(string: "https://api.chess.com/pub/player/\(user)")!
        let profile: Profile = try await AdapterHTTP.getJSON(url, headers: ["User-Agent": "RIE-App"])
        return (String(profile.player_id), profile.name ?? profile.username)
    }

    func fetchRecent(account: GameAccount, since: Date) async throws -> [GameSessionSummary] {
        let user = account.handle.lowercased()
        let now = Date()
        let cal = Calendar(identifier: .gregorian)
        let y = cal.component(.year, from: now)
        let m = cal.component(.month, from: now)
        let url = URL(string: String(format: "https://api.chess.com/pub/player/%@/games/%04d/%02d", user, y, m))!
        let archive: ArchiveGames
        do {
            archive = try await AdapterHTTP.getJSON(url, headers: ["User-Agent": "RIE-App"])
        } catch GameAdapterError.notFound {
            return []
        }
        return archive.games.compactMap { g in
            let end = Date(timeIntervalSince1970: TimeInterval(g.end_time))
            guard end >= since else { return nil }
            let mine = g.white.username.lowercased() == user ? g.white : g.black
            let minutes = Self.minutes(for: g.time_class) ?? 5
            let start = end.addingTimeInterval(TimeInterval(-minutes * 60))
            let diff: Difficulty = (mine.rating ?? 0) >= 2000 ? .hard : ((mine.rating ?? 0) >= 1400 ? .medium : .easy)
            let sig = "chess:\(account.externalId):\(g.end_time)"
            return GameSessionSummary(
                platform: .chessDotCom,
                title: "Chess — \(g.time_class ?? "blitz")",
                externalId: g.url,
                handle: account.handle,
                startedAt: start,
                endedAt: end,
                minutes: minutes,
                ranked: g.rated ?? false,
                outcome: mine.result,
                difficulty: diff,
                signature: sig
            )
        }
    }

    private static func minutes(for timeClass: String?) -> Int? {
        switch timeClass {
        case "bullet": return 2
        case "blitz": return 5
        case "rapid": return 15
        case "daily": return 30
        default: return 10
        }
    }
}
