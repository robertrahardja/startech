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

export default function AppointmentBookingDemo(props: DemoRendererProps) {
  const { onSubmit, isLoading, result, error, clearResult } = props;
  const [businessType, setBusinessType] = useState("");
  const [service, setService] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      business_type: businessType,
      service,
      preferred_date: preferredDate,
      preferred_time: preferredTime,
    });
  };

  if (result) {
    const svc = result.service as string;
    const confirmedDate = result.confirmed_date as string;
    const confirmedTime = result.confirmed_time as string;
    const duration = result.duration_minutes as number;
    const reminder = result.reminder_message as string;
    const confirmation = result.confirmation_text as string;

    return (
      <div className="animate-fade-in-up space-y-4">
        {/* Confirmation card */}
        <div className="rounded-xl border border-st-border bg-st-bg-card p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10">
              <svg
                className="h-5 w-5 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-[15px] font-light text-white">
              Appointment Confirmed
            </h3>
          </div>

          <div className="space-y-3 text-[13px] font-light">
            <div className="flex justify-between">
              <span className="text-st-text-muted">Service</span>
              <span className="text-white">{svc}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-st-text-muted">Date</span>
              <span className="text-white">{confirmedDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-st-text-muted">Time</span>
              <span className="text-white">{confirmedTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-st-text-muted">Duration</span>
              <span className="text-white">{duration} minutes</span>
            </div>
          </div>
        </div>

        {/* Reminder card */}
        <div className="rounded-xl border border-st-border bg-st-bg-card p-5">
          <p className="mb-2 text-[11px] font-light tracking-wide text-st-text-muted">
            Reminder Message
          </p>
          <p className="text-[13px] font-light leading-relaxed text-white">
            {reminder}
          </p>
        </div>

        {/* Confirmation text */}
        <div className="rounded-xl border border-st-border bg-st-bg-card p-5">
          <p className="mb-2 text-[11px] font-light tracking-wide text-st-text-muted">
            Confirmation Text
          </p>
          <p className="text-[13px] font-light leading-relaxed text-white/80">
            {confirmation}
          </p>
        </div>

        {error && (
          <p className="text-[13px] font-light text-red-400/80">{error}</p>
        )}

        <button
          type="button"
          onClick={clearResult}
          className="hero-btn-secondary relative overflow-hidden rounded-xl px-6 py-3 text-[13px] font-light tracking-wide text-st-text-muted transition-all duration-500 hover:text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-lg border border-st-gold/20 bg-st-gold/[0.04] px-4 py-3.5 text-[13px] font-light leading-relaxed text-st-gold-light/80">
        <p className="mb-2 font-medium text-st-gold-light">How to use this demo</p>
        <p>Enter the type of business (e.g. dental clinic, hair salon, car workshop), the specific service the customer wants, and their preferred date and time. The AI will generate a realistic booking confirmation with a reminder message.</p>
        <p className="mt-2 text-[12px] text-st-gold-light/60">Use natural language for dates and times — &apos;next Tuesday&apos;, &apos;afternoon&apos;, &apos;3pm on 20 Jan&apos; all work. The AI will pick the best available slot.</p>
      </div>
      <div>
        <label className={labelClass}>Business Type</label>
        <input
          type="text"
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
          placeholder="e.g. Dental clinic, Hair salon..."
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Service</label>
        <input
          type="text"
          value={service}
          onChange={(e) => setService(e.target.value)}
          placeholder="e.g. Teeth cleaning, Haircut..."
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Preferred Date</label>
        <input
          type="text"
          value={preferredDate}
          onChange={(e) => setPreferredDate(e.target.value)}
          placeholder="e.g. Next Monday, 15 Jan 2026..."
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Preferred Time</label>
        <input
          type="text"
          value={preferredTime}
          onChange={(e) => setPreferredTime(e.target.value)}
          placeholder="e.g. Morning, 2pm, After work..."
          className={inputClass}
        />
      </div>

      {error && (
        <p className="text-[13px] font-light text-red-400/80">{error}</p>
      )}

      <button
        type="submit"
        disabled={
          isLoading ||
          !businessType.trim() ||
          !service.trim() ||
          !preferredDate.trim() ||
          !preferredTime.trim()
        }
        className="relative w-full overflow-hidden rounded-xl border border-st-gold/30 bg-st-gold/15 px-4 py-3.5 text-[13px] font-light tracking-wide text-st-gold-light transition-all duration-500 hover:bg-st-gold/25 hover:border-st-gold/50 disabled:opacity-40"
      >
        {isLoading ? "Generating..." : "Generate"}
      </button>
    </form>
  );
}
