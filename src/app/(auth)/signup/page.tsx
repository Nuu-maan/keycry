"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, Loader2, Mail, CheckCircle2 } from "lucide-react";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    setLoading(true);

    const supabase = createClient();

    const { data: existingUser } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", username)
      .single();

    if (existingUser) {
      setError("Username already taken");
      setLoading(false);
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        username,
        display_name: username,
      });

      if (profileError) {
        setError(profileError.message);
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    setShowConfirmation(true);
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-[#1e1e1e] flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-[#252525] rounded-2xl p-8 border border-[#333] text-center">
            <div className="w-16 h-16 bg-[#4ade80]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-[#4ade80]" />
            </div>
            
            <h1 className="text-2xl font-semibold text-[#d0d0d0] mb-3">Check your email</h1>
            
            <p className="text-[#888888] mb-6 leading-relaxed">
              We sent a confirmation link to<br />
              <span className="text-[#d0d0d0] font-medium">{email}</span>
            </p>

            <div className="bg-[#1e1e1e] rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#ffc800] mt-0.5 shrink-0" />
                <p className="text-sm text-[#888888] text-left">
                  Click the link in your email to activate your account. If you don&apos;t see it, check your spam folder.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                href="/login"
                className="block w-full bg-[#ffc800] text-[#1e1e1e] font-semibold py-2.5 rounded-lg hover:bg-[#e6b400] transition-colors text-center"
              >
                Go to Sign In
              </Link>
              <Link
                href="/"
                className="block w-full text-[#888888] hover:text-[#d0d0d0] font-medium py-2 transition-colors text-center"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
        <h1 className="text-2xl font-semibold text-[#d0d0d0] text-center mb-6">Create account</h1>

        <form onSubmit={handleSignup} className="space-y-4">
          {error && (
            <div className="bg-[#ca4754]/20 border border-[#ca4754] text-[#f87171] px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="username" className="block text-sm text-[#888888] mb-1.5">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
              className="w-full bg-[#2d2d2d] border border-[#404040] rounded-lg px-4 py-2.5 text-[#d0d0d0] placeholder-[#646669] focus:outline-none focus:border-[#ffc800] transition-colors"
              placeholder="username"
              required
            />
          </div>

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

          <div>
            <label htmlFor="confirmPassword" className="block text-sm text-[#888888] mb-1.5">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-[#2d2d2d] border border-[#404040] rounded-lg px-4 py-2.5 text-[#d0d0d0] placeholder-[#646669] focus:outline-none focus:border-[#ffc800] transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ffc800] text-[#1e1e1e] font-semibold py-2.5 rounded-lg hover:bg-[#e6b400] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            Create account
          </button>
        </form>

        <p className="text-center text-[#646669] mt-6 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-[#ffc800] hover:text-[#e6b400] transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}