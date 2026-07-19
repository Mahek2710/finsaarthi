import { useState } from "react";
import { enterprises, whatIfScenarios, districtSummary, translations, sectors, districts, heatmapData } from "./mockData";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { Mic, Volume2, ArrowLeft, Globe, Users, BarChart3 } from "lucide-react";
import logoIcon from "./assets/finsaarthi-icon.png";
import logoFull from "./assets/finsaarthi-logo-full.png";

const FONT = "font-['Noto_Sans',sans-serif]";
const L = (field, lang) => (field && (field[lang] || field.en)) ?? "";

// Brand palette sampled from the FinSaarthi logo
const NAVY = "#16234F";
const GREEN = "#4F8942";

function speak(text, lang) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang === "hi" ? "hi-IN" : "en-IN";
  window.speechSynthesis.speak(utterance);
}

function riskColor(risk) {
  return risk === "High" ? "#B3261E" : risk === "Medium" ? "#C77800" : "#2E7D5B";
}
function riskLabel(risk, t) {
  return risk === "High" ? t.riskHigh : risk === "Medium" ? t.riskMedium : t.riskLow;
}
function riskPlainLabel(risk, t) {
  return risk === "High" ? t.needsAttention : risk === "Medium" ? t.keepEye : t.doingOkay;
}

function lerpColor(a, b, t) {
  const ah = parseInt(a.slice(1), 16), bh = parseInt(b.slice(1), 16);
  const ar = (ah >> 16) & 0xff, ag = (ah >> 8) & 0xff, ab = ah & 0xff;
  const br = (bh >> 16) & 0xff, bg = (bh >> 8) & 0xff, bb = bh & 0xff;
  return `rgb(${Math.round(ar + (br - ar) * t)},${Math.round(ag + (bg - ag) * t)},${Math.round(ab + (bb - ab) * t)})`;
}
function riskHeatColor(risk) {
  return risk <= 50 ? lerpColor("#2E7D5B", "#C77800", risk / 50) : lerpColor("#C77800", "#B3261E", (risk - 50) / 50);
}

