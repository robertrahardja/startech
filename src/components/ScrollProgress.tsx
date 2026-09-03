/**
 * Reading-progress bar in the brand gradient, pinned to the top of the page.
 *
 * Driven entirely by the CSS scroll timeline (`animation-timeline: scroll()`
 * in `.scroll-progress`), so it costs no scroll listener and no main-thread
 * work. Where the timeline is unsupported the bar simply stays at scaleX(0)
 * and is invisible, which is the correct degradation for decoration.
 */
export default function ScrollProgress() {
  return <div className="scroll-progress" aria-hidden="true" />;
}
