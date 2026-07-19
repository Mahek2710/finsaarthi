import { useState } from "react";
import { enterprises, whatIfScenarios, districtSummary, translations } from "./mockData";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import {
  Sprout, Users, BarChart3, Mic, Volume2, AlertTriangle, Globe, ChevronDown,
} from "lucide-react";

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-IN";
  window.speechSynthesis.speak(utterance);
}

function FactorBar({ label, impact, note }) {
  const isPositive = impact >= 0;
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className={isPositive ? "text-emerald-600 font-medium tabular-nums" : "text-rose-600 font-medium tabular-nums"}>
          {isPositive ? "+" : ""}{impact}
        </span>
      </div>
      <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${isPositive ? "bg-emerald-500" : "bg-rose-500"}`}
          style={{ width: `${Math.min(Math.abs(impact) * 2.5, 100)}%` }}
        />
      </div>
      <p className="text-xs text-gray-400 mt-1">{note}</p>
    </div>
  );
}

const NAV = [
  { key: "enterprise", label: "Enterprise", icon: Sprout },
  { key: "officer", label: "Field officer", icon: Users },
  { key: "nabard", label: "NABARD", icon: BarChart3 },
];

// ---------- APP SHELL: sidebar (desktop) + bottom bar (mobile) ----------
function AppShell({ view, setView, children }) {
  return (
    <div className="min-h-screen bg-[#F7F8F5] flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 flex-col border-r border-gray-200 bg-white px-4 py-6 fixed h-full">
        <div className="flex items-center gap-2.5 px-2 mb-8">
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
            <Sprout className="text-white" size={16} />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-[15px] leading-none">FinSaarthi</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Prediction to prevention</p>
          </div>
        </div>
        <nav className="flex flex-col gap-1">
          {NAV.map((n) => {
            const Icon = n.icon;
            const active = view === n.key;
            return (
              <button
                key={n.key}
                onClick={() => setView(n.key)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <Icon size={16} />
                {n.label}
              </button>
            );
          })}
        </nav>
        <div className="mt-auto px-3 py-3 rounded-xl bg-gray-50 border border-gray-100">
          <p className="text-[11px] text-gray-400 leading-relaxed">
            Demo mode — showing simulated enterprise data
          </p>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 md:ml-60 pb-20 md:pb-0">
        <div className="max-w-2xl mx-auto px-4 md:px-8 py-6 md:py-8">{children}</div>
      </div>

      {/* Mobile bottom bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 z-10">
        {NAV.map((n) => {
          const Icon = n.icon;
          const active = view === n.key;
          return (
            <button
              key={n.key}
              onClick={() => setView(n.key)}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-medium ${
                active ? "text-gray-900" : "text-gray-400"
              }`}
            >
              <Icon size={19} />
              {n.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

function SectionLabel({ children }) {
  return <p className="text-[13px] font-medium text-gray-400 uppercase tracking-wide mb-3">{children}</p>;
}

// ---------- ENTERPRISE APP ----------
function EnterpriseApp() {
  const [selected, setSelected] = useState(enterprises[0]);
  const [scenario, setScenario] = useState("none");
  const [listening, setListening] = useState(false);
  const [voiceText, setVoiceText] = useState("");
  const [lang, setLang] = useState("en");
  const t = translations[lang];

  const scenarioData = whatIfScenarios[scenario];
  const adjustedForecast = selected.forecast.map((point) => ({
    ...point,
    cashflow: Math.round(point.cashflow * (1 + scenarioData.deltaFactor)),
  }));

  const riskStyles = {
    High: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
    Medium: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    Low: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  };

  const startVoiceInput = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert("Voice input not supported, use Chrome"); return; }
    const recognition = new SR();
    recognition.lang = lang === "hi" ? "hi-IN" : "en-IN";
    setListening(true);
    recognition.start();
    recognition.onresult = (e) => { setVoiceText(e.results[0][0].transcript); setListening(false); };
    recognition.onerror = () => setListening(false);
  };

  return (
    <div>
      <div className="flex justify-between items-start mb-5 flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">{selected.name}</h1>
          <p className="text-sm text-gray-400">{selected.sector} · {selected.district}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="flex items-center gap-1.5 text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-500 bg-white"
          >
            <Globe size={14} /> {lang === "en" ? "EN" : "हिं"}
          </button>
          <div className="relative">
            <select
              value={selected.id}
              onChange={(e) => setSelected(enterprises.find((x) => x.id === Number(e.target.value)))}
              className="appearance-none text-sm border border-gray-200 rounded-lg pl-3 pr-8 py-1.5 bg-white text-gray-700"
            >
              {enterprises.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-2.5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Hero stats row */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <p className="text-xs text-gray-400 mb-1">{t.healthScore}</p>
          <p className="text-3xl font-bold text-gray-900 tabular-nums">{selected.healthScore}</p>
          <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium ${riskStyles[selected.risk]}`}>
            {selected.risk} risk
          </span>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <p className="text-xs text-gray-400 mb-1">{t.creditReadiness}</p>
          <p className="text-3xl font-bold text-gray-900 tabular-nums">{selected.creditReadiness}</p>
          <p className="text-xs text-gray-400 mt-2">out of 100</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-4">
        <SectionLabel>3–6 month cash flow forecast</SectionLabel>
        <div className="h-48 -ml-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={adjustedForecast}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="month" fontSize={11} stroke="#b0b0b0" axisLine={false} tickLine={false} />
              <YAxis fontSize={11} stroke="#b0b0b0" axisLine={false} tickLine={false} width={40} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 12 }} />
              <Line type="monotone" dataKey="cashflow" stroke="#065f46" strokeWidth={2.5} dot={{ r: 3, fill: "#065f46" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <p className="font-medium text-gray-900 text-sm flex items-center gap-1.5">
            <AlertTriangle size={14} className="text-amber-500" /> {t.riskAlert}
          </p>
          <button onClick={() => speak(selected.riskReason)} className="flex items-center gap-1 text-xs px-2.5 py-1.5 bg-gray-50 text-gray-600 rounded-lg border border-gray-200">
            <Volume2 size={13} /> {t.playAlert}
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4 bg-gray-50 rounded-lg px-3 py-2.5">{selected.riskReason}</p>
        <SectionLabel>{t.whyFlagged}</SectionLabel>
        {selected.factors.map((f, i) => <FactorBar key={i} {...f} />)}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-4">
        <SectionLabel>{t.whatIf}</SectionLabel>
        <div className="flex gap-2 mb-3 flex-wrap">
          {Object.entries(whatIfScenarios).map(([key, val]) => (
            <button key={key} onClick={() => setScenario(key)}
              className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                scenario === key ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-200"
              }`}>
              {val.label}
            </button>
          ))}
        </div>
        {scenarioData.note && <p className="text-sm text-gray-500">{scenarioData.note}</p>}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <SectionLabel>{t.voiceEntry}</SectionLabel>
        <button onClick={startVoiceInput} className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium">
          <Mic size={15} /> {listening ? "Listening..." : t.speakEntry}
        </button>
        {voiceText && <p className="mt-3 text-sm text-gray-500">You said: "{voiceText}"</p>}
      </div>
    </div>
  );
}

