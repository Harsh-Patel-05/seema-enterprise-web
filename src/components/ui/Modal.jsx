import { useEffect } from 'react'
import { X } from 'lucide-react'
import { useScrollLock } from '../../hooks/useHelpers'

export default function Modal({ open, onClose, title, children, className = '' }) {
  useScrollLock(open)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-brand-black/60 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div
        className={`relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-t-md bg-white p-5 shadow-2xl animate-slide-up sm:max-w-lg sm:rounded-md sm:p-6 ${className}`}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-bold text-brand-black">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-sm p-1.5 text-brand-muted transition hover:bg-brand-grey hover:text-brand-black"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
