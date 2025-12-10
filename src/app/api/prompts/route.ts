import { NextResponse } from "next/server";
import { generateWords, getRandomQuote, wordLists } from "@/lib/words";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("mode") || "words";
  const count = parseInt(searchParams.get("count") || "25", 10);

  if (mode === "quote") {
    return NextResponse.json({ prompt: getRandomQuote() });
  }

  if (mode === "all") {
    return NextResponse.json({
      words: wordLists.common,
      quotes: wordLists.quotes,
    });
  }

  return NextResponse.json({ prompt: generateWords(count) });
}
