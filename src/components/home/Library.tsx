"use client";

import { useMemo, useState } from "react";
import { Dumbbell } from "lucide-react";
import { Workout } from "@/types/workout";
import { WorkoutCard } from "@/components/home/WorkoutCard";
import { SortDropdown, SortOption } from "@/components/ui/SortDropdown";

export function Library({ workouts }: { workouts: Workout[] }) {
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  const sortedWorkouts = useMemo(() => {
    return [...workouts].sort((a, b) => {
      if (sortBy === "calories") return b.calories - a.calories;
      if (sortBy === "rating") return b.rating - a.rating;
      return a.duration - b.duration;
    });
  }, [sortBy, workouts]);

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="neon-divider">
          <div className="flex items-center gap-2 text-[#ccff00]">
            <Dumbbell className="size-5" />
            <span className="text-xs font-bold uppercase tracking-[0.22em]">
              Twelve lifts
            </span>
          </div>
          <h2 className="font-display mt-2 text-5xl uppercase leading-none sm:text-6xl">
            The Library
          </h2>
          <p className="muted-copy mt-3">
            Twelve lifts covering every major muscle group.
          </p>
        </div>
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedWorkouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  );
}
