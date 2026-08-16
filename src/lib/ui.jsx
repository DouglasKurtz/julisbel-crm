import { X } from 'lucide-react'

export function Btn({ children, kind = 'primary', className = '', ...props }) {
  const styles = {
    primary: 'bg-gold text-night hover:bg-goldsoft shadow-[0_4px_16px_-4px_rgba(201,169,97,.5)]',
    ghost: 'bg-raise text-ink hover:bg-edge border border-edge',
    danger: 'bg-transparent text-rose-400 hover:bg-rose-500/10 border border-rose-500/30',
  }
  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50 ${styles[kind]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-mute">{label}</span>
      {children}
    </label>
  )
}

export const inputCls =
  'w-full rounded-xl border border-edge bg-night px-3.5 py-2.5 text-sm text-ink placeholder:text-mute/60 outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/20'

export function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center" onClick={onClose}>
      <div
        className="max-h-[92dvh] w-full overflow-y-auto rounded-t-3xl border border-edge bg-panel p-5 sm:max-w-md sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-mute hover:bg-raise hover:text-ink">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export function Empty({ icon: Icon, text }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-edge py-10 text-center">
      {Icon && <Icon size={28} className="text-mute/50" />}
      <p className="max-w-[240px] text-sm text-mute">{text}</p>
    </div>
  )
}

export function Tag({ color = 'zinc', children }) {
  const map = {
    zinc: 'bg-zinc-500/15 text-zinc-300',
    gold: 'bg-gold/15 text-goldsoft',
    amber: 'bg-amber-500/15 text-amber-300',
    sky: 'bg-sky-500/15 text-sky-300',
    green: 'bg-emerald-500/15 text-emerald-300',
    rose: 'bg-rose-500/15 text-rose-300',
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${map[color]}`}>
      {children}
    </span>
  )
}

export function Spinner() {
  return (
    <div className="flex justify-center py-16">
      <div className="h-7 w-7 animate-spin rounded-full border-2 border-edge border-t-gold" />
    </div>
  )
}
