# Checkpoint 1 — media and hero

The original working agreement requires stopping here for review before building the rest of the page. No later section has been removed from scope.

## Implemented

- Static HTML/CSS/JS, the exact requested GSAP/ScrollTrigger/Lenis versions and all four font families.
- All 23 supplied raw assets mapped; 16 hero MP4s, 13 film MP4s, 13 posters, 10 WebPs.
- Six-second, 24fps hero clips at 1280w CRF 26 and 720w CRF 27. Full source action retimed from eight seconds, without cutting the beginning or end.
- Two-frame keyframe interval, no B-frames, no audio, faststart.
- Sequential blob downloads, muted decoder priming, decoded-frame reveal gate, 0.2 interpolation and 8ms seeking threshold.
- Eight scroll bands, reversing clip/type transitions, colour changes, index, counter, progress, ring badge, pointer tilt and magnetic buttons.
- Font/first-video loader with a capped wait, split shutters, and supplied-image fallback.
- Adelaide opening status from editable demo hours, responsive navigation overlay, direction-aware navigation visibility and reduced-motion controls.

## Verified

Automated Chrome browser checks at 1440×900 and touch-emulated 390×844 traversed all eight dishes forward and backward, checked video times against scroll positions, validated local blob sources and appropriate video widths, clicked the dish index, and exercised the navigation dialog. Both runs had zero JavaScript/console errors, zero failed requests, and no horizontal overflow. Reduced-motion mode has no pinning or animated playback and its dish selector works.

FFprobe verified all 16 hero files: 144 frames, 72 keyframes, six seconds, H.264, correct dimensions, no B-frames, no audio and moov before mdat. Real iOS/Safari hardware has not been tested.

A continuous 15-second forward/reverse scroll sweep also reached all eight dishes with zero sampled gaps in visible decoded media. Final desktop and mobile renders were visually inspected after the edge-blending adjustments.

## Open constraints

**Media budget: 61.4 MB (58.6 MiB), above the approximate 50 MB target.** The requested CRF values, output widths, complete action and two-frame keyframe spacing are preserved. This is disclosed for checkpoint review rather than silently lowering encoding requirements.

### Biryani replacement

After this checkpoint, `assets/biryan video.mp4` replaced the original biryani footage. The new source is 1344×768 with 10.125 seconds of video and an audio track. Both hero encodes, the ambient film and its poster were overwritten from this source. The complete action is normalized to six seconds, audio is removed, and the clean footage bypasses delogo. The hero retains keyframes every two frames. The source aspect ratio is preserved (1280×732 desktop, 720×412 mobile). The old raw video is no longer in `assets`; the rebuild script now selects the replacement. Updated total media size is 61.6 MB.

The source footage is 1280×720, not 1080p. Business phone, address and Instagram were not supplied; they remain empty configuration values. Prices and hours are labelled illustrative.

## Next phase after review

Full section navigation, velocity marquee, Dum manifesto with video pills, five-step pinned process, BIRIYANI video mask/zoom, eleven-spice section and Hindi scramble, signature/full tabbed menu, tandoor sparks and tilt films, gravy pour and kinetic text, house-rules carousel, Visit with real business details, and the animated footer. Viewport-driven ambient film playback is implemented with those sections.
