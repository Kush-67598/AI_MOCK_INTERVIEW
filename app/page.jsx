import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-6 text-center">
      <div className="rounded-3xl border border-white/10 bg-panel/80 p-10 shadow-glow backdrop-blur">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-accent">Mock Interview Studio</p>
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">VoicePrep</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
          Practice technical interviews with voice-first prompts and focused feedback.
        </p>
        <Link
          href="/topics"
          className="mt-8 inline-flex items-center rounded-xl bg-accent px-7 py-3 text-base font-semibold text-black transition hover:scale-[1.02]"
        >
          Start Interview
        </Link>
      </div>
    </main>
  );
}
