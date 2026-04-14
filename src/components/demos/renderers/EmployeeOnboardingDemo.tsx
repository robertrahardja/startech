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

interface ChecklistItem {
  task: string;
  owner: string;
  due_by: string;
  category: string;
}

const TABS = ["Offer Letter", "NDA", "Checklist"] as const;

export default function EmployeeOnboardingDemo(props: DemoRendererProps) {
  const { onSubmit, isLoading, result, error, clearResult } = props;
  const [employeeName, setEmployeeName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [startDate, setStartDate] = useState("");
  const [salary, setSalary] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      employee_name: employeeName,
      job_title: jobTitle,
      department,
      start_date: startDate,
      salary,
    });
  };

  if (result) {
    const offerLetterPreview = result.offer_letter_preview as string;
    const ndaPreview = result.nda_preview as string;
    const checklist = (result.checklist as ChecklistItem[]) || [];

    // Group checklist by category
    const grouped: Record<string, ChecklistItem[]> = {};
    for (const item of checklist) {
      if (!grouped[item.category]) grouped[item.category] = [];
      grouped[item.category].push(item);
    }

    return (
      <div className="animate-fade-in-up space-y-4">
        {/* Tabs */}
        <div className="rounded-xl border border-st-border bg-st-bg-card p-5">
          <div className="mb-4 flex gap-1 rounded-lg border border-st-border p-1">
            {TABS.map((tab, i) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(i)}
                className={`flex-1 rounded-md px-3 py-2 text-[12px] font-light tracking-wide transition-all duration-300 ${
                  activeTab === i
                    ? "bg-white/[0.08] text-white"
                    : "text-st-text-muted hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Offer Letter */}
          {activeTab === 0 && (
            <div className="rounded-lg border border-st-border/50 bg-white/[0.02] p-5">
              <p className="whitespace-pre-wrap text-[13px] font-light leading-[1.7] text-white">
                {offerLetterPreview}
              </p>
            </div>
          )}

          {/* NDA */}
          {activeTab === 1 && (
            <div className="rounded-lg border border-st-border/50 bg-white/[0.02] p-5">
              <p className="whitespace-pre-wrap text-[13px] font-light leading-[1.7] text-white">
                {ndaPreview}
              </p>
            </div>
          )}

          {/* Checklist */}
          {activeTab === 2 && (
            <div className="space-y-4">
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  <h4 className="mb-2 text-[12px] font-light tracking-wide text-st-text-muted">
                    {category}
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-[13px] font-light">
                      <thead>
                        <tr className="border-b border-st-border text-left text-st-text-muted">
                          <th className="pb-2 pr-4 font-light">Task</th>
                          <th className="pb-2 pr-4 font-light">Owner</th>
                          <th className="pb-2 font-light">Due By</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, i) => (
                          <tr
                            key={i}
                            className={i % 2 === 1 ? "bg-white/[0.02]" : ""}
                          >
                            <td className="py-2 pr-4 text-white">{item.task}</td>
                            <td className="py-2 pr-4 text-white">{item.owner}</td>
                            <td className="py-2 text-white">{item.due_by}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {error && (
          <p className="text-[13px] font-light text-red-400/80">{error}</p>
        )}

        <div className="flex gap-3">
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
        <p>Enter the new employee&apos;s details — full name, job title, department, start date, and monthly salary in SGD. The AI will generate Singapore-compliant documents: an offer letter (with CPF, probation, and notice period), an NDA, and a first-week onboarding checklist.</p>
        <p className="mt-2 text-[12px] text-st-gold-light/60">The generated documents follow Singapore Employment Act standards. These are previews — the full version produces legally reviewed, company-branded documents.</p>
      </div>
      <div>
        <label className={labelClass}>Employee Name</label>
        <input
          type="text"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          placeholder="Full name"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Job Title</label>
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Job title"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Department</label>
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          placeholder="Department"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Start Date</label>
        <input
          type="text"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start date, e.g. 1 Feb 2026"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Monthly Salary</label>
        <input
          type="text"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="Monthly salary in SGD"
          className={inputClass}
        />
      </div>

      {error && (
        <p className="text-[13px] font-light text-red-400/80">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading || !employeeName.trim() || !jobTitle.trim()}
        className="relative w-full overflow-hidden rounded-xl border border-st-gold/30 bg-st-gold/15 px-4 py-3.5 text-[13px] font-light tracking-wide text-st-gold-light transition-all duration-500 hover:bg-st-gold/25 hover:border-st-gold/50 disabled:opacity-40"
      >
        {isLoading ? "Generating..." : "Generate Onboarding Pack"}
      </button>
    </form>
  );
}
