---
name: designmotionhq-ux-system
version: 1.0.0
description: >
  Senior-level UI/UX design and audit skill built from the DesignMotionHQ UX Pattern Library
  and the accompanying Design System Blueprint. Use this skill whenever designing, auditing,
  refactoring, or implementing product UI. Apply token-first foundations, complete state modeling,
  interaction patterns, responsive behavior, accessibility, feedback/recovery, motion, hierarchy,
  and anti-generic/anti-AI visual principles. Do not invent missing source-specific guidance.
---

# DesignMotionHQ UX System Skill

## Mission

Build interfaces that feel deliberate, coherent, responsive, accessible, and product-specific rather than generic or AI-generated.

Use the following hierarchy for every UI decision:

```text
USER INTENT
  -> INFORMATION HIERARCHY
  -> DESIGN TOKENS / FOUNDATIONS
  -> COMPONENT ANATOMY
  -> ALL STATES
  -> INTERACTION PATTERN
  -> FEEDBACK + RECOVERY
  -> RESPONSIVE / TOUCH / KEYBOARD
  -> MOTION
  -> VISUAL POLISH
```

Do not stop at the happy-path screenshot. Design the complete interaction system.

## Source basis

This skill is based on:

1. DesignMotionHQ UX Pattern Library: https://designmotionhq.com/patterns
2. DesignMotionHQ UX Engine / homepage: https://designmotionhq.com/
3. The attached 11-page DesignMotionHQ Design System Blueprint PDF.

The live catalog currently exposes 76 patterns. The Blueprint is the foundations layer: colors, typography, spacing, components, iconography, motion, best practices, and a design-system checklist.

Important source-fidelity rule:

- Preserve DesignMotionHQ terminology where practical.
- The pattern notes below are concise implementation paraphrases, not verbatim copies of the source.
- Never fabricate details for a pattern whose detailed page is unavailable. For such patterns, use only the catalog description recorded here.
- Do not silently substitute a different UX rule and claim it came from DesignMotionHQ.

# 1. Non-negotiable operating rules

## 1.1 Token first

Never scatter arbitrary colors, spacing, radii, typography values, elevation values, or motion values throughout components.
Use a foundation scale plus semantic tokens.

Prefer:

```text
primitive token -> semantic token -> component usage
```

Examples from the Blueprint:

```text
bg.primary
bg.surface
border.default
text.primary
text.muted
brand.primary
status.success
status.error
```

## 1.2 Complete states

Every interactive component must be considered across the relevant state set:

```text
idle/default
hover
focus
active/pressed
selected
disabled
loading
success
error
empty
partial/indeterminate
offline/reconnecting
```

The state set is context-dependent, but never assume a component only needs its default state.

## 1.3 Interaction before decoration

When a UI looks weak, first inspect:

- information hierarchy
- discoverability
- state completeness
- feedback timing
- recovery behavior
- touch/keyboard behavior
- loading/error/empty paths

Only then tune shadows, gradients, blur, glow, or ornament.

## 1.4 No hover dependency for primary actions

Hover may reveal secondary actions, but primary actions must remain reachable without hover.
Touch and keyboard users must have equivalent access.

## 1.5 Recovery over unnecessary punishment

For reversible mistakes, prefer immediate action + undo/recovery over repeated confirmation walls.
Use stronger friction when the operation is truly irreversible or high-risk.

## 1.6 Optimism only where safe

Optimistic UI is appropriate for cheap, reversible operations. Keep server authority for financial, security-sensitive, or irreversible outcomes.

## 1.7 Motion has a job

Motion should communicate state, hierarchy, relationship, spatial continuity, or feedback. It must not exist merely to show off.

## 1.8 Preserve user context

Do not cause avoidable layout jumps, focus loss, scroll jumps, selection loss, draft loss, or navigation-context loss.

# 2. Design System Blueprint foundation rules

## 2.1 Color system

Blueprint principle:

> Define a semantic color palette. Do not use raw hex values; use tokens with meaningful names.

Example primary scale shown in the Blueprint:

```text
900 800 700 600 500 400 300 200 100
```

The PDF example maps semantic roles such as `bg.primary`, `bg.surface`, `border.default`, `text.primary`, `text.muted`, `brand.primary`, `status.success`, and `status.error`.

Operational rules:

- Use semantic roles in components.
- Keep primitive values centralized.
- Make theme switching a token-set concern.
- Do not use raw hex values inside component implementation.
- Limit accent usage and reserve semantic colors for semantic meaning.

## 2.2 Typography

Blueprint modular scale:

| Role | Size | Weight |
|---|---:|---:|
| text-5xl | 48px | 800 |
| text-4xl | 36px | 700 |
| text-3xl | 28px | 700 |
| text-2xl | 22px | 600 |
| text-lg | 18px | 400 |
| text-base | 15px | 400 |
| text-sm | 13px | 400 |
| text-xs | 11px | 500 |

Weight scale:

```text
400 Regular
500 Medium
600 Semibold
700 Bold
800 Extrabold
```

Line-height guidance from the Blueprint:

```text
Headings: 1.1–1.3
Body:     1.5–1.7
UI:       1.0–1.2
```

Use tighter line-height for large display text and looser line-height for smaller readable text.

## 2.3 Spacing and grid

Blueprint base unit: 4px.

Spacing scale shown:

```text
space-1  = 4px
space-2  = 8px
space-3  = 12px
space-4  = 16px
space-6  = 24px
space-8  = 32px
space-12 = 48px
space-16 = 64px
```

Grid example:

```text
12 columns
16–24px gutters
24–48px outer margins
```

