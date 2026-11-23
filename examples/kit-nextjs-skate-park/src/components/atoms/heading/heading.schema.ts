import { textFieldSchema } from "@sitecore-content-sdk/nextjs/atoms";
import { z } from "zod";

export const headingCatalogDefinition = {
  props: z.object({
    text: textFieldSchema().describe(
      "Sitecore Single-Line Text field for the heading text.",
    ),
    variant: z
      .enum(["h1", "h2", "h3", "h4", "h5", "h6"])
      .describe("Heading level from h1 to h6."),
    className: z.string().optional().describe("Optional extra classes."),
  }),
  description:
    "Displays a heading from a text field. The variant sets the heading level (h1–h6).",
  example: {
    text: { value: "Build faster with Content Kit" },
    variant: "h2",
  },
  slots: [],
};

export type HeadingProps = z.infer<typeof headingCatalogDefinition.props>;
