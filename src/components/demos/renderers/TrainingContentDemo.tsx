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

export default function TrainingContentDemo(props: DemoRendererProps) {
  const { onSubmit, isLoading, result, error, clearResult } = props;
  const [sopText, setSopText] = useState("");
  const [expandedModule, setExpandedModule] = useState<number | null>(0);
  const [showQuiz, setShowQuiz] = useState<Record<number, boolean>>({});
  const [revealAnswers, setRevealAnswers] = useState<Record<string, boolean>>(
    {}
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ sop_text: sopText });
  };

  const toggleModule = (index: number) => {
    setExpandedModule(expandedModule === index ? null : index);
  };

  const toggleQuiz = (moduleIndex: number) => {
    setShowQuiz((prev) => ({ ...prev, [moduleIndex]: !prev[moduleIndex] }));
  };

  const toggleAnswer = (moduleIndex: number, questionIndex: number) => {
    const key = `${moduleIndex}-${questionIndex}`;
    setRevealAnswers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (result) {
    const courseTitle = result.course_title as string;
    const totalDuration = result.total_duration_hours as number;
    const modules = (result.modules as CourseModule[]) || [];

    return (
      <div className="animate-fade-in-up space-y-4">
        {/* Course header */}
        <div className="rounded-xl border border-st-border bg-st-bg-card p-5">
          <h3 className="text-[15px] font-light text-white">{courseTitle}</h3>
          <p className="mt-1 text-[12px] font-light text-st-text-muted">
            {modules.length} modules &middot; {totalDuration} hours total
          </p>
        </div>

        {/* Modules */}
        <div className="space-y-3">
          {modules.map((mod, mi) => {
            const isExpanded = expandedModule === mi;
            const quizVisible = showQuiz[mi] || false;

            return (
              <div
                key={mi}
                className="rounded-xl border border-st-border bg-st-bg-card"
              >
                {/* Module header */}
                <button
                  type="button"
                  onClick={() => toggleModule(mi)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.05] text-[11px] font-light text-st-text-muted">
                      {mi + 1}
                    </span>
                    <span className="text-[13px] font-light text-white">
                      {mod.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-white/[0.05] px-2 py-0.5 text-[11px] font-light text-st-text-muted">
                      {mod.duration_minutes} min
                    </span>
                    <svg
                      className={`h-4 w-4 text-st-text-muted transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </div>
                </button>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="space-y-4 border-t border-st-border px-5 pb-5 pt-4">
                    {/* Objectives */}
                    <div>
                      <span className="text-[11px] font-light text-st-text-muted">
                        Learning Objectives
                      </span>
                      <ul className="mt-1 space-y-1">
                        {mod.objectives.map((obj, i) => (
                          <li
                            key={i}
                            className="flex gap-2 text-[13px] font-light leading-[1.7] text-white"
                          >
                            <span className="mt-1 text-st-text-muted/50">
                              &bull;
                            </span>
                            {obj}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Content summary */}
                    <div>
                      <span className="text-[11px] font-light text-st-text-muted">
                        Content Summary
                      </span>
                      <p className="mt-1 text-[13px] font-light leading-[1.7] text-white">
                        {mod.content_summary}
                      </p>
                    </div>

                    {/* Quiz toggle */}
                    {mod.quiz && mod.quiz.length > 0 && (
                      <div>
                        <button
                          type="button"
                          onClick={() => toggleQuiz(mi)}
                          className="text-[12px] font-light text-st-text-muted transition-colors duration-300 hover:text-white"
                        >
                          {quizVisible ? "Hide Quiz" : "Show Quiz"} (
                          {mod.quiz.length} questions)
                        </button>

                        {quizVisible && (
                          <div className="mt-3 space-y-4">
                            {mod.quiz.map((q, qi) => {
                              const answerKey = `${mi}-${qi}`;
                              const isRevealed =
                                revealAnswers[answerKey] || false;

                              return (
                                <div
                                  key={qi}
                                  className="rounded-lg border border-st-border/50 bg-white/[0.02] p-4"
                                >
                                  <p className="mb-2 text-[13px] font-light text-white">
                                    {qi + 1}. {q.question}
                                  </p>
                                  <div className="space-y-1.5">
                                    {q.options.map((opt, oi) => (
                                      <div
                                        key={oi}
                                        className={`rounded-md px-3 py-1.5 text-[13px] font-light ${
                                          isRevealed &&
                                          oi === q.correct_answer_index
                                            ? "bg-emerald-400/10 text-emerald-400"
                                            : "text-st-text-muted"
                                        }`}
                                      >
                                        {String.fromCharCode(65 + oi)}. {opt}
                                      </div>
                                    ))}
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => toggleAnswer(mi, qi)}
                                    className="mt-2 text-[11px] font-light text-st-text-muted transition-colors duration-300 hover:text-white"
                                  >
                                    {isRevealed
                                      ? "Hide Answer"
                                      : "Reveal Answer"}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
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
        <p>Paste your Standard Operating Procedure (SOP), process document, or step-by-step guide. The AI will transform it into a structured training course — with learning modules, objectives, content summaries, and quiz questions with multiple-choice answers.</p>
        <p className="mt-2 text-[12px] text-st-gold-light/60">The output follows SkillsFuture course structure standards. Include as much procedural detail as possible — the AI will organize it into logical learning modules with assessments.</p>
      </div>
      <div>
        <label className={labelClass}>SOP or Process Document</label>
        <textarea
          value={sopText}
          onChange={(e) => setSopText(e.target.value)}
          placeholder="Paste your SOP, procedure, or process document..."
          rows={8}
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && (
        <p className="text-[13px] font-light text-red-400/80">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading || !sopText.trim()}
        className="relative w-full overflow-hidden rounded-xl border border-st-gold/30 bg-st-gold/15 px-4 py-3.5 text-[13px] font-light tracking-wide text-st-gold-light transition-all duration-500 hover:bg-st-gold/25 hover:border-st-gold/50 disabled:opacity-40"
      >
        {isLoading ? "Generating..." : "Generate Training Course"}
      </button>
    </form>
  );
}
