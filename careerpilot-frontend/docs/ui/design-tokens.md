# CareerPilot Design Tokens Specification

**Version:** 1.0.0  
**Last Updated:** 03 Oct 2026  
**Compliance:** WCAG 2.2 AA  
**Source Diagram:** `careerpilot-frontend/docs/ui/design-tokens.png`

---

## 1. Color Palette

### Primary Color Scale
| Token | Hex Code | Description / Intent |
|---|---|---|
| `primary-50` | `#EEF4FF` | Lightest blue tint, hover background for ghost/subtle elements |
| `primary-100` | `#D9E6FF` | Subtle blue background, badge background, disabled primary state |
| `primary-500` | `#2563EB` | Base Primary brand blue, default action buttons, key highlights |
| `primary-600` | `#1D4ED8` | Primary hover state, active links |
| `primary-700` | `#1E40AF` | Primary active state, deep contrast text on light blue |

### Secondary Color Scale
| Token | Hex Code | Description / Intent |
|---|---|---|
| `secondary-50` | `#F1F5F9` | Secondary background tint, subtle container fill |
| `secondary-100` | `#E2E8F0` | Border light gray, secondary badge background, subtle hover |
| `secondary-500` | `#475569` | Slate blue-gray, secondary default buttons, muted icons |
| `secondary-600` | `#334155` | Secondary hover state |
| `secondary-700` | `#1E293B` | Secondary active state, high-contrast slate text |

### Success Color Scale
| Token | Hex Code | Description / Intent |
|---|---|---|
| `success-50` | `#ECFDF5` | Success toast / alert background fill |
| `success-100` | `#D1FAE5` | Success tag background, light badge fill |
| `success-500` | `#10B981` | Emerald green, success actions, completion indicators |
| `success-600` | `#059669` | Success hover state |
| `success-700` | `#047857` | Success active state, contrast dark text on light green |

### Warning Color Scale
| Token | Hex Code | Description / Intent |
|---|---|---|
| `warning-50` | `#FFFBEB` | Light amber warning background fill |
| `warning-100` | `#FEF3C7` | Warning badge fill, pending state background |
| `warning-500` | `#F59E0B` | Amber warning, caution callout accent |
| `warning-600` | `#D97706` | Warning hover state |
| `warning-700` | `#B45309` | Warning active state, high contrast text |

### Danger Color Scale
| Token | Hex Code | Description / Intent |
|---|---|---|
| `danger-50` | `#FEF2F2` | Light red error background fill |
| `danger-100` | `#FEE2E2` | Danger badge fill, input error tint |
| `danger-500` | `#EF4444` | Red danger action, error borders, destruction intent |
| `danger-600` | `#DC2626` | Danger hover state |
| `danger-700` | `#B91C1C` | Danger active state, error text |

### Neutral Color Scale
| Token | Hex Code | Description / Intent |
|---|---|---|
| `neutral-50` | `#FAFAFA` | Off-white background tint |
| `neutral-100` | `#F4F4F5` | Light gray container fill |
| `neutral-200` | `#E4E4E7` | Border subtle |
| `neutral-300` | `#D4D4D8` | Border standard |
| `neutral-400` | `#A1A1AA` | Placeholder text, disabled icon stroke |
| `neutral-500` | `#71717A` | Muted body text, secondary captions |
| `neutral-600` | `#52525B` | Subtitle text, subtle headlines |
| `neutral-700` | `#3F3F46` | Dark body text |
| `neutral-800` | `#27272A` | Primary text high contrast |
| `neutral-900` | `#18181B` | Heading text, highest contrast dark |

---

## 2. UI Surface Tokens

| Token | Hex Code | Purpose / Usage |
|---|---|---|
| `app-bg` | `#F8FAFC` | Platform application background fill |
| `surface` | `#FFFFFF` | Default canvas / panel background |
| `card` | `#FFFFFF` | Card element background |
| `sidebar` | `#F1F5F9` | Navigation sidebar background |
| `hover` | `#E2E8F0` | Interactive row / item hover state |
| `divider` | `#E5E7EB` | Horizontal & vertical layout separators |

---

## 3. Typography Tokens

- **Font Family (Sans-serif):** `Inter, system-ui, sans-serif`
- **Font Family (Monospace):** `JetBrains Mono, monospace`
- **Fallback Font:** `ui-sans-serif, system-ui`

