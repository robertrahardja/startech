import type { ReactNode } from "react";

/**
 * Card with a rotating conic-gradient border, reserved for the single
 * "hero" tile in the showcase grid — per the bento-grid guidance that
 * motion belongs on one tile, not all of them.
 * Ported from ref/startech_design/frontend/demo (features/dark/ConicBorderCard.tsx),
 * recoloured to the brand gradient (blue → pink) instead of a generic accent.
 */
export default function ConicBorderCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`showcase-conic-border relative rounded-xl bg-st-bg-card p-px ${className}`}
      style={{ "--angle": "0deg" } as React.CSSProperties}
    >
      <div className="relative h-full rounded-[inherit] bg-st-bg-card">
        {children}
      </div>
    </div>
  );
}
