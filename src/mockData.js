export const enterprises = [
  {
    id: 1,
    name: { en: "Ramesh Dairy Unit", hi: "रमेश डेयरी" },
    sector: { en: "Dairy", hi: "डेयरी" },
    district: { en: "Nashik", hi: "नासिक" },
    healthScore: 72,
    baseHealthScore: 72,
    creditReadiness: 65,
    risk: "Medium",
    riskReason: {
      en: "Transaction frequency dropped 22% in the last 3 weeks",
      hi: "पिछले 3 हफ्तों में पैसों का लेन-देन 22% कम हुआ है",
    },
    factors: [
      { label: { en: "Transaction frequency", hi: "लेन-देन की रफ़्तार" }, impact: -28, note: { en: "Dropped sharply vs last month", hi: "पिछले महीने से बहुत कम हुई" } },
      { label: { en: "Repayment history", hi: "किस्त भरने का रिकॉर्ड" }, impact: 15, note: { en: "On-time for last 4 cycles", hi: "पिछली 4 बार समय पर भरी" } },
      { label: { en: "Feed price trend", hi: "चारे के दाम" }, impact: -12, note: { en: "Rising input costs", hi: "लगातार बढ़ रहे हैं" } },
      { label: { en: "Seasonal demand", hi: "त्योहारी मांग" }, impact: 8, note: { en: "Approaching festive season", hi: "त्योहार नज़दीक आ रहे हैं" } },
    ],
    readinessTips: [
      { en: "Reduce outstanding debt by ₹8,000 to improve eligibility", hi: "₹8,000 का बकाया कम करें, लोन मिलना आसान होगा" },
      { en: "Maintain consistent UPI transaction activity for 30 more days", hi: "अगले 30 दिन तक UPI से लेन-देन करते रहें" },
    ],
    transactions: [
      { id: 1, type: "income", amount: 3200, category: { en: "Milk sale", hi: "दूध बेचा" } },
      { id: 2, type: "expense", amount: 1800, category: { en: "Feed purchase", hi: "चारा खरीदा" } },
    ],
    forecast: [
      { month: "Aug", cashflow: 12000 }, { month: "Sep", cashflow: 9500 }, { month: "Oct", cashflow: 7000 },
      { month: "Nov", cashflow: 8200 }, { month: "Dec", cashflow: 11000 }, { month: "Jan", cashflow: 13500 },
    ],
  },
  {
    id: 2,
    name: { en: "Lakshmi Handicrafts", hi: "लक्ष्मी हस्तशिल्प" },
    sector: { en: "Handicrafts", hi: "हस्तशिल्प" },
    district: { en: "Jaipur", hi: "जयपुर" },
    healthScore: 88,
    baseHealthScore: 88,
    creditReadiness: 82,
    risk: "Low",
    riskReason: {
      en: "Stable transaction pattern, festival demand approaching",
      hi: "काम ठीक चल रहा है, त्योहारों में मांग बढ़ेगी",
    },
    factors: [
      { label: { en: "Transaction frequency", hi: "लेन-देन की रफ़्तार" }, impact: 18, note: { en: "Consistent weekly pattern", hi: "हर हफ्ते एक जैसी" } },
      { label: { en: "Repayment history", hi: "किस्त भरने का रिकॉर्ड" }, impact: 22, note: { en: "No missed payments in 12 months", hi: "12 महीने से एक भी किस्त नहीं चूकी" } },
      { label: { en: "Seasonal demand", hi: "त्योहारी मांग" }, impact: 20, note: { en: "Festival season inflow expected", hi: "त्योहारों में कमाई बढ़ेगी" } },
      { label: { en: "Market price stability", hi: "कच्चे माल के दाम" }, impact: 6, note: { en: "Raw material prices flat", hi: "दाम स्थिर हैं" } },
    ],
    readinessTips: [
      { en: "Eligible for a higher loan tier based on current savings trend", hi: "बचत अच्छी है, बड़ा लोन मिल सकता है" },
      { en: "Consider applying for working capital ahead of festive demand", hi: "त्योहारों से पहले लोन के लिए आवेदन करें" },
    ],
    transactions: [
      { id: 1, type: "income", amount: 4500, category: { en: "Product sale", hi: "सामान बेचा" } },
      { id: 2, type: "expense", amount: 1200, category: { en: "Raw material", hi: "कच्चा माल खरीदा" } },
    ],
    forecast: [
      { month: "Aug", cashflow: 15000 }, { month: "Sep", cashflow: 16200 }, { month: "Oct", cashflow: 21000 },
      { month: "Nov", cashflow: 24500 }, { month: "Dec", cashflow: 19000 }, { month: "Jan", cashflow: 14000 },
    ],
  },
  {
    id: 3,
    name: { en: "Suresh Poultry Farm", hi: "सुरेश पोल्ट्री फार्म" },
    sector: { en: "Poultry", hi: "मुर्गी पालन" },
    district: { en: "Nashik", hi: "नासिक" },
    healthScore: 54,
    baseHealthScore: 54,
    creditReadiness: 48,
    risk: "High",
    riskReason: {
      en: "Feed prices up 18%, repayment delay observed last month",
      hi: "चारे के दाम 18% बढ़े, पिछले महीने किस्त देर से भरी",
    },
    factors: [
      { label: { en: "Feed price trend", hi: "चारे के दाम" }, impact: -32, note: { en: "Sharp rise over 3 weeks", hi: "3 हफ्तों में तेज़ी से बढ़े" } },
      { label: { en: "Repayment history", hi: "किस्त भरने का रिकॉर्ड" }, impact: -18, note: { en: "One delayed payment last month", hi: "पिछले महीने एक किस्त देर से भरी" } },
      { label: { en: "Transaction frequency", hi: "लेन-देन की रफ़्तार" }, impact: -10, note: { en: "Slight decline", hi: "थोड़ी कम हुई" } },
      { label: { en: "Market demand", hi: "बाज़ार की मांग" }, impact: 9, note: { en: "Stable local demand", hi: "आस-पास मांग ठीक है" } },
    ],
    readinessTips: [
      { en: "Clear the delayed repayment to avoid further score drop", hi: "देर हुई किस्त जल्दी भरें, वरना स्कोर और गिरेगा" },
      { en: "Delay non-essential equipment purchases this quarter", hi: "इस तिमाही ज़रूरी न हो तो नया सामान न खरीदें" },
    ],
    transactions: [
      { id: 1, type: "income", amount: 2100, category: { en: "Egg sale", hi: "अंडे बेचे" } },
      { id: 2, type: "expense", amount: 2600, category: { en: "Feed purchase", hi: "चारा खरीदा" } },
    ],
    forecast: [
      { month: "Aug", cashflow: 8000 }, { month: "Sep", cashflow: 6200 }, { month: "Oct", cashflow: 4500 },
      { month: "Nov", cashflow: 5000 }, { month: "Dec", cashflow: 6800 }, { month: "Jan", cashflow: 7500 },
    ],
  },
];

