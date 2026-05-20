import type { InputHTMLAttributes, LabelHTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export const INPUT_CLASS =
  "mt-1.5 w-full rounded-xl border border-border-subtle bg-surface px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-primary";

type FormFieldProps = {
  label: string;
  children: ReactNode;
  className?: string;
} & LabelHTMLAttributes<HTMLLabelElement>;

export function FormField({ label, children, className, ...rest }: FormFieldProps) {
  return (
    <label className={cn("block text-sm", className)} {...rest}>
      <span className="text-muted">{label}</span>
      {children}
    </label>
  );
}

export function TextInput({
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(INPUT_CLASS, className)} {...rest} />;
}

export function TextArea({
  className,
  ...rest
}: InputHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(INPUT_CLASS, "min-h-[100px] resize-y", className)}
      {...rest}
    />
  );
}
