import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl font-black text-[#262b36] tracking-widest select-none">
        404
      </h1>
      <h2 className="text-xl font-bold uppercase tracking-wider text-[#ccff00] mt-2">
        Lift Not Found
      </h2>
      <p className="text-gray-400 text-sm max-w-sm mt-2 mb-6">
        The routine or exercise you are looking for has been moved or does not
        exist in the library.
      </p>
      <Link
        href="/"
        className="btn btn-sm bg-[#ccff00] text-black hover:bg-[#b8e600] border-none font-bold px-6"
      >
        Back to Library
      </Link>
    </div>
  );
}
