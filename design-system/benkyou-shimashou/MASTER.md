# Benkyou Shimashou Design System

The canonical product design specification is [`docs/08-DESIGN.md`](../../docs/08-DESIGN.md). This file is the implementation index for future UI work.

## Source Of Truth


> **Canonical source:** `docs/08-DESIGN.md` is the current design authority for Benkyou Shimashou. This generated reference is retained for tool compatibility; when rules conflict, follow `docs/08-DESIGN.md`.

## Semantic Tokens

| Meaning | Tailwind token | Value |
| --- | --- | --- |
| Washi background | `bg-paper` | `#EFF1EC` |
| Raised paper | `bg-paper-raised` | `#F8F9F6` |
| Main ink | `text-sumi` | `#23262B` |
| Muted ink | `text-sumi-muted` | `#6B6F73` |
| Shiken Michi | `text-ai`, `bg-ai-soft` | `#24425E`, `#DCE6EE` |
| Seikatsu Michi | `text-matcha` | `#4F7A5B` |
| Context accent | `text-yuzu` | `#E3A23C` |
| Completion CTA | `bg-hanko` | `#B23A34` |

## Track Classes

Use one of these classes on a track-bound page or component root:

- `track-shiken`: sharp 6px radius and Ai palette.
- `track-seikatsu`: rounded 18px radius and Matcha palette.
- `track-neutral`: 10px radius for dashboard, auth, and settings surfaces.

Global CSS exposes `track-frame`, `track-accent`, and `track-soft` to consume those variables without duplicating color decisions in components.

## Typography

- UI and Indonesian copy: `var(--font-ui)`.
- Japanese characters, readings, and examples: `.font-jp` using Shippori Mincho.
- Japanese primary text is at least 20px on mobile.
- Instructional copy uses `.prose-id` with a maximum width of 42rem.
