import Foundation
import SwiftUI

enum Domain: String, CaseIterable, Identifiable, Codable {
    case fitness, content, gaming

    var id: String { rawValue }

    var title: String {
        switch self {
        case .fitness: return "Fitness"
        case .content: return "Content"
        case .gaming: return "Gaming"
        }
    }

    var icon: String {
        switch self {
        case .fitness: return "figure.run"
        case .content: return "video.fill"
        case .gaming: return "gamecontroller.fill"
        }
    }

    var tint: Color {
        switch self {
        case .fitness: return .orange
        case .content: return .purple
        case .gaming: return .blue
        }
    }
}

enum Tier: String, CaseIterable, Codable {
    case unranked, bronze, silver, gold, platinum, diamond, master

    var minScore: Int {
        switch self {
        case .master: return 900
        case .diamond: return 800
        case .platinum: return 650
        case .gold: return 500
        case .silver: return 350
        case .bronze: return 200
        case .unranked: return 0
        }
    }

    var label: String { rawValue.capitalized }

    var color: Color {
        switch self {
        case .master: return .red
        case .diamond: return .cyan
        case .platinum: return .mint
        case .gold: return .yellow
        case .silver: return .gray
        case .bronze: return .brown
        case .unranked: return .secondary
        }
    }

    static func from(score: Int) -> Tier {
        Tier.allCases
            .sorted { $0.minScore > $1.minScore }
            .first(where: { score >= $0.minScore }) ?? .unranked
    }
}

enum ProofType: String, CaseIterable, Codable {
    case api, device, video, imageMetadata = "image_metadata", manualDetailed = "manual_detailed", manual

    var weight: Double {
        switch self {
        case .api: return 1.0
        case .device: return 0.9
        case .video: return 0.7
        case .imageMetadata: return 0.6
        case .manualDetailed: return 0.4
        case .manual: return 0.2
        }
    }

    var label: String {
        switch self {
        case .api: return "API Sync"
        case .device: return "Device Data"
        case .video: return "Video"
        case .imageMetadata: return "Photo + Metadata"
        case .manualDetailed: return "Manual (Detailed)"
        case .manual: return "Manual"
        }
    }
}

enum VerificationStatus: String, Codable {
    case pending, verified, rejected, flagged
}
