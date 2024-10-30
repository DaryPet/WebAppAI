// import OpenAI from "openai";
// import { OpenAIStream, StreamingTextResponse } from "ai";

// // Create an OpenAI API client (that's edge friendly!)
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // IMPORTANT! Set the runtime to edge
// // export const runtime = "edge";

// export async function POST(req: Request) {
//   const { messages } = await req.json();

//   // Ask OpenAI for a streaming chat completion given the prompt
//   const response = await openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     stream: true,
//     messages: [
//   {
//     role: 'system',
//     content: 'You are a professional chef. You provide detailed cooking instructions, tips, and advice on selecting the best ingredients.',
//   },
//   ...messages,
// ],
//   });

//   // Convert the response into a friendly text-stream
//   const stream = OpenAIStream(response);
//   // Respond with the stream
//   return new StreamingTextResponse(stream);
// }

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  console.log("Starting POST handler...");

  // Проверяем доступность переменных окружения
  if (!process.env.OPENAI_API_KEY) {
    console.error("OpenAI API key is missing!");
    return NextResponse.json({ error: "API key is missing" }, { status: 500 });
  }

  // Получаем данные из запроса и логируем
  try {
    const { messages } = await req.json();
    console.log("Messages received:", messages);
  } catch (error) {
    console.error("Error parsing request JSON:", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Остальная логика вашего API (например, обращение к OpenAI)
  return NextResponse.json({ success: true });
}
