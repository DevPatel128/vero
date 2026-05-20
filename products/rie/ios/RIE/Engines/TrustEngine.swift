import Foundation

struct TrustResult {
    let overall: Double
    let proofAuthenticity: Double
    let behavioralConsistency: Double
    let accountMaturity: Double
    let fraudSignals: Double
}

enum TrustEngine {
    static let weights = (proof: 0.35, behavior: 0.25, maturity: 0.20, fraud: 0.20)

    static func calculate(submissions: [Submission],
                          accountCreatedAt: Date,
                          activePenalties: Int = 0,
                          now: Date = Date()) -> TrustResult {
        let proofAuth = calcProofAuthenticity(submissions)
        let behavior = calcBehavioralConsistency(submissions, now: now)
        let maturity = calcAccountMaturity(createdAt: accountCreatedAt, now: now)
        let fraud = calcFraudSignals(submissions, activePenalties: activePenalties, now: now)
        let overall = proofAuth * weights.proof
            + behavior * weights.behavior
            + maturity * weights.maturity
            + fraud * weights.fraud
        return TrustResult(overall: overall,
                           proofAuthenticity: proofAuth,
                           behavioralConsistency: behavior,
                           accountMaturity: maturity,
                           fraudSignals: fraud)
    }

    private static func calcProofAuthenticity(_ subs: [Submission]) -> Double {
        let verified = subs.filter { $0.verificationStatus == .verified }
        guard !verified.isEmpty else { return 0.7 }
        let highQuality = verified.filter { $0.proofType == .api || $0.proofType == .device }.count
        return max(0.3, Double(highQuality) / Double(verified.count))
    }

    private static func calcBehavioralConsistency(_ subs: [Submission], now: Date) -> Double {
        let since = now.addingTimeInterval(-30 * 86400)
        let recent = subs.filter { $0.verificationStatus == .verified && $0.createdAt >= since }
        guard recent.count >= 5 else { return 0.6 }
        let hours = recent.map { Double(Calendar.current.component(.hour, from: $0.createdAt)) }
        guard hours.count >= 3 else { return 0.5 }
        let mean = hours.reduce(0, +) / Double(hours.count)
        let variance = hours.reduce(0.0) { $0 + pow($1 - mean, 2) } / Double(hours.count)
        return max(0.3, min(1.0, 1.0 - variance / 100.0))
    }

    private static func calcAccountMaturity(createdAt: Date, now: Date) -> Double {
        let ageDays = now.timeIntervalSince(createdAt) / 86400.0
        if ageDays >= 90 { return 1.0 }
        if ageDays >= 30 { return 0.7 + (ageDays - 30) * (0.3 / 60) }
        return 0.3 + ageDays * (0.4 / 30)
    }

    private static func calcFraudSignals(_ subs: [Submission], activePenalties: Int, now: Date) -> Double {
        var score = 1.0
        score -= Double(activePenalties) * 0.15
        let since = now.addingTimeInterval(-30 * 86400)
        let rejections = subs.filter { $0.verificationStatus == .rejected && $0.createdAt >= since }.count
        score -= Double(rejections) * 0.05
        return max(0, score)
    }
}