function Badge({ risk, t }) {
  const c = riskColor(risk);
  return (
    <span className={`${FONT} text-xs font-semibold px-3 py-1.5 rounded-full`} style={{ backgroundColor: `${c}1A`, color: c }}>
      {riskLabel(risk, t)}
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

function FactorBar({ label, impact, note, lang }) {
  const isPositive = impact >= 0;
  const c = isPositive ? "#2E7D5B" : "#B3261E";
  return (
    <div className="mb-3">
      <div className={`flex justify-between text-sm mb-1 ${FONT} text-[#1A2B3C]`}>
        <span>{L(label, lang)}</span>
        <span className="font-semibold tabular-nums" style={{ color: c }}>{isPositive ? "+" : ""}{impact}</span>
      </div>
      <div className="w-full h-2 bg-[#E2E6EA] rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${Math.min(Math.abs(impact) * 2.5, 100)}%`, backgroundColor: c }} />
      </div>
      <p className={`text-xs text-[#5B6B7A] mt-1 ${FONT}`}>{L(note, lang)}</p>
    </div>
  );
}

function LangToggle({ lang, setLang }) {
  return (
    <button
      onClick={() => setLang(lang === "en" ? "hi" : "en")}
      className={`flex items-center gap-1.5 text-sm ${FONT} border border-[#E2E6EA] rounded-lg px-2.5 py-1.5 text-[#5B6B7A] bg-white shrink-0`}
    >
      <Globe size={14} /> {lang === "en" ? "हिं में देखें" : "View in English"}
    </button>
  );
}

function Landing({ onSelect, lang, setLang }) {
  const t = translations[lang];
  const tabs = [
    { key: "enterprise", label: t.tabEnterprise, desc: t.tabEnterpriseDesc, icon: null },
    { key: "officer", label: t.tabOfficer, desc: t.tabOfficerDesc, icon: Users },
    { key: "nabard", label: t.tabNabard, desc: t.tabNabardDesc, icon: BarChart3 },
  ];
  return (
    <div className="min-h-screen bg-[#F5F7F9] flex items-center justify-center p-6">
      <div className="max-w-xl w-full">
        <div className="flex justify-end mb-3">
          <LangToggle lang={lang} setLang={setLang} />
        </div>
        <div className="bg-white rounded-t-2xl border border-b-0 border-[#E2E6EA] px-8 py-10 text-center">
          <img src={logoFull} alt="FinSaarthi" className="h-14 mx-auto mb-4" />
          <p className={`${FONT} text-[#5B6B7A] text-base`}>{t.landingTagline}</p>
        </div>
        <div className="bg-white rounded-b-2xl border border-t border-[#E2E6EA] p-3">
          {tabs.map((tab) => (
            <button key={tab.key} onClick={() => onSelect(tab.key)}
              className="w-full text-left px-4 py-4 flex items-center gap-4 rounded-xl hover:bg-[#F5F7F9] transition-colors">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${NAVY}0F` }}>
                {tab.icon ? <tab.icon style={{ color: NAVY }} size={22} /> : <img src={logoIcon} alt="" className="w-7 h-7 object-contain" />}
              </div>
              <div>
                <p className={`${FONT} text-lg font-semibold text-[#1A2B3C]`}>{tab.label}</p>
                <p className={`${FONT} text-sm text-[#5B6B7A]`}>{tab.desc}</p>
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
      <div className="px-5 py-4 flex items-center gap-3" style={{ backgroundColor: NAVY }}>
        <button onClick={onBack} className="text-white/80 hover:text-white"><ArrowLeft size={20} /></button>
        <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center p-1.5 shrink-0">
          <img src={logoIcon} alt="" className="w-full h-full object-contain" />
        </div>
        <div>
          <p className={`${FONT} text-white font-semibold leading-tight`}>FinSaarthi</p>
          <p className={`${FONT} text-xs text-white/70 leading-tight`}>{subtitle}</p>
        </div>
      </div>
      <div className="max-w-2xl mx-auto p-5">{children}</div>
    </div>
  );
}

function Card({ children, className = "" }) {
  return <div className={`bg-white border border-[#E2E6EA] rounded-2xl p-5 mb-4 ${className}`}>{children}</div>;
}

function EnterpriseApp({ onBack, lang, setLang }) {
  const [selected, setSelected] = useState(enterprises[0]);
  const [scenario, setScenario] = useState("none");
  const [listening, setListening] = useState(false);
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
    const newTx = { id: Date.now(), type, amount: Number(amount), category: { en: category, hi: category } };
    setTxMap((prev) => ({ ...prev, [selected.id]: [newTx, ...prev[selected.id]] }));
    const msg = lang === "hi"
      ? `${type === "income" ? "आमदनी" : "खर्च"} जोड़ा गया, ${amount} रुपये, ${category}`
      : `${type === "income" ? "Added income" : "Added expense"} of ${amount} rupees for ${category}`;
    speak(msg, lang);
    setAmount("");
    setCategory("");
  };

  const scoreColor = liveHealthScore >= 70 ? "#2E7D5B" : liveHealthScore >= 45 ? "#C77800" : "#B3261E";

  return (
    <Shell subtitle={t.appTitle} onBack={onBack}>
      <div className="flex justify-between items-center mb-4 gap-2">
        <div className="flex gap-2 flex-wrap">
          {enterprises.map((e) => (
            <button key={e.id} onClick={() => setSelected(e)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${FONT}`}
              style={selected.id === e.id
                ? { backgroundColor: NAVY, color: "white" }
                : { backgroundColor: "white", color: "#5B6B7A", border: "1px solid #E2E6EA" }}>
              {L(e.name, lang)}
            </button>
          ))}
        </div>
        <LangToggle lang={lang} setLang={setLang} />
      </div>

      <button onClick={startVoiceInput}
        className="w-full rounded-2xl mb-4 py-6 flex flex-col items-center gap-2 text-white shadow-sm"
        style={{ backgroundColor: listening ? "#B3261E" : GREEN }}>
        <Mic size={30} className={listening ? "animate-pulse" : ""} />
        <span className={`${FONT} font-semibold text-base`}>{listening ? t.listening : t.tapSpeak}</span>
        <span className={`${FONT} text-xs text-white/80`}>{t.tapSpeakSub}</span>
      </button>

      <Card>
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className={`text-sm text-[#5B6B7A] ${FONT}`}>{t.healthScore}</p>
            <p className={`text-4xl font-bold ${FONT} mt-1`} style={{ color: scoreColor }}>
              {liveHealthScore}<span className="text-base text-[#8A97A3]">/100</span>
            </p>
            <p className={`text-sm font-medium ${FONT} mt-0.5`} style={{ color: scoreColor }}>
              {riskPlainLabel(selected.risk, t)}
            </p>
          </div>
          <Badge risk={selected.risk} t={t} />
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={adjustedForecast}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF1F4" vertical={false} />
              <XAxis dataKey="month" fontSize={12} stroke="#8A97A3" axisLine={false} tickLine={false} />
              <YAxis fontSize={12} stroke="#8A97A3" axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E2E6EA", fontSize: 13 }} />
              <Line type="monotone" dataKey="cashflow" stroke={NAVY} strokeWidth={2.5} dot={{ r: 3, fill: GREEN }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <p className={`${FONT} font-semibold text-[#1A2B3C] mb-3`}>{t.orType}</p>
        <div className="flex gap-2 mb-3">
          <button onClick={() => setType("income")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium ${FONT}`}
            style={type === "income" ? { backgroundColor: GREEN, color: "white" } : { backgroundColor: "#F5F7F9", color: "#5B6B7A" }}>
            {t.moneyIn}
          </button>
          <button onClick={() => setType("expense")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium ${FONT} ${type === "expense" ? "bg-[#B3261E] text-white" : "bg-[#F5F7F9] text-[#5B6B7A]"}`}>
            {t.moneyOut}
          </button>
        </div>
        <div className="flex gap-2 mb-3">
          <input type="number" placeholder={t.amountPlaceholder} value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={`w-28 border border-[#E2E6EA] rounded-xl px-3 py-2.5 text-sm ${FONT}`} />
          <input type="text" placeholder={t.categoryPlaceholder} value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`flex-1 border border-[#E2E6EA] rounded-xl px-3 py-2.5 text-sm ${FONT}`} />
        </div>
        <button onClick={addTransaction} className={`w-full py-2.5 text-white rounded-xl text-sm font-semibold ${FONT}`} style={{ backgroundColor: NAVY }}>
          {t.addEntry}
        </button>

        <div className="mt-4 pt-4 border-t border-[#EEF1F4] space-y-2.5 max-h-40 overflow-y-auto">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex justify-between text-sm">
              <span className={`text-[#5B6B7A] ${FONT}`}>{L(tx.category, lang)}</span>
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
              <circle cx="18" cy="18" r="16" fill="none" stroke={GREEN} strokeWidth="3.5"
                strokeDasharray={`${selected.creditReadiness} 100`} strokeLinecap="round" />
            </svg>
            <div className={`absolute inset-0 flex items-center justify-center text-sm font-bold text-[#1A2B3C] ${FONT}`}>
              {selected.creditReadiness}
            </div>
          </div>
          <ul className={`text-sm text-[#5B6B7A] space-y-1.5 ${FONT}`}>
            {selected.readinessTips.map((tip, i) => <li key={i}>• {L(tip, lang)}</li>)}
          </ul>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-2">
          <p className={`${FONT} font-semibold text-[#1A2B3C]`}>{t.riskAlert}</p>
          <button onClick={() => speak(L(selected.riskReason, lang), lang)}
            className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg ${FONT}`} style={{ color: NAVY, backgroundColor: `${NAVY}14` }}>
            <Volume2 size={13}/> {t.playAlert}
          </button>
        </div>
        <p className={`text-sm text-[#5B6B7A] mb-4 ${FONT}`}>{L(selected.riskReason, lang)}</p>
        <p className={`font-medium text-sm text-[#1A2B3C] mb-3 ${FONT}`}>{t.whyFlagged}</p>
        {selected.factors.map((f, i) => <FactorBar key={i} {...f} lang={lang} />)}
      </Card>

      <Card className="mb-0">
        <p className={`${FONT} font-semibold text-[#1A2B3C] mb-3`}>{t.whatIf}</p>
        <div className="flex gap-2 mb-3 flex-wrap">
          {Object.entries(whatIfScenarios).map(([key, val]) => (
            <button key={key} onClick={() => setScenario(key)}
              className={`px-3 py-1.5 rounded-xl text-sm font-medium ${FONT}`}
              style={scenario === key ? { backgroundColor: GREEN, color: "white" } : { backgroundColor: "#F5F7F9", color: "#5B6B7A" }}>
              {L(val.label, lang)}
            </button>
          ))}
        </div>
        {L(scenarioData.note, lang) && <p className={`text-sm text-[#5B6B7A] ${FONT}`}>{L(scenarioData.note, lang)}</p>}
      </Card>
    </Shell>
  );
}

function FieldOfficerDashboard({ onBack }) {
  const [expanded, setExpanded] = useState(null);
  const t = translations.en;
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
                    <p className={`${FONT} font-semibold text-[#1A2B3C]`}>{L(e.name, "en")}</p>
                    <p className={`text-xs text-[#8A97A3] ${FONT}`}>{L(e.sector, "en")} · {L(e.district, "en")}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge risk={e.risk} t={t} />
                  <p className={`text-xs text-[#8A97A3] mt-1 ${FONT}`}>Health: {e.healthScore}/100</p>
                </div>
              </div>
              <p className={`text-sm text-[#5B6B7A] mt-2 pl-5 ${FONT}`}>{L(e.riskReason, "en")}</p>
              {isOpen && (
                <div className="mt-3 pt-3 border-t border-[#EEF1F4] pl-5">
                  <p className={`text-xs font-medium text-[#8A97A3] mb-2 uppercase tracking-wide ${FONT}`}>Contributing factors</p>
                  {e.factors.map((f, i) => <FactorBar key={i} {...f} lang="en" />)}
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
  const [selected, setSelected] = useState(null);
  const cellMap = {};
  heatmapData.forEach((d) => { cellMap[`${d.district}|${d.sector}`] = d; });

  const districtTotals = districts.map((dist) => {
    const rows = heatmapData.filter((h) => h.district === dist);
    const enterprisesCount = rows.reduce((s, r) => s + r.enterprises, 0);
    const avgRisk = Math.round(rows.reduce((s, r) => s + r.risk * r.enterprises, 0) / enterprisesCount);
    return { district: dist, enterprises: enterprisesCount, avgRisk };
  });

  const selectedCell = selected ? cellMap[`${selected.district}|${selected.sector}`] : null;

  return (
    <Shell subtitle="NABARD aggregate view" onBack={onBack}>
      <Card>
        <p className={`${FONT} font-semibold text-[#1A2B3C] mb-1`}>Risk heatmap</p>
        <p className={`text-xs text-[#8A97A3] mb-4 ${FONT}`}>District × sector. Tap a cell for details.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs" style={{ borderSpacing: 4, borderCollapse: "separate" }}>
            <thead>
              <tr>
                <th className="w-20"></th>
                {sectors.map((s) => (
                  <th key={s} className={`${FONT} font-medium text-[#5B6B7A] text-center pb-1`} style={{ fontSize: "10px" }}>{s}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {districts.map((dist) => (
                <tr key={dist}>
                  <td className={`${FONT} font-semibold text-[#1A2B3C] pr-2 whitespace-nowrap text-xs`}>{dist}</td>
                  {sectors.map((sec) => {
                    const cell = cellMap[`${dist}|${sec}`];
                    const isSelected = selected && selected.district === dist && selected.sector === sec;
                    return (
                      <td key={sec} className="p-0.5">
                        <button
                          onClick={() => setSelected({ district: dist, sector: sec })}
                          className={`${FONT} w-full aspect-square rounded-lg flex items-center justify-center text-white font-semibold transition-transform`}
                          style={{
                            backgroundColor: riskHeatColor(cell.risk),
                            outline: isSelected ? `2px solid ${NAVY}` : "none",
                            outlineOffset: 2,
                            transform: isSelected ? "scale(1.08)" : "scale(1)",
                            minWidth: 40,
                            minHeight: 40,
                          }}
                        >
                          {cell.risk}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <span className={`${FONT} text-xs text-[#8A97A3]`}>Low risk</span>
          <div className="flex-1 h-2 rounded-full" style={{ background: "linear-gradient(to right, #2E7D5B, #C77800, #B3261E)" }} />
          <span className={`${FONT} text-xs text-[#8A97A3]`}>High risk</span>
        </div>
      </Card>

      {selectedCell ? (
        <Card>
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className={`${FONT} font-semibold text-[#1A2B3C] text-lg`}>{selectedCell.sector} · {selectedCell.district}</p>
              <p className={`text-xs text-[#8A97A3] ${FONT}`}>{selectedCell.enterprises} enterprises tracked</p>
            </div>
            <span className={`${FONT} text-sm font-bold px-3 py-1.5 rounded-full text-white`} style={{ backgroundColor: riskHeatColor(selectedCell.risk) }}>
              {selectedCell.risk}/100
            </span>
          </div>
          <p className={`text-sm text-[#5B6B7A] ${FONT}`}>{selectedCell.note}</p>
        </Card>
      ) : (
        <Card>
          <p className={`text-sm text-[#8A97A3] ${FONT}`}>Tap any cell above to see the district-sector breakdown.</p>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-3">
        {districtTotals.map((d) => (
          <div key={d.district} className="bg-white rounded-2xl border border-[#E2E6EA] p-4">
            <p className={`${FONT} font-semibold text-[#1A2B3C] mb-2`}>{d.district}</p>
            <div className="space-y-1 text-sm">
              <p className={`text-[#5B6B7A] ${FONT}`}>Enterprises <span className={`float-right text-[#1A2B3C] font-semibold ${FONT}`}>{d.enterprises}</span></p>
              <p className={`text-[#5B6B7A] ${FONT}`}>Avg risk <span className="float-right font-semibold" style={{ color: riskHeatColor(d.avgRisk) }}>{d.avgRisk}</span></p>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}

export default function App() {
  const [view, setView] = useState("landing");
  const [lang, setLang] = useState("en");
  if (view === "landing") return <Landing onSelect={setView} lang={lang} setLang={setLang} />;
  if (view === "enterprise") return <EnterpriseApp onBack={() => setView("landing")} lang={lang} setLang={setLang} />;
  if (view === "officer") return <FieldOfficerDashboard onBack={() => setView("landing")} />;
  if (view === "nabard") return <NabardView onBack={() => setView("landing")} />;
}