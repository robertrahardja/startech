import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Button that nudges toward the cursor and springs back on leave.
 * Ported from ref/startech_design/frontend/demo (features/delight/MagneticButton.tsx).
 * Scoped to this section only — not applied site-wide.
 */
export default function MagneticCta({
  children,
  onClick,
  className = "",
  strength = 0.25,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      style={{ x, y }}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={className}
    >
      {children}
    </motion.button>
  );
}
