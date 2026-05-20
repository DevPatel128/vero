import SwiftUI
import SwiftData

@main
struct RIEApp: App {
    let container: ModelContainer
    @StateObject private var appState: AppState

    init() {
        do {
            let schema = Schema([
                UserAccount.self,
                Submission.self,
                DomainProgress.self,
                TrustScoreRecord.self,
                GameAccount.self,
            ])
            let config = ModelConfiguration("RIE", schema: schema)
            let container = try ModelContainer(for: schema, configurations: config)
            self.container = container
            let state = try AppState(context: container.mainContext)
            _appState = StateObject(wrappedValue: state)
        } catch {
            fatalError("Failed to initialize SwiftData: \(error)")
        }
    }

    var body: some Scene {
        WindowGroup {
            RootView()
                .environmentObject(appState)
                .modelContainer(container)
        }
    }
}
