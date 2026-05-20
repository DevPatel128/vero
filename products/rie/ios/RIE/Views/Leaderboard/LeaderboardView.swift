import SwiftUI

enum LeaderboardScope: String, CaseIterable, Identifiable {
    case city, state, national, international
    var id: String { rawValue }
    var title: String {
        switch self {
        case .city: return "City"
        case .state: return "State"
        case .national: return "National"
        case .international: return "International"
        }
    }
    var icon: String {
        switch self {
        case .city: return "building.2.fill"
        case .state: return "map.fill"
        case .national: return "flag.fill"
        case .international: return "globe"
        }
    }
}

struct LeaderboardEntry: Identifiable {
    let id: String
    let displayName: String
    let city: String
    let region: String
    let country: String
    let countryCode: String
    let score: Int
    let tier: Tier
    let isMe: Bool
}

struct LeaderboardView: View {
    @EnvironmentObject private var appState: AppState
    @State private var domain: Domain? = nil
    @State private var scope: LeaderboardScope = .city

    private let seeds: [LeaderboardEntry] = [
        .init(id: "s1",  displayName: "Aria",   city: "New York",    region: "New York",      country: "United States",   countryCode: "US", score: 872, tier: .diamond,  isMe: false),
        .init(id: "s2",  displayName: "Kai",    city: "Los Angeles", region: "California",    country: "United States",   countryCode: "US", score: 810, tier: .diamond,  isMe: false),
        .init(id: "s3",  displayName: "Nova",   city: "New York",    region: "New York",      country: "United States",   countryCode: "US", score: 745, tier: .platinum, isMe: false),
        .init(id: "s4",  displayName: "Theo",   city: "London",      region: "England",       country: "United Kingdom",  countryCode: "GB", score: 702, tier: .platinum, isMe: false),
        .init(id: "s5",  displayName: "Mira",   city: "Toronto",     region: "Ontario",       country: "Canada",          countryCode: "CA", score: 655, tier: .platinum, isMe: false),
        .init(id: "s6",  displayName: "Ren",    city: "Tokyo",       region: "Tokyo",         country: "Japan",           countryCode: "JP", score: 588, tier: .gold,     isMe: false),
        .init(id: "s7",  displayName: "Juno",   city: "Berlin",      region: "Berlin",        country: "Germany",         countryCode: "DE", score: 540, tier: .gold,     isMe: false),
        .init(id: "s8",  displayName: "Sage",   city: "New York",    region: "New York",      country: "United States",   countryCode: "US", score: 498, tier: .silver,   isMe: false),
        .init(id: "s9",  displayName: "Iris",   city: "Sydney",      region: "New South Wales", country: "Australia",     countryCode: "AU", score: 431, tier: .silver,   isMe: false),
        .init(id: "s10", displayName: "Leo",    city: "Los Angeles", region: "California",    country: "United States",   countryCode: "US", score: 380, tier: .silver,   isMe: false),
        .init(id: "s11", displayName: "Onyx",   city: "São Paulo",   region: "São Paulo",     country: "Brazil",          countryCode: "BR", score: 312, tier: .bronze,   isMe: false),
        .init(id: "s12", displayName: "Vera",   city: "Mumbai",      region: "Maharashtra",   country: "India",           countryCode: "IN", score: 268, tier: .bronze,   isMe: false),
        .init(id: "s13", displayName: "Cleo",   city: "Paris",       region: "Île-de-France", country: "France",          countryCode: "FR", score: 210, tier: .bronze,   isMe: false),
        .init(id: "s14", displayName: "Bex",    city: "New York",    region: "New York",      country: "United States",   countryCode: "US", score: 175, tier: .unranked, isMe: false),
        .init(id: "s15", displayName: "Wren",   city: "Chicago",     region: "Illinois",      country: "United States",   countryCode: "US", score: 142, tier: .unranked, isMe: false),
    ]

    var myEntry: LeaderboardEntry? {
        guard let me = appState.currentUser else { return nil }
        let myScore: Int = {
            if let domain {
                return me.domains.first(where: { $0.domain == domain })?.effectiveScore ?? 0
            }
            return me.domains.isEmpty ? 0 : me.domains.map(\.effectiveScore).reduce(0, +) / me.domains.count
        }()
        return LeaderboardEntry(
            id: me.id,
            displayName: me.displayName,
            city: me.city,
            region: me.region,
            country: me.country,
            countryCode: me.countryCode,
            score: myScore,
            tier: Tier.from(score: myScore),
            isMe: true
        )
    }