// ---------- FIELD OFFICER ----------
function FieldOfficerDashboard() {
  const [expanded, setExpanded] = useState(null);
  const counts = {
    High: enterprises.filter((e) => e.risk === "High").length,
    Medium: enterprises.filter((e) => e.risk === "Medium").length,
    Low: enterprises.filter((e) => e.risk === "Low").length,
  };
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-1">Portfolio overview</h1>
      <p className="text-sm text-gray-400 mb-5">{enterprises.length} enterprises tracked</p>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-white rounded-2xl border border-gray-200 p-3.5 text-center">
          <p className="text-2xl font-bold text-rose-600">{counts.High}</p>
          <p className="text-xs text-gray-400 mt-0.5">High risk</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-3.5 text-center">
          <p className="text-2xl font-bold text-amber-600">{counts.Medium}</p>
          <p className="text-xs text-gray-400 mt-0.5">Medium risk</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-3.5 text-center">
          <p className="text-2xl font-bold text-emerald-600">{counts.Low}</p>
          <p className="text-xs text-gray-400 mt-0.5">Low risk</p>
        </div>
      </div>

      <div className="space-y-2.5">
        {enterprises.map((e) => {
          const dot = e.risk === "High" ? "bg-rose-500" : e.risk === "Medium" ? "bg-amber-500" : "bg-emerald-500";
          const isOpen = expanded === e.id;
          return (
            <div key={e.id} className="bg-white rounded-2xl border border-gray-200 p-4">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpanded(isOpen ? null : e.id)}>
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${dot}`} />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{e.name}</p>
                    <p className="text-xs text-gray-400">{e.sector} · {e.district}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{e.healthScore}<span className="text-gray-300">/100</span></p>
                  <p className="text-xs text-gray-400">{e.risk} risk</p>
                </div>
              </div>
              {isOpen && (
                <div className="mt-3 pt-3 border-t border-gray-100 pl-5">
                  <p className="text-sm text-gray-500 mb-3">{e.riskReason}</p>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Contributing factors</p>
                  {e.factors.map((f, i) => <FactorBar key={i} {...f} />)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- NABARD VIEW ----------
function NabardView() {
  const totalEnterprises = districtSummary.reduce((s, d) => s + d.enterprises, 0);
  const totalHighRisk = districtSummary.reduce((s, d) => s + d.highRisk, 0);
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-1">District & sector overview</h1>
      <p className="text-sm text-gray-400 mb-5">{totalEnterprises} enterprises · {totalHighRisk} flagged high risk</p>

      <div className="grid grid-cols-2 gap-3">
        {districtSummary.map((d) => (
          <div key={d.district} className="bg-white rounded-2xl border border-gray-200 p-4">
            <p className="font-semibold text-gray-900 text-sm mb-3">{d.district}</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-400">Enterprises</span><span className="font-medium text-gray-900 tabular-nums">{d.enterprises}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Avg health</span><span className="font-medium text-gray-900 tabular-nums">{d.avgHealth}/100</span></div>
              <div className="flex justify-between"><span className="text-gray-400">High risk</span><span className="font-medium text-rose-600 tabular-nums">{d.highRisk}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- ROOT ----------
export default function App() {
  const [view, setView] = useState("enterprise");
  return (
    <AppShell view={view} setView={setView}>
      {view === "enterprise" && <EnterpriseApp />}
      {view === "officer" && <FieldOfficerDashboard />}
      {view === "nabard" && <NabardView />}
    </AppShell>
  );
}