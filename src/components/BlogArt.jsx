// Topic illustrations for blog cards, drawn in the brandmark's style (round heads, soft bodies).

// The figure from the logo: head with a bun, rounded body.
function Figure({ x, y, scale = 1, body = 'var(--rose)', head = 'var(--blush)' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle cx="-15" cy="-58" r="9" fill={head} />
      <circle cx="0" cy="-42" r="20" fill={head} />
      <rect x="-23" y="-16" width="46" height="96" rx="22" fill={body} />
    </g>
  )
}

function Signs() {
  const marked = { 1: 'var(--rose)', 4: 'var(--blush)', 6: 'var(--rose)', 11: 'var(--blush)', 13: 'var(--rose-deep)' }
  return (
    <>
      <circle cx="330" cy="40" r="70" fill="var(--blush)" opacity="0.3" />
      <Figure x={95} y={120} />
      <rect x="165" y="38" width="160" height="130" rx="16" fill="#fff" />
      <rect x="165" y="38" width="160" height="30" rx="16" fill="var(--rose)" />
      <rect x="165" y="54" width="160" height="14" fill="var(--rose)" />
      <rect x="196" y="28" width="8" height="22" rx="4" fill="var(--ink)" />
      <rect x="286" y="28" width="8" height="22" rx="4" fill="var(--ink)" />
      {Array.from({ length: 15 }, (_, i) => (
        <circle
          key={i}
          cx={190 + (i % 5) * 28}
          cy={90 + Math.floor(i / 5) * 26}
          r="8"
          fill={marked[i] || 'var(--petal)'}
        />
      ))}
      <path d="M352 132c6 8 4 18-4 22a12 12 0 0 1-14-18c2 6 6 7 9 6-2-5 2-9 9-10Z" fill="var(--rose)" />
      <path d="M362 70a14 14 0 1 1-14-18 11 11 0 0 0 14 18Z" fill="var(--rose-deep)" />
      <circle cx="140" cy="40" r="5" fill="var(--rose)" />
      <circle cx="150" cy="184" r="4" fill="var(--rose-deep)" opacity="0.5" />
    </>
  )
}

function Stages() {
  const stops = [
    { x: 72, y: 164, r: 17, fill: 'var(--blush)', n: '1' },
    { x: 212, y: 104, r: 21, fill: 'var(--rose)', n: '2' },
    { x: 340, y: 52, r: 17, fill: 'var(--rose-deep)', n: '3' },
  ]
  return (
    <>
      <ellipse cx="90" cy="210" rx="140" ry="70" fill="var(--blush)" opacity="0.35" />
      <ellipse cx="330" cy="200" rx="150" ry="90" fill="var(--rose)" opacity="0.15" />
      <path d="M10 172C110 172 150 104 212 104S300 52 392 46" fill="none" stroke="#fff" strokeWidth="16" strokeLinecap="round" />
      <path d="M10 172C110 172 150 104 212 104S300 52 392 46" fill="none" stroke="var(--rose)" strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" />
      <rect x="210" y="34" width="4" height="50" rx="2" fill="var(--ink)" />
      <path d="M214 36h34l-9 11 9 11h-34Z" fill="var(--rose-deep)" />
      {stops.map((s) => (
        <g key={s.n}>
          <circle cx={s.x} cy={s.y} r={s.r + 5} fill="#fff" />
          <circle cx={s.x} cy={s.y} r={s.r} fill={s.fill} />
          <text x={s.x} y={s.y + 6} textAnchor="middle" fontSize="17" fontWeight="700" fill="#fff" fontFamily="inherit">
            {s.n}
          </text>
        </g>
      ))}
      <circle cx="110" cy="50" r="6" fill="var(--rose)" opacity="0.6" />
      <circle cx="300" cy="150" r="5" fill="var(--rose-deep)" opacity="0.4" />
    </>
  )
}

function BrainFog() {
  return (
    <>
      <circle cx="120" cy="190" r="90" fill="var(--blush)" opacity="0.3" />
      <Figure x={120} y={150} scale={1.25} />
      <g fill="#fff">
        <circle cx="200" cy="70" r="26" />
        <circle cx="232" cy="54" r="32" />
        <circle cx="270" cy="66" r="26" />
        <circle cx="250" cy="86" r="22" />
        <circle cx="214" cy="90" r="20" />
      </g>
      <circle cx="160" cy="88" r="5" fill="#fff" />
      <circle cx="174" cy="80" r="7" fill="#fff" />
      <text x="216" y="80" fontSize="30" fontWeight="700" fill="var(--rose)" fontFamily="inherit">?</text>
      <text x="246" y="74" fontSize="22" fontWeight="700" fill="var(--blush)" fontFamily="inherit">?</text>
      <g transform="rotate(-8 330 130)">
        <rect x="300" y="104" width="62" height="58" rx="8" fill="var(--rose)" opacity="0.9" />
        <rect x="312" y="120" width="36" height="5" rx="2.5" fill="#fff" />
        <rect x="312" y="132" width="26" height="5" rx="2.5" fill="#fff" />
      </g>
      <g transform="rotate(10 330 40)">
        <rect x="312" y="18" width="46" height="42" rx="7" fill="#fff" />
        <rect x="321" y="30" width="26" height="4" rx="2" fill="var(--blush)" />
        <rect x="321" y="40" width="18" height="4" rx="2" fill="var(--blush)" />
      </g>
    </>
  )
}

function Sleep() {
  return (
    <>
      <rect x="226" y="22" width="140" height="106" rx="14" fill="var(--ink)" />
      <rect x="292" y="22" width="6" height="106" fill="#fff" opacity="0.18" />
      <circle cx="262" cy="64" r="20" fill="#fff" />
      <circle cx="272" cy="57" r="18" fill="var(--ink)" />
      <circle cx="326" cy="48" r="3" fill="#fff" />
      <circle cx="344" cy="82" r="2.5" fill="#fff" />
      <circle cx="318" cy="104" r="2" fill="#fff" />
      <circle cx="248" cy="108" r="2.5" fill="#fff" />
      <rect x="28" y="96" width="16" height="84" rx="7" fill="var(--rose-deep)" />
      <rect x="36" y="136" width="210" height="40" rx="12" fill="#fff" />
      <ellipse cx="78" cy="132" rx="26" ry="12" fill="var(--petal)" />
      <circle cx="80" cy="118" r="16" fill="var(--blush)" />
      <circle cx="68" cy="106" r="7" fill="var(--blush)" />
      <path d="M96 124h134a14 14 0 0 1 14 14v8H96Z" fill="var(--rose)" />
      <text x="110" y="92" fontSize="20" fontWeight="700" fill="var(--rose-deep)" fontFamily="inherit">z</text>
      <text x="126" y="72" fontSize="15" fontWeight="700" fill="var(--rose)" fontFamily="inherit">z</text>
      <circle cx="326" cy="164" r="24" fill="#fff" />
      <circle cx="326" cy="164" r="24" fill="none" stroke="var(--rose)" strokeWidth="3" />
      <path d="M326 164v-15M326 164h11" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="326" cy="164" r="2.5" fill="var(--ink)" />
    </>
  )
}

const art = {
  'signs-of-perimenopause-after-40': Signs,
  'perimenopause-vs-menopause': Stages,
  'menopause-brain-fog-after-40': BrainFog,
  'menopause-sleep-problems-after-40': Sleep,
}

export default function BlogArt({ slug, className }) {
  const Art = art[slug] || Stages
  return (
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <Art />
    </svg>
  )
}
