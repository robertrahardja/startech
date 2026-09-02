interface SectionCtaProps {
  /** The ask, phrased for what the reader has just read. */
  prompt: string;
  /** Button label. Names the action, never "learn more". */
  action: string;
  /** Where it goes. Defaults to the contact form. */
  href?: string;
}

/**
 * The ask that closes a section.
 *
 * Straight Line asks for the order more than once — after the pitch, then
 * again after each objection is answered, tightening each time. A page that
 * only asks in the hero and the footer makes a reader who is convinced at
 * the case studies scroll past four more sections to act on it.
 *
 * These are deliberately quieter than the hero button: a line of text and a
 * plain link, not a filled button. The primary CTA should stay the loudest
 * thing on the page, and a gradient button repeated six times would read as
 * pressure rather than as an offer.
 */
export default function SectionCta({
  prompt,
  action,
  href = "#contact",
}: SectionCtaProps) {
  return (
    <div className="mt-14 flex flex-col gap-4 border-t border-st-border pt-8 sm:flex-row sm:items-center sm:justify-between">
      <p className="max-w-3xl text-pretty text-[15px] leading-[1.7] text-st-text-muted">
        {prompt}
      </p>
      <a
        href={href}
        className="group inline-flex min-h-[44px] flex-none items-center gap-2.5 self-start text-[14px] font-medium text-st-text transition-colors duration-300 hover:text-st-blue-light sm:self-auto"
      >
        {action}
        <svg
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </a>
    </div>
  );
}
