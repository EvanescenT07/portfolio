export function getBaseUrl(): string {
  const rawURL =
    process.env.SITE_URL || process.env.NEXT_PUBLIC_VERCEL_URL || "";

  if (!rawURL) {
    return "http://localhost:3000";
  }
  const withProtocol = rawURL.startsWith("http") ? rawURL : `https://${rawURL}`;
  return withProtocol.replace(/\/+$/, "");
}
