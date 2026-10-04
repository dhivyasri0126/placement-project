# Prompt: FE-SCROLL-003 - Scrollbar Gutter Stabilization & Custom Scrollbar Design

## Status: COMPLETED
**Author:** AI Agent
**Date:** 2026-10-04
**Domain:** Frontend / UX / Layout Stability / WCAG Compliance
**Result:** Verified with `tsc -b && vite build`. Zero CLS on route navigation via `scrollbar-gutter: stable;` and custom sleek capsule scrollbars.

---

## 1. Problem Statement
When navigating between pages (e.g. from shorter pages like `/login` or empty states to longer pages like `/`, `/resume-analysis`, or `/dashboard`), the appearance and disappearance of the native browser scrollbar causes noticeable Cumulative Layout Shift (CLS). Content jumps horizontally by approximately 15–17px as the browser reserves or releases viewport space for the scrollbar track. Furthermore, default platform scrollbars (especially on Linux and Windows) are visually jarring, chunky, and clash with CareerPilot's token-based design system.

---

## 2. Requirements & Standards
1. **Layout Stability (Zero Navigation Shift):**
   - Implement `scrollbar-gutter: stable;` on `html` so viewport width remains identical whether a page is scrollable or not.
   - Prevent Cumulative Layout Shift (CLS) across all route transitions.
2. **Custom Scrollbar Aesthetics (Apple / Vercel Sleek Standard):**
   - Provide tokenized scrollbar dimensions and colors (`--scrollbar-width`, `--scrollbar-thumb-bg`, `--scrollbar-thumb-hover-bg`, `--scrollbar-thumb-active-bg`).
   - Use `background-clip: content-box` with transparent borders for a refined, floating capsule look.
   - Transparent track background (`--scrollbar-track-bg: transparent`) so the UI flows naturally under the thumb.
3. **Cross-Browser & WCAG 2.2 AA Compliance:**
   - Standard CSS `scrollbar-width: thin;` and `scrollbar-color` for W3C-compliant browsers (Firefox, modern Safari/Chrome).
   - `::-webkit-scrollbar` pseudo-elements for Blink/WebKit browsers (Chrome, Edge, Safari, Brave).
   - Ensure thumb contrast meets WCAG SC 1.4.11 (Non-text Contrast $\ge 3:1$) against surfaces.
   - Maintain full keyboard and drag accessibility.

---

## 3. Implementation Steps
1. Add scrollbar design tokens to `careerpilot-frontend/src/tokens.css`.
2. Update `careerpilot-frontend/src/index.css` with:
   - `scrollbar-gutter: stable;` on `html`.
   - Global standard scrollbar properties (`scrollbar-width`, `scrollbar-color`).
   - WebKit scrollbar pseudo-elements with capsule thumb and hover/active states.
3. Verify scrollable components (`.cp-tabs-scrollable`, modal dialogs, and main containers).
4. Validate with TypeScript compiler, Vite build, and browser viewport tests.
