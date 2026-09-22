import { useRef, type ReactNode } from "react";

/**
 * Card with a cursor-following radial highlight on hover.
 * Ported from ref/startech_design/frontend/demo (features/dark/SpotlightCard.tsx),
 * adapted to the site's own border/surface tokens — no external dependency.
 */
export default function SpotlightCard({
  children,
  className = "",
  size = 400,
}: {
  children: ReactNode;
  className?: string;
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        ref.current!.style.setProperty("--x", `${e.clientX - r.left}px`);
        ref.current!.style.setProperty("--y", `${e.clientY - r.top}px`);
      }}
      className={`group relative overflow-hidden rounded-xl border border-st-border bg-st-bg-card transition-colors duration-300 hover:border-st-border-hover ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(${size}px circle at var(--x,50%) var(--y,50%), rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
