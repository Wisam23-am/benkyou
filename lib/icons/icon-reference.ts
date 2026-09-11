// Icon Reference Guide
// All documentation uses open-source icon placeholders from Lucide React
// This file documents how to replace placeholders with actual components

import { Check, AlertCircle, Info, Rocket, Zap, Heart, Trash2 } from 'lucide-react';

/**
 * Icon Placeholder Mappings
 * 
 * Use these Lucide React icons to replace placeholders in documentation:
 */

export const ICON_MAPPINGS = {
  '[completed]': {
    icon: Check,
    description: 'Task completed, success status',
    example: '✅ Replaced with [completed]',
  },
  '[error]': {
    icon: AlertCircle,
    description: 'Error, failure, or critical issue',
    example: '❌ Replaced with [error]',
  },
  '[info]': {
    icon: Info,
    description: 'Information, helpful note',
    example: 'ℹ️ Replaced with [info]',
  },
  '[rocket]': {
    icon: Rocket,
    description: 'Launch, deployment, start',
    example: '🚀 Replaced with [rocket]',
  },
  '[celebration]': {
    icon: Zap,
    description: 'Success, milestone, celebration',
    example: '🎉 Replaced with [celebration]',
  },
  '[heart]': {
    icon: Heart,
    description: 'Love, favorite, important',
    example: '❤️ Replaced with [heart]',
  },
  '[delete]': {
    icon: Trash2,
    description: 'Delete, remove, clear',
    example: '🗑️ Replaced with [delete]',
  },
};

/**
 * Usage in React Components
 * 
 * Example: Replace [completed] with actual icon
 * 
 * Before (in documentation):
 * - [completed] `npm run build` — Build successful
 * 
 * After (in React component):
 * ```tsx
 * import { Check } from 'lucide-react';
 * 
 * export function BuildStatus() {
 *   return (
 *     <div className="flex items-center gap-2">
 *       <Check className="w-5 h-5 text-green-600" />
 *       <span>npm run build — Build successful</span>
 *     </div>
 *   );
 * }
 * ```
 */

/**
 * Available Lucide Icons (partial list - see lucide.dev for full list)
 * 
 * Commonly Used:
 * - AlertCircle, AlertTriangle, AlertOctagon — Warnings/Alerts
 * - CheckCircle, Check, CheckSquare — Success/Completion
 * - XCircle, X, Trash2 — Error/Delete
 * - Info, HelpCircle — Information
 * - Rocket, Zap, Lightbulb — Actions/Inspiration
 * - Heart, Star — Favorites/Rating
 * - Lock, Unlock — Security
 * - Eye, EyeOff — Visibility
 * - Search, Filter — Search/Filter
 * - Plus, Minus, Edit — CRUD Operations
 * - Loader, Clock, Calendar — Time/Loading
 */

/**
 * Icon Size Conventions
 * 
 * Use consistent sizing across the app:
 * - w-4 h-4 (16px) — Inline text, badges, tight spaces
 * - w-5 h-5 (20px) — Standard icon size (recommended)
 * - w-6 h-6 (24px) — Larger sections, cards
 * - w-8 h-8 (32px) — Buttons, prominent elements
 */

/**
 * Color Conventions
 * 
 * Use Tailwind color classes:
 * - text-green-600 — Success, completed
 * - text-red-600 — Error, danger
 * - text-yellow-600 — Warning, attention
 * - text-blue-600 — Info, primary action
 * - text-gray-600 — Neutral, disabled
 */
