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
/**
 * Splits an href into the parts navigation needs, and says whether the
 * browser should simply be left to handle it.
 *
 * Pulled out of the click handler: parsing and navigating are separate
 * concerns, and having both inline made the handler hard to follow.
 */
function parseHref(href: string) {
  if (href.startsWith("http") || href.startsWith("#")) {
    return { native: true as const };
  }

  const hashIndex = href.indexOf("#");
  const path = hashIndex >= 0 ? href.slice(0, hashIndex) : href;

  return {
    native: false as const,
    path: path || "/",
    hash: hashIndex >= 0 ? href.slice(hashIndex) : "",
  };
}

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
    const target = parseHref(href_);

    // External and hash-only links: the browser already does the right thing.
    if (target.native) {
      onClick?.();
      return;
    }

    const { path: normalizedPath, hash } = target;
    const samePage = window.location.pathname === normalizedPath;

    // Same page plus a hash: leave the native scroll alone.
    if (samePage && hash) {
      onClick?.();
      return;
    }

    e.preventDefault();
    onClick?.();

    // Navigate to the path if it changed
    if (!samePage) {
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
