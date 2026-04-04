export function calculatePremiumPreview(data) {
  const { earnings = 4500, city, zone, platform, verificationTier = 1 } = data;

  const baseRate = earnings * 0.022; // Aligned with backend formula
  let riskMultiplier = 1.00;
  let seasonMultiplier = 1.00;

  // High-fidelity risk assessment logic for the demo
  const highRiskZones = ["Dharavi", "Kurla", "Lalbagh", "Seelampur"];
  const medRiskZones = ["Lajpat Nagar", "HSR Layout", "Salt Lake"];

  if (highRiskZones.some(z => zone?.includes(z))) riskMultiplier = 1.15;
  else if (medRiskZones.some(z => zone?.includes(z))) riskMultiplier = 1.05;

  if (["swiggy", "zomato", "blinkit"].includes(platform?.toLowerCase())) {
    riskMultiplier += 0.05;
  }

  // Seasonality randomness for a "live" feel
  const month = new Date().getMonth();
  if (month >= 5 && month <= 8) seasonMultiplier = 1.15; // Monsoon premium
  else if (city === "Delhi" && month >= 10 || month <= 1) seasonMultiplier = 1.10; // Fog/Air Quality surcharge
  else seasonMultiplier = 1.00;

  const weeklyPremium = Math.round(baseRate * riskMultiplier * seasonMultiplier);

  // Coverage cap based on Tier
  const caps = { 1: 2000, 2: 3500, 3: 5000 };
  const maxPayout = caps[verificationTier] || 2500;

  return {
    weeklyPremium,
    riskTier: riskMultiplier >= 1.15 ? "HIGH" : riskMultiplier >= 1.05 ? "MEDIUM" : "LOW",
    maxPayout,
    coveragePct: 75 + (verificationTier * 5),
    baseRate,
    riskMultiplier: Number(riskMultiplier.toFixed(2)),
    seasonMultiplier: Number(seasonMultiplier.toFixed(2))
  };
}
