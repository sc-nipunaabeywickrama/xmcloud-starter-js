import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Sitecore Single-Line Text / numeric field shape (`textFieldSchema`). */
export type AtomTextField = { value?: string | number };

/** Sitecore Rich Text field shape (`richTextFieldSchema`). */
export type AtomRichTextField = { value?: string };

/** Sitecore General Link field shape (`linkFieldSchema`). */
export type AtomLinkField = {
  value: {
    href?: string;
    className?: string;
    class?: string;
    title?: string;
    target?: string;
    text?: string;
    anchor?: string;
    querystring?: string;
    linktype?: string;
  };
};

/** Sitecore Image field shape (`imageFieldSchema`). */
export type AtomImageField = {
  value?: {
    src?: string;
    alt?: string;
    width?: string | number;
    height?: string | number;
    class?: string;
  };
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function getTextFieldValue(
  field: AtomTextField | string | number | undefined | null,
): string {
  if (field == null) return "";
  if (typeof field === "string" || typeof field === "number") {
    return String(field);
  }
  if (field.value == null) return "";
  return String(field.value);
}

export function getRichTextFieldValue(
  field: AtomRichTextField | string | undefined | null,
): string {
  if (field == null) return "";
  if (typeof field === "string") return field;
  return field.value ?? "";
}

export function getLinkFieldValue(
  field: AtomLinkField | undefined | null,
): AtomLinkField["value"] | undefined {
  if (!isRecord(field) || !isRecord(field.value)) return undefined;
  return field.value as AtomLinkField["value"];
}

export function getImageFieldValue(
  field: AtomImageField | undefined | null,
): NonNullable<AtomImageField["value"]> | undefined {
  if (!isRecord(field) || !isRecord(field.value)) return undefined;
  return field.value as NonNullable<AtomImageField["value"]>;
}
