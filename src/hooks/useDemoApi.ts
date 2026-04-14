import { useState, useCallback } from "react";
import type { DemoLead, DemoResponse } from "../types";

const STORAGE_KEY = "startech-demo-lead";

function getStoredLead(): DemoLead | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return null;
}

function storeLead(lead: DemoLead): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lead));
  } catch {}
}

export function useDemoApi(demoType: string) {
  const [lead, setLeadState] = useState<DemoLead | null>(getStoredLead);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const setLead = useCallback((newLead: DemoLead) => {
    setLeadState(newLead);
    storeLead(newLead);
  }, []);

  const submitDemo = useCallback(
    async (input: Record<string, string>) => {
      if (!lead?.email) {
        setError("Please enter your email first.");
        return;
      }

      setIsLoading(true);
      setError(null);
      setResult(null);

      try {
        const res = await fetch("/api/demo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
          body: JSON.stringify({
            type: demoType,
            email: lead.email,
            name: lead.name,
            company: lead.company,
            input,
          }),
        });

        const data: DemoResponse = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.error || "Demo failed. Please try again.");
        }

        setResult(data.result || null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [demoType, lead]
  );

  const clearResult = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { lead, setLead, submitDemo, isLoading, result, error, clearResult };
}
