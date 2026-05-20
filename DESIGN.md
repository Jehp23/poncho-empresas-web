# Poncho Empresas — Guía de Diseño UX/UI

> **Principio rector:** neutro por defecto, color con propósito.

Aplicación financiera B2B: profesional y confiable, pero cálida (no gris corporativo aburrido). El color **informa, guía y prioriza** — no decora.

---

## 1. Sistema de color (regla 60-30-10)

| % | Rol | Tokens |
|---|-----|--------|
| **60%** | Neutros | `--pe-bg`, `--pe-surface`, `--pe-ink`, `--pe-muted` |
| **30%** | Brand | `--pe-primary` — nav activa, botones primarios, bordes KPI |
| **10%** | Acento + semánticos | `--pe-accent`, `--pe-success-vivid`, `--pe-warning`, `--pe-danger`, `--pe-info`, `--pe-ai`, `--pe-wallet` |

### Cuándo usar color

| Situación | Color | Ejemplo |
|-----------|-------|---------|
| Dato protagonista de la pantalla | Gradiente primary | Hero consolidado, hero financiamiento |
| Métrica con contexto | Borde izquierdo KPI | `KpiCard` con `accentColor` |
| Estado de negocio | Badge semántico | Pendiente → warning, Conectado → success-vivid |
| Acción principal | Botón primary | "Emitir eCheq", "Continuar" |
| Acción secundaria destacada | Botón accent | Solo 1 por vista, opcional |
| Todo lo demás | Neutro | Títulos, tablas, labels |

### Anti-patterns de color

- Título de sección en verde
- Más de 1 gradiente por pantalla
- Iconos multicolor en sidebar
- 4+ botones primary en la misma vista
- Filas de tabla con colores distintos sin motivo

---

## 2. Jerarquía visual

Cada pantalla tiene **un solo protagonista**:

```
Topbar (contexto global)
  └─ Hero / KPI row (dato clave)
       └─ Contenido principal (tabla, formulario, gráfico)
            └─ Detalle secundario (insights, historial)
```

| Pantalla | Protagonista |
|----------|--------------|
| Home | 4 KPI cards + BalanceHero |
| Bancos | Hero consolidado verde |
| eCheqs | KPI emitidos/recibidos + tabla |
| Operar | Saldo operativo + movimientos/formulario |
| Financiamiento | Hero SGR + carpeta/línea |

---

## 3. Tres plantillas de layout

### A) Dashboard (`ancho="completo"`)

Usar en: Home, Bancos.

```
[KPI row — máx. 4 cards]
[Hero card — gradiente, 1 solo]
[Grid 2 cols: principal | lateral]
[Tabla o bloque full-width]
```

### B) Lista + acción (`ancho="completo"`)

Usar en: eCheqs, Movimientos, Cheques financiados.

```
[Header: título + subtítulo + 1 CTA primario]
[KPI row opcional — máx. 4]
[Tabs o FilterChips]
[Tabla / lista con badges de estado]
[EmptyState si no hay datos]
```

### C) Flujo / Wizard (`ancho="estrecho"`)

Usar en: Financiamiento solicitud, Onboarding.

```
[Stepper horizontal]
[Formulario centrado, max ~640px]
[Botones: Anterior | Continuar]
```

---

## 4. Componentes (`src/shared/ui/`)

| Componente | Uso |
|------------|-----|
| `KpiCard` | Métricas numéricas con borde de acento |
| `Badge` | Estados (variant semántico) |
| `Card` | Contenedores genéricos |
| `Button` | 1 primary + N secondary/ghost por vista |
| `TabBar` | Navegación por tabs dentro de una página |
| `FilterChips` | Filtros rápidos sobre listas |
| `EmptyState` | Sin datos: ícono + mensaje + 1 acción |
| `SectionHeader` | Título de bloque + link "Ver todo" |
| `PageHeaderRow` | Título de página + subtítulo + CTA opcional |
| `Stepper` | Wizard multi-paso |
| `FormField` / `TextInput` | Formularios consistentes |
| `DataTable` | Tablas con header/footer unificados |
| `DashboardLoading` | Skeleton de carga (no spinner solo) |

**Regla:** componer antes de crear. Nuevo componente solo si se repite en 3+ lugares.

---

## 5. Tipografía

| Uso | Clase / estilo |
|-----|----------------|
| KPI value | `font-display text-[22px] font-bold` |
| Page title | `font-display text-[22px] font-semibold` |
| Section title | `.text-section-title` |
| Label / caption | `.text-label` |
| Body / tabla | `text-sm` (13.5–14px) |
| Muted helper | `text-xs text-muted` o `text-faint` |

Fuentes: **Poppins** (display/números), **DM Sans** (body).

---

## 6. Espaciado

- Gap entre secciones: `mb-6` (24px)
- Padding cards: `px-5 py-4` o `padding="lg"`
- Grid gaps: `gap-4` (KPIs), `gap-6` (bloques)
- Máximo ancho dashboard: `max-w-[76rem]`
- Máximo ancho wizard: `max-w-3xl`

---

## 7. Estados vacíos, loading y errores

```
Empty  → ícono + mensaje claro + 1 acción
Loading → skeleton del layout (no spinner solo)
Error  → mensaje humano + botón Reintentar
```

Nunca pantalla en blanco. Nunca error técnico crudo al usuario.

---

## 8. Navegación y flujo

- **Topbar:** acciones frecuentes (máx. 4–5): Enviar, Recibir, Financiamiento
- **Sidebar:** estructura, máx. 8–10 items visibles
- **Tabs internos:** para variantes de la misma entidad (emitidos/recibidos)
- **Breadcrumbs:** solo en drill-down profundo
- **Confirmación:** modal simple antes de acciones irreversibles

---

## 9. Checklist por pantalla nueva

- [ ] ¿Tiene un solo protagonista claro?
- [ ] ¿Usa plantilla A, B o C?
- [ ] ¿Color solo donde informa (estado, prioridad, acción)?
- [ ] ¿Máximo 4 KPIs y 1 CTA primario?
- [ ] ¿Empty state y loading definidos?
- [ ] ¿Escaneable en 10 segundos?
- [ ] ¿Usa componentes de `shared/ui`?
- [ ] ¿Se ve bien en 1280px?

---

## 10. Referencia visual

Mockup de referencia: `poncho-empresa (1).html`  
Tokens CSS: `src/app/globals.css`  
Implementaciones de referencia:

- Dashboard: `src/features/home/delivery/home-view.tsx`
- Bancos: `src/features/bancos/delivery/bancos-view.tsx`
- Lista: `src/features/echeqs/delivery/echeqs-view.tsx`
- CashFlow: `src/features/cashflow/delivery/cashflow-view.tsx`
- Cuenta remunerada: `src/features/cuenta-remunerada/delivery/cuenta-remunerada-view.tsx`
- Wizard: `src/features/financiamiento/delivery/financiamiento-view.tsx`
