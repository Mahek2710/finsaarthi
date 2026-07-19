import { useState } from "react";
import { enterprises, whatIfScenarios, districtSummary, translations } from "./mockData";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { Mic, Volume2, ArrowLeft, Globe, Sprout, Users, BarChart3 } from "lucide-react";

const FONT = "font-['Noto_Sans',sans-serif]";

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-IN";
  window.speechSynthesis.speak(utterance);
}

function riskColor(risk) {
  return risk === "High" ? "#B3261E" : risk === "Medium" ? "#C77800" : "#2E7D5B";
}
function riskPlainLabel(risk) {
  return risk === "High" ? "Needs attention now" : risk === "Medium" ? "Keep an eye on this" : "Doing okay";
}

function Badge({ risk }) {
  const c = riskColor(risk);
  return (
    <span
      className={`${FONT} text-xs font-semibold px-3 py-1.5 rounded-full`}
      style={{ backgroundColor: `${c}1A`, color: c }}
    >
      {risk} risk
    </span>
  );
}

function LedgerAmount({ amount, type }) {
  const isCredit = type === "income";
  return (
    <span className={`${FONT} font-semibold tabular-nums`} style={{ color: isCredit ? "#2E7D5B" : "#B3261E" }}>
      {isCredit ? "+" : "−"}₹{amount.toLocaleString("en-IN")}
    </span>
  );
}

function FactorBar({ label, impact, note }) {
  const isPositive = impact >= 0;
  const c = isPositive ? "#2E7D5B" : "#B3261E";
  return (
    <div className="mb-3">
      <div className={`flex justify-between text-sm mb-1 ${FONT} text-[#1A2B3C]`}>
        <span>{label}</span>
        <span className="font-semibold tabular-nums" style={{ color: c }}>{isPositive ? "+" : ""}{impact}</span>
      </div>
      <div className="w-full h-2 bg-[#E2E6EA] rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${Math.min(Math.abs(impact) * 2.5, 100)}%`, backgroundColor: c }} />
      </div>
      <p className={`text-xs text-[#5B6B7A] mt-1 ${FONT}`}>{note}</p>
    </div>
  );
}

