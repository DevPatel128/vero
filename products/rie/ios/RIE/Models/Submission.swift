import Foundation
import SwiftData

@Model
final class Submission {
    @Attribute(.unique) var id: String
    var user: UserAccount?
    var domainRaw: String
    var activityId: String
    var activityName: String
    var difficultyRaw: String
    var durationMinutes: Int
    var proofTypeRaw: String
    var notes: String
    var encryptedMediaPath: String?
    var verificationStatusRaw: String
    var effortScore: Double
    var qualityScore: Double
    var riskScore: Double
    var createdAt: Date

    var domain: Domain { Domain(rawValue: domainRaw) ?? .fitness }
    var difficulty: Difficulty { Difficulty(rawValue: difficultyRaw) ?? .medium }
    var proofType: ProofType { ProofType(rawValue: proofTypeRaw) ?? .manual }
    var verificationStatus: VerificationStatus { VerificationStatus(rawValue: verificationStatusRaw) ?? .pending }

    init(id: String = UUID().uuidString,
         domain: Domain,
         activityId: String,
         activityName: String,
         difficulty: Difficulty,
         durationMinutes: Int,
         proofType: ProofType,
         notes: String,
         encryptedMediaPath: String? = nil,
         verificationStatus: VerificationStatus = .verified,
         effortScore: Double,
         qualityScore: Double,
         riskScore: Double = 0,
         createdAt: Date = Date()) {
        self.id = id
        self.domainRaw = domain.rawValue
        self.activityId = activityId
        self.activityName = activityName
        self.difficultyRaw = difficulty.rawValue
        self.durationMinutes = durationMinutes
        self.proofTypeRaw = proofType.rawValue
        self.notes = notes
        self.encryptedMediaPath = encryptedMediaPath
        self.verificationStatusRaw = verificationStatus.rawValue
        self.effortScore = effortScore
        self.qualityScore = qualityScore
        self.riskScore = riskScore
        self.createdAt = createdAt
    }
}
