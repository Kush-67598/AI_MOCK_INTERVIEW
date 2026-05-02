"use client";
import { useEffect, useState, useRef } from "react";

export default function Voice() {
  const recognitionRef = useRef(null);
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    loadVoices();
    // window.speechSynthesis.onvoiceschanged = loadVoices;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Speech Recognition not supported");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;

    recognition.onresult = (e) => {
      let interimText = "";
      let finalText = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) {
          finalText += e.results[i][0].transcript;
        } else {
          interimText += e.results[i][0].transcript;
        }
      }
      setTranscript((prev) => prev + finalText || interimText);
    };

    recognition.onerror = (e) => {
      console.error("Speech error:", e.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
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
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(v => v.name === "Google UK English Female");
    if(femaleVoice) utterance.voice = femaleVoice;
    utterance.rate = 0.9;
    utterance.pitch = 1.3;
    window.speechSynthesis.speak(utterance);
  };

  const generateQuestion = async (topic) => {
    const res = await fetch("/api/topicGen", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic })
    });
    const data = await res.json();
    setQuestion(data.question);  // display on screen
    setTranscript("");           // clear previous answer
    speak(data.question);        // AI speaks it
  };

  return (
    <>
      <div>Voice page</div>

      {/* generate question — hardcoded topic for now, will come from selection page later */}
      <button onClick={() => generateQuestion("React")}>
        Generate Question
      </button>

      {/* question display */}
      <p>{question}</p>

      {/* mic button */}
      <button onClick={isListening ? stopListening : startListening}>
        {isListening ? "Stop" : "Click to speak"}
      </button>

      {/* transcript */}
      <p>{transcript}</p>
    </>
  );
}