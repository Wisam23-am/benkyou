# UI/UX Pro Max Skill Installation

**Status:** ✓ Installed and configured for VS Code Copilot  
**Version:** 2.13.0 (Copilot-adapted from NextLevelBuilder)  
**Date:** 2026-09-03

## Installation Summary

The UI/UX Pro Max skill has been installed in your workspace with the following structure:

```
.vscode-skills/
└── ui-ux-pro-max/
    ├── SKILL.md              # Copilot configuration (already read)
    ├── data/                 # CSV databases
    │   ├── products.csv      # Product type patterns
    │   ├── styles.csv        # 79 UI styles with CSS keywords
    │   ├── colors.csv        # 192+ color palettes
    │   ├── typography.csv    # 74 font pairings
    │   ├── ux-guidelines.csv # 119 UX best practices
    │   ├── icons.csv         # 105 icon recommendations
    │   ├── chart-types.csv   # 25+ chart types
    │   ├── gsap-presets.csv  # 17 animation presets
    │   └── stacks/           # Stack-specific guidelines
    ├── scripts/
    │   ├── search.py         # Main search engine (Python 3.x)
    │   ├── core.py           # BM25 search logic
    │   └── design_system.py  # Design system generation
    └── templates/            # Output templates
        ├── base/
        └── platforms/
```

## Configuration

Your VS Code settings are already configured in `.vscode/settings.json`:

```json
{
  "copilot.chat.customSkills": [
    {
      "id": "ui-ux-pro-max",
      "name": "UI/UX Pro Max",
      "description": "Design intelligence for UI/UX...",
      "instructions": ".vscode-skills/ui-ux-pro-max/SKILL.md"
    }
  ]
}
```

## Quick Start: Running Searches

The skill provides a Python-based search engine. Run from your project root:

### 1. Generate Complete Design System

For new pages or projects:

```bash
python3 .vscode-skills/ui-ux-pro-max/scripts/search.py "product-type industry keywords" --design-system -p "Project Name"
```

**Example (for Benkyou Shimashou):**
```bash
python3 .vscode-skills/ui-ux-pro-max/scripts/search.py "educational language learning mobile" --design-system -p "Benkyou Shimashou"
```

### 2. Search Specific Domains

Search for design guidance by topic:

```bash
# Color palettes
python3 .vscode-skills/ui-ux-pro-max/scripts/search.py "education vibrant" --domain color

# Typography recommendations
python3 .vscode-skills/ui-ux-pro-max/scripts/search.py "educational readable" --domain typography

# UX guidelines
python3 .vscode-skills/ui-ux-pro-max/scripts/search.py "form validation error" --domain ux

# Icon recommendations
python3 .vscode-skills/ui-ux-pro-max/scripts/search.py "vocabulary flashcard icon" --domain icons

# Animation presets
python3 .vscode-skills/ui-ux-pro-max/scripts/search.py "card flip animation" --domain gsap
```

### 3. Search by Tech Stack

Include your stack for implementation-specific guidance:

```bash
# React + Tailwind specific
python3 .vscode-skills/ui-ux-pro-max/scripts/search.py "quiz layout" --stack react

# Next.js specific
python3 .vscode-skills/ui-ux-pro-max/scripts/search.py "dashboard layout" --stack nextjs

# Tailwind CSS helpers
python3 .vscode-skills/ui-ux-pro-max/scripts/search.py "responsive grid" --stack html-tailwind
```

### 4. Save Design System to Project

To persist a design system for your project:

```bash
python3 .vscode-skills/ui-ux-pro-max/scripts/search.py "educational language learning mobile" --design-system --persist -p "Benkyou Shimashou" --output-dir "c:\kerja\benkyou"
```

This creates:
- `design-system/benkyou-shimashou/MASTER.md` — Global design rules
- `design-system/benkyou-shimashou/pages/flashcard.md` — Page-specific rules (optional)

## Domain Reference

