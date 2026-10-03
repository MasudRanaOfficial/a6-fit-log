"use client";

import { useEffect, useState } from "react";
import { HeroBanner } from "@/components/home/HeroBanner";
import { Library } from "@/components/home/Library";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Workout } from "@/types/workout";
import { getWorkouts } from "@/utils/api";
import { CircleAlert } from "lucide-react";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getWorkouts()
      .then((data) => {
        if (!active) return;
        setWorkouts(data);
      })
      .catch((requestError) => {
        if (!active) return;
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to load workouts.",
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <HeroBanner />

      <section id="library" className="section-space page-shell">
        {loading && (
          <div className="flex min-h-80 items-center justify-center">
            <LoadingSpinner label="Loading workouts…" />
          </div>
        )}

        {!loading && error && (
          <div className="alert border border-error/30 bg-error/10 text-error shadow-none">
            <CircleAlert className="size-5" />
            <div>
              <p className="font-semibold">
                Could not load the workout library.
              </p>
              <p className="text-sm opacity-80">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && <Library workouts={workouts} />}
      </section>
    </>
  );
}