Use the system rather than eyeballing isolated spacing decisions.

## 2.4 Components

Every reusable component is a building block. Define variants, sizes, anatomy, behavior, and states.

The Blueprint examples include:

- Button: primary, secondary, ghost, destructive
- Button sizes: small, medium, large
- Input
- Card
- Badge: new, active, pending, error, default
- Disabled/not-editable variants

Document component props and responsive behavior.

## 2.5 Iconography

Blueprint icon sizes:

```text
16px inline
20px default
24px navigation
32px feature
48px hero
```

Style principles:

- consistent icon style
- consistent stroke weight
- consistent visual weight
- rounded caps/joins where using that style
- optical alignment
- 24×24 default bounding box
- `currentColor` for fills where appropriate
- use one icon family consistently

Recommended libraries named in the Blueprint:

- Lucide
- Phosphor
- Heroicons
- Radix Icons

Touch principle from the Blueprint:

- The visual icon can be about 20px.
- The interactive target should be at least 44×44px.

## 2.6 Motion

Blueprint duration scale:

```text
100ms = micro: hover, toggle, fade
200ms = small: button press, tooltip
300ms = medium: modal, dropdown
400ms = large: page transition, slide
500ms = XL: complex orchestration
```

Blueprint easing guidance:

```text
ease-out    = enter/appear
ease-in-out = move/resize
ease-in     = exit/leave
```

Core motion principles:

- Purposeful: guide attention and show relationships.
- Fast: do not block the user; the Blueprint gives 300ms as a maximum interaction target.
- Natural: follow physics; use entrance/exit curves intentionally.

## 2.7 Blueprint best-practice rules

Use:

- consistent spacing
- a limited color palette
- a deliberate type scale
- documented component states
- semantic color tokens

Avoid:

- random spacing
- using every color
- arbitrary font sizes
- designing only the happy path
- hardcoded hex values

## 2.8 Blueprint build checklist

Foundations:

- color palette: primary, neutral, semantic
- typography: sizes, weights, line-heights
- spacing system: 4px or 8px base
- grid: columns, gutters, breakpoints
- icon library and sizing rules

Components:

- atomic components such as Button/Input/Badge
- all required states
- composite components such as Card/Modal/Dropdown
- props and variants documentation
- responsive behavior

Documentation:

- usage guidance
- code examples
- naming conventions
- contribution guide

Motion/polish:

- easing and duration scale
- transition rules
- dark/light semantic tokens
- loading states
- empty states

# 3. DesignMotionHQ 76-pattern operating library

For each pattern below, use the listed principle set as a decision aid. When implementing a pattern, also inspect the adjacent patterns in the same category.

---

## INTERACTION PATTERNS

### 01 — CSS Has Selector

Core: Let CSS react to DOM state when that state already exists in the DOM.

Rules:

- Use `:has()` for parent-aware state when JavaScript state duplication is unnecessary.
- Use `:user-invalid`/native state where it can provide validation styling without premature React state.
- Let parent containers react to child state when CSS can derive it.
- Use CSS for DOM-dependent layout changes when possible.
- Do not mirror trivial DOM state into React just to toggle classes.
- Do not create JavaScript cleanup effects for effects CSS can naturally reverse.
- Do not count children in JavaScript when CSS quantity/layout queries can do the work.

### 02 — Bulk Actions

Core: Bulk selection is a system, not a lone checkbox.

Rules:

- Model master checkbox as unchecked / indeterminate / checked.
- Clearly communicate the number and scope of selected items.
- Keep selection state beyond only the current rendered page where the interaction implies cross-page selection.
- Support range selection where appropriate.
- Reconcile counts when filters/scope change.
- Destructive bulk operations benefit from reversible undo windows when recovery is possible.
- Do not silently discard selection when pagination/filtering changes.
- Do not pretend a two-state select-all accurately expresses partial selection.

### 03 — Disabled Buttons

Core: A disabled button can hide why the action is blocked.

Rules:

- Avoid making the blocker undiscoverable.
- Remember disabled controls may leave keyboard navigation and may not expose useful tooltip behavior.
- Prefer reachable explanatory copy and validation feedback.
- Distinguish loading from disabled.
- Preserve focus/context during asynchronous submission.
- Validate on action and identify the field or condition blocking completion where appropriate.
- Do not rely on a disabled-looking control as the only explanation.

### 04 — Hover Trap

Core: Hover is a desktop capability, not a universal input method.

Rules:

- Primary actions must not depend on hover.
- Use pointer capability detection instead of user-agent sniffing.
- Use hover to reveal secondary actions only when an accessible non-hover path exists.
- Keep the visual icon smaller than its true interactive area when needed.
- Pad touch targets to at least 44px.
- Do not make the tap target equal to a tiny visual glyph.

### 05 — Behind the Button

Core: A click begins a transaction; the UI must account for validation, server truth, writes, and reconciliation.

Rules:

1. Validate client-side for immediate feedback.
2. Validate again on the server.
3. Recompute trusted values server-side.
4. Use database transactions for related writes that must be atomic.
5. Treat the authoritative response as new UI truth.
6. Use optimistic UI only when the action is cheap and reversible.

Never trust client-supplied prices, totals, permissions, or other security-sensitive derived values.

### 06 — Inline Editing

Core: Text-to-input should preserve object identity and layout.

Rules:

- Make editability discoverable with a subtle cue.
- Preserve typography, spacing, and geometry when entering edit mode.
- Enter commits; Escape cancels, unless the product has an intentionally different documented convention.
- Standardize blur semantics.
- Prefer immediate visual feedback with rollback on save failure for low-risk edits.
- Retain the user's draft when a save fails.
- Avoid layout jumps during mode changes.

