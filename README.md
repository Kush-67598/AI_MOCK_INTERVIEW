# 🎙️ VoicePrep — AI Mock Interview

> Practice technical interviews out loud. AI asks, you speak, AI evaluates.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![Groq](https://img.shields.io/badge/Groq-LLaMA3-orange?style=flat-square)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

## 🔗 Live Demo

[ADD YOUR DEPLOYED URL HERE]

<!-- ADD DEMO GIF HERE -->
<!-- ![VoicePrep Demo](./demo.gif) -->

---

## 🧠 What is VoicePrep?

VoicePrep is an AI-powered mock interview app that simulates a real interview experience using your voice. The AI asks you a question out loud, you speak your answer, and it evaluates your response with a score and detailed feedback.

No typing. No multiple choice. Just you and the interviewer.

---

## ✨ Features

- 🎤 **Voice-based answers** — speak naturally using browser-native Speech Recognition API
- 🔊 **AI speaks questions** — Text-to-Speech makes it feel like a real interview
- 🧠 **AI evaluation** — Groq LLaMA3 scores your answer out of 10 with actionable feedback
- 📊 **Session results** — overall score + per-question breakdown with color-coded badges
- 🎯 **6 preset topics** — DSA, React, Node.js, System Design, JavaScript, CSS
- ✏️ **Custom topics** — enter any topic for a fully tailored interview session
- 💾 **No account needed** — session stored locally in your browser

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15, React 19, Tailwind CSS |
| AI | Groq API (LLaMA 3.3 70B Versatile) |
| Speech Input | Web Speech API (SpeechRecognition) |
| Speech Output | Web Speech API (SpeechSynthesis) |
| Storage | localStorage |
| Icons | Lucide React |
| Loader | react-spinners |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Groq API key — [get one free at console.groq.com](https://console.groq.com)

### Installation

```bash
git clone https://github.com/yourusername/voiceprep.git
cd voiceprep
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
GROQ_API_KEY=your_groq_api_key_here
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in Chrome or Edge.

---

## 📁 Project Structure

```
/app
├── /topics              # Topic selection page
├── /interview           # Main interview page (voice Q&A)
├── /results             # Results + AI evaluation page
├── /api
│   ├── /topicGen        # Groq — generates interview question
│   └── /checkAns        # Groq — evaluates all answers, returns scores
/components
└── Spinner.js           # Full screen loading component
```

---

## 🎯 How It Works

1. **Pick a topic** — choose from 6 presets or type any custom topic
2. **AI generates a question** — fetched from Groq, displayed and spoken aloud
3. **You answer** — click the mic button and speak your answer
4. **Next question** — your answer is saved, next question is generated
5. **After 10 questions** — all answers sent to Groq for evaluation
6. **Results page** — see your overall score, per-question scores, and feedback

---

## ⚠️ Browser Support

| Browser | Support |
|---|---|
| Chrome | ✅ Full |
| Edge | ✅ Full |
| Brave | ✅ Full |
| Firefox | ❌ Not supported |
| Safari | ⚠️ Partial |

> Best experienced on **Chrome or Edge**. Firefox does not support the Web Speech API.

---

## 📸 Screenshots

<!-- Add screenshots here -->
<!-- ![Topics Page](./screenshots/topics.png) -->
<!-- ![Interview Page](./screenshots/interview.png) -->
<!-- ![Results Page](./screenshots/results.png) -->

---

## 👤 Author

**[YOUR NAME]**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [yourlinkedin](https://linkedin.com/in/yourlinkedin)

---

## 📄 License

MIT © [YOUR NAME]
