import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.env.HTML_BUILD_DIR || ".next/server/app";
const sitemap = readFileSync(join(root, "sitemap.xml.body"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).href);
assert.ok(urls.length > 0, "The sitemap must include public pages");

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1].toLowerCase(), m[2]]));
}

const documents = new Map();
for (const href of urls) {
  const path = new URL(href).pathname;
  const file = path === "/" ? "index.html" : path.slice(1) + ".html";
  const html = readFileSync(join(root, file), "utf8");
  const links = (html.match(/<link\b[^>]+>/gi) || []).map(attributes);
  const canonicals = links.filter((link) => link.rel === "canonical").map((link) => new URL(link.href).href);
  assert.deepEqual(canonicals, [href], "Canonical mismatch on " + path);
  const language = attributes(html.match(/<html\b[^>]*>/i)?.[0] || "").lang;
  assert.ok(language, "Missing document language on " + path);
  documents.set(href, { language, alternates: links.filter((link) => link.hreflang) });
}

function checkTargets(from, links) {
  for (const { hreflang, href } of links) {
    const target = documents.get(new URL(href).href);
    assert.ok(target, "Unpublished language target " + href + " from " + from);
    if (hreflang === "x-default") continue;
    assert.equal(target.language.split("-")[0], hreflang.split("-")[0], "Wrong document language for " + href);
    assert.ok(target.alternates.some((link) => new URL(link.href).href === from), "Missing reciprocal link to " + from);
  }
}

for (const [url, page] of documents) checkTargets(url, page.alternates);
for (const match of sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
  const from = new URL(match[1].match(/<loc>([^<]+)<\/loc>/)[1]).href;
  checkTargets(from, (match[1].match(/<xhtml:link\b[^>]+>/g) || []).map(attributes));
}
console.log(`Verified canonicals and language targets for ${urls.length} public pages`);
