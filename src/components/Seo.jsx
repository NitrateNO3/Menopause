import { site } from '../site.config'

// React 19 hoists <title>, <meta> and <link> into <head> automatically.
export default function Seo({ title, description = site.description, path = '/', image = '/brand/og-image.png', type = 'website', jsonLd }) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name}: Menopause support for Indian women 35+`
  const url = `${site.url}${path}`
  const imageUrl = image.startsWith('http') ? image : `${site.url}${image}`
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </>
  )
}
