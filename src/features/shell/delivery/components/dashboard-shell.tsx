"use client";

import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  NAV_SECTIONS,
  isNavActive,
  type NavItem,
} from "@/features/shell/config/navigation";
import { cn } from "@/shared/lib/cn";
import { PonchoLogo } from "./poncho-logo";

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
    <div className="flex min-h-screen bg-bg text-ink">
      <aside
        className={cn(
          "sticky top-0 z-40 hidden h-screen shrink-0 flex-col border-r border-border-subtle bg-surface lg:flex",
          collapsed ? "w-[72px]" : "w-[256px]",
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
          {NAV_SECTIONS.map((section) => (
            <NavSection
              key={section.label}
              section={section}
              pathname={pathname}
              collapsed={collapsed}
            />
          ))}
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
            {NAV_SECTIONS.map((section) => (
              <NavSection
                key={section.label}
                section={section}
                pathname={pathname}
                collapsed={false}
                onNavigate={closeDrawer}
              />
            ))}
          </div>
        </div>
      </dialog>

      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}

function NavSection({
  section,
  pathname,
  collapsed,
  onNavigate,
}: {
  section: { label: string; items: NavItem[] };
  pathname: string;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  return (
    <nav className={cn("px-3", collapsed ? "mb-2" : "mb-1")}>
      {!collapsed && (
        <p className="mb-2 mt-4 px-2 text-label first:mt-1">{section.label}</p>
      )}
      <div className="flex flex-col gap-0.5">
        {section.items.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            pathname={pathname}
            collapsed={collapsed}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </nav>
  );
}

function NavLink({
  item,
  pathname,
  collapsed,
  onNavigate,
}: {
  item: NavItem;
  pathname: string;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const Icon = item.icon;
  const active = isNavActive(pathname, item.href);

  return (
    <Link
      href={item.href}
      title={collapsed ? item.label : undefined}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150",
        collapsed && "justify-center px-2",
        active
          ? "bg-primary-soft text-primary"
          : item.destacado
            ? "text-ink hover:bg-surface-muted"
            : "text-muted hover:bg-surface-muted hover:text-ink",
        item.destacado && !active && "border-l-2 border-primary pl-[10px]",
      )}
    >
      <Icon className={cn("h-[18px] w-[18px] shrink-0", active && "text-primary")} />
      {!collapsed && (
        <>
          <span className="truncate">{item.label}</span>
          {item.pronto && (
            <span className="ml-auto rounded-md bg-surface-muted px-1.5 py-0.5 text-[10px] font-normal text-faint">
              Pronto
            </span>
          )}
          {item.destacado && !item.pronto && (
            <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden />
          )}
        </>
      )}
    </Link>
  );
}
