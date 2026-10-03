# Prompt: Implement Design System React Page under `/design-system`

## Purpose
Build a comprehensive, interactive React design system showcase page rendered at `/design-system` using the CareerPilot semantic design tokens, WCAG 2.2 AA accessibility principles, and clean frontend design practices.

## Step-by-Step Flow
1. **Routing Setup**: Update `careerpilot-frontend/src/App.tsx` to mount the Design System page when navigating to `/design-system` (or as default demo view when path matches).
2. **Page Architecture**: Build `careerpilot-frontend/src/pages/DesignSystemPage.tsx` with modular sections:
   - System Header & Search Filter
   - Color Palettes with Click-to-Copy & Contrast Metrics
   - Typography Scale Specimen & Live Tester
   - Spacing & Radius Visualizers
   - Shadow & Surface Elevation Matrix
   - Interactive Component Gallery (Buttons, Form Inputs, Status Badges, Domain Tags)
   - Analytics Chart Tokens Preview
   - Icon Grid Showcase
3. **Interactivity & Motion**: Add subtle micro-interactions (copy confirmation toasts, state toggles, live input typing, button active presses).
4. **Validation**: Execute build and linting checks (`pnpm --prefix careerpilot-frontend run build`).

## Decision Point
- **Option A**: Build a static list of color codes and font names.
  - *Short description*: Minimal effort, but fails to demonstrate token usability, interactive component states, or layout hierarchy.
- **Option B (Recommended)**: Build an interactive, searchable Design System Workbench page with live component states, code copy actions, and typography specimen testers.
  - *Why*: Provides immediate visual verification for developers and design stakeholders, tests token integration under real browser conditions, and proves component accessibility.
