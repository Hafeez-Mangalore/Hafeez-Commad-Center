// Subtle toast notifications, stacked bottom-center.

function ToastStack({ toasts }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none px-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-center gap-2.5 rounded-2xl bg-slate-900/95 dark:bg-white/95 text-white dark:text-slate-900 text-sm font-medium pl-3 pr-4 py-3 shadow-[0_16px_36px_-12px_rgba(0,0,0,0.5)] backdrop-blur-sm animate-toast-in border border-white/10 dark:border-black/5 max-w-[90vw]"
        >
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white shrink-0">
            <IconCheck className="w-3 h-3" />
          </span>
          <span className="min-w-0">{t.message}</span>
        </div>
      ))}
    </div>
  );
}

function useToasts() {
  const [toasts, setToasts] = React.useState([]);

  const addToast = React.useCallback((message, duration) => {
    const id = uid();
    setToasts((prev) => [...prev, { id, message }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration || 3200);
  }, []);

  return { toasts, addToast };
}
