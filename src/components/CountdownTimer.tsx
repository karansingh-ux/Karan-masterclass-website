'use client';

import React, { useEffect, useState } from 'react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 3, hours: 14, minutes: 22, seconds: 45 });

  useEffect(() => {
    // Target date: end of current promotion or 7 days from load
    const target = new Date();
    target.setDate(target.getDate() + 3);
    target.setHours(23, 59, 59, 0);

    const update = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, target.getTime() - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div
      style={{ fontVariantNumeric: 'tabular-nums' }}
      className="number-flow mt-2 flex items-baseline gap-1 text-sm font-medium text-gray-1200 dark:text-gray-200 md:mt-0 md:text-base justify-center"
    >
      <span>
        <span className="font-semibold">{pad(timeLeft.days)}</span> days
      </span>
      <span>
        <span className="font-semibold">{pad(timeLeft.hours)}</span> hours
      </span>
      <span>
        <span className="font-semibold">{pad(timeLeft.minutes)}</span> minutes
      </span>
      <span>
        <span className="font-semibold">{pad(timeLeft.seconds)}</span> seconds
      </span>
    </div>
  );
}
