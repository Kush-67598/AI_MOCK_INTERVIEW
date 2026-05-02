"use client";
import Link from "next/link";
import { Mic, Volume2, MicOff } from "lucide-react";
import { useEffect, useState, useRef, use } from "react";
import { useRouter } from "next/navigation";

export default function InterviewPage({ searchParams }) {
  const router = useRouter();
  const params = use(searchParams);
  const sessionID = useRef(crypto.randomUUID());
  const selectedTopic = params?.topic ?? "React";
  const recognitionRef = useRef(null);
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(1);
  const [question, setQuestion] = useState("");
  const [qaList, setQaList] = useState([]);
  const [compatibility, setCompatibility] = useState(true);
  useEffect(() => {
    localStorage.removeItem("AI_INTERVIEW"); // clear old session
    generateQuestion();
  }, []);

  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () =>
      window.speechSynthesis.getVoices();

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setCompatibility(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;

    recognition.onresult = (e) => {
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) {
          setTranscript((prev) => prev + e.results[i][0].transcript);
        }
      }
    };
    recognition.onerror = (e) => setIsListening(false);
    recognition.onend = () => setIsListening(false);
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speak = (text) => {
    // stop listening while AI speaks
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(
      (v) => v.name === "Google UK English Female",
    );
    if (femaleVoice) utterance.voice = femaleVoice;
    utterance.rate = 0.9;
    utterance.pitch = 1.3;

    window.speechSynthesis.speak(utterance);
  };

  const generateQuestion = async () => {
    const res = await fetch("/api/topicGen", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic: selectedTopic }),
    });
    const data = await res.json();
    setQuestion(data.question);
    speak(data.question);
  };

  const nextQuestion = () => {
    const updatedList = [...qaList, { question, answer: transcript }];
    setQaList(updatedList);

    // read existing sessions
    const existing = JSON.parse(localStorage.getItem("AI_INTERVIEW") || "[]");

    // find if current session already exists
    const sessionIndex = existing.findIndex((s) => s.id === sessionID.current);

    const currentSession = {
      id: sessionID.current,
      topic: selectedTopic,
      qa: updatedList,
      createdAt: Date.now(),
    };

    if (sessionIndex !== -1) {
      existing[sessionIndex] = currentSession; // update existing
    } else {
      existing.push(currentSession); // add new
    }

    localStorage.setItem("AI_INTERVIEW", JSON.stringify(existing));

    const nextIndex = questionIndex + 1;
    setQuestionIndex(nextIndex);
    if (nextIndex > 10) {
      router.push("/results");
    } else {
      setTranscript("");
      generateQuestion();
    }
  };
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-8">
      {!compatibility && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-center text-sm text-red-400">
          ⚠️ Your browser doesn't support Speech Recognition. Please use Chrome
          or Edge for the best experience.
        </div>
      )}
      <header className="rounded-2xl border border-white/10 bg-panel px-5 py-4 text-sm text-muted">
        <span className="font-medium text-white">{selectedTopic}</span>
        <span className="mx-2">-</span>
        <span>Question:{questionIndex}/10</span>
      </header>

      <section className="mt-8 flex flex-1 flex-col items-center justify-between gap-8">
        {/* question card */}
        <div className="w-full rounded-3xl border border-white/10 bg-panel/90 p-8 shadow-glow">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Interview Question</h2>
            {/* <button
              className="rounded-full border border-white/15 bg-white/5 p-3 text-white/80 transition hover:border-accent/70"
              aria-label="Generate and read question"
            >
              <Volume2 className="h-5 w-5" />
            </button> */}
          </div>
          <p className="text-lg leading-relaxed text-muted">
            {question || "Click the speaker icon to generate a question..."}
          </p>
        </div>

        {/* mic + transcript */}
        <div className="flex w-full flex-col items-center">
          <button
            onClick={isListening ? stopListening : startListening}
            aria-label="Record answer"
            className={`flex h-24 w-24 items-center justify-center rounded-full transition ${
              isListening ? "bg-red-500" : "bg-zinc-600"
            }`}
          >
            {isListening ? (
              <MicOff className="h-10 w-10" />
            ) : (
              <Mic className="h-10 w-10" />
            )}
          </button>
          <p className="mt-2 text-sm text-muted">
            {isListening ? "Listening... click to stop" : "Click mic to answer"}
          </p>

          <div className="mt-5 h-36 w-full rounded-2xl border border-white/10 bg-panel p-4 overflow-y-auto">
            <h2 className="text-xl font-semibold py-6 px-2">Your Answer</h2>
            <p className="text-sm text-muted px-2">
              {transcript || "Transcript will appear here..."}
            </p>
          </div>

          <div className="mt-6 flex w-full justify-end gap-3">
            <button
              disabled={transcript.length == 0}
              className="disabled:cursor-not-allowed rounded-xl border hover:bg-gray-800  border-white/20 px-6 py-3 font-semibold text-white/90"
              onClick={nextQuestion}
            >
              Next Question
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
