export type Language = 'en' | 'es' | 'pt';

export const translations = {
  en: {
    nav: {
      dashboard: "Dashboard",
      program: "Program",
      log: "Log Session",
      progress: "Progress",
      shoulderProtocol: "Shoulder Protocol",
      shoulderWarning: "Right shoulder instability active. Avoid behind-neck presses."
    },
    dashboard: {
      title: "Dashboard",
      welcome: "Welcome back, Athlete. Ready to train?",
      currentPhase: "Current Phase",
      weeks: "Weeks",
      week: "Week",
      of: "of",
      nextSession: "Next Session",
      restDay: "Rest Day",
      startWorkout: "Start Workout",
      shoulderStatus: "Shoulder Status",
      lastReported: "Last reported status",
      shoulderTip: "Remember: Controlled eccentrics. Stop if pain > 3/10.",
      recentActivity: "Recent Activity",
      noLogs: "No workouts logged yet.",
      rpe: "RPE"
    },
    program: {
      title: "Macrocycle Plan",
      subtitle: "18-week hypertrophy block with integrated deloads.",
      phase: "Phase",
      exercises: "Exercises"
    },
    log: {
      title: "Log Session",
      subtitle: "Record your performance and track progress.",
      date: "Date",
      phase: "Phase",
      workout: "Workout",
      week: "Week",
      exercises: "Exercises",
      total: "Total",
      sets: "Sets",
      weight: "Weight (kg)",
      reps: "Reps",
      rpe: "RPE",
      addExercise: "Add Exercise",
      shoulderStatus: "Shoulder Status",
      rating: "Overall Session Rating (1-10)",
      terrible: "Terrible",
      excellent: "Excellent",
      notes: "Notes",
      notesPlaceholder: "How did it feel? Any pain?",
      save: "Save Session",
      shoulderRisk: "Shoulder Risk: Monitor stability",
      statuses: {
        none: "sin molestias", // Keeping original values for DB consistency, mapping display if needed
        mild: "leve",
        moderate: "moderado",
        severe: "intenso"
      }
    },
    progress: {
      title: "Progress Analysis",
      subtitle: "Track your volume, intensity, and recovery trends.",
      volume: "Volume Load (kg)",
      rating: "Session Rating (1-10)",
      shoulderPain: "Shoulder Pain Level"
    }
  },
  es: {
    nav: {
      dashboard: "Panel Principal",
      program: "Programa",
      log: "Registrar Sesión",
      progress: "Progreso",
      shoulderProtocol: "Protocolo de Hombro",
      shoulderWarning: "Inestabilidad hombro derecho. Evitar trasnuca."
    },
    dashboard: {
      title: "Panel Principal",
      welcome: "Bienvenido, Atleta. ¿Listo para entrenar?",
      currentPhase: "Fase Actual",
      weeks: "Semanas",
      week: "Semana",
      of: "de",
      nextSession: "Próxima Sesión",
      restDay: "Día de Descanso",
      startWorkout: "Iniciar Entrenamiento",
      shoulderStatus: "Estado del Hombro",
      lastReported: "Último estado reportado",
      shoulderTip: "Recuerda: Excéntricas controladas. Parar si dolor > 3/10.",
      recentActivity: "Actividad Reciente",
      noLogs: "Sin registros aún.",
      rpe: "RPE"
    },
    program: {
      title: "Plan Macrociclo",
      subtitle: "Bloque de hipertrofia de 18 semanas con descargas integradas.",
      phase: "Fase",
      exercises: "Ejercicios"
    },
    log: {
      title: "Registrar Sesión",
      subtitle: "Registra tu rendimiento y sigue tu progreso.",
      date: "Fecha",
      phase: "Fase",
      workout: "Entrenamiento",
      week: "Semana",
      exercises: "Ejercicios",
      total: "Total",
      sets: "Series",
      weight: "Peso (kg)",
      reps: "Reps",
      rpe: "RPE",
      addExercise: "Añadir Ejercicio",
      shoulderStatus: "Estado del Hombro",
      rating: "Valoración General (1-10)",
      terrible: "Terrible",
      excellent: "Excelente",
      notes: "Notas",
      notesPlaceholder: "¿Cómo se sintió? ¿Algún dolor?",
      save: "Guardar Sesión",
      shoulderRisk: "Riesgo Hombro: Monitorizar estabilidad",
      statuses: {
        none: "sin molestias",
        mild: "leve",
        moderate: "moderado",
        severe: "intenso"
      }
    },
    progress: {
      title: "Análisis de Progreso",
      subtitle: "Sigue tus tendencias de volumen, intensidad y recuperación.",
      volume: "Carga de Volumen (kg)",
      rating: "Valoración Sesión (1-10)",
      shoulderPain: "Nivel Dolor Hombro"
    }
  },
  pt: {
    nav: {
      dashboard: "Painel",
      program: "Programa",
      log: "Registrar Treino",
      progress: "Progresso",
      shoulderProtocol: "Protocolo de Ombro",
      shoulderWarning: "Instabilidade ombro direito. Evitar desenvolvimento nuca."
    },
    dashboard: {
      title: "Painel",
      welcome: "Bem-vindo, Atleta. Pronto para treinar?",
      currentPhase: "Fase Atual",
      weeks: "Semanas",
      week: "Semana",
      of: "de",
      nextSession: "Próxima Sessão",
      restDay: "Dia de Descanso",
      startWorkout: "Iniciar Treino",
      shoulderStatus: "Estado do Ombro",
      lastReported: "Último estado reportado",
      shoulderTip: "Lembre-se: Excêntricas controladas. Parar se dor > 3/10.",
      recentActivity: "Atividade Recente",
      noLogs: "Nenhum treino registrado ainda.",
      rpe: "RPE"
    },
    program: {
      title: "Plano Macrociclo",
      subtitle: "Bloco de hipertrofia de 18 semanas com deloads integrados.",
      phase: "Fase",
      exercises: "Exercícios"
    },
    log: {
      title: "Registrar Treino",
      subtitle: "Registre seu desempenho e acompanhe o progresso.",
      date: "Data",
      phase: "Fase",
      workout: "Treino",
      week: "Semana",
      exercises: "Exercícios",
      total: "Total",
      sets: "Séries",
      weight: "Peso (kg)",
      reps: "Reps",
      rpe: "RPE",
      addExercise: "Adicionar Exercício",
      shoulderStatus: "Estado do Ombro",
      rating: "Avaliação Geral (1-10)",
      terrible: "Terrível",
      excellent: "Excelente",
      notes: "Notas",
      notesPlaceholder: "Como se sentiu? Alguma dor?",
      save: "Salvar Treino",
      shoulderRisk: "Risco Ombro: Monitorar estabilidade",
      statuses: {
        none: "sem dor",
        mild: "leve",
        moderate: "moderado",
        severe: "intenso"
      }
    },
    progress: {
      title: "Análise de Progresso",
      subtitle: "Acompanhe suas tendências de volume, intensidade e recuperação.",
      volume: "Carga de Volume (kg)",
      rating: "Avaliação da Sessão (1-10)",
      shoulderPain: "Nível de Dor no Ombro"
    }
  }
};
