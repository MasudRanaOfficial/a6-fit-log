"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Workout } from "@/types/workout";

const STORAGE_KEY = "fitlog-state";
const PLAN_LIMIT = 5;

type WorkoutContextValue = {
  plan: Workout[];
  saved: Workout[];
  doneIds: string[];
  planCount: number;
  savedCount: number;
  canAddToPlan: boolean;
  metrics: { exercises: number; minutes: number; calories: number };
  addToPlan: (workout: Workout) => void;
  saveForLater: (workout: Workout) => void;
  removeFromPlan: (id: string | number) => void;
  removeFromSaved: (id: string | number) => void;
  markAsDone: (id: string | number) => void;
  isInPlan: (id: string | number) => boolean;
  isSaved: (id: string | number) => boolean;
};

const WorkoutContext = createContext<WorkoutContextValue | null>(null);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [doneIds, setDoneIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<{
          plan: Workout[];
          saved: Workout[];
          doneIds: string[];
        }>;
        setPlan(Array.isArray(parsed.plan) ? parsed.plan : []);
        setSaved(Array.isArray(parsed.saved) ? parsed.saved : []);
        setDoneIds(Array.isArray(parsed.doneIds) ? parsed.doneIds : []);
      }
    } catch {
      setPlan([]);
      setSaved([]);
      setDoneIds([]);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ plan, saved, doneIds }));
  }, [plan, saved, doneIds, ready]);

  const addToPlan = (workout: Workout) => {
    if (plan.some((item) => String(item.id) === String(workout.id))) {
      toast("Already in today's plan");
      return;
    }

    if (plan.length >= PLAN_LIMIT) {
      toast("Today's plan is full. Finish a lift before adding another.");
      return;
    }

    setPlan((current) => [...current, workout]);
    toast.success("Added to today's plan");
  };

  const saveForLater = (workout: Workout) => {
    if (saved.some((item) => String(item.id) === String(workout.id))) {
      toast("Already saved for later");
      return;
    }

    setSaved((current) => [...current, workout]);
    toast.success("Saved for later");
  };

  const removeFromPlan = (id: string | number) => {
    setPlan((current) =>
      current.filter((item) => String(item.id) !== String(id)),
    );
    setDoneIds((current) => current.filter((item) => item !== String(id)));
  };

  const removeFromSaved = (id: string | number) => {
    setSaved((current) =>
      current.filter((item) => String(item.id) !== String(id)),
    );
  };

  const markAsDone = (id: string | number) => {
    setDoneIds((current) =>
      current.includes(String(id)) ? current : [...current, String(id)],
    );
  };

  const value = useMemo<WorkoutContextValue>(() => {
    const metrics = plan.reduce(
      (totals, workout) => ({
        exercises: totals.exercises + 1,
        minutes: totals.minutes + workout.duration,
        calories: totals.calories + workout.calories,
      }),
      { exercises: 0, minutes: 0, calories: 0 },
    );

    return {
      plan,
      saved,
      doneIds,
      planCount: plan.length,
      savedCount: saved.length,
      canAddToPlan: plan.length < PLAN_LIMIT,
      metrics,
      addToPlan,
      saveForLater,
      removeFromPlan,
      removeFromSaved,
      markAsDone,
      isInPlan: (id) => plan.some((item) => String(item.id) === String(id)),
      isSaved: (id) => saved.some((item) => String(item.id) === String(id)),
    };
  }, [plan, saved, doneIds]);

  return (
    <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
  );
}

export function useWorkoutContext() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkoutContext must be used inside WorkoutProvider");
  }
  return context;
}
