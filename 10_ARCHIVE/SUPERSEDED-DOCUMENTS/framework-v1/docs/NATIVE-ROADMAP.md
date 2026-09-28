# Native roadmap

Today: every product ships as a **PWA** — installable on iOS, Android, macOS, Windows, Linux. Responsive from watch (200px) to desktop (1536px+).

Tomorrow: native targets that genuinely need native APIs.

## Stack choice

- **iOS / Android** — Expo (React Native) for shared TS code with the web app.
- **watchOS / wearOS** — Expo with watch companion or native Swift/Kotlin where the wrist UI diverges enough to be its own app.
- **macOS** — SwiftUI catalyst when AppKit-only features (Finder integration, keychain, full menu bar) become a competitive moat.

## Per-product order

| Product | Native order      | Reason                                                                          |
| ------- | ----------------- | ------------------------------------------------------------------------------- |
| Vero    | Q4 2026 → Q1 2027 | Camera capture, push notifications, deep link from WhatsApp                     |
| RIE     | Q1 2027 → Q2 2027 | HealthKit + Apple Watch + Garmin Connect IQ; deep device pairing                |
| Trove   | Q3 2027 → Q4 2027 | Local crypto-key custody best done with iOS Keychain / Android Keystore         |

## Plan per native target

### Vero iOS / Android (Expo)
- Reuse `@vroe/ui` design tokens via Tailwind v4 → React Native StyleSheet bridge.
- Native: camera, push (FCM + APNs), share-extension to capture proofs.
- Background WhatsApp deep-link receiver.

### RIE iOS / Android (Expo)
- HealthKit / Health Connect read scopes for fitness sessions.
- BLE pairing for ring + watch device public keys.
- Background ingest jobs.

### RIE watchOS / wearOS (native or Expo companion)
- Real-time session sign on-device. The wrist device signs as it ends.
- Standalone start/stop UI.
- Mirror streak + tier status on the wrist face.

### Trove iOS / Android (Expo)
- Keychain / Keystore for vault key custody.
- Document scanner via VisionKit / ML Kit.
- Auto-import receipts via share extension.

### macOS (SwiftUI Catalyst)
- Drag-and-drop receipt + warranty intake from Mail.app.
- Menu-bar quick capture.
- File-system encrypted backups.

## Cross-cutting

- One auth flow (the OTP that worked on the web works on every native client).
- Same ALVED schema — native records use the same `@vroe/types/alved` shape.
- Sentry + PostHog SDKs share project keys across web + native.
- Deep links: `vero.app/u/{handle}` opens in the native app if installed (universal links / App Links).

## Pre-native discipline

We will NOT ship native apps that are just web-view wrappers. Each native app earns its place by:
1. Using native APIs the PWA cannot (HealthKit, Keychain, camera background access).
2. Reaching the activation bar the web app proved (e.g. 1k weekly active users).
3. Passing the same accessibility + security audit as the web app.

