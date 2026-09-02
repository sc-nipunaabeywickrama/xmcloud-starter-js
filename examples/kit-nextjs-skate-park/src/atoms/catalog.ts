import { defineAtomsCatalog } from "@sitecore-content-sdk/nextjs/atoms";

import { headingCatalogDefinition } from "@/components/atoms/heading/heading.schema";

export const catalog = defineAtomsCatalog({
  version: "1.0.0",
  components: {
    Heading: headingCatalogDefinition,
  },
  actions: {},
});
