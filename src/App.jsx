import { useState } from "react";
import { enterprises, whatIfScenarios } from "./mockData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-IN";
  window.speechSynthesis.speak(utterance);
}

function EnterpriseApp() {
  const [selected, setSelected] = useState(enterprises[0]);
  const [scenario, setScenario] = useState("none");
  const [listening, setListening] = useState(false);
  const [voiceText, setVoiceText] = useState("");

  const scenarioData = whatIfScenarios[scenario];
  const adjustedForecast = selected.forecast.map((point) => ({
    ...point,
    cashflow: Math.round(point.cashflow * (1 + scenarioData.deltaFactor)),
  }));

  const riskColor =
    selected.risk === "High"
      ? "bg-red-100 text-red-700 border-red-300"
      : selected.risk === "Medium"
      ? "bg-yellow-100 text-yellow-700 border-yellow-300"
      : "bg-green-100 text-green-700 border-green-300";

  const startVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input not supported in this browser, try Chrome");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    setListening(true);
    recognition.start();
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setVoiceText(text);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-green-800 mb-1">FinSaarthi</h1>
      <p className="text-sm text-gray-500 mb-6">Micro enterprise app</p>

      <div className="flex gap-2 mb-6 flex-wrap">
        {enterprises.map((e) => (
          <button
            key={e.id}
            onClick={() => setSelected(e)}
            className={`px-3 py-1.5 rounded-full text-sm border ${
              selected.id === e.id
                ? "bg-green-700 text-white border-green-700"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            {e.name}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-500">Financial health score</p>
            <p className="text-3xl font-semibold text-green-700">
              {selected.healthScore}/100
            </p>
          </div>
          <div className={`px-3 py-1 rounded-full border text-sm font-medium ${riskColor}`}>
            {selected.risk} risk
          </div>
        </div>

        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={adjustedForecast}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="cashflow" stroke="#15803d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
        <p className="font-medium mb-2">Risk alert</p>
        <p className="text-sm text-gray-600 mb-3">{selected.riskReason}</p>
        <button
          onClick={() => speak(selected.riskReason)}
          className="text-sm px-3 py-1.5 bg-green-50 text-green-700 rounded-lg border border-green-200"
        >
          Play alert
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
        <p className="font-medium mb-3">What-if simulator</p>
        <div className="flex gap-2 mb-3">
          {Object.entries(whatIfScenarios).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setScenario(key)}
              className={`px-3 py-1.5 rounded-lg text-sm border ${
                scenario === key
                  ? "bg-green-700 text-white border-green-700"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {val.label}
            </button>
          ))}
        </div>
        {scenarioData.note && (
          <p className="text-sm text-gray-500">{scenarioData.note}</p>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <p className="font-medium mb-3">Voice entry (try it)</p>
        <button
          onClick={startVoiceInput}
          className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm"
        >
          {listening ? "Listening..." : "Speak an entry"}
        </button>
        {voiceText && (
          <p className="mt-3 text-sm text-gray-600">You said: "{voiceText}"</p>
        )}
      </div>
    </div>
  );
}

function FieldOfficerDashboard() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-green-800 mb-1">FinSaarthi</h1>
      <p className="text-sm text-gray-500 mb-6">Field officer dashboard</p>

      <div className="space-y-3">
        {enterprises.map((e) => {
          const riskColor =
            e.risk === "High"
              ? "border-red-300 bg-red-50"
              : e.risk === "Medium"
              ? "border-yellow-300 bg-yellow-50"
              : "border-green-300 bg-green-50";
          return (
            <div key={e.id} className={`rounded-xl border p-4 ${riskColor}`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{e.name}</p>
                  <p className="text-xs text-gray-500">{e.sector}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{e.risk} risk</p>
                  <p className="text-xs text-gray-500">Health: {e.healthScore}/100</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{e.riskReason}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("enterprise");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-center gap-2 py-4 bg-white border-b">
        <button
          onClick={() => setView("enterprise")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            view === "enterprise" ? "bg-green-700 text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          Enterprise app
        </button>
        <button
          onClick={() => setView("officer")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            view === "officer" ? "bg-green-700 text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          Field officer dashboard
        </button>
      </div>
      {view === "enterprise" ? <EnterpriseApp /> : <FieldOfficerDashboard />}
    </div>
  );
}