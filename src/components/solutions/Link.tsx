import type { ReactNode, MouseEvent } from "react";

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
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    // External links: let the browser handle it
    if (href.startsWith("http")) {
      onClick?.();
      return;
    }

    // Pure hash link on the same page (e.g. #products)
    if (href.startsWith("#")) {
      onClick?.();
      return;
    }

    e.preventDefault();
    onClick?.();

    // Parse path and hash from href (e.g. "/#contact" or "/solutions")
    const hashIndex = href.indexOf("#");
    const path = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
    const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";

    // Navigate to the path if it changed
    const normalizedPath = path || "/";
    if (window.location.pathname !== normalizedPath) {
      window.history.pushState({}, "", href);
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
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
