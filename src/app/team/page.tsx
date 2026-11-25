'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CountdownTimer from '../../components/CountdownTimer';

const COURSE_PRICE_USD = 299;

function formatCurrency(cents: number) {
  const dollars = cents / 100;
  return `$${dollars.toLocaleString('en-US', {
    minimumFractionDigits: Number.isInteger(dollars) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

export default function TeamPage() {
  const [seats, setSeats] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);

  const discountPercentage =
    seats >= 15 ? 20 : seats >= 10 ? 15 : seats >= 5 ? 10 : 0;

  const pricePerSeatCents = Math.round(
    COURSE_PRICE_USD * (1 - discountPercentage / 100) * 100
  );
  const totalCents = pricePerSeatCents * seats;
  const fullTotalCents = 100 * COURSE_PRICE_USD * seats;

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/team-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seats }),
      });
      const data = await res.json();
      if (data.success && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert(data.error || 'Failed to create checkout');
        setLoading(false);
      }
    } catch (e) {
      alert('Something went wrong. Please try again.');
      setLoading(false);
    }
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
        <div className="mb-24">
          <div
            className="buy-card relative mx-auto mt-40 w-full max-w-[620px] rounded-[40px] bg-[#F7F7F7] p-2 md:mt-48 dark:bg-[#212121]"
            id="registration"
          >
            <div className="rounded-[32px] bg-gray-100 px-0 pt-[72px] pb-0">
              <div className="absolute top-0 left-1/2 w-[130px] -translate-x-1/2 -translate-y-1/2 border-4 border-gray-100 bg-gray-100 rounded-full overflow-hidden">
                <Image
                  src="/aiforui.png"
                  alt="Emil"
                  width={144}
                  height={144}
                  className="w-full h-auto"
                />
              </div>

              <div className="px-6 text-center md:px-10">
                <h1
                  className="text-[24px] font-[575] md:text-[28px] text-foreground-100"
                  style={{ letterSpacing: '-1.12px', lineHeight: 1.2 }}
                >
                  Team Licenses
                </h1>
                <p className="mx-auto mt-4 mb-10 w-full max-w-[400px] text-foreground-200 text-sm md:text-base text-balance">
                  Purchase multiple licenses to level up your whole team. Every member gets full access to AI for Designers and Engineers.
                </p>
              </div>

              <div className="flex flex-col justify-between gap-6 border-t border-dashed border-gray-400 p-6 md:flex-row md:items-center md:px-[72px] md:py-8">
                <span className="text-xl font-medium text-foreground-100">
                  Number of Licenses
                </span>
                <div className="flex items-center">
                  <button
                    onClick={() => setSeats((prev) => Math.max(prev - 1, 3))}
                    className="page-module__Updljq__decrementButton grid h-12 w-12 place-items-center cursor-pointer text-gray-800 dark:text-gray-200"
                    aria-label="Decrease seats"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.5 8C14.5 8.55229 14.0523 9 13.5 9L2.5 9C1.94771 9 1.5 8.55228 1.5 8C1.5 7.44772 1.94771 7 2.5 7L13.5 7C14.0523 7 14.5 7.44772 14.5 8Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                  <input
                    className="page-module__Updljq__input flex h-12 w-16 appearance-none items-center justify-center text-center text-xl font-semibold bg-white dark:bg-gray-100 text-foreground-100 border-y border-gray-300 dark:border-gray-500"
                    type="number"
                    min={3}
                    max={9999}
                    value={seats}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      isNaN(val) ? setSeats(3) : setSeats(Math.max(3, Math.min(val, 9999)));
                    }}
                  />
                  <button
                    onClick={() => setSeats((prev) => Math.min(prev + 1, 9999))}
                    className="page-module__Updljq__incrementButton grid h-12 w-12 place-items-center cursor-pointer text-gray-800 dark:text-gray-200"
                    aria-label="Increase seats"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7 13.5C7 14.0523 7.44772 14.5 8 14.5C8.55228 14.5 9 14.0523 9 13.5L9 9H13.5C14.0523 9 14.5 8.55228 14.5 8C14.5 7.44772 14.0523 7 13.5 7H9L9 2.5C9 1.94771 8.55229 1.5 8 1.5C7.44772 1.5 7 1.94771 7 2.5L7 7H2.5C1.94771 7 1.5 7.44771 1.5 8C1.5 8.55228 1.94771 9 2.5 9H7L7 13.5Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex justify-between border-t border-dashed border-gray-400 px-6 pt-6 pb-2 md:px-[72px] md:py-8">
                <div className="align-start flex flex-col gap-2">
                  <span className="text-xl font-medium text-foreground-100">Total</span>
                  {discountPercentage > 0 ? (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-1100 text-sm">Team Discount</span>
                      <span
                        className="h-[22px] rounded-full bg-[#0082FB] px-1.5 text-[13px] font-medium text-white"
                        style={{ lineHeight: '170%' }}
                      >
                        {discountPercentage}%
                      </span>
                    </div>
                  ) : (
                    <div className="h-[22px]" />
                  )}
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className="text-xl font-medium text-foreground-100">
                    {formatCurrency(totalCents)}
                  </span>
                  {discountPercentage > 0 && (
                    <span className="text-sm text-gray-900 line-through">
                      {formatCurrency(fullTotalCents)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 pb-5 md:p-6 text-center">
              <span className="text-gray-1100 mt-2 mb-4 flex flex-col items-center justify-center text-center text-sm md:mb-6 md:flex-row md:gap-1 md:text-base">
                Enrollment closes in
              </span>
              <CountdownTimer />

              <div className="mt-6">
                <button
                  className="buy-button w-full flex items-center justify-center py-3.5 rounded-full cursor-pointer disabled:cursor-not-allowed"
                  onClick={handleCheckout}
                  disabled={loading}
                >
                  <span className="text-white font-medium text-base">
                    {loading ? 'Processing...' : `Purchase ${seats} licenses`}
                  </span>
                </button>
                <span className="text-gray-1000 mt-3 block text-center text-xs">
                  After purchase you’ll get a code your team redeems at checkout.
                </span>
              </div>
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
