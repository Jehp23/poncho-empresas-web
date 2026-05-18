import Link from "next/link";
import { cn } from "@/shared/lib/cn";

type SectionHeaderProps = {
  title: string;
  href?: string;
  linkLabel?: string;
  className?: string;
};

export function SectionHeader({
  title,
  href,
  linkLabel = "Ver todo",
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-4 flex items-center justify-between gap-3", className)}>
      <h2 className="text-section-title">{title}</h2>
      {href && (
        <Link
          href={href}
          className="text-xs font-medium text-primary transition-colors hover:text-primary-hover"
        >
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
