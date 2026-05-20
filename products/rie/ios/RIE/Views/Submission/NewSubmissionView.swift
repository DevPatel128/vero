import SwiftUI
import PhotosUI

struct NewSubmissionView: View {
    @EnvironmentObject private var appState: AppState
    @Environment(\.dismiss) private var dismiss

    @State private var domain: Domain = .content
    @State private var activity: ActivityCatalogEntry?
    @State private var duration: Int = 30
    @State private var notes: String = ""
    @State private var photoItem: PhotosPickerItem?
    @State private var photoData: Data?
    @State private var error: String?
    @State private var status: String?
    @State private var saving = false

    var activities: [ActivityCatalogEntry] { ActivityCatalog.entries(for: domain) }

    var body: some View {
        NavigationStack {
            Form {
                Section("Domain") {
                    Picker("Domain", selection: $domain) {
                        ForEach(Domain.allCases) { d in
                            Label(d.title, systemImage: d.icon).tag(d)
                        }
                    }
                    .onChange(of: domain) { _, _ in activity = nil }
                }

                if domain == .fitness {
                    Section {
                        Label("Fitness submissions are imported from Apple Health only.",
                              systemImage: "heart.text.square")
                            .font(.footnote)
                        Text("Open the Dashboard and tap **Sync Apple Health** to import verified workouts. Manual entry is disabled to prevent fake activity.")
                            .font(.footnote).foregroundStyle(.secondary)
                    }
                } else if domain == .gaming {
                    Section {
                        Label("Gaming submissions are imported from connected accounts only.",
                              systemImage: "gamecontroller")
                            .font(.footnote)
                        Text("Connect Steam, Chess.com, Lichess, Game Center, or Xbox on the Dashboard to sync verified sessions.")
                            .font(.footnote).foregroundStyle(.secondary)
                    }
                } else {
                    contentFormSections
                }

                if let status {
                    Section { Text(status).foregroundStyle(.secondary).font(.footnote) }
                }
                if let error {
                    Section { Text(error).foregroundStyle(.red).font(.footnote) }
                }
            }
            .navigationTitle("New Submission")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button(saving ? "Verifying…" : "Submit") {
                        Task { await submit() }
                    }
                    .disabled(!canSubmit || saving)
                    .bold()
                }
            }
        }
    }

    @ViewBuilder
    private var contentFormSections: some View {
        Section("Activity") {
            Picker("Activity", selection: $activity) {
                Text("Select…").tag(ActivityCatalogEntry?.none)
                ForEach(activities) { a in
                    Text(a.name).tag(Optional(a))
                }
            }
            if let a = activity {
                HStack {
                    Label(a.difficulty.label, systemImage: "bolt.fill")
                    Spacer()
                    Text("Min \(a.minDuration) min").foregroundStyle(.secondary)
                }
                .font(.footnote)
            }
        }

        Section("Duration") {
            Stepper(value: $duration, in: 5...600, step: 5) {
                HStack {
                    Text("Duration")
                    Spacer()
                    Text("\(duration) min").foregroundStyle(.secondary)
                }
            }
        }

        Section("Original Content (required)") {
            PhotosPicker(selection: $photoItem, matching: .any(of: [.images, .videos])) {
                HStack {
                    Image(systemName: "photo.on.rectangle.angled")
                    Text(photoData == nil ? "Attach original media" : "Media attached — tap to replace")
                    Spacer()
                    if photoData != nil {
                        Image(systemName: "checkmark.circle.fill").foregroundStyle(.green)
                    }
                }
            }
            .onChange(of: photoItem) { _, item in
                Task {
                    if let item, let data = try? await item.loadTransferable(type: Data.self) {
                        photoData = data
                    }
                }
            }
            Text("Uploaded media is scanned by the RIE verification engine. AI-generated or duplicate uploads are rejected.")
                .font(.caption).foregroundStyle(.secondary)
        }

        Section("Notes") {
            TextField("Describe the work you're submitting…", text: $notes, axis: .vertical)
                .lineLimit(3...6)
        }
    }

    private var canSubmit: Bool {
        guard domain == .content else { return false }
        return activity != nil && photoData != nil
    }

    private func submit() async {
        guard let user = appState.currentUser, let activity, let data = photoData else { return }
        saving = true; error = nil; status = "Running verification engine…"
        defer { saving = false }
        do {
            let result = try await appState.contentVerifier.verify(
                media: data,
                declaredTitle: activity.name,
                userId: user.id
            )
            status = "AI probability \(Int(result.aiProbability * 100))% · originality \(Int(result.originalityScore * 100))%"
            _ = try appState.submissions.submitContent(
                user: user,
                activity: activity,
                durationMinutes: duration,
                notes: notes,
                mediaData: data,
                verification: result
            )
            appState.refresh()
            dismiss()
        } catch {
            self.error = error.localizedDescription
            status = nil
        }
    }
}
