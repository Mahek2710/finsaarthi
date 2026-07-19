export const enterprises = [
  {
    id: 1,
    name: "Ramesh Dairy Unit",
    sector: "Dairy",
    healthScore: 72,
    creditReadiness: 65,
    risk: "Medium",
    riskReason: "Transaction frequency dropped 22% in the last 3 weeks",
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
    healthScore: 88,
    creditReadiness: 82,
    risk: "Low",
    riskReason: "Stable transaction pattern, festival demand approaching",
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
    healthScore: 54,
    creditReadiness: 48,
    risk: "High",
    riskReason: "Feed prices up 18%, repayment delay observed last month",
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

// What-if simulator: pre-baked scenario deltas
export const whatIfScenarios = {
  loan: { label: "Take ₹1,00,000 loan", deltaFactor: -0.15, note: "Cash flow dips short-term due to EMI, recovers by month 4" },
  cow: { label: "Buy another dairy cow", deltaFactor: 0.12, note: "Higher upfront cost, but income rises from month 3 onward" },
  none: { label: "No change", deltaFactor: 0, note: "" },
};