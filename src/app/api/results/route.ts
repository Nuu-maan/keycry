import { NextRequest, NextResponse } from "next/server";

interface Result {
  id: number;
  typedText: string;
  originalText: string;
  timeTaken: number;
  wpm: number;
  rawWpm: number;
  accuracy: number;
  correct: number;
  incorrect: number;
  createdAt: string;
}

const results: Result[] = [];
let idCounter = 1;

export async function GET() {
  return NextResponse.json(results);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { typedText, originalText, timeTaken, wpm, rawWpm, accuracy, correct, incorrect } = body;

    if (
      typeof typedText !== "string" ||
      typeof originalText !== "string" ||
      typeof timeTaken !== "number"
    ) {
      return NextResponse.json(
        { error: "Invalid input. typedText, originalText, and timeTaken are required." },
        { status: 400 }
      );
    }

    const result: Result = {
      id: idCounter++,
      typedText,
      originalText,
      timeTaken,
      wpm: wpm ?? 0,
      rawWpm: rawWpm ?? 0,
      accuracy: accuracy ?? 0,
      correct: correct ?? 0,
      incorrect: incorrect ?? 0,
      createdAt: new Date().toISOString(),
    };

    results.push(result);

    return NextResponse.json(result, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
