import { useEffect, useState } from 'react';
import { getProgram, getLogs } from '../lib/api';
import { calculateCurrentStatus } from '../lib/utils';
import { Activity, Calendar, Dumbbell, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Dashboard() {
  const { t } = useLanguage();
  const [program, setProgram] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [p, l] = await Promise.all([getProgram(), getLogs()]);
        setProgram(p);
        setLogs(l);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <div className="text-zinc-500 p-8">Loading dashboard...</div>;

  const status = calculateCurrentStatus(logs, program);
  const { phase, week, nextWorkout } = status;

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-white mb-2">{t.dashboard.title}</h2>
        <p className="text-zinc-400">{t.dashboard.welcome}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Current Phase Card */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="text-emerald-500" />
            <h3 className="text-lg font-semibold text-white">{t.dashboard.currentPhase}</h3>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{phase?.name || 'Loading...'}</div>
          <p className="text-sm text-zinc-500">{t.dashboard.weeks} {phase?.start_week}-{phase?.end_week}</p>
          <div className="mt-4 h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500" 
              style={{ width: `${((week - phase?.start_week + 1) / (phase?.end_week - phase?.start_week + 1)) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-right mt-1 text-zinc-500">{t.dashboard.week} {week} {t.dashboard.of} {phase?.end_week - phase?.start_week + 1}</p>
        </div>

        {/* Next Session Card */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Dumbbell size={64} />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="text-blue-500" />
            <h3 className="text-lg font-semibold text-white">{t.dashboard.nextSession}</h3>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{nextWorkout?.day_name || t.dashboard.restDay}</div>
          <p className="text-sm text-zinc-500 line-clamp-2">{nextWorkout?.description}</p>
          <Link 
            to="/log" 
            className="mt-6 inline-flex items-center justify-center w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
          >
            {t.dashboard.startWorkout}
          </Link>
        </div>

        {/* Shoulder Status Card */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="text-amber-500" />
            <h3 className="text-lg font-semibold text-white">{t.dashboard.shoulderStatus}</h3>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {logs[0]?.shoulder_status || 'Unknown'}
          </div>
          <p className="text-sm text-zinc-500">{t.dashboard.lastReported}</p>
          
          <div className="mt-4 p-3 bg-amber-900/20 border border-amber-900/50 rounded text-xs text-amber-200/80">
            {t.dashboard.shoulderTip}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800">
          <h3 className="text-lg font-semibold text-white">{t.dashboard.recentActivity}</h3>
        </div>
        <div className="divide-y divide-zinc-800">
          {logs.length === 0 ? (
            <div className="p-6 text-zinc-500 text-center">{t.dashboard.noLogs}</div>
          ) : (
            logs.slice(0, 5).map((log) => (
              <div key={log.id} className="p-4 flex items-center justify-between hover:bg-zinc-800/50 transition-colors">
                <div>
                  <div className="font-medium text-white">{log.session_type}</div>
                  <div className="text-xs text-zinc-500">{new Date(log.date).toLocaleDateString()} • {t.dashboard.week} {log.week}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xs text-zinc-400">{t.dashboard.rpe}</div>
                    <div className="font-mono text-white">{log.overall_status}/10</div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${log.shoulder_status === 'sin molestias' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
