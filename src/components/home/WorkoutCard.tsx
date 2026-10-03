import Link from "next/link";
import Image from "next/image";
import { Workout } from "@/types/workout";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="card bg-[#161920] border border-[#262b36] hover:border-[#ccff00]/50 transition-all overflow-hidden rounded-xl"
    >
      <figure className="relative h-48 w-full bg-[#1b1f28]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </figure>
      <div className="card-body p-5">
        <div className="flex flex-wrap gap-1 mb-1">
          {workout.muscleGroups?.map((group, idx) => (
            <span
              key={idx}
              className="badge badge-xs bg-[#242a36] text-gray-300 border-none"
            >
              {group}
            </span>
          ))}
        </div>
        <h3 className="card-title text-base text-white uppercase">
          {workout.name}
        </h3>
        <p className="text-xs text-gray-400">Equipment: {workout.equipment}</p>
        <div className="card-actions justify-between items-center pt-3 border-t border-[#222732] text-xs text-gray-400">
          <span>⏱️ {workout.duration}m</span>
          <span>🔥 {workout.caloriesBurned} kcal</span>
          <span className="text-yellow-400 font-bold">★ {workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}
