import React, { useState, useEffect } from 'react';
import { getProgram, saveLog } from '../lib/api';
import { AlertTriangle, Save, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function LogSession() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [program, setProgram] = useState<any[]>([]);
  const [selectedPhase, setSelectedPhase] = useState<any>(null);
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null);
  const [week, setWeek] = useState(1);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [entries, setEntries] = useState<any[]>([]);
  const [shoulderStatus, setShoulderStatus] = useState('sin molestias');
  const [overallStatus, setOverallStatus] = useState(8);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    getProgram().then(data => {
      setProgram(data);
      if (data.length > 0) {
        setSelectedPhase(data[0]);
        if (data[0].workouts.length > 0) {
          setSelectedWorkout(data[0].workouts[0]);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (selectedWorkout) {
      // Pre-fill entries based on workout exercises
      const initialEntries = selectedWorkout.exercises.map((ex: any) => ({
        exercise_name: ex.name,
        sets_completed: parseInt(ex.sets) || 3,
        weight: 0,
        reps_achieved: parseInt(ex.reps.split('-')[0]) || 10,
        rpe: parseInt(ex.rpe) || 7,
        notes: '',
        is_shoulder_risk: ex.is_shoulder_risk
      }));
      setEntries(initialEntries);
    }
  }, [selectedWorkout]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const logData = {
      date,
      phase: selectedPhase.id,
      week,
      session_type: selectedWorkout.day_name,
      shoulder_status: shoulderStatus,
      overall_status: overallStatus,
      notes,
      entries
    };

    try {
      await saveLog(logData);
      navigate('/');
    } catch (err) {
      alert('Failed to save log');
    }
  };

  const updateEntry = (index: number, field: string, value: any) => {
    const newEntries = [...entries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setEntries(newEntries);
  };

  if (!selectedPhase) return <div className="p-8 text-zinc-500">Loading program...</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20">
      <header>
        <h2 className="text-3xl font-bold text-white mb-2">{t.log.title}</h2>
        <p className="text-zinc-400">{t.log.subtitle}</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Session Details */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">{t.log.date}</label>
            <input 
              type="date" 
              value={date} 
              onChange={e => setDate(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">{t.log.phase}</label>
            <select 
              value={selectedPhase.id} 
              onChange={e => {
                const p = program.find(ph => ph.id === parseInt(e.target.value));
                setSelectedPhase(p);
                setSelectedWorkout(p.workouts[0]);
              }}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
            >
              {program.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">{t.log.workout}</label>
            <select 
              value={selectedWorkout?.id} 
              onChange={e => setSelectedWorkout(selectedPhase.workouts.find((w: any) => w.id === parseInt(e.target.value)))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
            >
              {selectedPhase.workouts.map((w: any) => <option key={w.id} value={w.id}>{w.day_name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">{t.log.week}</label>
            <input 
              type="number" 
              value={week} 
              onChange={e => setWeek(parseInt(e.target.value))}
              min={selectedPhase.start_week} max={selectedPhase.end_week}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Exercises */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            {t.log.exercises}
            <span className="text-xs font-normal text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
              {entries.length} {t.log.total}
            </span>
          </h3>
          
          {entries.map((entry, idx) => (
            <div key={idx} className={`bg-zinc-900 border ${entry.is_shoulder_risk ? 'border-amber-900/50' : 'border-zinc-800'} p-4 rounded-xl relative group`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-medium text-white text-lg">{entry.exercise_name}</h4>
                  {entry.is_shoulder_risk === 1 && (
                    <div className="flex items-center gap-1 text-amber-500 text-xs mt-1">
                      <AlertTriangle size={12} />
                      <span>{t.log.shoulderRisk}</span>
                    </div>
                  )}
                </div>
                <button 
                  type="button" 
                  onClick={() => setEntries(entries.filter((_, i) => i !== idx))}
                  className="text-zinc-600 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">{t.log.sets}</label>
                  <input 
                    type="number" 
                    value={entry.sets_completed} 
                    onChange={e => updateEntry(idx, 'sets_completed', parseInt(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">{t.log.weight}</label>
                  <input 
                    type="number" 
                    value={entry.weight} 
                    onChange={e => updateEntry(idx, 'weight', parseFloat(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">{t.log.reps}</label>
                  <input 
                    type="number" 
                    value={entry.reps_achieved} 
                    onChange={e => updateEntry(idx, 'reps_achieved', parseInt(e.target.value))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">{t.log.rpe}</label>
                  <input 
                    type="number" 
                    value={entry.rpe} 
                    onChange={e => updateEntry(idx, 'rpe', parseInt(e.target.value))}
                    max={10}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white text-sm"
                  />
                </div>
              </div>
            </div>
          ))}
          
          <button 
            type="button"
            onClick={() => setEntries([...entries, { exercise_name: 'New Exercise', sets_completed: 3, weight: 0, reps_achieved: 10, rpe: 7, notes: '', is_shoulder_risk: 0 }])}
            className="w-full py-3 border-2 border-dashed border-zinc-800 rounded-xl text-zinc-500 hover:text-white hover:border-zinc-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={18} /> {t.log.addExercise}
          </button>
        </div>

        {/* Status & Submit */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">{t.log.shoulderStatus}</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {['sin molestias', 'leve', 'moderado', 'intenso'].map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setShoulderStatus(s)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                    shoulderStatus === s 
                      ? s === 'sin molestias' ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                      : 'bg-zinc-950 text-zinc-400 hover:bg-zinc-800'
                  }`}
                >
                  {/* Map database value to translated label */}
                  {s === 'sin molestias' ? t.log.statuses.none : 
                   s === 'leve' ? t.log.statuses.mild :
                   s === 'moderado' ? t.log.statuses.moderate :
                   t.log.statuses.severe}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">{t.log.rating}</label>
            <input 
              type="range" 
              min="1" max="10" 
              value={overallStatus} 
              onChange={e => setOverallStatus(parseInt(e.target.value))}
              className="w-full accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-zinc-500 mt-1">
              <span>{t.log.terrible}</span>
              <span>{t.log.excellent}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">{t.log.notes}</label>
            <textarea 
              value={notes} 
              onChange={e => setNotes(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 h-24"
              placeholder={t.log.notesPlaceholder}
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2"
          >
            <Save size={20} /> {t.log.save}
          </button>
        </div>
      </form>
    </div>
  );
}
