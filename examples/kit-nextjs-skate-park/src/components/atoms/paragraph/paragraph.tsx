import { cn } from "@/lib/atoms-utils";

import type { ParagraphProps } from "./paragraph.schema";

function Paragraph({ className, richText }: ParagraphProps) {
  const html = richText?.value?.trim() ?? "";

  if (html === "") {
    return null;
  }

  return (
    <div
      data-slot="paragraph"
      className={cn(className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export { Paragraph };
