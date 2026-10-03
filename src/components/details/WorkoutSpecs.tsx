import { Workout } from "@/types/workout";

export function WorkoutSpecs({ workout }: { workout: Workout }) {
  const specs = [
    ["Equipment", workout.equipment.join(", ")],
    ["Difficulty", workout.difficulty],
    ["Sets", String(workout.sets)],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.calories} kcal`],
    ["Rating", workout.rating.toFixed(1)],
  ];

  return (
    <div className="rounded-2xl border border-base-300 bg-base-200/70 p-5">
      <div className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-[#ccff00]">
        Key specs
      </div>
      <div className="divide-y divide-base-300">
        {specs.map(([label, value]) => (
          <div
            key={label}
            className="grid grid-cols-[110px_1fr] gap-4 py-3 text-sm sm:grid-cols-[140px_1fr]"
          >
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-base-content/45">
              {label}
            </span>
            <span className="text-right font-semibold text-white">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
