const PRIORITY_STYLES = {
  High: { badge: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 ring-rose-200 dark:ring-rose-500/20', bar: 'bg-rose-400', glow: 'hover:shadow-[0_20px_40px_-24px_rgba(244,63,94,0.35)]' },
  Medium: { badge: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 ring-amber-200 dark:ring-amber-500/20', bar: 'bg-amber-400', glow: 'hover:shadow-[0_20px_40px_-24px_rgba(245,158,11,0.35)]' },
  Low: { badge: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 ring-emerald-200 dark:ring-emerald-500/20', bar: 'bg-emerald-400', glow: 'hover:shadow-[0_20px_40px_-24px_rgba(16,185,129,0.35)]' },
};

function PriorityEditor({ initial, onSave, onCancel }) {
  const [title, setTitle] = React.useState(initial?.title || '');
  const [description, setDescription] = React.useState(initial?.description || '');
  const [level, setLevel] = React.useState(initial?.level || 'Medium');

  return (
    <div className="rounded-2xl border border-indigo-200/70 dark:border-indigo-500/25 bg-indigo-50/40 dark:bg-indigo-500/[0.05] p-4 space-y-3 animate-rise">
      <input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Priority title"
        className="field-input font-medium"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        rows={2}
        className="field-input resize-none"
      />
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex gap-1.5">
          {['High', 'Medium', 'Low'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevel(lvl)}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold ring-1 transition-all duration-200 ${PRIORITY_STYLES[lvl].badge} ${level === lvl ? 'ring-2 scale-105' : 'opacity-50 hover:opacity-80'}`}
            >
              {lvl}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={onCancel} className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
            Cancel
          </button>
          <button
            onClick={() => title.trim() && onSave({ title: title.trim(), description: description.trim(), level })}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-500 hover:bg-indigo-600 shadow-sm shadow-indigo-500/30 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function PriorityCard({ priority, onToggle, onEdit, onDelete }) {
  const [editing, setEditing] = React.useState(false);
  const style = PRIORITY_STYLES[priority.level];

  if (editing) {
    return (
      <PriorityEditor
        initial={priority}
        onCancel={() => setEditing(false)}
        onSave={(data) => {
          onEdit({ ...priority, ...data });
          setEditing(false);
        }}
      />
    );
  }

  return (
    <div
      className={`group relative flex overflow-hidden rounded-2xl border transition-all duration-300 ${
        priority.done
          ? 'border-slate-100 dark:border-white/[0.05] bg-slate-50/50 dark:bg-white/[0.02]'
          : `border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-white/[0.03] hover:-translate-y-0.5 ${style.glow}`
      }`}
    >
      <span className={`w-1 shrink-0 ${priority.done ? 'bg-slate-200 dark:bg-white/10' : style.bar}`} />
      <div className="flex items-start gap-3 p-4 flex-1 min-w-0">
        <button
          onClick={() => onToggle(priority)}
          className={`mt-0.5 flex items-center justify-center w-5 h-5 rounded-full border-2 shrink-0 transition-all duration-200 ${
            priority.done ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-slate-300 dark:border-slate-600 hover:border-indigo-400'
          }`}
        >
          {priority.done && <IconCheck className="w-3 h-3 animate-check-pop" />}
        </button>
        <div className="flex-1 min-w-0">
          <p className={`font-semibold text-sm transition-colors ${priority.done ? 'text-slate-400 line-through decoration-slate-300' : 'text-slate-900 dark:text-white'}`}>
            {priority.title}
          </p>
          {priority.description && (
            <p className={`mt-0.5 text-xs leading-relaxed ${priority.done ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400'}`}>{priority.description}</p>
          )}
          <span className={`inline-block mt-2.5 px-2 py-0.5 rounded-full text-[11px] font-semibold ring-1 ${style.badge}`}>
            {priority.level}
          </span>
        </div>
        <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button onClick={() => setEditing(true)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-indigo-500 transition-colors">
            <IconEdit className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => onDelete(priority)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-rose-500 transition-colors">
            <IconTrash className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function PrioritiesCard({ priorities, setPriorities }) {
  const [adding, setAdding] = React.useState(false);
  const atCap = priorities.length >= 3;
  const doneCount = priorities.filter((p) => p.done).length;

  const toggle = (p) => setPriorities((prev) => prev.map((x) => (x.id === p.id ? { ...x, done: !x.done } : x)));
  const edit = (updated) => setPriorities((prev) => prev.map((x) => (x.id === updated.id ? updated : x)));
  const del = (p) => setPriorities((prev) => prev.filter((x) => x.id !== p.id));
  const add = (data) => {
    setPriorities((prev) => [...prev, { id: uid(), done: false, ...data }]);
    setAdding(false);
  };

  return (
    <section className="surface surface-interactive h-full p-6 sm:p-7">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-bold text-[15px] text-slate-900 dark:text-white tracking-tight">Today's Priorities</h2>
          <p className="text-xs text-slate-400 mt-1">Focus on 3 things — the rest can wait.</p>
        </div>
        {priorities.length > 0 && (
          <span className="eyebrow bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-full shrink-0">
            {doneCount}/{priorities.length}
          </span>
        )}
      </div>
      <div className="space-y-3">
        {priorities.map((p) => (
          <PriorityCard key={p.id} priority={p} onToggle={toggle} onEdit={edit} onDelete={del} />
        ))}
        {adding && <PriorityEditor onCancel={() => setAdding(false)} onSave={add} />}
        {!adding && priorities.length === 0 && (
          <button
            onClick={() => setAdding(true)}
            className="w-full rounded-2xl border-2 border-dashed border-slate-200 dark:border-white/10 py-6 text-sm text-slate-400 hover:border-indigo-300 hover:text-indigo-500 transition-colors"
          >
            + Add your first priority
          </button>
        )}
        {!atCap && !adding && priorities.length > 0 && (
          <button
            onClick={() => setAdding(true)}
            className="w-full flex items-center justify-center gap-1.5 rounded-2xl border border-dashed border-slate-200 dark:border-white/10 py-3 text-xs font-semibold text-slate-400 hover:text-indigo-500 hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-colors"
          >
            <IconPlus className="w-3.5 h-3.5" /> Add priority
          </button>
        )}
      </div>
    </section>
  );
}
