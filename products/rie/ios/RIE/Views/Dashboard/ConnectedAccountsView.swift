import SwiftUI

struct ConnectedAccountsView: View {
    @EnvironmentObject private var appState: AppState
    @Environment(\.dismiss) private var dismiss

    @State private var addPlatform: GamePlatform?
    @State private var handleDraft: String = ""
    @State private var busy = false
    @State private var error: String?
    @State private var status: String?

    var body: some View {
        NavigationStack {
            List {
                Section("Connected") {
                    let linked = appState.currentUser?.gameAccounts ?? []
                    if linked.isEmpty {
                        Text("No gaming accounts linked yet. Tap Connect below to verify your gameplay automatically.")
                            .font(.footnote).foregroundStyle(.secondary)
                    } else {
                        ForEach(linked) { account in
                            HStack {
                                Image(systemName: account.platform.icon).foregroundStyle(.tint)
                                VStack(alignment: .leading, spacing: 2) {
                                    Text(account.platform.title).font(.subheadline.weight(.semibold))
                                    Text(account.handle).font(.caption).foregroundStyle(.secondary)
                                }
                                Spacer()
                                Button {
                                    Task { await sync(account) }
                                } label: {
                                    if busy { ProgressView() }
                                    else { Text("Sync") }
                                }
                                .buttonStyle(.bordered)
                                .controlSize(.small)
                            }
                            .swipeActions {
                                Button(role: .destructive) {
                                    try? appState.gameAccounts.disconnect(account)
                                } label: { Label("Remove", systemImage: "trash") }
                            }
                        }
                    }
                }

                Section("Connect Platform") {
                    ForEach(GamePlatform.allCases) { p in
                        Button {
                            addPlatform = p
                            handleDraft = ""
                            error = nil
                        } label: {
                            HStack {
                                Image(systemName: p.icon)
                                Text(p.title)
                                Spacer()
                                Image(systemName: "plus.circle")
                            }
                        }
                    }
                }

                if let status {
                    Section { Text(status).font(.footnote).foregroundStyle(.secondary) }
                }
                if let error {
                    Section { Text(error).font(.footnote).foregroundStyle(.red) }
                }
            }
            .navigationTitle("Game Accounts")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Done") { dismiss() }
                }
            }
            .sheet(item: $addPlatform) { platform in
                connectSheet(platform)
            }
        }
    }

    private func connectSheet(_ platform: GamePlatform) -> some View {
        NavigationStack {
            Form {
                Section(platform.title) {
                    if platform.requiresUsername {
                        TextField(platform == .steam ? "Vanity URL or SteamID64" : "Username", text: $handleDraft)
                            .textInputAutocapitalization(.never)
                            .autocorrectionDisabled()
                    } else {
                        Text("Game Center will authenticate with your Apple ID.")
                            .font(.footnote).foregroundStyle(.secondary)
                    }
                }
                if let error {
                    Section { Text(error).foregroundStyle(.red).font(.footnote) }
                }
            }
            .navigationTitle("Connect \(platform.title)")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { addPlatform = nil }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button(busy ? "Connecting…" : "Connect") {
                        Task { await connect(platform) }
                    }
                    .bold()
                    .disabled(busy || (platform.requiresUsername && handleDraft.trimmingCharacters(in: .whitespaces).isEmpty))
                }
            }
        }
    }

    private func connect(_ platform: GamePlatform) async {
        guard let user = appState.currentUser else { return }
        busy = true; error = nil
        defer { busy = false }
        do {
            let account = try await appState.gameAccounts.connect(
                user: user,
                platform: platform,
                handle: handleDraft
            )
            status = "Connected \(platform.title) — \(account.handle)"
            addPlatform = nil
            await sync(account)
        } catch {
            self.error = error.localizedDescription
        }
    }

    private func sync(_ account: GameAccount) async {
        guard let user = appState.currentUser else { return }
        busy = true; error = nil
        defer { busy = false }
        do {
            let sessions = try await appState.gameAccounts.sync(account: account)
            var imported = 0
            for s in sessions {
                if (try? appState.submissions.submitFromGame(user: user, session: s)) != nil {
                    imported += 1
                }
            }
            status = "\(account.platform.title) · imported \(imported) session\(imported == 1 ? "" : "s")."
            appState.refresh()
        } catch {
            self.error = error.localizedDescription
        }
    }
}
