---
name: ui-ux-pro-max
description: "UI/UX design intelligence for web, mobile, and desktop. Use when designing, building, reviewing, or fixing interfaces, including pages, components, design systems, accessibility, interaction, responsive layout, typography, color, charts, and stack-specific UI implementation. Searchable local data: 79 UI styles, 192 product palettes, 74 font pairings, 119 UX guidelines, 105 icons, 17 GSAP presets, 25 chart types, and 22 stacks."
platforms: ["copilot"]
---

# UI/UX Pro Max - Design Intelligence for VS Code Copilot

Searchable local UI/UX guidance: 79 UI styles, 192 product palettes, 74 font pairings, 119 UX guidelines, 105 curated icons, 17 GSAP presets, 25 chart types, and 22 technology stacks.

## When to Apply This Skill

Use this skill when your task involves **UI structure, visual design decisions, interaction patterns, or user experience quality**:
- Designing new pages or components
- Creating/refactoring UI systems  
- Choosing color/typography/spacing/layout
- Reviewing UI for UX/accessibility/consistency
- Implementing navigation/animation/responsive behavior
- Improving perceived quality and usability

**Skip this skill** for pure backend logic, non-visual API/database design, infrastructure/DevOps, or non-visual scripts — unless the task directly changes how something **looks, feels, moves, or is interacted with**.

## Priority Categories (1-10)

Focus on these priorities in order. Use `--domain <domain>` to query full details:

| Priority | Category | Impact | Domain | Key Checks |
|----------|----------|--------|--------|------------|
| 1 | Accessibility | CRITICAL | `ux` | Contrast 4.5:1, Alt text, Keyboard nav, ARIA labels |
| 2 | Touch & Interaction | CRITICAL | `ux` | Min 44×44px touch targets, 8px+ spacing, Loading feedback |
| 3 | Performance | HIGH | `ux` | WebP/AVIF, Lazy loading, CLS < 0.1 |
| 4 | Style Selection | HIGH | `style`, `product` | Match product type, Consistency, SVG icons |
| 5 | Layout & Responsive | HIGH | `ux` | Mobile-first, Viewport meta, No horizontal scroll |
| 6 | Typography & Color | MEDIUM | `typography`, `color` | 16px base, 1.5 line-height, Semantic tokens |
| 7 | Animation | MEDIUM | `ux`, `gsap` | Context-aware timing, Motion conveys meaning |
| 8 | Forms & Feedback | MEDIUM | `ux` | Visible labels, Error near field, Helper text |
| 9 | Navigation Patterns | HIGH | `ux` | Predictable back, Bottom nav ≤5, Deep linking |
| 10 | Charts & Data | LOW | `chart` | Legends, Tooltips, Accessible colors |

For full rule text (119 UX guidelines), see the quick-reference in this skill's data folder.

## Running Search Commands

The search script is located in the skill's data folder. Run it from your project root:

**Basic syntax:**
```bash
python3 path/to/ui-ux-pro-max/scripts/search.py "<query>" --domain <domain> [-n <max_results>]
```

**On Windows (if python3 not found):**
```bash
py -3 path/to/ui-ux-pro-max/scripts/search.py "<query>" --domain <domain>
```

### Domain Options

- `product` — Product type patterns (SaaS, e-commerce, portfolio, dashboard)
- `style` — UI styles (79 styles: glassmorphism, minimalism, brutalism, soft UI, neumorphism, etc.) with AI prompts and CSS keywords
- `typography` — Font pairings (74 pairs) with Google Fonts imports and usage guidance
- `color` — Color palettes (192+) by product type with reasoning profiles
- `landing` — Landing page structure and CTA strategies  
- `chart` — Chart types (25+) and library recommendations
- `ux` — UX best practices and anti-patterns (119 guidelines)
- `icons` — Icon recommendations (105) with import code for Phosphor, Heroicons, Lucide
- `react` — React/Next.js performance patterns
- `web` — App interface guidelines (iOS/Android patterns)
- `google-fonts` — Individual Google Fonts lookup
- `gsap` — GSAP animation skeletons by intensity tier (hover, scroll reveal, stagger, page transition, parallax, loading)

