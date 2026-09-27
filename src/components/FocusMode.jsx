const FOCUS_DEFAULT_SECONDS = 25 * 60;

function formatClock(totalSeconds) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
}

function FocusMode({ onComplete }) {
  const [secondsLeft, setSecondsLeft] = React.useState(FOCUS_DEFAULT_SECONDS);
  const [running, setRunning] = React.useState(false);
  const intervalRef = React.useRef(null);

  React.useEffect(() => {
    if (!running) return;
    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(intervalRef.current);
          setRunning(false);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(intervalRef.current);
  }, [running]);

  const start = () => {
    if (secondsLeft === 0) setSecondsLeft(FOCUS_DEFAULT_SECONDS);
    setRunning(true);
  };
  const pause = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    setSecondsLeft(FOCUS_DEFAULT_SECONDS);
  };

  const pct = 1 - secondsLeft / FOCUS_DEFAULT_SECONDS;
  const circumference = 2 * Math.PI * 70;
  const done = secondsLeft === 0;
  const statusLabel = done ? 'Nice work 🔥' : running ? 'Focusing…' : secondsLeft === FOCUS_DEFAULT_SECONDS ? 'Ready when you are' : 'Paused';

  return (
    <section className="surface surface-interactive h-full p-6 sm:p-7 flex flex-col items-center">
      <h2 className="font-bold text-[15px] text-slate-900 dark:text-white tracking-tight self-start mb-1">Focus Mode</h2>
      <p className="text-xs text-slate-400 self-start mb-5">{statusLabel}</p>

      <div className={`relative w-40 h-40 sm:w-44 sm:h-44 transition-transform duration-300 ${running ? 'scale-[1.02]' : ''}`}>
        <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
          <defs>
            <linearGradient id="focusRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#d946ef" />
            </linearGradient>
          </defs>
          <circle cx="80" cy="80" r="70" fill="none" stroke="currentColor" strokeWidth="9" className="text-slate-100 dark:text-white/[0.06]" />
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="url(#focusRingGradient)"
            strokeWidth="9"
            strokeLinecap="round"
            className={`transition-all duration-500 ${running ? 'drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]' : ''}`}
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - pct)}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl sm:text-4xl font-extrabold tabular-nums num text-slate-900 dark:text-white">{formatClock(secondsLeft)}</span>
        </div>
      </div>

      <div className="flex gap-2 mt-6">
        {!running ? (
          <button
            onClick={start}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold hover:-translate-y-0.5 transition-all duration-200 shadow-[0_10px_24px_-10px_rgba(99,102,241,0.6)]"
          >
            <IconPlay className="w-3.5 h-3.5" /> Start
          </button>
        ) : (
          <button
            onClick={pause}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 hover:-translate-y-0.5 transition-all duration-200 shadow-[0_10px_24px_-10px_rgba(245,158,11,0.6)]"
          >
            <IconPause className="w-3.5 h-3.5" /> Pause
          </button>
        )}
        <button
          onClick={reset}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-300 text-sm font-semibold hover:bg-slate-200 dark:hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200"
        >
          <IconRefresh className="w-3.5 h-3.5" /> Reset
        </button>
      </div>
    </section>
  );
}
