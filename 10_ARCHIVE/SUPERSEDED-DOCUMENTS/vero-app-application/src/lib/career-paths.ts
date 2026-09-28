export interface CareerPathOption {
  slug: string;
  label: string;
  category: string;
}

export const CAREER_PATHS: CareerPathOption[] = [
  { slug: "home-chef", category: "Culinary", label: "Home Chef" },
  { slug: "baker", category: "Culinary", label: "Baker" },
  { slug: "meal-prep", category: "Culinary", label: "Meal Prep Assistant" },
  { slug: "catering", category: "Culinary", label: "Catering Assistant" },
  { slug: "photographer", category: "Creative", label: "Photographer" },
  { slug: "videographer", category: "Creative", label: "Videographer" },
  { slug: "video-editor", category: "Creative", label: "Video Editor" },
  { slug: "graphic-designer", category: "Creative", label: "Graphic Designer" },
  { slug: "personal-assistant", category: "Family Support", label: "Personal Assistant" },
  { slug: "household-coordinator", category: "Family Support", label: "Household Coordinator" },
  { slug: "cleaning-specialist", category: "Family Support", label: "Deep Cleaning Specialist" },
  { slug: "kitchen-support", category: "Family Support", label: "Kitchen Support" },
  { slug: "store-assistant", category: "Operations", label: "Store Assistant" },
  { slug: "admin-support", category: "Operations", label: "Admin Support" },
  { slug: "event-support", category: "Operations", label: "Event Support" },
  { slug: "inventory-assistant", category: "Operations", label: "Inventory Assistant" },
  { slug: "fitness-coach", category: "Fitness", label: "Fitness Coach" },
  { slug: "personal-trainer", category: "Fitness", label: "Personal Trainer Assistant" },
  { slug: "yoga-assistant", category: "Fitness", label: "Yoga Assistant" },
  { slug: "group-workout", category: "Fitness", label: "Group Workout Assistant" },
  { slug: "event-setup", category: "Events", label: "Event Setup" },
  { slug: "event-coordination", category: "Events", label: "Event Coordination" },
  { slug: "venue-ops", category: "Events", label: "Venue Operations" },
  { slug: "guest-management", category: "Events", label: "Guest Management" },
];

export const ZONES = [
  { slug: "whitefield", label: "Whitefield" },
  { slug: "hsr-layout", label: "HSR Layout" },
  { slug: "koramangala", label: "Koramangala" },
  { slug: "sarjapur", label: "Sarjapur" },
  { slug: "electronic-city", label: "Electronic City" },
];
