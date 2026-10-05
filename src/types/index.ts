export type UserProfile = {
  name: string;
  age: number;
  height: number;
  weight: number;
  targetWeight: number;
  goal: 'improve fitness' | 'maintain' | 'build muscle' | 'gain weight' | 'reduce body fat';
  experience: 'Beginner' | 'Intermediate' | 'Advanced';
  trainingDaysPerWeek: number;
  workoutDurationMinutes: number;
  equipment: 'None' | 'Dumbbells' | 'Full Gym';
};

export type Exercise = {
  id: string;
  name: string;
  targetSets: number;
  targetReps: number;
  suggestedLoad: number; // in kg
  priority: number; // 1 = highest, used for shortening workouts
  image?: string;
  description?: string;
  steps?: string[];
};

export type WorkoutSession = {
  id: string;
  date: string;
  title: string;
  expectedDuration: number;
  exercises: Exercise[];
  completed: boolean;
};

export type ExerciseLog = {
  exerciseId: string;
  setsCompleted: number;
  repsPerSet: number[];
  loadPerSet: number[];
  difficulty: 'Easy' | 'Normal' | 'Hard' | 'Very Hard';
  userFeedback?: string;
};

export type NutritionTarget = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type NutritionLog = {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export type ProgressMetric = {
  date: string;
  weight: number;
  workoutAdherence: number; // percentage
  nutritionAdherence: number; // percentage
  strengthChange: number; // percentage
};

export type AdaptiveDecision = {
  id: string;
  date: string;
  type: 'workout_shortened' | 'schedule_changed' | 'load_adjusted' | 'nutrition_adjusted';
  description: string;
  beforeContext?: string;
  afterContext?: string;
};

export type CoachMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
};

export type MealSuggestion = {
  id: string;
  type: 'Bữa sáng' | 'Bữa trưa' | 'Bữa tối' | 'Bữa phụ';
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  image?: string;
};
