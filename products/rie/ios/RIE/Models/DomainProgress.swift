import Foundation
import SwiftData

@Model
final class DomainProgress {
    @Attribute(.unique) var id: String
    var user: UserAccount?
    var domainRaw: String
    var currentStreak: Int
    var longestStreak: Int
    var lastActivityAt: Date?
    var baselineSet: Bool

    var rawScore: Int
    var effectiveScore: Int
    var tierRaw: String
    var consistency: Int
    var effort: Int
    var improvement: Int
    var proofReliability: Int
    var lastCalculatedAt: Date

    var domain: Domain { Domain(rawValue: domainRaw) ?? .fitness }
    var tier: Tier { Tier(rawValue: tierRaw) ?? .unranked }

    init(id: String = UUID().uuidString,
         domain: Domain,
         currentStreak: Int = 0,
         longestStreak: Int = 0,
         lastActivityAt: Date? = nil,
         baselineSet: Bool = false,
         rawScore: Int = 0,
         effectiveScore: Int = 0,
         tier: Tier = .unranked,
         consistency: Int = 0,
         effort: Int = 0,
         improvement: Int = 0,
         proofReliability: Int = 0,
         lastCalculatedAt: Date = Date()) {
        self.id = id
        self.domainRaw = domain.rawValue
        self.currentStreak = currentStreak
        self.longestStreak = longestStreak
        self.lastActivityAt = lastActivityAt
        self.baselineSet = baselineSet
        self.rawScore = rawScore
        self.effectiveScore = effectiveScore
        self.tierRaw = tier.rawValue
        self.consistency = consistency
        self.effort = effort
        self.improvement = improvement
        self.proofReliability = proofReliability
        self.lastCalculatedAt = lastCalculatedAt
    }
}

@Model
final class TrustScoreRecord {
    @Attribute(.unique) var id: String
    var user: UserAccount?
    var overall: Double
    var proofAuthenticity: Double
    var behavioralConsistency: Double
    var accountMaturity: Double
    var fraudSignals: Double
    var updatedAt: Date

    init(id: String = UUID().uuidString,
         overall: Double = 0.7,
         proofAuthenticity: Double = 0.7,
         behavioralConsistency: Double = 0.6,
         accountMaturity: Double = 0.3,
         fraudSignals: Double = 1.0,
         updatedAt: Date = Date()) {
        self.id = id
        self.overall = overall
        self.proofAuthenticity = proofAuthenticity
        self.behavioralConsistency = behavioralConsistency
        self.accountMaturity = accountMaturity
        self.fraudSignals = fraudSignals
        self.updatedAt = updatedAt
    }
}
