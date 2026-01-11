// Lat/Long (lat first) to match your dataset.
export type LatLong = [lat: number, lng: number];

// Mapbox expects [lng, lat]
export type LngLat = [lng: number, lat: number];

// Minimal lookup for this demo dataset (no lat/lng in API).
// If later we add coordinates to the API, we can remove this.
const CITY_TO_LATLONG: Record<string, LatLong> = {
  Málaga: [36.756103, -4.452331],
  Tomelloso: [39.124946, -3.019524],
  Jaén: [37.752305, -3.847234],
  Valencia: [39.353323, -0.489592],
  Granada: [37.19624, -3.567052],
  Asturias: [43.323342, -5.845106],
};

export function toLngLat(latLong: LatLong): LngLat {
  const [lat, lng] = latLong;
  return [lng, lat] as LngLat;
}

export function getCityLatLong(city?: string | null): LatLong | null {
  if (!city) return null;
  return CITY_TO_LATLONG[city] ?? null;
}
