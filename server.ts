import express from 'express';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database('training.db');

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS phases (
    id INTEGER PRIMARY KEY,
    name TEXT,
    start_week INTEGER,
    end_week INTEGER,
    description TEXT
  );

  CREATE TABLE IF NOT EXISTS workouts (
    id INTEGER PRIMARY KEY,
    phase_id INTEGER,
    day_name TEXT,
    description TEXT,
    FOREIGN KEY(phase_id) REFERENCES phases(id)
  );

  CREATE TABLE IF NOT EXISTS exercises (
    id INTEGER PRIMARY KEY,
    workout_id INTEGER,
    name TEXT,
    sets TEXT,
    reps TEXT,
    rpe TEXT,
    notes TEXT,
    is_shoulder_risk BOOLEAN DEFAULT 0,
    FOREIGN KEY(workout_id) REFERENCES workouts(id)
  );

  CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    phase INTEGER,
    week INTEGER,
    session_type TEXT,
    shoulder_status TEXT,
    overall_status INTEGER,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS log_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    log_id INTEGER,
    exercise_name TEXT,
    sets_completed INTEGER,
    weight REAL,
    reps_achieved INTEGER,
    rpe INTEGER,
    notes TEXT,
    FOREIGN KEY(log_id) REFERENCES logs(id)
  );
