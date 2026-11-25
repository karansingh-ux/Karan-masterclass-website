'use client';

import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { Drawer } from 'vaul';

export function SonnerDemo() {
  return (
    <button
      onClick={() =>
        toast('Sonner', {
          description: 'An opinionated toast component for React.',
        })
      }
      className="h-[44px] rounded-full bg-white px-6 py-2 font-medium text-black shadow-sm outline-hidden transition-colors hover:bg-gray-200 focus-visible:shadow-focus-ring-button dark:border dark:border-[#1F1F1E] dark:bg-gray-100 dark:text-white dark:shadow-none dark:hover:bg-[#151514] dark:focus-visible:shadow-focus-ring-button cursor-pointer"
      tabIndex={0}
    >
      Render a toast
    </button>
  );
}

export function VaulDrawerDemo() {
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <button
          className="h-[44px] rounded-full bg-white px-6 py-2 font-medium text-black shadow-sm outline-hidden transition-colors hover:bg-gray-200 focus-visible:shadow-focus-ring-button dark:border dark:border-[#1F1F1E] dark:bg-gray-100 dark:text-white dark:shadow-none dark:hover:bg-[#151514] dark:focus-visible:shadow-focus-ring-button cursor-pointer"
          type="button"
          tabIndex={0}
        >
          Open Drawer
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 mt-24 flex flex-col rounded-t-[10px] bg-white dark:bg-gray-200 outline-none">
          <div className="flex-1 rounded-t-[10px] bg-white p-4 dark:bg-gray-200">
            <div className="mx-auto mb-8 h-1.5 w-12 shrink-0 rounded-full bg-gray-300 dark:bg-gray-500" />
            <div className="mx-auto max-w-md">
              <Drawer.Title className="mb-4 font-medium text-gray-1200 dark:text-white text-lg">
                Drawer for React.
              </Drawer.Title>
              <p className="mb-2 text-gray-1100 text-sm leading-relaxed">
                This component can be used as a Dialog replacement on mobile and tablet devices. You can read about why and how it was built{' '}
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:text-gray-1200"
                  href="https://emilkowal.ski/ui/building-a-drawer-component"
                >
                  here
                </a>
                .
              </p>
              <p className="mb-2 text-gray-1100 text-sm leading-relaxed">
                It comes unstyled, has gesture-driven animations, and is made by{' '}
                <a
                  href="https://emilkowal.ski/"
                  className="underline hover:text-gray-1200"
                  target="_blank"
                  rel="noreferrer"
                >
                  Emil Kowalski
                </a>
                .
              </p>
              <p className="mb-8 text-gray-1100 text-sm leading-relaxed">
                It uses{' '}
                <a
                  href="https://www.radix-ui.com/docs/primitives/components/dialog"
                  className="underline hover:text-gray-1200"
                  target="_blank"
                  rel="noreferrer"
                >
                  Radix’s Dialog primitive
                </a>{' '}
                under the hood and is inspired by{' '}
                <a
                  href="https://twitter.com/devongovett/status/1674470185783402496"
                  className="underline hover:text-gray-1200"
                  target="_blank"
                  rel="noreferrer"
                >
                  this tweet
                </a>
                .
              </p>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export function LapseModal() {
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="hover:decoration-gray-900 text-inherit decoration-gray-600 decoration-dotted decoration-[1.5px] underline-offset-[3px] cursor-pointer underline font-[575]"
      >
        Lapse
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          <div className="shadow-modal relative z-10 w-[min(720px,calc(100vw-32px))] rounded-[20px] bg-white p-2 outline-none dark:bg-[#141414] border border-gray-200 dark:border-white/10 animate-in fade-in zoom-in-95 duration-200">
            <div className="relative overflow-hidden rounded-xl bg-black">
              <video
                ref={videoRef}
                src="/lessons/lapse-lessons/lapse-demo.mp4"
                poster="/lessons/lapse-lessons/lapse-demo-poster.jpg"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover object-top rounded-xl cursor-pointer"
                onClick={togglePlay}
              />
            </div>

            <div className="px-3 pt-4 pb-3 flex flex-col">
              <h3 className="text-gray-1200 dark:text-white text-[19px] font-medium tracking-[-0.011em]">
                Lapse
              </h3>
              <p className="text-gray-1100 dark:text-gray-400 mt-1 text-[14px] text-pretty">
                Record an animation, scrub to the frame that feels off, leave a comment, and copy its exact timings and values for your agent.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
              className="focus-visible:shadow-focus-ring-button absolute top-4 right-4 grid size-7 place-items-center rounded-full bg-black/5 dark:bg-white/10 text-black/50 dark:text-white/70 outline-none transition-colors duration-150 hover:bg-black/10 hover:text-black/80 dark:hover:bg-white/20 cursor-pointer"
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 3l8 8M11 3l-8 8"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
