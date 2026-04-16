import { Suspense } from "react";
import { SectionHeader } from "../Products";
import DemoShell from "./DemoShell";
import { DEMO_REGISTRY } from "./demoRegistry";

export default function DemoSection({ slug, title }: { slug: string; title: string }) {
  const DemoRenderer = DEMO_REGISTRY[slug];
  if (!DemoRenderer) return null;

  return (
    <section id="try-it" className="py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        <SectionHeader
          label="Try It"
          title="See it in action"
          subtitle="See AI-powered results instantly. Customize with your own data."
        />
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-st-border border-t-st-gold-light" />
            </div>
          }
        >
          <DemoShell demoType={slug} title={title}>
            {(props) => <DemoRenderer {...props} />}
          </DemoShell>
        </Suspense>
      </div>
    </section>
  );
}
