import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Calendar, PlusCircle, TrendingUp, AlertTriangle, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../lib/translations';

export default function Layout() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex flex-col md:flex-row">
      {/* Sidebar / Mobile Nav */}
      <nav className="w-full md:w-64 bg-zinc-900 border-r border-zinc-800 flex-shrink-0 flex flex-col">
        <div className="p-6 border-b border-zinc-800">
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="w-2 h-8 bg-emerald-500 rounded-sm inline-block"></span>
            HYPERTROPHY OS
          </h1>
          <p className="text-xs text-zinc-500 mt-1 font-mono">v2.4.0 • ADVANCED</p>
        </div>
        
        <div className="p-4 space-y-1">
          <NavItem to="/" icon={<LayoutDashboard size={18} />} label={t.nav.dashboard} />
          <NavItem to="/program" icon={<Calendar size={18} />} label={t.nav.program} />
          <NavItem to="/log" icon={<PlusCircle size={18} />} label={t.nav.log} />
          <NavItem to="/progress" icon={<TrendingUp size={18} />} label={t.nav.progress} />
        </div>

        <div className="mt-auto">
          {/* Language Switcher */}
          <div className="px-4 py-2 border-t border-zinc-800">
            <div className="flex items-center gap-2 mb-2 text-xs text-zinc-500 uppercase tracking-wider font-semibold">
              <Globe size={12} /> Language
            </div>
            <div className="flex gap-2">
              {(['en', 'es', 'pt'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-1 text-xs rounded uppercase font-medium transition-colors ${
                    language === lang 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
                      : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-zinc-800">
            <div className="bg-amber-900/20 border border-amber-900/50 rounded-lg p-3 flex items-start gap-3">
              <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={16} />
              <div>
                <p className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-1">{t.nav.shoulderProtocol}</p>
                <p className="text-xs text-amber-200/80 leading-relaxed">
                  {t.nav.shoulderWarning}
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-5xl mx-auto"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}

function NavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          isActive
            ? 'bg-zinc-800 text-white'
            : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}
