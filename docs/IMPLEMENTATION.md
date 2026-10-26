# Implementation and verification

The hero checkpoint was reviewed first, then the complete page was implemented following the owner's instruction to finish the original brief. No requested section was cut. The hero remains sequentially blob-loaded; keyframe spacing has not been lowered.

## Brief checklist

| Requirement | Implementation |
| --- | --- |
| Buildless static stack | `index.html`, `css/style.css`, `js/main.js`, `media/`; only the requested pinned library versions |
| Typography and tokens | Fraunces, Instrument Sans, DM Mono, Tiro Devanagari Hindi; palette/font custom properties |
| Processing pipeline | Reproducible Bash/FFmpeg script; 16 hero files, 13 films, 13 posters, 10 WebPs |
| Media budget | 49,958,099 bytes: 49.96 decimal MB / 47.64 MiB |
| Hero codec and seeking | 1280w CRF 26 / 720w CRF 27; 144 frames, 72 keyframes, no B-frames, no audio, faststart |
| Hero loading | Sequential blob fetches and object URLs, muted play/pause priming, decoded-frame gate |
| Hero timeline | Eight bands, 1.05 viewport heights each desktop / 0.9 below 900px |
| Hero ticker | Per-clip time interpolation, factor 0.2 at 60Hz, 8ms threshold, seeking guard |
| Hero transitions | Reversing drift/scale/blur; letter rolls; masked title; category, description, price, index, counter, progress, rotating badge, accent and pointer tilt |
| Loader | Steam handi SVG, counter and bar, three messages, font/first-clip gate capped at 4.5s, split shutters |
| Navigation | All five section links, call CTA, live status, native dialog menu, down/up visibility |
| Marquee | Two rows with velocity-driven speed and skew |
| 01 The Dum | Word illumination, three growing inline film pills |
| 02 Five steps | Pinned horizontal track, Marinate/Parboil/Layer/Seal/Lift, Hindi accents and media parallax |
| BIRIYANI mask | Live film revealed through HTML letters, letter rise, zoom through the first I into full video, caption |
| 03 In the handi | Sticky spice film, eleven entries, scroll counter, Hindi scramble on hover/focus |
| 04 The Menu | Eight signature rows with cursor-following thumbnails; five accessible category tabs rendered from MENU; vegetarian indicators |
| 05 Tandoor | Embers, canvas field of 160/70 sparks, 480°C counter, three tilt-film cards |
| Pour | Sticky gravy film, alternating kinetic words, four dish-film tiles |
| 06 House rules | Four quotes, previous/next controls, direct dots, wrapping and live announcement |
| 07 Visit | Storefront film, four animated counters, live Adelaide clock/status, supplied contact and hours, call/menu/directions CTAs |
| Footer | Giant wordmark rising from the centre; “Ek plate aur?” |
| Additional effects | Fixed grain, media cursor labels, magnetic buttons, rolling links, line-mask headings |
| Media lifecycle | IntersectionObserver loads/plays films near the viewport and pauses them outside it and when the page is hidden |
| Accessibility | Keyboard tabs, focus indicators, escape-to-close dialog, touch-safe controls and reduced-motion experience |
| Responsive layout | 1100/900/520 breakpoints and additional short-screen handling |

## Owner-supplied configuration

The owner supplied phone `03368933584`, address `Jail Road, Heerabad`, and hours `6 pm–2 am`, then explicitly requested keeping Adelaide, Australia. These values are retained as provided; directions search the literal supplied address. The hours apply every day by default and are editable per weekday. Prices are sample AUD template prices.

No Instagram URL was supplied. Its slot remains visible as “Instagram · coming soon” and becomes a working link when the Instagram setting is populated in the owner dashboard. No account was invented.

The new `biryan video.mp4` replaces the original biryani film in both hero variants and the ambient film/poster. Its complete action is retimed to six seconds and audio is removed. Its native aspect ratio is preserved; the other supplied videos are 16:9.

## Validation scope

- JavaScript and Bash syntax checks.
- Chrome desktop 1440×900 and touch-emulated mobile 390×844: eight hero dishes forward/backward, blob sources, frame times, decoded visibility, clickable index and dialog controls.
- All full-menu tabs and keyboard navigation; all four carousel states and wrapping; Hindi spice-name activation and restoration.
- Adelaide overnight schedule boundaries: closed at 17:59, open at 18:00, still open at 01:59, closed at 02:00.
- Viewport-based film playback and offscreen pausing; complete page without horizontal overflow.
- Reduced-motion layouts at 320, 390, 768 and 1100 pixels wide: content visible, no pin spacers or ambient autoplay.
- Visual inspection of desktop/mobile sections, pinned process, mask zoom, menu, tandoor, contact and footer.
- FFprobe/bitstream checks of hero duration, width, CRF, keyframe gaps, B-frame absence, audio absence and faststart ordering; media under 50,000,000 bytes.

Real iOS/Safari hardware was not available for testing. iOS muted priming and inline playback are implemented, but device-specific behavior is not claimed as hardware-verified. External Google Fonts/CDN loading requires an internet connection.


## Advanced features update

The optional Node server and owner dashboard add ordering drafts, menu management, reservations with private status links, mobile actions, first-party opt-in measurements and configured-domain SEO. The original buildless public page and replacement biryani assets remain. See `ADVANCED-FEATURES.md` for the implementation and deployment boundaries. The confirmed WhatsApp destination is `923368933584`. No final domain was supplied, so previews remain noindex.

Additional verification includes seven domain-logic tests, desktop/mobile cart and reservation workflows, menu/availability persistence, CSRF and owner access controls, and the original eight-dish forward/reverse playback on the Node server with no console errors or failed requests. All integration tests use a separate data directory; the delivered preview has no test reservations or test owner password.


## English copy update

At the owner’s request, all Hindi-script labels and the romanized “one more plate” slogan now use English. Spice hover/focus/click animations retain English names and use Latin letters during the scramble. The unused Hindi font has been removed. Restaurant and established dish names are retained. This copy update supersedes the original bilingual-label requirement.