### 07 — Live Cursors

Catalog description available from DesignMotionHQ: multiple cursors can land on a shared canvas and the remote cursors need to remain distinguishable from the current user's cursor.

Source-fidelity rule: the detailed page was not available in the current crawl. Do not invent additional DesignMotionHQ-specific rules for this pattern.

### 08 — Destructive Actions

Core: Dangerous actions are a design language, not merely a red button.

Rules:

- Make destructive verbs explicit on the action itself.
- Use stronger friction according to irreversibility/risk.
- A hold-to-confirm interaction can replace a modal when appropriate.
- Do not put destructive actions where users habitually expect primary confirmation.
- Treat red as a scarce semantic resource for genuine destruction.
- Isolate irreversible actions visually when helpful.
- Do not use generic Yes/No labels when the actual action can be named.

### 09 — Context Menu

Core: A context menu is a full interaction system.

Rules:

- Measure viewport space and flip placement when needed.
- Group actions by semantic intent.
- Separate destructive actions.
- Handle submenu hover intent so diagonal pointer movement does not accidentally close a submenu.
- Support keyboard navigation, Escape, and predictable focus.
- Provide a touch/mobile equivalent because mobile has no right-click.
- Do not depend on right-click as the only route to important actions.

### 10 — Drag and Drop

Core: Dragging is state movement, not just pixel movement.

Rules:

- Communicate the source, destination, and current insertion/drop state.
- Treat reorder/move as a state transition that can succeed or fail.
- Preserve recoverability for costly moves.
- Provide keyboard/accessibility alternatives where the action matters.
- Keep drag affordance distinguishable from ordinary click targets.
- Do not let drag behavior silently destroy context or lose the item.

### 11 — Dropdown Design

Core: Dropdowns need hierarchy, placement, selection, and complete interaction states.

Rules:

- Choose placement based on available viewport space.
- Make trigger, menu, active/selected, disabled, focus, and open states explicit.
- Keep selection semantics clear.
- Support keyboard navigation.
- Ensure the menu does not visually detach from its trigger.
- Avoid overflowing or clipping critical options.

### 12 — Peak-End Rule

Core: Users remember standout moments and endings more strongly than the average experience.

Rules:

- Protect the strongest interaction and final transition from unnecessary friction.
- Make meaningful completion feel intentional.
- Review onboarding, checkout, publishing, and task completion endings as experience-defining moments.
- Do not let the final state be a dead-end, error, or abrupt transition.

### 13 — Search Experience System

Core: Search is a system, not one text field.

Model the flow as:

```text
entry -> suggestions/autocomplete -> query -> results -> empty/error -> refinement
```

Rules:

- Make search entry discoverable.
- Support useful suggestions without overwhelming the user.
- Provide clear result states and no-result recovery.
- Preserve/refine the query rather than forcing restart.
- Consider recent queries where appropriate.
- Keep keyboard interaction coherent.

### 14 — Star Rating

Core: Five stars become non-trivial once hover, partial values, and aggregate averages appear.

Rules:

- Make hover/preview behavior explicit.
- Support half/partial values if the data model supports them.
- Display aggregate averages honestly rather than implying precision that is not present.
- Provide accessible labels and keyboard interaction.
- Separate user's editable rating from aggregate product rating.

### 15 — Tooltip Design

Core: Tooltips need timing, placement, restraint, and accessible naming.

Rules:

- Use tooltips for supplemental information, not essential instructions.
- Avoid tooltip overload.
- Position relative to available viewport space.
- Use consistent show/hide timing.
- Do not hide important actions or labels inside hover-only tooltips.
- Ensure keyboard/focus users can receive equivalent support.

### 16 — Swipe Actions

Core: Hidden swipe actions can become hard to discover and hard to predict.

Rules:

- Keep the primary row/item interaction discoverable without swipe.
- Reveal action scope clearly after a gesture.
- Provide an alternative action path where possible.
- Avoid accidental destructive swipes.
- Ensure swipe state can be closed without trapping the user.

### 17 — Bottom Sheets

Core: Bottom sheets place contextual actions within thumb reach, especially on mobile.

Rules:

- Use for contextual/action surfaces that do not require a blocking desktop-style modal.
- Respect safe areas and touch targets.
- Give a clear dismissal route.
- Preserve enough underlying context to orient the user.
- Use full-screen treatment when content/interaction complexity demands it.

### 18 — Color Picker UX

Core: A color picker should help the user make a design decision, not merely choose a hue.

Rules:

- Show usable previews.
- Expose recent/saved colors when helpful.
- Include contrast/legibility feedback for UI-facing colors.
- Preview transparency against more than a single background context.
- Provide useful representations for implementation.
- Consider generating a coherent color family from a chosen base.

### 19 — Command Palette

Core: `Cmd/Ctrl + K` is a command system, not simply another search box.

Rules:

- Use fuzzy matching where appropriate.
- Group results by intent/category.
- Keep keyboard operation first-class.
- Show useful recent/suggested commands at entry.
- Handle async results without freezing the surrounding UI.
- Support nested command flows without losing orientation.
- Visible navigation must still exist; the palette is an accelerator, not the only route.

### 20 — Filter Chips

Core: Filters are an interactive scope system.

Rules:

- Distinguish idle, active, selected, and disabled states.
- Update counts/results as filters change.
- Keep active scope visibly summarized.
- Provide one-tap Clear All/reset.
- Keep overflow manageable and horizontally usable when appropriate.
- Do not let wrapping create an uncontrolled wall of chips.

