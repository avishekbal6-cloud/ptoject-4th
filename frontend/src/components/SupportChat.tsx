import { useMemo, useState } from 'react';
import { HelpCircle, Sparkles, X } from 'lucide-react';

type QA = { q: string; a: string };

export function SupportChat() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const faqs: QA[] = useMemo(
    () => [
      {
        q: 'Why is the service list empty?',
        a: 'The API must be running and MongoDB must contain services. Run locally with `npm run dev:full`, or deploy with `MONGODB_URI` set on Vercel and restart once so core services seed.',
      },
      {
        q: 'Deploying on Vercel',
        a: 'Add env vars: `MONGODB_URI`, `JWT_SECRET`, and optionally `CORS_ORIGIN`. Build runs `vite build`; API lives in `/api` via serverless. Use MongoDB Atlas for the database.',
      },
      {
        q: 'Port 5000 in use locally',
        a: 'Stop the old server (Ctrl+C) or run `PORT=5001 npm run server` and set `VITE_API_PROXY_TARGET=http://localhost:5001` when running the Vite client.',
      },
      {
        q: 'Tutor account — which services appear?',
        a: 'Services are filtered by your professional type (doctor / tutor / consultant). Update My Profile if needed, save, then refresh.',
      },
    ],
    []
  );

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-ui-lg transition-all hover:from-brand-700 hover:to-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
        >
          <HelpCircle size={18} />
          Help
        </button>
      ) : (
        <div className="flex w-[min(100vw-2rem,380px)] flex-col overflow-hidden rounded-2xl border border-slate-700/70 bg-[#151920]/95 shadow-ui-lg backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-slate-700/70 px-4 py-3">
            <div className="flex items-center gap-2 font-semibold text-white">
              <Sparkles size={18} className="text-brand-600" />
              Quick help
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setSelected(null);
              }}
              className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          <div className="max-h-[min(70vh,420px)] space-y-2 overflow-y-auto p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Choose a topic</p>
            {faqs.map((item, idx) => (
              <button
                key={item.q}
                type="button"
                onClick={() => setSelected(idx)}
                className={`w-full rounded-xl border px-3 py-2.5 text-left text-sm transition-colors ${
                  selected === idx
                    ? 'border-brand-500/50 bg-brand-500/10 text-slate-100'
                    : 'border-slate-700 bg-slate-900/60 text-slate-200 hover:border-slate-600 hover:bg-slate-800/80'
                }`}
              >
                <span className="font-semibold">{item.q}</span>
                {selected === idx && (
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.a}</p>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
