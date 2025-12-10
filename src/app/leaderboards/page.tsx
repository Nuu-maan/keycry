import { createClient } from "@/lib/supabase/server";
import MainLayout from "@/components/layouts/main-layout";
import { LeaderboardTabs } from "@/components/leaderboard-tabs";

export default async function LeaderboardsPage() {
  const supabase = await createClient();

  const { data: allTimeResults } = await supabase
    .from("typing_results")
    .select(`
      id,
      wpm,
      raw_wpm,
      accuracy,
      test_mode,
      test_duration,
      created_at,
      profiles (
        username,
        display_name
      )
    `)
    .order("wpm", { ascending: false })
    .limit(100);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data: dailyResults } = await supabase
    .from("typing_results")
    .select(`
      id,
      wpm,
      raw_wpm,
      accuracy,
      test_mode,
      test_duration,
      created_at,
      profiles (
        username,
        display_name
      )
    `)
    .gte("created_at", today.toISOString())
    .order("wpm", { ascending: false })
    .limit(100);

  return (
    <MainLayout>
      <div className="flex-1 py-8 px-4">
        <div className="max-w-[1000px] mx-auto">
          <h1 className="text-3xl font-bold text-[#d0d0d0] mb-2">Leaderboards</h1>
          <p className="text-[#646669] mb-8">See how you stack up against the fastest typists</p>
          <LeaderboardTabs allTimeResults={allTimeResults || []} dailyResults={dailyResults || []} />
        </div>
      </div>
    </MainLayout>
  );
}
