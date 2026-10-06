// Ways into the Learn page besides the plain list. Each entry points at article slugs.

// "Lately, I've been…" — finish the sentence, get the right reads.
export const feelings = [
  {
    id: 'hot',
    phrase: 'hot and flushed out of nowhere',
    reply: 'Sudden waves of heat are one of the most common signs of the menopause transition. There are practical ways to cope, and treatments worth asking about.',
    slugs: ['hot-flushes-practical-tips', 'signs-of-perimenopause'],
  },
  {
    id: 'sleep',
    phrase: 'tired, but can’t sleep',
    reply: 'Night sweats and shifting hormones can both get in the way of sleep. Small changes to your evenings can help.',
    slugs: ['sleep-mood-and-menopause'],
  },
  {
    id: 'mood',
    phrase: 'not quite myself',
    reply: 'Irritability, anxiety or low mood can be part of this stage. You’re not imagining it, and you don’t have to just put up with it.',
    slugs: ['sleep-mood-and-menopause', 'signs-of-perimenopause'],
  },
  {
    id: 'fog',
    phrase: 'forgetful and foggy',
    reply: 'Losing words or your train of thought is something many women notice in perimenopause. It helps to see the bigger picture.',
    slugs: ['signs-of-perimenopause'],
  },
  {
    id: 'achy',
    phrase: 'achy and a bit weaker',
    reply: 'Muscle and bone both change as oestrogen falls. Strength work at almost any age can help, and you can start at home.',
    slugs: ['strength-training-after-40'],
  },
  {
    id: 'confused',
    phrase: 'confused about what’s happening',
    reply: 'Start with the basics. Knowing the difference between perimenopause and menopause makes everything else easier to understand.',
    slugs: ['perimenopause-menopause-postmenopause', 'signs-of-perimenopause'],
  },
  {
    id: 'family',
    phrase: 'unsure how to tell my family',
    reply: 'A few simple words can help the people around you understand, and support you better.',
    slugs: ['talking-to-family-about-menopause'],
  },
  {
    id: 'doctor',
    phrase: 'meaning to see a doctor',
    reply: 'Good idea. A little preparation helps you explain what you’re feeling and leave with answers.',
    slugs: ['preparing-for-your-doctor-visit'],
  },
]

// The journey map. `size` sets how wide each stage is drawn on desktop.
export const stages = [
  {
    id: 'before',
    name: 'Before',
    when: 'Late 30s, early 40s',
    text: 'A good time to know the signs before they arrive.',
    size: 1.1,
    slugs: ['signs-of-perimenopause'],
  },
  {
    id: 'peri',
    name: 'Perimenopause',
    when: 'Usually your 40s',
    text: 'Hormones rise and fall unevenly. Most changes show up here.',
    size: 1.6,
    slugs: ['perimenopause-menopause-postmenopause', 'hot-flushes-practical-tips', 'sleep-mood-and-menopause'],
  },
  {
    id: 'meno',
    name: 'Menopause',
    when: 'Just one day',
    text: '12 months after your last period.',
    size: 0.7,
    point: true,
    slugs: [],
  },
  {
    id: 'post',
    name: 'Postmenopause',
    when: 'Every year after',
    text: 'Some symptoms ease. Bones and heart need care.',
    size: 1.3,
    slugs: ['strength-training-after-40'],
  },
]

export const throughout = {
  name: 'All the way through',
  slugs: ['talking-to-family-about-menopause', 'preparing-for-your-doctor-visit'],
}