### 21 — Accordion Disclosure

Core: Smooth disclosure requires animation, semantics, state model, and viewport stability.

Rules:

- Do not expect `height: auto` to transition directly.
- Use grid rows (`0fr` to `1fr`) or measured heights when appropriate.
- Synchronize chevron rotation and panel timing.
- Decide single-open vs multi-open based on content semantics.
- Use a real `<button>` header.
- Wire `aria-expanded` and `aria-controls` correctly.
- Prevent scroll jumping when a lower item expands.

### 22 — Data Table

Core: A real table is a system of hierarchy, sorting, selection, density, and responsive behavior.

Rules:

- Define a clear sort cycle including restoration of natural/original order where appropriate.
- Right-align numeric values and use tabular figures where supported.
- Keep headers visible when long scrolling is expected.
- Freeze important identifying columns where horizontal scrolling is required.
- Make density deliberate rather than arbitrary.
- Make row selection usable beyond a tiny checkbox alone.
- Use an indeterminate select-all state.

### 23 — Modal Hierarchy

Core: Not every overlay should be a modal.

Decision model:

```text
blocking critical decision -> modal
mobile contextual/action -> bottom sheet
actions/side content -> drawer
small anchored contextual action -> popover
```

Rules:

- Ask first whether the experience actually blocks the user.
- Use the lightest suitable surface.
- Preserve context when possible.
- Keep destructive/blocking interruptions rare and justified.

---

## VISUAL PATTERNS

### 24 — De-AI Landing Hero

Core: Avoid the recognizable visual tells of generic AI-generated landing pages.

Rules:

- Replace adjective-heavy generic headlines with a concrete outcome + audience.
- Remove generic purple/gradient blobs used merely to add energy.
- Prefer a neutral base with one controlled accent tied to the product.
- Avoid two equal-weight CTAs competing for the same attention.
- Use real, verifiable proof instead of invented social proof.
- Replace generic feature-card grids with product-grounded evidence and annotations where useful.
- Make the product itself the visual evidence.

### 25 — Reverse-Engineered Linear

Core: A premium interface can come from density, value, alignment, shortcuts, restrained color, and fast motion rather than decorative effects.

Rules:

- Higher information density can communicate competence when hierarchy stays clear.
- Use tonal surface layering instead of relying on heavy blur/shadows.
- Use one controlled accent color for key selections/actions.
- Surface actionable keyboard shortcuts.
- Keep interaction feedback fast.
- Use a coherent spacing/grid rhythm.
- Avoid turning every status into a colored pill or every surface into a shadowed card.

### 26 — Charts That Lie

Core: The rendering of data can materially change the story users perceive.

Rules:

- Bar chart baselines should start at zero when appropriate to avoid exaggerating magnitude.
- Choose chart type based on the analytical question.
- Treat aspect ratio as part of the visual message.
- Remove non-informational visual ink.
- Use color to encode meaning, not decoration.
- Titles should help communicate the takeaway rather than merely restating a metric.

### 27 — Design System Kit

Core: Random hex values and eyeballed pixels do not scale.

Rules:

- Centralize tokens.
- Build numbered scales.
- Define typography systematically.
- Use a 4px spacing rhythm.
- Standardize component states and variants.
- Define motion curves/durations as a system.
- Make theme changes token-driven.

### 28 — Golden Ratio

Core: Proportion can establish repeatable visual relationships.

Rules:

- Use 1.618 as a design aid when useful.
- Example sequence: 8 -> 13 -> 21 -> 34 -> 55.
- Major splits can use an approximate 62/38 relationship.
- Typography may use proportional relationships.
- Round values into usable design tokens.
- Do not force the ratio where content, accessibility, or the existing grid is more appropriate.

### 29 — Grid System

Core: Establish a consistent alignment system before intentionally breaking it.

Rules:

- 12 columns support common divisions.
- Common patterns include 4/8, 6/6, and 3/9.
- Choose gutter size intentionally.
- Reflow grid structure across breakpoints.
- Break the grid deliberately, not randomly.
- Shared edges create visual craftsmanship.

### 30 — Proximity Rule

Core: Near means related; far means separate.

Rules:

- Tighten intra-group spacing.
- Increase spacing between semantic groups.
- Use whitespace as structural communication.
- Do not add boxes/borders when spacing already communicates grouping.
- Apply the rule to forms, toolbars, navigation, cards, lists, and settings.

### 31 — Shadow Elevation

Core: Shadows encode hierarchy and depth.

Rules:

- Use layered shadow logic rather than one generic drop shadow.
- A tighter contact shadow can anchor an object.
- A broader softer component shadow can separate it from the surface.
- Stronger elevation should mean something.
- Subtle branded glow can be used carefully.
- Do not use identical shadow treatment on everything.

### 32 — Visual Hierarchy

Core: Decide what users notice first, second, and third.

Rules:

- Use size as one hierarchy signal.
- Use typography weight strategically.
- Use contrast and whitespace to separate levels.
- Spend accent color selectively.
- Combine multiple hierarchy signals rather than relying on size alone.
- Avoid giving every element equal emphasis.

### 33 — Z-Index Mastery

Core: `z-index` does not override stacking-context rules.

Rules:

- Understand positioning and stacking contexts.
- Inspect actual stacking behavior before increasing `z-index`.
- Use local/isolation-based stacking where useful.
- Avoid escalating values like `9999` without understanding the root cause.

### 34 — Gradient Design

Core: Uncontrolled gradients make UI feel cheap and noisy.

Rules:

