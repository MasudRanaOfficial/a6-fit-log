"use client";

import Link from "next/link";
import { useWorkout } from "@/context/WorkoutContext";

export default function Navbar() {
  const { planList, savedList } = useWorkout();

  return (
    <nav className="sticky top-0 z-50 bg-[#0f1115]/90 backdrop-blur border-b border-[#222731]">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-extrabold text-xl tracking-wider text-white">
            FITLOG
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="btn btn-sm btn-ghost gap-2 text-gray-300"
          >
            Saved
            <span className="badge badge-sm badge-neutral">
              {savedList.length}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="btn btn-sm bg-[#ccff00] text-black hover:bg-[#b8e600] border-none font-bold"
          >
            Plan
            <span className="badge badge-sm bg-black text-[#ccff00] border-none">
              {planList.length}/5
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
