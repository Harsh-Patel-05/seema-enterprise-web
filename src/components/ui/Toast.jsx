import { CheckCircle2, Info, X } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export default function Toast() {
  const { toasts, dismissToast } = useApp()
  if (!toasts.length) return null

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[min(100%-2rem,360px)] flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="toast-enter pointer-events-auto flex items-start gap-3 border border-brand-soft bg-white px-4 py-3 shadow-lg"
        >
          {toast.type === 'info' ? (
            <Info className="mt-0.5 shrink-0 text-brand-muted" size={18} />
          ) : (
            <CheckCircle2 className="mt-0.5 shrink-0 text-brand-red" size={18} />
          )}
          <p className="flex-1 text-sm font-medium text-brand-black">{toast.message}</p>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            className="rounded-sm p-1 text-brand-muted hover:bg-brand-grey"
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}
