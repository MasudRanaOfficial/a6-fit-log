import HeroBanner from "@/components/home/HeroBanner";
import WorkoutCard from "@/components/home/WorkoutCard";
import { getAllWorkouts } from "@/utils/api";

export default async function HomePage() {
  const workouts = await getAllWorkouts();

  return (
    <div>
      <HeroBanner />
      <section id="library" className="py-16 max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold uppercase text-white">
            THE LIBRARY
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Lifts covering every major muscle group.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </section>
    </div>
  );
}
