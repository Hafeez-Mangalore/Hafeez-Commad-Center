// Shared helpers: storage, dates, formatting. Plain JS (no JSX) so it loads before Babel-transformed files.

const STORAGE_PREFIX = 'pcc_v1_';
const STAGES = ['Lead', 'Contacted', 'Viewing', 'Negotiation', 'MOU', 'Closed'];

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

function saveJSON(key, value) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    /* storage full or unavailable — fail silently */
  }
}

function useLocalStorage(key, initialValue) {
  const [value, setValue] = React.useState(() => {
    const fallback = typeof initialValue === 'function' ? initialValue() : initialValue;
    return loadJSON(key, fallback);
  });
  React.useEffect(() => {
    saveJSON(key, value);
  }, [key, value]);
  return [value, setValue];
}

function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function todayISO() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  const off = d.getTimezoneOffset();
  const local = new Date(d.getTime() - off * 60000);
  return local.toISOString().slice(0, 10);
}

function isoFromOffset(days) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + days);
  const off = d.getTimezoneOffset();
  const local = new Date(d.getTime() - off * 60000);
  return local.toISOString().slice(0, 10);
}

function formatDateLong(date) {
  return date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function formatDateShort(iso) {
  if (!iso) return '—';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function formatAED(n) {
  const num = Number(n) || 0;
  return 'AED ' + num.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

function daysDiffFromToday(iso) {
  if (!iso) return null;
  const today = new Date(todayISO() + 'T00:00:00');
  const d = new Date(iso + 'T00:00:00');
  return Math.round((d - today) / 86400000);
}

function relativeDayLabel(iso) {
  const diff = daysDiffFromToday(iso);
  if (diff === null) return '—';
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  if (diff === -1) return 'Yesterday';
  if (diff < 0) return `${-diff}d overdue`;
  return `in ${diff}d`;
}

function isCurrentMonth(iso) {
  if (!iso) return false;
  const d = new Date(iso + 'T00:00:00');
  const now = new Date();
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
}

function greetingForHour() {
  const h = new Date().getHours();
  if (h < 5) return 'Good night';
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  if (h < 21) return 'Good evening';
  return 'Good evening';
}

const MOTIVATIONAL_QUOTES = [
  'Small consistent actions compound into big wins.',
  'Every call you make today is a door you open.',
  'Discipline today, freedom tomorrow.',
  'The deal you follow up on is the deal you close.',
  'Momentum is built one honest effort at a time.',
  'Clarity beats intensity — focus on what matters most.',
  'Your future self is built by today\'s follow-through.',
  'Slow and steady still wins the pipeline.',
  'Great outcomes are just good habits, repeated.',
  'Show up for the boring parts — that\'s where the deals live.',
  'Progress, not perfection.',
  'The best time to follow up was yesterday. The next best time is now.',
  'One focused hour beats five distracted ones.',
  'Trust is built in the follow-up, not the pitch.',
  'Today is a fresh page — write something worth reading.',
  'Consistency is the quiet engine behind every big win.',
  'You don\'t need more hours, you need more focus.',
  'Every "no" gets you closer to the right "yes".',
  'Take care of the pipeline and the pipeline takes care of you.',
  'Calm mind, clear priorities, better decisions.',
  'Systems beat willpower — trust the process today.',
  '做好准备的人，运气也会更好。Preparation invites luck.',
  'The client remembers who followed up — be that person.',
  'Energy flows where attention goes. Choose wisely today.',
  '做三件对的事，好过做十件差的事。Do three right things, not ten average ones.',
  'A calm morning routine sets the tone for a sharp day.',
  'Deals are won in the follow-up, not the first meeting.',
  'Protect your focus hour like it\'s your most valuable client.',
  'Balance is not a luxury — it\'s a strategy.',
  'Today\'s effort is tomorrow\'s commission.',
];

function quoteOfTheDay() {
  const start = new Date(new Date().getFullYear(), 0, 1);
  const now = new Date();
  const diff = Math.floor((now - start) / 86400000);
  return MOTIVATIONAL_QUOTES[((diff % MOTIVATIONAL_QUOTES.length) + MOTIVATIONAL_QUOTES.length) % MOTIVATIONAL_QUOTES.length];
}

function stageIndex(stage) {
  const i = STAGES.indexOf(stage);
  return i === -1 ? 0 : i;
}
