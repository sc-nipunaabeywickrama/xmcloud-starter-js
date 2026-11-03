import Link from "next/link";

import { cn } from "@/lib/atoms-utils";

import type { ButtonProps } from "./button.schema";

const buttonClassName = cn(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0",
  "h-10 min-w-10 px-4 rounded-full text-sm font-semibold",
  "bg-zinc-900 text-white hover:bg-zinc-800 active:bg-zinc-950",
  "[&_svg]:pointer-events-none [&_svg]:w-[1.375rem] [&_svg]:h-[1.375rem] [&_svg]:shrink-0",
  "transition-all cursor-pointer",
  "disabled:pointer-events-none disabled:opacity-50",
  "outline-none focus-visible:ring-zinc-400/50 focus-visible:ring-[3px]",
  "aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500",
);

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

function Button({ className, link }: ButtonProps) {
  const linkValue = link?.value;
  const href = linkValue?.href?.trim() ?? "";
  const querystring = linkValue?.querystring ? `?${linkValue.querystring}` : "";
  const anchor =
    linkValue?.linktype !== "anchor" && linkValue?.anchor
      ? `#${linkValue.anchor}`
      : "";
  const destination = href ? `${href}${querystring}${anchor}` : "";
  const linkText = linkValue?.text?.trim() ?? "";

  if (!destination && !linkText) {
    return null;
  }

  const classes = cn(
    buttonClassName,
    linkValue?.class,
    linkValue?.className,
    className,
  );

  if (destination) {
    const external = isExternalHref(href);
    const target = linkValue?.target ?? (external ? "_blank" : undefined);
    const rel = target === "_blank" ? "noopener noreferrer" : undefined;

    if (external) {
      return (
        <a
          data-slot="button-atom"
          className={classes}
          href={destination}
          target={target}
          rel={rel}
          title={linkValue?.title}
        >
          {linkText}
        </a>
      );
    }

    return (
      <Link
        data-slot="button-atom"
        className={classes}
        href={destination}
        target={target}
        rel={rel}
        title={linkValue?.title}
      >
        {linkText}
      </Link>
    );
  }

  return (
    <button
      data-slot="button-atom"
      className={classes}
      type="button"
    >
      {linkText}
    </button>
  );
}

export { Button };
