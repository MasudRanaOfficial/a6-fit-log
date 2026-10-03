export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
      <span className="loading loading-spinner loading-lg text-[#ccff00]"></span>
      <p className="text-xs text-gray-400 tracking-wider uppercase">
        Loading FitLog...
      </p>
    </div>
  );
}
