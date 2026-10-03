import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-base-300 bg-[#080a0d]">
      <div className="page-shell flex min-h-24 flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="FitLog logo"
            width={32}
            height={32}
            className="size-8 object-contain"
          />
          <span className="font-display text-lg">FITLOG</span>
        </Link>
        <p className="text-xs text-base-content/45">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
