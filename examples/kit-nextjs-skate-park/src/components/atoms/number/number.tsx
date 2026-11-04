import { cn } from "@/lib/atoms-utils";

import type { NumberProps } from "./number.schema";

const inputClassName = cn(
  "flex h-10 w-full min-w-0 rounded-md border border-zinc-300 bg-white px-3 py-1",
  "outline-none transition-[color]",
  "placeholder:text-zinc-400 selection:bg-zinc-900 selection:text-white dark:bg-zinc-950/30",
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  "focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900",
  "aria-invalid:border-red-500 aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40",
  "tabular-nums",
);

function NumericInput({ className, value }: NumberProps) {
  return (
    <input
      type="number"
      data-slot="number"
      defaultValue={value?.value}
      className={cn(inputClassName, className)}
    />
  );
}

export { NumericInput };
