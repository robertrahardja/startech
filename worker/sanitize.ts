/**
 * Input sanitization for form, chat and demo fields, and HTML escaping for
 * the notification emails built from them.
 */

export function sanitizeString(input: string, maxLength: number): string {
  return input
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .trim()
    .slice(0, maxLength);
}

export function sanitizeEmail(input: string): string {
  return input
    .replace(/[\x00-\x1F\x7F\r\n]/g, "")
    .trim()
    .slice(0, 320);
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
