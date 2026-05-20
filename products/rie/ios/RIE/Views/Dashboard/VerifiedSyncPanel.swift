import SwiftUI
import HealthKit

struct VerifiedSyncPanel: View {
    @EnvironmentObject private var appState: AppState
    @State private var syncing = false
    @State private var status: String?
    @State private var error: String?
    @State private var showConnectSheet = false

    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            HStack {
                Image(systemName: "checkmark.seal.fill").foregroundStyle(.green)
                Text("Verified Sync").font(.headline)
                Spacer()
            }

            Button {
                Task { await syncHealth() }
            } label: {
                HStack {
                    Image(systemName: "heart.fill").foregroundStyle(.red)
                    Text("Sync Apple Health")
                    Spacer()
                    if syncing { ProgressView() }
                    else { Image(systemName: "arrow.triangle.2.circlepath") }
                }
                .padding(14)
                .background(Color(.tertiarySystemGroupedBackground), in: .rect(cornerRadius: 12))
            }
            .buttonStyle(.plain)
            .disabled(syncing)

            Button {
                showConnectSheet = true
            } label: {
                HStack {
                    Image(systemName: "gamecontroller.fill").foregroundStyle(.blue)
                    Text("Connect Gaming Accounts")
                    Spacer()
                    let count = appState.currentUser?.gameAccounts.count ?? 0
                    Text(count > 0 ? "\(count) linked" : "None")
                        .font(.caption).foregroundStyle(.secondary)
                    Image(systemName: "chevron.right").foregroundStyle(.secondary)
                }
                .padding(14)
                .background(Color(.tertiarySystemGroupedBackground), in: .rect(cornerRadius: 12))
            }
            .buttonStyle(.plain)

            if let status {
                Label(status, systemImage: "info.circle")
                    .font(.footnote).foregroundStyle(.secondary)
            }
            if let error {
                Label(error, systemImage: "exclamationmark.triangle.fill")
                    .font(.footnote).foregroundStyle(.red)
            }
        }
        .padding(18)
        .background(Color(.secondarySystemGroupedBackground), in: .rect(cornerRadius: 18))
        .sheet(isPresented: $showConnectSheet) {
            ConnectedAccountsView()
        }
    }

    private func syncHealth() async {
        guard let user = appState.currentUser else { return }
        syncing = true; error = nil; status = nil
        defer { syncing = false }
        do {
            try await appState.health.requestAuthorization()
            let since = Date().addingTimeInterval(-60 * 60 * 24 * 14)
            let workouts = try await appState.health.fetchRecentWorkouts(since: since)
            var imported = 0
            for w in workouts {
                if (try? appState.submissions.submitFromHealth(user: user, workout: w)) != nil {
                    imported += 1
                }
            }
            status = "Imported \(imported) workout\(imported == 1 ? "" : "s")."
            appState.refresh()
        } catch {
            self.error = error.localizedDescription
        }
    }
}
