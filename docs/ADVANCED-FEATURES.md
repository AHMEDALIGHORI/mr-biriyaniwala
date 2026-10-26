# Advanced restaurant features

## What is connected

`node server.mjs` serves both the original static experience and the new API on port 4174. The optional backend uses only Node built-ins. It keeps the original buildless frontend intact and can be hosted on a Node-capable service with persistent disk. A static hosting service alone cannot run the reservation inbox or shared management features.

WhatsApp uses the confirmed international number `923368933584`. The customer selects dishes, quantities, spice and extras, reviews a server-priced estimate, then opens a prepared WhatsApp message. Nothing is sent by the website. No checkout payment, delivery integration or automatic acceptance is implied.

Reservations are actual records in the owner inbox, initially pending. The owner can confirm, decline or cancel, and add private notes. The guest receives a token-protected status link and may refresh it to see the latest status. The guest status endpoint excludes contact details and owner notes. There are no automated SMS or email notifications: call guests when a direct reply is needed. Available request times follow Adelaide opening hours, a 30-minute lead time and a 90-day horizon; they do not claim real-time table inventory. Owner approval handles seating capacity.

An optional existing HTTPS booking-service URL can replace the built-in request form. The external service controls its availability and confirmations.

## Owner workflow

1. Open `/admin.html` locally and create a strong owner password. For a hosted server, configure the `ADMIN_PASSWORD` environment secret before exposing it beyond localhost.
2. Edit prices, descriptions, special labels, special prices, vegetarian flags, spice choices and extras in Menu & specials. Save menu to publish changes to the running site. Add/remove ordinary dishes; preserve cinematic signatures and mark them sold out when unavailable.
3. Review Reservations and approve actual requests. Status updates use optimistic concurrency checks to avoid overwriting a newer owner action.
4. Configure contact information, Instagram, opening hours and the final HTTPS domain in Settings. Keep Adelaide time and AUD as requested for this template.
5. Export the saved catalog for backup or a static release. The export excludes owner credentials, reservations and measurements. A fresh server reads `data/catalog.json`; an existing server uses its persisted catalog.

Runtime state lives in `.runtime/store.json`; locally configured credentials are salted scrypt hashes in `.runtime/owner.json`. Use a private persistent volume and backups. Environment `ADMIN_PASSWORD` overrides the local password on startup and provides a reset route through the hosting platform. Run one process per data directory. Sessions are memory-only and expire after eight hours or a restart. State writes use a serialized queue and atomic replacement. Concurrent menu/settings edits return a conflict rather than overwrite silently.

## Measurement and privacy

Visitors choose whether to share anonymous first-party measurements. The browser sends no events before consent. The dashboard reports page visits, menu views, cart additions, call clicks, WhatsApp handoffs and reservation openings. Handoffs count opened drafts, not completed orders or revenue. It shows 14-day visit/handoff bars and median LCP, FCP, CLS, server response and load measurements when collected. A fresh installation has empty metrics.

Names, phones, emails, order notes and booking details are excluded from analytics. Measurements are retained for 30 days subject to entry limits; reservations for 90 days from submission. Cleanup runs on writes, startup and hourly while the server runs. Offline backups need separate retention management. Guests can change their measurement preference in the footer. The owner can clear analytics or delete a reservation record.

The public privacy page describes browser storage, provider requests, WhatsApp handoff and reservation handling. It is implementation documentation for this template and should be reviewed alongside the final operator's hosting practices before publishing.

## SEO and deployment

Until a final domain is supplied, the preview intentionally uses noindex and an empty sitemap. A valid HTTPS domain enables canonical and social-image URLs and the sitemap. Restaurant JSON-LD is generated from the configured restaurant name, phone, city, street and opening hours. No invented geographic coordinates, review ratings or postal codes are included.

The server generates SEO at request time. For static hosting, export the saved catalog to `data/catalog.json`, then run `node scripts/static-seo.mjs` (or pass your final HTTPS root domain). Static hosting retains ordering drafts but shows a call fallback for built-in reservations. Owner access requires the server.

Security controls include password hashing, HttpOnly SameSite sessions, CSRF tokens, origin checks, request-size limits, rate limits, private status tokens, output escaping and a public-file allowlist. Serve production through HTTPS and configure the final origin. The in-memory rate limit uses the direct socket address; when using a reverse proxy, enforce public per-client limits at that proxy as well. This is a single-restaurant starter, not a payment processor or a multi-tenant SaaS backend.

## Verification

`node --test server/domain.test.mjs` covers server-priced extras and specials, unavailable dishes, quantity/spice limits, overnight hours, Adelaide DST gaps, invalid calendar dates, catalog constraints, domain validation and structured data. Browser QA uses a separate data directory, so preview owner credentials and customer records stay untouched. End-to-end checks cover bag persistence, message preparation without sending, pending/confirmed reservation status, menu changes, sold-out checkout blocking, opt-in metrics, access controls, mobile dialogs and byte-range video serving. Original hero and story regression checks remain in local `.qa/` artifacts.

Reference specifications: [WhatsApp click to chat](https://faq.whatsapp.com/5913398998672934), [Google local-business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business), and [MDN performance data](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/Performance_data).
