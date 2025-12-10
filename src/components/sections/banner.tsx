'use client';

import React, { useState, useEffect } from 'react';
import { Megaphone, X } from 'lucide-react';

export default function Banner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClose = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  if (!isMounted) return null;
  if (!isVisible && !isFading) return null;

  return (
    <div
      id="bannerCenter"
      className={`
        w-full sticky top-0 z-[101]
        transition-all duration-300 ease-out
        ${isFading ? 'opacity-0 -translate-y-full pointer-events-none' : 'opacity-100 translate-y-0'}
      `}
      style={{
        backgroundColor: '#8b7500',
        borderBottom: '1px solid #6b5500',
        color: '#e8e8e8',
      }}
    >
      <div
        id="0"
        className="banner good content-grid withImage w-full mx-auto px-6"
        style={{
          maxWidth: '1400px',
        }}
      >
        <div className="container flex items-center justify-between w-full py-3 gap-3">
          <div className="flex items-center gap-3 shrink-0">
            <div className="icon lefticon text-[16px] opacity-90">
              <Megaphone 
                size={16} 
                fill="currentColor" 
                strokeWidth={0} 
                style={{ transform: 'scaleX(-1)' }}
              />
            </div>
            <div className="image hidden"></div>
          </div>

          <div className="text flex-1 text-center font-medium text-[13px] leading-[1.4] antialiased">
            Welcome to keycry - the minimalist typing experience!
          </div>

          <button
            className="closeButton shrink-0 flex items-center justify-center cursor-pointer p-0.5 rounded opacity-75 hover:opacity-100 hover:text-white transition-all duration-150 ease-in-out bg-transparent border-none appearance-none"
            onClick={handleClose}
            aria-label="Close banner"
          >
            <X size={14} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
}