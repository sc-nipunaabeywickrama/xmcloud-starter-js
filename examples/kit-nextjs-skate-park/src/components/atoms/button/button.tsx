"use client";

import Link from "next/link";
import type * as React from "react";

import { cn } from "@/lib/atoms-utils";

const buttonClassName = cn(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0",
  "h-10 min-w-10 px-4 rounded-4xl text-md font-semibold",
  "bg-primary text-inverse-text hover:bg-primary-hover active:bg-primary-active",
  "[&_svg]:pointer-events-none [&_svg]:w-[1.375rem] [&_svg]:h-[1.375rem] [&_svg]:shrink-0",
  "transition-all cursor-pointer",
  "disabled:pointer-events-none disabled:opacity-50",
  "outline-none focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:ring-[3px]",
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
);

export type ButtonAtomProps = Omit<
  React.ComponentProps<"button">,
  "color" | "children"
> & {
  /** Visible label text (Design Studio “Display name”). */
  displayName?: string;
  /** Placeholder text used when no label/children exists. */
  placeHolderText?: string;

  /** Optional navigation URL. When set, renders as a link-style button. */
  href?: string;
  /** Link target when `href` is set. */
  target?: React.HTMLAttributeAnchorTarget;
  /** Rel attribute when `href` is set (auto-adds noopener/noreferrer for _blank). */
  rel?: string;
  /** Accessible name override if the visible label is not descriptive. */
  ariaLabel?: string;

  /** Optional children text/icon; when empty, `displayName`/placeholder is used. */
  children?: React.ReactNode;
};

function isEmptyChildren(node: React.ReactNode): boolean {
  if (node == null || node === false || node === true) return true;
  if (typeof node === "string") return node.trim().length === 0;
  if (typeof node === "number") return false;
  if (Array.isArray(node))
    return node.length === 0 || node.every(isEmptyChildren);
  return false;
}

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

function ButtonAtomComponent({
  className,
  displayName,
  placeHolderText,
  href,
  target,
  rel,
  ariaLabel,
  children,
  disabled,
  onClick,
  ...rest
}: ButtonAtomProps) {
  let resolvedChildren: React.ReactNode = children;
  if (isEmptyChildren(children)) {
    if (displayName != null && displayName.trim() !== "") {
      resolvedChildren = displayName;
    } else if (placeHolderText != null && placeHolderText.trim() !== "") {
      resolvedChildren = (
        <span className="text-muted-foreground" data-button-placeholder>
          {placeHolderText}
        </span>
      );
    }
  }

  const resolvedAriaLabel =
    ariaLabel ??
    (typeof resolvedChildren === "string" && resolvedChildren.trim()
      ? resolvedChildren
      : undefined);

  if (href && href.trim()) {
    const external = isExternalHref(href);
    const finalTarget = target ?? (external ? "_blank" : undefined);
    const shouldNoopener = finalTarget === "_blank";
    const finalRel =
      rel ?? (shouldNoopener ? "noopener noreferrer" : undefined);

    const linkClassName = cn(buttonClassName, className);

    if (external) {
      return (
        <a
          href={href}
          target={finalTarget}
          rel={finalRel}
          aria-label={resolvedAriaLabel}
          data-slot="button-atom"
          className={linkClassName}
        >
          {resolvedChildren}
        </a>
      );
    }

    return (
      <Link
        href={href}
        target={finalTarget}
        rel={finalRel}
        aria-label={resolvedAriaLabel}
        data-slot="button-atom"
        className={linkClassName}
      >
        {resolvedChildren}
      </Link>
    );
  }

  return (
    <button
      data-slot="button-atom"
      className={cn(buttonClassName, className)}
      aria-label={resolvedAriaLabel}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {resolvedChildren}
    </button>
  );
}

export { ButtonAtomComponent as Button };
