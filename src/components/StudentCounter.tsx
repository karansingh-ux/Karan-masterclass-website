'use client';

import React, { useEffect, useState } from 'react';

export default function StudentCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/customers-count')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.count === 'number') {
          setCount(data.count);
        } else {
          setCount(2820);
        }
      })
      .catch(() => setCount(2820));
  }, []);

  if (count === null) {
    return (
      <span className="inline-block h-[18px] w-[46px] translate-y-1 animate-pulse rounded-sm bg-gray-300 dark:bg-gray-700" />
    );
  }

  return <span>{count.toLocaleString('en-US')}</span>;
}
