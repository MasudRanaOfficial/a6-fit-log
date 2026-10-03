import { Workout } from "@/types/workout";

const BASE_URL = "https://api.api-store.workers.dev/api/fitlog";

export async function getAllWorkouts(): Promise<Workout[]> {
  const res = await fetch(BASE_URL, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch workouts: ${res.statusText}`);
  }

  const data = await res.json();
  return Array.isArray(data) ? data : data.data || [];
}

export async function getWorkoutById(id: string | number): Promise<Workout> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch workout with ID ${id}: ${res.statusText}`);
  }

  const data = await res.json();
  return data.data || data;
}
