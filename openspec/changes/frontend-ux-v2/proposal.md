# Proposal: Frontend UX v2 — Flujo cliente y mejoras de producto

## Intent

El front actual demuestra capacidades (mock) pero no guía al usuario PYME en un **flujo claro de valor**: entender su salud financiera → operar el día a día → avanzar hacia financiamiento. Hay redundancia visual (cuentas + stats + actividad), rutas placeholder sin coherencia, y CTAs que no llevan a ningún lado. Necesitamos un **producto navegable** que simule la experiencia final antes del backend.

## Scope

### In Scope
- Rediseñar **flujo del cliente** (onboarding demo → home → operar → financiar)
- Simplificar **Inicio** como command center (menos bloques, más jerarquía)
- Unificar **Operaciones** (movimientos + transferir + depositar) en una vista con tabs
- Implementar **shell de pantallas** con empty states y CTAs reales (mock)
- **Wizard financiamiento** (10 pasos, progreso local, estados en dashboard)
- **Company switcher** funcional (mock multi-empresa)
- **Quick actions** globales en header (Transferir, Depositar, eCheq)
- Skeletons + estados vacíos consistentes

### Out of Scope
- Backend Spring Boot / auth real
- Integración FastAPI / IA en vivo
- Tests automatizados (fase posterior)
- Dark mode, i18n

## Capabilities

### New Capabilities
- `client-journey`: flujo demo login/onboarding → dashboard por rol
- `operations-hub`: vista unificada movimientos/transferencias/depósitos
- `financing-wizard`: wizard 10 pasos con borrador local y timeline de estado
- `multi-company-context`: switcher de empresa con datos mock por tenant
- `empty-states`: patrones reutilizables para módulos sin datos

### Modified Capabilities
- None (no hay specs previas en `openspec/specs/`)

## Approach

**Flujo propuesto (vista cliente):**

```
Login demo → Elegir empresa → Inicio (command center)
    ├─ Operar (/operar) — tabs: Movimientos | Transferir | Depositar
    ├─ eCheqs (/echeqs) — emitidos/recibidos
    ├─ Financiar (/financiamiento) — hero + wizard
    └─ Más — CashFlow, Cuenta remunerada, Usuarios, Ajustes (pronto)
```

**Inicio v2** (4 zonas, no 8 cards):
1. Insight asesor (1 acción recomendada)
2. Saldo + sparkline + 2 CTAs
3. Fila "Hoy": pagos urgentes | cobros | eCheqs pendientes
4. Financiamiento (si incompleto) o actividad reciente (3 ítems)

Nav: **Inicio · Operar · eCheqs · Financiar · Más** (5 ítems, simétrico).

Implementación: nuevos features `auth`, `operations`, ampliar `financiamiento`; shared `empty-state`, `skeleton`; mock por `empresaId`.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `features/shell/` | Modified | Nav, header quick actions, company context |
| `features/home/` | Modified | Inicio v2 simplificado |
| `features/operations/` | New | Hub operaciones con tabs |
| `features/financiamiento/` | Modified | Wizard + estados post-envío |
| `features/auth/` | New | Login demo + onboarding |
| `shared/ui/` | Modified | EmptyState, Skeleton, Stepper |
| `app/(dashboard)/` | Modified | Rutas `/operar`, redirects |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Scope creep en wizard | Med | Wizard MVP: navegación + validación, sin uploads reales |
| Refactor rompe layout | Low | Cambios incrementales; build en cada fase |
| Flujo distinto al spec CEO original | Med | Documentar deltas vs roadmap en design.md |

## Rollback Plan

Revertir branch/commits del change `frontend-ux-v2`. Nav y rutas viejas permanecen en git. Borrador wizard en localStorage es client-side — no afecta servidor. Sin migraciones DB.

## Dependencies

- Mock data extendido por empresa (`shared/infrastructure/mock/`)
- Sin APIs externas en v2

## Success Criteria

- [ ] Usuario demo completa: login → empresa → inicio → operar → iniciar wizard
- [ ] Inicio muestra ≤5 bloques con jerarquía clara en mobile y desktop
- [ ] Company switcher cambia datos visibles en toda la app
- [ ] Wizard persiste progreso al recargar (localStorage)
- [ ] Todas las rutas principales tienen empty state o contenido mock (no placeholder genérico)
- [ ] `npm run build` y `tsc --noEmit` pasan
