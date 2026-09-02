import type { ReactNode, MouseEvent } from "react";
import { useI18n } from "../../i18n";

interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Simple pushState-based link component.
 *
 * Handles three link types:
 * 1. Hash-only links (#section) - native scroll behaviour
 * 2. Path+hash links (/path#section) - navigate to path, then scroll to hash
 * 3. Internal paths (/solutions) - pushState navigation
 * 4. External links (http...) - native behaviour
 */
export default function Link({
  href,
  children,
  className,
  onClick,
}: LinkProps) {
  const { path: localise } = useI18n();

  // Internal paths carry the active locale prefix, so navigating inside a
  // translated site never drops the visitor back into English. Hash-only and
  // external links are left alone.
  const href_ =
    href.startsWith("http") || href.startsWith("#")
      ? href
      : localise(href);

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    // External links: let the browser handle it
    if (href_.startsWith("http")) {
      onClick?.();
      return;
    }

    // Pure hash link on the same page (e.g. #products)
    if (href_.startsWith("#")) {
      onClick?.();
      return;
    }

    // Parse path and hash from href (e.g. "/#contact" or "/solutions")
    const hashIndex = href_.indexOf("#");
    const path = hashIndex >= 0 ? href_.slice(0, hashIndex) : href_;
    const hash = hashIndex >= 0 ? href_.slice(hashIndex) : "";
    const normalizedPath = path || "/";

    // Same page + hash: let the browser handle native hash scroll
    if (window.location.pathname === normalizedPath && hash) {
      onClick?.();
      return;
    }

    e.preventDefault();
    onClick?.();

    // Navigate to the path if it changed
    if (window.location.pathname !== normalizedPath) {
      window.history.pushState({}, "", href_);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }

    if (hash) {
      // Scroll to hash target after a micro-delay so the page renders first
      requestAnimationFrame(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      });
    } else {
      // Scroll to top on plain path navigation
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }

  return (
    <a href={href_} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
