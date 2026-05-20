import SwiftUI

struct ProfileView: View {
    @EnvironmentObject private var appState: AppState
    @State private var confirmLogout = false

    var body: some View {
        NavigationStack {
            List {
                if let user = appState.currentUser {
                    Section {
                        HStack(spacing: 16) {
                            ZStack {
                                Circle().fill(Color.accentColor.opacity(0.18)).frame(width: 64, height: 64)
                                Text(initials(user.displayName))
                                    .font(.title2.bold()).foregroundStyle(Color.accentColor)
                            }
                            VStack(alignment: .leading, spacing: 4) {
                                Text(user.displayName).font(.headline)
                                Text(appState.auth.decryptEmail(user))
                                    .font(.subheadline).foregroundStyle(.secondary)
                            }
                        }
                        .padding(.vertical, 8)
                    }

                    Section("Trust") {
                        if let trust = user.trust {
                            TrustBar(label: "Overall", value: trust.overall)
                            TrustBar(label: "Proof Authenticity", value: trust.proofAuthenticity)
                            TrustBar(label: "Behavioral Consistency", value: trust.behavioralConsistency)
                            TrustBar(label: "Account Maturity", value: trust.accountMaturity)
                            TrustBar(label: "Fraud Signals", value: trust.fraudSignals)
                        }
                    }

                    Section("Security") {
                        Label("Password: PBKDF2-SHA512 (210k iter)", systemImage: "lock.shield.fill")
                        Label("Email: AES-256-GCM at rest", systemImage: "envelope.badge.shield.half.filled")
                        Label("Session: HMAC-SHA256 signed token", systemImage: "key.fill")
                    }
                    .font(.footnote)

                    Section {
                        Button(role: .destructive) { confirmLogout = true } label: {
                            Label("Sign Out", systemImage: "rectangle.portrait.and.arrow.right")
                        }
                    }
                }
            }
            .navigationTitle("Profile")
            .confirmationDialog("Sign out?", isPresented: $confirmLogout, titleVisibility: .visible) {
                Button("Sign Out", role: .destructive) { appState.logout() }
                Button("Cancel", role: .cancel) {}
            }
        }
    }

    private func initials(_ name: String) -> String {
        let parts = name.split(separator: " ").prefix(2)
        return parts.compactMap { $0.first.map(String.init) }.joined().uppercased()
    }
}

private struct TrustBar: View {
    let label: String
    let value: Double
    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            HStack {
                Text(label).font(.subheadline)
                Spacer()
                Text(String(format: "%.0f%%", value * 100)).font(.subheadline.monospacedDigit())
            }
            GeometryReader { geo in
                ZStack(alignment: .leading) {
                    Capsule().fill(Color.accentColor.opacity(0.15)).frame(height: 6)
                    Capsule().fill(Color.accentColor).frame(width: geo.size.width * value, height: 6)
                }
            }
            .frame(height: 6)
        }
        .padding(.vertical, 2)
    }
}
