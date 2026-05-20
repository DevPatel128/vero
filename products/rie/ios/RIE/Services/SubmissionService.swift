import Foundation
import SwiftData
import CryptoKit

@MainActor
final class SubmissionService {
    private let context: ModelContext
    private let mediaKey: SymmetricKey
    private let mediaRoot: URL

    init(context: ModelContext) throws {
        self.context = context
        self.mediaKey = try KeychainStore.loadOrCreateKey(.encryptionKey)
        let docs = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
        self.mediaRoot = docs.appendingPathComponent("encrypted_media", isDirectory: true)
        try? FileManager.default.createDirectory(at: mediaRoot, withIntermediateDirectories: true)
    }

    func submit(user: UserAccount,
                domain: Domain,
                activity: ActivityCatalogEntry,
                durationMinutes: Int,
                proofType: ProofType,
                notes: String,
                effort: Double,
                quality: Double,
                mediaData: Data?) throws -> Submission {
        if domain == .fitness || domain == .gaming {
            throw SubmissionError.manualBlocked(domain)
        }
        let mediaPath: String? = try mediaData.map { try storeEncrypted($0) }
        let submission = Submission(
            domain: domain,
            activityId: activity.id,
            activityName: activity.name,
            difficulty: activity.difficulty,
            durationMinutes: durationMinutes,
            proofType: proofType,
            notes: notes,
            encryptedMediaPath: mediaPath,
            verificationStatus: .verified,
            effortScore: effort,
            qualityScore: quality,
            riskScore: 0
        )
        submission.user = user
        user.submissions.append(submission)
        context.insert(submission)
        updateStreak(user: user, domain: domain, on: submission.createdAt)
        try context.save()
        recalculate(for: user)
        return submission
    }

    func submitFromHealth(user: UserAccount, workout: HealthWorkoutSummary) throws -> Submission {
        let activityId = "health-\(workout.activityType.rawValue)"
        if user.submissions.contains(where: { $0.activityId == activityId && abs($0.createdAt.timeIntervalSince(workout.end)) < 30 }) {
            throw SubmissionError.duplicateVerified
        }
        let effort = min(1.0, max(0.3, workout.energyBurnedKcal / 500.0))
        let quality = 0.9
        let submission = Submission(
            domain: .fitness,
            activityId: activityId,
            activityName: workout.activityName,
            difficulty: workout.difficulty,
            durationMinutes: workout.durationMinutes,
            proofType: .api,
            notes: "Verified via Apple Health · source: \(workout.source)",
            encryptedMediaPath: nil,
            verificationStatus: .verified,
            effortScore: effort,
            qualityScore: quality,
            riskScore: 0,
            createdAt: workout.end
        )
        submission.user = user
        user.submissions.append(submission)
        context.insert(submission)
        updateStreak(user: user, domain: .fitness, on: submission.createdAt)
        try context.save()
        recalculate(for: user)
        return submission
    }

    func submitFromGame(user: UserAccount, session: GameSessionSummary) throws -> Submission {
        let activityId = "\(session.platform.rawValue)-\(session.externalId)"
        if user.submissions.contains(where: { $0.activityId == activityId }) {
            throw SubmissionError.duplicateVerified
        }
        let effort = min(1.0, max(0.3, Double(session.minutes) / 120.0))
        let quality = session.ranked ? 0.95 : 0.8
        let submission = Submission(
            domain: .gaming,
            activityId: activityId,
            activityName: session.title,
            difficulty: session.difficulty,
            durationMinutes: session.minutes,
            proofType: .api,
            notes: "Verified via \(session.platform.title) · sig: \(session.signature.prefix(32))",
            encryptedMediaPath: nil,
            verificationStatus: .verified,
            effortScore: effort,
            qualityScore: quality,
            riskScore: 0,
            createdAt: session.endedAt
        )
        submission.user = user
        user.submissions.append(submission)
        context.insert(submission)
        updateStreak(user: user, domain: .gaming, on: submission.createdAt)
        try context.save()
        recalculate(for: user)
        return submission
    }

