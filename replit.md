# Workspace — Shop App (अपना Bazaar)

## Shop App
A Hindi/English bilingual neighborhood super-app for Indian users. React + Vite, frontend-only (no backend).

**Features:**
- 6 tabs: Home, Barber, Sabji-Fal, Grocery, Booking, Other Services
- Cart system with add/remove/quantity/order
- Service booking form with date/time slot selection
- Toast notifications
- Bottom navigation

**Artifact:** `artifacts/shop-app` (preview path: `/`)

---

# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
