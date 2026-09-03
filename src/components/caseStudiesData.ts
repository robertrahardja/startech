/**
 * Shape of a case study. The content itself lives in the locale catalogues
 * (src/i18n/*.ts) so it can be translated; this file only describes the type
 * the component consumes.
 *
 * Every figure must be checkable. If a number cannot be walked through on a
 * call, it does not belong in `metric`.
 */
export interface CaseStudy {
  sector: string;
  market: string;
  title: string;
  /** The state of the world before we arrived. */
  before: string;
  /** What was actually built. */
  built: string;
  /** The hard, checkable number or fact. */
  metric: { figure: string; caption: string };
  /** Concrete details a buyer can interrogate. */
  detail: string[];
}
