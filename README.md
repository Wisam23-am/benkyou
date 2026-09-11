# Benkyou Shimashou — Development Guide

日本語学習プラットフォーム / Japanese Learning Platform

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier ok)

### Setup

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd benkyou
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with your Supabase credentials:
   - `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anonymous key
   - `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key (server-only, never in browser)

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## Development Workflow

### Scripts

- `npm run dev` — Start development server with hot reload
- `npm run build` — Build production bundle
- `npm start` — Start production server
- `npm run lint` — Run ESLint and Prettier checks
- `npm test` — Run test suite (when configured)

## Tech Stack

- **Next.js 14+** — React framework with App Router
- **TypeScript** — Type-safe development (strict mode)
- **Tailwind CSS** — Utility-first CSS
- **shadcn/ui** — Reusable React components
- **Supabase** — PostgreSQL, Auth, Storage
- **TanStack Query** — Server state management
- **Zustand** — Client state management
- **Zod** — Runtime schema validation
- **ESLint + Prettier** — Code quality

## Project Structure

```
benkyou/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Auth pages (login, register)
│   ├── (dashboard)/       # Protected dashboard
│   ├── api/v1/            # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Feature components
├── lib/                  # Business logic & utilities
│   ├── supabase/         # Supabase client setup
│   ├── api/              # API client functions
│   ├── services/         # Domain services (SRS, etc)
│   └── utils/            # Helper functions
├── hooks/                # Custom React hooks
├── store/                # Zustand stores
├── types/                # TypeScript type definitions
├── public/               # Static assets
└── docs/                 # Documentation
```

## Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and keys from Project Settings → API
3. Create database tables and RLS policies (see `docs/` for schema)
4. Enable Auth providers (Email/Password at minimum)

## Git Workflow

- Main branch: `main` (production-ready)
- Development: `dev` (integration)
- Features: `feature/short-description`
- Bugfixes: `fix/short-description`

Commit messages follow convention: `type(scope): description`

```bash
git commit -m "feat(auth): add login form"
git commit -m "fix(srs): correct scheduling algorithm"
git commit -m "docs: update README"
```

## Testing

For business logic (SRS, scoring, etc):

```bash
npm test
```

Run specific test file:

```bash
npm test -- lib/services/srs.test.ts
```

Watch mode:

```bash
npm test -- --watch
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables in Vercel project settings
4. Deploy automatically on push to `main`

### Manual Deployment

```bash
npm run build
npm start
```

## Troubleshooting

### Supabase connection issues
- Verify `NEXT_PUBLIC_SUPABASE_URL` and keys are correct
- Check Supabase project is active (not paused)
- Ensure CORS is configured if accessing from different domain

### TypeScript errors
- Run `npm run type-check` to see all type errors
- Check that all imports are correct
- Ensure Supabase types are properly generated

### Build failures
- Clear `.next` folder: `rm -r .next`
- Reinstall dependencies: `rm -r node_modules && npm install`
- Check for circular imports: `npm ls`

## Documentation

- [Product Requirements](./docs/01-PRD.md)
- [Tech Stack & Architecture](./docs/02-TECH-STACK-ARCHITECTURE.md)
- [Component Tree & UI Flow](./docs/03-COMPONENT-TREE-UI-FLOW.md)
- [API & Data Fetching Specs](./docs/04-API-DATA-FETCHING-SPECS.md)
- [Coding Conventions](./docs/05-CODING-CONVENTIONS.md)
- [Sprint Plan](./docs/06-SPRINT-PLAN.md)
- [Integration & Release Checklist](./docs/09-INTEGRATION-AND-RELEASE-CHECKLIST.md)

---

**Happy coding!** [celebration]

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
