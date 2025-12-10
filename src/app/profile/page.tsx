import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import MainLayout from "@/components/layouts/main-layout";
import { ProfileStats } from "@/components/profile-stats";

interface TypingResult {
  id: string;
  wpm: number;
  raw_wpm: number;
  accuracy: number;
  test_mode: string;
  test_duration: number;
  created_at: string;
}

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: results } = await supabase
    .from("typing_results")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const stats = calculateProfileStats(results || []);

  return (
    <MainLayout>
      <div className="flex-1 py-8 px-4">
        <div className="max-w-[1200px] mx-auto">
          <ProfileStats profile={profile} stats={stats} results={results || []} />
        </div>
      </div>
    </MainLayout>
  );
}

function calculateProfileStats(results: TypingResult[]) {
  if (results.length === 0) {
    return {
      testsCompleted: 0,
      testsStarted: 0,
      timeTyping: 0,
      highestWpm: 0,
      averageWpm: 0,
      averageAccuracy: 0,
      recentAvgWpm: 0,
      bestResults: {
        time15: null,
        time30: null,
        time60: null,
        time120: null,
        words10: null,
        words25: null,
        words50: null,
        words100: null,
      },
    };
  }

  const testsCompleted = results.length;
  const timeTyping = results.reduce((acc, r) => acc + r.test_duration, 0);
  const highestWpm = Math.max(...results.map((r) => r.wpm));
  const averageWpm = Math.round(results.reduce((acc, r) => acc + r.wpm, 0) / results.length);
  const averageAccuracy = Math.round(results.reduce((acc, r) => acc + Number(r.accuracy), 0) / results.length);

  const recentResults = results.slice(0, 10);
  const recentAvgWpm = recentResults.length > 0
    ? Math.round(recentResults.reduce((acc, r) => acc + r.wpm, 0) / recentResults.length)
    : 0;

  const getBest = (mode: string, duration: number) => {
    const filtered = results.filter((r) => r.test_mode === mode && r.test_duration === duration);
    if (filtered.length === 0) return null;
    return filtered.reduce((best, r) => (r.wpm > best.wpm ? r : best));
  };

  return {
    testsCompleted,
    testsStarted: testsCompleted,
    timeTyping,
    highestWpm,
    averageWpm,
    averageAccuracy,
    recentAvgWpm,
    bestResults: {
      time15: getBest("time", 15),
      time30: getBest("time", 30),
      time60: getBest("time", 60),
      time120: getBest("time", 120),
      words10: getBest("words", 10),
      words25: getBest("words", 25),
      words50: getBest("words", 50),
      words100: getBest("words", 100),
    },
  };
}