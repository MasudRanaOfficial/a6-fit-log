import { ListOrdered } from "lucide-react";
import { Workout } from "@/types/workout";

export function Instructions({ workout }: { workout: Workout }) {
  return (
    <section>
      <div className="mb-5 flex items-center gap-2">
        <ListOrdered className="size-5 text-[#ccff00]" />
        <h2 className="font-display text-3xl uppercase">Instructions</h2>
      </div>
      <ol className="space-y-3">
        {workout.instructions.map((step, index) => (
          <li
            key={`${step}-${index}`}
            className="flex gap-4 rounded-2xl border border-base-300 bg-base-200/50 p-4"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-xs font-black text-black">
              {index + 1}
            </span>
            <span className="muted-copy self-center text-sm leading-6">
              {step}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