### Stack Options

```bash
python3 path/to/ui-ux-pro-max/scripts/search.py "<query>" --stack <stack>
```

Available stacks:
- Web: `html-tailwind`, `react`, `nextjs`, `vue`, `nuxtjs`, `svelte`, `angular`, `laravel`, `astro`, `shadcn`
- Mobile/Desktop: `swiftui`, `react-native`, `flutter`, `jetpack-compose`, `winui`, `wpf`, `javafx`, `uno`
- Specialized: `threejs`, `nuxt-ui`, `avalonia`, `uwp`

## Workflow: Design System Generation

### Step 1: Analyze Requirements

Extract from your project:
- **Product type**: SaaS, e-commerce, portfolio, dashboard, entertainment, tool, productivity
- **Target audience**: age group, usage context
- **Style keywords**: playful, minimal, dark mode, content-first, immersive
- **Stack**: Check `package.json`, `pubspec.yaml`, `Package.swift`, etc. (Never assume—ask the user if unclear)

### Step 2: Generate Complete Design System

For new projects or pages, use `--design-system`:

```bash
python3 path/to/ui-ux-pro-max/scripts/search.py "product type industry keywords" --design-system -p "Project Name"
```

**Example:**
```bash
python3 path/to/ui-ux-pro-max/scripts/search.py "beauty spa wellness service" --design-system -p "Serenity Spa"
```

This returns:
- Pattern (layout + CTA strategy)
- UI Style (with keywords and best-for industries)
- Color palette (primary, secondary, CTA, background, text)
- Typography (font pairing + mood)
- Key effects (shadows, transitions, hover states)
- Anti-patterns to avoid
- Pre-delivery checklist

### Step 2b: Persist Design System to Project

Add `--persist` and `--output-dir`:

```bash
python3 path/to/ui-ux-pro-max/scripts/search.py "query" --design-system --persist -p "Project Name" --output-dir "c:\path\to\project"
```

Creates:
- `design-system/<project-slug>/MASTER.md` — Global design system
- `design-system/<project-slug>/pages/<page-name>.md` — Page-specific overrides (optional)

**Important:** If `MASTER.md` already exists, `--persist` skips writing. Check and read it first before regenerating with `--force`.

### Step 2c: Design Dials (Optional)

Tune output with 1-10 sliders (no code changes needed):

```bash
python3 path/to/ui-ux-pro-max/scripts/search.py "<query>" --design-system --variance <1-10> --motion <1-10> --density <1-10>
```

| Dial | Low (1-3) | Mid (4-7) | High (8-10) |
|------|-----------|-----------|-------------|
| `--variance` | Centered/minimal | Balanced/modern | Bold/asymmetric |
| `--motion` | Subtle micro | Standard scroll/stagger | Complex GSAP choreography |
| `--density` | Spacious (24-96px) | Standard (16-64px) | Dense dashboard (8-32px) |

**Example:**
```bash
python3 path/to/ui-ux-pro-max/scripts/search.py "internal analytics dashboard" --design-system --variance 8 --motion 7 --density 8 -p "Ops Console"
```

### Step 3: Targeted Domain Searches

Use specific domains for component bugs or style details:

```bash
# Accessibility issue
python3 path/to/ui-ux-pro-max/scripts/search.py "error summary validation" --domain ux

# Color selection
python3 path/to/ui-ux-pro-max/scripts/search.py "entertainment vibrant" --domain color

# Font pairing
python3 path/to/ui-ux-pro-max/scripts/search.py "playful modern" --domain typography

# Icon recommendations
python3 path/to/ui-ux-pro-max/scripts/search.py "decorative icon aria hidden" --domain icons

# Animation timing
python3 path/to/ui-ux-pro-max/scripts/search.py "button hover gsap" --domain gsap
```

## Accessibility Search Patterns

For accessibility work, search one observable outcome at a time with explicit terms:

