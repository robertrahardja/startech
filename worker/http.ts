/** Request and response helpers shared by the API handlers. */

export function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export function isRequestTooLarge(request: Request, maxBytes: number): boolean {
  const contentLength = parseInt(request.headers.get("Content-Length") || "0");
  return contentLength > maxBytes;
}
