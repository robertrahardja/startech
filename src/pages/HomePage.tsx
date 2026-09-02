import Hero from "../components/Hero";
import CaseStudies from "../components/CaseStudies";
import Products from "../components/Products";
import Industries from "../components/Industries";
import Approach from "../components/Approach";
import Contact from "../components/Contact";

interface HomePageProps {
  onAskAi: () => void;
}

/**
 * The marketing homepage, in reading order: the claim, then the proof,
 * then what we sell, then how we work.
 *
 * Section order and membership change with the marketing story, which is why
 * this lives here rather than in App — the router should not churn when the
 * homepage narrative is reordered.
 */
export default function HomePage({ onAskAi }: HomePageProps) {
  return (
    <>
      <Hero onAskAi={onAskAi} />
      <CaseStudies />
      <Products />
      <Industries />
      <Approach />
      <Contact />
    </>
  );
}
