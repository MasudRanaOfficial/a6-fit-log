export interface Workout {
  id: number | string;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

export interface PlannedWorkout extends Workout {
  isDone?: boolean;
  addedAt?: string;
}

export type WorkoutsResponse = Workout[];
export type SingleWorkoutResponse = Workout;

export type SortOption = "Duration" | "Calories" | "Rating";

export interface MetricsSummary {
  exercises: number;
  minutes: number;
  calories: number;
}
