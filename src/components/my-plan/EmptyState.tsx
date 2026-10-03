import Link from "next/link";
import { ArrowUpRight, Bookmark, ClipboardList } from "lucide-react";

export function EmptyState({ tab }: { tab: "plan" | "saved" }) {
  const isSaved = tab === "saved";

  return (
    <div className="card-surface rounded-3xl p-10 text-center sm:p-14">
      {isSaved ? (
        <Bookmark className="mx-auto size-9 text-[#ccff00]" />
      ) : (
        <ClipboardList className="mx-auto size-9 text-[#ccff00]" />
      )}
      <p className="font-display mt-5 text-4xl uppercase leading-none">
        Nothing Here Yet
      </p>
      <p className="muted-copy mx-auto mt-3 max-w-md text-sm leading-6">
        {isSaved
          ? "Save lifts from the library so you can come back to them later."
          : "Browse the library and add a lift to get today moving."}
      </p>
      <Link
        href="/"
        className="btn btn-primary mt-6 rounded-full px-6 text-xs font-black uppercase tracking-[0.12em]"
      >
        Go to workouts
        <ArrowUpRight className="size-4" />
      </Link>
    </div>
  );
}
