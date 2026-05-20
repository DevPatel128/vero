import Foundation
import SwiftData
import Combine

@MainActor
final class AppState: ObservableObject {
    @Published private(set) var currentUser: UserAccount?
    let auth: AuthService
    let submissions: SubmissionService
    let location: LocationService
    let health: HealthSyncService
    let gameAccounts: GameAccountService
    let contentVerifier: ContentVerifier
    let context: ModelContext

    init(context: ModelContext) throws {
        self.context = context
        self.auth = try AuthService(context: context)
        self.submissions = try SubmissionService(context: context)
        self.location = LocationService()
        self.health = HealthSyncService()
        self.gameAccounts = GameAccountService(context: context)
        self.contentVerifier = ContentVerifier()
        self.currentUser = self.auth.currentUser
    }

    func register(displayName: String, email: String, password: String) throws {
        let user = try auth.register(displayName: displayName, email: email, password: password)
        currentUser = user
        objectWillChange.send()
        Task { await self.captureLocation(for: user) }
    }

    func login(email: String, password: String) throws {
        let user = try auth.login(email: email, password: password)
        currentUser = user
        objectWillChange.send()
        Task { await self.captureLocation(for: user) }
    }

    func logout() {
        auth.logout()
        currentUser = nil
    }

    func refresh() {
        guard let user = currentUser else { return }
        submissions.recalculate(for: user)
        objectWillChange.send()
    }

    private func captureLocation(for user: UserAccount) async {
        guard user.city.isEmpty || user.country.isEmpty else { return }
        location.request()
        guard let loc = try? await location.resolve() else { return }
        user.city = loc.city
        user.region = loc.region
        user.country = loc.country
        user.countryCode = loc.countryCode
        try? context.save()
        objectWillChange.send()
    }
}
