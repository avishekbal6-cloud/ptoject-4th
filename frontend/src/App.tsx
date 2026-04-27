import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Auth } from './components/Auth';
import { Header } from './components/Header';
import { ClientDashboard } from './components/ClientDashboard';
import { ProfessionalDashboard } from './components/ProfessionalDashboard';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0f1115]">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-brand-500" />
        <p className="text-sm font-medium text-slate-300">Signing you in…</p>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-[#0f1115]">
      <Header />
      <main className="pb-16">
        {user.role === 'professional' ? <ProfessionalDashboard /> : <ClientDashboard />}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
