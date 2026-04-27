import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CalendarDays, Eye, EyeOff, LogIn, ShieldCheck, UserPlus } from 'lucide-react';
import type { ProfessionalType } from '../lib/api';

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [accountType, setAccountType] = useState<'client' | ProfessionalType>('client');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        const role = accountType === 'client' ? 'client' : 'professional';
        const professionalType = accountType === 'client' ? undefined : accountType;
        await signUp(email, password, fullName, role, professionalType);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { title: 'Discover', body: 'Filter by specialty, service, and date.' },
    { title: 'Book', body: 'Reserve a slot that fits your calendar.' },
    { title: 'Meet', body: 'Get confirmations and updates in one place.' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0f1115]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(51, 65, 85, 0.35) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(51, 65, 85, 0.35) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-brand-900/40 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 py-12 lg:flex-row lg:items-center lg:gap-16 lg:py-16">
        <div className="mb-12 max-w-xl lg:mb-0">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-ui-md">
              <CalendarDays size={26} />
            </div>
            <span className="text-xl font-semibold tracking-tight text-white">OintmentPro</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Appointment scheduling built for clarity.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            Clients book verified slots; professionals manage availability and confirmations — without noise.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-white/80 bg-white/80 p-3 shadow-ui-md backdrop-blur-sm">
            <img
              src="/images/hero-dashboard.svg"
              alt="Dashboard preview"
              className="h-auto w-full rounded-xl border border-slate-100 object-cover"
            />
          </div>

          <ul className="mt-8 space-y-5">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-sm font-semibold text-brand-300 shadow-sm">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold text-white">{s.title}</p>
                  <p className="text-sm text-slate-300">{s.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center gap-2 text-sm text-slate-400">
            <ShieldCheck className="text-brand-600" size={18} />
            Secure sign-in · Role-based dashboards
          </div>
        </div>

        <div className="ui-card w-full max-w-md p-8 shadow-ui-lg lg:shrink-0">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              {isLogin ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              {isLogin ? 'Sign in to continue to your dashboard.' : 'Choose how you will use OintmentPro.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label htmlFor="fullName" className="ui-label">
                  Full name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="ui-input"
                  placeholder="Alex Morgan"
                  required
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="ui-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="ui-input"
                placeholder="you@company.com"
                autoComplete="username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="ui-label">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="ui-input pr-11"
                  placeholder="••••••••"
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={20} strokeWidth={1.75} /> : <Eye size={20} strokeWidth={1.75} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="role" className="ui-label">
                  I am a
                </label>
                <select
                  id="role"
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value as 'client' | ProfessionalType)}
                  className="ui-input"
                >
                  <option value="client">Client — book appointments</option>
                  <option value="doctor">Doctor</option>
                  <option value="tutor">Tutor</option>
                  <option value="consultant">Consultant</option>
                </select>
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="ui-btn-primary w-full py-3">
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Please wait…
                </span>
              ) : isLogin ? (
                <>
                  <LogIn size={18} />
                  Sign in
                </>
              ) : (
                <>
                  <UserPlus size={18} />
                  Create account
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-300">
            {isLogin ? "Don't have an account? " : 'Already registered? '}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setShowPassword(false);
              }}
              className="font-semibold text-brand-700 hover:text-brand-800"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
