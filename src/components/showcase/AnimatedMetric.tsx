import NumberFlow from "@number-flow/react";

/**
 * Animates a metric into view once, digit by digit, when the showcase
 * grid scrolls into view. Purely decorative — the underlying value is
 * always the real cached-demo figure, never invented.
 */
export default function AnimatedMetric({
  value,
  suffix = "",
  play,
  className = "",
}: {
  value: number;
  suffix?: string;
  play: boolean;
  className?: string;
}) {
  return (
    <span className={`tabular-nums ${className}`}>
      <NumberFlow
        value={play ? value : 0}
        transformTiming={{ duration: 900, easing: "ease-out" }}
        willChange
      />
      {suffix}
    </span>
  );
}
