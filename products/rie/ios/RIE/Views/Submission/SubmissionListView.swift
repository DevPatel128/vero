import SwiftUI

struct SubmissionListView: View {
    @EnvironmentObject private var appState: AppState
    @State private var showSubmit = false
    @State private var filter: Domain? = nil

    var filteredSubmissions: [Submission] {
        let all = (appState.currentUser?.submissions ?? []).sorted { $0.createdAt > $1.createdAt }
        guard let filter else { return all }
        return all.filter { $0.domain == filter }
    }

    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 8) {
                        FilterChip(label: "All", active: filter == nil) { filter = nil }
                        ForEach(Domain.allCases) { d in
                            FilterChip(label: d.title, icon: d.icon, tint: d.tint, active: filter == d) {
                                filter = filter == d ? nil : d
                            }
                        }
                    }
                    .padding(.horizontal, 16)
                    .padding(.vertical, 8)
                }
                if filteredSubmissions.isEmpty {
                    EmptyState()
                } else {
                    List {
                        ForEach(filteredSubmissions) { sub in
                            SubmissionRow(submission: sub)
                        }
                    }
                    .listStyle(.insetGrouped)
                }
            }
            .background(Color(.systemGroupedBackground))
            .navigationTitle("Submissions")
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

private struct EmptyState: View {
    var body: some View {
        VStack(spacing: 10) {
            Image(systemName: "tray")
                .font(.system(size: 44, weight: .light))
                .foregroundStyle(.secondary)
            Text("No submissions yet")
                .font(.headline)
            Text("Tap + to log your first verified activity.")
                .font(.subheadline)
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}

private struct FilterChip: View {
    var label: String
    var icon: String? = nil
    var tint: Color = .accentColor
    var active: Bool
    var onTap: () -> Void
    var body: some View {
        Button(action: onTap) {
            HStack(spacing: 6) {
                if let icon { Image(systemName: icon) }
                Text(label).font(.subheadline.weight(.medium))
            }
            .padding(.horizontal, 12).padding(.vertical, 8)
            .background(active ? tint.opacity(0.18) : Color(.secondarySystemGroupedBackground), in: .capsule)
            .foregroundStyle(active ? tint : .primary)
        }
        .buttonStyle(.plain)
    }
}

private struct SubmissionRow: View {
    let submission: Submission
    var body: some View {
        HStack(spacing: 14) {
            ZStack {
                Circle().fill(submission.domain.tint.opacity(0.15)).frame(width: 44, height: 44)
                Image(systemName: submission.domain.icon).foregroundStyle(submission.domain.tint)
            }
            VStack(alignment: .leading, spacing: 4) {
                Text(submission.activityName).font(.subheadline.weight(.semibold))
                HStack(spacing: 6) {
                    Text(submission.proofType.label)
                    Text("·")
                    Text("\(submission.durationMinutes) min")
                    Text("·")
                    Text(submission.difficulty.label)
                }
                .font(.caption).foregroundStyle(.secondary)
            }
            Spacer()
            Text(submission.createdAt.formatted(.relative(presentation: .numeric)))
                .font(.caption2)
                .foregroundStyle(.secondary)
        }
        .padding(.vertical, 4)
    }
}
