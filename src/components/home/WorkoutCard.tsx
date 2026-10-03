import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";
import { Workout } from "@/types/workout";
import Image from "next/image";

export function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="card card-surface overflow-hidden rounded-2xl transition duration-200 hover:-translate-y-1"
    >
      <figure className="aspect-16/10 overflow-hidden bg-base-200">
        <Image
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition duration-300 hover:scale-[1.03]"
          loading="lazy"
        />
      </figure>
      <div className="card-body gap-4 p-5">
        <div className="flex flex-wrap gap-2">
          {workout.categories.map((category) => (
            <span
              key={category}
              className="badge badge-sm rounded-full border-[#ccff00]/20 bg-[#ccff00]/10 px-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#ccff00]"
            >
              {category}
            </span>
          ))}
        </div>
        <div>
          <h3 className="font-display text-2xl uppercase leading-none text-white">
            {workout.name}
          </h3>
          <p className="muted-copy mt-2 line-clamp-1 text-sm">
            {workout.equipment.join(", ")}
          </p>
        </div>
        <div className="flex items-center gap-4 border-t border-base-300 pt-3 text-xs font-semibold text-base-content/55">
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="size-3.5" />
            {workout.duration} min
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Flame className="size-3.5" />
            {workout.calories} kcal
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Star className="size-3.5 fill-[#ccff00] text-[#ccff00]" />
            {workout.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}
