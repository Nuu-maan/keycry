'use client';

import React, { useState } from 'react';
import { Cookie } from 'lucide-react';

interface CookieToggleProps {
  id: string;
  title: string;
  description: React.ReactNode;
  checked: boolean;
  disabled?: boolean;
  onChange?: () => void;
  extraContent?: React.ReactNode;
}

const CookieToggle: React.FC<CookieToggleProps> = ({ 
  id, 
  title, 
  description, 
  checked, 
  disabled, 
  onChange, 
  extraContent 
}) => (
  <div className={`group flex gap-3 p-2 rounded hover:bg-[#323232] transition-colors select-none ${disabled ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}`}>
    {/* Custom Toggle Switch */}
    <div className="relative flex items-start pt-1 shrink-0">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="peer sr-only"
        aria-label={`Toggle ${title}`}
      />
      <div 
        className={`w-9 h-5 rounded-full transition-colors flex items-center px-1 ${
          checked ? 'bg-[#ffc800]' : 'bg-[#191919]'
        } group-hover:bg-[#1f1f1f] peer-checked:group-hover:bg-[#ffc800]`}
        onClick={!disabled ? onChange : undefined}
      >
        <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform duration-200 ease-out transform ${
          checked ? 'translate-x-4' : 'translate-x-0'
        }`} />
      </div>
    </div>
    
    <div className="flex flex-col flex-1" onClick={!disabled ? onChange : undefined}>
      <label htmlFor={id} className={`text-sm font-bold text-[#d0d0d0] leading-none mb-1.5 ${!disabled && 'cursor-pointer'}`}>
        {title}
      </label>
      <div className="text-xs text-[#888888] leading-relaxed">
        {description}
      </div>
      {extraContent}
    </div>
  </div>
);

export default function CookiesModal() {
  const [showSettings, setShowSettings] = useState(false);
  const [cookies, setCookies] = useState({
    security: true,
    analytics: false,
    sentry: false,
    advertising: false,
  });

  const toggleCookie = (key: keyof typeof cookies) => {
    if (key === 'security') return;
    setCookies(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAcceptAll = () => {
    setCookies({
      security: true,
      analytics: true,
      sentry: true,
      advertising: true,
    });
    // Implementation for closing/saving would go here
  };

  const handleRejectNonEssential = () => {
    setCookies({
      security: true,
      analytics: false,
      sentry: false,
      advertising: false,
    });
     // Implementation for closing/saving would go here
  };

  return (
    // Overlay backdrop
    <div className="fixed inset-0 z-[200] flex items-center justify-center md:items-end md:justify-end md:p-8 bg-black/40 backdrop-blur-[2px] font-mono antialiased">
      
      {/* Modal Dialog */}
      <div 
        role="dialog"
        aria-labelledby="modal-title"
        className="
          w-full md:w-[420px] max-w-[calc(100vw-2rem)]
          bg-[#2a2a2a] 
          rounded-lg 
          shadow-[0_20px_60px_rgba(0,0,0,0.5)] 
          flex flex-col 
          text-[#d0d0d0] 
          border border-[#404040]
          md:mr-8 md:mb-8
          animate-in fade-in zoom-in-95 duration-200 slide-in-from-bottom-2
          overflow-hidden
        "
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-2 shrink-0">
          <div className="flex items-center gap-2.5 text-[18px] font-bold text-[#d0d0d0]">
            <span className="text-[#d0d0d0]">
              <Cookie className="w-5 h-5 fill-current" />
            </span>
            <span id="modal-title" className="tracking-tight">We use cookies by the way</span>
          </div>
        </div>

        {/* Content Container with Transition Logic */}
        <div className="relative">
          {/* Main View */}
          {!showSettings && (
            <div className="px-6 pb-6 pt-2 flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <p className="text-[13px] text-[#888888] leading-[1.6]">
                Cookies enhance your experience and help us improve our website.
              </p>

              <div className="flex flex-col gap-2">
                <button 
                  onClick={handleAcceptAll}
                  className="w-full bg-[#ffc800] hover:bg-[#ffe066] active:bg-[#e6b400] text-[#1e1e1e] font-bold text-[13px] py-3 px-4 rounded transition-colors uppercase tracking-wide focus-visible:outline-none focus:ring-2 focus:ring-[#ffc800] focus:ring-offset-2 focus:ring-offset-[#2a2a2a]"
                >
                  accept all
                </button>
                <button 
                  onClick={handleRejectNonEssential}
                  className="w-full bg-[#2d2d2d] hover:bg-[#3d3d3d] active:bg-[#4d4d4d] text-[#d0d0d0] font-medium text-[13px] py-3 px-4 rounded transition-colors uppercase tracking-wide focus-visible:outline-none focus:ring-2 focus:ring-[#888888] focus:ring-offset-2 focus:ring-offset-[#2a2a2a]"
                >
                  reject non-essential
                </button>
                <button 
                  onClick={() => setShowSettings(true)}
                  className="w-full bg-[#2d2d2d] hover:bg-[#3d3d3d] active:bg-[#4d4d4d] text-[#d0d0d0] font-medium text-[13px] py-3 px-4 rounded transition-colors uppercase tracking-wide focus-visible:outline-none focus:ring-2 focus:ring-[#888888] focus:ring-offset-2 focus:ring-offset-[#2a2a2a]"
                >
                  more options
                </button>
              </div>
            </div>
          )}

          {/* Settings View */}
          {showSettings && (
            <div className="px-6 pb-6 pt-2 flex flex-col gap-4 animate-in fade-in slide-in-from-right-8 duration-300">
              <p className="text-[13px] text-[#888888] leading-[1.6]">
                Cookies enhance your experience and help us improve our website.
              </p>
              
              <div className="flex flex-col gap-1 overflow-y-auto max-h-[60vh] md:max-h-[400px] -mr-2 pr-2 scrollbar-thin scrollbar-thumb-[#404040] scrollbar-track-transparent">
                <CookieToggle
                  id="security"
                  title="security"
                  description={
                    <>
                      We use Cloudflare cookies to improve security and performance of our site.
                      <br /><br />
                      They <b>do not</b> store any personal information and are required.
                    </>
                  }
                  checked={cookies.security}
                  disabled={true}
                />

                <CookieToggle
                  id="analytics"
                  title="analytics"
                  description="We use Google Analytics to track the overall traffic and demographics of our site."
                  checked={cookies.analytics}
                  onChange={() => toggleCookie('analytics')}
                />

                <CookieToggle
                  id="sentry"
                  title="sentry"
                  description="We use Sentry to track errors and performance issues on our site, as well as record anonymized user sessions to help us debug issues and improve our product."
                  checked={cookies.sentry}
                  onChange={() => toggleCookie('sentry')}
                />

                <CookieToggle
                  id="advertising"
                  title="advertising"
                  description="Our advertising partner may use cookies to deliver ads that are more relevant to you."
                  checked={cookies.advertising}
                  onChange={() => toggleCookie('advertising')}
                  extraContent={
                    <button className="text-[10px] text-[#888888] hover:text-[#ffc800] underline mt-2 text-left w-full transition-colors focus:outline-none">
                      Click to change your preferences on ad related cookies
                    </button>
                  }
                />
              </div>

              <div className="flex flex-col gap-2 mt-2">
                 <button 
                  onClick={() => { /* Logic to save selected */ }}
                  className="w-full bg-[#ffc800] hover:bg-[#ffe066] active:bg-[#e6b400] text-[#1e1e1e] font-bold text-[13px] py-3 px-4 rounded transition-colors uppercase tracking-wide focus-visible:outline-none focus:ring-2 focus:ring-[#ffc800] focus:ring-offset-2 focus:ring-offset-[#2a2a2a]"
                >
                  accept selected
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}