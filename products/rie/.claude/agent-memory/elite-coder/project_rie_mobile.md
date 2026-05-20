---
name: RIE Mobile App Context
description: Architecture decisions and constraints for the RIE discipline app mobile screens
type: project
---

RIE is a discipline verification platform. The mobile app lives at `apps/mobile/` using Expo + React Native + Expo Router (file-based).

**Why:** Building iOS mobile screens for user discipline tracking across Fitness, Content, Gaming domains.

**How to apply:** When modifying or extending mobile screens, respect the constraints and patterns below.

Key constraints discovered:
- `@rie/shared` is NOT installed in mobile's node_modules — types and activity data must be inlined into `apps/mobile/lib/`
- No `expo-secure-store` installed — token storage uses in-memory store in `lib/auth.ts`
- No `expo-image-picker` installed — photo upload uses a placeholder UI
- No `@react-native-async-storage/async-storage` installed
- Icons use `lucide-react-native` (not `@expo/vector-icons`)
- `SafeAreaProvider` is set up in `app/_layout.tsx`; individual screens use `SafeAreaView` from `react-native-safe-area-context`

File layout created:
- `context/AuthContext.tsx` — AuthProvider with login/logout, validates token on mount via GET /auth/me
- `lib/api.ts` — typed fetch wrapper with Bearer token support
- `lib/auth.ts` — in-memory token store (TokenStore)
- `lib/types.ts` — mirrored types from @rie/shared
- `lib/activities.ts` — popular activities for all 3 domains
- `app/auth/login.tsx` + `app/auth/register.tsx` — dark theme auth screens
- `app/(tabs)/_layout.tsx` — LayoutDashboard / ShieldCheck / User icons, primary #6C63FF

API endpoints expected:
- POST /auth/login → { accessToken, user }
- POST /auth/register → { accessToken, user }
- GET /auth/me → User
- GET /score → ScoreResponse (overallScore, scores, trustScore, currentStreaks, lastSubmissions)
- GET /submissions?limit=3 → { submissions, total }
- POST /submissions → CreateSubmissionPayload
- GET /badges → { badges } (optional, falls back to placeholders)
