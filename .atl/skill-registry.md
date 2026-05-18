# Skill Registry — Poncho Empresas

**Delegator use only.** Sub-agents receive compact rules injected in prompts, not this file.

## Project Conventions

| File | Purpose |
|------|---------|
| AGENTS.md | Next.js breaking changes — read `node_modules/next/dist/docs/` before coding |
| openspec/config.yaml | SDD project config, stack context, phase rules |
| src/app/globals.css | Design tokens (Poncho palette, Montserrat brand) |
| src/features/* | Feature modules by domain (shell, home, financiamiento) |
| src/shared/* | Shared UI, lib, types, mock infrastructure |

## User Skills (relevant to this stack)

| Trigger | Skill | Path |
|---------|-------|------|
| Next.js App Router, debugging, deployment | nextjs | ~/.claude/plugins/cache/.../vercel/0.40.0/skills/nextjs/SKILL.md |
| shadcn, Tailwind UI components | shadcn | ~/.claude/plugins/cache/.../vercel/0.40.0/skills/shadcn/SKILL.md |
| React patterns, TSX quality | react-best-practices | ~/.claude/plugins/cache/.../vercel/0.40.0/skills/react-best-practices/SKILL.md |
| Vercel deploy, env, CI | vercel-cli | ~/.claude/plugins/cache/.../vercel/0.40.0/skills/vercel-cli/SKILL.md |
| Create PR, branch workflow | branch-pr | ~/.claude/skills/branch-pr/SKILL.md |
| Create GitHub issue | issue-creation | ~/.claude/skills/issue-creation/SKILL.md |
| Split work into PRs | split-to-prs | ~/.cursor/skills-cursor/split-to-prs/SKILL.md |
| SDD workflow phases | sdd-* | ~/.claude/skills/sdd-*/SKILL.md |

## Compact Rules

### nextjs
- App Router: Server Components default; `'use client'` only for interactivity
- Read project Next.js docs in node_modules — version may differ from training data
- Prefer Server Components + thin client islands for dashboard widgets

### poncho-empresas-architecture
- Group by feature: `src/features/{domain}/delivery/components/`
- Shared primitives in `src/shared/ui/`; mock data in `src/shared/infrastructure/mock/`
- App routes in `src/app/(dashboard)/` stay thin — compose feature views
- Montserrat for brand/headings; Inter for body; design tokens from globals.css

### react-best-practices
- Minimize client components; colocate state
- Accessible focus states and semantic HTML for fintech UI

### sdd-workflow
- Explore → Propose → Spec → Design → Tasks → Apply → Verify → Archive
- Artifacts in `openspec/changes/{change-name}/`; merge specs on archive
