'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const LETTER_TEXT = `Hi [name],

Our team already uses AI to build interfaces. It’s made us faster, but the output has a recognizable look: spacing that’s slightly off, animations that feel cheap, components that look like a template. It makes mistakes that we are all aware of.

We either spend time fixing it by hand or ship it as is.

This will keep being a problem unless someone shows it what good looks like. Right now each of us is working that out alone, it takes a lot of time and effort, and the results are mixed.

I’d like to take AI for Designers and Engineers, a self-paced course by Emil Kowalski that teaches how to build great interfaces with AI without lowering the quality bar.

What the course covers
- How to encode taste, ours or our design system’s, into rules and skills, so the agent’s first attempt looks like our work instead of a template.
- Workflows for building real interfaces with AI, from a prototype to a polished component.
- Which parts of UI work AI is genuinely good at, and where it reliably lets you down.
- How to review, test, and refine AI output before it reaches users.

Why it matters for our team
- Less time spent cleaning up AI-generated UI.
- One shared setup, instead of everyone prompting their own way.
- Our design standards written down in a form agents actually follow.
- It offers 28 agent skills that can help us build better interfaces faster.

About the instructor
Emil is a design engineer at Linear and previously worked on the design team at Vercel. He created Sonner and Vaul, two open source React libraries downloaded over 80 million times per week.

His previous course, animations.dev, has been taken by over 13,000 designers and engineers from companies like OpenAI, Anthropic, Apple, and Stripe.

What it costs
It’s a one-time payment of $299 per seat, with lifetime access. Teams of five or more get up to 20% off, there’s a money-back guarantee at any time, and an invoice is available after purchase. Enrollment closes on October 30.

Course: https://aiforui.dev
Team licenses: https://aiforui.dev/team

Happy to talk it through if you have questions.

