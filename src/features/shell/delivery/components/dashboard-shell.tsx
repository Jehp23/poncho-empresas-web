"use client";

import { LogOut, Menu, Settings, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  USER_MENU_ITEMS,
  isNavActive,
  type NavItem,
} from "@/features/shell/config/navigation";
import {
  canManageUsuarios,
  getNavItemsForRole,
} from "@/features/shell/domain/roles";
import { endDemoSession } from "@/features/auth/domain/start-demo-session";
import { cn } from "@/shared/lib/cn";
import { useEmpresa } from "@/features/shell/delivery/empresa-provider";
import { ConnectionBanner } from "./connection-banner";
import { MobileQuickActions } from "./mobile-quick-actions";
import { RoleBadge } from "./role-badge";
import { PonchoLogo } from "./poncho-logo";
import { Topbar } from "./topbar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const { data, showApiBanner, retryApi, dismissApiBanner, simulateOffline } =
    useEmpresa();
  const navItems = getNavItemsForRole(data.usuario.rol);

  const closeDrawer = useCallback(() => dialogRef.current?.close(), []);
  const openDrawer = useCallback(() => dialogRef.current?.showModal(), []);

  useEffect(() => {
    closeDrawer();
  }, [pathname, closeDrawer]);

  return (
    <div className="flex min-h-screen bg-bg text-ink">
      <aside className="sticky top-0 z-40 hidden h-screen w-[240px] shrink-0 flex-col border-r border-border-subtle bg-surface shadow-xs lg:flex">
        <div className="flex items-center gap-2.5 border-b border-border-subtle px-5 py-[18px]">
          <PonchoLogo />
        </div>

        <nav className="flex flex-1 flex-col overflow-y-auto px-3 py-3">
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>

        <UserCard />
      </aside>

      <button
        type="button"
        onClick={openDrawer}
        className="fixed left-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-surface shadow-card lg:hidden"
        aria-label="Abrir menú"
      >
        <Menu className="h-5 w-5 text-muted" />
      </button>

      <dialog
        ref={dialogRef}
        className="m-0 h-full max-h-none w-[280px] border-0 bg-surface p-0 shadow-lg [&::backdrop]:bg-black/20 [&::backdrop]:backdrop-blur-sm"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border-subtle px-5 py-4">
            <PonchoLogo />
            <button
              type="button"
              onClick={closeDrawer}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-surface-muted"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-3 py-3">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                pathname={pathname}
                onNavigate={closeDrawer}
              />
            ))}
          </nav>
          <UserCard onNavigate={closeDrawer} />
        </div>
      </dialog>

      <div className="flex min-w-0 flex-1 flex-col">
        {showApiBanner && (
          <ConnectionBanner
            message={
              simulateOffline
                ? "Modo offline simulado — mostrando datos de demostración."
                : "No pudimos conectar con el servidor. Mostrando datos de demostración."
            }
            onRetry={retryApi}
            onDismiss={dismissApiBanner}
          />
        )}
        <Topbar />
        {children}
        <MobileQuickActions />
      </div>
    </div>
  );
}

function NavLink({
  item,
  pathname,
  onNavigate,
}: {
  item: NavItem;
  pathname: string;
  onNavigate?: () => void;
}) {
  const Icon = item.icon;
  const active = isNavActive(pathname, item.href);

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-2.5 py-[9px] pl-[20px] pr-[12px] text-[13.5px] font-medium transition-all duration-150",
        "border-l-[3px]",
        active
          ? "border-primary bg-primary-xlight font-semibold text-primary"
          : "border-transparent text-muted hover:bg-bg hover:text-ink",
      )}
    >
      <Icon className={cn("h-4 w-4 shrink-0 opacity-80", active && "opacity-100")} />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}

function UserCard({ onNavigate }: { onNavigate?: () => void }) {
  const { data } = useEmpresa();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const rol = data.usuario.rol;

  const nombre = data.usuario.nombre;
  const initials = nombre
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const menuItems = USER_MENU_ITEMS.filter(
    (item) => item.href !== "/usuarios" || canManageUsuarios(rol),
  );

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function cerrarSesion() {
    endDemoSession();
    onNavigate?.();
  }

  return (
    <div ref={ref} className="relative border-t border-border-subtle px-4 py-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2.5 rounded-lg px-1 py-1 text-left transition-colors hover:bg-surface-muted"
        aria-expanded={open}
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-[12px] font-bold text-white">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold text-ink">{nombre}</p>
          <RoleBadge rol={rol} className="mt-1 text-[10px]" />
        </div>
        <Settings className="h-4 w-4 shrink-0 text-faint" />
      </button>

      {open && (
        <ul className="absolute bottom-full left-4 right-4 mb-2 overflow-hidden rounded-xl border border-border-subtle bg-surface py-1 shadow-hover">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => {
                    setOpen(false);
                    onNavigate?.();
                  }}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-muted transition-colors hover:bg-surface-muted hover:text-ink"
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {item.pronto && (
                    <span className="text-[10px] text-faint">Pronto</span>
                  )}
                </Link>
              </li>
            );
          })}
          <li className="border-t border-border-subtle">
            <button
              type="button"
              onClick={cerrarSesion}
              className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-muted transition-colors hover:bg-surface-muted hover:text-ink"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              Cerrar sesión
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
