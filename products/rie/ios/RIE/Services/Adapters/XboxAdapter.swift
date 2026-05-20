import Foundation

struct XboxAdapter: GamePlatformAdapter {
    let platform: GamePlatform = .xbox

    private struct Profile: Decodable {
        struct Player: Decodable { let id: String; let gamertag: String }
        let profileUsers: [Player]?
        let id: String?
        let gamertag: String?
    }

    private struct RecentResp: Decodable {
        struct Title: Decodable {
            let titleId: String
            let name: String
            let lastTimePlayed: String?
            let minutesPlayed: Int?
        }
        let titles: [Title]
    }

    private var apiKey: String? { AdapterHTTP.infoPlistKey("RIEOpenXBLApiKey") }

    func resolve(handle: String) async throws -> (externalId: String, displayName: String) {
        let name = handle.trimmingCharacters(in: .whitespaces)
        guard !name.isEmpty else { throw GameAdapterError.invalidHandle }
        guard let key = apiKey else { throw GameAdapterError.missingCredentials("RIEOpenXBLApiKey") }
        let url = URL(string: "https://xbl.io/api/v2/search/\(name)")!
        let profile: Profile = try await AdapterHTTP.getJSON(url, headers: [
            "X-Authorization": key,
            "Accept": "application/json",
        ])
        if let p = profile.profileUsers?.first { return (p.id, p.gamertag) }
        if let id = profile.id, let tag = profile.gamertag { return (id, tag) }
        throw GameAdapterError.notFound
    }

    func fetchRecent(account: GameAccount, since: Date) async throws -> [GameSessionSummary] {
        guard let key = apiKey else { throw GameAdapterError.missingCredentials("RIEOpenXBLApiKey") }
        let url = URL(string: "https://xbl.io/api/v2/player/titleHistory/\(account.externalId)")!
        let resp: RecentResp = try await AdapterHTTP.getJSON(url, headers: [
            "X-Authorization": key,
            "Accept": "application/json",
        ])
        let iso = ISO8601DateFormatter()
        return resp.titles.compactMap { t in
            let end = t.lastTimePlayed.flatMap { iso.date(from: $0) } ?? Date()
            guard end >= since else { return nil }
            let minutes = t.minutesPlayed ?? 30
            let start = end.addingTimeInterval(TimeInterval(-minutes * 60))
            let diff: Difficulty = minutes > 180 ? .hard : (minutes > 60 ? .medium : .easy)
            let sig = "xbox:\(account.externalId):\(t.titleId):\(minutes)"
            return GameSessionSummary(
                platform: .xbox,
                title: t.name,
                externalId: t.titleId,
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
