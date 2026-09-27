const STATUS_STYLES = {
  Lead: { pill: 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300', dot: 'bg-slate-400' },
  Contacted: { pill: 'bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400', dot: 'bg-sky-500' },
  Viewing: { pill: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400', dot: 'bg-amber-500' },
  Negotiation: { pill: 'bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400', dot: 'bg-orange-500' },
  MOU: { pill: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400', dot: 'bg-violet-500' },
  Closed: { pill: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400', dot: 'bg-emerald-500' },
};

const TEMP_DOT = { Hot: 'bg-rose-500', Warm: 'bg-amber-400', Cold: 'bg-sky-400' };

const COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'area', label: 'Area/Project' },
  { key: 'property', label: 'Property' },
  { key: 'phone', label: 'Phone' },
  { key: 'status', label: 'Status' },
  { key: 'lastContact', label: 'Last Contact' },
  { key: 'nextFollowUp', label: 'Next Follow-up' },
];

function FollowUpsTable({ leads, setLeads }) {
  const [sortKey, setSortKey] = React.useState('nextFollowUp');
  const [sortDir, setSortDir] = React.useState('asc');
  const [statusFilter, setStatusFilter] = React.useState('All');
  const [search, setSearch] = React.useState('');

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const filtered = React.useMemo(() => {
    let rows = leads;
    if (statusFilter !== 'All') rows = rows.filter((l) => l.status === statusFilter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      rows = rows.filter((l) => [l.name, l.area, l.property, l.phone].some((v) => (v || '').toLowerCase().includes(q)));
    }
    const sorted = [...rows].sort((a, b) => {
      let av = a[sortKey] ?? '';
      let bv = b[sortKey] ?? '';
      if (sortKey === 'status') {
        av = stageIndex(a.status);
        bv = stageIndex(b.status);
      }
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [leads, statusFilter, search, sortKey, sortDir]);

  const markContacted = (lead) => {
    setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, lastContact: todayISO() } : l)));
  };

  const advanceStage = (lead) => {
    const idx = stageIndex(lead.status);
    if (idx >= STAGES.length - 1) return;
    const nextStage = STAGES[idx + 1];
    setLeads((prev) =>
      prev.map((l) =>
        l.id === lead.id
          ? { ...l, status: nextStage, ...(nextStage === 'Closed' ? { closedDate: todayISO(), nextFollowUp: null } : {}) }
          : l
      )
    );
  };

  const removeLead = (lead) => setLeads((prev) => prev.filter((l) => l.id !== lead.id));

  return (
    <section className="surface surface-interactive p-6 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <h2 className="font-bold text-[15px] text-slate-900 dark:text-white tracking-tight">Follow-ups</h2>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <IconSearch className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, area, phone…"
              className="pl-9 pr-3 py-2 rounded-full text-xs bg-slate-100/80 dark:bg-white/[0.05] border border-transparent focus:border-indigo-300 dark:focus:border-indigo-400/40 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 w-44 sm:w-52 transition-all duration-200"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-2 px-3.5 rounded-full text-xs font-medium bg-slate-100/80 dark:bg-white/[0.05] text-slate-600 dark:text-slate-300 border border-transparent focus:outline-none focus:border-indigo-300 dark:focus:border-indigo-400/40 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200"
          >
            <option value="All">All statuses</option>
            {STAGES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-auto -mx-2 max-h-[26rem] rounded-2xl">
        <table className="w-full text-sm min-w-[760px] border-separate border-spacing-0">
          <thead className="sticky top-0 z-10">
            <tr className="text-left text-[10.5px] uppercase tracking-wide text-slate-400">
              {COLUMNS.map((c) => (
                <th
                  key={c.key}
                  className="px-3 py-2.5 font-bold cursor-pointer select-none whitespace-nowrap bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-100 dark:border-white/[0.06] hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  onClick={() => toggleSort(c.key)}
                >
                  <span className="inline-flex items-center gap-1">
                    {c.label}
                    <IconChevron dir={sortKey === c.key && sortDir === 'asc' ? 'up' : 'down'} className={`w-3 h-3 ${sortKey === c.key ? 'opacity-100 text-indigo-500' : 'opacity-25'}`} />
                  </span>
                </th>
              ))}
              <th className="px-3 py-2.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-100 dark:border-white/[0.06]"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => {
              const overdue = l.status !== 'Closed' && l.nextFollowUp && l.nextFollowUp < todayISO();
              const status = STATUS_STYLES[l.status];
              return (
                <tr key={l.id} className="group relative">
                  <td className="px-3 py-3 font-medium text-slate-800 dark:text-slate-100 whitespace-nowrap border-b border-slate-50 dark:border-white/[0.04] group-hover:bg-slate-50/70 dark:group-hover:bg-white/[0.03] transition-colors rounded-l-xl">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 group-hover:h-6 bg-indigo-400 rounded-r transition-all duration-200" />
                    <span className={`inline-block w-1.5 h-1.5 rounded-full mr-2 ${TEMP_DOT[l.temp]}`} title={l.temp}></span>
                    {l.name}
                  </td>
                  <td className="px-3 py-3 text-slate-500 dark:text-slate-400 whitespace-nowrap border-b border-slate-50 dark:border-white/[0.04] group-hover:bg-slate-50/70 dark:group-hover:bg-white/[0.03] transition-colors">{l.area}</td>
                  <td className="px-3 py-3 text-slate-500 dark:text-slate-400 whitespace-nowrap border-b border-slate-50 dark:border-white/[0.04] group-hover:bg-slate-50/70 dark:group-hover:bg-white/[0.03] transition-colors">{l.property}</td>
                  <td className="px-3 py-3 text-slate-500 dark:text-slate-400 whitespace-nowrap num border-b border-slate-50 dark:border-white/[0.04] group-hover:bg-slate-50/70 dark:group-hover:bg-white/[0.03] transition-colors">{l.phone}</td>
                  <td className="px-3 py-3 whitespace-nowrap border-b border-slate-50 dark:border-white/[0.04] group-hover:bg-slate-50/70 dark:group-hover:bg-white/[0.03] transition-colors">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${status.pill}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                      {l.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-slate-500 dark:text-slate-400 whitespace-nowrap num border-b border-slate-50 dark:border-white/[0.04] group-hover:bg-slate-50/70 dark:group-hover:bg-white/[0.03] transition-colors">{formatDateShort(l.lastContact)}</td>
                  <td className={`px-3 py-3 whitespace-nowrap num font-semibold border-b border-slate-50 dark:border-white/[0.04] group-hover:bg-slate-50/70 dark:group-hover:bg-white/[0.03] transition-colors ${overdue ? 'text-rose-500' : 'text-slate-500 dark:text-slate-400'}`}>
                    {l.nextFollowUp ? relativeDayLabel(l.nextFollowUp) : '—'}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap border-b border-slate-50 dark:border-white/[0.04] group-hover:bg-slate-50/70 dark:group-hover:bg-white/[0.03] transition-colors rounded-r-xl">
                    <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => markContacted(l)} title="Mark contacted today" className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-white/10 text-slate-400 hover:text-sky-500 transition-colors">
                        <IconPhone className="w-3.5 h-3.5" />
                      </button>
                      {l.status !== 'Closed' && (
                        <button onClick={() => advanceStage(l)} title="Advance stage" className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-white/10 text-slate-400 hover:text-indigo-500 transition-colors">
                          <IconArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button onClick={() => removeLead(l)} title="Remove" className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-white/10 text-slate-400 hover:text-rose-500 transition-colors">
                        <IconTrash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center text-sm text-slate-400 py-10">
                  No contacts match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
