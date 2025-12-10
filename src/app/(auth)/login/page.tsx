"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Keyboard, Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/profile");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] flex flex-col items-center justify-center px-4">
      <Link href="/" className="flex items-center gap-2 mb-8 group">
        <div className="h-10 w-10 text-[#ffc800]">
          <svg viewBox="0 0 32 32" className="w-10 h-10 fill-current">
            <path d="M10 6C10 4.89543 10.8954 4 12 4H20C21.1046 4 22 4.89543 22 6V8H10V6Z" />
            <path d="M6 10C4.89543 10 4 10.8954 4 12V20C4 21.1046 4.8954 22 6 22H26C27.1046 22 28 21.1046 28 20V12C28 10.8954 27.1046 10 26 10H6Z" />
            <circle cx="9" cy="14" r="1.5" className="fill-[#1e1e1e]" />
            <circle cx="13" cy="14" r="1.5" className="fill-[#1e1e1e]" />
            <circle cx="17" cy="14" r="1.5" className="fill-[#1e1e1e]" />
            <circle cx="21" cy="14" r="1.5" className="fill-[#1e1e1e]" />
            <rect x="8" y="17" width="16" height="2" rx="1" className="fill-[#1e1e1e]" />
          </svg>
        </div>
        <span className="text-2xl font-semibold text-[#d0d0d0]">keycry</span>
      </Link>

      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-[#d0d0d0] text-center mb-6">Sign in</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="bg-[#ca4754]/20 border border-[#ca4754] text-[#f87171] px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm text-[#888888] mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#2d2d2d] border border-[#404040] rounded-lg px-4 py-2.5 text-[#d0d0d0] placeholder-[#646669] focus:outline-none focus:border-[#ffc800] transition-colors"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-[#888888] mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#2d2d2d] border border-[#404040] rounded-lg px-4 py-2.5 pr-10 text-[#d0d0d0] placeholder-[#646669] focus:outline-none focus:border-[#ffc800] transition-colors"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#646669] hover:text-[#888888] transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ffc800] text-[#1e1e1e] font-semibold py-2.5 rounded-lg hover:bg-[#e6b400] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            Sign in
          </button>
        </form>

        <p className="text-center text-[#646669] mt-6 text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[#ffc800] hover:text-[#e6b400] transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}