import { useEffect, useId, useRef, useState } from "react";
import { useI18n } from "../../i18n";
import type { DemoLead } from "../../types";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          renderButton: (parent: HTMLElement, options: Record<string, unknown>) => void;
        };
      };
    };
  }
}

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;
const SCRIPT_SRC = "https://accounts.google.com/gsi/client";

let scriptPromise: Promise<void> | null = null;

/** Loads the Google Identity Services script once, shared across every demo card. */
function loadGoogleScript(): Promise<void> {
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Identity Services"));
    document.head.appendChild(script);
  });

  return scriptPromise;
}

/**
 * The client-side decode below is a UI convenience (showing a name while the
 * button renders) — it is NOT trusted for anything that matters. The server
 * verifies the token's signature, issuer, audience, and expiry before any
 * lead is written or any AI call is made.
 */
function decodeUnverifiedName(idToken: string): string | null {
  try {
    const payload = idToken.split(".")[1];
    const json = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return typeof json.name === "string" ? json.name : null;
  } catch {
    return null;
  }
}

export default function GoogleSignIn({
  title,
  onSignedIn,
}: {
  title: string;
  onSignedIn: (lead: DemoLead) => void;
}) {
  const { t } = useI18n();
  const buttonRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    CLIENT_ID ? "loading" : "error"
  );
  const domId = useId();

  useEffect(() => {
    if (!CLIENT_ID) return;

    let cancelled = false;

    loadGoogleScript()
      .then(() => {
        if (cancelled || !window.google || !buttonRef.current) return;

        window.google.accounts.id.initialize({
          client_id: CLIENT_ID,
          callback: (response) => {
            const name = decodeUnverifiedName(response.credential);
            onSignedIn({
              email: "", // filled in by the server from the verified token
              name: name || undefined,
              idToken: response.credential,
            });
          },
        });

        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: "filled_black",
          size: "large",
          shape: "pill",
          text: "continue_with",
          width: 280,
        });

        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [onSignedIn]);

  return (
    <div className="card rounded-xl p-6 sm:p-8">
      <div className="mb-6 h-px w-16 gold-glimmer" />

      <h3 className="mb-2 text-base font-medium tracking-wide text-st-text">
        {t.demos.signIn.title.replace("{title}", title)}
      </h3>
      <p className="mb-6 text-[13px] font-normal leading-[1.7] text-st-text-muted">
        {t.demos.signIn.subtitle}
      </p>

      {status === "error" && (
        <p className="text-[13px] font-normal text-st-text-muted/70">
          {t.demos.signIn.notConfigured}
        </p>
      )}

      {status !== "error" && <div ref={buttonRef} id={`gsi-button-${domId}`} />}
    </div>
  );
}
