import type { HeadingProps } from "./heading.schema";

function Heading({ className, text, variant }: HeadingProps) {
  const value = text?.value;

  if (typeof value !== "string" || value === "") {
    return null;
  }

  const Tag = variant;

  return (
    <Tag data-slot="heading" className={className}>
      {value}
    </Tag>
  );
}

export { Heading };
