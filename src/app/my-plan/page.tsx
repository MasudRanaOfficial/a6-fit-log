"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useWorkout } from "@/context/WorkoutContext";
import { SortOption } from "@/types/workout";

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortOption, setSortOption] = useState<SortOption>("Duration");

  const { planList, savedList, removeFromPlan, removeFromSaved, markAsDone } =
    useWorkout();

  const metrics = useMemo(() => {
    return planList.reduce(
      (acc, curr) => ({
        exercises: acc.exercises + 1,
        minutes: acc.minutes + (Number(curr.duration) || 0),
        calories: acc.calories + (Number(curr.caloriesBurned) || 0),
      }),
      { exercises: 0, minutes: 0, calories: 0 },
    );
  }, [planList]);

  const displayedList = useMemo(() => {
    const list = [...(activeTab === "plan" ? planList : savedList)];
    if (sortOption === "Duration") list.sort((a, b) => a.duration - b.duration);
    if (sortOption === "Calories")
      list.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
    if (sortOption === "Rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [activeTab, planList, savedList, sortOption]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-black uppercase text-white">MY PLAN</h1>
      <p className="text-gray-400 text-sm mt-1">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-4 my-6">
        <div className="bg-[#161920] border border-[#262b36] p-4 rounded-xl">
          <p className="text-xs text-gray-400 uppercase">Exercises</p>
          <p className="text-2xl font-bold mt-1">{metrics.exercises}</p>
        </div>
        <div className="bg-[#161920] border border-[#262b36] p-4 rounded-xl">
          <p className="text-xs text-gray-400 uppercase">Minutes</p>
          <p className="text-2xl font-bold mt-1">{metrics.minutes}</p>
        </div>
        <div className="bg-[#161920] border border-[#262b36] p-4 rounded-xl">
          <p className="text-xs text-gray-400 uppercase">Calories</p>
          <p className="text-2xl font-bold mt-1">{metrics.calories}</p>
        </div>
      </div>

      {/* Tabs & Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#262b36] pb-3 my-6">
        <div className="tabs tabs-bordered">
          <button
            onClick={() => setActiveTab("plan")}
            className={`tab ${activeTab === "plan" ? "tab-active !border-[#ccff00] text-[#ccff00]" : "text-gray-400"}`}
          >
            Today&apos;s Plan ({planList.length})
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`tab ${activeTab === "saved" ? "tab-active !border-[#ccff00] text-[#ccff00]" : "text-gray-400"}`}
          >
            Saved ({savedList.length})
          </button>
        </div>
        {displayedList.length > 0 && (
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="select select-bordered select-xs bg-[#161920] border-[#262b36]"
          >
            <option value="Duration">Sort by Duration</option>
            <option value="Calories">Sort by Calories</option>
            <option value="Rating">Sort by Rating</option>
          </select>
        )}
      </div>

      {/* Content */}
      {displayedList.length === 0 ? (
        <div className="text-center py-16 bg-[#161920]/40 rounded-xl border border-[#262b36]">
          <h3 className="font-bold text-lg">NOTHING HERE YET</h3>
          <p className="text-gray-400 text-xs mt-1">
            Browse the library and add a lift to get moving.
          </p>
          <Link
            href="/"
            className="btn btn-sm bg-[#ccff00] text-black hover:bg-[#b8e600] border-none font-bold mt-4"
          >
            Go to Workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {displayedList.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between p-4 rounded-xl border bg-[#161920] ${
                item.isDone
                  ? "border-green-900/50 opacity-60"
                  : "border-[#262b36]"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4
                    className={`font-bold text-sm uppercase ${item.isDone ? "line-through text-gray-500" : ""}`}
                  >
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {item.duration}m • {item.caloriesBurned} kcal
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/workout/${item.id}`}
                  className="btn btn-xs btn-ghost text-gray-400"
                >
                  View
                </Link>
                {activeTab === "plan" && (
                  <button
                    onClick={() => {
                      markAsDone(item.id);
                      toast.success(
                        item.isDone ? "Marked incomplete" : "Completed!",
                      );
                    }}
                    className={`btn btn-xs ${item.isDone ? "btn-success" : "btn-outline"}`}
                  >
                    ✓
                  </button>
                )}
                <button
                  onClick={() => {
                    if (activeTab === "plan") {
                      removeFromPlan(item.id);
                      toast.success("Removed from plan");
                    } else {
                      removeFromSaved(item.id);
                      toast.success("Removed from saved");
                    }
                  }}
                  className="btn btn-xs btn-error btn-outline"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
