export function calculatePremiumPreview(data) {
  // Logic from README:
  // Base Premium = 2% of Weekly Earnings
  // Adjustments:
  // - High Risk Zone (e.g. Dharavi, Kurla): +15%
  // - High Risk Platform: +5%
  // - Night Shift: +10%
  // - Verification Discount: Tier 2 (-5%), Tier 3 (-10%)

  const { earnings = 4500, city, zone, shiftStart, shiftEnd, platform, verificationTier = 1 } = data;

  let base = earnings * 0.022; // 2.2% of earnings (aligned with backend)
  let riskScore = 40; // Base risk score 0-100

  // Zone risk
  const highRiskZones = ["Dharavi", "Kurla", "Lajpat Nagar", "HSR Layout"];
  if (highRiskZones.includes(zone)) {
    base *= 1.15;
    riskScore += 20;
  }

  // Shift risk (Night shifts 10pm-6am or long shifts)
  const isNight = Number((shiftEnd || "22:00").split(":")[0]) > 22 || Number((shiftStart || "10:00").split(":")[0]) < 6;
  if (isNight) {
    base *= 1.10;
    riskScore += 10;
  }

  // Verification discount
  if (verificationTier === 2) base *= 0.95;
  if (verificationTier === 3) base *= 0.90;

  // Coverage cap based on Tier
  const caps = { 1: 2000, 2: 3500, 3: 5000 };
  const maxPayout = caps[verificationTier] || 2000;

  return {
    weeklyPremium: Math.round(base),
    riskTier: riskScore > 70 ? "HIGH" : riskScore > 40 ? "MEDIUM" : "LOW",
    riskScore,
    maxPayout,
    coveragePct: 75 + (verificationTier * 5), // 80%, 85%, 90%
  };
}
