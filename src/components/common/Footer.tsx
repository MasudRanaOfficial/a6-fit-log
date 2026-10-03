import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#222731] bg-[#0b0d10] py-6 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-extrabold tracking-wider text-base text-white">
            FITLOG
          </span>
        </Link>

        {/* Copyright Notice */}
        <p className="text-xs text-gray-500 text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
