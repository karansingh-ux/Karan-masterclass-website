'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import CourseSidebar, { CURRICULUM } from '../../../components/CourseSidebar';

export default function LockedLessonPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const params = useParams();
  const slugArray = (params?.slug as string[]) || [];
  const currentPath = `/learn/${slugArray.join('/')}`;

  // Find lesson title from curriculum
  let lessonTitle = 'Course Lesson';
  for (const item of CURRICULUM.lessons) {
    if (item.href === currentPath) {
      lessonTitle = item.title;
      break;
    }
  }
  if (lessonTitle === 'Course Lesson') {
    for (const group of CURRICULUM.workflows) {
      for (const item of group.items) {
        if ('href' in item && item.href === currentPath) {
          lessonTitle = item.title;
          break;
        }
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0c0c0c] text-gray-1200 dark:text-gray-200">
      <CourseSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-72 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-[#0c0c0c]/80 backdrop-blur-md px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded-lg text-gray-600 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Link href="/" className="hover:text-gray-900 dark:hover:text-white">Course</Link>
              <span>/</span>
              <span className="text-gray-900 dark:text-white font-medium">{lessonTitle}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://buy.polar.sh/polar_cl_WjojARrFH6Q6aicLCwGmMLFXDLa7yWAy0KPwn3pClmY"
              className="buy-button flex h-8 items-center rounded-full px-3.5 text-xs font-medium text-white shadow-2xs"
            >
              Enroll Now
            </a>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[620px] px-4 py-20 text-center">
          <div className="mx-auto grid size-12 place-items-center rounded-full bg-blue-50 dark:bg-blue-950/50 text-[#0082FB] mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          <h1 className="text-2xl sm:text-3xl font-[575] text-foreground-100 tracking-tight mb-3">
            {lessonTitle}
          </h1>

          <p className="text-sm text-foreground-200 leading-relaxed max-w-md mx-auto mb-8">
            This lesson is available for enrolled students. Sign in with the email you purchased with, or enroll now for lifetime access to all lessons, tools, and the 28 UI skills.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://buy.polar.sh/polar_cl_WjojARrFH6Q6aicLCwGmMLFXDLa7yWAy0KPwn3pClmY"
              className="buy-button w-full sm:w-auto h-10 px-6 rounded-full flex items-center justify-center font-medium text-sm text-white"
            >
              Enroll Now ($299)
            </a>
            <Link
              href={`/login?redirect=${encodeURIComponent(currentPath)}`}
              className="w-full sm:w-auto h-10 px-6 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center font-medium text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Log in with email
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <span className="text-xs text-gray-500 block mb-3">Free sample lessons:</span>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
              <Link
                href="/learn/prototyping-interfaces"
                className="underline text-blue-600 dark:text-blue-400 font-medium"
              >
                Prototyping interfaces &rarr;
              </Link>
              <span className="text-gray-300 dark:text-gray-700">&bull;</span>
              <Link
                href="/learn/workflows/build-a-tool-to-build-the-tool/ai-for-creative-work"
                className="underline text-blue-600 dark:text-blue-400 font-medium"
              >
                AI for creative work &rarr;
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
