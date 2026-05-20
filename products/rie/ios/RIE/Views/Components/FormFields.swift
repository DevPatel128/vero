import SwiftUI

struct FieldGroup<Content: View>: View {
    @ViewBuilder var content: Content
    var body: some View {
        VStack(spacing: 0) { content }
            .background(Color(.secondarySystemGroupedBackground), in: .rect(cornerRadius: 14))
    }
}

struct AppTextField: View {
    let title: String
    @Binding var text: String
    var keyboard: UIKeyboardType = .default
    var content: UITextContentType? = nil

    var body: some View {
        TextField(title, text: $text)
            .textInputAutocapitalization(keyboard == .emailAddress ? .never : .sentences)
            .autocorrectionDisabled(keyboard == .emailAddress)
            .keyboardType(keyboard)
            .textContentType(content)
            .padding(.horizontal, 16)
            .padding(.vertical, 14)
    }
}

struct AppSecureField: View {
    let title: String
    @Binding var text: String

    var body: some View {
        SecureField(title, text: $text)
            .textContentType(.password)
            .padding(.horizontal, 16)
            .padding(.vertical, 14)
    }
}

struct ScoreRing: View {
    let score: Int
    let maxScore: Int
    let tint: Color
    var label: String? = nil

    var body: some View {
        ZStack {
            Circle()
                .stroke(tint.opacity(0.15), lineWidth: 10)
            Circle()
                .trim(from: 0, to: min(1, CGFloat(score) / CGFloat(maxScore)))
                .stroke(tint, style: StrokeStyle(lineWidth: 10, lineCap: .round))
                .rotationEffect(.degrees(-90))
                .animation(.easeOut(duration: 0.6), value: score)
            VStack(spacing: 0) {
                Text("\(score)")
                    .font(.system(size: 28, weight: .bold, design: .rounded))
                if let label {
                    Text(label).font(.caption).foregroundStyle(.secondary)
                }
            }
        }
    }
}

struct TierBadge: View {
    let tier: Tier
    var body: some View {
        Text(tier.label.uppercased())
            .font(.caption2.bold())
            .padding(.horizontal, 8).padding(.vertical, 4)
            .background(tier.color.opacity(0.18), in: .capsule)
            .foregroundStyle(tier.color)
    }
}