- Prefer related hues.
- Keep lightness movement controlled.
- Use gradients as environmental/ambient context where appropriate.
- Avoid placing important text over unpredictable transition zones.
- Use subtle grain only where it materially helps.
- Test in varied display/rendering conditions.

### 35 — Icon Design Rules

Core: Icon polish is mainly consistency + optical correction.

Rules:

- Equal mathematical size is not always equal perceived size.
- Optically correct circles/organic forms when needed.
- Use a coherent icon grid.
- Keep stroke style consistent.
- Keep bounding boxes coherent.
- Do not randomly mix filled and outlined icon families.

### 36 — Design Tokens

Core: Tokens form a chain from values to meaning to component usage.

Model:

```text
primitive -> semantic -> component
```

Rules:

- Name tokens by role/meaning rather than literal color.
- Change primitives centrally and propagate through dependent semantic roles.
- Use scales for type and spacing.
- Make dark mode a semantic token mapping, not a global inversion.
- Keep component code free of scattered raw values.

### 37 — Color Accessibility

Core: Contrast is a relationship, not a property of one color alone.

Rules:

- Check text/background combinations.
- Use the Blueprint/site's accessibility framing and WCAG contrast expectations as relevant to the interface.
- Treat muted gray text as a common failure point.
- Never communicate status by color alone.
- Pair color with labels/icons/shape/direction where applicable.

### 38 — Gestalt Laws

Core: Users perceive grouping and structure before detailed analysis.

Patterns referenced:

- Closure
- Similarity
- Continuity
- Figure-ground
- Common region

Rules:

- Use similarity to group related items.
- Align related items to create continuity.
- Use common regions when proximity alone is insufficient.
- Reduce unnecessary background competition to strengthen figure-ground distinction.

### 39 — Border Radius

Core: Consistent radius geometry contributes heavily to perceived polish.

Rules:

- Create a reusable radius scale.
- Consider outer radius + padding when calculating nested inner corners.
- Larger surfaces can use larger radii in the system.
- Match radius personality to product personality.
- Avoid inventing a new radius on every component.

### 40 — Dark Mode

Core: Dark mode should be designed as a hierarchy, not a color inversion.

Rules:

- Prefer near-black over absolute black as the default foundation when consistent with the system.
- Use multiple tonal surface levels.
- Control accent saturation.
- Consider off-white rather than pure-white body text when appropriate.
- Use text contrast/opacity to create hierarchy.
- Do not simply invert a light palette.

### 41 — Von Restorff Effect

Catalog description available from DesignMotionHQ: identical options can become more noticeable when one is isolated/distinguished.

Source-fidelity rule: the detailed page was not available in the current crawl. Do not invent additional DesignMotionHQ-specific numeric claims or rules.

### 42 — Perfect Card

Core: Perceived card quality comes from small coordinated CSS decisions.

Rules:

- Use deliberate internal padding.
- Establish title/body hierarchy.
- Use subtle borders where surface separation needs help.
- Use layered/shallow depth instead of generic heavy shadow.
- Give interactive cards restrained hover treatment.
- Do not scale the whole layout footprint in a way that makes surrounding content jump.

### 43 — Depth Layers

Core: Dimensionality can come from small coordinated depth cues.

Rules:

- Combine shadow layers, borders, tonal surfaces, and restrained transforms.
- Use depth to communicate hierarchy.
- Parallax can imply distance when appropriate.
- `translateZ`/small scale can strengthen hover presence when used carefully.
- Keep depth subtle enough that content remains primary.

---

## FORMS PATTERNS

### 44 — Settings System

Core: Settings is a system; apply model should match the setting's blast radius.

Rules:

- Low-risk toggles can commit immediately with clear saved feedback.
- High-stakes identity fields can use explicit Save/Cancel.
- Group by user task, not organization/schema structure.
- Make settings searchable.
- Show modified indicators.
- Offer per-setting reset.
- Quarantine destructive actions in a visually separated area.
- Gate irreversible deletion appropriately.
- Hide advanced settings behind progressive disclosure when useful.

### 45 — Autosave

Catalog description available from DesignMotionHQ: autosave can appear successful even when connectivity fails during editing.

Source-fidelity rule: the detailed page was not available in the current crawl. Do not invent additional DesignMotionHQ-specific rules.

### 46 — Date Pickers

Core: Good date selection respects common use and minimizes unnecessary clicks.

Rules:

- Offer useful presets where the task commonly uses recurring ranges.
- Give custom range selection immediate visual preview.
- Make start/end refinement simple.
- Show adjacent months together where useful.
- Support keyboard navigation/direct entry.
- Use an interaction model appropriate to mobile rather than shrinking a desktop popover.

### 47 — Form Field States

Core: A field is a state system.

States emphasized by the site:

```text
Default
Focus
Error
Success
Disabled
Loading
```

Rules:

- Keep labels persistent and visible.
- Use clear focus styling.
- Use multiple error signals, not color alone.
- Show success close to the field when meaningful.
- Distinguish disabled from loading.
- Do not treat reduced opacity as a complete interaction explanation.

### 48 — Input Masking

Core: Formatting should make input easier without corrupting the underlying value.

Rules:

- Group long values into readable chunks.
- Preserve caret position while formatting.
- Normalize pasted values.
- Avoid premature error feedback during partial entry.
- Display formatted values while keeping a canonical stored value.

### 49 — Range Sliders

Core: Human fingers are imprecise; slider design must absorb that.

Rules:

- Make the effective hit area larger than the visible track.
- Show selected track/range clearly.
- Expose the exact current value, especially during drag.
- Use snapping where meaningful values matter.
- Support keyboard interaction including directional movement and bounds.
- Provide two-thumb/range semantics where required.

