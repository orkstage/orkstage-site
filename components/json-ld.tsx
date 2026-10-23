/** Structured data for search engines. `<` is escaped so the JSON cannot close the script tag. */
export function JsonLd({ data }: { data: object }) {
  // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON with < escaped, so it cannot close the script tag.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
