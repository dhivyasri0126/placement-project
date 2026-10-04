# Prompt: Optimize UI Density, Typography, and Scaling (Apple HIG, NN/g, WCAG Standards)

## Purpose
Refactor oversized UI components, typography, padding, touch targets, and mobile navigation drawer across CareerPilot to adhere to Apple Human Interface Guidelines (HIG), Nielsen Norman Group (NN/g) information density guidelines, and WCAG 2.2 AA standards. The UI should feel refined, professional, and balanced—neither cramped nor cartoonishly bloated.

## Standards Applied
1. **Apple HIG**:
   - Navigation & Menu Rows: 40–44px comfortable tap rhythm with 14px–15px body labels and 16px iconography.
   - Micro-typography: 11px captions, 13px footnotes, 14px secondary, 15–16px primary, 20–24px section headers, 28–36px page hero titles.
   - Buttons: 38–42px standard interactive controls, 8px border-radius, subtle tactile feedback.
2. **Nielsen Norman Group (NN/g)**:
   - High information scent and contextual density without cluttered cognitive load.
   - Prevent unnecessary scroll fatigue caused by over-padded containers.
   - Semantic color restraint: avoid high-saturation alert blocks for routine actions (e.g. "Sign Out" should be a calm secondary/ghost action, not an alarmist red banner).
3. **WCAG 2.2 AA**:
   - Target Size (Minimum) (SC 2.5.8): 24×24px minimum physical boundary with touch target envelopes of 40–44px.
   - Contrast ratio >= 4.5:1 for normal text, >= 3:1 for large text and UI components.
   - Clear `:focus-visible` states without layout jumps.

## Scope of Work
1. **Mobile Drawer & Navigation (`Navbar.tsx`, `App.css`)**:
   - Reduce oversized drawer card to a sleek, compact dropdown / sheet.
   - User profile header: 32px avatar, 13px name, subtle 11px role pill.
   - Nav items: 14px (`0.875rem`) typography, 16px icons, 38–42px tap targets, 6px border radius.
   - Sign Out button: clean subtle styling with 38px height and 13px typography.
2. **Global Tokens & Layout (`tokens.css`, `index.css`, `App.css`)**:
   - Recalibrate touch target minimum token to `--touch-target-min: 40px` (with 44px tap zone allowance).
   - Normalize component padding, gap rhythms (8px / 12px / 16px / 24px) and fluid typography scales.
3. **Landing Page (`LandingPage.tsx`)**:
   - Hero headline: `clamp(1.75rem, 3.5vw, 2.5rem)` (calibrated down from bloated 3.5rem).
   - Hero buttons: 40px height with balanced `0.5rem 1.25rem` padding.
   - Hero preview mockup: compact 0.75rem metric paddings and refined text sizing.
   - 8-Step Preparation Loop: compact card padding and clean 13px–14px typography.
4. **Resume Analysis & Dashboard (`ResumeAnalysisPage.tsx`, `DashboardPage.tsx`)**:
   - Compact metric score cards, refined 13px submetrics.
   - Tab buttons: 38px height, 13px font size, clean underline or pill indicator.
   - Modal: max-width 480px with compact padding.
5. **Form Controls (`FormField.tsx`, `LoginPage.tsx`, `RegisterPage.tsx`, `ProfilePage.tsx`)**:
   - Input height: 40px, font-size: 15px (16px mobile input to avoid iOS zoom, but compact padding `0.5rem 0.75rem`).
   - Button heights: 40px with 14px semi-bold font.

## Definition of Done
1. Mobile menu matches Apple HIG / modern SaaS compact sheet aesthetic.
2. All components adhere to NN/g information density principles with refined whitespace.
3. WCAG 2.2 AA target size and contrast requirements are met.
4. Full test build and oxlint pass with 0 errors.
