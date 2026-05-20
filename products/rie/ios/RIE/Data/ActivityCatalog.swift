import Foundation

enum ActivityCatalog {
    static let all: [ActivityCatalogEntry] = fitness + content + gaming

    static func entries(for domain: Domain) -> [ActivityCatalogEntry] {
        all.filter { $0.domain == domain }
    }

    static func find(_ id: String) -> ActivityCatalogEntry? {
        all.first(where: { $0.id == id })
    }

    static let fitness: [ActivityCatalogEntry] = [
        .init(id: "running",        name: "Running",         category: "Cardio",   domain: .fitness, difficulty: .medium, minDuration: 20, proofTypes: [.device, .api],            icon: "figure.run"),
        .init(id: "weightlifting",  name: "Weightlifting",   category: "Strength", domain: .fitness, difficulty: .medium, minDuration: 20, proofTypes: [.device, .video, .imageMetadata], icon: "dumbbell.fill"),
        .init(id: "hiit",           name: "HIIT",            category: "HIIT",     domain: .fitness, difficulty: .hard,   minDuration: 15, proofTypes: [.device, .video],          icon: "flame.fill"),
        .init(id: "yoga",           name: "Yoga",            category: "Yoga",     domain: .fitness, difficulty: .easy,   minDuration: 20, proofTypes: [.device, .video],          icon: "figure.mind.and.body"),
        .init(id: "cycling",        name: "Cycling",         category: "Cardio",   domain: .fitness, difficulty: .medium, minDuration: 30, proofTypes: [.device, .api],            icon: "bicycle"),
        .init(id: "swimming",       name: "Swimming",        category: "Cardio",   domain: .fitness, difficulty: .hard,   minDuration: 20, proofTypes: [.device, .api],            icon: "figure.pool.swim"),
        .init(id: "calisthenics",   name: "Calisthenics",    category: "Bodyweight", domain: .fitness, difficulty: .medium, minDuration: 20, proofTypes: [.device, .video],        icon: "figure.strengthtraining.traditional"),
        .init(id: "boxing",         name: "Boxing",          category: "Martial Arts", domain: .fitness, difficulty: .hard, minDuration: 20, proofTypes: [.device, .video],        icon: "figure.boxing"),
    ]

    static let content: [ActivityCatalogEntry] = [
        .init(id: "video_long",     name: "Long-form Video", category: "Video",    domain: .content, difficulty: .hard,   minDuration: 60, proofTypes: [.api, .video],             icon: "video.fill"),
        .init(id: "video_short",    name: "Short-form Video",category: "Video",    domain: .content, difficulty: .medium, minDuration: 15, proofTypes: [.api, .video],             icon: "play.rectangle.fill"),
        .init(id: "blog_post",      name: "Blog Post",       category: "Writing",  domain: .content, difficulty: .medium, minDuration: 45, proofTypes: [.api, .manualDetailed],    icon: "doc.text.fill"),
        .init(id: "podcast",        name: "Podcast Episode", category: "Audio",    domain: .content, difficulty: .hard,   minDuration: 30, proofTypes: [.api, .video],             icon: "mic.fill"),
        .init(id: "newsletter",     name: "Newsletter",      category: "Writing",  domain: .content, difficulty: .medium, minDuration: 30, proofTypes: [.api, .manualDetailed],    icon: "envelope.fill"),
        .init(id: "social_post",    name: "Social Post",     category: "Social",   domain: .content, difficulty: .easy,   minDuration: 10, proofTypes: [.api, .imageMetadata],     icon: "bubble.left.fill"),
        .init(id: "code_commit",    name: "Code / Open Source", category: "Code", domain: .content, difficulty: .medium, minDuration: 30, proofTypes: [.api, .manualDetailed],    icon: "chevron.left.forwardslash.chevron.right"),
        .init(id: "art_piece",      name: "Art / Design",    category: "Visual",   domain: .content, difficulty: .medium, minDuration: 30, proofTypes: [.imageMetadata, .video],   icon: "paintpalette.fill"),
    ]

    static let gaming: [ActivityCatalogEntry] = [
        .init(id: "ranked_match",   name: "Ranked Match",    category: "Competitive", domain: .gaming, difficulty: .hard,   minDuration: 20, proofTypes: [.api, .video],             icon: "trophy.fill"),
        .init(id: "tournament",     name: "Tournament",      category: "Competitive", domain: .gaming, difficulty: .extreme, minDuration: 60, proofTypes: [.api, .video],            icon: "rosette"),
        .init(id: "speedrun",       name: "Speedrun Attempt",category: "Skill",       domain: .gaming, difficulty: .hard,   minDuration: 30, proofTypes: [.video, .api],             icon: "stopwatch.fill"),
        .init(id: "chess",          name: "Chess Session",   category: "Strategy",    domain: .gaming, difficulty: .medium, minDuration: 30, proofTypes: [.api],                     icon: "checkerboard.rectangle"),
        .init(id: "training",       name: "Training / Aim",  category: "Practice",    domain: .gaming, difficulty: .medium, minDuration: 20, proofTypes: [.api, .video],             icon: "target"),
        .init(id: "vod_review",     name: "VOD Review",      category: "Study",       domain: .gaming, difficulty: .easy,   minDuration: 30, proofTypes: [.video, .manualDetailed],  icon: "tv.fill"),
        .init(id: "casual_session", name: "Casual Session",  category: "Practice",    domain: .gaming, difficulty: .easy,   minDuration: 30, proofTypes: [.api, .video],             icon: "gamecontroller.fill"),
    ]
}
