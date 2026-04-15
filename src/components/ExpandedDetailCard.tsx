import { useState, useEffect, useCallback } from "react";

interface ExpandedDetailCardProps {
  title: string;
  description: string;
  details: string[];
  header?: React.ReactNode;
  tags?: string[];
  onClose: () => void;
}

export default function ExpandedDetailCard({
  title,
  description,
  details,
  header,
  tags,
  onClose,
}: ExpandedDetailCardProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 450);
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [handleClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{
        backgroundColor: visible ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0)",
        backdropFilter: visible ? "blur(4px)" : "blur(0px)",
        transition: "background-color 400ms ease, backdrop-filter 400ms ease",
      }}
      onClick={handleClose}
    >
      <div
        className="expanded-card-glow relative w-full max-w-3xl rounded-2xl border border-st-gold-light/10 bg-gradient-to-br from-[rgb(24,24,30)] via-[rgb(18,18,22)] to-[rgb(24,24,30)] p-10 sm:p-14"
        style={{
          transition: "opacity 400ms ease",
          opacity: visible ? 1 : 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/[0.08] hover:text-white"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Optional header (icon, metric, etc.) */}
        {header}

        {/* Title */}
        <h3 className="mb-4 text-xl font-medium tracking-wide text-white sm:text-2xl">
          {title}
        </h3>

        <p className="mb-8 text-base leading-[1.9] text-white/80 sm:text-lg">
          {description}
        </p>

        <div className="mb-8 h-px w-full gold-glimmer" />

        {/* Detail items */}
        <ul className="space-y-4">
          {details.map((detail) => (
            <li
              key={detail}
              className="flex items-start gap-3.5 text-base leading-[1.8] text-white/85 sm:text-lg"
            >
              <span className="mt-[12px] h-px w-5 shrink-0 bg-st-gold-light/40" />
              {detail}
            </li>
          ))}
        </ul>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-white/[0.06] px-3.5 py-1.5 text-sm tracking-wide text-white/65"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
