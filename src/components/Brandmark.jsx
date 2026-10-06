// The Menopause India mark, redrawn as SVG from the brand file so it stays crisp at any size.
export default function Brandmark({ className = '', title, animated = false }) {
  return (
    <svg
      className={`brandmark ${animated ? 'brandmark--animated' : ''} ${className}`}
      viewBox="0 0 1720 1628"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <g className="brandmark__left" fill="var(--blush)">
        <ellipse cx="120" cy="154" rx="120" ry="145" />
        <ellipse cx="322" cy="236" rx="203" ry="235" />
        <path d="M138 503H525L948 868L773 1077L525 875V1628H138Z" />
      </g>
      <g className="brandmark__right" fill="var(--rose)">
        <ellipse cx="1517" cy="236" rx="203" ry="235" />
        <path d="M1306 503H1692V1628H1306V908L980 1251L796 1100Z" />
      </g>
    </svg>
  )
}
