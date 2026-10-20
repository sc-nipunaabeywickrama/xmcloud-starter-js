import { isDesignLibraryPreviewData } from "@sitecore-content-sdk/nextjs/editing";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode, headers as nextHeaders } from "next/headers";
import { SiteInfo } from "@sitecore-content-sdk/nextjs";
import sites from ".sitecore/sites.json";
import { routing } from "src/i18n/routing";
import scConfig from "sitecore.config";
import client from "src/lib/sitecore-client";
import Layout from "src/Layout";
import components from ".sitecore/component-map";
import Providers from "src/Providers";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { getBaseUrl } from "src/lib/utils";

type PageProps = {
  params: Promise<{
    site: string;
    locale: string;
    path?: string[];
    [key: string]: string | string[] | undefined;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { site, locale, path } = await params;
  const draft = await draftMode();
  const baseUrl = getBaseUrl();

  // Set site and locale to be available in src/i18n/request.ts for fetching the dictionary
  setRequestLocale(`${site}_${locale}`);

  // Fetch the page data from Sitecore
  let page;
  if (draft.isEnabled) {
    const headers = await nextHeaders();
    const previewData = client.getPreviewData(headers);
    if (isDesignLibraryPreviewData(previewData)) {
      page = await client.getDesignLibraryData(previewData);
    } else {
      page = await client.getPreview(previewData);
    }
  } else {
    page = await client.getPage(path ?? [], { site, locale });
  }

  // If the page is not found, return a 404
  if (!page) {
    notFound();
  }

  // Fetch the component data from Sitecore (Likely will be deprecated)
  const componentProps = await client.getComponentData(
    page.layout,
    {},
    components,
  );

  return (
    <NextIntlClientProvider>
      <Providers page={page} componentProps={componentProps}>
        <Layout page={page} baseUrl={baseUrl || undefined} />
      </Providers>
    </NextIntlClientProvider>
  );
}

// This function gets called at build and export time to determine
// pages for SSG ("paths", as tokenized array).
export const generateStaticParams = async () => {
  if (process.env.NODE_ENV !== "development" && scConfig.generateStaticPaths) {
    // Filter sites to only include the sites this starter is designed to serve.
    // This prevents cross-site build errors when multiple starters share the same XM Cloud instance.
    const defaultSite = scConfig.defaultSite;
    const allowedSites = defaultSite
      ? sites
          .filter((site: SiteInfo) => site.name === defaultSite)
          .map((site: SiteInfo) => site.name)
      : sites.map((site: SiteInfo) => site.name);

    return await client.getAppRouterStaticParams(
      allowedSites,
      routing.locales.slice(),
    );
  }
  return [];
};

type AuthoredField = { value?: unknown };

function fieldText(field?: AuthoredField): string | undefined {
  const value = field?.value;
  if (typeof value !== "string" && typeof value !== "number") return undefined;
  const text = String(value).trim();
  return text || undefined;
}

function fieldImageUrl(field?: AuthoredField): string | undefined {
  const value = field?.value;
  if (!value || typeof value !== "object") return undefined;
  const src = (value as { src?: unknown }).src;
  return typeof src === "string" && src ? src : undefined;
}

/** Builds Next.js metadata from this starter's page fields. */
function metadataFromRouteFields(
  fields: Record<string, AuthoredField | undefined> | undefined
): Metadata {
  const title =
    fieldText(fields?.baseMetadataTitle) ??
    fieldText(fields?.metadataTitle) ??
    fieldText(fields?.Title) ??
    fieldText(fields?.pageTitle) ??
    fieldText(fields?.ogTitle);
  const description =
    fieldText(fields?.baseMetadataDescription) ??
    fieldText(fields?.metadataDescription) ??
    fieldText(fields?.pageSummary) ??
    fieldText(fields?.ogDescription);
  const keywords =
    fieldText(fields?.baseMetadataKeywords) ?? fieldText(fields?.metadataKeywords);
  const author =
    fieldText(fields?.baseMetadataAuthor) ?? fieldText(fields?.metadataAuthor);
  const ogTitle =
    fieldText(fields?.baseOgTitle) ?? fieldText(fields?.ogTitle) ?? title;
  const ogDescription =
    fieldText(fields?.baseOgDescription) ??
    fieldText(fields?.ogDescription) ??
    fieldText(fields?.metadataDescription) ??
    fieldText(fields?.pageSummary);
  const ogImage = fieldImageUrl(
    fields?.baseOgImage ?? fields?.ogImage ?? fields?.thumbnailImage
  );

  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    ...(keywords ? { keywords } : {}),
    ...(author ? { authors: [{ name: author }] } : {}),
    ...(ogTitle || ogDescription || ogImage
      ? {
          openGraph: {
            ...(ogTitle ? { title: ogTitle } : {}),
            ...(ogDescription ? { description: ogDescription } : {}),
            ...(ogImage ? { images: [{ url: ogImage }] } : {}),
          },
        }
      : {}),
  };
}

// Metadata fields for the page.
export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const baseUrl = getBaseUrl();

  const { path, site, locale } = await params;

  // Canonical URL: base URL + content path only (no site/locale segments)
  const pathSegment = path?.length ? `/${path.join("/")}` : "";
  const canonicalUrl = baseUrl ? `${baseUrl}${pathSegment}` : undefined;

  // The same call as for rendering the page. Should be cached by default react behavior
  const page = await client.getPage(path ?? [], { site, locale });
  const route = page?.layout.sitecore.route;

  return {
    ...metadataFromRouteFields(
      route?.fields as Record<string, AuthoredField | undefined> | undefined
    ),
    ...(canonicalUrl && {
      alternates: {
        canonical: canonicalUrl,
      },
    }),
  };
};
