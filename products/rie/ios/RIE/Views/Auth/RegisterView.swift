import SwiftUI

struct RegisterView: View {
    @EnvironmentObject private var appState: AppState
    @State private var displayName = ""
    @State private var email = ""
    @State private var password = ""
    @State private var error: String?
    @State private var loading = false

    var body: some View {
        VStack(spacing: 16) {
            FieldGroup {
                AppTextField(title: "Display name", text: $displayName, content: .nickname)
                Divider().padding(.leading, 16)
                AppTextField(title: "Email", text: $email,
                             keyboard: .emailAddress, content: .emailAddress)
                Divider().padding(.leading, 16)
                AppSecureField(title: "Password (8+ chars)", text: $password)
            }

            if let error {
                Text(error)
                    .font(.footnote)
                    .foregroundStyle(.red)
                    .frame(maxWidth: .infinity, alignment: .leading)
            }

            Button {
                submit()
            } label: {
                HStack {
                    if loading { ProgressView().tint(.white) }
                    Text("Create Account").bold()
                }
                .frame(maxWidth: .infinity)
                .padding(.vertical, 14)
                .background(Color.accentColor, in: .rect(cornerRadius: 14))
                .foregroundStyle(.white)
            }
            .disabled(loading || displayName.isEmpty || email.isEmpty || password.count < 8)

            Text("Email is encrypted with AES-256-GCM. Passwords are hashed with PBKDF2-SHA512 (210k iterations).")
                .font(.caption2)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
        }
    }

    private func submit() {
        loading = true
        error = nil
        Task { @MainActor in
            do {
                try appState.register(displayName: displayName, email: email, password: password)
            } catch {
                self.error = error.localizedDescription
                loading = false
            }
        }
    }
}
