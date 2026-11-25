'use client';

import React, { useEffect, useState } from 'react';
import { workshopConfig } from '../config/workshopConfig';

export default function StickyMobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past hero (300px)
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToDates = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('pick-your-day');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!visible) return null;

  return (
    <aside
      aria-label="Mobile booking action"
      className="fixed bottom-4 inset-x-4 z-50 md:hidden animate-in fade-in slide-in-from-bottom-3 duration-200"
    >
      <div className="flex items-center justify-between rounded-full bg-[#141414]/95 p-2 pl-4 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-white/50 line-through font-mono">
              {workshopConfig.price.original}
            </span>
            <span className="text-base font-semibold text-white tracking-tight">
              {workshopConfig.price.display}
            </span>
          </div>
          <span className="text-[11px] text-white/60 font-mono">
            {workshopConfig.price.earlyBirdLabel}
          </span>
        </div>
        <a
          href="#pick-your-day"
          onClick={scrollToDates}
          style={{
            backgroundColor: '#5A2BFF',
            boxShadow: '0 0 20px rgba(90, 43, 255, 0.25)',
          }}
          className="flex items-center justify-center px-4 py-2 rounded-full font-medium text-xs text-white transition-colors hover:opacity-90"
        >
          Book your seat &rarr;
        </a>
      </div>
    </aside>
  );
}
