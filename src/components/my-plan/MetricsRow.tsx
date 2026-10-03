import { Activity, Clock3, Flame } from "lucide-react";

export function MetricsRow({
  exercises,
  minutes,
  calories,
}: {
  exercises: number;
  minutes: number;
  calories: number;
}) {
  const stats = [
    { label: "Exercises", value: exercises, icon: Activity },
    { label: "Minutes", value: minutes, icon: Clock3 },
    { label: "Calories", value: calories, icon: Flame },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {stats.map(({ label, value, icon: Icon }) => (
        <div key={label} className="stat card-surface rounded-2xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="stat-label">{label}</span>
            <Icon className="size-4 text-[#ccff00]" />
          </div>
          <div className="font-display text-4xl leading-none text-white">
            {value}
          </div>
        </div>
      ))}
    </div>
  );
}
