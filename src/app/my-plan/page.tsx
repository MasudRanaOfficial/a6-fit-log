"use client";

import { useMemo, useState } from "react";
import { BarChart3 } from "lucide-react";
import { MetricsRow } from "@/components/my-plan/MetricsRow";
import { EmptyState } from "@/components/my-plan/EmptyState";
import { PlannedCard } from "@/components/my-plan/PlannedCard";
import { SortDropdown, SortOption } from "@/components/ui/SortDropdown";
import { useWorkoutContext } from "@/context/WorkoutContext";
import { Workout } from "@/types/workout";

export default function MyPlanPage() {
  const { plan, saved, metrics } = useWorkoutContext();
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  const currentItems = activeTab === "plan" ? plan : saved;

  const sortedItems = useMemo(
    () => sortWorkouts(currentItems, sortBy),
    [currentItems, sortBy],
  );

  return (
    <section className="page-shell section-space min-h-[70vh]">
      <div className="flex flex-col gap-5 border-b border-base-300 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-3 text-[#ccff00]">
            <BarChart3 className="size-5" />
            <span className="text-xs font-bold uppercase tracking-[0.24em]">
              Training log
            </span>
          </div>
          <h1 className="font-display mt-2 text-5xl uppercase leading-none sm:text-6xl">
            My Plan
          </h1>
          <p className="muted-copy mt-3 max-w-xl">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      <div className="mt-8">
        <MetricsRow {...metrics} />
      </div>

      <div className="mt-10">
        <div
          role="tablist"
          className="tabs tabs-boxed inline-flex rounded-xl border border-base-300 bg-base-200 p-1"
        >
          <button
            role="tab"
            aria-selected={activeTab === "plan"}
            className={`tab rounded-lg px-5 text-xs font-bold uppercase tracking-[0.16em] ${
              activeTab === "plan"
                ? "bg-[#ccff00] text-black"
                : "text-base-content/60"
            }`}
            onClick={() => setActiveTab("plan")}
          >
            Today&apos;s Plan{" "}
            <span className="ml-2 opacity-70">{plan.length}</span>
          </button>
          <button
            role="tab"
            aria-selected={activeTab === "saved"}
            className={`tab rounded-lg px-5 text-xs font-bold uppercase tracking-[0.16em] ${
              activeTab === "saved"
                ? "bg-[#ccff00] text-black"
                : "text-base-content/60"
            }`}
            onClick={() => setActiveTab("saved")}
          >
            Saved <span className="ml-2 opacity-70">{saved.length}</span>
          </button>
        </div>
      </div>

      <div className="mt-7 space-y-4">
        {sortedItems.length === 0 ? (
          <EmptyState tab={activeTab} />
        ) : (
          sortedItems.map((workout) => (
            <PlannedCard key={workout.id} workout={workout} mode={activeTab} />
          ))
        )}
      </div>
    </section>
  );
}

function sortWorkouts(workouts: Workout[], sortBy: SortOption) {
  return [...workouts].sort((a, b) => {
    if (sortBy === "calories") return b.calories - a.calories;
    if (sortBy === "rating") return b.rating - a.rating;
    return a.duration - b.duration;
  });
}
