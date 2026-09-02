"use client";

import { defineAtomsRegistry } from "@sitecore-content-sdk/nextjs/atoms";

import { Heading } from "@/components/atoms/heading/heading";

import { catalog } from "./catalog";

export const registry = defineAtomsRegistry(catalog, {
  components: {
    Heading: ({ props, children }) => <Heading {...props}>{children}</Heading>,
  },
  actions: {},
});
