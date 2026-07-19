export const enterprises = [
  {
    id: 1,
    name: "Ramesh Dairy Unit",
    sector: "Dairy",
    district: "Nashik",
    healthScore: 72,
    creditReadiness: 65,
    risk: "Medium",
    riskReason: "Transaction frequency dropped 22% in the last 3 weeks",
    factors: [
      { label: "Transaction frequency", impact: -28, note: "Dropped sharply vs last month" },
      { label: "Repayment history", impact: 15, note: "On-time for last 4 cycles" },
      { label: "Feed price trend", impact: -12, note: "Rising input costs" },
      { label: "Seasonal demand", impact: 8, note: "Approaching festive season" },
    ],
    readinessTips: [
      "Reduce outstanding debt by ₹8,000 to improve eligibility",
      "Maintain consistent UPI transaction activity for 30 more days",
    ],
    forecast: [
      { month: "Aug", cashflow: 12000 },
      { month: "Sep", cashflow: 9500 },
      { month: "Oct", cashflow: 7000 },
      { month: "Nov", cashflow: 8200 },
      { month: "Dec", cashflow: 11000 },
      { month: "Jan", cashflow: 13500 },
    ],
  },
  {
    id: 2,
    name: "Lakshmi Handicrafts",
    sector: "Handicrafts",
    district: "Jaipur",
    healthScore: 88,
    creditReadiness: 82,
    risk: "Low",
    riskReason: "Stable transaction pattern, festival demand approaching",
    factors: [
      { label: "Transaction frequency", impact: 18, note: "Consistent weekly pattern" },
      { label: "Repayment history", impact: 22, note: "No missed payments in 12 months" },
      { label: "Seasonal demand", impact: 20, note: "Festival season inflow expected" },
      { label: "Market price stability", impact: 6, note: "Raw material prices flat" },
    ],
    readinessTips: [
      "Eligible for a higher loan tier based on current savings trend",
      "Consider applying for working capital ahead of festive demand",
    ],
    forecast: [
      { month: "Aug", cashflow: 15000 },
      { month: "Sep", cashflow: 16200 },
      { month: "Oct", cashflow: 21000 },
      { month: "Nov", cashflow: 24500 },
      { month: "Dec", cashflow: 19000 },
      { month: "Jan", cashflow: 14000 },
    ],
  },
  {
    id: 3,
    name: "Suresh Poultry Farm",
    sector: "Poultry",
    district: "Nashik",
    healthScore: 54,
    creditReadiness: 48,
    risk: "High",
    riskReason: "Feed prices up 18%, repayment delay observed last month",
    factors: [
      { label: "Feed price trend", impact: -32, note: "Sharp rise over 3 weeks" },
      { label: "Repayment history", impact: -18, note: "One delayed payment last month" },
      { label: "Transaction frequency", impact: -10, note: "Slight decline" },
      { label: "Market demand", impact: 9, note: "Stable local demand" },
    ],
    readinessTips: [
      "Clear the delayed repayment to avoid further score drop",
      "Delay non-essential equipment purchases this quarter",
    ],
    forecast: [
      { month: "Aug", cashflow: 8000 },
      { month: "Sep", cashflow: 6200 },
      { month: "Oct", cashflow: 4500 },
      { month: "Nov", cashflow: 5000 },
      { month: "Dec", cashflow: 6800 },
      { month: "Jan", cashflow: 7500 },
    ],
  },
];

export const whatIfScenarios = {
  loan: { label: "Take ₹1,00,000 loan", deltaFactor: -0.15, note: "Cash flow dips short-term due to EMI, recovers by month 4" },
  cow: { label: "Buy another dairy cow", deltaFactor: 0.12, note: "Higher upfront cost, but income rises from month 3 onward" },
  none: { label: "No change", deltaFactor: 0, note: "" },
};

export const districtSummary = [
  { district: "Nashik", enterprises: 128, avgHealth: 63, highRisk: 22 },
  { district: "Jaipur", enterprises: 94, avgHealth: 78, highRisk: 9 },
  { district: "Nagpur", enterprises: 156, avgHealth: 58, highRisk: 34 },
  { district: "Indore", enterprises: 87, avgHealth: 71, highRisk: 14 },
];

export const translations = {
  en: {
    appTitle: "Micro enterprise app",
    healthScore: "Financial health score",
    riskAlert: "Risk alert",
    playAlert: "Play alert",
    whatIf: "What-if simulator",
    voiceEntry: "Voice entry (try it)",
    speakEntry: "Speak an entry",
    creditReadiness: "Credit readiness score",
    whyFlagged: "Why this was flagged",
  },
  hi: {
    appTitle: "सूक्ष्म उद्यम ऐप",
    healthScore: "वित्तीय स्वास्थ्य स्कोर",
    riskAlert: "जोखिम चेतावनी",
    playAlert: "चेतावनी सुनें",
    whatIf: "क्या-अगर सिम्युलेटर",
    voiceEntry: "आवाज़ से एंट्री (आज़माएं)",
    speakEntry: "बोलकर बताएं",
    creditReadiness: "ऋण पात्रता स्कोर",
    whyFlagged: "यह क्यों फ़्लैग हुआ",
  },
};