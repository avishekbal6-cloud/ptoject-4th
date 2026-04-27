import { useAuth } from '../contexts/AuthContext';
import { CalendarDays, LogOut } from 'lucide-react';

export function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-700/70 bg-[#12151b]/85 shadow-ui backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-indigo-700 text-white shadow-ui">
            <CalendarDays size={22} strokeWidth={2} />
          </div>
          <div>
            <p className="text-base font-semibold tracking-tight text-white">OintmentPro</p>
            <p className="hidden text-xs text-slate-400 sm:block">Scheduling for professionals</p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {user && (
            <>
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-white">{user.fullName}</p>
                <p className="text-xs capitalize text-brand-700">{user.role}</p>
              </div>
              <button
                type="button"
                onClick={signOut}
                className="ui-btn-secondary px-3 py-2 text-sm sm:px-4"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
