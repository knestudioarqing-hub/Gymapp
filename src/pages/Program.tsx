import { useEffect, useState } from 'react';
import { getProgram } from '../lib/api';
import { ChevronDown, ChevronRight, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export default function Program() {
  const { t } = useLanguage();
  const [program, setProgram] = useState<any[]>([]);
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);

  useEffect(() => {
    getProgram().then(setProgram);
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-bold text-white mb-2">{t.program.title}</h2>
        <p className="text-zinc-400">{t.program.subtitle}</p>
      </header>

      <div className="space-y-4">
        {program.map((phase) => (
          <div key={phase.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <button
              onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
              className="w-full flex items-center justify-between p-6 hover:bg-zinc-800/50 transition-colors text-left"
            >
              <div>
                <div className="text-xs font-mono text-emerald-500 uppercase tracking-wider mb-1">
                  {t.program.phase} {phase.id} • {t.dashboard.weeks} {phase.start_week}-{phase.end_week}
                </div>
                <h3 className="text-xl font-bold text-white">{phase.name}</h3>
              </div>
              {expandedPhase === phase.id ? <ChevronDown className="text-zinc-400" /> : <ChevronRight className="text-zinc-400" />}
            </button>

            <AnimatePresence>
              {expandedPhase === phase.id && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 border-t border-zinc-800">
                    <p className="text-zinc-400 mb-6 mt-4">{phase.description}</p>
                    
                    <div className="grid gap-4">
                      {phase.workouts.map((workout: any) => (
                        <div key={workout.id} className="bg-zinc-950/50 border border-zinc-800 rounded-lg p-4">
                          <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                            {workout.day_name}
                            <span className="text-xs font-normal text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                              {workout.exercises.length} {t.program.exercises}
                            </span>
                          </h4>
                          <p className="text-sm text-zinc-500 mb-4">{workout.description}</p>
                          
                          <div className="space-y-2">
                            {workout.exercises.map((ex: any) => (
                              <div key={ex.id} className="flex items-center justify-between text-sm p-2 hover:bg-zinc-900 rounded transition-colors group">
                                <div className="flex items-center gap-2">
                                  {ex.is_shoulder_risk === 1 && (
                                    <Info size={14} className="text-amber-500" title="Shoulder Caution" />
                                  )}
                                  <span className="text-zinc-300">{ex.name}</span>
                                </div>
                                <div className="flex items-center gap-4 font-mono text-xs text-zinc-500">
                                  <span>{ex.sets} x {ex.reps}</span>
                                  <span className="w-12 text-right">{t.log.rpe} {ex.rpe}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
