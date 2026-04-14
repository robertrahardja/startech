import { useState } from "react";

interface DemoRendererProps {
  onSubmit: (input: Record<string, string>) => void;
  isLoading: boolean;
  result: Record<string, unknown> | null;
  error: string | null;
  clearResult: () => void;
}

const inputClass =
  "w-full min-h-[44px] rounded-lg border border-white/20 bg-white/[0.05] px-3.5 py-3 text-[13px] font-light text-white placeholder-st-text-muted/50 outline-none transition-colors duration-300 focus:border-white/40";
const labelClass =
  "mb-1.5 block text-[11px] font-light tracking-wide text-white/60";

function buildPlainText(result: Record<string, unknown>): string {
  const title = result.title as string;
  const company = result.company as string;
  const location = result.location as string;
  const employmentType = result.employment_type as string;
  const summary = result.summary as string;
  const responsibilities = (result.responsibilities as string[]) || [];
  const requirements = (result.requirements as string[]) || [];
  const niceToHave = (result.nice_to_have as string[]) || [];
  const benefits = (result.benefits as string[]) || [];
  const salaryRange = result.salary_range as string;

  const lines: string[] = [];
  lines.push(title);
  lines.push(`${company} - ${location} (${employmentType})`);
  lines.push("");
  lines.push(summary);
  lines.push("");

  if (responsibilities.length) {
    lines.push("Responsibilities:");
    responsibilities.forEach((r) => lines.push(`- ${r}`));
    lines.push("");
  }
  if (requirements.length) {
    lines.push("Requirements:");
    requirements.forEach((r) => lines.push(`- ${r}`));
    lines.push("");
  }
  if (niceToHave.length) {
    lines.push("Nice to Have:");
    niceToHave.forEach((r) => lines.push(`- ${r}`));
    lines.push("");
  }
  if (benefits.length) {
    lines.push("Benefits:");
    benefits.forEach((r) => lines.push(`- ${r}`));
    lines.push("");
  }
  if (salaryRange) {
    lines.push(`Salary Range: ${salaryRange}`);
  }

  return lines.join("\n");
}

export default function JobPostingWriterDemo(props: DemoRendererProps) {
  const { onSubmit, isLoading, result, error, clearResult } = props;
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [requirements, setRequirements] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      job_title: jobTitle,
      company_name: companyName,
      location,
      requirements,
    });
  };

  const handleCopy = () => {
    if (!result) return;
    const text = buildPlainText(result);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (result) {
    const title = result.title as string;
    const company = result.company as string;
    const loc = result.location as string;
    const employmentType = result.employment_type as string;
    const summary = result.summary as string;
    const responsibilities = (result.responsibilities as string[]) || [];
    const reqs = (result.requirements as string[]) || [];
    const niceToHave = (result.nice_to_have as string[]) || [];
    const benefits = (result.benefits as string[]) || [];
    const salaryRange = result.salary_range as string;

    const sections: { heading: string; items: string[] }[] = [
      { heading: "Responsibilities", items: responsibilities },
      { heading: "Requirements", items: reqs },
      { heading: "Nice to Have", items: niceToHave },
      { heading: "Benefits", items: benefits },
    ];

    return (
      <div className="animate-fade-in-up space-y-4">
        <div className="rounded-xl border border-st-border bg-st-bg-card p-5">
          {/* Header */}
          <div className="mb-4 border-b border-st-border pb-4">
            <h3 className="text-[16px] font-light text-white">{title}</h3>
            <p className="mt-1 text-[13px] font-light text-st-text-muted">
              {company} &middot; {loc}
            </p>
            <span className="mt-2 inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-light tracking-wide text-st-text-muted">
              {employmentType}
            </span>
          </div>

          {/* Summary */}
          <p className="mb-5 text-[13px] font-light leading-relaxed text-white/80">
            {summary}
          </p>

          {/* Sections */}
          {sections.map(
            (section) =>
              section.items.length > 0 && (
                <div key={section.heading} className="mb-4">
                  <h4 className="mb-2 text-[12px] font-light tracking-wide text-st-text-muted">
                    {section.heading}
                  </h4>
                  <ul className="space-y-1.5">
                    {section.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-[13px] font-light text-white/80"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-st-text-muted" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
          )}

          {/* Salary */}
          {salaryRange && (
            <div className="mt-4 border-t border-st-border pt-3">
              <p className="text-[13px] font-light text-st-text-muted">
                Salary Range:{" "}
                <span className="text-white">{salaryRange}</span>
              </p>
            </div>
          )}
        </div>

        {error && (
          <p className="text-[13px] font-light text-red-400/80">{error}</p>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="hero-btn-secondary relative overflow-hidden rounded-xl px-6 py-3 text-[13px] font-light tracking-wide text-st-text-muted transition-all duration-500 hover:text-white"
          >
            {copied ? "Copied!" : "Copy to Clipboard"}
          </button>
          <button
            type="button"
            onClick={clearResult}
            className="hero-btn-secondary relative overflow-hidden rounded-xl px-6 py-3 text-[13px] font-light tracking-wide text-st-text-muted transition-all duration-500 hover:text-white"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-lg border border-st-gold/20 bg-st-gold/[0.04] px-4 py-3.5 text-[13px] font-light leading-relaxed text-st-gold-light/80">
        <p className="mb-2 font-medium text-st-gold-light">How to use this demo</p>
        <p>Enter the job title, your company name, work location, and list the key skills and experience required. The AI will generate a complete, optimized job listing with summary, responsibilities, requirements, benefits, and a salary range in SGD.</p>
        <p className="mt-2 text-[12px] text-st-gold-light/60">Tip: Include your industry and company culture for more tailored results. The AI follows Singapore job market conventions and MOM guidelines.</p>
      </div>
      <div>
        <label className={labelClass}>Job Title</label>
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="e.g. Senior Software Engineer"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Company Name</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Your company name"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Singapore, Remote..."
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Key Requirements</label>
        <textarea
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          placeholder="Key skills and experience needed..."
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && (
        <p className="text-[13px] font-light text-red-400/80">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading || !jobTitle.trim() || !companyName.trim()}
        className="relative w-full overflow-hidden rounded-xl border border-st-gold/30 bg-st-gold/15 px-4 py-3.5 text-[13px] font-light tracking-wide text-st-gold-light transition-all duration-500 hover:bg-st-gold/25 hover:border-st-gold/50 disabled:opacity-40"
      >
        {isLoading ? "Generating..." : "Generate"}
      </button>
    </form>
  );
}
