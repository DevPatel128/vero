import SwiftUI
import SwiftData

struct DashboardView: View {
    @EnvironmentObject private var appState: AppState
    @State private var showSubmit = false

    var body: some View {
        NavigationStack {
            ScrollView {
                if let user = appState.currentUser {
                    VStack(spacing: 20) {
                        OverallCard(user: user)
                        ForEach(user.domains.sorted(by: { $0.domainRaw < $1.domainRaw })) { progress in
                            DomainCard(progress: progress)
                        }
                        VerifiedSyncPanel()
                    }
                    .padding(16)
                    .frame(maxWidth: .infinity)
                }
            }
            .scrollDismissesKeyboard(.interactively)
            .refreshable { appState.refresh() }
            .background(Color(.systemGroupedBackground))
            .navigationTitle("Dashboard")
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button { showSubmit = true } label: {
                        Image(systemName: "plus.circle.fill").font(.title2)
                    }
                }
            }
            .sheet(isPresented: $showSubmit) {
                NewSubmissionView()
            }
        }
    }
}

private struct OverallCard: View {
    let user: UserAccount

    var overall: Int {
        guard !user.domains.isEmpty else { return 0 }
        return user.domains.map(\.effectiveScore).reduce(0, +) / user.domains.count
    }

    var trust: Double { user.trust?.overall ?? 0 }

    var body: some View {
        VStack(spacing: 16) {
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text("Welcome back")
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                    Text(user.displayName)
                        .font(.title2.bold())
                }
                Spacer()
                TierBadge(tier: Tier.from(score: overall))
            }
            HStack(spacing: 24) {
                ScoreRing(score: overall, maxScore: 1000, tint: .accentColor, label: "Overall")
                    .frame(width: 110, height: 110)
                VStack(alignment: .leading, spacing: 8) {
                    StatRow(label: "Trust", value: String(format: "%.0f%%", trust * 100))
                    StatRow(label: "Submissions", value: "\(user.submissions.count)")
                    StatRow(label: "Member Since", value: user.createdAt.formatted(date: .abbreviated, time: .omitted))
                }
                Spacer()
            }
        }
        .padding(20)
        .background(Color(.secondarySystemGroupedBackground), in: .rect(cornerRadius: 18))
    }
}

private struct StatRow: View {
    let label: String
    let value: String
    var body: some View {
        HStack {
            Text(label).foregroundStyle(.secondary).font(.subheadline)
            Spacer(minLength: 12)
            Text(value).font(.subheadline.weight(.semibold))
        }
    }
}

private struct DomainCard: View {
    let progress: DomainProgress
    var domain: Domain { progress.domain }

    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            HStack {
                Image(systemName: domain.icon)
                    .font(.title3)
                    .foregroundStyle(domain.tint)
                Text(domain.title).font(.headline)
                Spacer()
                TierBadge(tier: progress.tier)
            }

            HStack(spacing: 18) {
                ScoreRing(score: progress.effectiveScore, maxScore: 1000, tint: domain.tint, label: "Score")
                    .frame(width: 90, height: 90)
                VStack(alignment: .leading, spacing: 6) {
                    MiniBar(label: "Consistency", value: progress.consistency, tint: domain.tint)
                    MiniBar(label: "Effort", value: progress.effort, tint: domain.tint)
                    MiniBar(label: "Improvement", value: progress.improvement, tint: domain.tint)
                    MiniBar(label: "Proof Quality", value: progress.proofReliability, tint: domain.tint)
                }
            }

            HStack(spacing: 16) {
                Label("Streak \(progress.currentStreak)d", systemImage: "flame.fill")
                Label("Best \(progress.longestStreak)d", systemImage: "star.fill")
            }
            .font(.caption)
            .foregroundStyle(.secondary)
        }
        .padding(18)
        .background(Color(.secondarySystemGroupedBackground), in: .rect(cornerRadius: 18))
    }
}

private struct MiniBar: View {
    let label: String
    let value: Int
    let tint: Color
    var body: some View {
        VStack(alignment: .leading, spacing: 2) {
            HStack {
                Text(label).font(.caption2).foregroundStyle(.secondary)
                Spacer()
                Text("\(value)").font(.caption2.weight(.semibold))
            }
            GeometryReader { geo in
                ZStack(alignment: .leading) {
                    Capsule().fill(tint.opacity(0.15)).frame(height: 4)
                    Capsule().fill(tint).frame(width: geo.size.width * CGFloat(value) / 100, height: 4)
                }
            }
            .frame(height: 4)
        }
    }
}
