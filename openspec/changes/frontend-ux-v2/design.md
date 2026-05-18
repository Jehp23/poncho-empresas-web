# Design: Frontend UX v2 — Flujo cliente y mejoras de producto

## Technical Approach

Implementar el flujo demo **login → empresa → command center → operar → financiar** sobre la arquitectura existente (feature modules + mock). Server Components cargan datos mock por `empresaId`; estado interactivo (switcher, wizard, tabs) vive en **Client Providers** mínimos. Sin API ni auth real — cookies/localStorage solo para demo.

## Architecture Decisions

| Decision | Alternatives | Choice | Rationale |
|----------|--------------|--------|-----------|
| Tenant context | URL param, global store, React Context | **Context + localStorage** `pe:empresaId` | Switcher afecta toda la app; patrón simple pre-backend |
| Operations hub | 3 rutas, modal, tabs | **Ruta `/operar?tab=`** | Una entrada nav; tabs sincronizados con URL (shareable, back button) |
| Wizard steps | Modal, single page state, URL segments | **URL `/financiamiento/solicitud/[paso]`** | Deep-link, progreso visible, alineado con App Router |
| Wizard persistence | sessionStorage, Context only | **localStorage** `pe:wizard:{empresaId}` | Sobrevive refresh; keyed por tenant |
| Auth demo | Skip login, middleware | **Route group `(auth)`** opcional | Simula journey; dashboard accesible sin bloqueo en v2 |
| Inicio layout | 8 cards, 4 zones | **4 zonas** (propuesta) | Menos ruido; cuentas pasan a `/operar` o link |
| Secondary modules | Sidebar 11 items | **Nav 5 + drawer "Más"** | Simétrico; CashFlow/etc. bajo `/mas` |
| Uploads wizard | Real File API | **Mock** (nombre + estado) | MVP sin backend; UI lista para wire real |

## Data Flow

```
(auth)/login ──→ set pe:session=demo
       │
       ▼
(onboarding) ──→ set pe:empresaId
       │
       ▼
EmpresaProvider ──→ getDashboardData(empresaId) ──→ HomeView / OperateView / …
       │
       ├─ PageHeader switcher ──→ setEmpresaId ──→ re-fetch mock
       │
       └─ FinancingWizard ──→ read/write pe:wizard:{empresaId}
                              └─ on step 10 → estado en_revision (mock)
```

**Inicio v2 wireframe (desktop):**

```
┌─ AdvisorNote (1 CTA) ─────────────────────────────────────┐
├─ BalanceHero (saldo + CTAs) ────────────────────────────┤
├─ TodayRow ────┬─ Pagos urg. ─┬─ Cobros ─┬─ eCheqs ───────┤
├─ FinancingCTA (if paso < 10) OR ActivityPreview (3) ─────┤
└─────────────────────────────────────────────────────────┘
```

**Nav:** `Inicio | Operar | eCheqs | Financiar | Más`

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `features/auth/delivery/login-view.tsx` | Create | Login demo |
| `features/auth/delivery/onboarding-view.tsx` | Create | Selector empresa inicial |
| `features/shell/delivery/empresa-provider.tsx` | Create | Context + hook `useEmpresa` |
| `features/shell/config/navigation.ts` | Modify | 5 ítems + rutas `/operar`, `/mas` |
| `features/shell/delivery/components/page-header.tsx` | Modify | Switcher wired + quick actions |
| `features/home/delivery/home-view.tsx` | Modify | Layout 4 zonas; remove AccountsSummary, QuickLinks |
| `features/home/delivery/components/today-row.tsx` | Create | Pagos + cobros + eCheqs compacto |
| `features/operations/delivery/operate-view.tsx` | Create | Tabs: movimientos / transferir / depositar |
| `features/operations/delivery/components/*.tsx` | Create | List, transfer form, deposit form (mock) |
| `features/financiamiento/domain/wizard-schema.ts` | Create | Zod schemas pasos 1–10 |
| `features/financiamiento/domain/wizard-storage.ts` | Create | load/save localStorage |
| `features/financiamiento/delivery/wizard/*.tsx` | Create | Shell + 10 step components |
| `features/echeqs/delivery/echeqs-view.tsx` | Create | Tabs emitidos/recibidos |
| `shared/ui/empty-state.tsx` | Create | Icon + title + CTA |
| `shared/ui/skeleton.tsx` | Create | Card/row placeholders |
| `shared/ui/stepper.tsx` | Create | Progress 1/10 |
| `shared/infrastructure/mock/index.ts` | Create | `getDashboardData(empresaId)` |
| `shared/infrastructure/mock/empresas/*.ts` | Create | Mock por tenant |
| `app/(auth)/login/page.tsx` | Create | Auth routes |
| `app/(dashboard)/operar/page.tsx` | Create | Operations hub |
| `app/(dashboard)/mas/page.tsx` | Create | Secondary modules grid |
| `app/(dashboard)/financiamiento/solicitud/[paso]/page.tsx` | Create | Wizard |
| `app/(dashboard)/movimientos/page.tsx` | Modify | Redirect → `/operar` |
| `app/(dashboard)/transferencias/page.tsx` | Modify | Redirect → `/operar?tab=transferir` |
| `app/(dashboard)/depositos/page.tsx` | Modify | Redirect → `/operar?tab=depositar` |
| `features/home/delivery/components/accounts-summary.tsx` | Delete | Moved to operar tab context |
| `features/home/delivery/components/quick-links.tsx` | Delete | Replaced by `/mas` |

## Interfaces / Contracts

```typescript
// features/shell/domain/empresa-context.ts
interface EmpresaContextValue {
  empresaId: string;
  empresa: Empresa;
  setEmpresaId: (id: string) => void;
  empresas: Empresa[];
}

// features/financiamiento/domain/wizard-schema.ts
interface WizardDraft {
  empresaId: string;
  pasoActual: number;
  updatedAt: string;
  paso1?: { reseña: string; hitos: string[] };
  // … pasos 2–10 según CEO spec
  estado: EstadoFinanciamiento;
}

// shared/infrastructure/mock/index.ts
function getDashboardData(empresaId: string): DashboardData;
```

Wizard validation: **react-hook-form + zod** por paso; botón Continuar disabled hasta válido.

## Testing Strategy

| Layer | What | Approach |
|-------|------|----------|
| Manual | Journey demo | Checklist en verify-report |
| Build | Compile | `npm run build` + `tsc --noEmit` |
| Unit/E2E | — | Deferred (sin runner); add vitest post-v2 |

## Migration / Rollout

No migration required. Feature flags no necesarios — change aislado en branch. Rollback: revert commits; limpiar keys `pe:*` en localStorage manualmente si aplica.

## Open Questions

- [ ] ¿Login obligatorio en demo o acceso directo a `/inicio`? **Default design:** login skippable via link "Entrar sin login"
- [ ] ¿Bottom nav mobile además de drawer? **Default:** drawer only en v2; bottom nav en iteración posterior
- [ ] ¿Roles (admin/finanzas) ocultan acciones en v1? **Default:** no — mock único rol admin
