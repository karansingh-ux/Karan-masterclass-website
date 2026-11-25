'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      setMessage(`We sent a one-time password to ${email}`);
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage('Signing in...');
      window.location.href = '/learn/prototyping-interfaces';
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 dark:bg-[#0c0c0c]">
      <div className="fixed top-6 left-6">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-gray-1000 hover:text-gray-1200 dark:hover:text-white transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to aiforui.dev
        </Link>
      </div>

      <div className="w-full max-w-[354px] flex flex-col">
        {step === 'email' ? (
          <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-1100 dark:text-gray-400">
                Email
              </label>
              <input
                type="email"
                required
                autoFocus
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#191919] px-3 text-sm text-foreground-100 outline-none focus:border-gray-500 dark:focus:border-gray-500 transition-colors shadow-2xs"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="buy-button flex h-10 w-full items-center justify-center rounded-xl font-medium text-sm text-white cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send me a one-time password'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
            {message && (
              <p className="text-xs text-gray-1100 dark:text-gray-400 mb-1">
                {message}
              </p>
            )}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-1100 dark:text-gray-400">
                One-Time Password
              </label>
              <input
                type="text"
                required
                autoFocus
                placeholder="Enter your OTP"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="h-10 w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#191919] px-3 text-sm text-foreground-100 outline-none focus:border-gray-500 dark:focus:border-gray-500 transition-colors shadow-2xs"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="buy-button flex h-10 w-full items-center justify-center rounded-xl font-medium text-sm text-white cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button
              type="button"
              onClick={() => setStep('email')}
              className="text-xs text-center text-gray-1000 hover:text-gray-1200 dark:hover:text-white underline mt-1 cursor-pointer"
            >
              Use a different email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
