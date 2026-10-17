// Everything the client is likely to change lives here.
export const site = {
  name: 'Menopause India',
  
  description:
    'Honest conversations, a podcast and easy-to-read articles about perimenopause and menopause for Indian women 35+.',
  url: (import.meta.env.VITE_SITE_URL || 'https://www.menopauseindia.com').replace(/\/$/, ''),
  social: {
    instagram: 'https://www.instagram.com/menopauseindia',
    instagramHandle: '@menopauseindia',
    youtube: 'https://www.youtube.com/channel/UCsf60WSQKe0i2wmo5MxC4Lg',
  },
}

// The home page pulls new episodes from YouTube automatically (see api/episodes.js).
// This list is the fallback shown if that feed can't be reached.
// Podcast episodes, newest first. To add one, paste the YouTube video ID
// (the part after "watch?v=" or "youtu.be/") and a title.
export const episodes = [
  {
    youtubeId: '0l94cxdrNzM',
    title: 'Menopause Exercise: Do You Need Strength Training After 40?',
    summary:
      'Why muscle matters more than ever in your 40s and beyond, and how to start strength training without feeling overwhelmed.',
    topics: ['Fitness', 'Strength training'],
  },
]

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { label: 'Learn', to: '/learn' },
  { to: '/blogs', label: 'Blogs' },
  { to: '/contact', label: 'Contact' },
]