export const whatIfScenarios = {
  loan: {
    label: { en: "Take ₹1,00,000 loan", hi: "₹1,00,000 का लोन लें" },
    deltaFactor: -0.15,
    note: { en: "Cash flow dips short-term due to EMI, recovers by month 4", hi: "किस्त के कारण शुरू में पैसा कम होगा, चौथे महीने तक ठीक हो जाएगा" },
  },
  cow: {
    label: { en: "Buy another dairy cow", hi: "एक और गाय खरीदें" },
    deltaFactor: 0.12,
    note: { en: "Higher upfront cost, but income rises from month 3 onward", hi: "पहले ज़्यादा खर्च होगा, तीसरे महीने से कमाई बढ़ेगी" },
  },
  none: {
    label: { en: "No change", hi: "कोई बदलाव नहीं" },
    deltaFactor: 0,
    note: { en: "", hi: "" },
  },
};

export const districtSummary = [
  { district: "Nashik", enterprises: 128, avgHealth: 63, highRisk: 22 },
  { district: "Jaipur", enterprises: 94, avgHealth: 78, highRisk: 9 },
  { district: "Nagpur", enterprises: 156, avgHealth: 58, highRisk: 34 },
  { district: "Indore", enterprises: 87, avgHealth: 71, highRisk: 14 },
];

// Simple, everyday spoken Hindi — not formal/Sanskritized.
export const translations = {
  en: {
    landingTagline: "Know your business finances, before problems happen",
    tabEnterprise: "My business", tabEnterpriseDesc: "Speak or type your income and expenses, see your score",
    tabOfficer: "Field officer", tabOfficerDesc: "See which enterprises need a visit, and why",
    tabNabard: "NABARD view", tabNabardDesc: "District and sector trends across the network",
    appTitle: "My business",
    healthScore: "Money health score",
    riskAlert: "Risk alert", playAlert: "Play",
    whatIf: "What if I do this?",
    creditReadiness: "Loan readiness score", whyFlagged: "Why this happened",
    moneyIn: "Money in", moneyOut: "Money out",
    tapSpeak: "Tap and speak your entry", tapSpeakSub: "e.g. \"500 rupees feed purchase\"", listening: "Listening…",
    orType: "Or type an entry", amountPlaceholder: "₹ Amount", categoryPlaceholder: "e.g. Milk sale", addEntry: "Add entry",
    riskHigh: "High risk", riskMedium: "Medium risk", riskLow: "Low risk",
    doingOkay: "Doing okay", needsAttention: "Needs attention now", keepEye: "Keep an eye on this",
  },
  hi: {
    landingTagline: "मुसीबत आने से पहले ही अपने पैसों की हालत जानें",
    tabEnterprise: "मेरा व्यापार", tabEnterpriseDesc: "बोलकर या लिखकर अपनी कमाई-खर्च बताएं, अपना स्कोर देखें",
    tabOfficer: "फील्ड अफसर", tabOfficerDesc: "देखें किसे मिलने जाना ज़रूरी है, और क्यों",
    tabNabard: "नाबार्ड व्यू", tabNabardDesc: "पूरे इलाके के रुझान एक जगह",
    appTitle: "मेरा व्यापार",
    healthScore: "पैसों की सेहत",
    riskAlert: "खतरे की सूचना", playAlert: "सुनें",
    whatIf: "अगर ऐसा करूं तो?",
    creditReadiness: "लोन के लिए तैयारी", whyFlagged: "ऐसा क्यों हुआ",
    moneyIn: "पैसा आया", moneyOut: "पैसा गया",
    tapSpeak: "दबाकर बोलें", tapSpeakSub: "जैसे \"500 रुपये चारा खरीदा\"", listening: "सुन रहा हूं…",
    orType: "या लिखकर बताएं", amountPlaceholder: "₹ रकम", categoryPlaceholder: "जैसे दूध बेचा", addEntry: "जोड़ें",
    riskHigh: "ज़्यादा खतरा", riskMedium: "थोड़ा खतरा", riskLow: "कम खतरा",
    doingOkay: "ठीक-ठाक चल रहा है", needsAttention: "अभी ध्यान दें", keepEye: "नज़र बनाए रखें",
  },
};