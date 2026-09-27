function App() {
  const [theme, setTheme] = useLocalStorage('theme', window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const [priorities, setPriorities] = useLocalStorage('priorities', seedPriorities);
  const [leads, setLeads] = useLocalStorage('leads', seedLeads);
  const [schedule, setSchedule] = useLocalStorage('schedule', seedSchedule);
  const [commissionGoal, setCommissionGoal] = useLocalStorage('commissionGoal', seedCommissionGoal);
  const [recommendation, setRecommendation] = React.useState(null);
  const { toasts, addToast } = useToasts();

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const showRecommendation = () => {
    setRecommendation(getRecommendation({ leads, priorities, schedule }));
  };

  const quickAddActions = {
    addLead: (lead) => setLeads((prev) => [lead, ...prev]),
    addPriority: (priority) => {
      let added = false;
      setPriorities((prev) => {
        if (prev.length >= 3) return prev;
        added = true;
        return [...prev, priority];
      });
      return added;
    },
    addSchedule: (item) => setSchedule((prev) => [...prev, item]),
    addCommission: (amount) => setCommissionGoal((prev) => ({ ...prev, current: prev.current + amount })),
  };

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-7 sm:space-y-8">
        <Header theme={theme} setTheme={setTheme} onWhatNow={showRecommendation} />

        {recommendation && <WhatNowPanel recommendation={recommendation} onClose={() => setRecommendation(null)} />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 animate-rise" style={{ animationDelay: '60ms' }}>
            <PrioritiesCard priorities={priorities} setPriorities={setPriorities} />
          </div>
          <div className="lg:col-span-2 animate-rise" style={{ animationDelay: '100ms' }}>
            <PipelineCard leads={leads} />
          </div>
        </div>

        <div className="animate-rise" style={{ animationDelay: '140ms' }}>
          <CommissionGoalCard commissionGoal={commissionGoal} setCommissionGoal={setCommissionGoal} />
        </div>

        <div className="animate-rise" style={{ animationDelay: '180ms' }}>
          <FollowUpsTable leads={leads} setLeads={setLeads} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="animate-rise" style={{ animationDelay: '220ms' }}>
            <ScheduleTimeline schedule={schedule} setSchedule={setSchedule} />
          </div>
          <div className="animate-rise" style={{ animationDelay: '260ms' }}>
            <FocusMode onComplete={() => addToast('Focus session complete 🔥', 5000)} />
          </div>
        </div>

        <footer className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2 pb-10">
          <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
          Personal Command Center · data stays on this device
          <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
        </footer>
      </div>

      <QuickAddFAB actions={quickAddActions} addToast={addToast} />
      <ToastStack toasts={toasts} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