    func submitContent(user: UserAccount,
                       activity: ActivityCatalogEntry,
                       durationMinutes: Int,
                       notes: String,
                       mediaData: Data,
                       verification: ContentVerificationResult) throws -> Submission {
        guard verification.accepted else { throw SubmissionError.contentRejected(verification.reason ?? "AI-generated or low originality.") }
        let mediaPath = try storeEncrypted(mediaData)
        let effort = 0.7
        let quality = verification.originalityScore
        let risk = verification.aiProbability
        let submission = Submission(
            domain: .content,
            activityId: activity.id,
            activityName: activity.name,
            difficulty: activity.difficulty,
            durationMinutes: durationMinutes,
            proofType: .api,
            notes: "Verified · AI prob \(Int(verification.aiProbability * 100))% · SHA \(verification.checksum.prefix(12))\n\(notes)",
            encryptedMediaPath: mediaPath,
            verificationStatus: .verified,
            effortScore: effort,
            qualityScore: quality,
            riskScore: risk
        )
        submission.user = user
        user.submissions.append(submission)
        context.insert(submission)
        updateStreak(user: user, domain: .content, on: submission.createdAt)
        try context.save()
        recalculate(for: user)
        return submission
    }

    func recalculate(for user: UserAccount) {
        let allSubs = user.submissions
        let trust = TrustEngine.calculate(submissions: allSubs, accountCreatedAt: user.createdAt)
        if let record = user.trust {
            record.overall = trust.overall
            record.proofAuthenticity = trust.proofAuthenticity
            record.behavioralConsistency = trust.behavioralConsistency
            record.accountMaturity = trust.accountMaturity
            record.fraudSignals = trust.fraudSignals
            record.updatedAt = Date()
        }

        for progress in user.domains {
            let result = ScoreEngine.calculate(
                submissions: allSubs,
                domain: progress.domain,
                currentStreak: progress.currentStreak,
                baselineSet: progress.baselineSet,
                trust: trust.overall
            )
            progress.rawScore = result.rawScore
            progress.effectiveScore = result.effectiveScore
            progress.tierRaw = result.tier.rawValue
            progress.consistency = result.components.consistency
            progress.effort = result.components.effort
            progress.improvement = result.components.improvement
            progress.proofReliability = result.components.proofQuality
            progress.lastCalculatedAt = Date()
        }
        try? context.save()
    }

    func decryptMedia(at relativePath: String) throws -> Data {
        let url = mediaRoot.appendingPathComponent(relativePath)
        let cipher = try Data(contentsOf: url)
        return try Encryption.decryptData(cipher, key: mediaKey)
    }

    private func storeEncrypted(_ data: Data) throws -> String {
        let cipher = try Encryption.encryptData(data, key: mediaKey)
        let name = "\(UUID().uuidString).bin"
        let url = mediaRoot.appendingPathComponent(name)
        try cipher.write(to: url, options: .atomic)
        return name
    }

    private func updateStreak(user: UserAccount, domain: Domain, on date: Date) {
        guard let progress = user.domains.first(where: { $0.domain == domain }) else { return }
        let cal = Calendar.current
        let today = cal.startOfDay(for: date)
        if let last = progress.lastActivityAt {
            let lastDay = cal.startOfDay(for: last)
            if cal.isDate(today, inSameDayAs: lastDay) {
                // already counted today
            } else if let yesterday = cal.date(byAdding: .day, value: -1, to: today),
                      cal.isDate(lastDay, inSameDayAs: yesterday) {
                progress.currentStreak += 1
            } else {
                progress.currentStreak = 1
            }
        } else {
            progress.currentStreak = 1
        }
        progress.longestStreak = max(progress.longestStreak, progress.currentStreak)
        progress.lastActivityAt = date
        progress.baselineSet = true
    }
}

enum SubmissionError: LocalizedError {
    case duplicateVerified
    case contentRejected(String)
    case manualBlocked(Domain)

    var errorDescription: String? {
        switch self {
        case .duplicateVerified: return "This activity was already imported."
        case .contentRejected(let reason): return "Content rejected: \(reason)"
        case .manualBlocked(let d):
            return "\(d.title) submissions must be verified. Sync Apple Health or connect a game platform."
        }
    }
}
