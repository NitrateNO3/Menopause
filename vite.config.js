import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Injects Google Analytics + Search Console tags into the static index.html
// only when their IDs are set in .env, so nothing broken ships by default.
function analyticsTags(env) {
  return {
    name: 'analytics-tags',
    transformIndexHtml() {
      const tags = []
      if (env.VITE_GSC_VERIFICATION) {
        tags.push({
          tag: 'meta',
          attrs: { name: 'google-site-verification', content: env.VITE_GSC_VERIFICATION },
          injectTo: 'head',
        })
      }
      if (env.VITE_GA_ID) {
        tags.push(
          {
            tag: 'script',
            attrs: { async: true, src: `https://www.googletagmanager.com/gtag/js?id=${env.VITE_GA_ID}` },
            injectTo: 'head',
          },
          {
            tag: 'script',
            children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${env.VITE_GA_ID}',{send_page_view:false});`,
            injectTo: 'head',
          },
        )
      }
      return tags
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), analyticsTags(env)],
  }
})
