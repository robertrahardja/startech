import { useCallback, useRef, useState } from "react";
import { useI18n } from "../../i18n";
import type { HttpExchange, SingpassAppType } from "../../lib/singpass/client";
import type { JsonObject } from "../../lib/singpass/jose";
import {
  STEP_IDS,
  formatExchange,
  runDemoFlow,
  type FlowOutcome,
  type PendingLogin,
  type StepId,
  type StepState,
} from "./demoFlow";

/**
 * The interactive FAPI 2.0 walkthrough on /singpass. Each step shows what
 * it did in plain words, the values it produced, and the exact HTTP
 * exchange (tokens shortened). The login itself pauses for the visitor,
 * the way a real Singpass login pauses for the person.
 */

type Steps = Record<StepId, StepState>;

const emptySteps = (): Steps => {
  const steps = {} as Steps;
  for (const id of STEP_IDS) steps[id] = { status: "pending", exchanges: [], facts: [] };
  return steps;
};

const BUTTON_PRIMARY =
  "hero-btn-primary inline-flex min-h-[46px] items-center justify-center rounded-xl px-6 py-3 text-[13px] font-normal tracking-wide text-st-text disabled:cursor-not-allowed disabled:opacity-60";
const BUTTON_SECONDARY =
  "inline-flex min-h-[46px] items-center justify-center rounded-xl border border-st-border px-6 py-3 text-[13px] font-normal tracking-wide text-st-text-muted transition-colors duration-300 hover:border-st-border-hover hover:text-st-text";

export default function FapiDemo() {
  const { t } = useI18n();
  const s = t.singpass;
  const [appType, setAppType] = useState<SingpassAppType>("login");
  const [steps, setSteps] = useState<Steps>(emptySteps);
  const [phase, setPhase] = useState<"idle" | "running" | "finished">("idle");
  const [outcome, setOutcome] = useState<FlowOutcome | null>(null);
  const [pending, setPending] = useState<PendingLogin | null>(null);
  const decide = useRef<((approve: boolean) => void) | null>(null);

  const visible = STEP_IDS.filter((id) => appType === "myinfo" || id !== "userinfo");

  const run = useCallback(async () => {
    setSteps(emptySteps());
    setOutcome(null);
    setPhase("running");
    const result = await runDemoFlow(appType, {
      onStep: (id, patch) =>
        setSteps((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } })),
      onExchange: (id, exchange: HttpExchange) =>
        setSteps((prev) => ({
          ...prev,
          [id]: { ...prev[id], exchanges: [...prev[id].exchanges, exchange] },
        })),
      login: (info) =>
        new Promise<boolean>((resolve) => {
          setPending(info);
          decide.current = (approve) => {
            decide.current = null;
            setPending(null);
            resolve(approve);
          };
        }),
    });
    setOutcome(result);
    setPhase("finished");
  }, [appType]);

  const summary =
    phase === "running"
      ? s.running
      : outcome?.kind === "done"
        ? s.allPassed
        : outcome?.kind === "cancelled"
          ? s.cancelled
          : outcome?.kind === "error"
            ? s.failed
            : "";

  return (
    <div className="card rounded-2xl p-5 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <fieldset disabled={phase === "running"}>
          <legend className="mb-2 text-[11px] font-medium tracking-wide text-st-text-muted">
            {s.appType}
          </legend>
          <div className="inline-flex rounded-xl border border-st-border p-1">
            {(["login", "myinfo"] as const).map((type) => (
              <button
                key={type}
                type="button"
                aria-pressed={appType === type}
                onClick={() => {
                  setAppType(type);
                  setSteps(emptySteps());
                  setOutcome(null);
                  setPhase("idle");
                }}
                className={`min-h-[44px] rounded-lg px-4 text-[13px] transition-colors duration-200 ${
                  appType === type
                    ? "bg-st-bg-elevated text-st-text"
                    : "text-st-text-muted hover:text-st-text"
                }`}
              >
                {type === "login" ? s.appLogin : s.appMyinfo}
              </button>
            ))}
          </div>
        </fieldset>
        <button
          type="button"
          className={BUTTON_PRIMARY}
          disabled={phase === "running"}
          onClick={() => void run()}
          data-testid="singpass-run"
        >
          {phase === "idle" ? s.run : s.runAgain}
        </button>
      </div>

      <p className="mt-5 text-[13px] leading-[1.6] text-st-text-muted" role="status" aria-live="polite">
        {summary}
      </p>

      <ol className="mt-4 space-y-3">
        {visible.map((id, index) => (
          <StepCard
            key={id}
            id={id}
            index={index + 1}
            state={steps[id]}
            pending={id === "authorize" ? pending : null}
            onDecide={(approve) => decide.current?.(approve)}
          />
        ))}
      </ol>

      {outcome?.kind === "done" && (
        <div className="mt-6 rounded-xl border border-st-border p-5" data-testid="singpass-result">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <h4 className="text-sm font-medium text-st-text">{s.resultTitle}</h4>
            <span className="rounded-full border border-st-border px-2.5 py-0.5 text-[11px] text-st-text-muted">
              {s.sample}
            </span>
          </div>
          <JsonBlock value={outcome.profile} />
        </div>
      )}
      {outcome?.kind === "error" && (
        <p className="mt-4 text-[13px] text-st-text-muted" role="alert">
          {outcome.message === "accepted" ? s.steps.replay.accepted : s.errorGeneric}
        </p>
      )}
    </div>
  );
}

