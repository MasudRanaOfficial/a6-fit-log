import { notFound } from "next/navigation";
import { WorkoutDetails } from "@/components/details/WorkoutDetails";
import { getWorkoutById } from "@/utils/api";

export const dynamic = "force-dynamic";

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = await getWorkoutById(id).catch(() => null);

  if (!workout) {
    notFound();
  }

  return <WorkoutDetails workout={workout} />;
}
