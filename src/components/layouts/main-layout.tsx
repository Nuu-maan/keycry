"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Keyboard,
  Crown,
  Info,
  Settings,
  Bell,
  User,
  Megaphone,
  X,
  ChevronsUp,
  Mail,
  LifeBuoy,
  Github,
  MessageSquare,
  Twitter,
  FileText,
  Shield,
  Lock,
} from "lucide-react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [bannerOpen, setBannerOpen] = useState(true);
  const [bannerClosing, setBannerClosing] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeBanner = () => {
    setBannerClosing(true);
    setTimeout(() => {
      setBannerOpen(false);
      setBannerClosing(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#d0d0d0] font-sans selection:bg-[#ffc800] selection:text-[#1e1e1e] flex flex-col">
      <style jsx global>{`
        * {
          transition: color 0.15s ease, background-color 0.2s ease, border-color 0.15s ease, opacity 0.15s ease, transform 0.2s ease;
        }
        body {
          background-color: #1e1e1e;
          overflow-y: scroll;
        }
        ::-webkit-scrollbar {
          width: 10px;
          background: #1e1e1e;
        }
        ::-webkit-scrollbar-thumb {
          background-color: #404040;
          border-radius: 5px;
          border: 2px solid #1e1e1e;
        }
        ::-webkit-scrollbar-thumb:hover {
          background-color: #555555;
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-10px); }
        }
        .banner-enter { animation: fadeSlideIn 0.3s ease-out forwards; }
        .banner-exit { animation: fadeSlideOut 0.3s ease-out forwards; }
      `}</style>

      {bannerOpen && (
        <div 
          className={`sticky top-0 z-[101] bg-[#8b7500] text-[#e8e8e8] text-[13px] border-b border-[#6b5500] ${bannerClosing ? 'banner-exit' : 'banner-enter'}`}
        >
          <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <Megaphone size={16} className="shrink-0 opacity-90" />
              <div className="leading-snug">
                Welcome to keycry - the minimalist typing experience!
              </div>
            </div>
            <button 
              onClick={closeBanner}
              className="text-[#e8e8e8] hover:text-white transition-colors duration-150 p-1 hover:scale-110 active:scale-95"
              aria-label="Close banner"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col w-full max-w-[1400px] mx-auto px-6 relative">
        <header className="h-16 flex items-center justify-between shrink-0 z-[100]">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group select-none hover:opacity-90 transition-opacity duration-150">
              <div className="text-[#ffc800] transition-transform duration-200 group-hover:scale-105">
                <svg viewBox="0 0 32 32" className="w-8 h-8 fill-current">
                  <path d="M10 6C10 4.89543 10.8954 4 12 4H20C21.1046 4 22 4.89543 22 6V8H10V6Z" />
                  <path d="M6 10C4.89543 10 4 10.8954 4 12V20C4 21.1046 4.8954 22 6 22H26C27.1046 22 28 21.1046 28 20V12C28 10.8954 27.1046 10 26 10H6Z" />
                  <circle cx="9" cy="14" r="1.5" className="fill-[#1e1e1e]" />
                  <circle cx="13" cy="14" r="1.5" className="fill-[#1e1e1e]" />
                  <circle cx="17" cy="14" r="1.5" className="fill-[#1e1e1e]" />
                  <circle cx="21" cy="14" r="1.5" className="fill-[#1e1e1e]" />
                  <rect x="8" y="17" width="16" height="2" rx="1" className="fill-[#1e1e1e]" />
                </svg>
              </div>
              <div className="flex flex-col relative top-[-3px]">
                <div className="text-[10px] leading-none mb-[-1px] text-[#646669] font-medium ml-[2px] group-hover:text-[#888888] transition-colors duration-150">key see</div>
                <h1 className="text-2xl font-semibold leading-none text-[#d0d0d0]">keycry</h1>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              <NavLink href="/" icon={<Keyboard size={18} />} active />
              <NavLink href="/leaderboards" icon={<Crown size={18} />} />
              <NavLink href="/about" icon={<Info size={18} />} />
              <NavLink href="/settings" icon={<Settings size={18} />} />
            </nav>
          </div>

          <div className="flex items-center gap-1">
            <button className="p-3 text-[#646669] hover:text-[#d0d0d0] transition-all duration-150 hover:scale-110 active:scale-95 relative">
              <Bell size={18} />
            </button>
            <Link href="/login" className="p-3 text-[#646669] hover:text-[#d0d0d0] transition-all duration-150 hover:scale-110 active:scale-95">
              <User size={18} />
            </Link>
          </div>
        </header>

        <main className="flex-1 w-full flex flex-col relative z-0">
          {children}
        </main>

        <footer className="py-8 mt-auto text-[11px] text-[#646669] w-full">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              <FooterLink icon={<Mail size={11} />} text="contact" />
              <FooterLink icon={<LifeBuoy size={11} />} text="support" />
              <FooterLink icon={<Github size={11} />} text="github" />
              <FooterLink icon={<MessageSquare size={11} />} text="discord" />
              <FooterLink icon={<Twitter size={11} />} text="twitter" />
              <FooterLink icon={<FileText size={11} />} text="terms" />
              <FooterLink icon={<Shield size={11} />} text="security" />
              <FooterLink icon={<Lock size={11} />} text="privacy" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-[10px]">
              <div className="flex items-center gap-1.5">
                <kbd className="bg-[#2d2d2d] px-1.5 py-0.5 rounded text-[#d0d0d0] font-mono text-[9px]">tab</kbd>
                <span className="text-[#555]">+</span>
                <kbd className="bg-[#2d2d2d] px-1.5 py-0.5 rounded text-[#d0d0d0] font-mono text-[9px]">enter</kbd>
                <span className="ml-1">- restart test</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="bg-[#2d2d2d] px-1.5 py-0.5 rounded text-[#d0d0d0] font-mono text-[9px]">esc</kbd>
                <span className="ml-1">- command line</span>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-40 text-[#646669] hover:text-[#d0d0d0] p-2 transition-all duration-300 hover:scale-110 active:scale-95 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
        <ChevronsUp size={22} />
      </button>
    </div>
  );
}

function NavLink({ href, icon, active }: { href: string; icon: React.ReactNode; active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`p-3 transition-all duration-150 hover:scale-110 active:scale-95 ${active ? 'text-[#d0d0d0]' : 'text-[#646669] hover:text-[#d0d0d0]'}`}
    >
      {icon}
    </Link>
  );
}

function FooterLink({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <a href="#" className="flex items-center gap-1.5 hover:text-[#d0d0d0] transition-colors duration-150">
      {icon}
      <span>{text}</span>
    </a>
  );
}