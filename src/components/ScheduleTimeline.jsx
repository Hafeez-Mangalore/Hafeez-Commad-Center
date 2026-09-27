const CATEGORY_DOT = {
  Prayer: 'bg-violet-500 shadow-[0_0_0_3px_rgba(139,92,246,0.15)]',
  Office: 'bg-sky-500 shadow-[0_0_0_3px_rgba(14,165,233,0.15)]',
  Meeting: 'bg-orange-500 shadow-[0_0_0_3px_rgba(249,115,22,0.15)]',
  Exercise: 'bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.15)]',
  Personal: 'bg-pink-500 shadow-[0_0_0_3px_rgba(236,72,153,0.15)]',
};

function daypartOf(time) {
  const h = Number(time.slice(0, 2));
  if (h < 12) return 'Morning';
  if (h < 17) return 'Afternoon';
  return 'Evening';
}

function ScheduleTimeline({ schedule, setSchedule }) {
  const sorted = React.useMemo(() => [...schedule].sort((a, b) => a.time.localeCompare(b.time)), [schedule]);

  const toggle = (item) => setSchedule((prev) => prev.map((s) => (s.id === item.id ? { ...s, done: !s.done } : s)));
  const remove = (item) => setSchedule((prev) => prev.filter((s) => s.id !== item.id));

  let lastDaypart = null;

  return (
    <section className="surface surface-interactive h-full p-6 sm:p-7">
      <h2 className="font-bold text-[15px] text-slate-900 dark:text-white tracking-tight mb-5">Today's Schedule</h2>
      <div className="relative pl-1 max-h-[420px] overflow-y-auto pr-1 -mr-1">
        <div className="absolute left-[9px] top-1 bottom-1 w-px bg-gradient-to-b from-slate-200 via-slate-100 to-transparent dark:from-white/10 dark:via-white/5" />
        <div className="space-y-1">
          {sorted.map((item, i) => {
            const daypart = daypartOf(item.time);
            const showHeader = daypart !== lastDaypart;
            lastDaypart = daypart;
            return (
              <React.Fragment key={item.id}>
                {showHeader && (
                  <p className={`eyebrow pl-6 ${i === 0 ? '' : 'pt-3'} pb-1.5`}>{daypart}</p>
                )}
                <div className="relative flex items-start gap-3 group pl-6 py-1.5 rounded-xl hover:bg-slate-50/70 dark:hover:bg-white/[0.03] transition-colors -mx-1 px-1">
                  <span
                    className={`absolute left-0 top-[13px] w-[14px] h-[14px] rounded-full border-2 border-white dark:border-slate-900 ${CATEGORY_DOT[item.category]} ${item.done ? 'opacity-40' : ''} shrink-0 transition-opacity`}
                  />
                  <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className={`text-sm font-medium transition-colors ${item.done ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-100'}`}>
                        {item.label}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5 num">
                        {item.time} · {item.category}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => toggle(item)}
                        className={`w-6 h-6 flex items-center justify-center rounded-full border transition-all duration-200 ${
                          item.done ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-slate-300 dark:border-slate-600 text-transparent hover:border-indigo-400'
                        }`}
                      >
                        <IconCheck className={`w-3 h-3 ${item.done ? 'animate-check-pop' : ''}`} />
                      </button>
                      <button
                        onClick={() => remove(item)}
                        className="w-6 h-6 flex items-center justify-center rounded-full text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <IconX className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
          {sorted.length === 0 && <p className="text-sm text-slate-400 py-6 text-center">Nothing scheduled yet.</p>}
        </div>
      </div>
    </section>
  );
}
