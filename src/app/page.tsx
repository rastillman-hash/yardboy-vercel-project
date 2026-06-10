import { getSubscriberCount } from '@/app/actions';
import EmailForm from '@/app/components/EmailForm';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const count = await getSubscriberCount();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      {/* Logo / wordmark */}
      <div className="mb-10 flex flex-col items-center gap-1">
        <span className="text-5xl">🌿</span>
        <span className="text-3xl font-extrabold tracking-tight text-slate-800">YardBoy</span>
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Smart Yard Technology</span>
      </div>

      {/* Hero text */}
      <div className="text-center max-w-xl mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 leading-tight mb-4">
          Your yard, finally{' '}
          <span className="text-sky-600">working for you.</span>
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          YardBoy is the AI-powered yard management platform that handles scheduling,
          watering, mowing, and more — so you can spend less time outside working
          and more time outside enjoying.
        </p>
      </div>

      {/* Feature pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {['🤖 AI Scheduling', '💧 Smart Watering', '🌱 Plant Health', '📊 Yard Analytics'].map((f) => (
          <span
            key={f}
            className="px-4 py-1.5 bg-white/70 border border-white/90 rounded-full text-sm font-medium text-slate-700 shadow-sm backdrop-blur-sm"
          >
            {f}
          </span>
        ))}
      </div>

      {/* Email form + counter */}
      <EmailForm initialCount={count} />

      {/* Footer */}
      <footer className="mt-16 text-center text-xs text-slate-400">
        <p>© {new Date().getFullYear()} YardBoy, Inc. · Built with Next.js &amp; Neon</p>
      </footer>
    </main>
  );
}
