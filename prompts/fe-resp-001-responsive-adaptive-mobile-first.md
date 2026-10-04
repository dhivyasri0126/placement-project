# Prompt: Responsive, Adaptive, and Mobile-First Frontend Implementation

## Purpose
Transform the CareerPilot frontend into a fully responsive, adaptive, and mobile-first experience using the design systems and guidelines in strict order:
1. `designmotionhq-ux-system` (tokens, complete states, 44px touch targets, purposeful motion, semantic layout)
2. `frontend-design` (intentional typography, subject-matter fidelity, non-AI generic layouts, restrained polish)
3. `web-design-guidelines` (mobile viewports, iOS font-size >= 16px auto-zoom prevention, touch target accessibility, keyboard focus-visible, prefers-reduced-motion)

## Scope of Changes

### 1. Foundational Tokens & Responsive CSS (`tokens.css`, `index.css`, `App.css`)
- **Touch Target Token**: Add `--touch-target-min: 44px` across interactive elements.
- **Mobile-First Breakpoint Tokens & Media Rules**:
  - Compact (< 640px)
  - Medium (640px - 1024px)
  - Expanded (> 1024px)
- **Fluid & Scaled Typography**: Prevent iOS Safari viewport auto-zoom by ensuring form inputs, selects, and textareas have `font-size: 1rem` (16px) on mobile viewports.
- **Accessibility & Focus**: Add high-contrast `:focus-visible` styling (`outline: 2px solid var(--color-primary-500); outline-offset: 2px;`).
- **Motion Restraint**: Add `@media (prefers-reduced-motion: reduce)` to disable non-essential animations.
- **Safe Area Insets**: Add `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)` for mobile device notches and bottom home indicators.

### 2. Responsive Navigation Bar (`Navbar.tsx`)
- On desktop (>= 768px): Show streamlined horizontal navigation and user status.
- On mobile (< 768px):
  - Accessible hamburger menu button (`aria-expanded`, `aria-label`, `aria-controls`).
  - Mobile slide-down drawer with 44px touch targets for each navigation item.
  - Close button and backdrop click dismissal.
  - Keyboard navigation with Escape key closing and focus management.

### 3. Mobile-First Page Refactoring
- **Landing Page (`LandingPage.tsx`)**:
  - Hero section: Mobile-first 1-column layout reflowing to 2 columns on desktop. Fluid typography (`clamp`). Full-width mobile CTA buttons with 44px touch targets.
  - Mockup Graphic Card: Auto-scales cleanly on 320px-375px screens without clipping or overflow.
  - Preparation Loop: Reflows from horizontal scroll/multi-col to a clean vertical adaptive progress trail on mobile.
  - Evidence/Stats & Feature Cards: 1-column on mobile, 2-column on tablet, 4-column on desktop.
- **Resume Analysis Page (`ResumeAnalysisPage.tsx`)**:
  - Header actions ("Re-upload" & "Download Report"): Stack or wrap gracefully on mobile viewports with full touch targets.
  - Top 2 score cards: 1-column on mobile, 2-column on desktop.
  - Submetrics breakdown: Adaptive wrap instead of squished 3-column layout on small screens.
  - Horizontal Tab Navigation: Thumb-friendly scrolling with scroll hints, 44px min tap targets.
  - Extracted Info / Skills / Roles: Reflow to 1-column on mobile.
  - Modal: Responsive full-width dialog with safe padding on mobile viewports.
- **Student Dashboard (`DashboardPage.tsx`)**:
  - Responsive header banner and action buttons.
  - Preparation loop cards & company benchmark cards reflow to single column on mobile.
- **Auth & Profile Pages (`LoginPage.tsx`, `RegisterPage.tsx`, `ProfilePage.tsx`)**:
  - Mobile card margins adapt to prevent wasted vertical screen space and viewport clipping.
  - Profile 2-column input grid reflows to 1-column on mobile.
  - All form inputs, selects, and textareas ensure 44px touch height and 16px minimum font size.
- **Form Controls (`FormField.tsx`)**:
  - Minimum touch height of 44px.
  - Mobile font-size 16px (`1rem`) to prevent iOS zoom.

## Definition of Done
1. Mobile viewports (320px, 375px, 414px) display with zero horizontal overflow (`overflow-x: hidden`).
2. Navigation works seamlessly across mobile, tablet, and desktop with accessible drawer toggle.
3. All interactive buttons and links satisfy the 44px x 44px minimum touch target specification.
4. Input fields do not trigger unwanted mobile auto-zooming.
5. All existing functionality (routing, auth, resume analysis, profile updates, upload modal) functions without regression.
6. Linting and TypeScript builds pass cleanly.
