/** The error line and "Try Again" button shown under a demo's result. */
export default function ResultActions({ error, clearResult }: { error: string | null; clearResult?: () => void }) {
  return (
    <>
      {error && <p className="text-[13px] font-normal text-red-400/80">{error}</p>}
      <div className="flex gap-3">
        {clearResult && (
          <button
            type="button"
            onClick={clearResult}
            className="hero-btn-secondary relative overflow-hidden rounded-xl px-6 py-3 text-[13px] font-normal tracking-wide text-st-text-muted transition-all duration-500 hover:text-st-text"
          >
            Try Again
          </button>
        )}
      </div>
    </>
  );
}
