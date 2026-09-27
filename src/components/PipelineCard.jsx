const STAT_ICONS = {
  hot: { Icon: IconFlame, tint: 'text-rose-500 bg-rose-50 dark:bg-rose-500/10' },
  warm: { Icon: IconUsers, tint: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10' },
  due: { Icon: IconBell, tint: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10' },
  closed: { Icon: IconBadgeCheck, tint: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' },
  commission: { Icon: IconTarget, tint: 'text-violet-500 bg-violet-50 dark:bg-violet-500/10' },
};

function StatTile({ icon, label, value }) {
  const { Icon, tint } = STAT_ICONS[icon];
  return (
    <div className="group rounded-2xl bg-slate-50/80 dark:bg-white/[0.03] border border-transparent hover:border-slate-200/80 dark:hover:border-white/[0.06] px-4 py-3.5 flex flex-col gap-2.5 min-w-0 transition-all duration-200 hover:-translate-y-0.5">
      <span className={`flex items-center justify-center w-8 h-8 rounded-xl ${tint} transition-transform duration-200 group-hover:scale-105`}>
        <Icon className="w-4 h-4" />
      </span>
      <div className="min-w-0">
        <span className="block text-[10.5px] font-semibold uppercase tracking-wide text-slate-400 truncate">{label}</span>
        <span className="block text-xl font-extrabold tracking-tight text-slate-900 dark:text-white num truncate">{value}</span>
      </div>
    </div>
  );
}

function PipelineFunnel({ leads }) {
  const counts = STAGES.map((stage) => leads.filter((l) => l.status === stage).length);
  const max = Math.max(1, ...counts);
  const total = counts.reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-2.5">
      {STAGES.map((stage, i) => {
        const count = counts[i];
        const widthPct = total === 0 ? 0 : Math.max(count > 0 ? 6 : 0, (count / max) * 100);
        return (
          <div key={stage} className="flex items-center gap-3">
            <span className="w-[92px] sm:w-[104px] shrink-0 text-xs font-medium text-slate-500 dark:text-slate-400 truncate">{stage}</span>
            <div className="relative flex-1 h-6 rounded-full bg-slate-100/80 dark:bg-white/[0.04] overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 origin-left animate-bar-grow"
                style={{ width: `${widthPct}%` }}
              />
            </div>
            <span className="w-6 shrink-0 text-right text-sm font-bold text-slate-700 dark:text-slate-200 num">{count}</span>
          </div>
        );
      })}
    </div>
  );
}

function PipelineCard({ leads }) {
  const today = todayISO();
  const hot = leads.filter((l) => l.temp === 'Hot' && l.status !== 'Closed').length;
  const warm = leads.filter((l) => l.temp === 'Warm' && l.status !== 'Closed').length;
  const dueToday = leads.filter((l) => l.status !== 'Closed' && l.nextFollowUp === today).length;
  const closedThisMonth = leads.filter((l) => l.status === 'Closed' && isCurrentMonth(l.closedDate)).length;
  const commissionThisMonth = leads
    .filter((l) => l.status === 'Closed' && isCurrentMonth(l.closedDate))
    .reduce((sum, l) => sum + (Number(l.dealValue) || 0), 0);

  return (
    <section className="surface surface-interactive h-full p-6 sm:p-7">
      <div className="flex items-center gap-2 mb-5">
        <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500">
          <IconTrendingUp className="w-4 h-4" />
        </span>
        <h2 className="font-bold text-[15px] text-slate-900 dark:text-white tracking-tight">Real Estate Pipeline</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-6">
        <StatTile icon="hot" label="Hot leads" value={hot} />
        <StatTile icon="warm" label="Warm leads" value={warm} />
        <StatTile icon="due" label="Due today" value={dueToday} />
        <StatTile icon="closed" label="Closed (mo.)" value={closedThisMonth} />
        <StatTile icon="commission" label="Commission (mo.)" value={formatAED(commissionThisMonth)} />
      </div>
      <PipelineFunnel leads={leads} />
    </section>
  );
}
