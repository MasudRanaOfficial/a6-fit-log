import { Workout } from "@/types/workout";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export async function getAllWorkouts(): Promise<Workout[]> {
  const res = await fetch(API_BASE_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch workouts from API");
  return res.json();
}

export async function getWorkoutById(id: string | number): Promise<Workout> {
  const workouts = await getAllWorkouts();
  const workout = workouts.find((item) => String(item.id) === String(id));
  if (!workout) throw new Error("Workout not found");
  return workout;
}
