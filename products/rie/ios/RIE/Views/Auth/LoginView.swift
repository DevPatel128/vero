import SwiftUI

struct LoginView: View {
    @EnvironmentObject private var appState: AppState
    @State private var email = ""
    @State private var password = ""
    @State private var error: String?
    @State private var loading = false

    var body: some View {
        VStack(spacing: 16) {
            FieldGroup {
                AppTextField(title: "Email", text: $email,
                             keyboard: .emailAddress, content: .emailAddress)
                Divider().padding(.leading, 16)
                AppSecureField(title: "Password", text: $password)
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
                    Text("Sign In").bold()
                }
                .frame(maxWidth: .infinity)
                .padding(.vertical, 14)
                .background(Color.accentColor, in: .rect(cornerRadius: 14))
                .foregroundStyle(.white)
            }
            .disabled(loading || email.isEmpty || password.isEmpty)
        }
    }

    private func submit() {
        loading = true
        error = nil
        Task { @MainActor in
            do {
                try appState.login(email: email, password: password)
            } catch {
                self.error = error.localizedDescription
                loading = false
            }
        }
    }
}
