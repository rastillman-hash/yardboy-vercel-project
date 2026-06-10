'use client';

import { useActionState } from 'react';
import { subscribeEmail } from '@/app/actions';

interface EmailFormProps {
  initialCount: number;
}

export default function EmailForm({ initialCount }: EmailFormProps) {
  const [state, formAction, isPending] = useActionState(subscribeEmail, null);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      {/* Subscriber counter */}
      <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-white/80 rounded-full px-5 py-2 shadow-sm">
        <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
        <span className="text-sm font-medium text-slate-700">
          <span className="font-bold text-slate-900">{initialCount.toLocaleString()}</span>{' '}
          {initialCount === 1 ? 'person has' : 'people have'} already signed up
        </span>
      </div>

      {/* Form or success state */}
      {state?.success ? (
        <div className="w-full text-center bg-green-100 border border-green-300 rounded-2xl px-6 py-5">
          <p className="text-2xl mb-1">🎉</p>
          <p className="font-semibold text-green-800">You&apos;re on the list!</p>
          <p className="text-sm text-green-700 mt-1">We&apos;ll reach out when YardBoy launches.</p>
        </div>
      ) : (
        <form action={formAction} className="flex flex-col sm:flex-row gap-3 w-full">
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 rounded-xl border border-slate-300 bg-white/80 backdrop-blur-sm shadow-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
          />
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-3 rounded-xl bg-slate-800 text-white font-semibold shadow hover:bg-slate-700 active:scale-95 transition disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isPending ? 'Joining…' : 'Notify Me'}
          </button>
        </form>
      )}

      {/* Error message */}
      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2 w-full text-center">
          {state.error}
        </p>
      )}

      <p className="text-xs text-slate-500">No spam. Ever. Unsubscribe anytime.</p>
    </div>
  );
}
