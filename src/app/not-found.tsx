import Link from "next/link";
import { ArrowLeft, TriangleAlert } from "lucide-react";

export default function NotFound() {
  return (
    <section className="page-shell flex min-h-[65vh] items-center justify-center py-16">
      <div className="card-surface w-full max-w-2xl rounded-3xl p-8 text-center sm:p-12">
        <TriangleAlert className="mx-auto size-10 text-[#ccff00]" />
        <p className="mt-5 font-display text-sm uppercase tracking-[0.24em] text-[#ccff00]">
          404 / NOT FOUND
        </p>
        <h1 className="font-display mt-3 text-6xl uppercase leading-none text-white sm:text-8xl">
          Wrong Route.
        </h1>
        <p className="muted-copy mx-auto mt-5 max-w-md leading-7">
          This page does not exist. Humanity invented URLs and immediately
          created broken ones.
        </p>
        <Link href="/" className="btn btn-primary mt-8 rounded-full px-6">
          <ArrowLeft className="size-4" />
          Back to workouts
        </Link>
      </div>
    </section>
  );
}
