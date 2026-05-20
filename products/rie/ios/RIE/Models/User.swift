import Foundation
import SwiftData

@Model
final class UserAccount {
    @Attribute(.unique) var id: String
    @Attribute(.unique) var usernameLower: String
    var displayName: String
    var emailEncrypted: String
    var emailHash: String
    var passwordHash: String
    var createdAt: Date
    var lastLoginAt: Date?
    var city: String = ""
    var region: String = ""
    var country: String = ""
    var countryCode: String = ""

    @Relationship(deleteRule: .cascade, inverse: \Submission.user)
    var submissions: [Submission] = []

    @Relationship(deleteRule: .cascade, inverse: \DomainProgress.user)
    var domains: [DomainProgress] = []

    @Relationship(deleteRule: .cascade, inverse: \TrustScoreRecord.user)
    var trust: TrustScoreRecord?

    @Relationship(deleteRule: .cascade, inverse: \GameAccount.user)
    var gameAccounts: [GameAccount] = []

    init(id: String = UUID().uuidString,
         usernameLower: String,
         displayName: String,
         emailEncrypted: String,
         emailHash: String,
         passwordHash: String,
         createdAt: Date = Date()) {
        self.id = id
        self.usernameLower = usernameLower
        self.displayName = displayName
        self.emailEncrypted = emailEncrypted
        self.emailHash = emailHash
        self.passwordHash = passwordHash
        self.createdAt = createdAt
    }
}
