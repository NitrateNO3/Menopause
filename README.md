# Menopause India website

React + Vite site with five pages: Home, About, Learn (with article pages), Podcast and Contact.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/ (also writes sitemap.xml and robots.txt)
npm run preview  # serve the built site locally
```

## Before going live

Copy `.env.example` to `.env` and fill in:

| Variable | What it does |
|---|---|
| `VITE_SITE_URL` | The live domain. Used for canonical links, the sitemap and social previews. |
| `VITE_GA_ID` | Google Analytics 4 measurement ID (`G-XXXX`). Page views, podcast plays, shares and form sign-ups are tracked. |
| `VITE_GSC_VERIFICATION` | Google Search Console HTML-tag code. After verifying, submit `/sitemap.xml` in Search Console. |
| `VITE_FORMS_ENDPOINT` | Where phone, newsletter and contact submissions go. `docs/google-sheets-leads.gs` sets up a free Google Sheet in about 5 minutes. |

Rebuild after changing `.env`.

## Editing content

- **Podcast episodes:** the home page pulls the newest episodes from YouTube automatically (`api/episodes.js`, refreshed about once an hour on Vercel). Set `YOUTUBE_PLAYLIST_ID` in the Vercel project settings to show only the "Menopause India Podcast" playlist instead of the whole channel. `src/site.config.js` → `episodes` is the fallback if the feed can't be reached.
- **Articles:** `src/content/articles.js`. Copy an existing article object and edit it. The sitemap updates on the next build.
- **Social links, tagline:** `src/site.config.js`.
- **Colours and fonts:** `src/styles/global.css`, top of the file.

## Hosting

Works on Vercel (`vercel.json`) or Netlify (`public/_redirects`) as-is. Both are set up so links like `/learn/...` load correctly on refresh.
