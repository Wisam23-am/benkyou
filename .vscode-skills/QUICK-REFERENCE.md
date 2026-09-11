# UI/UX Pro Max Skill - Quick Reference

**Status:** ✓ Fully Installed & Tested  
**Version:** 2.13.0 (Copilot-adapted)  
**Location:** `.vscode-skills/ui-ux-pro-max/`

## Installation Confirmed

```
Data Files:       16 CSV databases + JSON metadata
Scripts:          Python 3.x search engine (tested ✓)
Templates:        Ready for design system generation
Copilot Config:   Active in .vscode/settings.json
```

## Top 5 Use Cases for Benkyou Shimashou

### 1. Design System (Foundation)
```bash
python3 .vscode-skills/ui-ux-pro-max/scripts/search.py "educational language learning mobile" --design-system -p "Benkyou Shimashou"
```
**Returns:** Complete visual system (colors, typography, spacing, animations, guidelines)

### 2. Flashcard Component
```bash
python3 .vscode-skills/ui-ux-pro-max/scripts/search.py "vocabulary flashcard quiz interaction" --domain style
```
**Returns:** UI styles with CSS keywords + anti-patterns to avoid

### 3. Color Palette Selection
```bash
python3 .vscode-skills/ui-ux-pro-max/scripts/search.py "education learning vibrant accessible" --domain color
```
**Returns:** 5-10 color palettes with reasoning (WCAG contrast verified)

### 4. UX Guidelines (Accessibility)
```bash
python3 .vscode-skills/ui-ux-pro-max/scripts/search.py "language learner dyslexia friendly typography" --domain ux
```
**Returns:** 119 UX guidelines (accessibility, performance, interaction, forms)

### 5. Icon Recommendations
```bash
python3 .vscode-skills/ui-ux-pro-max/scripts/search.py "vocabulary kanji learning" --domain icons
```
**Returns:** Icon suggestions (Lucide, Heroicons, Phosphor) with import code

## All Available Domains

| Domain | Records | Best For |
|--------|---------|----------|
| `product` | 192 | Product type patterns |
| `style` | 79 | UI styles + CSS keywords |
| `color` | 192+ | Color palettes with reasoning |
| `typography` | 74 | Font pairings (Google Fonts) |
| `ux` | 119 | UX guidelines + anti-patterns |
| `icons` | 105 | Icon library recommendations |
| `chart` | 25+ | Chart types + libraries |
| `landing` | Landing patterns | Page structures + CTAs |
| `gsap` | 17 | Animation presets (3 tiers) |
| `react` | React patterns | Component optimization |
| `google-fonts` | All Google Fonts | Individual font lookup |
| `web` | iOS/Android | App guidelines |

## Stack-Specific Recommendations

Your project stacks:
```bash
# Next.js specific patterns
python3 .vscode-skills/ui-ux-pro-max/scripts/search.py "quiz dashboard" --stack nextjs

# Tailwind CSS patterns
python3 .vscode-skills/ui-ux-pro-max/scripts/search.py "responsive grid" --stack html-tailwind

# shadcn/ui component patterns
python3 .vscode-skills/ui-ux-pro-max/scripts/search.py "button state" --stack shadcn

# React hooks patterns
python3 .vscode-skills/ui-ux-pro-max/scripts/search.py "state management" --stack react
```

## Design Dials (Optional Tuning)

When generating design systems, customize output without changing code:

```bash
python3 .vscode-skills/ui-ux-pro-max/scripts/search.py "educational app" --design-system \
  --variance 7        # Bold/asymmetric (1-10 scale) \
  --motion 6          # Standard animations (1-10 scale) \
  --density 5         # Standard spacing (1-10 scale) \
  -p "Benkyou Shimashou"
```

| Dial | Range | Effect |
|------|-------|--------|
| `--variance` | 1-10 | Centered (1) → Bold asymmetric (10) |
| `--motion` | 1-10 | Subtle (1) → Complex choreography (10) |
| `--density` | 1-10 | Spacious (1) → Dense dashboard (10) |

## Persisting Design Systems

Save project-wide design rules:

```bash
python3 .vscode-skills/ui-ux-pro-max/scripts/search.py "educational language learning" \
  --design-system \
  --persist \
  -p "Benkyou Shimashou" \
  --output-dir "c:\kerja\benkyou"
```

Creates:
- `design-system/benkyou-shimashou/MASTER.md` — Global rules
- `design-system/benkyou-shimashou/pages/*.md` — Page overrides (optional)

## Integration Checklist

- [x] Skill installed in `.vscode-skills/ui-ux-pro-max/`
- [x] SKILL.md created (Copilot config)
- [x] `.vscode/settings.json` updated with custom skill
- [x] Python 3.x search engine verified working
- [x] All data files present (16 CSV + JSON)
- [x] Setup guide created (UI-UX-PRO-MAX-SETUP.md)
- [ ] **Next:** Run design system generation for Benkyou Shimashou

## Alignment with Your Stack

| Your Tech | Skill Support |
|-----------|---------------|
| Next.js 14+ | ✓ Stack-specific patterns |
| React 18+ | ✓ Component best practices |
| TypeScript | ✓ Type-safe design tokens |
| Tailwind CSS v4 | ✓ Stack-specific CSS patterns |
| shadcn/ui | ✓ Component library patterns |
| Lucide React | ✓ Recommended icon library |
| Supabase | ⚪ Not covered (backend) |
| Zod validation | ⚪ Not covered (backend) |

## Troubleshooting Quick Fixes

### Python not found
```powershell
# Windows
py -3 .vscode-skills/ui-ux-pro-max/scripts/search.py "query" --domain ux

# macOS/Linux
python3 .vscode-skills/ui-ux-pro-max/scripts/search.py "query" --domain ux
```

### Empty search results
1. Simplify query (remove 5+ keywords)
2. Check domain spelling (lowercase only)
3. Try auto-detect (omit `--domain`)
4. Verify data files exist:
   ```bash
   ls .vscode-skills/ui-ux-pro-max/data/
   ```

### Script path not found
Always run from project root:
```bash
cd c:\kerja\benkyou
python3 .vscode-skills/ui-ux-pro-max/scripts/search.py "query" --domain ux
```

## References

- **Official Site:** https://uupm.cc
- **GitHub:** https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- **License:** MIT
- **Original Author:** NextLevelBuilder
- **Copilot Adaptation:** 2026-09-03

---

**Installed:** 2026-09-03  
**Ready for:** Sprint 1 UI/UX design work
