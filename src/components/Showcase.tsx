import { useInView } from "../hooks/useInView";
import { useI18n } from "../i18n";
import Link from "./solutions/Link";
import SpotlightCard from "./showcase/SpotlightCard";
import ConicBorderCard from "./showcase/ConicBorderCard";
import AnimatedMetric from "./showcase/AnimatedMetric";
import MagneticCta from "./showcase/MagneticCta";
import { SHOWCASE_DEMOS, type ShowcaseDemo } from "./showcase/showcaseMeta";
import { SectionHeader } from "./Products";

const ICONS: Record<string, React.ReactNode> = {
  scan: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  chat: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
  ),
  calendar: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  ),
  document: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  pen: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  ),
  box: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  ),
  share: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
    </svg>
  ),
  globe: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  users: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  handshake: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3.15M10.05 4.575a1.575 1.575 0 013.15 0v3.15M10.05 4.575v3.15M3.75 7.725h16.5M3.75 7.725a3.375 3.375 0 00-3 3.345v1.68a3.375 3.375 0 003 3.345m16.5-8.37a3.375 3.375 0 013 3.345v1.68a3.375 3.375 0 01-3 3.345M3.75 16.095h16.5m-16.5 0a2.25 2.25 0 00-2.25 2.25v.75a2.25 2.25 0 002.25 2.25h16.5a2.25 2.25 0 002.25-2.25v-.75a2.25 2.25 0 00-2.25-2.25" />
    </svg>
  ),
  shield: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  graduation: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15v-3.75m0 0h10.5" />
    </svg>
  ),
  barchart: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
};

/**
 * Cards 1 and 2 (invoice scanner, chatbot) get the wide hero treatment —
 * they are the two most immediately legible demos to a first-time visitor.
 * Every other tile is a standard 1x1 spotlight card. Per the bento-grid
 * guidance this repo's design notes call out: equal cells read as a plain
 * grid, not a bento, and motion belongs on one hero tile, not all thirteen.
 */
const HERO_SLUG = "invoice-scanner";
const WIDE_SLUGS = new Set([HERO_SLUG, "compliance-checker"]);

function DemoCard({ demo, index }: { demo: ShowcaseDemo; index: number }) {
  const { t } = useI18n();
  const [ref, isInView] = useInView({ threshold: 0.15 });
  const isHero = demo.slug === HERO_SLUG;
  const isWide = WIDE_SLUGS.has(demo.slug);

  const Card = isHero ? ConicBorderCard : SpotlightCard;

  return (
    <div
      ref={ref}
      className={`reveal-scroll transition-all duration-700 ${isInView ? "reveal visible" : "reveal"} ${isWide ? "sm:col-span-2" : ""}`}
      style={{ transitionDelay: `${Math.min(index, 8) * 70}ms` }}
    >
      <Link href={`/solutions/${demo.slug}`} className="block h-full">
        <Card className="h-full p-6">
          <div className="flex h-full flex-col">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-st-surface text-st-text-muted transition-colors duration-300 group-hover:text-st-text">
                {ICONS[demo.icon]}
              </div>
              <span className="rounded-md bg-st-gold/10 px-2 py-0.5 text-[9px] font-medium tracking-[0.14em] uppercase text-st-gold-light">
                {t.showcase.sampleBadge}
              </span>
            </div>

            <h3 className="mb-1.5 text-sm font-medium tracking-wide text-st-text md:text-base">
              {demo.title}
            </h3>
            <p className="mb-5 flex-1 text-[13px] font-normal leading-[1.65] text-st-text-muted">
              {demo.tagline}
            </p>

            <div className="flex items-end justify-between gap-3 border-t border-st-border pt-4">
              <div className="min-w-0">
                {/* Not .gradient-text: that class clips to text via
                    background-clip: text, which does not reach through the
                    NumberFlow custom element's shadow DOM and renders the
                    digits invisible. A solid brand color reads the same at
                    this size. */}
                <div className="font-display text-2xl leading-none tracking-[-0.02em] text-st-blue-light md:text-3xl">
                  {demo.teaser.prefix}
                  <AnimatedMetric value={demo.teaser.value} play={isInView} />
                  {demo.teaser.suffix}
                </div>
                <div className="mt-1.5 text-[11px] font-normal leading-[1.5] text-st-text-muted/80">
                  {t.showcase.teasers[demo.teaser.labelKey]}
                </div>
              </div>
              <span className="shrink-0 text-[11px] font-medium tracking-[0.13em] uppercase text-st-text-muted/80 transition-colors duration-300 group-hover:text-st-gold-light">
                {t.showcase.tryIt} →
              </span>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
}

export default function Showcase() {
  const { t } = useI18n();
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section id="showcase" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionHeader
          label={t.showcase.eyebrow}
          title={t.showcase.title}
          subtitle={t.showcase.sub}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SHOWCASE_DEMOS.map((demo, i) => (
            <DemoCard key={demo.slug} demo={demo} index={i} />
          ))}
        </div>

        <div
          ref={ref}
          className={`mt-12 flex flex-col items-center gap-4 text-center transition-all duration-700 ${isInView ? "reveal visible" : "reveal"}`}
        >
          <p className="max-w-xl text-[13px] font-normal leading-[1.7] text-st-text-muted/80">
            {t.showcase.disclaimer}
          </p>
          <Link href="/solutions">
            <MagneticCta className="hero-btn-primary relative overflow-hidden rounded-xl px-7 py-3.5 text-[13px] font-normal tracking-wide text-st-text transition-all duration-500">
              {t.showcase.seeAll}
            </MagneticCta>
          </Link>
        </div>
      </div>
    </section>
  );
}