    var entries: [LeaderboardEntry] {
        var list = seeds
        if let me = myEntry { list.append(me) }
        guard let me = myEntry else { return list.sorted { $0.score > $1.score } }
        let filtered = list.filter { entry in
            switch scope {
            case .city:
                guard !me.city.isEmpty else { return entry.isMe }
                return entry.city.caseInsensitiveCompare(me.city) == .orderedSame
            case .state:
                guard !me.region.isEmpty else { return entry.isMe }
                return entry.region.caseInsensitiveCompare(me.region) == .orderedSame
            case .national:
                guard !me.countryCode.isEmpty else { return entry.isMe }
                return entry.countryCode.caseInsensitiveCompare(me.countryCode) == .orderedSame
            case .international:
                return true
            }
        }
        return filtered.sorted { $0.score > $1.score }
    }

    var locationSubtitle: String {
        guard let me = myEntry else { return "Location not set" }
        switch scope {
        case .city: return me.city.isEmpty ? "City unknown — enable location" : me.city
        case .state: return me.region.isEmpty ? "Region unknown" : me.region
        case .national: return me.country.isEmpty ? "Country unknown" : me.country
        case .international: return "Global"
        }
    }

    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 8) {
                        ForEach(LeaderboardScope.allCases) { s in
                            ScopeChip(scope: s, active: scope == s) { scope = s }
                        }
                    }
                    .padding(.horizontal, 16).padding(.vertical, 8)
                }
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 8) {
                        DomainChip(label: "Overall", active: domain == nil) { domain = nil }
                        ForEach(Domain.allCases) { d in
                            DomainChip(label: d.title, icon: d.icon, tint: d.tint, active: domain == d) {
                                domain = domain == d ? nil : d
                            }
                        }
                    }
                    .padding(.horizontal, 16).padding(.bottom, 6)
                }

                HStack {
                    Label(locationSubtitle, systemImage: scope.icon)
                        .font(.footnote).foregroundStyle(.secondary)
                    Spacer()
                    Text("\(entries.count) players")
                        .font(.footnote).foregroundStyle(.secondary)
                }
                .padding(.horizontal, 20).padding(.bottom, 6)

                List {
                    ForEach(Array(entries.enumerated()), id: \.element.id) { index, entry in
                        LeaderboardRow(rank: index + 1, entry: entry)
                            .listRowBackground(entry.isMe ? Color.accentColor.opacity(0.10) : nil)
                    }
                }
                .listStyle(.insetGrouped)
            }
            .background(Color(.systemGroupedBackground))
            .navigationTitle("Leaderboard")
        }
    }
}

private struct LeaderboardRow: View {
    let rank: Int
    let entry: LeaderboardEntry
    var body: some View {
        HStack(spacing: 14) {
            Text("\(rank)")
                .font(.headline.monospacedDigit())
                .frame(width: 32, alignment: .leading)
                .foregroundStyle(rank <= 3 ? Color.accentColor : .secondary)
            Image(systemName: entry.isMe ? "person.crop.circle.fill" : "person.crop.circle")
                .font(.title2)
                .foregroundStyle(entry.isMe ? Color.accentColor : .secondary)
            VStack(alignment: .leading, spacing: 2) {
                Text(entry.displayName).font(.subheadline.weight(.semibold))
                HStack(spacing: 6) {
                    TierBadge(tier: entry.tier)
                    if !entry.city.isEmpty {
                        Text("· \(entry.city)")
                            .font(.caption2).foregroundStyle(.secondary)
                    }
                }
            }
            Spacer()
            Text("\(entry.score)").font(.headline.monospacedDigit())
        }
        .padding(.vertical, 4)
    }
}

private struct ScopeChip: View {
    let scope: LeaderboardScope
    let active: Bool
    let onTap: () -> Void
    var body: some View {
        Button(action: onTap) {
            HStack(spacing: 6) {
                Image(systemName: scope.icon)
                Text(scope.title).font(.subheadline.weight(.semibold))
            }
            .padding(.horizontal, 14).padding(.vertical, 9)
            .background(active ? Color.accentColor.opacity(0.18) : Color(.secondarySystemGroupedBackground), in: .capsule)
            .foregroundStyle(active ? Color.accentColor : .primary)
        }
        .buttonStyle(.plain)
    }
}

private struct DomainChip: View {
    var label: String
    var icon: String? = nil
    var tint: Color = .accentColor
    var active: Bool
    var onTap: () -> Void
    var body: some View {
        Button(action: onTap) {
            HStack(spacing: 6) {
                if let icon { Image(systemName: icon) }
                Text(label).font(.subheadline.weight(.medium))
            }
            .padding(.horizontal, 12).padding(.vertical, 7)
            .background(active ? tint.opacity(0.18) : Color(.secondarySystemGroupedBackground), in: .capsule)
            .foregroundStyle(active ? tint : .primary)
        }
        .buttonStyle(.plain)
    }
}
