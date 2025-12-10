"use client";

import { Calendar, Clock, Target, Trophy, Zap, TrendingUp, Share2 } from "lucide-react";
import { useState } from "react";

interface Profile {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
}

interface Stats {
  testsCompleted: number;
  testsStarted: number;
  timeTyping: number;
  highestWpm: number;
  averageWpm: number;
  averageAccuracy: number;
  recentAvgWpm: number;
  bestResults: {
    time15: any;
    time30: any;
    time60: any;
    time120: any;
    words10: any;
    words25: any;
    words50: any;
    words100: any;
  };
}

interface TypingResult {
  id: string;
  wpm: number;
  raw_wpm: number;
  accuracy: number;
  test_mode: string;
  test_duration: number;
  created_at: string;
}

export function PublicProfileStats({
  profile,
  stats,
  results,
}: {
  profile: Profile | null;
  stats: Stats;
  results: TypingResult[];
}) {
  const [copied, setCopied] = useState(false);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error("Failed to copy");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-[#2d2d2d] flex items-center justify-center text-[#ffc800] text-3xl font-bold">
            {profile?.username?.[0]?.toUpperCase() || "?"}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#d0d0d0]">{profile?.display_name || profile?.username}</h1>
            <p className="text-[#646669]">@{profile?.username}</p>
            {profile?.bio && <p className="text-[#888888] text-sm mt-1">{profile.bio}</p>}
            <p className="text-[#888888] text-sm mt-1">
              Joined {profile?.created_at ? formatDate(profile.created_at) : "recently"}
            </p>
          </div>
        </div>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 bg-[#2d2d2d] text-[#d0d0d0] rounded-lg hover:bg-[#3d3d3d] transition-colors"
        >
          <Share2 size={16} />
          {copied ? "Copied!" : "Share Profile"}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={<Trophy />} label="Tests Completed" value={stats.testsCompleted} />
        <StatCard icon={<Clock />} label="Time Typing" value={formatTime(stats.timeTyping)} />
        <StatCard icon={<Zap />} label="Highest WPM" value={stats.highestWpm} highlight />
        <StatCard icon={<Target />} label="Avg Accuracy" value={`${stats.averageAccuracy}%`} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#2d2d2d] rounded-xl p-6">
          <h2 className="text-lg font-semibold text-[#d0d0d0] mb-4 flex items-center gap-2">
            <Clock size={18} className="text-[#ffc800]" />
            Best - Time Mode
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <BestResult label="15 seconds" result={stats.bestResults.time15} />
            <BestResult label="30 seconds" result={stats.bestResults.time30} />
            <BestResult label="60 seconds" result={stats.bestResults.time60} />
            <BestResult label="120 seconds" result={stats.bestResults.time120} />
          </div>
        </div>

        <div className="bg-[#2d2d2d] rounded-xl p-6">
          <h2 className="text-lg font-semibold text-[#d0d0d0] mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-[#ffc800]" />
            Best - Words Mode
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <BestResult label="10 words" result={stats.bestResults.words10} />
            <BestResult label="25 words" result={stats.bestResults.words25} />
            <BestResult label="50 words" result={stats.bestResults.words50} />
            <BestResult label="100 words" result={stats.bestResults.words100} />
          </div>
        </div>
      </div>

      <div className="bg-[#2d2d2d] rounded-xl p-6">
        <h2 className="text-lg font-semibold text-[#d0d0d0] mb-4">Recent Tests</h2>
        {results.length === 0 ? (
          <p className="text-[#646669] text-center py-8">No tests completed yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-[#888888] text-sm border-b border-[#404040]">
                  <th className="text-left pb-3 font-medium">WPM</th>
                  <th className="text-left pb-3 font-medium">Raw</th>
                  <th className="text-left pb-3 font-medium">Accuracy</th>
                  <th className="text-left pb-3 font-medium">Mode</th>
                  <th className="text-left pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {results.slice(0, 10).map((result) => (
                  <tr key={result.id} className="border-b border-[#404040]/50 hover:bg-[#3d3d3d]/50 transition-colors">
                    <td className="py-3 text-[#ffc800] font-semibold">{result.wpm}</td>
                    <td className="py-3 text-[#d0d0d0]">{result.raw_wpm}</td>
                    <td className="py-3 text-[#d0d0d0]">{Number(result.accuracy).toFixed(1)}%</td>
                    <td className="py-3 text-[#888888]">
                      {result.test_mode} {result.test_duration}
                    </td>
                    <td className="py-3 text-[#646669] text-sm">{formatDate(result.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div className="bg-[#2d2d2d] rounded-xl p-4">
      <div className="flex items-center gap-2 text-[#888888] mb-2">
        <span className={highlight ? "text-[#ffc800]" : ""}>{icon}</span>
        <span className="text-sm">{label}</span>
      </div>
      <p className={`text-2xl font-bold ${highlight ? "text-[#ffc800]" : "text-[#d0d0d0]"}`}>{value}</p>
    </div>
  );
}

function BestResult({ label, result }: { label: string; result: any }) {
  return (
    <div className="bg-[#1e1e1e] rounded-lg p-3">
      <p className="text-[#646669] text-sm mb-1">{label}</p>
      {result ? (
        <div>
          <p className="text-[#ffc800] text-xl font-bold">{result.wpm} wpm</p>
          <p className="text-[#888888] text-sm">{Number(result.accuracy).toFixed(1)}% acc</p>
        </div>
      ) : (
        <p className="text-[#646669]">-</p>
      )}
    </div>
  );
}
