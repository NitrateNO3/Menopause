// Articles are plain data so the sitemap script can read them too.
// `short` is a compact title used on the journey map.
// Block types: p, h2, ul, callout. To add an article, copy one object and edit it.

export const categories = ['The Basics', 'Symptoms', 'Body & Movement', 'Mind & Sleep', 'Family & Work', 'Your Doctor']

export const categoryInfo = {
  'The Basics': 'What perimenopause and menopause actually mean.',
  Symptoms: 'Hot flushes, brain fog and the signs that get missed.',
  'Body & Movement': 'Strength, bones and staying active.',
  'Mind & Sleep': 'Mood, anxiety and getting better rest.',
  'Family & Work': 'Talking about it at home and at work.',
  'Your Doctor': 'Making the most of your appointments.',
}

export const articles = [
  {
    slug: 'perimenopause-menopause-postmenopause',
    short: 'The three stages, explained',
    title: 'Perimenopause, menopause, postmenopause: what’s the difference?',
    excerpt:
      'Three words that get used interchangeably, but mean different things. Knowing which stage you are in makes everything else easier to understand.',
    category: 'The Basics',
    featured: true,
    body: [
      { type: 'p', text: 'Many of us grew up hearing “menopause” used for everything from the first irregular period to the years after periods stop. In reality it describes a single point in time, with a stage before it and a stage after it.' },
      { type: 'h2', text: 'Perimenopause: the transition' },
      { type: 'p', text: 'Perimenopause is the lead-up to menopause, when hormone levels, especially oestrogen, rise and fall unevenly. It often begins in the 40s, though for some women it starts in the late 30s. It can last a few years, and the length varies a lot from person to person.' },
      { type: 'p', text: 'This is usually when changes first show up: periods that come closer together or further apart, heavier or lighter bleeding, hot flushes, trouble sleeping, or mood changes that feel out of character.' },
      { type: 'h2', text: 'Menopause: one specific day' },
      { type: 'p', text: 'Menopause is reached when you have gone 12 months in a row without a period, and there is no other reason (such as pregnancy, certain medicines or a medical condition) for periods stopping. You only know it has happened looking back.' },
      { type: 'p', text: 'Studies from India generally place the average age of natural menopause in the mid-to-late 40s, a little earlier than is often quoted for Western countries. Menopause can also happen earlier because of surgery or medical treatment.' },
      { type: 'h2', text: 'Postmenopause: the years after' },
      { type: 'p', text: 'Every year after that point is postmenopause. Some symptoms ease with time, while lower oestrogen can bring longer-term changes to bone strength, heart health and vaginal and urinary health. That is why regular check-ups remain important.' },
      { type: 'callout', text: 'Please see a doctor if your periods stop before 40, if you have bleeding after menopause, bleeding between periods, or very heavy bleeding. These need to be checked, not waited out.' },
    ],
  },
  {
    slug: 'signs-of-perimenopause',
    short: 'Signs that get missed',
    title: 'Is it perimenopause? Common signs that often get missed',
    excerpt:
      'It isn’t only hot flushes. Sleep, mood, memory, joints and more can all be affected, and these are easy to blame on “just stress”.',
    category: 'Symptoms',
    featured: true,
    body: [
      { type: 'p', text: 'Perimenopause rarely announces itself. Changes tend to arrive slowly and one at a time, so it is easy to explain each one away. Seeing them together can help you make sense of what is happening.' },
      { type: 'h2', text: 'Changes many women notice' },
      {
        type: 'ul',
        items: [
          'Periods that change in timing, flow or length',
          'Hot flushes and night sweats',
          'Difficulty falling or staying asleep',
          'Irritability, anxiety or low mood',
          'Brain fog: forgetting words, losing your train of thought',
          'Aching joints and muscles',
          'Vaginal dryness or discomfort during sex',
          'Needing to pass urine more often, or more urinary infections',
          'Lower interest in sex',
          'Changes in skin, hair and where weight settles',
        ],
      },
      { type: 'p', text: 'Not everyone has all of these, and some women have very few symptoms at all. Every experience is valid.' },
      { type: 'h2', text: 'Why it is worth getting checked' },
      { type: 'p', text: 'Several of these signs overlap with other common conditions, such as thyroid problems, anaemia, and vitamin D or B12 deficiency. A doctor can help rule these out, so you are not putting up with something that has a simple fix.' },
      { type: 'p', text: 'Keeping a simple diary of your periods, sleep and mood for a couple of months can make that conversation much easier.' },
      { type: 'callout', text: 'Heart palpitations, chest discomfort or unusual bleeding should always be checked by a doctor rather than assumed to be perimenopause.' },
    ],
  },
  {
    slug: 'strength-training-after-40',
    short: 'Strength training after 40',
    title: 'Strength training after 40: why it matters and how to start',
    excerpt:
      'Muscle and bone both change as oestrogen falls. The good news: strength work at almost any age can help, and you can start at home.',
    category: 'Body & Movement',
    featured: true,
    body: [
      { type: 'p', text: 'Walking is wonderful, and many of us do plenty of it. But as oestrogen levels fall around menopause, muscle and bone density tend to decline faster. Strength training is one of the most practical ways to push back.' },
      { type: 'h2', text: 'What strength training can help with' },
      {
        type: 'ul',
        items: [
          'Maintaining muscle, which supports everyday strength and balance',
          'Supporting bone health',
          'Making daily tasks like climbing stairs and lifting bags easier',
          'Better mood and sleep for many people',
        ],
      },
      { type: 'h2', text: 'How much is enough?' },
      { type: 'p', text: 'The World Health Organization recommends that adults do muscle-strengthening activity on at least two days a week, alongside regular moderate activity such as brisk walking.' },
      { type: 'h2', text: 'An easy way to begin' },
      {
        type: 'ul',
        items: [
          'Sit-to-stand: stand up from a chair and sit back down, slowly, 8–10 times',
          'Wall push-ups: hands on the wall, bend and straighten your arms',
          'Step-ups on the bottom stair, holding the railing',
          'Resistance bands for arms and back',
          'Use water bottles or a bag of rice as light weights',
        ],
      },
      { type: 'p', text: 'Start with what feels manageable, focus on good form, and add a few more repetitions or a little more weight over time. Consistency matters far more than intensity.' },
      { type: 'callout', text: 'If you have a heart condition, high blood pressure, joint problems or osteoporosis, check with your doctor or a qualified trainer before starting a new routine.' },
    ],
  },
  {
    slug: 'hot-flushes-practical-tips',
    short: 'Coping with hot flushes',
    title: 'Hot flushes: practical ways to cope day to day',
    excerpt:
      'A sudden wave of heat in a meeting or a crowded kitchen is no joke. Small changes can help, and there are medical options worth discussing too.',
    category: 'Symptoms',
    body: [
      { type: 'p', text: 'A hot flush is a sudden feeling of heat, usually in the face, neck and chest, sometimes with sweating, redness or a racing heart. At night they are called night sweats. They can last a few minutes and come several times a day.' },
      { type: 'h2', text: 'Notice your triggers' },
      { type: 'p', text: 'Common triggers include spicy food, hot drinks, caffeine, alcohol, stress and warm rooms. Triggers differ between people, so jotting down when flushes happen can help you spot your own.' },
      { type: 'h2', text: 'Small things that help' },
      {
        type: 'ul',
        items: [
          'Dress in layers of breathable cotton you can remove easily',
          'Keep a small fan or a bottle of cool water nearby',
          'Keep the bedroom cool and use light bedding',
          'Try slow, deep breathing when a flush begins',
          'Stay active and keep a regular sleep routine',
        ],
      },
      { type: 'h2', text: 'Treatments exist' },
      { type: 'p', text: 'If hot flushes are affecting your sleep, work or wellbeing, speak to a gynaecologist. Options include menopausal hormone therapy (MHT, also called HRT) and some non-hormonal medicines. What suits you depends on your health history, which is why it is a conversation to have with a doctor.' },
      { type: 'callout', text: 'Please be cautious with supplements and “natural cures” promoted online. Ask your doctor before starting anything new, especially alongside other medicines.' },
    ],
  },
  {
    slug: 'sleep-mood-and-menopause',
    short: 'Sleep and mood',
    title: 'Sleep, mood and menopause: you are not imagining it',
    excerpt:
      'Feeling short-tempered, anxious or tearful, and lying awake at 3 a.m.? Hormonal changes can play a part. Here’s what can help.',
    category: 'Mind & Sleep',
    body: [
      { type: 'p', text: 'Many women describe feeling “not like myself” during perimenopause: more irritable, more anxious, or low without a clear reason. Shifting hormone levels can affect mood, and poor sleep makes everything harder.' },
      { type: 'h2', text: 'Looking after your sleep' },
      {
        type: 'ul',
        items: [
          'Go to bed and wake up at similar times each day',
          'Keep the room cool, dark and quiet',
          'Cut back on tea and coffee after mid-afternoon',
          'Put screens away for a while before bed',
          'If you wake and can’t sleep, get up briefly and do something calm',
        ],
      },
      { type: 'h2', text: 'Looking after your mood' },
      { type: 'p', text: 'Talking about it helps, whether with a friend, your partner, or women going through the same thing. Regular movement, time outdoors and making space for things you enjoy can also make a difference.' },
      { type: 'p', text: 'If low mood, anxiety or irritability last for more than a couple of weeks, or affect your relationships or work, please talk to a doctor. These feelings are common, and help is available.' },
      { type: 'callout', text: 'If you are struggling, Tele-MANAS, the Government of India’s free mental health helpline, is available on 14416 or 1-800-891-4416. In an emergency, call 112.' },
    ],
  },
  {
    slug: 'talking-to-family-about-menopause',
    short: 'Talking to your family',
    title: 'How to talk to your family about menopause',
    excerpt:
      'In many homes menopause is never spoken about. A few simple words can help your partner, children and colleagues understand and support you.',
    category: 'Family & Work',
    body: [
      { type: 'p', text: 'Many of us watched our mothers go through menopause quietly. But when the people around you don’t know what is happening, mood changes or tiredness can be misunderstood, by them and by you.' },
      { type: 'h2', text: 'Start simple' },
      { type: 'p', text: 'You don’t need a big conversation. Something like: “My body is going through some hormonal changes called perimenopause. Some days I may sleep badly or feel more irritable. It’s not about you, and it helps when you’re patient with me.”' },
      { type: 'h2', text: 'Ask for specific help' },
      {
        type: 'ul',
        items: [
          'Sharing more of the household work on difficult days',
          'Keeping the bedroom cooler at night',
          'Giving you some quiet time without needing a reason',
          'Coming with you to a doctor’s appointment',
        ],
      },
      { type: 'h2', text: 'At work' },
      { type: 'p', text: 'If you feel comfortable, small adjustments can make a real difference: sitting near a window or fan, flexibility on difficult days, or a little extra time on tasks when brain fog hits. You don’t have to share more than you want to.' },
      { type: 'p', text: 'Sharing this site or an episode of our podcast can also be an easy way to start the conversation.' },
    ],
  },
  {
    slug: 'preparing-for-your-doctor-visit',
    short: 'Your doctor’s visit',
    title: 'Preparing for a doctor’s visit about menopause',
    excerpt:
      'Appointments can feel rushed. A little preparation helps you explain what you’re feeling and leave with answers.',
    category: 'Your Doctor',
    body: [
      { type: 'p', text: 'It is common to forget half of what you wanted to say once you are in the doctor’s room. Going in prepared helps you make the most of the time.' },
      { type: 'h2', text: 'Before the appointment, note down' },
      {
        type: 'ul',
        items: [
          'Dates of your last few periods and any changes in flow',
          'Your main symptoms, how often they happen and how they affect you',
          'Any medicines or supplements you take',
          'Your family history, e.g. heart disease, breast cancer, osteoporosis',
          'The questions you most want answered',
        ],
      },
      { type: 'h2', text: 'Questions you might ask' },
      {
        type: 'ul',
        items: [
          'Could these symptoms be perimenopause, or something else?',
          'Are there any tests you would suggest for me?',
          'What treatment options might suit me, hormonal or non-hormonal?',
          'What screenings should I be having at my age?',
          'What can I do myself to look after my bones and heart?',
        ],
      },
      { type: 'p', text: 'Depending on your symptoms and history, your doctor may suggest tests such as thyroid function, haemoglobin, blood sugar, cholesterol or vitamin levels, or screening for bone, breast and cervical health. They will decide what is right for you.' },
      { type: 'callout', text: 'If you feel unheard, it is okay to ask for more time, to bring someone with you, or to seek a second opinion.' },
    ],
  },
]

export function readingTime(article) {
  const words = article.body
    .map((b) => (b.items ? b.items.join(' ') : b.text))
    .join(' ')
    .split(/\s+/).length
  return Math.max(2, Math.round(words / 200))
}

export const getArticle = (slug) => articles.find((a) => a.slug === slug)
