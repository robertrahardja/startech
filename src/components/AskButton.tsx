import AiIcon from "./AiIcon";

interface AskButtonProps {
  onClick: () => void;
  /** True while the sticky CTA bar occupies the same corner. */
  hidden?: boolean;
}

/**
 * Floating button that opens the Ask StarTech panel.
 *
 * Phones only. From md: the nav bar is expanded and its own "Ask us" button
 * is permanently on screen, so a second floating one is just clutter; below
 * that the nav collapses to a hamburger and this is the only way in.
 *
 * Deliberately small and slightly transparent, since it sits fixed over body
 * copy. Stays at 44px, the minimum comfortable tap target.
 */
export default function AskButton({ onClick, hidden = false }: AskButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Ask StarTech AI"
      style={{
        // The CTA bar occupies this corner and already offers the primary
        // action, so the button retires while it is up rather than stacking
        // on top of it. Set inline because .star-whirl's keyframes would
        // otherwise win over a utility class.
        transform: hidden ? "translateY(6rem) scale(0.85)" : undefined,
        opacity: hidden ? 0 : undefined,
        pointerEvents: hidden ? "none" : undefined,
      }}
      tabIndex={hidden ? -1 : 0}
      aria-hidden={hidden}
      className="ask-fab star-whirl hero-btn-primary fixed bottom-4 right-4 z-40 flex h-11 w-11 items-center justify-center !rounded-full text-white/90 opacity-90 transition-all duration-500 hover:opacity-100 sm:bottom-6 sm:right-6 sm:h-12 sm:w-12 sm:opacity-100 md:hidden"
    >
      <AiIcon className="h-4 w-4" />
    </button>
  );
}
