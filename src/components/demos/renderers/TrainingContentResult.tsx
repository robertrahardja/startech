import { useState } from "react";
import ResultActions from "./ResultActions";

interface QuizQuestion {
  question: string;
  options: string[];
  correct_answer_index: number;
}

interface CourseModule {
  title: string;
  duration_minutes: number;
  objectives: string[];
  content_summary: string;
  quiz: QuizQuestion[];
}

/** The generated course: one accordion card per module, each with its own quiz. */
export default function TrainingContentResult({
  result,
  error,
  clearResult,
}: {
  result: Record<string, unknown>;
  error: string | null;
  clearResult?: () => void;
}) {
  const [expandedModule, setExpandedModule] = useState<number | null>(0);
  const modules = (result.modules as CourseModule[]) || [];

  return (
    <div className="animate-fade-in-up space-y-4">
      <div className="rounded-xl border border-st-border bg-st-bg-card p-5">
        <h3 className="text-[15px] font-normal text-st-text">{result.course_title as string}</h3>
        <p className="mt-1 text-[12px] font-normal text-st-text-muted">
          {modules.length} modules &middot; {result.total_duration_hours as number} hours total
        </p>
      </div>

      <div className="space-y-3">
        {modules.map((mod, mi) => (
          <ModuleCard
            key={mi}
            mod={mod}
            index={mi}
            expanded={expandedModule === mi}
            onToggle={() => setExpandedModule(expandedModule === mi ? null : mi)}
          />
        ))}
      </div>

      <ResultActions error={error} clearResult={clearResult} />
    </div>
  );
}

function ModuleCard({
  mod,
  index,
  expanded,
  onToggle,
}: {
  mod: CourseModule;
  index: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-xl border border-st-border bg-st-bg-card">
      <button type="button" onClick={onToggle} className="flex w-full items-center justify-between px-5 py-4 text-left">
        <div className="flex items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-st-surface text-[11px] font-medium text-st-text-muted">
            {index + 1}
          </span>
          <span className="text-[13px] font-normal text-st-text">{mod.title}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-st-surface px-2 py-0.5 text-[11px] font-medium text-st-text-muted">
            {mod.duration_minutes} min
          </span>
          <svg
            className={`h-4 w-4 text-st-text-muted transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </button>

      {expanded && (
        <div className="space-y-4 border-t border-st-border px-5 pb-5 pt-4">
          <div>
            <span className="text-[11px] font-medium text-st-text-muted">Learning Objectives</span>
            <ul className="mt-1 space-y-1">
              {mod.objectives.map((obj, i) => (
                <li key={i} className="flex gap-2 text-[13px] font-normal leading-[1.7] text-st-text">
                  <span className="mt-1 text-st-text-muted/50">&bull;</span>
                  {obj}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-[11px] font-medium text-st-text-muted">Content Summary</span>
            <p className="mt-1 text-[13px] font-normal leading-[1.7] text-st-text">{mod.content_summary}</p>
          </div>

          {mod.quiz?.length > 0 && <Quiz questions={mod.quiz} />}
        </div>
      )}
    </div>
  );
}

function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="-my-[10px] inline-flex min-h-[44px] items-center text-[12px] font-normal text-st-text-muted transition-colors duration-300 hover:text-st-text"
      >
        {visible ? "Hide Quiz" : "Show Quiz"} ({questions.length} questions)
      </button>
      {visible && (
        <div className="mt-3 space-y-4">
          {questions.map((q, qi) => (
            <QuizCard key={qi} question={q} number={qi + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function QuizCard({ question, number }: { question: QuizQuestion; number: number }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="rounded-lg border border-st-border/50 bg-st-surface p-4">
      <p className="mb-2 text-[13px] font-normal text-st-text">
        {number}. {question.question}
      </p>
      <div className="space-y-1.5">
        {question.options.map((opt, oi) => (
          <div
            key={oi}
            className={`rounded-md px-3 py-1.5 text-[13px] font-normal ${
              revealed && oi === question.correct_answer_index ? "bg-emerald-400/10 text-emerald-400" : "text-st-text-muted"
            }`}
          >
            {String.fromCharCode(65 + oi)}. {opt}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setRevealed((r) => !r)}
        className="inline-flex min-h-[44px] items-center text-[11px] font-medium text-st-text-muted transition-colors duration-300 hover:text-st-text"
      >
        {revealed ? "Hide Answer" : "Reveal Answer"}
      </button>
    </div>
  );
}
