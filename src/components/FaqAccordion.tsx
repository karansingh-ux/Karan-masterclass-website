'use client';

import React, { useState } from 'react';

interface FaqItem {
  id: string;
  q: string;
  category: 'Course' | 'Purchasing' | 'Help';
  answerHtml: React.ReactNode;
}

const FAQ_LIST: FaqItem[] = [
  // Course section
  {
    id: 'designer-not-engineer',
    category: 'Course',
    q: 'I’m a designer, not an engineer. Is this for me?',
    answerHtml: (
      <>
        Yes. Directing AI well matters more than writing code yourself, and that’s exactly what this course teaches. If you can describe what you want and recognize when it’s wrong, this course will help you turn that taste into working software.
      </>
    ),
  },
  {
    id: 'ai-tools',
    category: 'Course',
    q: 'Which AI tools does the course cover?',
    answerHtml: (
      <>
        The workflows are built around Claude Code, but the core of the course, encoding your taste into rules and skills, knowing when to step in, how to review animations and UI details, applies to any model or coding agent (Cursor, Codex, Gemini, etc.).
      </>
    ),
  },
  {
    id: 'outdated',
    category: 'Course',
    q: 'AI is moving fast. Will this be outdated in six months?',
    answerHtml: (
      <>
        Just like with animations.dev, you get free future updates, so when the tools change, the course changes with them. But more importantly, the fundamental skill, steering AI with good taste, doesn’t expire when a new model drops.
      </>
    ),
  },
  {
    id: 'already-use-ai',
    category: 'Course',
    q: 'I already use AI every day. Will I learn anything new?',
    answerHtml: (
      <>
        That’s who this course is for. Most people who use AI daily accept its defaults, and it shows in the output. This course is about closing the gap between what AI gives you out of the box and what a senior designer or engineer would ship.
      </>
    ),
  },
  {
    id: 'animations-dev-first',
    category: 'Course',
    q: 'Do I need to take animations.dev first?',
    answerHtml: (
      <>
        No, this course is fully standalone. animations.dev teaches you how to build great animations with and without AI, it builds up the fundamentals. This course teaches you how to direct AI to build great interfaces, from prototype to production.
      </>
    ),
  },
  {
    id: 'format',
    category: 'Course',
    q: 'What’s the format of the course?',
    answerHtml: (
      <>
        It’s fully self-paced. There are no live sessions or deadlines, so you can go through it at your own pace and finish whenever it fits your schedule.
      </>
    ),
  },
  {
    id: 'early-access',
    category: 'Course',
    q: 'What exactly do I get during early access?',
    answerHtml: (
      <>
        From day one you get the first 20 lessons, Lapse, and a complete set of 28 UI skills you can start using in your work immediately. The remaining lessons will ship as I finish them. You’ll get every lesson and tool I add after today at no extra charge.
      </>
    ),
  },
  // Purchasing section
  {
    id: 'refund',
    category: 'Purchasing',
    q: 'What if I don’t like it?',
    answerHtml: (
      <>
        <span className="paragraph text-foreground-200">
          If you are not happy with the course, whatever the reason is, you can get a refund at any time by sending an email at{' '}
          <a href="mailto:e@emilkowal.ski" className="underline hover:text-foreground-100">
            e@emilkowal.ski
          </a>
          .
        </span>
      </>
    ),
  },
  {
    id: 'pay-again',
    category: 'Purchasing',
    q: 'Will I have to pay again when the full course is out?',
    answerHtml: <>No. You pay once and get all future content at no extra charge.</>,
  },
  {
    id: 'invoice',
    category: 'Purchasing',
    q: 'Can I get an invoice?',
    answerHtml: (
      <>
        Yes! After purchasing you’ll get an email with a link to generate a customized invoice.
      </>
    ),
  },
  {
    id: 'ppp',
    category: 'Purchasing',
    q: 'Do you offer purchasing power parity?',
    answerHtml: (
      <>
        <span className="paragraph text-foreground-200">
          Yes! If you are from a country that qualifies for a discount, you’ll see a banner below the purchase card with the discount already applied.
        </span>
      </>
    ),
  },
  {
    id: 'team-licenses',
    category: 'Purchasing',
    q: 'Can I purchase multiple licenses, for my team or group?',
    answerHtml: (
      <>
        Yes! Head over to the{' '}
        <a href="/team" className="underline hover:text-foreground-100 font-medium">
          team licenses page
        </a>
        . Teams of 5 or more get a discount, and after purchasing you’ll receive a code your team can redeem at checkout.
      </>
    ),
  },
  // Help section
  {
    id: 'help',
    category: 'Help',
    q: 'Can’t find the answer you’re looking for?',
    answerHtml: (
      <>
        Shoot me an email at{' '}
        <a href="mailto:e@emilkowal.ski" className="underline hover:text-foreground-100">
          e@emilkowal.ski
        </a>
        .
      </>
    ),
  },
];

export default function FaqAccordion() {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const categories: Array<'Course' | 'Purchasing' | 'Help'> = [
    'Course',
    'Purchasing',
    'Help',
  ];

  return (
    <div className="mt-20">
      {categories.map((cat) => {
        const items = FAQ_LIST.filter((item) => item.category === cat);
        return (
          <div key={cat} className="mb-12">
            <h3 className="text-foreground-100 text-[18px] font-medium tracking-tight mb-2">
              {cat}
            </h3>
            <div className="divide-y divide-gray-300 dark:divide-gray-400 border-t border-b border-gray-300 dark:border-gray-400">
              {items.map((item) => {
                const isOpen = !!openIds[item.id];
                return (
                  <div key={item.id} className="py-1">
                    <button
                      type="button"
                      onClick={() => toggle(item.id)}
                      className="text-foreground-100 flex min-h-[56px] w-full items-center justify-between py-2 text-left text-[16px] font-medium cursor-pointer"
                    >
                      <span>{item.q}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className={`shrink-0 transition-transform duration-200 text-gray-800 dark:text-gray-300 ${
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
                        <div className="paragraph text-foreground-200 text-[16px] leading-relaxed">
                          {item.answerHtml}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
