"use client";

import Image from "next/image";

export default function HeroBanner() {
  const scrollToLibrary = () => {
    document.getElementById("library")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="border-b border-[#222731] py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <span className="text-xs font-bold text-[#ccff00] tracking-widest uppercase">
            WORKOUT LIBRARY
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase text-white mt-3 leading-tight">
            TRAIN WITH INTENT. <br /> LOG EVERY SET.
          </h1>
          <p className="text-gray-400 mt-4 text-sm sm:text-base max-w-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <button
            onClick={scrollToLibrary}
            className="mt-6 btn bg-[#ccff00] text-black hover:bg-[#b8e600] border-none font-bold px-6"
          >
            BROWSE WORKOUTS
          </button>
        </div>
        <div className="relative w-full h-[320px] sm:h-[420px] flex justify-center">
          <Image
            src="/banner.png"
            alt="Hero Graphic"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
