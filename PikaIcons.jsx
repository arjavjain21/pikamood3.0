// PikaIcons.jsx — Custom SVG icon set for PikaMood
// All icons: 24x24 viewBox, rounded warm style, stroke-based

function Icon({ name, size = 24, color = 'currentColor', strokeWidth = 2 }) {
  const s = strokeWidth;
  const icons = {

    // Navigation
    home: (
      <g fill="none" stroke={color} strokeWidth={s} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10.5L12 3l9 7.5V21a1 1 0 01-1 1H5a1 1 0 01-1-1V10.5z"/>
        <path d="M9 22V12h6v10"/>
      </g>
    ),
    diary: (
      <g fill="none" stroke={color} strokeWidth={s} strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="13" height="20" rx="2"/>
        <path d="M17 2h1a2 2 0 012 2v16a2 2 0 01-2 2h-1"/>
        <line x1="8" y1="7" x2="14" y2="7"/>
        <line x1="8" y1="11" x2="14" y2="11"/>
        <line x1="8" y1="15" x2="12" y2="15"/>
      </g>
    ),
    stats: (
      <g fill="none" stroke={color} strokeWidth={s} strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
        <line x1="3" y1="20" x2="21" y2="20"/>
      </g>
    ),
    settings: (
      <g fill="none" stroke={color} strokeWidth={s} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
      </g>
    ),

    // Badges & brand
    lightning: (
      <g fill={color}>
        <path d="M13 2L4.5 13.5H11L9 22l10.5-12H13L13 2z"/>
      </g>
    ),
    flame: (
      <g fill="none" stroke={color} strokeWidth={s} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c4 0 7-3 7-7 0-2.5-1.5-4.5-3-6 .5 2-1 3.5-2 4 .5-2-1-4-3-5.5.5 2.5-1 5-2 6C7.5 15 5 17.5 5 19c0 1.7.7 2.5 1.5 3"/>
        <path d="M9 17.5c0 1.4 1.3 2.5 3 2.5s3-1.1 3-2.5c0-1-.7-2-1.5-2.5.2.8-.3 1.5-1 1.5-.8 0-1.2-.7-1-1.5C10.7 15.5 9 16.5 9 17.5z"/>
      </g>
    ),
    trophy: (
      <g fill="none" stroke={color} strokeWidth={s} strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4a2 2 0 000 4c.7 1.8 2.2 3 4 3.5"/>
        <path d="M18 9h2a2 2 0 010 4c-.7 1.8-2.2 3-4 3.5"/>
        <path d="M8 21h8M12 17v4"/>
        <path d="M8 3h8v8a4 4 0 01-8 0V3z"/>
      </g>
    ),
    star: (
      <polygon points="12,2 15.1,8.3 22,9.3 17,14.1 18.2,21 12,17.8 5.8,21 7,14.1 2,9.3 8.9,8.3"
        fill="none" stroke={color} strokeWidth={s} strokeLinecap="round" strokeLinejoin="round"/>
    ),
    sparkle: (
      <g fill={color}>
        <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z"/>
        <path d="M19 14l.7 2.1 2.1.7-2.1.7-.7 2.1-.7-2.1-2.1-.7 2.1-.7L19 14z" opacity="0.7"/>
        <path d="M5 16l.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5 1.5-.5L5 16z" opacity="0.5"/>
      </g>
    ),

    // Actions
    close: (
      <g fill="none" stroke={color} strokeWidth={s} strokeLinecap="round">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </g>
    ),
    check: (
      <g fill="none" stroke={color} strokeWidth={s} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20,6 9,17 4,12"/>
      </g>
    ),
    chevronRight: (
      <g fill="none" stroke={color} strokeWidth={s} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9,18 15,12 9,6"/>
      </g>
    ),
    edit: (
      <g fill="none" stroke={color} strokeWidth={s} strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </g>
    ),
    trash: (
      <g fill="none" stroke={color} strokeWidth={s} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3,6 5,6 21,6"/>
        <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
        <path d="M10 11v6M14 11v6"/>
        <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
      </g>
    ),
    download: (
      <g fill="none" stroke={color} strokeWidth={s} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
        <polyline points="7,10 12,15 17,10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </g>
    ),
    bell: (
      <g fill="none" stroke={color} strokeWidth={s} strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 01-3.46 0"/>
      </g>
    ),
    clock: (
      <g fill="none" stroke={color} strokeWidth={s} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/>
        <polyline points="12,7 12,12 15,15"/>
      </g>
    ),
    moon: (
      <g fill="none" stroke={color} strokeWidth={s} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
      </g>
    ),
    sun: (
      <g fill="none" stroke={color} strokeWidth={s} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </g>
    ),
    lock: (
      <g fill="none" stroke={color} strokeWidth={s} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0110 0v4"/>
      </g>
    ),
    user: (
      <g fill="none" stroke={color} strokeWidth={s} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </g>
    ),
    logout: (
      <g fill="none" stroke={color} strokeWidth={s} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
        <polyline points="16,17 21,12 16,7"/>
        <line x1="21" y1="12" x2="9" y2="12"/>
      </g>
    ),
    heart: (
      <g fill="none" stroke={color} strokeWidth={s} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </g>
    ),
    filter: (
      <g fill="none" stroke={color} strokeWidth={s} strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/>
      </g>
    ),
    tag: (
      <g fill="none" stroke={color} strokeWidth={s} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
        <line x1="7" y1="7" x2="7.01" y2="7"/>
      </g>
    ),
    note: (
      <g fill="none" stroke={color} strokeWidth={s} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10,9 9,9 8,9"/>
      </g>
    ),
    shield: (
      <g fill="none" stroke={color} strokeWidth={s} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </g>
    ),
    calendar: (
      <g fill="none" stroke={color} strokeWidth={s} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </g>
    ),
    info: (
      <g fill="none" stroke={color} strokeWidth={s} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </g>
    ),
    arrowUp: (
      <g fill="none" stroke={color} strokeWidth={s} strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="19" x2="12" y2="5"/>
        <polyline points="5,12 12,5 19,12"/>
      </g>
    ),
    arrowDown: (
      <g fill="none" stroke={color} strokeWidth={s} strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"/>
        <polyline points="19,12 12,19 5,12"/>
      </g>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      style={{ display: 'inline-block', flexShrink: 0 }}
    >
      {icons[name] || icons['star']}
    </svg>
  );
}

window.Icon = Icon;
