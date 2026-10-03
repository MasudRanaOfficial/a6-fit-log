"use client";

import Link from "next/link";
import { useWorkout } from "@/context/WorkoutContext";

export default function Navbar() {
  const { planList, savedList } = useWorkout();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#222731] bg-[#0f1115]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#161920] border border-[#262b36] flex items-center justify-center text-[#ccff00] group-hover:border-[#ccff00] transition-colors">
            {/* Dumbbell Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M6 5v14M18 5v14M3 8v8M21 8v8M6 12h12"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="font-black text-xl tracking-wider text-white uppercase font-sans">
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </Link>

        {/* Right: Saved & Today's Plan Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Saved Workouts Button */}
          <Link
            href="/my-plan"
            className="btn btn-sm h-10 px-3 sm:px-4 bg-[#161920] hover:bg-[#1f242e] border-[#262b36] hover:border-gray-600 text-gray-200 normal-case rounded-lg font-medium flex items-center gap-2 transition-all"
          >
            {/* Bookmark Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            <span className="text-xs sm:text-sm">Saved</span>
            <span className="badge badge-sm bg-[#222731] text-gray-300 border-none font-bold px-1.5 py-0.5">
              {savedList.length}
            </span>
          </Link>

          {/* Today's Plan Button */}
          <Link
            href="/my-plan"
            className="btn btn-sm h-10 px-3 sm:px-4 bg-[#ccff00] hover:bg-[#b8e600] text-black border-none normal-case rounded-lg font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(204,255,0,0.15)] transition-all"
          >
            {/* Clipboard / Plan Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
            <span className="text-xs sm:text-sm">Plan</span>
            <span className="badge badge-sm bg-black text-[#ccff00] border-none font-extrabold px-1.5 py-0.5">
              {planList.length}/5
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
