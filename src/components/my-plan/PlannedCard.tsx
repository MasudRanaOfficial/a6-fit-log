"use client";

import Link from "next/link";
import { Check, Clock3, Eye, Flame, Plus, Star, X } from "lucide-react";
import { toast } from "react-hot-toast";
import { Workout } from "@/types/workout";
import { useWorkoutContext } from "@/context/WorkoutContext";
import Image from "next/image";

export function PlannedCard({
  workout,
  mode,
}: {
  workout: Workout;
  mode: "plan" | "saved";
}) {
  const {
    doneIds,
    markAsDone,
    removeFromPlan,
    addToPlan,
    canAddToPlan,
    removeFromSaved,
  } = useWorkoutContext();
  const done = doneIds.includes(String(workout.id));

  const handleDone = () => {
    markAsDone(workout.id);
    toast.success("Workout marked as done");
  };

  const handleRemove = () => {
    if (mode === "plan") {
      removeFromPlan(workout.id);
      toast.success("Workout removed from today's plan");
    } else {
      removeFromSaved(workout.id);
      toast.success("Workout removed from saved");
    }
  };

  const handleAdd = () => {
    if (canAddToPlan) {
      addToPlan(workout);
      return;
    }
    toast("Today's plan already has five lifts");
  };

  return (
    <article
      className={`card-surface rounded-2xl p-3 sm:p-4 ${done ? "opacity-70" : ""}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="h-24 w-full overflow-hidden rounded-xl bg-base-200 sm:h-20 sm:w-28 sm:shrink-0">
          <Image
            src={workout.image}
            alt={workout.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {workout.categories.slice(0, 2).map((category) => (
              <span
                key={category}
                className="badge badge-xs rounded-full border-[#ccff00]/20 bg-[#ccff00]/10 font-bold uppercase tracking-[0.08em] text-[#ccff00]"
              >
                {category}
              </span>
            ))}
            {done && (
              <span className="badge badge-xs rounded-full border-success/30 bg-success/10 font-bold uppercase text-success">
                Done
              </span>
            )}
          </div>
          <h3 className="font-display mt-2 truncate text-2xl uppercase leading-none">
            {workout.name}
          </h3>
          <p className="muted-copy mt-2 truncate text-sm">
            {workout.equipment.join(", ")}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-semibold text-base-content/55">
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="size-3.5" />
              {workout.duration} min
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Flame className="size-3.5" />
              {workout.calories} kcal
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Star className="size-3.5 fill-[#ccff00] text-[#ccff00]" />
              {workout.rating.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <Link
            href={`/workout/${workout.id}`}
            className="btn btn-sm rounded-full border border-base-300 bg-base-200 text-xs font-bold uppercase tracking-[0.08em] hover:border-base-content/30 hover:bg-base-100"
          >
            <Eye className="size-3.5" />
            View Details
          </Link>
          {mode === "plan" ? (
            <button
              className="btn btn-sm rounded-full border border-[#ccff00]/30 bg-[#ccff00]/10 text-xs font-bold uppercase tracking-[0.08em] text-[#ccff00] hover:bg-[#ccff00]/20"
              onClick={handleDone}
              disabled={done}
            >
              <Check className="size-3.5" />
              Mark as Done
            </button>
          ) : (
            <button
              className="btn btn-sm rounded-full border border-[#ccff00]/30 bg-[#ccff00] text-xs font-bold uppercase tracking-[0.08em] text-black hover:bg-[#c0f200] disabled:bg-[#c0f200]/40"
              onClick={handleAdd}
              disabled={!canAddToPlan}
            >
              <Plus className="size-3.5" />
              Add to Plan
            </button>
          )}
          <button
            className="btn btn-sm btn-square rounded-full border border-base-300 bg-transparent"
            onClick={handleRemove}
            aria-label={
              mode === "plan" ? "Remove from plan" : "Remove from saved"
            }
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
