"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/layouts/main-layout";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function ProfileSettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [profile, setProfile] = useState({
    username: "",
    display_name: "",
    bio: "",
  });

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setProfile({
          username: data.username || "",
          display_name: data.display_name || "",
          bio: data.bio || "",
        });
      }
      setLoading(false);
    }

    loadProfile();
  }, [router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: profile.display_name,
        bio: profile.bio,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Profile updated successfully!");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="animate-spin text-[#ffc800]" size={32} />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex-1 py-8 px-4">
        <div className="max-w-xl mx-auto">
          <Link
            href="/profile"
            className="flex items-center gap-2 text-[#888888] hover:text-[#d0d0d0] transition-colors mb-6"
          >
            <ArrowLeft size={18} />
            Back to profile
          </Link>

          <h1 className="text-2xl font-bold text-[#d0d0d0] mb-6">Profile Settings</h1>

          <form onSubmit={handleSave} className="space-y-4">
            {error && (
              <div className="bg-[#ca4754]/20 border border-[#ca4754] text-[#f87171] px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-[#4ade80]/20 border border-[#4ade80] text-[#4ade80] px-4 py-3 rounded-lg text-sm">
                {success}
              </div>
            )}

            <div>
              <label className="block text-sm text-[#888888] mb-1.5">Username</label>
              <input
                type="text"
                value={profile.username}
                disabled
                className="w-full bg-[#2d2d2d] border border-[#404040] rounded-lg px-4 py-2.5 text-[#646669] cursor-not-allowed"
              />
              <p className="text-[#646669] text-xs mt-1">Username cannot be changed</p>
            </div>

            <div>
              <label className="block text-sm text-[#888888] mb-1.5">Display Name</label>
              <input
                type="text"
                value={profile.display_name}
                onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
                className="w-full bg-[#2d2d2d] border border-[#404040] rounded-lg px-4 py-2.5 text-[#d0d0d0] placeholder-[#646669] focus:outline-none focus:border-[#ffc800] transition-colors"
                placeholder="Your display name"
              />
            </div>

            <div>
              <label className="block text-sm text-[#888888] mb-1.5">Bio</label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows={3}
                className="w-full bg-[#2d2d2d] border border-[#404040] rounded-lg px-4 py-2.5 text-[#d0d0d0] placeholder-[#646669] focus:outline-none focus:border-[#ffc800] transition-colors resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-[#ffc800] text-[#1e1e1e] font-semibold py-2.5 rounded-lg hover:bg-[#e6b400] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {saving && <Loader2 size={18} className="animate-spin" />}
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
