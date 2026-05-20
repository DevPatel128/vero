import Foundation
import GameKit

struct GameCenterAdapter: GamePlatformAdapter {
    let platform: GamePlatform = .gameCenter

    func resolve(handle: String) async throws -> (externalId: String, displayName: String) {
        let player = try await authenticate()
        return (player.gamePlayerID, player.displayName)
    }

    func fetchRecent(account: GameAccount, since: Date) async throws -> [GameSessionSummary] {
        _ = try await authenticate()
        let achievements: [GKAchievement] = try await withCheckedThrowingContinuation { cont in
            GKAchievement.loadAchievements { items, error in
                if let error { cont.resume(throwing: error); return }
                cont.resume(returning: items ?? [])
            }
        }
        return achievements.compactMap { a in
            let date = a.lastReportedDate
            guard date >= since else { return nil }
            let pct = a.percentComplete
            guard pct >= 100 else { return nil }
            let minutes = 20
            let diff: Difficulty = .medium
            let sig = "gc:\(account.externalId):\(a.identifier)"
            return GameSessionSummary(
                platform: .gameCenter,
                title: "Game Center — \(a.identifier)",
                externalId: a.identifier,
                handle: account.handle,
                startedAt: date.addingTimeInterval(TimeInterval(-minutes * 60)),
                endedAt: date,
                minutes: minutes,
                ranked: false,
                outcome: "achievement",
                difficulty: diff,
                signature: sig
            )
        }
    }

    private func authenticate() async throws -> GKLocalPlayer {
        let local = GKLocalPlayer.local
        if local.isAuthenticated { return local }
        return try await withCheckedThrowingContinuation { cont in
            var resumed = false
            local.authenticateHandler = { _, error in
                guard !resumed else { return }
                if let error {
                    resumed = true
                    cont.resume(throwing: error)
                    return
                }
                if local.isAuthenticated {
                    resumed = true
                    cont.resume(returning: local)
                }
            }
        }
    }
}
