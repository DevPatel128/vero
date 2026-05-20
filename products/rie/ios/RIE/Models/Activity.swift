import Foundation

enum Difficulty: String, Codable, CaseIterable {
    case easy, medium, hard, extreme

    var multiplier: Double {
        switch self {
        case .easy: return 0.6
        case .medium: return 1.0
        case .hard: return 1.3
        case .extreme: return 1.6
        }
    }

    var label: String { rawValue.capitalized }
}

struct ActivityCatalogEntry: Identifiable, Codable, Hashable {
    let id: String
    let name: String
    let category: String
    let domain: Domain
    let difficulty: Difficulty
    let minDuration: Int
    let proofTypes: [ProofType]
    let icon: String
}
