'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface CurriculumItem {
  title: string;
  href?: string;
  badge?: string;
  disabled?: boolean;
}

export interface CurriculumGroup {
  title: string;
  badge?: string;
  items: CurriculumItem[];
}

export const CURRICULUM = {
  lessons: [
    { title: 'Intro', href: '/learn/intro' },
    { title: 'Mental models', href: '/learn/mental-models', badge: 'New' },
    { title: 'Friction as a feature', href: '/learn/friction-as-a-feature', badge: 'Updated' },
    { title: 'What are skills', href: '/learn/what-are-skills', badge: 'New' },
    { title: 'How to write good skills', href: '/learn/how-to-write-good-skills', badge: 'Updated' },
    { title: 'How to build with aiforui skills', href: '/learn/how-to-build-with-aiforui-skills' },
    { title: 'Prototyping interfaces', href: '/learn/prototyping-interfaces' },
    { title: 'Get good at telling AI what you want', href: '/learn/get-good-at-telling-ai-what-you-want', badge: 'New' },
    { title: 'Developing taste', href: '/learn/developing-taste', badge: 'New' },
    { title: 'Knowing where to learn from', href: '/learn/knowing-where-to-learn-from', badge: 'New' },
    { title: 'Getting into someone’s brain', href: '/learn/getting-into-someone-brain' },
  ],
  workflows: [
    {
      group: 'How I work',
      items: [
        { title: 'Using AI at work', href: '/learn/workflows/how-i-work/using-ai-at-work' },
        { title: 'Defining a system', href: '/learn/workflows/how-i-work/defining-a-system' },
      ],
    },
    {
      group: 'Product UI with AI',
      badge: 'Soon',
      items: [
        { title: 'Exploring within constraints', disabled: true },
        { title: 'Reviewing with a critic', disabled: true },
        { title: 'Polishing by subtraction', disabled: true },
      ],
    },
    {
      group: 'Reviewing animations',
      items: [
        { title: 'Setting up Lapse', href: '/learn/workflows/reviewing-animations/setting-up-lapse' },
        { title: 'Recording an interaction', href: '/learn/workflows/reviewing-animations/recording-an-interaction' },
        { title: 'Handing it to your agent', href: '/learn/workflows/reviewing-animations/handing-it-to-your-agent' },
      ],
    },
    {
      group: 'Build a tool to build the tool',
      items: [
        { title: 'Tools as means to an end', href: '/learn/workflows/build-a-tool-to-build-the-tool/tools-as-means-to-an-end' },
        { title: 'AI for creative work', href: '/learn/workflows/build-a-tool-to-build-the-tool/ai-for-creative-work' },
        { title: 'Reviewing your work', href: '/learn/workflows/build-a-tool-to-build-the-tool/reviewing-your-work' },
      ],
    },
  ],
};

export default function CourseSidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-72 bg-white dark:bg-[#0c0c0c] border-r border-gray-200 dark:border-gray-800 flex flex-col transition-transform duration-200 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Top Header */}
      <div className="flex h-14 items-center justify-between border-b border-gray-200 dark:border-gray-800 px-6 shrink-0">
        <Link href="/" className="font-semibold text-sm text-foreground-100 flex items-center gap-1.5 no-underline">
          <span className="font-bold text-[#0082FB]">AI</span> for UI
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden text-gray-500 hover:text-gray-900 dark:hover:text-white p-1"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      {/* Nav Content */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6 text-sm">
        {/* Lessons Section */}
        <div>
          <p className="px-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            Lessons
          </p>
          <div className="space-y-0.5">
            {CURRICULUM.lessons.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
                  }`}
                >
                  <span className="truncate">{item.title}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                        item.badge === 'New'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                          : 'bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Workflows Section */}
        <div>
          <p className="px-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            Workflows
          </p>
          <div className="space-y-4">
            {CURRICULUM.workflows.map((group, gIdx) => (
              <div key={gIdx} className="space-y-0.5">
                <div className="flex items-center justify-between px-2.5 py-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                  <span>{group.group}</span>
                  {group.badge && (
                    <span className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-500 px-1.5 py-0.2 rounded-full">
                      {group.badge}
                    </span>
                  )}
                </div>
                {group.items.map((item, iIdx) => {
                  const isActive = item.href && pathname === item.href;
                  if (item.disabled) {
                    return (
                      <div
                        key={iIdx}
                        className="flex items-center justify-between px-2.5 py-1.5 text-[13px] text-gray-400 dark:text-gray-600 cursor-not-allowed select-none"
                      >
                        <span className="truncate">{item.title}</span>
                      </div>
                    );
                  }
                  return (
                    <Link
                      key={item.href}
                      href={item.href!}
                      onClick={onClose}
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 font-semibold'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
                      }`}
                    >
                      <span className="truncate">{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Bottom User Area */}
      <div className="border-t border-gray-200 dark:border-gray-800 p-3">
        <Link
          href="/login"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
        >
          <span>Account &amp; Access</span>
          <span className="text-gray-400">Sign in &rarr;</span>
        </Link>
      </div>
    </aside>
  );
}
