export const CATEGORIES = [
  { name: "Food", emoji: "🍽️", color: "#E8C8AC" },
  { name: "Leisure", emoji: "🎬", color: "#C9A96E" },
  { name: "Travel", emoji: "✈️", color: "#A8884F" },
  { name: "Utilities", emoji: "💡", color: "#9B8A6B" },
  { name: "Housing", emoji: "🏠", color: "#7A6F5C" },
  { name: "Transport", emoji: "🚗", color: "#5C5247" },
  { name: "Health", emoji: "🩺", color: "#3B7A3D" },
  { name: "Education", emoji: "📚", color: "#1F4E79" },
  { name: "Investments", emoji: "📈", color: "#0B3D2E" },
  { name: "Subscriptions", emoji: "🔁", color: "#7B3F00" },
  { name: "Shopping", emoji: "🛍️", color: "#B8860B" },
  { name: "Personal", emoji: "💆", color: "#8B5A2B" },
  { name: "Gifts", emoji: "🎁", color: "#C9A96E" },
  { name: "Other", emoji: "•", color: "#595959" },
] as const;

export type CategoryName = (typeof CATEGORIES)[number]["name"];

const RULES: Array<[RegExp, CategoryName]> = [
  [/uber|lyft|metro|gas|parking|chevron|shell/i, "Transport"],
  [/netflix|spotify|hulu|disney|prime|hbo|youtube/i, "Subscriptions"],
  [/airbnb|hotel|airlines|flight|expedia|booking/i, "Travel"],
  [/grocer|whole foods|trader joe|safeway|costco|walmart/i, "Food"],
  [/restaurant|cafe|coffee|starbucks|chipotle|mcdonald|doordash|grubhub/i, "Food"],
  [/rent|landlord|mortgage/i, "Housing"],
  [/electric|water|internet|wifi|comcast|verizon|at&t/i, "Utilities"],
  [/cvs|walgreens|pharmacy|doctor|clinic|hospital|gym|peloton/i, "Health"],
  [/coursera|udemy|edx|tuition|university|college|books/i, "Education"],
  [/robinhood|fidelity|vanguard|coinbase|schwab|wealthfront/i, "Investments"],
  [/amazon|target|best buy|nike|zara/i, "Shopping"],
  [/movie|cinema|concert|spotify|game|steam|playstation|xbox/i, "Leisure"],
];

export function classify(merchant: string, description?: string): CategoryName {
  const haystack = `${merchant} ${description ?? ""}`.toLowerCase();
  for (const [re, cat] of RULES) if (re.test(haystack)) return cat;
  return "Other";
}

export function categoryColor(name: string): string {
  return CATEGORIES.find((c) => c.name === name)?.color ?? "#595959";
}

export function categoryEmoji(name: string): string {
  return CATEGORIES.find((c) => c.name === name)?.emoji ?? "•";
}
