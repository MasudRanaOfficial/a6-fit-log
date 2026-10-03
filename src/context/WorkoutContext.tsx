"use client";

import React, {
  credentials,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Workout, PlannedWorkout } from "@/types/workout";

interface WorkoutContextType {
  planList: PlannedWorkout[];
  savedList: Workout[];
  addToPlan: (workout: Workout) => boolean;
  removeFromPlan: (id: string | number) => void;
  addToSaved: (workout: Workout) => boolean;
  removeFromSaved: (id: string | number) => void;
  markAsDone: (id: string | number) => void;
  isPlanFull: boolean;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [planList, setPlanList] = useState<PlannedWorkout[]>([]);
  const [savedList, setSavedList] = useState<Workout[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedPlan = localStorage.getItem("fitlog_plan");
    const storedSaved = localStorage.getItem("fitlog_saved");
    if (storedPlan) setPlanList(JSON.parse(storedPlan));
    if (storedSaved) setSavedList(JSON.parse(storedSaved));
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("fitlog_plan", JSON.stringify(planList));
    }
  }, [planList, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("fitlog_saved", JSON.stringify(savedList));
    }
  }, [savedList, mounted]);

  const isPlanFull = planList.length >= 5;

  const addToPlan = (workout: Workout) => {
    if (
      isPlanFull ||
      planList.some((item) => String(item.id) === String(workout.id))
    ) {
      return false;
    }
    setPlanList((prev) => [...prev, { ...workout, isDone: false }]);
    return true;
  };

  const removeFromPlan = (id: string | number) => {
    setPlanList((prev) =>
      prev.filter((item) => String(item.id) !== String(id)),
    );
  };

  const addToSaved = (workout: Workout) => {
    if (savedList.some((item) => String(item.id) === String(workout.id))) {
      return false;
    }
    setSavedList((prev) => [...prev, workout]);
    return true;
  };

  const removeFromSaved = (id: string | number) => {
    setSavedList((prev) =>
      prev.filter((item) => String(item.id) !== String(id)),
    );
  };

  const markAsDone = (id: string | number) => {
    setPlanList((prev) =>
      prev.map((item) =>
        String(item.id) === String(id)
          ? { ...item, isDone: !item.isDone }
          : item,
      ),
    );
  };

  return (
    <WorkoutContext.Provider
      value={{
        planList,
        savedList,
        addToPlan,
        removeFromPlan,
        addToSaved,
        removeFromSaved,
        markAsDone,
        isPlanFull,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (!context)
    throw new Error("useWorkout must be used within a WorkoutProvider");
  return context;
}
