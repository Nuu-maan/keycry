import React, { useState } from 'react';
import { 
  AtSign, 
  Hash, 
  Clock, 
  Type, 
  Quote, 
  Mountain, 
  Wrench, 
  Share2,
  Settings2
} from 'lucide-react';

export default function TestConfig() {
  const [punctuation, setPunctuation] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [mode, setMode] = useState<'time' | 'words' | 'quote' | 'zen' | 'custom'>('time');
  const [duration, setDuration] = useState<15 | 30 | 60 | 120>(30);

  // Common button styles based on globals.css .text-button and design analysis
  // text-[13px] font-medium leading-[1.4]
  const buttonBaseClass = "group flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors duration-200 select-none cursor-pointer text-[13px] font-medium leading-[1.4]";
  const activeClass = "text-[#ffc800]";
  const inactiveClass = "text-[#888888] hover:text-[#d0d0d0]";

  return (
    <div id="testConfig" className="w-full flex justify-center items-center py-4 relative font-sans">
      <div className="bg-[#2d2d2d] rounded-lg px-4 py-2 flex items-center shadow-sm max-w-full overflow-x-auto no-scrollbar mx-4">
        
        {/* Punctuation & Numbers Group */}
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setPunctuation(!punctuation)}
            className={`${buttonBaseClass} ${punctuation ? activeClass : inactiveClass}`}
            aria-label="Toggle punctuation"
          >
            <AtSign size={13} strokeWidth={2.5} />
            <span>punctuation</span>
          </button>
          
          <button 
            onClick={() => setNumbers(!numbers)}
            className={`${buttonBaseClass} ${numbers ? activeClass : inactiveClass}`}
            aria-label="Toggle numbers"
          >
            <Hash size={13} strokeWidth={2.5} />
            <span>numbers</span>
          </button>
        </div>

        {/* Spacer Left */}
        <div className="w-[3px] h-6 bg-[#1e1e1e] rounded mx-4 opacity-0 md:opacity-100 flex-shrink-0" />

        {/* Mode Selector Group */}
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setMode('time')}
            className={`${buttonBaseClass} ${mode === 'time' ? activeClass : inactiveClass}`}
          >
            <Clock size={13} strokeWidth={2.5} />
            <span>time</span>
          </button>
          
          <button 
            onClick={() => setMode('words')}
            className={`${buttonBaseClass} ${mode === 'words' ? activeClass : inactiveClass}`}
          >
            <Type size={13} strokeWidth={2.5} />
            <span>words</span>
          </button>
          
          <button 
            onClick={() => setMode('quote')}
            className={`${buttonBaseClass} ${mode === 'quote' ? activeClass : inactiveClass}`}
          >
            <Quote size={13} strokeWidth={2.5} />
            <span>quote</span>
          </button>
          
          <button 
            onClick={() => setMode('zen')}
            className={`${buttonBaseClass} ${mode === 'zen' ? activeClass : inactiveClass}`}
          >
            <Mountain size={13} strokeWidth={2.5} />
            <span>zen</span>
          </button>
          
          <button 
            onClick={() => setMode('custom')}
            className={`${buttonBaseClass} ${mode === 'custom' ? activeClass : inactiveClass}`}
          >
            <Wrench size={13} strokeWidth={2.5} />
            <span>custom</span>
          </button>
        </div>

        {/* Spacer Right */}
        <div className="w-[3px] h-6 bg-[#1e1e1e] rounded mx-4 opacity-0 md:opacity-100 flex-shrink-0" />

        {/* Time/Duration Group */}
        <div className="flex items-center gap-1">
          {[15, 30, 60, 120].map((time) => (
            <button
              key={time}
              onClick={() => setDuration(time as 15|30|60|120)}
              className={`${buttonBaseClass} ${duration === time ? activeClass : inactiveClass} min-w-[24px] justify-center px-1`}
            >
              <span>{time}</span>
            </button>
          ))}
          
          <button className={`${buttonBaseClass} ${inactiveClass} ml-1 px-1`}>
            <Settings2 size={13} strokeWidth={2.5} />
          </button>
        </div>

      </div>

      {/* Share Button - usually positioned to the right or integrated depending on layout width */}
      {/* Based on HTML structure, it is a sibling to the row. We place it to the right for desktop layouts. */}
      <button className={`absolute right-0 md:static ml-4 ${buttonBaseClass} ${inactiveClass} px-2 md:px-0 hidden xl:flex`}>
        <Share2 size={14} strokeWidth={2.5} />
      </button>

      {/* Mobile-only visible placeholder for responsiveness reference if needed, though strictly following clone instructions mostly desktop focused */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}