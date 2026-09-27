const QUICK_ADD_TYPES = ['Lead', 'Follow-up', 'Task', 'Meeting', 'Deal'];

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">{label}</span>
      {children}
    </label>
  );
}

const inputCls = 'field-input';

function LeadForm({ withFollowUp, onSubmit }) {
  const [form, setForm] = React.useState({
    name: '', area: '', property: '', phone: '', temp: 'Warm', nextFollowUp: isoFromOffset(withFollowUp ? 1 : 3),
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="space-y-3.5">
      <Field label="Name"><input className={inputCls} value={form.name} onChange={set('name')} placeholder="e.g. Ahmed Khalil" /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Area / Project"><input className={inputCls} value={form.area} onChange={set('area')} placeholder="e.g. The Valley" /></Field>
        <Field label="Property"><input className={inputCls} value={form.property} onChange={set('property')} placeholder="e.g. 4BR Villa" /></Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Phone"><input className={inputCls} value={form.phone} onChange={set('phone')} placeholder="+971 5X XXX XXXX" /></Field>
        <Field label="Lead temperature">
          <select className={inputCls} value={form.temp} onChange={set('temp')}>
            <option>Hot</option><option>Warm</option><option>Cold</option>
          </select>
        </Field>
      </div>
      <Field label="Next follow-up"><input type="date" className={inputCls} value={form.nextFollowUp} onChange={set('nextFollowUp')} /></Field>
      <button
        onClick={() => form.name.trim() && onSubmit(form)}
        className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:-translate-y-0.5 text-white text-sm font-semibold py-3 shadow-[0_10px_24px_-10px_rgba(99,102,241,0.6)] transition-all duration-200"
      >
        Add {withFollowUp ? 'follow-up' : 'lead'}
      </button>
    </div>
  );
}

function TaskForm({ onSubmit }) {
  const [form, setForm] = React.useState({ title: '', description: '', level: 'Medium' });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  return (
    <div className="space-y-3.5">
      <Field label="Title"><input className={inputCls} value={form.title} onChange={set('title')} placeholder="e.g. Prep listing photos" /></Field>
      <Field label="Description"><textarea rows={2} className={inputCls + ' resize-none'} value={form.description} onChange={set('description')} /></Field>
      <Field label="Priority level">
        <select className={inputCls} value={form.level} onChange={set('level')}>
          <option>High</option><option>Medium</option><option>Low</option>
        </select>
      </Field>
      <button
        onClick={() => form.title.trim() && onSubmit(form)}
        className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:-translate-y-0.5 text-white text-sm font-semibold py-3 shadow-[0_10px_24px_-10px_rgba(99,102,241,0.6)] transition-all duration-200"
      >
        Add task
      </button>
    </div>
  );
}

function MeetingForm({ onSubmit }) {
  const [form, setForm] = React.useState({ label: '', time: '09:00' });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  return (
    <div className="space-y-3.5">
      <Field label="What's the meeting?"><input className={inputCls} value={form.label} onChange={set('label')} placeholder="e.g. Viewing with James" /></Field>
      <Field label="Time"><input type="time" className={inputCls} value={form.time} onChange={set('time')} /></Field>
      <button
        onClick={() => form.label.trim() && onSubmit(form)}
        className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:-translate-y-0.5 text-white text-sm font-semibold py-3 shadow-[0_10px_24px_-10px_rgba(99,102,241,0.6)] transition-all duration-200"
      >
        Add meeting
      </button>
    </div>
  );
}

function DealForm({ onSubmit }) {
  const [form, setForm] = React.useState({ name: '', area: '', property: '', dealValue: '' });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  return (
    <div className="space-y-3.5">
      <Field label="Client name"><input className={inputCls} value={form.name} onChange={set('name')} placeholder="e.g. Khalid Rahman" /></Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Area / Project"><input className={inputCls} value={form.area} onChange={set('area')} placeholder="e.g. Dubai Hills" /></Field>
        <Field label="Property"><input className={inputCls} value={form.property} onChange={set('property')} placeholder="e.g. 4BR Villa" /></Field>
      </div>
      <Field label="Commission (AED)"><input type="number" className={inputCls} value={form.dealValue} onChange={set('dealValue')} placeholder="45000" /></Field>
      <button
        onClick={() => form.name.trim() && onSubmit(form)}
        className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:-translate-y-0.5 text-white text-sm font-semibold py-3 shadow-[0_10px_24px_-10px_rgba(16,185,129,0.6)] transition-all duration-200"
      >
        Mark deal closed
      </button>
    </div>
  );
}

function QuickAddTabs({ type, setType }) {
  const containerRef = React.useRef(null);
  const btnRefs = React.useRef({});
  const [indicator, setIndicator] = React.useState(null);

  React.useLayoutEffect(() => {
    const btn = btnRefs.current[type];
    const container = containerRef.current;
    if (btn && container) {
      const cRect = container.getBoundingClientRect();
      const bRect = btn.getBoundingClientRect();
      setIndicator({ left: bRect.left - cRect.left, width: bRect.width });
    }
  }, [type]);

  return (
    <div ref={containerRef} className="relative flex gap-1.5 mb-5 flex-wrap p-1 rounded-2xl bg-slate-100/80 dark:bg-white/[0.04]">
      {indicator && (
        <span
          className="absolute top-1 bottom-1 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 shadow-[0_6px_16px_-6px_rgba(99,102,241,0.6)] transition-all duration-300 ease-out"
          style={{ left: indicator.left, width: indicator.width }}
        />
      )}
      {QUICK_ADD_TYPES.map((t) => (
        <button
          key={t}
          ref={(el) => (btnRefs.current[t] = el)}
          onClick={() => setType(t)}
          className={`relative z-10 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors duration-200 ${
            type === t ? 'text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

function QuickAddModal({ onClose, actions, addToast }) {
  const [type, setType] = React.useState('Lead');

  const handle = (data) => {
    if (type === 'Lead' || type === 'Follow-up') {
      actions.addLead({
        id: uid(), name: data.name, area: data.area, property: data.property, phone: data.phone,
        temp: data.temp, status: 'Lead', lastContact: todayISO(), nextFollowUp: data.nextFollowUp, dealValue: null,
      });
      addToast(`Added ${data.name} to ${type === 'Follow-up' ? 'follow-ups' : 'leads'}.`);
    } else if (type === 'Task') {
      const ok = actions.addPriority({ id: uid(), title: data.title, description: data.description, level: data.level, done: false });
      addToast(ok ? `Added "${data.title}" to today's priorities.` : 'Priorities are full — remove one first.');
    } else if (type === 'Meeting') {
      actions.addSchedule({ id: uid(), time: data.time, label: data.label, category: 'Meeting', done: false });
      addToast(`Added "${data.label}" to today's schedule.`);
    } else if (type === 'Deal') {
      const value = Number(data.dealValue) || 0;
      actions.addLead({
        id: uid(), name: data.name, area: data.area, property: data.property, phone: '',
        temp: 'Hot', status: 'Closed', lastContact: todayISO(), nextFollowUp: null, dealValue: value, closedDate: todayISO(),
      });
      actions.addCommission(value);
      addToast(`🎉 Deal closed — ${formatAED(value)} added to your commission goal.`);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:w-[440px] max-h-[85vh] overflow-y-auto rounded-t-[32px] sm:rounded-[32px] bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl border border-slate-200/70 dark:border-white/[0.08] shadow-2xl p-6 sm:p-7 animate-modal-in"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">Quick Add</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full p-1.5 transition-colors">
            <IconX className="w-5 h-5" />
          </button>
        </div>

        <QuickAddTabs type={type} setType={setType} />

        {type === 'Lead' && <LeadForm withFollowUp={false} onSubmit={handle} />}
        {type === 'Follow-up' && <LeadForm withFollowUp={true} onSubmit={handle} />}
        {type === 'Task' && <TaskForm onSubmit={handle} />}
        {type === 'Meeting' && <MeetingForm onSubmit={handle} />}
        {type === 'Deal' && <DealForm onSubmit={handle} />}
      </div>
    </div>
  );
}

function QuickAddFAB({ actions, addToast }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-[0_16px_36px_-10px_rgba(99,102,241,0.7)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200"
        aria-label="Quick add"
      >
        <IconPlus className="w-6 h-6" />
      </button>
      {open && <QuickAddModal onClose={() => setOpen(false)} actions={actions} addToast={addToast} />}
    </>
  );
}
