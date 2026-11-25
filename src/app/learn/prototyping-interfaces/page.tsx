'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CourseSidebar from '../../../components/CourseSidebar';
import LessonVideoPlayer from '../../../components/LessonVideoPlayer';
import MembersDemo from '../../../components/MembersDemo';
import DitheredLogo from '../../../components/DitheredLogo';

export default function PrototypingInterfacesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [readingMode, setReadingMode] = useState<'quiet' | 'focus' | 'ledger'>('quiet');
  const [copied, setCopied] = useState(false);

  const handleCopyPage = () => {
    fetch('/learn-md/prototyping-interfaces')
      .then((res) => res.text())
      .then((text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0c0c0c] text-gray-1200 dark:text-gray-200">
      {/* Sidebar */}
      <CourseSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-[#0c0c0c]/80 backdrop-blur-md px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded-lg text-gray-600 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
              aria-label="Open curriculum"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
              <Link href="/" className="hover:text-gray-900 dark:hover:text-white">Course</Link>
              <span>/</span>
              <span>Lessons</span>
              <span>/</span>
              <span className="text-gray-900 dark:text-white font-medium">Prototyping interfaces</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Reading Mode Pills */}
            <div className="hidden md:flex items-center rounded-full bg-gray-200 dark:bg-white/10 p-0.5 text-xs">
              {(['quiet', 'focus', 'ledger'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setReadingMode(mode)}
                  className={`capitalize px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                    readingMode === mode
                      ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-2xs'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Back & Continue Controls */}
            <Link
              href="/learn/how-to-build-with-aiforui-skills"
              className="flex h-8 items-center rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Back
            </Link>
            <Link
              href="/learn/get-good-at-telling-ai-what-you-want"
              className="buy-button flex h-8 items-center rounded-full px-3.5 text-xs font-medium text-white shadow-2xs"
            >
              Continue
            </Link>
          </div>
        </header>

        {/* Article Body */}
        <main className="mx-auto w-full max-w-[700px] px-4 py-12 md:py-16">
          <article className="prose dark:prose-invert max-w-none">
            <h1 className="text-foreground-100 text-[32px] sm:text-[40px] font-[575] leading-tight tracking-tight mb-8">
              Prototyping interfaces
            </h1>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              Prototyping is an essential part of building a great interface because it allows you to actually touch and feel the interface, see how it feels in different states and scenarios and iterate on it until you find the perfect solution.
            </p>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              That’s why building actual variants of a flow or component is way better than drawing wireframes or mockups. You can experience the thing instead of just imagining how it would feel.
            </p>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              And don’t get me wrong, you should still explore design directions in a design tool, but your goal should be to move to a living interface as soon as possible. That’s where ideas get validated.
            </p>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              You can experience it yourself, what gives you a better idea of whether this UI works or not? A static wireframe, or a live interface?
            </p>

            <LessonVideoPlayer src="/lessons/prototyping-interfaces/linear-dithered.mp4" />

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              Before AI, building out a few different options was often a <em>very</em> time-consuming process. A process that in some cases couldn’t be done to the extent you would want it to be, or maybe even not at all. Code was the expensive medium, wireframing was cheap.
            </p>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              Now, code is cheap. You can ask an agent to build you a prototype with real components, and in ten minutes you have a living piece of UI that you can interact with.
            </p>

            <h2 className="text-foreground-100 mt-12 mb-4 text-[22px] font-medium tracking-tight">
              When should you actually prototype?
            </h2>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              You shouldn’t prototype everything. If you’re adding a button to a form or changing the order of fields on a page, building a prototype is a waste of time. The rules are clear, the interactions are known, you just build the final thing.
            </p>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              Prototypes earn their keep when at least one of these three things is true:
            </p>

            <ul className="marketing-list mb-6 ml-4 list-disc space-y-2">
              <li className="paragraph paragraph-large">
                <strong>You don’t know how an interaction should feel yet.</strong> Gestures, transitions, animations. A mockup can’t tell you if a spring feels right.
              </li>
              <li className="paragraph paragraph-large">
                <strong>The flow has branching states.</strong> Error states, loading sequences, permissions, edge cases. Experiencing the sequence reveals gaps you miss in Figma.
              </li>
              <li className="paragraph paragraph-large">
                <strong>You need buy-in from others.</strong> Showing a working prototype to a stakeholder or teammate gets 10x better feedback than walking through slides.
              </li>
            </ul>

            <h2 className="text-foreground-100 mt-12 mb-4 text-[22px] font-medium tracking-tight">
              Let people tweak the values
            </h2>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              One of the best techniques when prototyping with an agent is having it expose the knobs and dials right on the screen. Instead of going back and forth in chat trying different parameters, render controls for them.
            </p>

            <DitheredLogo />

            <h2 className="text-foreground-100 mt-12 mb-4 text-[22px] font-medium tracking-tight">
              Use your worst content
            </h2>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              The easiest way to fool yourself is testing UI with perfect mock data. Every user has a two-word name, every title fits on one line, every image is a 1:1 square. Real life is ugly.
            </p>

            <MembersDemo />

            <h2 className="text-foreground-100 mt-12 mb-4 text-[22px] font-medium tracking-tight">
              Summary
            </h2>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              AI makes living prototypes almost as fast as static mockups. Use that leverage: get into code early, design with real edge-case content, expose parameters so you can feel what works, and validate interactions before committing them to production.
            </p>
          </article>

          {/* Copy Page & Navigation Footer */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handleCopyPage}
              className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {copied ? 'Copied Markdown!' : 'Copy page'}
            </button>

            <div className="flex items-center gap-3">
              <Link
                href="/learn/how-to-build-with-aiforui-skills"
                className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                &larr; Previous Lesson
              </Link>
              <Link
                href="/learn/workflows/build-a-tool-to-build-the-tool/ai-for-creative-work"
                className="buy-button flex items-center gap-1.5 text-sm text-white px-4 py-2 rounded-full"
              >
                Next Free Lesson &rarr;
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
