// Facts about the site that the page and the Worker both need.

export const SITE_URL = "https://startech-innovation.com";
export const SITE_NAME = "StarTech Innovation";

// StarTech's own accounts (opened 13 Nov 2026, see
// startech_marketing/gtm/channels/social/profiles.md). The profiles link
// back here with ?utm_source=<platform>, so visits from them are measured.
// The footer links to them; the homepage's structured data lists them as
// the same organisation (schema.org sameAs).
export const SOCIAL_PROFILES = [
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61596311469671" },
  { name: "Instagram", href: "https://www.instagram.com/startechinnovation/" },
  { name: "YouTube", href: "https://www.youtube.com/@startechinnovation" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/startech-innovation/" },
] as const;
