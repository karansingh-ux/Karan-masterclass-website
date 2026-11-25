'use client';

import React, { useState } from 'react';
import { workshopConfig } from '../config/workshopConfig';

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayFailedResponse {
  error?: {
    description?: string;
    reason?: string;
  };
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, cb: (res: RazorpayFailedResponse) => void) => void;
}

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayInstance;
  }
}

interface RazorpayCheckoutButtonProps {
  label: string;
  className?: string;
}

function loadCheckoutScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.Razorpay) {
      resolve(true);
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );
    if (existing) {
      existing.addEventListener('load', () => resolve(Boolean(window.Razorpay)));
      existing.addEventListener('error', () => resolve(false));
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function RazorpayCheckoutButton({
  label,
  className = 'ws-violet-btn',
}: RazorpayCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  const handleCheckout = async () => {
    setStatus(null);
    setLoading(true);

    try {
      const loaded = await loadCheckoutScript();
      if (!loaded || !window.Razorpay) {
        setStatus({
          type: 'error',
          message: 'Unable to load Razorpay checkout. Please check your connection and try again.',
        });
        setLoading(false);
        return;
      }

      const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!keyId) {
        setStatus({
          type: 'error',
          message: 'Razorpay public key is missing.',
        });
        setLoading(false);
        return;
      }

      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: workshopConfig.price.amount * 100,
          currency: 'INR',
          receipt: `ws_${Date.now()}`,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.order_id) {
        setStatus({
          type: 'error',
          message: orderData.error || 'Could not initiate payment order.',
        });
        setLoading(false);
        return;
      }

      const options: Record<string, unknown> = {
        key: keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: workshopConfig.title,
        description: `${workshopConfig.dates.saturday.day}, ${workshopConfig.dates.saturday.date} · ${workshopConfig.dates.saturday.time}`,
        order_id: orderData.order_id,
        theme: { color: '#5A2BFF' },
        modal: {
          ondismiss: () => {
            setLoading(false);
            setStatus({
              type: 'info',
              message: 'Payment cancelled. You can retry anytime.',
            });
          },
        },
        handler: async (response: RazorpayResponse) => {
          try {
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok && verifyData.verified) {
              setStatus({
                type: 'success',
                message: `Seat confirmed! Payment ID: ${verifyData.payment_id}`,
              });
            } else {
              setStatus({
                type: 'error',
                message: verifyData.error || 'Payment signature verification failed.',
              });
            }
          } catch {
            setStatus({
              type: 'error',
              message: 'Network error while verifying payment.',
            });
          } finally {
            setLoading(false);
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (resp: RazorpayFailedResponse) => {
        setLoading(false);
        setStatus({
          type: 'error',
          message: resp?.error?.description || 'Payment failed. Please try again.',
        });
      });
      rzp.open();
    } catch {
      setStatus({
        type: 'error',
        message: 'Something went wrong starting checkout. Please try again.',
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className={className}
        style={{ opacity: loading ? 0.75 : 1, cursor: loading ? 'wait' : 'pointer' }}
      >
        {loading ? (
          <span>Opening checkout...</span>
        ) : (
          <>
            <span>{label} ·</span>
            <span className="ws-btn-strike">{workshopConfig.price.original}</span>
            <span>{workshopConfig.price.display}</span>
          </>
        )}
      </button>

      {status && (
        <p
          role="status"
          className="mt-3 text-center text-xs font-mono leading-relaxed"
          style={{
            color:
              status.type === 'success'
                ? '#4ade80'
                : status.type === 'error'
                ? '#f87171'
                : 'rgba(255, 255, 255, 0.65)',
          }}
        >
          {status.message}
        </p>
      )}
    </div>
  );
}
