# Prompt: Extract Colors and Design Tokens for CareerPilot Frontend

## Purpose
Extract all color palettes, typography scales, spacing units, border radii, shadow elevations, UI surfaces, button states, input states, status tags, chart colors, and icon specifications from the target design token specification image and structure them cleanly for consumption across the CareerPilot frontend.

## Step-by-Step Flow
1. **Inspect Source Specification**: Analyze `docs/ui/design-tokens.png` and uploaded design token reference image.
2. **Define Design Token Architecture**: Organize tokens into semantic categories: Colors, Typography, Spacing, Radius, Shadows, Charts, UI Surfaces, Component Tokens (Buttons, Inputs, Tags).
3. **Export Code Tokens**: Create CSS Custom Properties in `careerpilot-frontend/src/tokens.css` and TypeScript token object maps in `careerpilot-frontend/src/theme/tokens.ts`.
4. **Document Tokens Specification**: Maintain `careerpilot-frontend/docs/ui/design-tokens.md` as the source-of-truth document.
5. **Validate & Present**: Verify token completeness against WCAG 2.2 AA standards and export structured artifact.

## Decision Point
- **Option A**: Inline color hexes directly into frontend UI components.
  - *Short description*: Faster for initial prototyping but fragments semantic design tokens, leading to design drift.
- **Option B (Recommended)**: Define centralized CSS custom properties and TypeScript constants with semantic alias tokens.
  - *Why*: Ensures WCAG 2.2 AA accessibility compliance, unified theme maintenance across student/staff/super-admin portals, and seamless design motion execution.
