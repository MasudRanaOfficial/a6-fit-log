"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmark, ClipboardList, Dumbbell, Menu, X } from "lucide-react";
import { useState } from "react";
import { useWorkoutContext } from "@/context/WorkoutContext";
import Image from "next/image";

export function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = useWorkoutContext();
  const [open, setOpen] = useState(false);

  const isHome = pathname === "/";
  const isPlan = pathname === "/my-plan";

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-[#0b0d10]/95 backdrop-blur">
      <div className="page-shell flex h-[74px] items-center justify-between gap-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="FitLog logo"
            className="size-10 object-contain"
          />
          <div className="hidden sm:block">
            <div className="font-display text-xl leading-none">FITLOG</div>
            <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.22em] text-base-content/50">
              Workout Library
            </div>
          </div>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary navigation"
        >
          <Link
            href="/"
            className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] transition ${
              isHome
                ? "bg-white text-black"
                : "text-base-content/60 hover:text-white"
            }`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] transition ${
              isPlan
                ? "bg-white text-black"
                : "text-base-content/60 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <Link
            href="/my-plan"
            className="badge h-9 rounded-full border-0 bg-[#ccff00] px-3 font-bold text-black hover:bg-[#c0f200]"
          >
            <ClipboardList className="mr-1 size-3.5" />
            Plan <span>{planCount}</span>
          </Link>
          <Link
            href="/my-plan"
            className="badge h-9 rounded-full border border-base-content/20 bg-transparent px-3 font-bold text-base-content hover:border-base-content/40"
          >
            <Bookmark className="mr-1 size-3.5" />
            Saved <span>{savedCount}</span>
          </Link>
        </div>

        <button
          className="btn btn-square btn-ghost md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-base-300 md:hidden">
          <div className="page-shell flex flex-col gap-2 py-4">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] ${
                isHome ? "bg-[#ccff00] text-black" : "bg-base-200"
              }`}
            >
              <Dumbbell className="size-4" />
              Workout
            </Link>
            <Link
              href="/my-plan"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] ${
                isPlan ? "bg-[#ccff00] text-black" : "bg-base-200"
              }`}
            >
              <ClipboardList className="size-4" />
              My Plan
            </Link>
            <div className="mt-2 flex gap-2 border-t border-base-300 pt-4">
              <Link
                href="/my-plan"
                onClick={() => setOpen(false)}
                className="badge h-9 flex-1 rounded-full border-0 bg-[#ccff00] font-bold text-black"
              >
                Plan {planCount}
              </Link>
              <Link
                href="/my-plan"
                onClick={() => setOpen(false)}
                className="badge h-9 flex-1 rounded-full border border-base-content/20 bg-transparent font-bold"
              >
                Saved {savedCount}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