| Domain | Purpose | Example |
|--------|---------|---------|
| `product` | Product patterns (SaaS, e-commerce, etc.) | `"vocabulary learning app" --domain product` |
| `style` | 79 UI styles (glassmorphism, minimalism, etc.) | `"modern minimal" --domain style` |
| `color` | 192+ color palettes with reasoning | `"learning app vibrant" --domain color` |
| `typography` | 74 font pairings with Google Fonts | `"educational readable" --domain typography` |
| `ux` | 119 UX guidelines and best practices | `"form validation" --domain ux` |
| `icons` | 105 icon sets (Phosphor, Heroicons, Lucide) | `"vocabulary icon" --domain icons` |
| `chart` | 25+ chart types and libraries | `"progress chart" --domain chart` |
| `landing` | Landing page patterns and CTAs | `"learning signup" --domain landing` |
| `gsap` | GSAP animation presets (3 tiers) | `"hover effect" --domain gsap` |
| `react` | React/Next.js performance patterns | `"component optimization" --domain react` |
| `google-fonts` | Individual Google Fonts lookup | `"sans serif popular" --domain google-fonts` |

## Stack Options for Your Project

Your Benkyou Shimashou project uses:
- **Primary:** `nextjs` (Next.js 14+ with App Router)
- **Styling:** `html-tailwind` (Tailwind CSS v4)
- **Components:** `shadcn` (shadcn/ui component library)
- **Icons:** Already using Lucide React (recommended by this skill)

When searching, use:
```bash
python3 .vscode-skills/ui-ux-pro-max/scripts/search.py "query" --stack nextjs
python3 .vscode-skills/ui-ux-pro-max/scripts/search.py "query" --stack shadcn
python3 .vscode-skills/ui-ux-pro-max/scripts/search.py "query" --stack html-tailwind
```

## Using with Copilot Chat

In VS Code, you can reference this skill in Copilot Chat:

**In Chat:**
```
@UI/UX Pro Max Help me design a flashcard review component
```

Or ask Copilot to search using the skill:

```
@Copilot I'm building a vocabulary quiz interface. 
Use the UI/UX Pro Max skill to find color palettes and animation recommendations.
```

Copilot can invoke the search commands on your behalf.

## Troubleshooting

### Python not found
```bash
# Try py on Windows
py -3 .vscode-skills/ui-ux-pro-max/scripts/search.py "query" --domain ux
```

### Empty search results
1. Check domain spelling: `--domain ux` (lowercase)
2. Simplify query: use 2-3 keywords instead of 5+
3. Verify data files exist:
   ```bash
   ls .vscode-skills/ui-ux-pro-max/data/
   ```

### Script can't find data files
Always run from project root, or use full path:
```bash
python3 c:\kerja\benkyou\.vscode-skills\ui-ux-pro-max\scripts\search.py "query" --domain ux
```

## Integration with Benkyou Shimashou

This skill works perfectly with your existing setup:

✓ **Lucide React** — Recommended for icons (you're already using it)  
✓ **Tailwind CSS** — Primary styling framework (supported)  
✓ **shadcn/ui** — Component system (can be customized with design guidelines)  
✓ **TypeScript** — Type-safe design tokens (recommended)  
✓ **Next.js** — Full-stack framework (stack-specific guidance available)  

**Suggested Sprint 1 Uses:**

1. **Design System Generation** — Create master design system for entire app
   ```bash
   python3 .vscode-skills/ui-ux-pro-max/scripts/search.py "educational language learning mobile" --design-system --persist -p "Benkyou Shimashou" --output-dir "."
   ```

2. **Flashcard Component** — Get style and animation recommendations
   ```bash
   python3 .vscode-skills/ui-ux-pro-max/scripts/search.py "flashcard quiz vocabulary" --stack nextjs
   ```

3. **Mobile Navigation** — Responsive design patterns
   ```bash
   python3 .vscode-skills/ui-ux-pro-max/scripts/search.py "mobile navigation learning app" --domain ux
   ```

4. **Accessibility Review** — Check for WCAG compliance
   ```bash
   python3 .vscode-skills/ui-ux-pro-max/scripts/search.py "language learning accessibility" --domain ux
   ```

## References

- **Project Website:** https://uupm.cc
- **GitHub Repository:** https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- **License:** MIT
- **Original Author:** NextLevelBuilder
- **Copilot Adaptation:** 2026-09-03

---

**Ready to use!** Start with a design system query, then use targeted domain searches for specific UI/UX needs.
