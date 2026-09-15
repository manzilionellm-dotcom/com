# Add `www.bestiptv-vip.com` on Vercel (SSL SAN)

Canonical host is the **apex**: `https://bestiptv-vip.com`.

`www` currently fails TLS. In-repo 308s only run after the handshake succeeds.

1. Vercel → project **com** → Settings → Domains.
2. Add `www.bestiptv-vip.com`.
3. Point DNS CNAME `www` at the value Vercel shows.
4. Redirect **www → apex**, never apex → www.
5. After www TLS is green, restore HSTS `includeSubDomains; preload` in `next.config.ts`.

Until then HSTS is `max-age=63072000` only.
