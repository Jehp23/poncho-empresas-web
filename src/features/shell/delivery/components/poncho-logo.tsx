import Image from "next/image";
import Link from "next/link";
import { cn } from "@/shared/lib/cn";

export function PonchoLogo({
  collapsed = false,
  className,
}: {
  collapsed?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/inicio"
      className={cn("flex min-w-0 items-center gap-2.5", className)}
      aria-label="Poncho Empresas — Inicio"
    >
      <Image
        src="/ponchologoverde.png"
        alt=""
        width={collapsed ? 32 : 36}
        height={collapsed ? 32 : 36}
        className="shrink-0 object-contain"
        priority
      />
      {!collapsed && (
        <span
          className="font-poncho text-[1.0625rem] font-semibold leading-none tracking-tight text-[#2a2a2b]"
          aria-hidden
        >
          Poncho
          <span className="text-primary">Empresas</span>
        </span>
      )}
    </Link>
  );
}
