'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CourseSidebar from '../../../../../components/CourseSidebar';

export default function AiForCreativeWorkPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [readingMode, setReadingMode] = useState<'quiet' | 'focus' | 'ledger'>('quiet');
  const [copied, setCopied] = useState(false);

  const handleCopyPage = () => {
    fetch('/learn-md/workflows/build-a-tool-to-build-the-tool/ai-for-creative-work')
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
              <span>Workflows</span>
              <span>/</span>
              <span>Build a tool to build the tool</span>
              <span>/</span>
              <span className="text-gray-900 dark:text-white font-medium">AI for creative work</span>
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

            <Link
              href="/learn/prototyping-interfaces"
              className="flex h-8 items-center rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Back
            </Link>
            <Link
              href="/login"
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
              AI for creative work
            </h1>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              When you get into more creative work, you will notice that getting what you want from AI becomes increasingly difficult, because the work itself becomes more creative and your agent can’t fall back on known patterns.
            </p>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              Creative work, by its very nature, <em>has</em> to produce something new, but AI is built on large datasets, so it learns from what already happened.
            </p>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              This means that we need to get more creative with our tools.
            </p>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              An initial period of thinking deeply about a design problem, sketching it out on paper, helps a lot, and that’s where you should start. But we should also be moving with the times and use the tools to our advantage.
            </p>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              After all, code doesn’t just make design more efficient, it expands what a design can be.
            </p>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              With that in mind, we can build tools to help us build other, more creative things.
            </p>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              We can define an idea by a set of rules and expand from there, creating an endless array of variations, tweaking it to our liking with knobs and dials, and end up with something fresh, something unique.
            </p>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              Such a workflow would’ve taken us ages in the pre-AI era.
            </p>

            <h2 className="text-foreground-100 mt-12 mb-4 text-[22px] font-medium tracking-tight">
              How it works
            </h2>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              Let’s say I’m looking for a visual for a new blog post on depth. Something abstract, eye-catching, but still related to the topic: contour lines, the way a map shows elevation.
            </p>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              I can roughly describe the idea of it, but I can’t precisely describe the image I actually want, because I won’t know it until I see it. So I don’t try to one-shot it, I ask my agent to build me a <em>tool</em> that creates images like that.
            </p>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              This gives me exactly what I wanted. An easy and quick way to generate lots of variations of the image. Once I find something I like, I can tweak it further with the panel, or I can copy the settings and use them in my actual post.
            </p>

            <h2 className="text-foreground-100 mt-12 mb-4 text-[22px] font-medium tracking-tight">
              Going further
            </h2>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              The same workflow holds when the thing you’re after is bigger than a background image. Say I want a series of posters, each a bit different, but all related to the same theme. Again, I can roughly describe what I want and the coding agent can then build a tool in which I can click through the variations.
            </p>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              Every click creates a slightly different pattern, positioning, or color, or all three. Once I find a composition I like, I can simply press the save button below the posters and use those settings in my actual project, or even ask the LLM to copy these as images.
            </p>

            {/* Poster Gallery Grid */}
            <div className="my-8 grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-black/5 dark:bg-black/40">
                <Image
                  src="/lessons/build-a-tool-to-build-the-tool/aiforui-poster-1.png"
                  alt="A poster reading “AI for UI, done well”: combed ridges of paint catching blue light in three glowing arcs on a near-black sheet"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-black/5 dark:bg-black/40">
                <Image
                  src="/lessons/build-a-tool-to-build-the-tool/aiforui-poster-2.png"
                  alt="A poster reading “AI for UI, done well”: a glowing blue doorway set into a wall of thin neon lines that spill across the floor"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-black/5 dark:bg-black/40">
                <Image
                  src="/lessons/build-a-tool-to-build-the-tool/aiforui-poster-3.png"
                  alt="A poster reading “AI for UI, done well”: a mosaic of small square tiles lit blue in a winding vertical band"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-black/5 dark:bg-black/40">
                <Image
                  src="/lessons/build-a-tool-to-build-the-tool/aiforui-poster-4.png"
                  alt="A poster reading “AI for UI, done well”: a lone figure silhouetted before a floor-to-ceiling slit of blue light"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              To get more specific about the models, the posters above were made using Fable 5. I mainly use Anthropic’s models, but for image generation, I like to use the Codex app. Here are some riffs on some posters for aiforui:
            </p>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              I like to run this type of workflow even when I’m not looking to achieve something specific. It often produces some happy accidents, interesting patterns, satisfying interactions. It can simply serve as a creative playground and a source of inspiration for some more serious work later on.
            </p>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              The goal for me is to have an agent running at all times. Doing research, building tools, or helping me build the things I want to build. It’s honestly pretty hard to stick to this rule, so whenever I have nothing better to give to an agent, I just ask it to build stuff like above in search of inspiration.
            </p>

            <h2 className="text-foreground-100 mt-12 mb-4 text-[22px] font-medium tracking-tight">
              You can also use it for research
            </h2>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              The interactive poster’s prompt above is pretty specific: warm paper, near-black ink instead of black, one accent color, a field of Truchet tiles. To be very honest, I didn’t know what I wanted when I started. I could see the rough vibe I was going for in my head, but that was about it.
            </p>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              So before asking the LLM to build what it did before, I first described the rough idea I was going for, fuzzy as it was:
            </p>

            <div className="my-6 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#141414] p-4 text-sm font-mono leading-relaxed">
              &gt; Research the visual language of screen-printed posters. What does the process do to the paper, the inks, and the number of colors on a sheet? And the geometric patterns that keep showing up in that tradition — name them for me. Give me the findings in a markdown document I can pass to a second agent.
            </div>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              Then, using the answer I got from the first prompt, I asked it to research the visual language of that vibe.
            </p>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              With the research in hand, I asked it to build a prompt that would generate the posters based on the research.
            </p>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              This isn’t cheap though. Using Opus 5.0 I ran it as three agents in parallel, and between them they burned through almost half a million tokens:
            </p>

            {/* Token Table */}
            <div className="my-6 overflow-x-auto rounded-xl border border-gray-300 dark:border-gray-700 bg-black/5 dark:bg-black/30 p-4 font-mono text-xs">
              <pre className="m-0 text-gray-800 dark:text-gray-300">
{`+ - - - - - - - - [ WHAT THE RESEARCH COST ]  - - - - - - - - +
|                                                             |
|   Agent                    Tokens     Tool calls     Time   |
| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - |
|   Research lead           184,200             24     3m 12s |
|   Visual history          142,800             18     2m 45s |
|   Pattern catalog         126,400             15     2m 08s |
| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - |
|   Total                   453,400             57     8m 05s |
+ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +`}
              </pre>
            </div>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              But that research became the foundation for my prompt. If I had skipped this part, I would probably have gotten a result that doesn’t really match the blurry vibe I had in my head when I was starting out. So it’s worth paying the cost if the task is important enough.
            </p>

            <h2 className="text-foreground-100 mt-12 mb-4 text-[22px] font-medium tracking-tight">
              Making it repeatable
            </h2>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              To summarize this lesson, the creative workflow described here looks like this:
            </p>

            <ul className="marketing-list mb-6 ml-4 list-disc space-y-2">
              <li className="paragraph paragraph-large">
                You state the rough idea you’re after. Colors, shapes, textures, materials, etc. You can also provide reference images if that’s easier.
              </li>
              <li className="paragraph paragraph-large">
                The skill researches the visual language behind it. What tradition does the vibe come from, what process created that look, what are the recurring patterns called?
              </li>
              <li className="paragraph paragraph-large">
                Then it turns the rules into a generator which creates variations. You can create a new variation by clicking on the canvas or tweak an existing one with the customization panel.
              </li>
              <li className="paragraph paragraph-large">
                Once you like a direction, you can save the exact configuration in your project.
              </li>
            </ul>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              You could describe all of this in a prompt every time, but as always, I’m trying to make your life easier, so I’ve packaged it into the <code className="bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm">/emil-get-creative</code> skill:
            </p>

            <div className="my-6 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#141414] p-4 text-sm font-mono">
              <code>npx @aiforui/install emil-get-creative --token=…</code>
            </div>

            <p className="paragraph paragraph-large mb-6 leading-relaxed">
              Here’s an example prompt to give you an idea, but it could be anything really. The beauty of skills is that they are really flexible and adapt quickly.
            </p>
          </article>

          {/* Bottom Bar */}
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
                href="/learn/prototyping-interfaces"
                className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                &larr; Prototyping interfaces
              </Link>
              <Link
                href="/login"
                className="buy-button flex items-center gap-1.5 text-sm text-white px-4 py-2 rounded-full"
              >
                Log in for full course &rarr;
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
