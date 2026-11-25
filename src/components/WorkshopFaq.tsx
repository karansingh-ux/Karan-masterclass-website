'use client';

import React, { useState } from 'react';
import { workshopConfig } from '../config/workshopConfig';

export default function WorkshopFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="divide-y divide-gray-300 dark:divide-gray-800 border-t border-b border-gray-300 dark:border-gray-800">
      {workshopConfig.faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className="py-2">
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="ws-faq-btn text-foreground-100 flex min-h-[56px] w-full items-center justify-between py-2 text-left text-[16px] font-medium cursor-pointer transition-colors"
              aria-expanded={isOpen}
            >
              <span className="pr-4">{faq.q}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                style={{ color: isOpen ? '#7D52FF' : undefined }}
                className={`shrink-0 transition-transform duration-200 text-gray-500 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.4697 14.5303C11.7626 14.8232 12.2374 14.8232 12.5303 14.5303L16.5303 10.5303C16.8232 10.2374 16.8232 9.76256 16.5303 9.46967C16.2374 9.17678 15.7626 9.17678 15.4697 9.46967L12 12.9393L8.53033 9.46967C8.23744 9.17678 7.76256 9.17678 7.46967 9.46967C7.17678 9.76256 7.17678 10.2374 7.46967 10.5303L11.4697 14.5303Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            {isOpen && (
              <div className="overflow-hidden pb-4 pt-1 animate-in fade-in duration-150">
                <p className="paragraph text-foreground-200 text-[15px] leading-relaxed whitespace-pre-line">
                  {faq.a}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
