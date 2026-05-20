import SwiftUI

struct RootView: View {
    @EnvironmentObject private var appState: AppState

    var body: some View {
        Group {
            if appState.currentUser != nil {
                MainTabView()
            } else {
                AuthHostView()
            }
        }
        .tint(.accentColor)
    }
}

struct MainTabView: View {
    var body: some View {
        TabView {
            DashboardView()
                .tabItem { Label("Dashboard", systemImage: "house.fill") }
            SubmissionListView()
                .tabItem { Label("Submissions", systemImage: "checkmark.seal.fill") }
            LeaderboardView()
                .tabItem { Label("Leaderboard", systemImage: "trophy.fill") }
            ProfileView()
                .tabItem { Label("Profile", systemImage: "person.fill") }
        }
    }
}