`);

// Seed Data if empty
const phasesCount = db.prepare('SELECT count(*) as count FROM phases').get() as { count: number };
if (phasesCount.count === 0) {
  console.log('Seeding database...');
  const insertPhase = db.prepare('INSERT INTO phases (name, start_week, end_week, description) VALUES (?, ?, ?, ?)');
  const insertWorkout = db.prepare('INSERT INTO workouts (phase_id, day_name, description) VALUES (?, ?, ?)');
  const insertExercise = db.prepare('INSERT INTO exercises (workout_id, name, sets, reps, rpe, notes, is_shoulder_risk) VALUES (?, ?, ?, ?, ?, ?, ?)');

  // Phase 1: Adaptation (Weeks 1-6)
  const p1 = insertPhase.run('Adaptation Anatomica', 1, 6, 'Focus on tendon health, higher reps, controlled tempo. 4 days/week.').lastInsertRowid;
  
  // P1 Workouts (Upper A, Lower A, Upper B, Lower B)
  const p1_w1 = insertWorkout.run(p1, 'Upper A', 'Focus on chest/back width').lastInsertRowid;
  insertExercise.run(p1_w1, 'Incline Dumbbell Press', '3', '12-15', '7', 'Neutral grip for shoulder safety', 1);
  insertExercise.run(p1_w1, 'Chest Supported Row', '3', '12-15', '7', 'Squeeze at top', 0);
  insertExercise.run(p1_w1, 'Overhead Press (Dumbbell)', '3', '12-15', '7', 'Seated, neutral grip', 1);
  insertExercise.run(p1_w1, 'Lat Pulldown', '3', '12-15', '7', 'Wide grip', 0);
  insertExercise.run(p1_w1, 'Lateral Raises', '3', '15-20', '8', 'Control the eccentric', 1);

  const p1_w2 = insertWorkout.run(p1, 'Lower A', 'Quad focus').lastInsertRowid;
  insertExercise.run(p1_w2, 'Leg Press', '3', '15-20', '7', 'Feet low on platform', 0);
  insertExercise.run(p1_w2, 'Goblet Squat', '3', '12-15', '7', 'Heels elevated', 0);
  insertExercise.run(p1_w2, 'Leg Extension', '3', '15-20', '8', 'Pause at top', 0);
  insertExercise.run(p1_w2, 'Seated Calf Raise', '4', '15-20', '8', 'Full stretch', 0);

  const p1_w3 = insertWorkout.run(p1, 'Upper B', 'Shoulder/Arm focus').lastInsertRowid;
  insertExercise.run(p1_w3, 'Machine Chest Press', '3', '12-15', '7', 'Controlled tempo', 0);
  insertExercise.run(p1_w3, 'Cable Row', '3', '12-15', '7', 'Neutral grip', 0);
  insertExercise.run(p1_w3, 'Face Pulls', '4', '15-20', '8', 'External rotation focus', 1);
  insertExercise.run(p1_w3, 'Tricep Pushdown', '3', '12-15', '8', 'Rope attachment', 0);
  insertExercise.run(p1_w3, 'Bicep Curl (Dumbbell)', '3', '12-15', '8', 'Supinate at top', 0);

  const p1_w4 = insertWorkout.run(p1, 'Lower B', 'Hamstring/Glute focus').lastInsertRowid;
  insertExercise.run(p1_w4, 'Romanian Deadlift (Dumbbell)', '3', '12-15', '7', 'Soft knees', 0);
  insertExercise.run(p1_w4, 'Leg Curl (Seated)', '3', '15-20', '8', 'Control eccentric', 0);
  insertExercise.run(p1_w4, 'Walking Lunges', '3', '12-15', '7', 'Steps per leg', 0);
  insertExercise.run(p1_w4, 'Plank', '3', '60s', '8', 'Core stability', 0);

  // Phase 2: Accumulation (Weeks 7-10)
  const p2 = insertPhase.run('Accumulation / Hypertrophy', 7, 10, 'Volume increase. 5 days/week (Push/Pull/Legs/Upper/Lower).').lastInsertRowid;
  // ... (Simplified seeding for brevity, would add more in real app)
  const p2_w1 = insertWorkout.run(p2, 'Push', 'Chest/Shoulders/Triceps').lastInsertRowid;
  insertExercise.run(p2_w1, 'Bench Press (Dumbbell)', '4', '8-12', '8', 'Flat bench', 1);
  insertExercise.run(p2_w1, 'Incline Machine Press', '3', '10-12', '8', '', 0);
  insertExercise.run(p2_w1, 'Lateral Raises (Cable)', '4', '12-15', '9', 'Behind back', 1);

  // Phase 3: Intensification (Weeks 11-14)
  const p3 = insertPhase.run('Intensification', 11, 14, 'Higher intensity, lower volume. 5 days/week.').lastInsertRowid;

  // Phase 4: Realization (Weeks 15-18)
  const p4 = insertPhase.run('Realization', 15, 18, 'Peaking and deload. 5 days/week.').lastInsertRowid;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/program', (req, res) => {
    const phases = db.prepare('SELECT * FROM phases').all();
    const workouts = db.prepare('SELECT * FROM workouts').all();
    const exercises = db.prepare('SELECT * FROM exercises').all();
    
    // Nest data
    const program = phases.map((p: any) => ({
      ...p,
      workouts: workouts.filter((w: any) => w.phase_id === p.id).map((w: any) => ({
        ...w,
        exercises: exercises.filter((e: any) => e.workout_id === w.id)
      }))
    }));

    res.json(program);
  });

  app.get('/api/logs', (req, res) => {
    const logs = db.prepare('SELECT * FROM logs ORDER BY date DESC').all();
    const entries = db.prepare('SELECT * FROM log_entries').all();
    
    const fullLogs = logs.map((l: any) => ({
      ...l,
      entries: entries.filter((e: any) => e.log_id === l.id)
    }));
    
    res.json(fullLogs);
  });

  app.post('/api/logs', (req, res) => {
    const { date, phase, week, session_type, shoulder_status, overall_status, notes, entries } = req.body;
    
    const insertLog = db.prepare('INSERT INTO logs (date, phase, week, session_type, shoulder_status, overall_status, notes) VALUES (?, ?, ?, ?, ?, ?, ?)');
    const insertEntry = db.prepare('INSERT INTO log_entries (log_id, exercise_name, sets_completed, weight, reps_achieved, rpe, notes) VALUES (?, ?, ?, ?, ?, ?, ?)');
    
    const transaction = db.transaction(() => {
      const info = insertLog.run(date, phase, week, session_type, shoulder_status, overall_status, notes);
      const logId = info.lastInsertRowid;
      
      for (const entry of entries) {
        insertEntry.run(logId, entry.exercise_name, entry.sets_completed, entry.weight, entry.reps_achieved, entry.rpe, entry.notes);
      }
      return logId;
    });

    try {
      const logId = transaction();
      res.json({ success: true, id: logId });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Vite Middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
