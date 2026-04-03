const cityZones = {
  Mumbai: ["Dharavi", "Kurla", "Sion", "Andheri East", "Dadar", "Bandra"],
  Delhi: ["Connaught Place", "Lajpat Nagar", "Sarojini Nagar", "Karol Bagh", "Dwarka", "Rohini"],
  Bangalore: ["Koramangala", "Whitefield", "Indiranagar", "HSR Layout", "Jayanagar", "Electronic City"],
  Chennai: ["T. Nagar", "Adyar", "Velachery", "Anna Nagar", "Mylapore", "Tambaram"],
  Kolkata: ["Salt Lake", "Park Street", "Howrah", "Dum Dum", "New Town", "Jadavpur"],
};

const cities = Object.keys(cityZones);

export default function ZonePicker({ city, zone, onCityChange, onZoneChange }) {
  const zones = city ? cityZones[city] || [] : [];

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">City</label>
        <select
          value={city}
          onChange={(e) => { onCityChange(e.target.value); onZoneChange(""); }}
          className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all text-sm text-on-surface"
        >
          <option value="" className="bg-surface text-on-surface">Select city</option>
          {cities.map((c) => (
            <option key={c} value={c} className="bg-surface text-on-surface">{c}</option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Zone</label>
        <select
          value={zone}
          onChange={(e) => onZoneChange(e.target.value)}
          disabled={!city}
          className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all text-sm disabled:opacity-50 text-on-surface"
        >
          <option value="" className="bg-surface text-on-surface">Select zone</option>
          {zones.map((z) => (
            <option key={z} value={z} className="bg-surface text-on-surface">{z}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
