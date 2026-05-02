"use client";
import Link from "next/link";
import Loader from "../components/Spinner.js";
import { useEffect, useState } from "react";

export default function ResultsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState([]);

  useEffect(() => {
    const get_ans = localStorage.getItem("AI_INTERVIEW");
    if (!get_ans) return;
    setData(JSON.parse(get_ans));
  }, []);

  useEffect(() => {
    if (data.length == 0) return;
    submit_For_Evaluation();
  }, [data]);

  const submit_For_Evaluation = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/checkAns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qa: data[data.length-1].qa }),
      });
      const RESPONSE = await res.json();
      setEvaluation(RESPONSE.result);
      setLoading(false);
    } catch {
      alert("some problem has occurred");
      setLoading(false);
    }
  };

  const avgScore = evaluation.length > 0
    ? Math.round(evaluation.reduce((sum, item) => sum + item.score, 0) / evaluation.length)
    : null;

  return (
    <>
      {loading && <Loader />}
      <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 py-12">
        <div className="w-full rounded-3xl border border-white/10 bg-panel p-10 shadow-glow">
          
          {/* header */}
          <p className="text-sm uppercase tracking-[0.2em] text-accent">
            Interview Complete
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">Session Results</h1>

          {/* overall score */}
          {avgScore !== null && (
            <div className="mt-6 flex items-center gap-4">
              <span className={`text-6xl font-bold ${
                avgScore >= 8 ? "text-green-400" :
                avgScore >= 5 ? "text-yellow-400" :
                "text-red-400"
              }`}>
                {avgScore}
              </span>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest">Overall Score</p>
                <p className="text-white/60 text-sm">out of 10</p>
              </div>
            </div>
          )}

          {/* evaluation cards */}
          {evaluation.length != 0 && (
            <div className="mt-8 flex flex-col gap-4">
              <h2 className="text-lg font-semibold text-white">Detailed Feedback</h2>
              {evaluation.map((item, id) => (
                <div key={id} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-widest text-white/40">
                      Q{id + 1}
                    </span>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                      item.score >= 8 ? "bg-green-500/20 text-green-400" :
                      item.score >= 5 ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-red-500/20 text-red-400"
                    }`}>
                      {item.score}/10
                    </span>
                  </div>

                  <p className="text-base font-medium text-white">{item.question}</p>

                  <div className="mt-3 border-t border-white/10 pt-3">
                    <span className="text-xs uppercase tracking-widest text-white/40">Your Answer</span>
                    <p className="mt-1 text-sm text-white/70">{item.answer}</p>
                  </div>

                  <div className="mt-3 border-t border-white/10 pt-3">
                    <span className="text-xs uppercase tracking-widest text-white/40">Feedback</span>
                    <p className="mt-1 text-sm text-white/60 italic">{item.feedback}</p>
                  </div>

                </div>
              ))}
            </div>
          )}

          {/* try again */}
          <Link
            href="/topics"
            className="mt-8 inline-flex rounded-xl bg-accent px-6 py-3 font-semibold text-black transition hover:scale-[1.01]"
          >
            Try Again
          </Link>

        </div>
      </main>
    </>
  );
}