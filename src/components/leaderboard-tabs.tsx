"use client";

import { useState } from "react";
import { Trophy, Zap, Calendar } from "lucide-react";

export interface LeaderboardResult {
  id: string;
  wpm: number;
  raw_wpm: number;
  accuracy: number;
  test_mode: string;
  test_duration: number;
  created_at: string;
  profiles: {
    username: string;
    display_name: string | null;
  } | {
    username: string;
    display_name: string | null;
  }[] | null;
}

type TimeFilter = "all" | "daily";
type ModeFilter = "all" | "time15" | "time30" | "time60" | "time120" | "words10" | "words25" | "words50" | "words100";

export function LeaderboardTabs({
  allTimeResults,
  dailyResults,
}: {
  allTimeResults: LeaderboardResult[];
  dailyResults: LeaderboardResult[];
}) {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");
  const [modeFilter, setModeFilter] = useState<ModeFilter>("all");

  const baseResults = timeFilter === "all" ? allTimeResults : dailyResults;

  const filteredResults = baseResults.filter((result) => {
    if (modeFilter === "all") return true;
    if (modeFilter.startsWith("time")) {
      const duration = parseInt(modeFilter.replace("time", ""));
      return result.test_mode === "time" && result.test_duration === duration;
    }
    if (modeFilter.startsWith("words")) {
      const count = parseInt(modeFilter.replace("words", ""));
      return result.test_mode === "words" && result.test_duration === count;
    }
    return true;
  });

  const userBestMap = new Map<string, LeaderboardResult>();
  filteredResults.forEach((result) => {
    const profile = Array.isArray(result.profiles) ? result.profiles[0] : result.profiles;
    const username = profile?.username || "anonymous";
    const existing = userBestMap.get(username);
    if (!existing || result.wpm > existing.wpm) {
      userBestMap.set(username, result);
    }
  });

  const leaderboard = Array.from(userBestMap.values()).sort((a, b) => b.wpm - a.wpm);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap gap-4">
        <div className="flex bg-[#2d2d2d] rounded-lg p-1">
          <button
            onClick={() => setTimeFilter("all")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              timeFilter === "all" ? "bg-[#ffc800] text-[#1e1e1e]" : "text-[#888888] hover:text-[#d0d0d0]"
            }`}
          >
            <Trophy size={14} className="inline mr-2" />
            All Time
          </button>
          <button
            onClick={() => setTimeFilter("daily")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              timeFilter === "daily" ? "bg-[#ffc800] text-[#1e1e1e]" : "text-[#888888] hover:text-[#d0d0d0]"
            }`}
          >
            <Calendar size={14} className="inline mr-2" />
            Today
          </button>
        </div>

        <div className="flex flex-wrap bg-[#2d2d2d] rounded-lg p-1 gap-1">
          <FilterButton active={modeFilter === "all"} onClick={() => setModeFilter("all")}>
            All
          </FilterButton>
          <span className="text-[#404040] self-center px-1">|</span>
          <FilterButton active={modeFilter === "time15"} onClick={() => setModeFilter("time15")}>
            15s
          </FilterButton>
          <FilterButton active={modeFilter === "time30"} onClick={() => setModeFilter("time30")}>
            30s
          </FilterButton>
          <FilterButton active={modeFilter === "time60"} onClick={() => setModeFilter("time60")}>
            60s
          </FilterButton>
          <FilterButton active={modeFilter === "time120"} onClick={() => setModeFilter("time120")}>
            120s
          </FilterButton>
          <span className="text-[#404040] self-center px-1">|</span>
          <FilterButton active={modeFilter === "words10"} onClick={() => setModeFilter("words10")}>
            10w
          </FilterButton>
          <FilterButton active={modeFilter === "words25"} onClick={() => setModeFilter("words25")}>
            25w
          </FilterButton>
          <FilterButton active={modeFilter === "words50"} onClick={() => setModeFilter("words50")}>
            50w
          </FilterButton>
          <FilterButton active={modeFilter === "words100"} onClick={() => setModeFilter("words100")}>
            100w
          </FilterButton>
        </div>
      </div>

      <div className="bg-[#2d2d2d] rounded-xl overflow-hidden">
        {leaderboard.length === 0 ? (
          <div className="text-center py-16">
            <Zap size={48} className="mx-auto text-[#646669] mb-4" />
            <p className="text-[#888888]">No results yet. Be the first to set a record!</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-[#888888] text-sm bg-[#1e1e1e]">
                <th className="text-left py-4 px-6 font-medium w-16">#</th>
                <th className="text-left py-4 px-6 font-medium">User</th>
                <th className="text-left py-4 px-6 font-medium">WPM</th>
                <th className="text-left py-4 px-6 font-medium hidden md:table-cell">Raw</th>
                <th className="text-left py-4 px-6 font-medium">Accuracy</th>
                <th className="text-left py-4 px-6 font-medium hidden md:table-cell">Mode</th>
                <th className="text-left py-4 px-6 font-medium hidden lg:table-cell">Date</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((result, index) => {
                const profile = Array.isArray(result.profiles) ? result.profiles[0] : result.profiles;
                return (
                  <tr
                    key={result.id}
                    className={`border-t border-[#404040]/50 hover:bg-[#3d3d3d]/50 transition-colors ${
                      index < 3 ? "bg-[#ffc800]/5" : ""
                    }`}
                  >
                    <td className="py-4 px-6">
                      {index === 0 ? (
                        <span className="text-[#ffd700] text-lg">1</span>
                      ) : index === 1 ? (
                        <span className="text-[#c0c0c0] text-lg">2</span>
                      ) : index === 2 ? (
                        <span className="text-[#cd7f32] text-lg">3</span>
                      ) : (
                        <span className="text-[#646669]">{index + 1}</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#404040] flex items-center justify-center text-[#ffc800] text-sm font-bold">
                          {profile?.username?.[0]?.toUpperCase() || "?"}
                        </div>
                        <span className="text-[#d0d0d0] font-medium">
                          {profile?.display_name || profile?.username || "Anonymous"}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-[#ffc800] font-bold text-lg">{result.wpm}</td>
                    <td className="py-4 px-6 text-[#888888] hidden md:table-cell">{result.raw_wpm}</td>
                    <td className="py-4 px-6 text-[#d0d0d0]">{Number(result.accuracy).toFixed(1)}%</td>
                    <td className="py-4 px-6 text-[#646669] hidden md:table-cell">
                      {result.test_mode} {result.test_duration}
                    </td>
                    <td className="py-4 px-6 text-[#646669] hidden lg:table-cell">{formatDate(result.created_at)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
        active ? "bg-[#ffc800] text-[#1e1e1e]" : "text-[#888888] hover:text-[#d0d0d0]"
      }`}
    >
      {children}
    </button>
  );
}