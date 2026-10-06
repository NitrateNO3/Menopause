// Runs after `vite build`: writes dist/sitemap.xml and dist/robots.txt.
import { writeFileSync, readFileSync, existsSync } from 'node:fs'
import { articles } from '../src/content/articles.js'

function envValue(key) {
  if (process.env[key]) return process.env[key]
  for (const file of ['.env.production', '.env']) {
    if (!existsSync(file)) continue
    const line = readFileSync(file, 'utf8').split('\n').find((l) => l.startsWith(`${key}=`))
    if (line) return line.slice(key.length + 1).trim()
  }
  return ''
}

const siteUrl = (envValue('VITE_SITE_URL') || 'https://www.menopauseindia.com').replace(/\/$/, '')
const today = new Date().toISOString().slice(0, 10)
const paths = ['/', '/about', '/learn', '/podcast', '/contact', ...articles.map((a) => `/learn/${a.slug}`)]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${siteUrl}${p}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`

writeFileSync('dist/sitemap.xml', xml)
writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`)
console.log(`sitemap.xml: ${paths.length} URLs for ${siteUrl}`)
