"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const topics = ["DSA", "System Design", "React", "Node.js", "JavaScript", "CSS"];

export default function TopicsPage() {
  const [inputData, setInputData] = useState("");
  const router = useRouter();

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-16">
      
      <div className="mb-12 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-accent mb-3">AI Mock Interview</p>
        <h1 className="text-5xl font-bold text-white">Choose Your Topic</h1>
        <p className="mt-4 text-muted max-w-md mx-auto">
          Select a track below or enter any custom topic to start your mock interview.
        </p>
      </div>

      {/* custom input */}
      <div className="mb-10 flex gap-3 max-w-xl mx-auto">
        <input
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder="Enter any custom topic e.g. Machine Learning..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputData) {
              router.push(`/interview?topic=${encodeURIComponent(inputData)}`);
            }
          }}
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-accent/60 transition"
        />
        <button
          onClick={() => {
            if(inputData) router.push(`/interview?topic=${encodeURIComponent(inputData)}`);
          }}
          className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
        >
          Start
        </button>
      </div>

      {/* divider */}
      <div className="flex items-center gap-4 max-w-xl mx-auto mb-10">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-xs text-white/30 uppercase tracking-widest">or pick a topic</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* topic grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <Link
            key={topic}
            href={`/interview?topic=${encodeURIComponent(topic)}`}
            className="group rounded-2xl border border-white/10 bg-panel p-6 transition hover:-translate-y-1 hover:border-accent/60 hover:bg-white/5"
          >
            <h2 className="text-2xl font-semibold text-white">{topic}</h2>
            <p className="mt-2 text-sm text-muted group-hover:text-white/80">
              Start this interview track →
            </p>
          </Link>
        ))}
      </div>

    </main>
  );
}