"use client";

import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import {
  PRIMARY_NAV,
  isNavActive,
} from "@/features/shell/config/navigation";
import { cn } from "@/shared/lib/cn";
import { PonchoLogo } from "./poncho-logo";
import { useState } from "react";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  const closeDrawer = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const openDrawer = useCallback(() => {
    dialogRef.current?.showModal();
  }, []);

  useEffect(() => {
    closeDrawer();
  }, [pathname, closeDrawer]);

  return (
    <div className="flex min-h-screen bg-transparent text-ink">
      <aside
        className={cn(
          "sticky top-0 z-40 hidden h-screen shrink-0 flex-col border-r border-primary/10 lg:flex",
          "bg-gradient-to-b from-surface via-surface to-primary-soft/50",
          collapsed ? "w-[72px]" : "w-[252px]",
        )}
      >
        <div
          className={cn(
            "flex items-center border-b border-border-subtle px-4 py-5",
            collapsed ? "justify-center" : "justify-between gap-2",
          )}
        >
          <PonchoLogo collapsed={collapsed} />
          {!collapsed && (
            <button
              type="button"
              onClick={() => setCollapsed(true)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-faint transition-colors hover:bg-surface-muted hover:text-muted"
              aria-label="Contraer menú"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
        </div>

        {collapsed && (
          <button
            type="button"
            onClick={() => setCollapsed(false)}
            className="mx-auto mt-3 flex h-8 w-8 items-center justify-center rounded-lg text-faint hover:bg-surface-muted"
            aria-label="Expandir menú"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}

        <div className="flex flex-1 flex-col overflow-y-auto py-3">
          <NavList items={PRIMARY_NAV} pathname={pathname} collapsed={collapsed} />
        </div>
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
        className="m-0 h-full max-h-none w-[280px] border-0 bg-surface p-0 shadow-hover [&::backdrop]:bg-black/20 [&::backdrop]:backdrop-blur-sm"
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
          <div className="flex-1 overflow-y-auto py-3">
            <NavList
              items={PRIMARY_NAV}
              pathname={pathname}
              collapsed={false}
              onNavigate={closeDrawer}
            />
          </div>
        </div>
      </dialog>

      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}

function NavList({
  items,
  pathname,
  collapsed,
  onNavigate,
}: {
  items: typeof PRIMARY_NAV;
  pathname: string;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-col gap-0.5 px-3">
      {items.map((item) => {
        const Icon = item.icon;
        const active = isNavActive(pathname, item.href);
        const destacado = item.destacado && !active;
        return (
          <Link
            key={item.href}
            href={item.href}
            title={collapsed ? item.label : undefined}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
              collapsed && "justify-center px-2",
              active
                ? "bg-primary-soft text-primary shadow-sm ring-1 ring-primary/15"
                : destacado
                  ? "text-primary hover:bg-accent-soft/60"
                  : "text-muted hover:bg-surface-muted hover:text-ink",
            )}
          >
            {active && (
              <span
                className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full gradient-accent-bar"
                aria-hidden
              />
            )}
            <Icon
              className={cn(
                "h-[18px] w-[18px] shrink-0",
                active && "text-primary",
                destacado && "text-accent",
              )}
            />
            {!collapsed && (
              <>
                <span className="truncate">{item.label}</span>
                {destacado && (
                  <span className="ml-auto rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                    SGR
                  </span>
                )}
                {item.pronto && (
                  <span className="ml-auto rounded-md bg-surface-muted px-1.5 py-0.5 text-[10px] font-normal text-faint">
                    Pronto
                  </span>
                )}
              </>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
