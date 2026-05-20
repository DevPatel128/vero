import Foundation
import SwiftData

@MainActor
final class GameAccountService {
    private let context: ModelContext

    init(context: ModelContext) {
        self.context = context
    }

    func connect(user: UserAccount, platform: GamePlatform, handle: String) async throws -> GameAccount {
        let adapter = AdapterRegistry.adapter(for: platform)
        let resolved = try await adapter.resolve(handle: handle)
        if let existing = user.gameAccounts.first(where: { $0.platform == platform }) {
            existing.handle = resolved.displayName
            existing.externalId = resolved.externalId
            try context.save()
            return existing
        }
        let account = GameAccount(
            platform: platform,
            handle: resolved.displayName,
            externalId: resolved.externalId
        )
        account.user = user
        user.gameAccounts.append(account)
        context.insert(account)
        try context.save()
        return account
    }

    func disconnect(_ account: GameAccount) throws {
        context.delete(account)
        try context.save()
    }

    func sync(account: GameAccount) async throws -> [GameSessionSummary] {
        let adapter = AdapterRegistry.adapter(for: account.platform)
        let since = account.lastSyncedAt ?? Date().addingTimeInterval(-60 * 60 * 24 * 14)
        let sessions = try await adapter.fetchRecent(account: account, since: since)
        account.lastSyncedAt = Date()
        account.lastMinutesSynced = sessions.reduce(0) { $0 + $1.minutes }
        try context.save()
        return sessions
    }
}