function StepCard({
  id,
  index,
  state,
  pending,
  onDecide,
}: {
  id: StepId;
  index: number;
  state: StepState;
  pending: PendingLogin | null;
  onDecide: (approve: boolean) => void;
}) {
  const { t } = useI18n();
  const s = t.singpass;
  const copy = s.steps[id];
  const statusLabel = s.status[state.status];
  const hasDetail = state.facts.length > 0 || state.exchanges.length > 0;

  return (
    <li
      className="rounded-xl border border-st-border p-4 sm:p-5"
      data-step={id}
      data-status={state.status}
    >
      <div className="flex items-start gap-3">
        <StatusMark index={index} status={state.status} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <h4 className="text-[14px] font-medium text-st-text">{copy.title}</h4>
            <span className="text-[11px] tracking-wide text-st-text-muted">{statusLabel}</span>
          </div>
          <p className="mt-1 text-[13px] leading-[1.6] text-st-text-muted">{copy.body}</p>
          {id === "replay" && state.status === "done" && (
            <p className="mt-2 text-[13px] text-st-text">{s.steps.replay.refused}</p>
          )}
          {state.error && state.error !== "accepted" && (
            <p className="mt-2 break-words font-mono text-[12px] text-st-text">{state.error}</p>
          )}

          {pending && <MockLogin pending={pending} onDecide={onDecide} />}

          {hasDetail && (
            <details className="group mt-3">
              <summary className="flex min-h-[44px] cursor-pointer items-center text-[12px] text-st-text-muted underline-offset-4 hover:text-st-text hover:underline">
                {s.details}
              </summary>
              <div className="mt-2 space-y-3">
                {state.facts.map((fact) => (
                  <div key={fact.label}>
                    <div className="mb-1 font-mono text-[11px] text-st-text-muted">{fact.label}</div>
                    {typeof fact.value === "string" ? (
                      <code className="block break-all rounded-lg bg-st-bg-elevated px-3 py-2 font-mono text-[12px] text-st-text">
                        {fact.value}
                      </code>
                    ) : (
                      <JsonBlock value={fact.value} />
                    )}
                  </div>
                ))}
                {state.exchanges.map((exchange, i) => (
                  <Exchange key={i} exchange={exchange} />
                ))}
              </div>
            </details>
          )}
        </div>
      </div>
    </li>
  );
}

function MockLogin({
  pending,
  onDecide,
}: {
  pending: PendingLogin;
  onDecide: (approve: boolean) => void;
}) {
  const { t } = useI18n();
  const s = t.singpass;
  return (
    <div className="mt-4 rounded-xl border border-st-border-hover bg-st-bg-elevated p-4 sm:p-5" data-testid="singpass-login">
      <div className="flex flex-wrap items-center gap-2">
        <h5 className="text-[14px] font-medium text-st-text">{s.loginTitle}</h5>
        <span className="rounded-full border border-st-border px-2.5 py-0.5 text-[11px] text-st-text-muted">
          {s.sample}
        </span>
      </div>
      <p className="mt-2 text-[13px] leading-[1.6] text-st-text-muted">{s.loginBody}</p>
      <dl className="mt-3 grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1 text-[12px]">
        <dt className="text-st-text-muted">{s.loginRequested}</dt>
        <dd className="break-words font-mono text-st-text">{pending.scope}</dd>
        {pending.authenticationContextType && (
          <>
            <dt className="text-st-text-muted">{s.loginPurpose}</dt>
            <dd className="break-words font-mono text-st-text">{pending.authenticationContextType}</dd>
          </>
        )}
        <dt className="text-st-text-muted">{s.sample}</dt>
        <dd className="break-words text-st-text">
          {pending.sampleName} · {pending.sampleId}
        </dd>
      </dl>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button type="button" className={BUTTON_PRIMARY} onClick={() => onDecide(true)} data-testid="singpass-approve">
          {s.approve}
        </button>
        <button type="button" className={BUTTON_SECONDARY} onClick={() => onDecide(false)}>
          {s.cancel}
        </button>
      </div>
    </div>
  );
}

function StatusMark({ index, status }: { index: number; status: StepState["status"] }) {
  const tone =
    status === "done"
      ? "border-st-gold-light/70 text-st-gold-light"
      : status === "error"
        ? "border-st-text text-st-text"
        : status === "running" || status === "waiting"
          ? "border-st-blue-light text-st-blue-light animate-pulse"
          : "border-st-border text-st-text-muted";
  return (
    <span
      aria-hidden="true"
      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[11px] ${tone}`}
    >
      {status === "done" ? "✓" : status === "error" ? "!" : index}
    </span>
  );
}

function Exchange({ exchange }: { exchange: HttpExchange }) {
  const { request, response } = formatExchange(exchange);
  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
      <pre className="max-h-80 overflow-auto rounded-lg bg-st-bg-elevated p-3 font-mono text-[11.5px] leading-[1.55] whitespace-pre-wrap break-all text-st-text">
        {request}
      </pre>
      <pre className="max-h-80 overflow-auto rounded-lg bg-st-bg-elevated p-3 font-mono text-[11.5px] leading-[1.55] whitespace-pre-wrap break-all text-st-text">
        {response}
      </pre>
    </div>
  );
}

function JsonBlock({ value }: { value: JsonObject }) {
  return (
    <pre className="max-h-80 overflow-auto rounded-lg bg-st-bg-elevated p-3 font-mono text-[11.5px] leading-[1.55] whitespace-pre-wrap break-all text-st-text">
      {JSON.stringify(value, null, 2)}
    </pre>
  );
}
