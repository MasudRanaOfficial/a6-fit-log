"use client";

import { ChevronDown } from "lucide-react";

export type SortOption = "duration" | "calories" | "rating";

const options: Array<{ value: SortOption; label: string }> = [
  { value: "duration", label: "Duration" },
  { value: "calories", label: "Calories" },
  { value: "rating", label: "Rating" },
];

export function SortDropdown({
  value,
  onChange,
}: {
  value: SortOption;
  onChange: (value: SortOption) => void;
}) {
  return (
    <label className="relative flex items-center gap-3">
      <span className="text-xs font-bold uppercase tracking-[0.14em] text-base-content/45">
        Sort By
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as SortOption)}
        className="select select-bordered select-sm min-w-36 rounded-full border-base-300 bg-base-200 pr-9 text-xs font-bold uppercase tracking-[0.08em]"
        aria-label="Sort workouts by"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3.5 size-4 text-base-content/40" />
    </label>
  );
}
