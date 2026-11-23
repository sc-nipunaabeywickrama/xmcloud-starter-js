import { linkFieldSchema } from "@sitecore-content-sdk/nextjs/atoms";
import { z } from "zod";

export const buttonCatalogDefinition = {
  props: z.object({
    link: linkFieldSchema().describe(
      "Sitecore General Link field for the button label and optional destination.",
    ),
    className: z.string().optional().describe("Optional extra classes."),
  }),
  description:
    "Category: Media. Generic button atom for actions or navigation. Ships a default button look (cursor, filled background, size, radius) that consumers override with className; no visual variant props.",
  example: {
    link: { value: { href: "/", text: "Get started" } },
  },
  slots: [],
};

export type ButtonProps = z.infer<typeof buttonCatalogDefinition.props>;
