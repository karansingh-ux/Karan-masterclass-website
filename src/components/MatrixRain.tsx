'use client';

import React, { useEffect, useRef } from 'react';

const CHARS = 'AISDPEL01<>=+*-#$';
const MASK_STYLE =
  'linear-gradient(to bottom, black 50%, transparent 96%), linear-gradient(to right, transparent, black 18%, black 82%, transparent)';

function getRandomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

interface Column {
  chars: string[];
  alphas: number[];
  floors: number[];
  glows: number[];
  head: number;
  speed: number;
  maxRow: number;
  brightness: number;
}

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = 1200 * dpr;
    canvas.height = 620 * dpr;
    ctx.scale(dpr, dpr);

    const { fontFamily } = getComputedStyle(canvas);
    ctx.font = `12px ${fontFamily}`;
    const colWidth = 1.7 * ctx.measureText('0').width;
    const numCols = Math.ceil(1200 / colWidth);
    const numRows = Math.ceil(40);

    const resetColumn = (col: Column, initial = false) => {
      col.head = initial
        ? Math.random() * numRows * 2
        : -Math.random() * numRows * 1.5;
      col.speed = 0.25 + 0.75 * Math.random();
      if (initial || 0.2 > Math.random()) {
        col.maxRow = Math.floor(numRows * (0.35 + 0.65 * Math.random()));
        col.brightness = 0.5 + 0.5 * Math.random();
      }
    };

    const columns: Column[] = Array.from({ length: numCols }, () => {
      const col: Column = {
        chars: Array.from({ length: numRows }, getRandomChar),
        alphas: Array.from({ length: numRows }, () => 0),
        floors: Array.from({ length: numRows }, () => 0.04 + 0.08 * Math.random()),
        glows: Array.from({ length: numRows }, () => 0),
        head: 0,
        speed: 1,
        maxRow: numRows,
        brightness: 1,
      };
      resetColumn(col, true);
      return col;
    });

    const step = () => {
      for (const col of columns) {
        col.head += col.speed;
        const currentHead = Math.floor(col.head);
        for (let row = 0; row <= col.maxRow; row++) {
          if (col.alphas[row] > 0) {
            col.alphas[row] = Math.max(0.94 * col.alphas[row], col.floors[row]);
          }
        }
        if (currentHead >= 0 && currentHead <= col.maxRow && currentHead < numRows) {
          col.alphas[currentHead] = 0.8;
        }
        for (let row = 0; row < numRows; row++) {
          if (col.glows[row] > 0) {
            col.glows[row] = col.glows[row] < 0.03 ? 0 : 0.82 * col.glows[row];
          }
        }
        if (0.4 > Math.random()) {
          col.chars[Math.floor(Math.random() * numRows)] = getRandomChar();
        }
        if (currentHead > col.maxRow + 4) {
          resetColumn(col);
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, 1200, 620);
      ctx.font = `12px ${fontFamily}`;
      ctx.textBaseline = 'top';

      const style = getComputedStyle(canvas);
      const defaultColor = style.color || '#3b82f6';
      const glowColor =
        style.getPropertyValue('--color-blue-900').trim() || defaultColor;
      let activeColor = defaultColor;
      ctx.fillStyle = defaultColor;

      for (let colIdx = 0; colIdx < numCols; colIdx++) {
        const col = columns[colIdx];
        for (let rowIdx = 0; rowIdx < numRows; rowIdx++) {
          const alpha = col.alphas[rowIdx] * col.brightness;
          const glow = col.glows[rowIdx];
          const combined = Math.max(alpha, glow);
          if (combined < 0.02) continue;

          const color = glow > alpha ? glowColor : defaultColor;
          if (color !== activeColor) {
            ctx.fillStyle = color;
            activeColor = color;
          }
          ctx.globalAlpha = combined;
          ctx.fillText(col.chars[rowIdx], colIdx * colWidth, 16 * rowIdx);
        }
      }
      ctx.globalAlpha = 1;
    };

    for (let i = 0; i < 4 * numRows; i++) step();
    draw();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.fonts.ready.then(draw);
      return;
    }

    let animId = 0;
    let lastTime = 0;
    let isIntersecting = true;

    const loop = (time: number) => {
      animId = requestAnimationFrame(loop);
      if (time - lastTime < 90) return;
      lastTime = time;
      step();
      draw();
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isIntersecting) {
        animId = requestAnimationFrame(loop);
      }
      if (!entry.isIntersecting) {
        cancelAnimationFrame(animId);
      }
      isIntersecting = entry.isIntersecting;
    });

    let scheduled = false;
    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < -44 || x > 1244 || y < -44 || y > 444) return;

      const minCol = Math.max(0, Math.floor((x - 44) / colWidth));
      const maxCol = Math.min(numCols - 1, Math.ceil((x + 44) / colWidth));
      const minRow = Math.max(0, Math.floor((y - 44) / 16));
      const maxRow = Math.min(numRows - 1, Math.ceil((y + 44) / 16));

      for (let c = minCol; c <= maxCol; c++) {
        for (let r = minRow; r <= maxRow; r++) {
          const dist = Math.hypot(c * colWidth + colWidth / 2 - x, 16 * r + 8 - y);
          if (dist > 44) continue;
          const power = 0.95 * Math.pow(1 - dist / 44, 1.5);
          columns[c].glows[r] = Math.max(columns[c].glows[r], power);
        }
      }

      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(() => {
          scheduled = false;
          draw();
        });
      }
    };

    observer.observe(canvas);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex h-[620px] justify-center overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="text-blue-800 h-[620px] w-[1200px] shrink-0 font-mono opacity-60 dark:opacity-50"
        style={{
          maskImage: MASK_STYLE,
          maskComposite: 'intersect',
          WebkitMaskImage: MASK_STYLE,
          WebkitMaskComposite: 'source-in',
        }}
      />
    </div>
  );
}
