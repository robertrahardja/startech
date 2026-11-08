import { useState } from "react";
import ResultActions from "./ResultActions";

interface ChecklistItem {
  task: string;
  owner: string;
  due_by: string;
  category: string;
}

const TABS = ["Offer Letter", "NDA", "Checklist"] as const;

/** The generated onboarding pack: offer letter, NDA and checklist, one tab each. */
export default function EmployeeOnboardingResult({
  result,
  error,
  clearResult,
}: {
  result: Record<string, unknown>;
  error: string | null;
  clearResult?: () => void;
}) {
  const [activeTab, setActiveTab] = useState(0);
  const checklist = (result.checklist as ChecklistItem[]) || [];

  return (
    <div className="animate-fade-in-up space-y-4">
      <div className="rounded-xl border border-st-border bg-st-bg-card p-5">
        <div className="mb-4 flex gap-1 rounded-lg border border-st-border p-1">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(i)}
              className={`flex-1 rounded-md px-3 py-2 text-[12px] font-normal tracking-wide transition-all duration-300 ${
                activeTab === i ? "bg-st-surface text-st-text" : "text-st-text-muted hover:text-st-text"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 0 && <DocumentPreview text={result.offer_letter_preview as string} />}
        {activeTab === 1 && <DocumentPreview text={result.nda_preview as string} />}
        {activeTab === 2 && <Checklist items={checklist} />}
      </div>

      <ResultActions error={error} clearResult={clearResult} />
    </div>
  );
}

function DocumentPreview({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-st-border/50 bg-st-surface p-5">
      <p className="whitespace-pre-wrap text-[13px] font-normal leading-[1.7] text-st-text">{text}</p>
    </div>
  );
}

function Checklist({ items }: { items: ChecklistItem[] }) {
  const grouped: Record<string, ChecklistItem[]> = {};
  for (const item of items) (grouped[item.category] ??= []).push(item);

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([category, rows]) => (
        <div key={category}>
          <h4 className="mb-2 text-[12px] font-normal tracking-wide text-st-text-muted">{category}</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] font-normal">
              <thead>
                <tr className="border-b border-st-border text-left text-st-text-muted">
                  <th className="pb-2 pr-4 font-normal">Task</th>
                  <th className="pb-2 pr-4 font-normal">Owner</th>
                  <th className="pb-2 font-normal">Due By</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((item, i) => (
                  <tr key={i} className={i % 2 === 1 ? "bg-st-surface" : ""}>
                    <td className="py-2 pr-4 text-st-text">{item.task}</td>
                    <td className="py-2 pr-4 text-st-text">{item.owner}</td>
                    <td className="py-2 text-st-text">{item.due_by}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
