import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export function HeroBanner() {
  return (
    <section className="page-shell pt-8 sm:pt-10">
      <div className="relative overflow-hidden rounded-3xl border border-base-300 bg-[#13171d]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(204,255,0,0.08),transparent_34%)]" />
        <div className="relative grid min-h-[430px] items-center gap-8 px-6 py-10 md:grid-cols-[1.1fr_0.9fr] md:px-10 lg:px-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#ccff00]">
              <span className="size-2 rounded-full bg-[#ccff00]" />
              Workout Library
            </span>
            <h1 className="font-display mt-4 text-5xl uppercase leading-[0.9] text-white sm:text-6xl lg:text-7xl">
              Train With Intent. Log Every Set.
            </h1>
            <p className="muted-copy mt-5 max-w-xl text-sm leading-7 sm:text-base">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>
            <Link
              href="#library"
              className="btn btn-primary mt-7 rounded-full px-5 text-xs font-black uppercase tracking-[0.14em]"
            >
              <ArrowDown className="size-4" />
              Browse workouts
            </Link>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-[420px]">
              <div className="absolute -inset-6 rounded-full bg-[#ccff00]/10 blur-3xl" />
              <Image
                src="/banner.png"
                alt="Workout illustration"
                className="relative w-full object-contain"
              />
              <div className="absolute bottom-3 right-3 hidden items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur sm:flex">
                <ArrowUpRight className="size-3.5 text-[#ccff00]" />
                Train smart
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
