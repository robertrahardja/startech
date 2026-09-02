import AiIcon from "./AiIcon";

interface AskButtonProps {
  onClick: () => void;
}

/**
 * Floating button that opens the Ask StarTech panel.
 *
 * Sits fixed over the page, so it is deliberately small and slightly
 * transparent on phones — at full desktop size it lands on top of body copy
 * at narrow widths. Stays at 44px, the minimum comfortable tap target.
 */
export default function AskButton({ onClick }: AskButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Ask StarTech AI"
      className="star-whirl hero-btn-primary fixed bottom-4 right-4 z-40 flex h-11 w-11 items-center justify-center !rounded-full text-white/90 opacity-90 transition-all duration-500 hover:opacity-100 sm:bottom-6 sm:right-6 sm:h-12 sm:w-12 sm:opacity-100"
    >
      <AiIcon className="h-4 w-4" />
    </button>
  );
}
