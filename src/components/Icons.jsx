// Small inline SVG icon set — keeps the app dependency-free.

function Icon({ children, className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className || 'w-5 h-5'}>
      {children}
    </svg>
  );
}

function IconSun(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </Icon>
  );
}

function IconMoon(props) {
  return (
    <Icon {...props}>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />
    </Icon>
  );
}

function IconPlus(props) {
  return (
    <Icon {...props}>
      <path d="M12 5v14M5 12h14" />
    </Icon>
  );
}

function IconX(props) {
  return (
    <Icon {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </Icon>
  );
}

function IconCheck(props) {
  return (
    <Icon {...props}>
      <path d="M20 6 9 17l-5-5" />
    </Icon>
  );
}

function IconPhone(props) {
  return (
    <Icon {...props}>
      <path d="M4 5c0 8.3 6.7 15 15 15l3-4-6-2-2 2c-2.5-1.2-4.8-3.5-6-6l2-2-2-6-4 3Z" />
    </Icon>
  );
}

function IconPlay(props) {
  return (
    <Icon {...props}>
      <path d="M7 4.5v15l13-7.5-13-7.5Z" fill="currentColor" stroke="none" />
    </Icon>
  );
}

function IconPause(props) {
  return (
    <Icon {...props}>
      <path d="M7 5h3v14H7zM14 5h3v14h-3z" fill="currentColor" stroke="none" />
    </Icon>
  );
}

function IconRefresh(props) {
  return (
    <Icon {...props}>
      <path d="M20 11a8 8 0 1 0-2.3 5.7M20 5v6h-6" />
    </Icon>
  );
}

function IconChevron(props) {
  const dir = props.dir || 'down';
  const rot = { up: 'rotate-180', down: '', left: 'rotate-90', right: '-rotate-90' }[dir];
  return (
    <Icon {...props} className={`w-4 h-4 transition-transform ${rot} ${props.className || ''}`}>
      <path d="M6 9l6 6 6-6" />
    </Icon>
  );
}

function IconFlame(props) {
  return (
    <Icon {...props}>
      <path d="M12 2c1 3-3 4-3 8a3 3 0 0 0 6 0c0-1-.5-2-.5-2 1.5 1 2.5 3 2.5 5a5 5 0 0 1-10 0c0-5 3-6 3-11 0 0 1.5.5 2 0Z" />
    </Icon>
  );
}

function IconTrash(props) {
  return (
    <Icon {...props}>
      <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />
    </Icon>
  );
}

function IconEdit(props) {
  return (
    <Icon {...props}>
      <path d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3Z" />
    </Icon>
  );
}

function IconSparkles(props) {
  return (
    <Icon {...props}>
      <path d="M12 3v4M12 17v4M4 12H2M6 6 4.5 4.5M18 6l1.5-1.5M22 12h-2M6 18l-1.5 1.5M18 18l1.5 1.5" />
      <path d="M12 8a4 4 0 0 0 4 4 4 4 0 0 0-4 4 4 4 0 0 0-4-4 4 4 0 0 0 4-4Z" fill="currentColor" stroke="none" />
    </Icon>
  );
}

function IconCalendar(props) {
  return (
    <Icon {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </Icon>
  );
}

function IconSearch(props) {
  return (
    <Icon {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </Icon>
  );
}

function IconArrowRight(props) {
  return (
    <Icon {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Icon>
  );
}

function IconTarget(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none" />
    </Icon>
  );
}

function IconTrendingUp(props) {
  return (
    <Icon {...props}>
      <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />
    </Icon>
  );
}

function IconUsers(props) {
  return (
    <Icon {...props}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.5 20c0-3.6 2.9-6.2 6.5-6.2s6.5 2.6 6.5 6.2M16.5 5a3.2 3.2 0 0 1 0 6.2M21.5 20c0-3-2-5.4-5-6" />
    </Icon>
  );
}

function IconBell(props) {
  return (
    <Icon {...props}>
      <path d="M6 9a6 6 0 1 1 12 0c0 4 1.5 5.5 2 6.5H4c.5-1 2-2.5 2-6.5Z" />
      <path d="M9.5 19a2.5 2.5 0 0 0 5 0" />
    </Icon>
  );
}

function IconBadgeCheck(props) {
  return (
    <Icon {...props}>
      <path d="M12 2.5l2.2 1.3 2.6-.2 1 2.4 2.2 1.4-.6 2.6.6 2.6-2.2 1.4-1 2.4-2.6-.2L12 21.5l-2.2-1.3-2.6.2-1-2.4-2.2-1.4.6-2.6-.6-2.6 2.2-1.4 1-2.4 2.6.2Z" />
      <path d="M9 12l2 2 4-4" />
    </Icon>
  );
}
