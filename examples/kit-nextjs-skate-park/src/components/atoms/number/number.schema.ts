import { numberFieldSchema } from "@sitecore-content-sdk/nextjs/atoms";
import { z } from "zod";

export const numberCatalogDefinition = {
  props: z.object({
    number: numberFieldSchema().describe(
      "Sitecore Number field for the input value.",
    ),
    className: z.string().optional().describe("Optional extra classes."),
  }),
  description:
    "Typography: numeric entry. The input value comes from a Sitecore Number field.",
  example: {
    number: { value: 3 },
  },
  slots: [],
};

export type NumberProps = z.infer<typeof numberCatalogDefinition.props>;