### 50 — Stepper Wizard

Core: Split long forms into meaningful cognitive steps.

Rules:

- Group fields by meaning/context.
- Show progress.
- Validate within the relevant step.
- Preserve state when moving backward.
- Preserve state across refresh when practical.
- Avoid saving users from an enormous final validation surprise.

### 51 — Toggle Anatomy

Core: Tiny geometry + coordinated motion significantly affect perceived quality.

Rules:

- Make rail/knob proportions intentional.
- Animate the state as one coherent morph.
- Coordinate position, color, label, and shadow if animated.
- Support keyboard and semantics.
- For safe async toggles, optimistic state can be reconciled/rolled back.
- Distinguish busy state from a permanent disabled appearance.

### 52 — Form Validation Timing

Core: Validation timing determines whether feedback helps or punishes.

Preferred model from the pattern:

```text
initial entry -> blur validation -> live recovery after error
```

Rules:

- Avoid flashing errors while the user is mid-entry.
- Validate when the field meaningfully loses focus.
- Once invalid, allow immediate live recovery as the user corrects it.
- Use submit-time validation as a final safety net, not the only feedback.

### 53 — File Upload UX

Core: File upload is a status/recovery workflow.

Rules:

- Give visible drag-over feedback.
- Show upload progress where measurable.
- Surface failures inline and offer retry.
- Do not force users to start from zero after a recoverable failure.
- Use filename + preview/status when useful for confidence.
- Isolate failures in multi-file queues.

### 54 — Password Field UX

Core: Strength is better coached continuously than guessed from a static rule list.

Rules:

- Show requirements while creating the password.
- Provide useful strength feedback.
- Offer password visibility.
- Allow paste/password-manager interaction.
- Offer generated strong passwords where appropriate.
- Do not block paste merely to enforce an artificial security ritual.

### 55 — OTP Input

Core: Multiple visible boxes should behave as one logical code field.

Rules:

- Treat the code as one stored value.
- Support paste/autofill.
- Move focus naturally as digits arrive.
- Make Backspace behave predictably.
- Use numeric input capabilities on mobile where suitable.
- Throttle resend and expose the remaining wait.
- Clearly communicate incorrect and correct states.

---

## FEEDBACK PATTERNS

### 56 — Doherty Threshold

Core: Perceived responsiveness is a UX design variable.

Rules:

- Provide visible acknowledgment quickly.
- Treat roughly 400ms as a meaningful perceived-speed boundary from the site's model.
- Use optimistic UI for safe reversible operations.
- Use skeleton/progress/loading feedback for unavoidable waits.
- Avoid leaving the interface visually frozen.

### 57 — Error States

Core: Errors should explain the problem and the recovery path.

Rules:

- Field errors belong close to the relevant field.
- Temporary connectivity problems can use banners/toasts where appropriate.
- Blocking failures deserve stronger surfaces.
- Every error should expose a realistic recovery route.
- Prefer prevention and early validation where practical.
- Do not surface raw system codes as user-facing explanation.

### 58 — Loading States System

Core: Loading treatment depends on what is known about the wait.

Use the site’s mapping as a heuristic:

```text
known content shape + meaningful wait -> skeleton
unknown short wait -> spinner/activity indicator
known measurable completion -> progress
safe reversible mutation -> optimistic UI
very short wait -> often no loading UI
```

Rules:

- Do not default to skeletons for every request.
- Do not flash loaders for tiny waits.
- Choose feedback from the actual wait characteristics.

### 59 — Notification System

Core: Notifications are a system of surfaces with different urgency.

Surfaces referenced:

```text
Toast
Banner
Modal
Badge
```

Rules:

- Match surface to severity/persistence.
- Keep low-priority messages lightweight.
- Reserve blocking surfaces for situations that truly require attention.
- Avoid notification fatigue.

### 60 — Toast Notifications

Core: Toasts should inform without blocking active work.

Rules:

- Use placement appropriate to desktop/mobile context.
- Match persistence to message severity.
- Cap visible stacks.
- Allow dismissal and/or appropriate reading time.
- Pair semantic color with icon/structure.
- Do not auto-dismiss critical failures that require attention.

### 61 — Zeigarnik Effect

Core: Unfinished tasks tend to remain mentally active.

Rules:

- Make meaningful unfinished work visible.
- Use progress when the unfinished outcome matters.
- Keep remaining work understandable.
- Do not manufacture irrelevant unfinished tasks merely to create artificial engagement.

### 62 — Undo UX

Core: Immediate action + reversible recovery can be more respectful than repeated confirmation.

Rules:

- Prefer undo when mistakes are recoverable.
- Use soft delete where feasible.
- Use stronger friction for irreversible actions.
- Show the recovery window clearly.
- Build larger history systems where the product genuinely needs multiple undo levels.

### 63 — Optimistic UI

Core: A reversible action can feel instant when the expected result appears before server confirmation.

Rules:

- Update immediately for safe reversible actions.
- Reconcile with the server.
- Roll back visibly and cleanly on failure.
- Do not claim irreversible/financial success before authoritative confirmation.

### 64 — Skeleton Loading

Core: A skeleton previews known structure and can reduce the feeling of waiting when appropriate.

Rules:

- Match skeleton geometry to final content.
- Use animation to indicate continued activity.
- Prefer it when layout is known and the wait is meaningful.
- Avoid using skeletons for every request.
- Do not use loading placeholders for operations that are effectively instantaneous.

---

## MOTION PATTERNS

### 65 — Animation Timing

Core: Timing changes how the interface feels.

Rules:

