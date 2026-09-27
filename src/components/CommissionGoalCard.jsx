function EditableAmount({ value, onSave, className, prefix }) {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(value);

  if (editing) {
    return (
      <input
        autoFocus
        type="number"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onFocus={(e) => e.target.select()}
        onBlur={() => {
          onSave(Math.max(0, Number(draft) || 0));
          setEditing(false);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') e.currentTarget.blur();
          if (e.key === 'Escape') {
            setDraft(value);
            setEditing(false);
          }
        }}
        className={`bg-transparent border-b-2 border-indigo-400 focus:outline-none num ${className || ''}`}
        style={{ width: `${Math.max(3, String(draft).length + 1)}ch` }}
      />
    );
  }

  return (
    <button
      onClick={() => {
        setDraft(value);
        setEditing(true);
      }}
      className={`text-left hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors num ${className || ''}`}
      title="Click to edit"
    >
      {prefix}
      {value.toLocaleString('en-US')}
    </button>
  );
}

function CommissionGoalCard({ commissionGoal, setCommissionGoal }) {
  const { goal, current } = commissionGoal;
  const pct = goal > 0 ? Math.min(100, (current / goal) * 100) : 0;
  const remaining = Math.max(0, goal - current);

  return (
    <section className="relative overflow-hidden surface surface-interactive p-6 sm:p-8">
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-br from-indigo-400/15 via-violet-400/10 to-fuchsia-400/10 blur-3xl pointer-events-none" />

      <div className="relative flex flex-col lg:flex-row lg:items-center gap-8">
        <div className="flex items-center gap-5 lg:border-r lg:border-slate-100 dark:lg:border-white/[0.06] lg:pr-8 shrink-0">
          <span className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/10 text-indigo-500 shrink-0">
            <IconTarget className="w-5 h-5" />
          </span>
          <div>
            <p className="eyebrow">2026 Commission Goal</p>
            <p className="mt-1 text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white num leading-none">
              {pct.toFixed(1)}<span className="text-2xl text-slate-400">%</span>
            </p>
          </div>
        </div>

        <div className="flex-1 min-w-0 w-full">
          <div className="flex items-baseline justify-between gap-2 flex-wrap mb-2.5">
            <div className="flex items-baseline gap-1.5 text-sm text-slate-500 dark:text-slate-400">
              <span>Goal</span>
              <EditableAmount value={goal} prefix="AED " onSave={(v) => setCommissionGoal((prev) => ({ ...prev, goal: v }))} className="font-bold text-slate-800 dark:text-slate-100" />
              <span className="text-slate-300 dark:text-slate-600 mx-1">/</span>
              <span>Current</span>
              <EditableAmount value={current} prefix="AED " onSave={(v) => setCommissionGoal((prev) => ({ ...prev, current: v }))} className="font-bold text-slate-800 dark:text-slate-100" />
            </div>
          </div>

          <div className="relative h-4 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden shadow-inner">
            <div
              className="relative h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 transition-[width] duration-700 ease-out shadow-[0_0_20px_rgba(139,92,246,0.5)]"
              style={{ width: `${Math.max(pct, 2)}%` }}
            >
              <span className="absolute inset-0 bg-shimmer animate-shimmer opacity-60" />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs font-medium">
            <span className="text-emerald-600 dark:text-emerald-400">{formatAED(current)} earned</span>
            <span className="text-slate-400">{formatAED(remaining)} to go</span>
          </div>
        </div>
      </div>
    </section>
  );
}
