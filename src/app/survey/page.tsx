import React from 'react';
import Link from 'next/link';

export default function SurveyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 dark:bg-[#0c0c0c]">
      <div className="fixed top-6 left-6">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-gray-1000 hover:text-gray-1200 dark:hover:text-white transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to aiforui.dev
        </Link>
      </div>

      <div className="w-full max-w-[420px] rounded-[32px] bg-white dark:bg-[#141414] border border-gray-200 dark:border-gray-800 p-8 shadow-sm text-center">
        <h1 className="text-2xl font-[575] text-foreground-100 tracking-tight">
          Early Access Survey
        </h1>
        <p className="mt-4 text-sm text-foreground-200 leading-relaxed text-balance">
          This survey is for students, so I know the answers are coming from people who actually took the course. Log in with the email you bought with and you’ll land right back here.
        </p>

        <div className="mt-8">
          <Link
            href="/login?redirect=%2Fsurvey"
            className="buy-button flex h-11 w-full items-center justify-center rounded-xl font-medium text-sm text-white no-underline"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