- Immediate press feedback should be very fast.
- Typical entrances can sit around the 200–300ms range from the site's pattern guidance.
- Exits are commonly faster than entrances.
- Longer durations can be reserved for attention sequences or coordinated transitions.
- Stagger related content consistently.
- Pair duration with an appropriate easing curve.

### 66 — Easing Curves

Core: Easing determines perceived physical character.

Rules:

- Ease-out is a strong entrance default.
- Ease-in is useful for exits.
- Ease-in-out is useful for moves/resizes.
- Springs should remain restrained and purposeful.
- Keep motion language coherent across components.
- Avoid default linear motion for natural interface movement.

### 67 — Card Hover Anatomy

Core: Interactive cards can feel alive without disrupting the layout grid.

Rules:

- Use restrained lift/translation.
- Expand shadow or change surface subtly.
- Reveal secondary actions carefully.
- Keep the card's footprint stable.
- Animate media inside an overflow-hidden frame rather than scaling the whole grid item.
- Do not let hover controls collide with primary content.

### 68 — Scroll-Driven Animations

Core: Scroll can become an animation timeline without a JavaScript scroll listener for supported effects.

Rules:

- Use scroll timelines when appropriate.
- Use `animation-range` intentionally.
- Use view timelines for visibility-driven effects where suitable.
- Use sticky + scroll progress for headers/reading indicators when meaningful.
- Avoid reinventing native CSS behavior with high-frequency scroll listeners.
- Keep scroll-driven motion subtle and purposeful.

---

## NAVIGATION PATTERNS

### 69 — Navigation Patterns

Core: Navigation model should match device, information depth, and task frequency.

Patterns:

```text
mobile primary destinations -> bottom tabs
large desktop hierarchy -> persistent sidebar
compact/secondary navigation -> hamburger/menu
power-user acceleration -> command palette
hierarchical depth -> breadcrumbs
```

Rules:

- Keep primary destinations discoverable.
- Use command palette as an accelerator, not the only navigation.
- Use breadcrumbs only when hierarchy/depth justifies them.

### 70 — Tabs System

Core: Tabs are a system, not merely a visual widget.

Rules:

- Animate the active indicator coherently.
- Keep tabs on one row where possible; provide overflow behavior rather than uncontrolled wrapping.
- Support keyboard navigation.
- Distinguish active and focus states.
- Keep content switching spatially coherent.
- Use a mobile-appropriate strategy instead of simply shrinking a desktop tab bar.

### 71 — Focus States

Core: Keyboard focus must remain visible and meaningful.

Rules:

- Never remove the outline without a sufficiently visible alternative.
- Use `:focus-visible` where appropriate.
- Provide strong focus-ring thickness/offset/contrast.
- Keep DOM order and visual order coherent.
- Trap focus in dialogs when they truly block interaction.
- Restore focus after modal/dialog close.
- Provide skip navigation when the page structure warrants it.

### 72 — Pagination

Core: Pagination is affected by dataset volatility, context preservation, and URL state.

Rules:

- Use stable strategies appropriate to changing datasets.
- Consider cursor pagination where offsets become unstable.
- Use numbered, load-more, or infinite patterns according to the task.
- Collapse huge page ranges.
- Keep page location in the URL where navigation state should persist.
- Preserve list position/context when returning from detail pages.

---

## CONTENT PATTERNS

### 73 — Empty States

Core: Empty states are designed experiences, not blank screens.

Different causes need different messages:

```text
first use
no results
error
filtered out
```

Rules:

- Make intentional emptiness visually clear.
- Explain the situation in product language.
- Offer a useful next action.
- Teach the future populated state where that helps orientation.
- Do not use a generic “No data” message as the only response.

### 74 — Serial Position

Core: People tend to remember the beginning and end of a sequence more strongly than the middle.

Rules:

- Put important information where primacy/recency can help.
- Use strong openings and endings for onboarding, landing pages, and flows.
- Do not bury critical information only in the middle of a long sequence.

### 75 — Microcopy

Core: Words are part of the interface, not an afterthought.

Rules:

- Describe user benefit/action rather than internal system behavior.
- Turn errors into recovery guidance.
- Use real labels; do not rely on placeholder text as the only field label.
- Keep empty-state copy action-oriented.
- Avoid machine/log language when writing to users.

### 76 — Landing Page Skeleton

Core: A converting landing page can be organized as a deliberate narrative.

Five-section model:

```text
1. Hero
2. Proof
3. Problem
4. Solution
5. CTA
```

Rules:

- Hero answers what / who / why quickly.
- Use one dominant CTA.
- Put proof early.
- Establish the problem before selling the solution.
- Talk in outcomes, not only feature labels.
- Repeat the CTA at the end where appropriate.
- Do not let a visual carousel dilute the primary message.

# 4. Cross-pattern synthesis rules

These rules summarize the common behavior across the library. Apply them when several patterns overlap.

## 4.1 State completeness matrix

When reviewing a component/page, explicitly test:

| Dimension | Check |
|---|---|
| Default | What does it look like initially? |
| Hover | What changes under fine pointer? |
| Focus | Is keyboard focus obvious? |
| Active | What happens while pressing/interacting? |
| Disabled | Is the reason understandable? |
| Loading | What is happening during async work? |
| Success | What confirms completion? |
| Error | What failed and how can it be fixed? |
| Empty | What if there is no content? |
| Partial | What if only part of a set is available/selected? |
| Offline | What happens when connectivity disappears? |
| Recovery | How does the user undo/retry/correct? |

## 4.2 Responsiveness matrix

For every interaction, ask:

