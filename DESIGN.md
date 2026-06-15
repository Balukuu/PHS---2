# Design

Visual system for the PHS Uganda website. Identity-preserving evolution of the original deep green / gold / cream brand, executed to a premium standard.

## Theme

Light, warm, daylight-institutional. The visitor is a facilities manager at a desk in daytime Kampala; deep green is used as punctuation (nav when scrolled, statement bands, footer), never as the whole room. No dark mode.

## Color (OKLCH, tinted neutrals, no pure black/white)

| Token | Value | Role |
|---|---|---|
| `--ink` | `oklch(0.24 0.02 170)` | Body text, near-black tinted green |
| `--green-900` | `oklch(0.25 0.045 168)` | Footer, statement bands (inkier than brand green) |
| `--green-700` | `oklch(0.33 0.06 165)` | Brand green (from #0D3B2E), headings on light, nav scrolled |
| `--green-600` | `oklch(0.42 0.07 160)` | Hover, secondary green |
| `--gold-500` | `oklch(0.72 0.105 88)` | Brand gold (from #C9A84C), accents only |
| `--gold-600` | `oklch(0.63 0.10 85)` | Gold on light backgrounds (AA text) |
| `--gold-200` | `oklch(0.88 0.05 92)` | Hairlines on cream |
| `--cream` | `oklch(0.965 0.008 92)` | Section background (from #F7F3EC) |
| `--paper` | `oklch(0.985 0.004 95)` | Page background, warm off-white |

Strategy: Restrained-plus. Tinted neutrals carry the page; deep green owns 2-3 full-bleed bands per page; gold stays under 10% and is reserved for rules, kickers, key numbers.

## Typography

- Display: **Gloock** (single weight 400) for h1, h2, pull quotes, stat numbers. High-contrast Didone presence; always large, never below ~1.5rem.
- Text/UI: **Outfit** 300-700 for body, h3/h4, navigation, buttons (uppercase, +0.14em tracking, 500-600).
- Scale ratio ≥1.3; fluid clamp() on display sizes. Body 1rem/1.7, max 70ch.

## Surfaces & borders

- Hairline borders `1px` in `--gold-200` or green-tinted neutral; never dashed, never colored side-stripes.
- Shadows: large, soft, green-tinted, low opacity; used sparingly (nav, form card, dropdowns).
- Radius 2px (sharp, engraved feel). Pill shapes only for the WhatsApp float.
- Texture: a single subtle grain on deep green bands only. No repeating diagonal line patterns.

## Motion

- Scroll reveals: 600ms, translateY(24px), `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quint), staggered 80ms.
- Hovers: color/border/shadow transitions 250ms; lifts max 2px.
- `prefers-reduced-motion`: all reveals render visible, counters jump to final value, slider autoplay off.

## Components

- Nav: transparent over hero -> deep green glass on scroll; gold underline indicator on links.
- Buttons: 50px height, Outfit 600 caps, gold solid / hairline outline variants; arrow glyph shifts 4px on hover.
- Cards: paper surface, hairline border, hover = border deepens + soft shadow; icons are bare gold strokes (no circle chips).
- Kickers (`.section-label`): gold small caps with single 24px leading rule; the old double-dash + divider pairing is retired.
- Imagery: real photography everywhere (Pexels), warm grade, `object-fit: cover`; no dashed placeholder boxes.
