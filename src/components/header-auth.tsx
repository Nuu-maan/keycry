"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User, LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export function HeaderAuth() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex h-8 w-8 items-center justify-center">
        <div className="h-4 w-4 rounded-full border-2 border-[#646669] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (user) {
    return (
      <Link
        href="/profile"
        className="flex h-8 w-8 items-center justify-center rounded transition-colors duration-200 hover:text-[#d0d0d0] text-[#ffc800]"
        aria-label="Profile"
      >
        <User size={16} strokeWidth={2.5} />
      </Link>
    );
  }

  return (
    <Link
      href="/login"
      className="flex h-8 w-8 items-center justify-center rounded transition-colors duration-200 hover:text-[#d0d0d0]"
      aria-label="Login"
    >
      <LogIn size={16} strokeWidth={2.5} />
    </Link>
  );
}