```text
Desktop pointer
Touch/mobile
Keyboard
Reduced-motion preference
Small viewport
Long content
Slow network
No network
Screen reader/semantic navigation
```

## 4.3 Risk matrix

Choose friction based on consequence:

```text
low-risk + reversible -> immediate action + feedback
medium-risk -> clear action naming + contextual confirmation/recovery
high-risk + irreversible -> deliberate friction + explicit action + recovery if available
```

## 4.4 Loading decision matrix

```text
< ~300ms        -> often no loader
known geometry  -> skeleton
unknown activity -> spinner/activity indicator
measurable work -> progress
safe reversible mutation -> optimistic UI
```

Do not apply one loading pattern globally.

## 4.5 Overlay decision matrix

```text
popover  -> small anchored context
sheet    -> mobile contextual actions
 drawer   -> side navigation/content
modal    -> truly blocking/critical decision
```

## 4.6 Semantic color discipline

Color should communicate role:

```text
brand -> identity / primary action
success -> successful state
error -> error/danger
warning -> caution
muted -> secondary information
surface -> layer/hierarchy
border -> separation
```

Do not use accent colors merely because an empty space “needs energy.”

# 5. AI implementation protocol

When an AI agent is asked to build or change UI, follow this sequence.

## Phase A — Inspect

Before writing UI code:

1. Identify the user and task.
2. Identify the primary action.
3. Identify secondary/tertiary actions.
4. Inspect the existing design tokens.
5. Inspect existing components and patterns.
6. Identify all relevant states.
7. Identify responsive and accessibility requirements.
8. Select the closest DesignMotionHQ patterns.

## Phase B — Plan

Create a concise implementation plan covering:

```text
layout hierarchy
component structure
tokens
states
interaction behavior
async behavior
loading/error/empty/offline
responsive behavior
keyboard/focus behavior
motion
recovery
```

## Phase C — Implement

Rules:

- Reuse the existing design system before creating new primitives.
- Use tokens rather than hardcoded values.
- Keep state semantics explicit.
- Prefer semantic HTML and accessible interactions.
- Keep touch targets sufficiently large.
- Avoid unnecessary React state when CSS/native state already solves the problem.
- Use the lightest interaction surface that matches the task.
- Keep motion tied to state or spatial relationship.

## Phase D — Audit

After implementation, audit the rendered UI, not only the source.

Check:

### Visual

- Is hierarchy obvious within 2–3 seconds?
- Is accent color overused?
- Are spacing values coherent?
- Are radii coherent?
- Are surfaces/dimensions intentional?
- Are icons visually consistent?
- Does the UI look product-specific rather than template-generated?

### Interaction

- Are primary actions visible without hover?
- Are controls discoverable?
- Does focus remain visible?
- Are keyboard interactions coherent?
- Are touch targets large enough?
- Do popovers/menus stay inside the viewport?

### State

- default
- hover
- focus
- active
- selected
- disabled
- loading
- success
- error
- empty
- partial
- offline
- recovery

### Content

- Are labels human and specific?
- Do errors explain recovery?
- Does empty-state copy guide action?
- Are placeholders being misused as labels?
- Does the CTA describe the user outcome?

### Performance/feedback

- Is there unnecessary waiting before acknowledgment?
- Is the loading pattern appropriate to the wait?
- Could a safe action be optimistic?
- Are long operations showing meaningful progress?

## Phase E — Fix

Fix the highest-impact issues first in this order:

```text
broken task flow
-> missing states
-> accessibility/focus
-> responsive failures
-> hierarchy/spacing
-> feedback/loading/recovery
-> motion
-> decorative polish
```

# 6. Anti-patterns to reject

Reject or reconsider UI that contains any of the following without a strong product-specific reason:

- generic gradient blob behind the entire hero
- adjective-heavy AI-sounding hero headline
- two equal primary CTAs
- fake testimonials or invented social proof
- random spacing values
- raw hex values in component code
- arbitrary font sizes
- excessive colored status pills
- identical shadows on every card
- giant `z-index` values used to fight stacking-context problems
- hover-only primary actions
- disabled controls with no understandable blocker
- six independent OTP sources of truth
- skeletons used for every request
- blocking modals for routine reversible actions
- auto-dismissed critical error messages
- scroll listeners for effects that can be handled natively when practical
- CSS `outline: none` without visible focus replacement
- mobile layouts that are simply squeezed desktop layouts
- destructive actions mixed into ordinary primary-action positions

# 7. Output style for the agent

When asked to design or audit UI, report decisions in this format unless the user asks for another format:

```text
INTENT
- user
- task
- primary outcome

HIERARCHY
- primary
- secondary
- tertiary

PATTERNS SELECTED
- DesignMotionHQ patterns used
- reason for each

STATE MODEL
- all required states

FOUNDATIONS
- tokens
- typography
- spacing
- grid
- radius
- icons
- motion

RESPONSIVE
- desktop
- tablet
- mobile
- touch
- keyboard

FEEDBACK / RECOVERY
- loading
- success
- error
- empty
- offline
- undo/retry/rollback

AUDIT RISKS
- highest-impact issues

IMPLEMENTATION NOTES
- existing components reused
- new components required
- state/behavior decisions
```

# 8. Source-specific fidelity note

The live DesignMotionHQ catalog confirms 76 patterns and organizes them into these categories:

```text
content
feedback
forms
interaction
motion
navigation
visual
```

The Blueprint is the 11-page foundation guide covering:

```text
color
 typography
spacing/grid
components
iconography
motion
best practices
implementation checklist
```

For any future update, re-check the live catalog before claiming the catalog count, titles, or detailed source guidance is current.
