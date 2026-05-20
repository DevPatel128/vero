import Foundation

struct LichessAdapter: GamePlatformAdapter {
    let platform: GamePlatform = .lichess

    private struct User: Decodable { let id: String; let username: String }

    func resolve(handle: String) async throws -> (externalId: String, displayName: String) {
        let name = handle.trimmingCharacters(in: .whitespaces)
        guard !name.isEmpty else { throw GameAdapterError.invalidHandle }
        let url = URL(string: "https://lichess.org/api/user/\(name)")!
        let user: User = try await AdapterHTTP.getJSON(url)
        return (user.id, user.username)
    }

    func fetchRecent(account: GameAccount, since: Date) async throws -> [GameSessionSummary] {
        let user = account.handle
        var comp = URLComponents(string: "https://lichess.org/api/games/user/\(user)")!
        comp.queryItems = [
            .init(name: "max", value: "30"),
            .init(name: "since", value: String(Int(since.timeIntervalSince1970 * 1000))),
            .init(name: "perfType", value: "bullet,blitz,rapid,classical"),
            .init(name: "rated", value: "true"),
        ]
        var req = URLRequest(url: comp.url!)
        req.setValue("application/x-ndjson", forHTTPHeaderField: "Accept")
        req.timeoutInterval = 20
        let (data, resp) = try await URLSession.shared.data(for: req)
        guard let http = resp as? HTTPURLResponse, (200..<300).contains(http.statusCode) else {
            throw GameAdapterError.httpError((resp as? HTTPURLResponse)?.statusCode ?? 0)
        }
        guard let text = String(data: data, encoding: .utf8) else { return [] }
        var results: [GameSessionSummary] = []
        for line in text.split(separator: "\n") {
            guard let bytes = line.data(using: .utf8),
                  let obj = try? JSONSerialization.jsonObject(with: bytes) as? [String: Any] else { continue }
            let id = obj["id"] as? String ?? UUID().uuidString
            let created = (obj["createdAt"] as? Double ?? 0) / 1000
            let ended = (obj["lastMoveAt"] as? Double ?? 0) / 1000
            let start = Date(timeIntervalSince1970: created)
            let end = Date(timeIntervalSince1970: ended)
            let minutes = max(1, Int(end.timeIntervalSince(start) / 60))
            let perf = obj["perf"] as? String ?? "blitz"
            let rated = obj["rated"] as? Bool ?? false
            let players = obj["players"] as? [String: Any]
            let white = (players?["white"] as? [String: Any])?["user"] as? [String: Any]
            let black = (players?["black"] as? [String: Any])?["user"] as? [String: Any]
            let mineWhite = (white?["id"] as? String ?? "") == account.externalId
            let mine = mineWhite ? (players?["white"] as? [String: Any]) : (players?["black"] as? [String: Any])
            let rating = mine?["rating"] as? Int ?? 0
            let winner = obj["winner"] as? String
            let outcome: String? = winner.map { $0 == (mineWhite ? "white" : "black") ? "win" : "loss" } ?? "draw"
            let diff: Difficulty = rating >= 2000 ? .hard : (rating >= 1500 ? .medium : .easy)
            let sig = "lichess:\(account.externalId):\(id)"
            results.append(GameSessionSummary(
                platform: .lichess,
                title: "Chess — \(perf)",
                externalId: id,
                handle: account.handle,
                startedAt: start,
                endedAt: end,
                minutes: minutes,
                ranked: rated,
                outcome: outcome,
                difficulty: diff,
                signature: sig
            ))
        }
        return results
    }
}
