import { Suspense } from "react";
import DemoShell from "./DemoShell";
import { DEMO_REGISTRY } from "./demoRegistry";

export default function DemoSection({ slug, title }: { slug: string; title: string }) {
  const DemoRenderer = DEMO_REGISTRY[slug];
  if (!DemoRenderer) return null;

  return (
    <section id="try-it" className="py-8 sm:py-10">
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
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
