import { useEffect, useState } from "react";
import { useI18n } from "../../i18n";

/**
 * "Log in with Singpass (staging)": the real redirect to Singpass staging,
 * run server-side by worker/singpass-rp.ts. Renders nothing until the Worker
 * says staging is configured (SINGPASS_MODE = "staging"), so the mock demo
 * stays the only demo by default.
 *
 * After the login, the Worker sends the browser back to
 * /singpass?staging=<id>#demo; the id is read once and removed from the URL.
 */

const API = "/api/demo/singpass/staging";

type Result =
  | { kind: "none" }
  | { kind: "loading" }
  | { kind: "ok"; claims: Record<string, unknown> }
  | { kind: "cancelled" }
  | { kind: "failed" };

export default function StagingLogin() {
  const { t } = useI18n();
  const s = t.singpass;
  const [enabled, setEnabled] = useState(false);
  const [result, setResult] = useState<Result>({ kind: "none" });

  useEffect(() => {
    let live = true;
    fetch(`${API}/config`, { headers: { Accept: "application/json" } })
      .then((r) => (r.ok ? r.json() : { enabled: false }))
      .then((c: { enabled?: boolean }) => live && setEnabled(c.enabled === true))
      .catch(() => undefined);

    const params = new URLSearchParams(window.location.search);
    const id = params.get("staging");
    if (id) {
      // Drop the one-time id from the address bar either way.
      params.delete("staging");
      params.delete("reason");
      const query = params.toString();
      window.history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`);
      if (id === "error") {
        setResult({ kind: "failed" });
      } else {
        setResult({ kind: "loading" });
        fetch(`${API}/result?id=${encodeURIComponent(id)}`, { headers: { Accept: "application/json" } })
          .then((r) => (r.ok ? r.json() : { ok: false }))
          .then((r: { ok?: boolean; error?: string; claims?: Record<string, unknown> }) => {
            if (!live) return;
            if (r.ok && r.claims) setResult({ kind: "ok", claims: r.claims });
            else setResult({ kind: r.error === "cancelled" ? "cancelled" : "failed" });
          })
          .catch(() => live && setResult({ kind: "failed" }));
      }
    }
    return () => {
      live = false;
    };
  }, []);

  if (!enabled && result.kind === "none") return null;

  return (
    <div className="card mt-6 rounded-2xl p-5 sm:p-8" data-testid="singpass-staging">
      <h3 className="text-[15px] font-medium text-st-text">{s.stagingTitle}</h3>
      <p className="mt-2 max-w-3xl text-[13.5px] leading-[1.65] text-st-text-muted">{s.stagingBody}</p>
      {enabled && (
        <a
          href={`${API}/login`}
          className="hero-btn-primary mt-5 inline-flex min-h-[46px] items-center justify-center rounded-xl px-6 py-3 text-[13px] font-normal tracking-wide text-st-text"
        >
          {s.stagingButton}
        </a>
      )}
      <div role="status" aria-live="polite">
        {result.kind === "ok" && (
          <div className="mt-5">
            <h4 className="mb-2 text-[13px] font-medium text-st-text">{s.stagingResult}</h4>
            <pre className="max-h-80 overflow-auto rounded-lg bg-st-bg-elevated p-3 font-mono text-[11.5px] leading-[1.55] whitespace-pre-wrap break-all text-st-text">
              {JSON.stringify(result.claims, null, 2)}
            </pre>
          </div>
        )}
        {result.kind === "cancelled" && <p className="mt-4 text-[13px] text-st-text-muted">{s.stagingCancelled}</p>}
        {result.kind === "failed" && <p className="mt-4 text-[13px] text-st-text-muted">{s.stagingFailed}</p>}
      </div>
    </div>
  );
}