| Token | Size | Weight | Line Height | CSS Value |
|---|---|---|---|---|
| `display` | 56px | 700 (Bold) | 64px | `font: 700 56px/64px Inter` |
| `h1` | 40px | 700 (Bold) | 48px | `font: 700 40px/48px Inter` |
| `h2` | 32px | 700 (Bold) | 40px | `font: 700 32px/40px Inter` |
| `h3` | 24px | 600 (SemiBold) | 32px | `font: 600 24px/32px Inter` |
| `h4` | 20px | 600 (SemiBold) | 28px | `font: 600 20px/28px Inter` |
| `h5` | 18px | 600 (SemiBold) | 26px | `font: 600 18px/26px Inter` |
| `body-lg` | 16px | 500 (Medium) | 24px | `font: 500 16px/24px Inter` |
| `body-md` | 14px | 500 (Medium) | 20px | `font: 500 14px/20px Inter` |
| `body-sm` | 12px | 500 (Medium) | 18px | `font: 500 12px/18px Inter` |
| `caption` | 12px | 400 (Regular) | 16px | `font: 400 12px/16px Inter` |
| `overline` | 11px | 500 (Medium) | 16px | `font: 500 11px/16px Inter` |

---

## 4. Spacing Tokens

Base spacing unit: **4px**

| Token | px Value | rem Value |
|---|---|---|
| `4` | 4px | 0.25rem |
| `8` | 8px | 0.5rem |
| `12` | 12px | 0.75rem |
| `16` | 16px | 1.0rem |
| `24` | 24px | 1.5rem |
| `32` | 32px | 2.0rem |
| `48` | 48px | 3.0rem |
| `64` | 64px | 4.0rem |
| `96` | 96px | 6.0rem |

---

## 5. Border Radius Tokens

| Token | Value | Applied Elements |
|---|---|---|
| `none` | 0px | Square panels, flush edges |
| `xs` | 2px | Tooltip borders, micro badges |
| `sm` | 4px | Form controls, small buttons |
| `md` | 6px | Input fields, standard buttons |
| `lg` | 8px | Cards, modal containers |
| `xl` | 12px | Feature hero boxes, floating panels |
| `2xl` | 16px | Large dashboard widgets |
| `3xl` | 24px | Floating sheets, marketing containers |
| `full` | 999px | Avatars, pills, circular badges |

---

## 6. Shadow Tokens (Elevation System)

| Token | Box Shadow Value | Usage |
|---|---|---|
| `none` | `none` | Flat components |
| `sm` | `0 1px 2px rgba(0, 0, 0, 0.05)` | Low elevation cards, dropdown items |
| `md` | `0 4px 6px rgba(0, 0, 0, 0.07)` | Hovering cards, sticky navigation |
| `lg` | `0 10px 15px rgba(0, 0, 0, 0.1)` | Modals, flyout panels |
| `xl` | `0 20px 25px rgba(0, 0, 0, 0.15)` | High impact overlays, popovers |

---

## 7. Chart Color Tokens

| Token | Hex Code | Usage |
|---|---|---|
| `chart-1` | `#2563EB` | Primary metric series |
| `chart-2` | `#0EA5E9` | Secondary metric series |
| `chart-3` | `#10B981` | Positive benchmark / completed series |
| `chart-4` | `#F59E0B` | Warning benchmark / in-progress series |
| `chart-5` | `#64748B` | Baseline / target comparison line |
| `chart-6` | `#94A3B8` | Neutral / historical dataset |

---

## 8. Component State Specifications

### Button Matrix
| Intent | Default BG | Hover BG | Active BG | Disabled BG |
|---|---|---|---|---|
| Primary | `#2563EB` | `#1D4ED8` | `#1E40AF` | `#D9E6FF` |
| Secondary | `#475569` | `#334155` | `#1E293B` | `#E2E8F0` |
| Success | `#10B981` | `#059669` | `#047857` | `#D1FAE5` |
| Warning | `#F59E0B` | `#D97706` | `#B45309` | `#FEF3C7` |
| Danger | `#EF4444` | `#DC2626` | `#B91C1C` | `#FEE2E2` |

### Input States
- **Default:** Border `#E2E8F0`, BG `#FFFFFF`, Text `#18181B`
- **Hover:** Border `#A1A1AA`
- **Focus:** Border `#2563EB` with focus outline ring
- **Error:** Border `#EF4444` (danger-500)
- **Disabled:** Border `#E4E4E7`, BG `#F4F4F5`, Text `#A1A1AA`

---

## 9. Status & Tag Specifications

- **Badges:**
  - `Primary`: BG `#D9E6FF`, Text `#1E40AF`
  - `Secondary`: BG `#E2E8F0`, Text `#1E293B`
  - `Success`: BG `#D1FAE5`, Text `#047857`
  - `Warning`: BG `#FEF3C7`, Text `#B45309`
  - `Danger`: BG `#FEE2E2`, Text `#B91C1C`
- **Category Tags:** Info, New, In Progress, Completed, Rejected
- **Role Tags:** Student, Staff, Recruiter
- **Domain Tags:** DSA, Aptitude, Java, Spring Boot, Web Development, Cloud, System Design
