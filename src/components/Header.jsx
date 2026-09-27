function ThemeToggle({ theme, setTheme }) {
  const isDark = theme === 'dark';
  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="group relative flex items-center justify-center w-11 h-11 rounded-full bg-white/80 dark:bg-white/[0.06] border border-slate-200/70 dark:border-white/[0.08] shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden shrink-0"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      <IconSun className={`w-[18px] h-[18px] text-amber-400 absolute transition-all duration-500 ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} />
      <IconMoon className={`w-[18px] h-[18px] text-indigo-500 absolute transition-all duration-500 ${isDark ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} />
    </button>
  );
}

function Header({ theme, setTheme, onWhatNow }) {
  const [now, setNow] = React.useState(new Date());
  React.useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 60000);
    return () => window.clearInterval(t);
  }, []);

  const greeting = greetingForHour();
  const quote = React.useMemo(() => quoteOfTheDay(), []);

  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between animate-rise">
      <div className="min-w-0">
        <div className="flex items-center gap-2 mb-2.5">
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-400 animate-pulse-soft"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500"></span>
          </span>
          <span className="eyebrow">Personal Command Center</span>
        </div>
        <h1 className="text-3xl sm:text-[2.5rem] leading-[1.1] font-extrabold tracking-[-0.02em] text-slate-900 dark:text-white">
          {greeting}, <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 dark:from-indigo-400 dark:via-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">Hafeez</span>{' '}
          <span className="inline-block animate-wave origin-[70%_70%]">👋</span>
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 num">{formatDateLong(now)}</p>
        <p className="mt-3 text-sm sm:text-[15px] text-slate-500 dark:text-slate-400 max-w-md border-l-2 border-indigo-200 dark:border-indigo-500/30 pl-3 italic">
          {quote}
        </p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onWhatNow}
          className="group relative flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white pl-3.5 pr-5 py-3 text-sm font-semibold shadow-[0_10px_30px_-10px_rgba(99,102,241,0.6)] hover:shadow-[0_14px_36px_-10px_rgba(99,102,241,0.75)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
        >
          <span className="absolute inset-0 bg-shimmer opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300" />
          <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-white/20">
            <IconSparkles className="w-3.5 h-3.5" />
          </span>
          <span className="relative">What should I do now?</span>
        </button>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
    </header>
  );
}

function WhatNowPanel({ recommendation, onClose }) {
  if (!recommendation) return null;
  return (
    <div className="animate-pop rounded-[28px] bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 p-px shadow-[0_20px_50px_-20px_rgba(99,102,241,0.5)]">
      <div className="relative rounded-[27px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-5 sm:px-6 py-5 flex items-start gap-4 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-indigo-400/20 to-fuchsia-400/20 blur-2xl" />
        <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/10 dark:from-indigo-400/15 dark:to-fuchsia-400/15 text-2xl shrink-0">
          {recommendation.icon}
        </div>
        <div className="relative flex-1 min-w-0">
          <p className="eyebrow text-indigo-500 dark:text-indigo-400">Right now</p>
          <p className="mt-1 font-semibold text-[15px] text-slate-900 dark:text-white leading-snug">{recommendation.action}</p>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{recommendation.reason}</p>
        </div>
        <button
          onClick={onClose}
          className="relative text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full p-1.5 transition-colors shrink-0"
          aria-label="Dismiss"
        >
          <IconX className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
