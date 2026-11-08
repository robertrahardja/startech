import { useState } from "react";
import EmployeeOnboardingResult from "./EmployeeOnboardingResult";

interface DemoRendererProps {
  onSubmit: (input: Record<string, string>) => void;
  isLoading: boolean;
  result: Record<string, unknown> | null;
  error: string | null;
  clearResult?: () => void;
}

const inputClass =
  "w-full min-h-[44px] rounded-lg border border-st-border bg-st-surface px-3.5 py-3 text-[13px] font-normal text-st-text placeholder-st-text-muted/50 outline-none transition-colors duration-300 focus:border-st-border";
const labelClass =
  "mb-1.5 block text-[11px] font-medium tracking-wide text-st-text/60";

export default function EmployeeOnboardingDemo(props: DemoRendererProps) {
  const { onSubmit, isLoading, result, error, clearResult } = props;
  const [employeeName, setEmployeeName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [startDate, setStartDate] = useState("");
  const [salary, setSalary] = useState("");

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
    return <EmployeeOnboardingResult result={result} error={error} clearResult={clearResult} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-lg border border-st-gold/20 bg-st-gold/[0.04] px-4 py-3.5 text-[13px] font-normal leading-relaxed text-st-gold-light/80">
        <p className="mb-2 font-medium text-st-gold-light">How to use this demo</p>
        <p>Enter the new employee&apos;s details — full name, job title, department, start date, and monthly salary in SGD. The AI drafts an offer letter (with probation and notice period), an NDA, and a first-week onboarding checklist.</p>
        <p className="mt-2 text-[12px] text-st-gold-light/60">These are drafts for HR to review and adapt to your own templates. They are not legal advice.</p>
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
        <p className="text-[13px] font-normal text-red-400/80">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading || !employeeName.trim() || !jobTitle.trim()}
        className="relative w-full overflow-hidden rounded-xl border border-st-gold/30 bg-st-gold/15 px-4 py-3.5 text-[13px] font-normal tracking-wide text-st-gold-light transition-all duration-500 hover:bg-st-gold/25 hover:border-st-gold/50 disabled:opacity-40"
      >
        {isLoading ? "Generating..." : "Generate Onboarding Pack"}
      </button>
    </form>
  );
}