function Landing({ onSelect }) {
  const tabs = [
    { key: "enterprise", label: "My business", desc: "Speak or type your income and expenses, see your score", icon: Sprout },
    { key: "officer", label: "Field officer", desc: "See which enterprises need a visit, and why", icon: Users },
    { key: "nabard", label: "NABARD view", desc: "District and sector trends across the network", icon: BarChart3 },
  ];
  return (
    <div className="min-h-screen bg-[#F5F7F9] flex items-center justify-center p-6">
      <div className="max-w-xl w-full">
        <div className="bg-[#145A7A] rounded-t-2xl px-8 py-10 text-center">
          <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sprout className="text-white" size={30} />
          </div>
          <h1 className={`${FONT} text-4xl font-bold text-white mb-2`}>FinSaarthi</h1>
          <p className={`${FONT} text-[#CFE3EC] text-base`}>Know your business finances, before problems happen</p>
        </div>

        <div className="bg-white rounded-b-2xl border border-t-0 border-[#E2E6EA] p-3">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => onSelect(t.key)}
              className="w-full text-left px-4 py-4 flex items-center gap-4 rounded-xl hover:bg-[#F5F7F9] transition-colors"
            >
              <div className="w-12 h-12 bg-[#145A7A]/10 rounded-xl flex items-center justify-center shrink-0">
                <t.icon className="text-[#145A7A]" size={22} />
              </div>
              <div>
                <p className={`${FONT} text-lg font-semibold text-[#1A2B3C]`}>{t.label}</p>
                <p className={`${FONT} text-sm text-[#5B6B7A]`}>{t.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Shell({ subtitle, onBack, children }) {
  return (
    <div className="min-h-screen bg-[#F5F7F9]">
      <div className="bg-[#145A7A] px-5 py-4 flex items-center gap-3">
        <button onClick={onBack} className="text-white/80 hover:text-white">
          <ArrowLeft size={20} />
        </button>
        <div className="w-9 h-9 bg-white/15 rounded-lg flex items-center justify-center">
          <Sprout className="text-white" size={17} />
        </div>
        <div>
          <p className={`${FONT} text-white font-semibold leading-tight`}>FinSaarthi</p>
          <p className={`${FONT} text-xs text-[#CFE3EC] leading-tight`}>{subtitle}</p>
        </div>
      </div>
      <div className="max-w-2xl mx-auto p-5">{children}</div>
    </div>
  );
}

function Card({ children, className = "" }) {
  return <div className={`bg-white border border-[#E2E6EA] rounded-2xl p-5 mb-4 ${className}`}>{children}</div>;
}

function EnterpriseApp({ onBack }) {
  const [selected, setSelected] = useState(enterprises[0]);
  const [scenario, setScenario] = useState("none");
  const [listening, setListening] = useState(false);
  const [lang, setLang] = useState("en");
  const t = translations[lang];

  const [txMap, setTxMap] = useState(() => {
    const map = {};
    enterprises.forEach((e) => { map[e.id] = e.transactions; });
    return map;
  });
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");

  const transactions = txMap[selected.id];
  const netThisSession = transactions.reduce(
    (sum, tx) => sum + (tx.type === "income" ? tx.amount : -tx.amount), 0
  );
  const liveHealthScore = Math.max(0, Math.min(100,
    Math.round(selected.baseHealthScore + netThisSession / 500)
  ));

  const scenarioData = whatIfScenarios[scenario];
  const adjustedForecast = selected.forecast.map((point, i) => {
    let cashflow = Math.round(point.cashflow * (1 + scenarioData.deltaFactor));
    if (i === selected.forecast.length - 1) cashflow += netThisSession;
    return { ...point, cashflow };
  });

  const startVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { alert("Voice input not supported, use Chrome"); return; }
    const recognition = new SpeechRecognition();
    recognition.lang = lang === "hi" ? "hi-IN" : "en-IN";
    setListening(true);
    recognition.start();
    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setCategory(text);
      const numberMatch = text.match(/\d+/);
      if (numberMatch) setAmount(numberMatch[0]);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
  };

  const addTransaction = () => {
    if (!amount || !category) return;
    const newTx = { id: Date.now(), type, amount: Number(amount), category };
    setTxMap((prev) => ({ ...prev, [selected.id]: [newTx, ...prev[selected.id]] }));
    speak(`${type === "income" ? "Added income" : "Added expense"} of ${amount} rupees for ${category}`);
    setAmount("");
    setCategory("");
  };

  const scoreColor = liveHealthScore >= 70 ? "#2E7D5B" : liveHealthScore >= 45 ? "#C77800" : "#B3261E";

  return (
    <Shell subtitle={t.appTitle} onBack={onBack}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 flex-wrap">
          {enterprises.map((e) => (
            <button
              key={e.id}
              onClick={() => setSelected(e)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${FONT} ${
                selected.id === e.id ? "bg-[#145A7A] text-white" : "bg-white text-[#5B6B7A] border border-[#E2E6EA]"
              }`}
            >
              {e.name}
            </button>
          ))}
        </div>
        <button
          onClick={() => setLang(lang === "en" ? "hi" : "en")}
          className={`flex items-center gap-1.5 text-sm ${FONT} border border-[#E2E6EA] rounded-lg px-2.5 py-1.5 text-[#5B6B7A] bg-white`}
        >
          <Globe size={14} /> {lang === "en" ? "EN" : "हिं"}
        </button>
      </div>

      {/* Voice is the primary action — biggest element on the screen */}
      <button
        onClick={startVoiceInput}
        className="w-full rounded-2xl mb-4 py-6 flex flex-col items-center gap-2 text-white shadow-sm"
        style={{ backgroundColor: listening ? "#B3261E" : "#145A7A" }}
      >
        <Mic size={30} className={listening ? "animate-pulse" : ""} />
        <span className={`${FONT} font-semibold text-base`}>
          {listening ? "Listening…" : "Tap and speak your entry"}
        </span>
        <span className={`${FONT} text-xs text-white/70`}>e.g. "500 rupees feed purchase"</span>
      </button>

      <Card>
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className={`text-sm text-[#5B6B7A] ${FONT}`}>{t.healthScore}</p>
            <p className={`text-4xl font-bold ${FONT} mt-1`} style={{ color: scoreColor }}>
              {liveHealthScore}<span className="text-base text-[#8A97A3]">/100</span>
            </p>
            <p className={`text-sm font-medium ${FONT} mt-0.5`} style={{ color: scoreColor }}>
              {riskPlainLabel(selected.risk)}
            </p>
          </div>
          <Badge risk={selected.risk} />
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={adjustedForecast}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF1F4" vertical={false} />
              <XAxis dataKey="month" fontSize={12} stroke="#8A97A3" axisLine={false} tickLine={false} />
              <YAxis fontSize={12} stroke="#8A97A3" axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E2E6EA", fontSize: 13 }} />
              <Line type="monotone" dataKey="cashflow" stroke="#145A7A" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <p className={`${FONT} font-semibold text-[#1A2B3C] mb-3`}>Or type an entry</p>
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setType("income")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium ${FONT} ${type === "income" ? "bg-[#2E7D5B] text-white" : "bg-[#F5F7F9] text-[#5B6B7A]"}`}
          >
            Money in
          </button>
          <button
            onClick={() => setType("expense")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium ${FONT} ${type === "expense" ? "bg-[#B3261E] text-white" : "bg-[#F5F7F9] text-[#5B6B7A]"}`}
          >
            Money out
          </button>
        </div>
        <div className="flex gap-2 mb-3">
          <input
            type="number" placeholder="₹ Amount" value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={`w-28 border border-[#E2E6EA] rounded-xl px-3 py-2.5 text-sm ${FONT}`}
          />
          <input
            type="text" placeholder="e.g. Milk sale" value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`flex-1 border border-[#E2E6EA] rounded-xl px-3 py-2.5 text-sm ${FONT}`}
          />
        </div>
        <button
          onClick={addTransaction}
          className={`w-full py-2.5 bg-[#1A2B3C] text-white rounded-xl text-sm font-semibold ${FONT}`}
        >
          Add entry
        </button>

        <div className="mt-4 pt-4 border-t border-[#EEF1F4] space-y-2.5 max-h-40 overflow-y-auto">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex justify-between text-sm">
              <span className={`text-[#5B6B7A] ${FONT}`}>{tx.category}</span>
              <LedgerAmount amount={tx.amount} type={tx.type} />
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <p className={`${FONT} font-semibold text-[#1A2B3C] mb-3`}>{t.creditReadiness}</p>
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 shrink-0">
            <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
              <circle cx="18" cy="18" r="16" fill="none" stroke="#EEF1F4" strokeWidth="3.5" />
              <circle cx="18" cy="18" r="16" fill="none" stroke="#145A7A" strokeWidth="3.5"
                strokeDasharray={`${selected.creditReadiness} 100`} strokeLinecap="round" />
            </svg>
            <div className={`absolute inset-0 flex items-center justify-center text-sm font-bold text-[#1A2B3C] ${FONT}`}>
              {selected.creditReadiness}
            </div>
          </div>
          <ul className={`text-sm text-[#5B6B7A] space-y-1.5 ${FONT}`}>
            {selected.readinessTips.map((tip, i) => <li key={i}>• {tip}</li>)}
          </ul>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-2">
          <p className={`${FONT} font-semibold text-[#1A2B3C]`}>{t.riskAlert}</p>
          <button onClick={() => speak(selected.riskReason)} className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg text-[#145A7A] bg-[#145A7A]/10 ${FONT}`}>
            <Volume2 size={13}/> {t.playAlert}
          </button>
        </div>
        <p className={`text-sm text-[#5B6B7A] mb-4 ${FONT}`}>{selected.riskReason}</p>
        <p className={`font-medium text-sm text-[#1A2B3C] mb-3 ${FONT}`}>{t.whyFlagged}</p>
        {selected.factors.map((f, i) => <FactorBar key={i} {...f} />)}
      </Card>

      <Card className="mb-0">
        <p className={`${FONT} font-semibold text-[#1A2B3C] mb-3`}>{t.whatIf}</p>
        <div className="flex gap-2 mb-3 flex-wrap">
          {Object.entries(whatIfScenarios).map(([key, val]) => (
            <button key={key} onClick={() => setScenario(key)}
              className={`px-3 py-1.5 rounded-xl text-sm font-medium ${FONT} ${
                scenario === key ? "bg-[#145A7A] text-white" : "bg-[#F5F7F9] text-[#5B6B7A]"
              }`}>
              {val.label}
            </button>
          ))}
        </div>
        {scenarioData.note && <p className={`text-sm text-[#5B6B7A] ${FONT}`}>{scenarioData.note}</p>}
      </Card>
    </Shell>
  );
}

function FieldOfficerDashboard({ onBack }) {
  const [expanded, setExpanded] = useState(null);
  return (
    <Shell subtitle="Field officer dashboard" onBack={onBack}>
      <div className="space-y-2.5">
        {enterprises.map((e) => {
          const isOpen = expanded === e.id;
          return (
            <div key={e.id} className="bg-white rounded-2xl border border-[#E2E6EA] p-4">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpanded(isOpen ? null : e.id)}>
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: riskColor(e.risk) }} />
                  <div>
                    <p className={`${FONT} font-semibold text-[#1A2B3C]`}>{e.name}</p>
                    <p className={`text-xs text-[#8A97A3] ${FONT}`}>{e.sector} · {e.district}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge risk={e.risk} />
                  <p className={`text-xs text-[#8A97A3] mt-1 ${FONT}`}>Health: {e.healthScore}/100</p>
                </div>
              </div>
              <p className={`text-sm text-[#5B6B7A] mt-2 pl-5 ${FONT}`}>{e.riskReason}</p>
              {isOpen && (
                <div className="mt-3 pt-3 border-t border-[#EEF1F4] pl-5">
                  <p className={`text-xs font-medium text-[#8A97A3] mb-2 uppercase tracking-wide ${FONT}`}>Contributing factors</p>
                  {e.factors.map((f, i) => <FactorBar key={i} {...f} />)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Shell>
  );
}

function NabardView({ onBack }) {
  return (
    <Shell subtitle="NABARD aggregate view" onBack={onBack}>
      <div className="grid grid-cols-2 gap-3">
        {districtSummary.map((d) => (
          <div key={d.district} className="bg-white rounded-2xl border border-[#E2E6EA] p-4">
            <p className={`${FONT} font-semibold text-[#1A2B3C] mb-3`}>{d.district}</p>
            <div className="space-y-1.5 text-sm">
              <p className={`text-[#5B6B7A] ${FONT}`}>Enterprises tracked <span className={`float-right text-[#1A2B3C] font-semibold ${FONT}`}>{d.enterprises}</span></p>
              <p className={`text-[#5B6B7A] ${FONT}`}>Avg health score <span className={`float-right text-[#1A2B3C] font-semibold ${FONT}`}>{d.avgHealth}/100</span></p>
              <p className={`text-[#5B6B7A] ${FONT}`}>High risk <span className="float-right font-semibold" style={{ color: "#B3261E" }}>{d.highRisk}</span></p>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}

export default function App() {
  const [view, setView] = useState("landing");
  if (view === "landing") return <Landing onSelect={setView} />;
  if (view === "enterprise") return <EnterpriseApp onBack={() => setView("landing")} />;
  if (view === "officer") return <FieldOfficerDashboard onBack={() => setView("landing")} />;
  if (view === "nabard") return <NabardView onBack={() => setView("landing")} />;
}