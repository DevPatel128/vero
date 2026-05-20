import Foundation
import SwiftData

enum GamePlatform: String, CaseIterable, Codable, Identifiable {
    case steam
    case chessDotCom = "chess"
    case lichess
    case gameCenter = "game_center"
    case xbox

    var id: String { rawValue }

    var title: String {
        switch self {
        case .steam: return "Steam"
        case .chessDotCom: return "Chess.com"
        case .lichess: return "Lichess"
        case .gameCenter: return "Game Center"
        case .xbox: return "Xbox Live"
        }
    }

    var icon: String {
        switch self {
        case .steam: return "gamecontroller.fill"
        case .chessDotCom, .lichess: return "checkerboard.rectangle"
        case .gameCenter: return "person.2.crop.square.stack.fill"
        case .xbox: return "x.square.fill"
        }
    }

    var requiresUsername: Bool {
        switch self {
        case .steam, .chessDotCom, .lichess, .xbox: return true
        case .gameCenter: return false
        }
    }
}

@Model
final class GameAccount {
    @Attribute(.unique) var id: String
    var user: UserAccount?
    var platformRaw: String
    var handle: String
    var externalId: String
    var lastSyncedAt: Date?
    var lastMinutesSynced: Int
    var connectedAt: Date

    var platform: GamePlatform { GamePlatform(rawValue: platformRaw) ?? .steam }

    init(id: String = UUID().uuidString,
         platform: GamePlatform,
         handle: String,
         externalId: String = "",
         lastMinutesSynced: Int = 0,
         connectedAt: Date = Date()) {
        self.id = id
        self.platformRaw = platform.rawValue
        self.handle = handle
        self.externalId = externalId
        self.lastMinutesSynced = lastMinutesSynced
        self.connectedAt = connectedAt
    }
}
