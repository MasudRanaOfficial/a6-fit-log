export function LoadingSpinner({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <span
        className="loading loading-spinner loading-lg text-[#ccff00]"
        aria-hidden="true"
      />
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-base-content/50">
        {label}
      </p>
    </div>
  );
}
