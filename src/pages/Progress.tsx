import { useEffect, useState } from 'react';
import { getLogs } from '../lib/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { format } from 'date-fns';
import { useLanguage } from '../context/LanguageContext';

export default function Progress() {
  const { t } = useLanguage();
  const [logs, setLogs] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    getLogs().then(data => {
      setLogs(data);
      // Process data for charts
      const processed = data.map((log: any) => {
        const volume = log.entries.reduce((acc: number, entry: any) => acc + (entry.sets_completed * entry.reps_achieved * entry.weight), 0);
        return {
          date: format(new Date(log.date), 'MM/dd'),
          volume,
          rating: log.overall_status,
          shoulder: log.shoulder_status === 'sin molestias' ? 0 : log.shoulder_status === 'leve' ? 1 : log.shoulder_status === 'moderado' ? 2 : 3
        };
      }).reverse(); // Oldest first for charts
      setChartData(processed);
    });
  }, []);

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-white mb-2">{t.progress.title}</h2>
        <p className="text-zinc-400">{t.progress.subtitle}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Volume Chart */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl h-80 flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-4">{t.progress.volume}</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="date" stroke="#71717a" fontSize={12} />
                <YAxis stroke="#71717a" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Line type="monotone" dataKey="volume" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Session Rating Chart */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl h-80 flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-4">{t.progress.rating}</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="date" stroke="#71717a" fontSize={12} />
                <YAxis stroke="#71717a" fontSize={12} domain={[0, 10]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
                  cursor={{ fill: '#27272a' }}
                />
                <Bar dataKey="rating" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Shoulder Status Heatmap-ish */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl h-80 lg:col-span-2 flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-4">{t.progress.shoulderPain}</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="date" stroke="#71717a" fontSize={12} />
                <YAxis stroke="#71717a" fontSize={12} domain={[0, 3]} ticks={[0, 1, 2, 3]} tickFormatter={(val) => ['None', 'Mild', 'Mod', 'Severe'][val]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
                />
                <Line type="stepAfter" dataKey="shoulder" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
