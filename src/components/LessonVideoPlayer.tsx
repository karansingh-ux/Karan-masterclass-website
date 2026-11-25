'use client';

import React, { useRef, useState } from 'react';

export default function LessonVideoPlayer({
  src = '/lessons/prototyping-interfaces/linear-dithered.mp4',
  poster,
}: {
  src?: string;
  poster?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
    <div className="group relative my-8 w-full overflow-hidden rounded-xl bg-black/5 dark:bg-black/40 border border-gray-200 dark:border-gray-800">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop
        muted
        playsInline
        preload="auto"
        className="mx-auto block w-full rounded-xl object-cover cursor-pointer"
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Big Play Overlay Button when paused */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          aria-label="Play video"
          className="absolute inset-0 z-30 flex items-center justify-center bg-black/10 dark:bg-black/30 cursor-pointer transition-opacity"
        >
          <span className="grid h-14 w-14 place-items-center rounded-full bg-black/75 text-white transition-transform duration-150 hover:scale-105 hover:bg-black/90 shadow-lg">
            <svg
              fill="none"
              height="20"
              viewBox="0 0 24 24"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
              className="translate-x-0.5"
            >
              <path
                d="M7.65703 2.27884C6.49076 1.57201 5 2.41169 5 3.77543V20.2247C5 21.5884 6.49076 22.4281 7.65703 21.7213L21.2276 13.4966C22.3516 12.8155 22.3516 11.1846 21.2276 10.5035L7.65703 2.27884Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </button>
      )}

      {/* Floating Bottom Controls on Hover */}
      <div className="absolute inset-x-3 bottom-3 z-20 flex h-9 items-center justify-between rounded-lg bg-black/60 px-3 opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
          className="grid h-7 w-7 place-items-center rounded-md text-white hover:bg-white/20 transition-colors cursor-pointer"
        >
          {isPlaying ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M6 4H10V20H6V4ZM14 4H18V20H14V4Z" fill="currentColor" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 3.77543V20.2247L21.2276 11.9999L5 3.77543Z"
                fill="currentColor"
              />
            </svg>
          )}
        </button>

        <span className="text-xs font-medium text-white/80 tabular-nums">
          Linear Interactive Prototype
        </span>
      </div>
    </div>
  );
}
