"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { Workout } from "@/types/workout";
import { getWorkoutById } from "@/utils/api";
import { useWorkout } from "@/context/WorkoutContext";

export default function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToPlan, addToSaved, isPlanFull, planList, savedList } =
    useWorkout();

  useEffect(() => {
    getWorkoutById(id)
      .then(setWorkout)
      .catch(() => toast.error("Could not load workout"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <span className="loading loading-spinner text-[#ccff00]"></span>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="p-10 text-center">
        <p>Workout not found.</p>
        <Link href="/" className="btn btn-sm btn-ghost mt-4">
          Back to Library
        </Link>
      </div>
    );
  }

  const inPlan = planList.some(
    (item) => String(item.id) === String(workout.id),
  );
  const inSaved = savedList.some(
    (item) => String(item.id) === String(workout.id),
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Link
        href="/"
        className="text-xs text-gray-400 hover:text-white mb-6 inline-block"
      >
        ← Back to Library
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 relative h-96 lg:h-[480px] rounded-xl overflow-hidden bg-[#161920] border border-[#262b36]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex gap-1 mb-2">
              {workout.muscleGroups?.map((group, idx) => (
                <span
                  key={idx}
                  className="badge bg-[#242a36] text-gray-300 border-none"
                >
                  {group}
                </span>
              ))}
            </div>
            <h1 className="text-3xl font-black uppercase text-white">
              {workout.name}
            </h1>
            <p className="text-gray-400 text-sm mt-3">{workout.description}</p>

            {/* Specs Table */}
            <div className="overflow-x-auto my-6 border border-[#262b36] rounded-lg">
              <table className="table table-sm">
                <tbody>
                  <tr className="border-b border-[#262b36]">
                    <td className="text-gray-400">EQUIPMENT</td>
                    <td className="text-right">{workout.equipment}</td>
                  </tr>
                  <tr className="border-b border-[#262b36]">
                    <td className="text-gray-400">DIFFICULTY</td>
                    <td className="text-right">{workout.difficulty}</td>
                  </tr>
                  <tr className="border-b border-[#262b36]">
                    <td className="text-gray-400">SETS & REPS</td>
                    <td className="text-right">
                      {workout.sets} sets × {workout.reps}
                    </td>
                  </tr>
                  <tr className="border-b border-[#262b36]">
                    <td className="text-gray-400">DURATION</td>
                    <td className="text-right">{workout.duration} min</td>
                  </tr>
                  <tr>
                    <td className="text-gray-400">CALORIES</td>
                    <td className="text-right">
                      {workout.caloriesBurned} kcal
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Instructions */}
            <div className="space-y-2 mb-6">
              <h3 className="font-bold text-sm uppercase text-gray-300">
                Instructions
              </h3>
              {workout.instructions?.map((step, idx) => (
                <div
                  key={idx}
                  className="flex gap-3 text-xs text-gray-300 bg-[#161920] p-3 rounded border border-[#262b36]"
                >
                  <span className="text-[#ccff00] font-bold">{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-[#262b36]">
            <button
              onClick={() => {
                if (inPlan) toast.error("Already in plan!");
                else if (isPlanFull) toast.error("Daily limit of 5 reached!");
                else {
                  addToPlan(workout);
                  toast.success("Added to today's plan!");
                }
              }}
              disabled={inPlan || isPlanFull}
              className="btn flex-1 bg-[#ccff00] text-black hover:bg-[#b8e600] border-none font-bold"
            >
              {inPlan
                ? "Added to Plan"
                : isPlanFull
                  ? "Plan Limit Reached"
                  : "Add to today's plan"}
            </button>
            <button
              onClick={() => {
                if (inSaved) toast.error("Already saved!");
                else {
                  addToSaved(workout);
                  toast.success("Saved for later!");
                }
              }}
              disabled={inSaved}
              className="btn btn-outline border-gray-600 text-white flex-1"
            >
              {inSaved ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
