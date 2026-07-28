import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/atoms-utils";

const buttonVariants = cva(
  [
    // Layout & Sizing
    "inline-flex items-center justify-center",
    "gap-2 whitespace-nowrap",
    "shrink-0",

    // Typography
    "text-md font-semibold",

    // Icon Styles
    "[&_svg]:pointer-events-none",
    "[&_svg]:w-[1.375rem] [&_svg]:h-[1.375rem]",
    "[&_svg]:shrink-0",

    // Interactive States
    "transition-all",
    "cursor-pointer",
    "disabled:pointer-events-none disabled:opacity-50",

    // Focus & Validation States
    "outline-none",
    "focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:ring-[3px]",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
    "aria-invalid:border-destructive",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary-600 active:bg-primary-700",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border bg-backgrounds hover:bg-neutral-bg hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        tertiary: "bg-tertiary text-tertiary-foreground hover:bg-tertiary/80",
        ghost: "bg-transparent hover:bg-neutral-bg active:bg-neutral-bg-active",
        link: "text-primary underline-offset-4 hover:underline",
        topic:
          "bg-accent hover:bg-primary-hover text-accent-foreground font-heading rounded-full px-4 py-2 text-sm font-medium transition-colors",
        "rounded-white":
          "rounded-full bg-white text-secondary-foreground hover:bg-gray-100 transition-all duration-300",
      },
      size: {
        default: "h-10 min-w-10 px-4 rounded-4xl",
        lg: "h-12 min-w-12 px-6 rounded-4xl",
        sm: "h-8 min-w-8 px-3 rounded-4xl",
        icon: "size-10 rounded-full",
      },
      colorScheme: {
        primary: "",
        ai: "bg-[length:250%_100%] !bg-transparent",
        danger: "",
        success: "",
        neutral: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        colorScheme: "primary",
        class:
          "bg-primary text-inverse-text hover:bg-primary-hover active:bg-primary-active",
      },
      {
        variant: "default",
        colorScheme: "success",
        class:
          "bg-success text-inverse-text hover:bg-success-hover active:bg-success-active",
      },
      {
        variant: "default",
        colorScheme: "danger",
        class:
          "bg-danger text-inverse-text hover:bg-danger-hover active:bg-danger-active",
      },
      {
        variant: "default",
        colorScheme: "neutral",
        class:
          "bg-neutral text-inverse-text hover:bg-neutral-hover active:bg-neutral-active",
      },
      {
        variant: "default",
        colorScheme: "ai",
        class: "ai-500 text-inverse-text hover:ai-600 active:ai-700",
      },
      {
        variant: "outline",
        colorScheme: "primary",
        class:
          "border text-primary-fg hover:bg-primary-bg hover:text-primary-fg active:bg-primary-bg-active",
      },
      {
        variant: "outline",
        colorScheme: "success",
        class:
          "border text-success-fg hover:bg-success-bg hover:text-success-fg active:bg-success-bg-active",
      },
      {
        variant: "outline",
        colorScheme: "danger",
        class:
          "border text-danger-fg hover:bg-danger-bg hover:text-danger-fg active:bg-danger-bg-active",
      },
      {
        variant: "outline",
        colorScheme: "neutral",
        class:
          "border text-neutral-fg hover:bg-neutral-bg hover:text-neutral-fg active:bg-neutral-bg-active",
      },
      {
        variant: "ghost",
        colorScheme: "primary",
        class:
          "text-primary-fg hover:bg-primary-bg hover:text-primary-fg active:bg-primary-bg-active",
      },
      {
        variant: "ghost",
        colorScheme: "success",
        class:
          "text-success-fg hover:bg-success-bg hover:text-success-fg active:bg-success-bg-active",
      },
      {
        variant: "ghost",
        colorScheme: "danger",
        class:
          "text-danger-fg hover:bg-danger-bg hover:text-danger-fg active:bg-danger-bg-active",
      },
      {
        variant: "ghost",
        colorScheme: "neutral",
        class:
          "text-neutral-fg hover:bg-neutral-bg hover:text-neutral-fg active:bg-neutral-bg-active",
      },
      {
        variant: "link",
        colorScheme: "primary",
        class: "text-primary active:text-primary-700",
      },
      {
        variant: "link",
        colorScheme: "success",
        class: "text-success active:text-success-700",
      },
      {
        variant: "link",
        colorScheme: "danger",
        class: "text-danger active:text-danger-700",
      },
      {
        variant: "link",
        colorScheme: "neutral",
        class: "text-neutral active:text-neutral-700",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      colorScheme: "primary",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  Omit<VariantProps<typeof buttonVariants>, "colorScheme"> & {
    asChild?: boolean;
    colorScheme?: NonNullable<
      VariantProps<typeof buttonVariants>["colorScheme"]
    >;
  };

function Button({
  className,
  variant,
  size,
  colorScheme,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  let resolvedColorSchemeFinal = colorScheme;

  if (!colorScheme) {
    switch (variant) {
      case "default":
      case "link":
        resolvedColorSchemeFinal = "primary";
        break;
      case "outline":
      case "ghost":
        resolvedColorSchemeFinal = "neutral";
        break;
      default:
        resolvedColorSchemeFinal = "primary";
    }
  }

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({
          variant,
          size,
          colorScheme: resolvedColorSchemeFinal,
          className,
        }),
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants, type ButtonProps };
