# EduLink — LMS Admin Dashboard

Next.js 15 (App Router) + TypeScript + Tailwind v4 + shadcn/ui + Auth.js v5.

Design tokens were extracted from the Edmate template's SASS source (not
guessed from a screenshot), then tightened — see `src/app/globals.css`.

## Quick start

```bash
npm install
cp .env.example .env.local   # already present; replace AUTH_SECRET for prod
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`, `npm run typecheck`.

### Demo accounts

All three use the password `Password123!`

| Email | Role | Lands on |
|---|---|---|
| `admin@edulink.io` | Administrator | `/admin` |
| `instructor@edulink.io` | Instructor | `/instructor` |
| `student@edulink.io` | Student | `/dashboard` |

## Architecture

```
src/
  auth.ts              Auth.js v5 — Credentials provider, bcrypt verify
  auth.config.ts       Edge-safe slice (no bcrypt/DB) — imported by middleware
  middleware.ts        Route gating from the ROUTE_ACCESS matrix
  lib/
    roles.ts           Single source of truth for the access matrix
    session.ts         requireUser() / requireRole() render-time guards
    users.ts           Mock account store — swap for Prisma/Drizzle
    data.ts            Mock LMS reporting layer, role-scoped
    actions/auth.ts    Server actions: login / logout
  components/
    ui/                shadcn primitives (hand-authored to match the theme)
    dashboard/         Shell: sidebar, header, mobile drawer, user menu
    metrics/           Stat cards, chart, tables, review queue
```

### Authorization

Two layers, both driven by `ROUTE_ACCESS` in `lib/roles.ts`:

1. **`middleware.ts`** — gates every route before render, redirects anonymous
   users to `/login?next=…` and wrong-role users to their own landing page
   with `?denied=…`.
2. **`requireUser()` / `requireRole()`** — re-checked at render. Pages and
   layouts render in parallel, so a layout guard alone does not protect a page
   body that dereferences the session.

To add a protected route, add its prefix to `ROUTE_ACCESS`. Anything inside the
dashboard shell but missing from that matrix falls through to the layout guard
and loses the `?next=` param.

### Data scoping

Route gating is not enough on its own. `EnrollmentsTable` exposes other
learners' names and email addresses, so `/dashboard` branches on `isStaff`
and serves students a learner-only `MyCourses` view instead.

**Known gap:** this is enforced per-page. Any new page reusing
`EnrollmentsTable` reintroduces the leak. The durable fix is to scope at the
data layer — have `getEnrollments()` take a user and filter — rather than
relying on each page to branch.

## Before production

- [ ] Replace `AUTH_SECRET` in `.env.local` (`openssl rand -base64 32`)
- [ ] Swap `lib/users.ts` for a real database
- [ ] Move scoping into the data layer (see above)
- [ ] Switch fonts to `next/font/google` — see below

### Fonts

Google Fonts was unreachable in the build sandbox, so fonts load via `<link>`
in `src/app/layout.tsx`. Locally you should self-host instead:

```ts
import { Urbanist, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
```

Assign the generated CSS variables (`--font-urbanist`, `--font-plex-sans`,
`--font-plex-mono`) to `<body>` and delete the `<link>` block. **The typography
has never been seen rendering** — every screenshot during development used
fallback system sans, so it's worth re-reviewing once the real faces load.

## Verified

Checked against a running production build with headless Chromium:

- Route authorization across anon + 3 roles × 5 routes
- Bad/short passwords produce no session cookie
- No PII or staff CTAs in the student dashboard
- Mobile @390×844: no tap target under 44px, no horizontal overflow
