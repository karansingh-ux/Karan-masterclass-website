'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface DotConfig {
  dotSize: number;
  spacing: number;
  jitter: number;
  speed: number;
}

const DEFAULT_CONFIG: DotConfig = {
  dotSize: 3,
  spacing: 8,
  jitter: 0.5,
  speed: 1,
};

export default function DitheredLogo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<DotConfig>(DEFAULT_CONFIG);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const isDark = document.documentElement.classList.contains('dark');
    ctx.fillStyle = isDark ? '#ffffff' : '#21201c';

    // Draw dithered logo shape (diagonal lines forming dynamic icon / Linear-like symbol)
    const { dotSize, spacing, jitter } = config;
    const cols = Math.floor(width / spacing);
    const rows = Math.floor(height / spacing);

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const x = c * spacing;
        const y = r * spacing;

        // Check if inside circle / diagonal arc
        const dx = x - centerX;
        const dy = y - centerY;
        const dist = Math.hypot(dx, dy);

        // Linear logo geometric equation approx: angled slash & circle arc
        const inArc = Math.abs(dist - radius * 0.8) < radius * 0.45;
        const inSlash = Math.abs(dx + dy * 0.8) < radius * 0.3 && dist < radius * 1.1;

        if (inArc || inSlash) {
          const jX = (Math.random() - 0.5) * jitter * spacing;
          const jY = (Math.random() - 0.5) * jitter * spacing;
          ctx.beginPath();
          ctx.arc(x + jX, y + jY, dotSize / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }, [config]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = (rect.width || 600) * dpr;
    canvas.height = (rect.height || 320) * dpr;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);

    draw();

    // Re-draw on resize or theme change
    const onResize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = (r.width || 600) * dpr;
      canvas.height = (r.height || 320) * dpr;
      if (ctx) ctx.scale(dpr, dpr);
      draw();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [draw]);

  return (
    <div className="mt-2 mb-12 flex justify-center w-full">
      <div className="flex w-full flex-col items-center">
        <div className="w-full rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#141414] p-4 flex items-center justify-center">
          <canvas
            ref={canvasRef}
            role="img"
            aria-label="The Linear logo, drawn as a grid of dots"
            className="block h-80 w-full rounded-xl transition-opacity duration-700 ease-out"
          />
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          className="focus-visible:shadow-focus-ring-button relative flex shrink-0 items-center justify-center overflow-hidden rounded-full font-medium shadow-sm outline-hidden transition-all select-none active:scale-[0.97] text-gray-1200 bg-white hover:bg-[#fdfdfc] dark:bg-gray-100 dark:hover:bg-gray-200 border border-gray-300 dark:border-gray-600 h-8 gap-1.5 px-4 text-[13px] mt-3 cursor-pointer"
        >
          {isOpen ? 'Hide the controls' : 'Tweak the values'}
        </button>

        {isOpen && (
          <div className="mt-4 w-full max-w-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#181818] p-4 shadow-sm space-y-3 animate-in fade-in duration-150">
            <div>
              <div className="flex justify-between text-xs text-gray-1000 dark:text-gray-400 mb-1">
                <span>Dot Size</span>
                <span className="font-mono">{config.dotSize}px</span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                step="0.5"
                value={config.dotSize}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, dotSize: parseFloat(e.target.value) }))
                }
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-gray-1000 dark:text-gray-400 mb-1">
                <span>Spacing</span>
                <span className="font-mono">{config.spacing}px</span>
              </div>
              <input
                type="range"
                min="4"
                max="16"
                step="1"
                value={config.spacing}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, spacing: parseInt(e.target.value, 10) }))
                }
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-gray-1000 dark:text-gray-400 mb-1">
                <span>Jitter / Noise</span>
                <span className="font-mono">{Math.round(config.jitter * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={config.jitter}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, jitter: parseFloat(e.target.value) }))
                }
                className="w-full accent-blue-600"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