Thanks,
[your name]`;

export default function BossPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(LETTER_TEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Top Floating Action Button */}
      <div className="fixed top-4 right-4 z-50 flex items-baseline gap-4 md:top-6 md:right-6 md:flex">
        <a
          data-button="true"
          className="buy-button buy-button-small hidden! md:flex!"
          href="https://buy.polar.sh/polar_cl_WjojARrFH6Q6aicLCwGmMLFXDLa7yWAy0KPwn3pClmY"
        >
          <span style={{ fontSize: '14px' }}>Enroll Now</span>
        </a>
        <a
          data-button="true"
          className="buy-button buy-button-small md:hidden!"
          href="https://buy.polar.sh/polar_cl_WjojARrFH6Q6aicLCwGmMLFXDLa7yWAy0KPwn3pClmY"
          style={{ opacity: 0 }}
        >
          <span style={{ fontSize: '14px' }}>Enroll Now</span>
        </a>
      </div>

      <div className="layout-root text-gray-1200 mx-auto mt-6! mb-8 w-full max-w-[732px] px-4 sm:mt-32 md:mt-20 md:mb-12">
        <div>
          <h1 className="serif_f39bb8fe-module__tQKfsG__variable text-foreground-100 mx-auto mt-[120px] text-center font-serif text-[44px] leading-[48px] font-normal text-balance md:mt-[200px] md:text-[56px] md:leading-[60px]">
            A letter to your boss
          </h1>

          <div className="mx-auto mt-16 w-full max-w-[620px] rounded-[40px] bg-[#F7F7F7] p-2 dark:bg-[#212121]">
            <div className="flex items-center justify-between py-2 pr-2 pl-6">
              <span className="text-gray-1000 text-sm">Email to your manager</span>
              <button
                onClick={handleCopy}
                className="text-gray-1200 flex h-9 items-center gap-1.5 rounded-full border border-gray-300 bg-gray-100 pr-3.5 pl-3 text-sm font-medium transition-[background-color,border-color] hover:bg-gray-200 dark:border-gray-400 dark:bg-gray-200 dark:hover:bg-gray-300 cursor-pointer"
                tabIndex={0}
              >
                <span className="relative size-4">
                  <span className="absolute inset-0 [&>svg]:block [&>svg]:size-full">
                    {copied ? (
                      <svg fill="none" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="#33C664" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M9 9V5.25C9 4.00736 10.0074 3 11.25 3H18.75C19.9926 3 21 4.00736 21 5.25V12.75C21 13.9926 19.9926 15 18.75 15H15M12.75 9H5.25C4.00736 9 3 10.0074 3 11.25V18.75C3 19.9926 4.00736 21 5.25 21H12.75C13.9926 21 15 19.9926 15 18.75V11.25C15 10.0074 13.9926 9 12.75 9Z"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          transform="rotate(270 12 12)"
                        />
                      </svg>
                    )}
                  </span>
                </span>
                {copied ? 'Copied' : 'Copy letter'}
              </button>
            </div>

            <div className="rounded-[32px] bg-gray-100 p-6 md:p-10 text-gray-1200 dark:text-gray-200">
              <p className="paragraph-small mb-5 whitespace-pre-line last:mb-0">
                Hi [name],
              </p>
              <p className="paragraph-small mb-5 whitespace-pre-line last:mb-0">
                Our team already uses AI to build interfaces. It’s made us faster, but the output has a recognizable look: spacing that’s slightly off, animations that feel cheap, components that look like a template. It makes mistakes that we are all aware of.
              </p>
              <p className="paragraph-small mb-5 whitespace-pre-line last:mb-0">
                We either spend time fixing it by hand or ship it as is.
              </p>
              <p className="paragraph-small mb-5 whitespace-pre-line last:mb-0">
                This will keep being a problem unless someone shows it what good looks like. Right now each of us is working that out alone, it takes a lot of time and effort, and the results are mixed.
              </p>
              <p className="paragraph-small mb-5 whitespace-pre-line last:mb-0">
                I’d like to take AI for Designers and Engineers, a self-paced course by Emil Kowalski that teaches how to build great interfaces with AI without lowering the quality bar.
              </p>

              <h2 className="text-foreground-100 mt-8 mb-3 text-[17px] font-[575]">
                What the course covers
              </h2>
              <ul className="mb-5 ml-4 list-disc space-y-2">
                <li className="paragraph-small">
                  How to encode taste, ours or our design system’s, into rules and skills, so the agent’s first attempt looks like our work instead of a template.
                </li>
                <li className="paragraph-small">
                  Workflows for building real interfaces with AI, from a prototype to a polished component.
                </li>
                <li className="paragraph-small">
                  Which parts of UI work AI is genuinely good at, and where it reliably lets you down.
                </li>
                <li className="paragraph-small">
                  How to review, test, and refine AI output before it reaches users.
                </li>
              </ul>

              <h2 className="text-foreground-100 mt-8 mb-3 text-[17px] font-[575]">
                Why it matters for our team
              </h2>
              <ul className="mb-5 ml-4 list-disc space-y-2">
                <li className="paragraph-small">
                  Less time spent cleaning up AI-generated UI.
                </li>
                <li className="paragraph-small">
                  One shared setup, instead of everyone prompting their own way.
                </li>
                <li className="paragraph-small">
                  Our design standards written down in a form agents actually follow.
                </li>
                <li className="paragraph-small">
                  It offers 28 agent skills that can help us build better interfaces faster.
                </li>
              </ul>

              <h2 className="text-foreground-100 mt-8 mb-3 text-[17px] font-[575]">
                About the instructor
              </h2>
              <p className="paragraph-small mb-5 whitespace-pre-line last:mb-0">
                Emil is a design engineer at Linear and previously worked on the design team at Vercel. He created Sonner and Vaul, two open source React libraries downloaded over 80 million times per week.
              </p>
              <p className="paragraph-small mb-5 whitespace-pre-line last:mb-0">
                His previous course, animations.dev, has been taken by over 13,000 designers and engineers from companies like OpenAI, Anthropic, Apple, and Stripe.
              </p>

              <h2 className="text-foreground-100 mt-8 mb-3 text-[17px] font-[575]">
                What it costs
              </h2>
              <p className="paragraph-small mb-5 whitespace-pre-line last:mb-0">
                It’s a one-time payment of $299 per seat, with lifetime access. Teams of five or more get up to 20% off, there’s a money-back guarantee at any time, and an invoice is available after purchase. Enrollment closes on October 30.
              </p>
              <p className="paragraph-small mb-5 whitespace-pre-line last:mb-0 font-mono text-xs">
                Course: https://aiforui.dev<br />
                Team licenses: https://aiforui.dev/team
              </p>
              <p className="paragraph-small mb-5 whitespace-pre-line last:mb-0">
                Happy to talk it through if you have questions.
              </p>
              <p className="paragraph-small mb-5 whitespace-pre-line last:mb-0">
                Thanks,<br />
                [your name]
              </p>
            </div>
          </div>

          <footer className="mt-64 flex items-center justify-between border-t border-gray-300 dark:border-gray-800 pt-8">
            <p className="flex items-center text-[13px] text-[#C2C2C2] dark:text-[#737373]">
              <strong className="font-medium text-[#989898] dark:text-[#8C8C8C]">aiforui</strong>.dev
            </p>
            <Link
              className="hover:text-gray-1200 text-[13px] font-medium text-[#C2C2C2] no-underline dark:text-[#737373] dark:hover:text-white"
              href="/login"
            >
              Login
            </Link>
          </footer>
        </div>
      </div>
    </>
  );
}
