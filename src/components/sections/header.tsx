import React from 'react';
import Link from 'next/link';
import { Keyboard, Crown, Info, Settings, Bell } from 'lucide-react';
import { HeaderAuth } from '@/components/header-auth';

export default function HeaderSection() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#1e1e1e] font-sans text-[#d0d0d0]">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        {/* Logo Section */}
        <Link href="/" className="group flex items-center gap-2 select-none no-underline">
          <div className="relative h-8 w-8 shrink-0 text-[#ffc800]">
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
          <div className="flex flex-col">
            <span className="ml-[2px] text-[10px] font-medium leading-tight text-[#646669] transition-colors duration-200 group-hover:text-[#d0d0d0]">
              key see
            </span>
            <h1 className="font-sans text-2xl font-semibold leading-none text-[#d0d0d0]">
              keycry
            </h1>
          </div>
        </Link>

        {/* Navigation Section */}
        <nav className="flex items-center gap-2 text-[#646669]">
          <Link
            href="/"
            className="flex h-8 w-8 items-center justify-center rounded transition-colors duration-200 hover:text-[#d0d0d0]"
            aria-label="Start Test"
          >
            <Keyboard size={16} strokeWidth={2.5} />
          </Link>
          
          <Link
            href="/leaderboards"
            className="flex h-8 w-8 items-center justify-center rounded transition-colors duration-200 hover:text-[#d0d0d0]"
            aria-label="Leaderboards"
          >
            <Crown size={16} strokeWidth={2.5} />
          </Link>
          
          <Link
            href="/about"
            className="flex h-8 w-8 items-center justify-center rounded transition-colors duration-200 hover:text-[#d0d0d0]"
            aria-label="About"
          >
            <Info size={16} strokeWidth={2.5} />
          </Link>
          
          <Link
            href="/settings"
            className="flex h-8 w-8 items-center justify-center rounded transition-colors duration-200 hover:text-[#d0d0d0]"
            aria-label="Settings"
          >
            <Settings size={16} strokeWidth={2.5} />
          </Link>

          {/* Spacer */}
          <div className="w-2" aria-hidden="true" />
          
          <button 
            className="group relative flex h-8 w-8 items-center justify-center rounded transition-colors duration-200 hover:text-[#d0d0d0]"
            aria-label="Notifications"
          >
            <Bell size={16} strokeWidth={2.5} />
            <div className="absolute right-1.5 top-1.5 hidden h-1.5 w-1.5 rounded-full bg-[#ffc800]" />
          </button>
          
          <HeaderAuth />
        </nav>
      </div>
    </header>
  );
}