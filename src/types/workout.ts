export type Workout = {
  id: string | number;
  name: string;
  description: string;
  categories: string[];
  equipment: string[];
  difficulty: string;
  sets: string | number;
  reps: string;
  duration: number;
  calories: number;
  rating: number;
  image: string;
  instructions: string[];
};
