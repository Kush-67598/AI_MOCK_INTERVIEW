// app/api/question/route.js
import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
  const { topic } = await req.json();

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are a technical interviewer. Ask one clear, concise theoretical interview question. No coding questions. No preamble. Just the question.`,
      },
      {
        role: "user",
        content: `Generate 1 medium difficulty ${topic} interview question for a developer. Return ONLY the question, nothing else.`,
      },
    ],
  });

  const question = response.choices[0].message.content;
  return NextResponse.json({ question });
}
