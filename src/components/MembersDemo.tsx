'use client';

import React, { useState } from 'react';

const RANDOM_NAMES: [string, string][] = [
  ['Grace Lin', 'Data'],
  ['Felix Moreau', 'Design'],
  ['Ines Costa', 'Support'],
  ['Jonas Vogel', 'Engineering'],
  ['Maya Sørensen', 'Product'],
  ['Ravi Kapoor', 'Sales'],
];

const DATASETS = [
  {
    label: 'Demo data',
    members: [
      { name: 'Sarah Chen', role: 'Design', status: 'Active', initials: 'SC', muted: false },
      { name: 'Marco Ruiz', role: 'Engineering', status: 'Active', initials: 'MR', muted: false },
      { name: 'Ada Owens', role: 'Product', status: 'Active', initials: 'AO', muted: false },
      { name: 'Tom Weber', role: 'Marketing', status: 'Invited', initials: 'TW', muted: true },
      { name: 'Lena Park', role: 'Design', status: 'Active', initials: 'LP', muted: false },
    ],
    total: '5 members',
    footer: 'Showing all 5',
  },
  {
    label: 'Worst case',
    members: [
      {
        name: 'Aleksandra Wiśniewska-Kowalczyk',
        role: 'Senior Product Design Engineer, Platform Infrastructure',
        status: 'Active',
        initials: 'AW',
        muted: false,
      },
      {
        name: 'bartholomew.fitzgerald@northwind-industries-holdings.example.com',
        role: 'Contractor',
        status: 'Invited',
        initials: 'BF',
        muted: true,
      },
      {
        name: 'Jo',
        role: '—',
        status: 'Invitation expired 12 days ago',
        initials: 'J',
        muted: true,
      },
      {
        name: 'Christopher Alexander Montgomery III',
        role: 'Head of Design Systems & Accessibility',
        status: 'Active',
        initials: 'CM',
        muted: false,
      },
      ...Array.from({ length: 16 }, (_, i) => {
        const [r, n] = RANDOM_NAMES[i % RANDOM_NAMES.length];
        return {
          name: r,
          role: n,
          status: i % 7 === 3 ? 'Invited' : 'Active',
          initials: r
            .split(' ')
            .map((e) => e[0])
            .join(''),
          muted: i % 7 === 3,
        };
      }),
    ],
    total: '1,284 members',
    footer: 'Showing 20 of 1,284',
  },
];

export default function MembersDemo() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const data = DATASETS[selectedIdx];

  return (
    <div className="relative my-8 rounded-2xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#161616] p-4 sm:p-6 overflow-hidden">
      <div className="mx-auto max-w-[440px] flex flex-col overflow-hidden rounded-2xl bg-white shadow-md dark:bg-gray-200 border border-gray-200 dark:border-gray-700">
        {/* Table Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-300 dark:border-gray-600 px-4 h-14">
          <div className="flex items-baseline gap-2">
            <h3 className="text-gray-1200 dark:text-white m-0 text-[15px] font-medium">
              Members
            </h3>
            <span className="text-gray-1000 dark:text-gray-400 text-[13px]">
              {data.total}
            </span>
          </div>
          <button
            className="shadow-border text-gray-1100 dark:text-gray-200 flex h-7 items-center rounded-full bg-white dark:bg-gray-100 px-3 text-[13px] font-medium transition-transform duration-150 active:scale-[0.97]"
            tabIndex={-1}
            type="button"
          >
            Invite
          </button>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-gray-200 dark:divide-gray-600 max-h-[300px] overflow-y-auto">
          {data.members.map((member, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-3 gap-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="grid size-8 shrink-0 place-items-center rounded-full bg-gray-200 dark:bg-gray-600 text-xs font-semibold text-gray-800 dark:text-gray-200">
                  {member.initials}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium text-gray-1200 dark:text-white truncate">
                    {member.name}
                  </span>
                  <span className="text-xs text-gray-1000 dark:text-gray-400 truncate">
                    {member.role}
                  </span>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    member.muted
                      ? 'text-gray-900 bg-gray-100 dark:bg-white/10 dark:text-gray-400'
                      : 'text-green-700 bg-green-50 dark:bg-green-950/40 dark:text-green-400'
                  }`}
                >
                  {member.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Table Footer */}
        <div className="text-gray-1000 dark:text-gray-400 flex shrink-0 items-center justify-between border-t border-gray-300 dark:border-gray-600 px-4 h-10 text-[12px]">
          <span>{data.footer}</span>
          <span>Updated just now</span>
        </div>
      </div>

      {/* Switcher Pill */}
      <div className="mt-6 flex justify-center">
        <div
          aria-label="Which content the table is holding"
          className="relative flex w-[268px] items-center rounded-full bg-black/5 dark:bg-black/40 p-1 text-[13px] backdrop-blur-md select-none border border-black/5 dark:border-white/10"
          role="radiogroup"
        >
          <span
            aria-hidden="true"
            className={`absolute top-1 left-1 h-7 w-[calc(50%-4px)] rounded-full bg-white dark:bg-white/20 shadow-sm transition-transform duration-200 ease-out ${
              selectedIdx === 1 ? 'translate-x-[calc(100%+8px)]' : 'translate-x-0'
            }`}
          />
          <button
            aria-checked={selectedIdx === 0}
            onClick={() => setSelectedIdx(0)}
            className={`relative flex h-7 flex-1 cursor-pointer items-center justify-center rounded-full px-3 whitespace-nowrap transition-colors duration-150 outline-none ${
              selectedIdx === 0
                ? 'text-gray-1200 dark:text-white font-medium'
                : 'text-gray-1000 dark:text-white/60 hover:text-gray-1200'
            }`}
            role="radio"
            type="button"
          >
            Demo data
          </button>
          <button
            aria-checked={selectedIdx === 1}
            onClick={() => setSelectedIdx(1)}
            className={`relative flex h-7 flex-1 cursor-pointer items-center justify-center rounded-full px-3 whitespace-nowrap transition-colors duration-150 outline-none ${
              selectedIdx === 1
                ? 'text-gray-1200 dark:text-white font-medium'
                : 'text-gray-1000 dark:text-white/60 hover:text-gray-1200'
            }`}
            role="radio"
            type="button"
          >
            Worst case
          </button>
        </div>
      </div>
    </div>
  );
}
