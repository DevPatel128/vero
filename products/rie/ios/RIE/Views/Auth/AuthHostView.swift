import SwiftUI

struct AuthHostView: View {
    @State private var mode: Mode = .login
    enum Mode { case login, register }

    var body: some View {
        NavigationStack {
            ZStack {
                LinearGradient(
                    colors: [Color(.systemBackground), Color.accentColor.opacity(0.08)],
                    startPoint: .top, endPoint: .bottom
                )
                .ignoresSafeArea()

                ScrollView {
                    VStack(spacing: 24) {
                        VStack(spacing: 8) {
                            Image(systemName: "shield.lefthalf.filled.badge.checkmark")
                                .font(.system(size: 64, weight: .light))
                                .foregroundStyle(.tint)
                            Text("RIE")
                                .font(.system(size: 40, weight: .bold, design: .rounded))
                            Text("Proof of discipline.")
                                .font(.subheadline)
                                .foregroundStyle(.secondary)
                        }
                        .padding(.top, 40)

                        Picker("", selection: $mode) {
                            Text("Sign In").tag(Mode.login)
                            Text("Sign Up").tag(Mode.register)
                        }
                        .pickerStyle(.segmented)
                        .padding(.horizontal, 24)

                        Group {
                            if mode == .login {
                                LoginView()
                            } else {
                                RegisterView()
                            }
                        }
                        .padding(.horizontal, 24)
                    }
                    .padding(.bottom, 32)
                }
            }
        }
    }
}
