import Foundation

struct SteamAdapter: GamePlatformAdapter {
    let platform: GamePlatform = .steam

    private struct VanityResponse: Decodable {
        struct R: Decodable { let steamid: String?; let success: Int }
        let response: R
    }

    private struct SummaryResponse: Decodable {
        struct Player: Decodable { let steamid: String; let personaname: String }
        struct R: Decodable { let players: [Player] }
        let response: R
    }

    private struct OwnedResponse: Decodable {
        struct Game: Decodable {
            let appid: Int
            let name: String?
            let playtime_forever: Int
            let playtime_2weeks: Int?
            let rtime_last_played: Int?
        }
        struct R: Decodable { let games: [Game]? }
        let response: R
    }

    func resolve(handle: String) async throws -> (externalId: String, displayName: String) {
        let trimmed = handle.trimmingCharacters(in: .whitespaces)
        guard !trimmed.isEmpty else { throw GameAdapterError.invalidHandle }
        guard let key = AdapterHTTP.infoPlistKey("RIESteamAPIKey") else {
            throw GameAdapterError.missingCredentials("RIESteamAPIKey")
        }
        let steamId: String
        if trimmed.allSatisfy(\.isNumber), trimmed.count >= 17 {
            steamId = trimmed
        } else {
            var comp = URLComponents(string: "https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/")!
            comp.queryItems = [
                .init(name: "key", value: key),
                .init(name: "vanityurl", value: trimmed),
            ]
            let vanity: VanityResponse = try await AdapterHTTP.getJSON(comp.url!)
            guard vanity.response.success == 1, let id = vanity.response.steamid else {
                throw GameAdapterError.notFound
            }
            steamId = id
        }
        var comp = URLComponents(string: "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/")!
        comp.queryItems = [.init(name: "key", value: key), .init(name: "steamids", value: steamId)]
        let summary: SummaryResponse = try await AdapterHTTP.getJSON(comp.url!)
        guard let player = summary.response.players.first else { throw GameAdapterError.notFound }
        return (player.steamid, player.personaname)
    }

    func fetchRecent(account: GameAccount, since: Date) async throws -> [GameSessionSummary] {
        guard let key = AdapterHTTP.infoPlistKey("RIESteamAPIKey") else {
            throw GameAdapterError.missingCredentials("RIESteamAPIKey")
        }
        var comp = URLComponents(string: "https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/")!
        comp.queryItems = [
            .init(name: "key", value: key),
            .init(name: "steamid", value: account.externalId),
            .init(name: "count", value: "20"),
        ]
        let owned: OwnedResponse = try await AdapterHTTP.getJSON(comp.url!)
        let games = owned.response.games ?? []
        return games.compactMap { g -> GameSessionSummary? in
            let minutes = g.playtime_2weeks ?? 0
            guard minutes > 0 else { return nil }
            let end = g.rtime_last_played.map { Date(timeIntervalSince1970: TimeInterval($0)) } ?? Date()
            let start = end.addingTimeInterval(TimeInterval(-minutes * 60))
            guard end >= since else { return nil }
            let diff: Difficulty = minutes > 300 ? .hard : (minutes > 120 ? .medium : .easy)
            let sig = "steam:\(account.externalId):\(g.appid):\(minutes)"
            return GameSessionSummary(
                platform: .steam,
                title: g.name ?? "Steam Game",
                externalId: String(g.appid),
                handle: account.handle,
                startedAt: start,
                endedAt: end,
                minutes: minutes,
                ranked: false,
                outcome: nil,
                difficulty: diff,
                signature: sig
            )
        }
    }
}
