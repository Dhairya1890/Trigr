"use client";

function getConnectionSnapshot() {
  const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;

  return {
    online: navigator.onLine,
    connection_type: connection?.type || "unknown",
    effective_type: connection?.effectiveType || "unknown",
    downlink_mbps: connection?.downlink ?? null,
    rtt_ms: connection?.rtt ?? null,
    save_data: connection?.saveData ?? false,
    wifi_present: connection?.type === "wifi",
  };
}

function getPosition(options) {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy_m: position.coords.accuracy,
          captured_at: new Date(position.timestamp).toISOString(),
        });
      },
      () => resolve(null),
      options,
    );
  });
}

export async function collectBrowserLocationSignals(requestedCity, requestedZone) {
  // Browsers do not expose raw cell-tower IDs. We collect a second,
  // low-accuracy geolocation sample because browsers typically resolve it
  // from network providers such as cellular and Wi-Fi positioning.
  const [gps, networkGeolocation] = await Promise.all([
    getPosition({
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 60_000,
    }),
    getPosition({
      enableHighAccuracy: false,
      timeout: 4000,
      maximumAge: 120_000,
    }),
  ]);

  return {
    requested_city: requestedCity,
    requested_zone: requestedZone,
    gps,
    network_geolocation: networkGeolocation,
    network: {
      ...getConnectionSnapshot(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      locale: navigator.language || "en-IN",
      user_agent: navigator.userAgent,
    },
    captured_at: new Date().toISOString(),
  };
}
