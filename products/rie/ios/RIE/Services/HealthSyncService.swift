import Foundation
import HealthKit

struct HealthWorkoutSummary: Identifiable, Hashable {
    let id: UUID
    let activityType: HKWorkoutActivityType
    let start: Date
    let end: Date
    let durationMinutes: Int
    let energyBurnedKcal: Double
    let distanceMeters: Double
    let source: String

    var activityName: String {
        switch activityType {
        case .running: return "Running"
        case .cycling: return "Cycling"
        case .walking: return "Walking"
        case .hiking: return "Hiking"
        case .swimming: return "Swimming"
        case .functionalStrengthTraining, .traditionalStrengthTraining: return "Strength Training"
        case .highIntensityIntervalTraining: return "HIIT"
        case .yoga: return "Yoga"
        case .rowing: return "Rowing"
        case .elliptical: return "Elliptical"
        case .stairClimbing, .stairs: return "Stair Climbing"
        case .mixedCardio: return "Cardio"
        case .coreTraining: return "Core"
        case .flexibility: return "Flexibility"
        case .pilates: return "Pilates"
        case .kickboxing, .boxing, .martialArts: return "Martial Arts"
        case .soccer, .basketball, .tennis: return "Sport"
        default: return "Workout"
        }
    }

    var difficulty: Difficulty {
        switch durationMinutes {
        case ..<20: return .easy
        case 20..<45: return .medium
        case 45..<90: return .hard
        default: return .extreme
        }
    }
}

@MainActor
final class HealthSyncService: ObservableObject {
    @Published private(set) var isAvailable: Bool
    @Published private(set) var lastError: String?

    private let store = HKHealthStore()
    private let readTypes: Set<HKObjectType>

    init() {
        self.isAvailable = HKHealthStore.isHealthDataAvailable()
        var types: Set<HKObjectType> = [HKObjectType.workoutType()]
        if let hr = HKObjectType.quantityType(forIdentifier: .heartRate) { types.insert(hr) }
        if let energy = HKObjectType.quantityType(forIdentifier: .activeEnergyBurned) { types.insert(energy) }
        if let dist = HKObjectType.quantityType(forIdentifier: .distanceWalkingRunning) { types.insert(dist) }
        self.readTypes = types
    }

    func requestAuthorization() async throws {
        guard isAvailable else { throw HealthSyncError.unavailable }
        try await store.requestAuthorization(toShare: [], read: readTypes)
    }

    func fetchRecentWorkouts(since: Date) async throws -> [HealthWorkoutSummary] {
        guard isAvailable else { throw HealthSyncError.unavailable }
        let predicate = HKQuery.predicateForSamples(withStart: since, end: Date(), options: [.strictStartDate])
        let sort = NSSortDescriptor(key: HKSampleSortIdentifierStartDate, ascending: false)
        let workouts: [HKWorkout] = try await withCheckedThrowingContinuation { cont in
            let q = HKSampleQuery(
                sampleType: HKObjectType.workoutType(),
                predicate: predicate,
                limit: 100,
                sortDescriptors: [sort]
            ) { _, samples, error in
                if let error { cont.resume(throwing: error); return }
                cont.resume(returning: (samples as? [HKWorkout]) ?? [])
            }
            store.execute(q)
        }
        return workouts.map { w in
            let kcal = w.statistics(for: HKQuantityType(.activeEnergyBurned))?
                .sumQuantity()?.doubleValue(for: .kilocalorie()) ?? 0
            let meters = w.statistics(for: HKQuantityType(.distanceWalkingRunning))?
                .sumQuantity()?.doubleValue(for: .meter()) ?? 0
            return HealthWorkoutSummary(
                id: w.uuid,
                activityType: w.workoutActivityType,
                start: w.startDate,
                end: w.endDate,
                durationMinutes: max(1, Int(w.duration / 60)),
                energyBurnedKcal: kcal,
                distanceMeters: meters,
                source: w.sourceRevision.source.name
            )
        }
    }
}

enum HealthSyncError: LocalizedError {
    case unavailable
    case notAuthorized

    var errorDescription: String? {
        switch self {
        case .unavailable: return "Health data not available on this device."
        case .notAuthorized: return "Health access not granted. Enable in Settings → Privacy → Health."
        }
    }
}
