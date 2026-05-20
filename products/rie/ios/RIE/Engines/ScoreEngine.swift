import Foundation

struct ScoreComponents {
    let consistency: Int
    let effort: Int
    let improvement: Int
    let proofQuality: Int
}

struct ScoreResult {
    let rawScore: Int
    let effectiveScore: Int
    let tier: Tier
    let components: ScoreComponents
}

enum ScoreEngine {
    static let weights = (consistency: 0.40, effort: 0.25, improvement: 0.20, proofQuality: 0.15)
    static let maxRaw = 1000

    static func calculate(submissions: [Submission],
                          domain: Domain,
                          currentStreak: Int,
                          baselineSet: Bool,
                          trust: Double,
                          periodDays: Int = 90,
                          now: Date = Date()) -> ScoreResult {
        let domainSubs = submissions.filter { $0.domain == domain && $0.verificationStatus == .verified }
        let consistency = calcConsistency(domainSubs, currentStreak: currentStreak, periodDays: periodDays, now: now)
        let effort = calcEffort(domainSubs, periodDays: periodDays, now: now)
        let improvement = calcImprovement(domainSubs, baselineSet: baselineSet, periodDays: periodDays, now: now)
        let proofQuality = calcProofQuality(domainSubs, periodDays: periodDays, now: now)

        let weighted = Double(consistency) * weights.consistency
            + Double(effort) * weights.effort
            + Double(improvement) * weights.improvement
            + Double(proofQuality) * weights.proofQuality

        let rawScore = Int((weighted * Double(maxRaw) / 100.0).rounded())
        let effective = Int((Double(rawScore) * trust).rounded())
        let tier = Tier.from(score: effective)
        return ScoreResult(rawScore: rawScore, effectiveScore: effective, tier: tier,
                           components: ScoreComponents(consistency: consistency, effort: effort, improvement: improvement, proofQuality: proofQuality))
    }

    private static func sinceDate(_ days: Int, now: Date) -> Date {
        now.addingTimeInterval(-Double(days) * 86400)
    }

    private static func calcConsistency(_ subs: [Submission], currentStreak: Int, periodDays: Int, now: Date) -> Int {
        let since = sinceDate(periodDays, now: now)
        let inPeriod = subs.filter { $0.createdAt >= since }
        guard !inPeriod.isEmpty else { return 0 }
        let calendar = Calendar.current
        let activeDays = Set(inPeriod.map { calendar.startOfDay(for: $0.createdAt) }).count
        let adherence = min(Double(activeDays) / Double(periodDays), 1.0)
        let streakBonus = min(Double(currentStreak) / 90.0, 1.0)
        return Int((adherence * 60 + streakBonus * 40).rounded())
    }

    private static func calcEffort(_ subs: [Submission], periodDays: Int, now: Date) -> Int {
        let since = sinceDate(periodDays, now: now)
        let inPeriod = subs.filter { $0.createdAt >= since }
        guard !inPeriod.isEmpty else { return 0 }
        let avgEffort = inPeriod.map(\.effortScore).reduce(0, +) / Double(inPeriod.count)
        let avgQuality = inPeriod.map(\.qualityScore).reduce(0, +) / Double(inPeriod.count)
        return Int(min(avgEffort * 50 + avgQuality * 50, 100).rounded())
    }

    private static func calcImprovement(_ subs: [Submission], baselineSet: Bool, periodDays: Int, now: Date) -> Int {
        guard baselineSet else { return 50 }
        let currentStart = sinceDate(periodDays, now: now)
        let previousStart = sinceDate(periodDays * 2, now: now)
        let current = subs.filter { $0.createdAt >= currentStart }.count
        let previous = subs.filter { $0.createdAt >= previousStart && $0.createdAt < currentStart }.count
        guard previous > 0 else { return 60 }
        let growth = Double(current - previous) / Double(previous)
        let score = max(0.0, min(100.0, 50.0 + growth * 50.0))
        return Int(score.rounded())
    }

    private static func calcProofQuality(_ subs: [Submission], periodDays: Int, now: Date) -> Int {
        let since = sinceDate(periodDays, now: now)
        let inPeriod = subs.filter { $0.createdAt >= since }
        guard !inPeriod.isEmpty else { return 0 }
        let total = inPeriod.reduce(0.0) { sum, s in
            sum + s.proofType.weight * (1.0 - s.riskScore)
        } / Double(inPeriod.count)
        return Int((total * 100).rounded())
    }
}
