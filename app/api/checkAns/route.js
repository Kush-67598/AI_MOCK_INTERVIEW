import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
  const { qa } = await req.json();

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are an interview evaluator. Return ONLY a valid JSON array. No markdown, no explanation, no extra text. Just the raw JSON array.`
      },
      {
        role: "user",
        content: `Evaluate these interview answers:

${qa.map((item, i) => `Q${i+1}: ${item.question}\nA${i+1}: ${item.answer}`).join("\n\n")}

Return this exact format:
[
  { "question": "...", "answer": "...", "score": 7, "feedback": "Good explanation but missing X" }
]

Score out of 10. Feedback 1-2 sentences.`
      }
    ]
  });

  const raw = response.choices[0].message.content;
  const clean = raw.replace(/```json|```/g, "").trim();
  const result = JSON.parse(clean);
  console.log(result)
  return NextResponse.json({ result });
}