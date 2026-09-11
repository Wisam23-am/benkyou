# Icon Guidelines

## Overview

This project uses **Lucide React** for all icons. To maintain consistency with documentation, we use placeholder notation like `[icon-name]` in markdown files, which maps to actual Lucide React components in code.

## Icon Placeholder Reference

| Placeholder | Lucide Icon | Usage | Example |
|---|---|---|---|
| `[completed]` | `Check` | Success, task completion | ✅ Status complete |
| `[error]` | `AlertCircle` | Errors, failures | ❌ Operation failed |
| `[info]` | `Info` | Information, notes | ℹ️ Important note |
| `[rocket]` | `Rocket` | Launch, deploy, start | 🚀 Ready to deploy |
| `[celebration]` | `Zap` | Success, milestones | 🎉 Milestone reached |
| `[heart]` | `Heart` | Favorites, important | ❤️ Liked |
| `[delete]` | `Trash2` | Remove, delete | 🗑️ Remove item |
| `[warning]` | `AlertTriangle` | Warnings, caution | ⚠️ Caution |
| `[lock]` | `Lock` | Security, restricted | 🔒 Locked |
| `[search]` | `Search` | Search, find | 🔍 Search |
| `[menu]` | `Menu` | Navigation menu | ☰ Menu |
| `[close]` | `X` | Close, dismiss | ✕ Close |

## Installation

Lucide React is already installed via shadcn/ui. Icons are available at:

```bash
npm ls lucide-react
```

## Basic Usage

### Import

```tsx
import { Check, AlertCircle, Info, Rocket } from 'lucide-react';
```

### In Components

```tsx
export function StatusIndicator() {
  return (
    <div className="flex items-center gap-2">
      <Check className="w-5 h-5 text-green-600" />
      <span>Deployment complete</span>
    </div>
  );
}
```

## Size Conventions

| Size | Class | Usage |
|---|---|---|
| 16px | `w-4 h-4` | Inline, badges, tight spaces |
| 20px | `w-5 h-5` | Standard (recommended) |
| 24px | `w-6 h-6` | Cards, larger sections |
| 32px | `w-8 h-8` | Buttons, prominent elements |

## Color Conventions

Use Tailwind color classes consistently:

```tsx
// Success
<Check className="w-5 h-5 text-green-600" />

// Error
<AlertCircle className="w-5 h-5 text-red-600" />

// Warning
<AlertTriangle className="w-5 h-5 text-yellow-600" />

// Info
<Info className="w-5 h-5 text-blue-600" />

// Neutral
<HelpCircle className="w-5 h-5 text-gray-600" />
```

## Common Icon Sets

### Status/Feedback
- `Check`, `CheckCircle` — Success
- `X`, `XCircle`, `AlertCircle` — Error
- `AlertTriangle` — Warning
- `Info`, `HelpCircle` — Information
- `Loader`, `Loader2` — Loading

### Actions
- `Plus`, `Minus` — Add/Remove
- `Edit`, `Pencil` — Edit
- `Trash2`, `Trash` — Delete
- `Save` — Save
- `Copy` — Copy

### Navigation
- `ChevronRight`, `ChevronLeft` — Navigation
- `Home` — Home
- `Settings` — Settings
- `Menu` — Menu toggle

### Common
- `Search` — Search
- `Filter` — Filter
- `Lock`, `Unlock` — Security
- `Eye`, `EyeOff` — Visibility
- `Download`, `Upload` — File operations
- `Heart`, `Star` — Ratings/Favorites

## Full Icon List

For a complete list of available icons, visit:
- [Lucide Icons](https://lucide.dev/)
- [Lucide React GitHub](https://github.com/lucide-icons/lucide)

## Best Practices

1. **Use semantic icons** — Icon should represent the action/state
2. **Consistent sizing** — Use standard sizes (w-5 h-5 preferred)
3. **Color meaning** — Follow color conventions (green=success, red=error, etc.)
4. **Accessibility** — Add `aria-label` when icon is standalone:
   ```tsx
   <button>
     <Check className="w-5 h-5" aria-label="Confirm" />
   </button>
   ```
5. **Performance** — Only import icons you use
   ```tsx
   // Good
   import { Check, AlertCircle } from 'lucide-react';
   
   // Avoid
   import * as Icons from 'lucide-react';
   ```

## Updating Documentation

When writing documentation with icon placeholders:

1. Use `[placeholder-name]` format
2. Reference the table above for correct mapping
3. Document will be converted to React components using Lucide icons

Example in markdown:
```markdown
## Status Report

- [completed] Build successful
- [completed] Tests passing
- [warning] Pending review
- [error] Deployment failed
```

This becomes:
```tsx
<div className="space-y-2">
  <div className="flex items-center gap-2">
    <Check className="w-5 h-5 text-green-600" />
    <span>Build successful</span>
  </div>
  <div className="flex items-center gap-2">
    <Check className="w-5 h-5 text-green-600" />
    <span>Tests passing</span>
  </div>
  <div className="flex items-center gap-2">
    <AlertTriangle className="w-5 h-5 text-yellow-600" />
    <span>Pending review</span>
  </div>
  <div className="flex items-center gap-2">
    <AlertCircle className="w-5 h-5 text-red-600" />
    <span>Deployment failed</span>
  </div>
</div>
```

---

**Note:** This guide should be updated whenever new icon conventions are added to the project.
