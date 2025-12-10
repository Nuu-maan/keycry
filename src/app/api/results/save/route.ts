import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { wpm, rawWpm, accuracy, testMode, testDuration, wordCount, correctChars, incorrectChars } = body;

    const { data, error } = await supabase.from("typing_results").insert({
      user_id: user.id,
      wpm: Math.round(wpm),
      raw_wpm: Math.round(rawWpm),
      accuracy: accuracy.toFixed(2),
      test_mode: testMode,
      test_duration: testDuration,
      word_count: wordCount,
      correct_chars: correctChars,
      incorrect_chars: incorrectChars,
    }).select().single();

    if (error) {
      console.error("Error saving result:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
