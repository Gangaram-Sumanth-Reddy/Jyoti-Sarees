export default function Loading() {
  return (
    <div
      className="relative min-h-[calc(100dvh-var(--site-header-height,4rem))] w-full bg-white"
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Loading page…</span>
      <div className="route-loading-bar" aria-hidden="true" />
    </div>
  );
}
