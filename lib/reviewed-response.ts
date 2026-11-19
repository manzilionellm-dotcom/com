import { NextResponse } from "next/server";
import { guides, origin, retiredPaths } from "./reviewed-guides";

export function reviewedPage(path: string, preview = false) {
  if (retiredPaths.has(path)) {
    return new NextResponse(null, { status: 410, headers: { "X-Robots-Tag": "noindex" } });
  }
  if (!Object.prototype.hasOwnProperty.call(guides, path)) return null;
  const page = guides[path];
  const canonical = origin + path;
  const html = `<!doctype html><html lang="${page.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${page.title}</title><meta name="description" content="${page.description}"><link rel="canonical" href="${canonical}"><style>body{margin:0 auto;max-width:42rem;padding:clamp(1.25rem,5vw,4rem);font:1.12rem/1.65 system-ui,sans-serif;color:#182735}h1,h2{line-height:1.2}a{color:#075b79}</style></head><body><main>${page.body}</main></body></html>`;
  const response = new NextResponse(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
  if (preview) response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}