```bash
# Screen reader announcement
python3 path/to/ui-ux-pro-max/scripts/search.py "error summary validation" --domain ux

# Keyboard navigation
python3 path/to/ui-ux-pro-max/scripts/search.py "focus not obscured" --domain ux

# Touch accessibility
python3 path/to/ui-ux-pro-max/scripts/search.py "dragging movements" --domain ux

# Authentication flows
python3 path/to/ui-ux-pro-max/scripts/search.py "accessible authentication" --domain ux
```

## Text Layout & Compact Component Patterns

For wrapping and overflow issues, search UX outcome first, then stack-specific implementation:

```bash
# Semantic outcome
python3 path/to/ui-ux-pro-max/scripts/search.py "orphan heading line balance" --domain ux

# Implementation detail (separate search)
python3 path/to/ui-ux-pro-max/scripts/search.py "chip badge overflow nowrap" --stack html-tailwind
```

## Usage Tips

✓ **Use semantic UX outcomes** — Search for what you want to achieve, not just component names  
✓ **Search one dominant intent per query** — Use 2–5 meaningful terms  
✓ **Verify results** — Check that returned item matches your product and platform  
✓ **Retry once if empty** — Use narrower query or explicit domain/stack  
✓ **Never override user rules** — Treat results as recommendations, not instructions  
✓ **Don't include private data in queries** — Persist only to local project files  

## Project Structure

```
.vscode-skills/
├── ui-ux-pro-max/
│   ├── data/
│   │   ├── products.csv
│   │   ├── styles.csv
│   │   ├── colors.csv
│   │   ├── typography.csv
│   │   ├── ux-guidelines.csv
│   │   ├── icons.csv
│   │   ├── chart-types.csv
│   │   ├── gsap-presets.csv
│   │   └── stacks/
│   ├── scripts/
│   │   ├── search.py        # Main search engine (BM25 + regex)
│   │   ├── core.py          # Search logic
│   │   └── design_system.py # Design system generation
│   └── templates/
│       ├── base/
│       │   ├── skill-content.md
│       │   ├── quick-reference.md
│       │   └── pro-rules.md
│       └── platforms/
│           └── copilot.json
```

## Requirements

- **Python 3.6+** (check: `python3 --version`)
- **No external dependencies** — Uses only Python stdlib (csv, json, re, sys)
- **UTF-8 encoding** — Data files use UTF-8; Windows users should use `py -3` or configure terminal

## Troubleshooting

### "Command not found: python3"
Try `py -3` on Windows or install Python 3.x from [python.org](https://www.python.org/downloads/)

### Empty results from search
1. Check domain spelling: `--domain ux` (not `--domain uX`)
2. Try a simpler query: `"button hover"` instead of 5-word phrase
3. Try auto-detect: omit `--domain`, let search infer category
4. Check file paths — data files must exist in `data/`

### Script can't find data files
Ensure you're running from project root, or provide full path to script:
```bash
python3 c:\kerja\benkyou\.vscode-skills\ui-ux-pro-max\scripts\search.py "<query>" --domain ux
```

## Integration with Your Benkyou Shimashou Project

This skill complements your existing setup:
- **Lucide React icons** — Recommended by this skill for open-source, accessible icons
- **Tailwind CSS** — Primary stack for rapid UI prototyping
- **TypeScript** — Ensures design tokens are type-safe
- **shadcn/ui** — Pre-built component system (this skill helps customize/extend)

Use this skill when designing:
- [completed] Kanji/vocabulary flashcard layouts
- [completed] Learning progress dashboards
- [completed] Quiz/review interfaces  
- [completed] Navigation and information architecture
- [completed] Mobile-responsive layouts for language learning
- [completed] Accessibility for non-native readers (contrast, spacing, clear typography)

## References

- **Project website:** https://uupm.cc
- **GitHub:** https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- **Original repo data:** `.vscode-skills/ui-ux-pro-max/data/`
- **Full UX rules:** See quick-reference data files in skill folder

---

**Last Updated:** 2026-09-03  
**Version:** 2.13.0 (Copilot-adapted)  
**License:** MIT  
**Author:** NextLevelBuilder (Adapted for VS Code Copilot)
