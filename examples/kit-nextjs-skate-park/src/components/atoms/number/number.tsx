import type * as React from "react";

import { cn } from "@/lib/atoms-utils";

const inputClassName = cn(
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-inverse-text dark:bg-input/30 border-input flex h-10 w-full min-w-0 rounded-sm border bg-body-bg px-3 py-1 text-base transition-[color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  "focus-visible:border-primary",
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  "border-input focus:border-primary focus:ring-primary text-md font-regular placeholder-blackAlpha-400 rounded-md border focus:ring-1",
);

type NumberProps = Omit<
  React.ComponentProps<"input">,
  "type" | "min" | "max" | "step" | "children"
> & {
  /** Visible label; associated with the control via nested `<label>` for screen readers and pointer users. */
  label: string;
  /** Inclusive minimum (maps to `min`). */
  min?: number;
  /** Inclusive maximum (maps to `max`). */
  max?: number;
  /** When false, uses integer stepping and blocks decimal separators in keyboard input. */
  decimalsAllowed?: boolean;
};

function NumericInput({
  className,
  label,
  min,
  max,
  decimalsAllowed = true,
  onKeyDown,
  ...props
}: NumberProps) {
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (!decimalsAllowed && (e.key === "." || e.key === ",")) {
      e.preventDefault();
    }
    onKeyDown?.(e);
  };

  return (
    <label
      data-slot="number"
      className={cn("flex w-full max-w-full flex-col gap-1.5", className)}
    >
      <span className="text-md font-medium text-neutral-fg leading-none">
        {label}
      </span>
      <input
        type="number"
        data-slot="input"
        inputMode={decimalsAllowed ? "decimal" : "numeric"}
        min={min}
        max={max}
        step={decimalsAllowed ? "any" : 1}
        onKeyDown={handleKeyDown}
        className={cn(inputClassName, "tabular-nums")}
        {...props}
      />
    </label>
  );
}

export { NumericInput };
