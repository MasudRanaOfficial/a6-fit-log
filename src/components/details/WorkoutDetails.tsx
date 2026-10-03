"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Bookmark,
  Check,
  ClipboardPlus,
  Dumbbell,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { Workout } from "@/types/workout";
import { WorkoutSpecs } from "@/components/details/WorkoutSpecs";
import { Instructions } from "@/components/details/Instructions";
import { useWorkoutContext } from "@/context/WorkoutContext";
import Image from "next/image";

export function WorkoutDetails({ workout }: { workout: Workout }) {
  const { addToPlan, saveForLater, canAddToPlan, isInPlan, isSaved } =
    useWorkoutContext();

  const handlePlan = () => {
    if (isInPlan(workout.id)) {
      toast("Already in today's plan");
      return;
    }

    addToPlan(workout);
  };

  const handleSave = () => {
    saveForLater(workout);
  };

  return (
    <section className="page-shell section-space">
      <Link
        href="/"
        className="btn btn-ghost btn-sm mb-6 rounded-full text-xs uppercase tracking-[0.14em] text-base-content/55 hover:bg-base-200 hover:text-white"
      >
        <ArrowLeft className="size-4" />
        Back to library
      </Link>

      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="sticky top-[98px] overflow-hidden rounded-3xl border border-base-300 bg-base-200">
          <div className="aspect-square flex items-center justify-center bg-[#0b0d10] p-6 sm:p-10">
            <Image
              src={workout.image}
              alt={workout.name}
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#ccff00]">
            <Dumbbell className="size-4" />
            Workout Details
          </div>
          <h1 className="font-display mt-3 text-5xl uppercase leading-[0.9] sm:text-6xl">
            {workout.name}
          </h1>
          <p className="muted-copy mt-5 max-w-2xl leading-7">
            {workout.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {workout.categories.map((category) => (
              <span
                key={category}
                className="badge rounded-full border border-[#ccff00]/20 bg-[#ccff00]/10 px-3 text-xs font-bold uppercase tracking-[0.12em] text-[#ccff00]"
              >
                {category}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <WorkoutSpecs workout={workout} />
          </div>

          <div className="mt-8">
            <Instructions workout={workout} />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              className="btn btn-primary flex-1 rounded-full font-black uppercase tracking-[0.1em]"
              onClick={handlePlan}
              disabled={
                (!canAddToPlan && !isInPlan(workout.id)) || isInPlan(workout.id)
              }
              title={
                canAddToPlan
                  ? "Add this workout to today's plan"
                  : "Today's plan is full"
              }
            >
              {isInPlan(workout.id) ? (
                <Check className="size-4" />
              ) : (
                <ClipboardPlus className="size-4" />
              )}
              {isInPlan(workout.id) ? "In today's plan" : "Add to today's plan"}
            </button>
            <button
              className={`btn flex-1 rounded-full border font-black uppercase tracking-[0.1em] ${isSaved(workout.id) ? "border-[#ccff00] bg-[#ccff00]/10 text-[#ccff00]" : "btn-ghost border-base-300 bg-base-200"}`}
              onClick={handleSave}
            >
              <Bookmark className="size-4" />
              {isSaved(workout.id) ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
