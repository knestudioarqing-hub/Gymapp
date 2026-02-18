import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateCurrentStatus(logs: any[], program: any[]) {
  if (!logs || logs.length === 0) {
    return {
      phase: program[0],
      week: 1,
      nextWorkout: program[0]?.workouts[0],
      lastLog: null
    };
  }

  const lastLog = logs[0]; // Assumes logs are sorted DESC
  const currentPhase = program.find(p => p.id === lastLog.phase) || program[0];
  
  // Simple logic: if last session was the last workout of the week, increment week?
  // Or just let the user pick.
  // For now, let's just return the last log's state as "current" and suggest the next logical workout.
  
  let nextWorkoutIndex = 0;
  if (currentPhase) {
    const lastWorkoutIndex = currentPhase.workouts.findIndex((w: any) => w.day_name === lastLog.session_type);
    if (lastWorkoutIndex !== -1) {
      nextWorkoutIndex = (lastWorkoutIndex + 1) % currentPhase.workouts.length;
    }
  }

  return {
    phase: currentPhase,
    week: lastLog.week,
    nextWorkout: currentPhase?.workouts[nextWorkoutIndex],
    lastLog
  };
}
