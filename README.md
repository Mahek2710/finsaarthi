<div align="center">

<img src="./screenshots/finsaarthi-logo-full.png" alt="FinSaarthi Logo" width="460"/>

<br>

# FinSaarthi

### From Prediction to Prevention

**AI-Powered Financial Intelligence & Early Warning Platform for Rural Micro Enterprises**

Developed for **NABARD Hackathon 2026**

</div>

---

## Overview

FinSaarthi is an AI-powered financial intelligence platform designed to help rural micro enterprises predict financial stress before it turns into default.

Instead of relying solely on historical financial records, FinSaarthi analyzes transaction behaviour, repayment history, cash flow trends and contextual business signals to provide proactive financial insights. The platform enables entrepreneurs, field officers and financial institutions such as NABARD to identify risks early and make informed, data-driven decisions.

---

## Key Features

- AI-powered Cash Flow Forecasting
- Early Financial Risk Detection
- Explainable AI Insights
- Credit Readiness Score
- What-If Financial Simulator
- Voice-first Multilingual Interface
- Enterprise Dashboard
- Field Officer Dashboard
- NABARD Analytics Dashboard
- District-wise & Sector-wise Risk Heatmaps

---

# Application Preview

<table align="center">
<tr>

<td align="center" width="50%">

### Landing Page

<img src="./screenshots/Landing.png" width="320"/>

</td>

<td align="center" width="50%">

### Enterprise Dashboard

<img src="./screenshots/Enterprise.png" width="320"/>

</td>

</tr>

<tr>

<td align="center">

### Financial Insights

<img src="./screenshots/Enterprise_details.png" width="320"/>

</td>

<td align="center">

### Field Officer Dashboard

<img src="./screenshots/Field_officer.png" width="320"/>

</td>

</tr>

<tr>

<td align="center" colspan="2">

### NABARD Aggregate Dashboard

<img src="./screenshots/Nabard_aggregate_view.png" width="380"/>

</td>

</tr>
</table>

---

## Technology Stack

| Category | Technology |
|-----------|------------|
| Frontend | React |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Icons | Lucide React |
| Voice Interface | Web Speech API |
| Data | Mock Financial Dataset |

---

## System Workflow

```text
Financial Data
        │
        ▼
Data Collection & Processing
        │
        ▼
AI Risk Assessment Engine
        │
        ├────────────────────┐
        │                    │
        ▼                    ▼
Cash Flow Forecast     Credit Readiness
        │
        ▼
Explainable Insights
        │
        ▼
Decision Support Layer
        │
 ┌──────┼─────────────┐
 │      │             │
 ▼      ▼             ▼
Enterprise     Field Officer     NABARD
 Dashboard       Dashboard      Dashboard
```

---

## Repository Structure

```text
finsaarthi
│
├── public
├── screenshots
│   ├── Landing.png
│   ├── Enterprise.png
│   ├── Enterprise_details.png
│   ├── Field_officer.png
│   ├── Nabard_aggregate_view.png
│   └── finsaarthi-logo-full.png
│
├── src
│   ├── assets
│   ├── App.jsx
│   ├── main.jsx
│   └── mockData.js
│
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## Target Users

### Rural Micro Entrepreneurs

- Monitor business health
- Forecast future cash flow
- Improve credit readiness
- Receive personalized financial recommendations

### Field Officers

- Identify high-risk enterprises
- Understand contributing risk factors
- Prioritize field interventions
- Improve monitoring efficiency

### NABARD & Financial Institutions

- Monitor district-level financial health
- Analyze sector-wise trends
- Track portfolio risk
- Enable data-driven policy decisions

---

## Getting Started

Clone the repository

```bash
git clone https://github.com/Mahek2710/finsaarthi.git
```

Navigate to the project directory

```bash
cd finsaarthi
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## Future Scope

- Integration with real banking and UPI transaction data
- AI-powered credit scoring using alternative financial signals
- District-level predictive risk analytics
- Offline-first mobile application
- Regional language expansion
- Integration with NABARD, RRBs and Cooperative Banks
- Personalized financial advisory recommendations

---

## Vision

FinSaarthi aims to become the financial intelligence layer powering rural lending by enabling proactive financial decisions instead of reactive interventions.

By combining AI, explainable insights and multilingual accessibility, the platform seeks to reduce defaults, improve responsible credit access and strengthen the rural financial ecosystem.

---

## Team

- **Mahek Hingorani**
- **Supriya Nayak**
- **Akritee Singh**
- **Shambhavi Patil**

---

<div align="center">

**Built for NABARD Hackathon 2026**

**FinSaarthi - From Prediction to Prevention**

</div>
