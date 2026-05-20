import Foundation
import CoreLocation

struct ResolvedLocation: Codable, Equatable {
    var city: String
    var region: String
    var country: String
    var countryCode: String
}

@MainActor
final class LocationService: NSObject, ObservableObject, CLLocationManagerDelegate {
    @Published var authorization: CLAuthorizationStatus = .notDetermined
    @Published private(set) var resolved: ResolvedLocation?
    @Published private(set) var error: String?

    private let manager = CLLocationManager()
    private var pending: [(Result<ResolvedLocation, Error>) -> Void] = []

    override init() {
        super.init()
        manager.delegate = self
        manager.desiredAccuracy = kCLLocationAccuracyKilometer
        authorization = manager.authorizationStatus
    }

    func request() {
        manager.requestWhenInUseAuthorization()
    }

    func resolve() async throws -> ResolvedLocation {
        if let resolved { return resolved }
        let status = manager.authorizationStatus
        if status == .notDetermined {
            manager.requestWhenInUseAuthorization()
        }
        manager.requestLocation()
        return try await withCheckedThrowingContinuation { cont in
            pending.append { result in
                switch result {
                case .success(let loc): cont.resume(returning: loc)
                case .failure(let err): cont.resume(throwing: err)
                }
            }
        }
    }

    nonisolated func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
        Task { @MainActor in
            self.authorization = status
            if status == .authorizedWhenInUse || status == .authorizedAlways {
                manager.requestLocation()
            }
        }
    }

    nonisolated func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        guard let location = locations.last else { return }
        Task { @MainActor in
            do {
                let placemarks = try await CLGeocoder().reverseGeocodeLocation(location)
                let place = placemarks.first
                let loc = ResolvedLocation(
                    city: place?.locality ?? place?.subAdministrativeArea ?? "",
                    region: place?.administrativeArea ?? "",
                    country: place?.country ?? "",
                    countryCode: place?.isoCountryCode ?? ""
                )
                self.resolved = loc
                self.error = nil
                self.flush(.success(loc))
            } catch {
                self.error = error.localizedDescription
                self.flush(.failure(error))
            }
        }
    }

    nonisolated func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        Task { @MainActor in
            self.error = error.localizedDescription
            self.flush(.failure(error))
        }
    }

    private func flush(_ result: Result<ResolvedLocation, Error>) {
        let queued = pending
        pending.removeAll()
        queued.forEach { $0(result) }
    }
}
