import { useRef } from 'react'
import { X, AlertTriangle } from 'lucide-react'

export function Btn({ children, kind = 'primary', className = '', ...props }) {
  const styles = {
    primary: 'bg-gold text-night hover:bg-goldsoft shadow-[0_4px_16px_-4px_rgba(201,169,97,.5)]',
    ghost: 'bg-raise text-ink hover:bg-edge border border-edge',
    danger: 'bg-transparent text-rose-400 hover:bg-rose-500/10 border border-rose-500/30',
  }
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50 ${styles[kind]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

/* botão só de ícone — garante os 44px de alvo de toque que o dedo precisa */
export function IconBtn({ children, className = '', ...props }) {
  return (
    <button
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-mute transition-colors hover:bg-raise hover:text-ink disabled:opacity-25 ${className}`}
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
  'w-full min-h-11 rounded-xl border border-edge bg-night px-3.5 py-2.5 text-base sm:text-sm text-ink placeholder:text-mute/60 outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/20'

export function Erro({ children }) {
  if (!children) return null
  return (
    <p className="flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2.5 text-sm text-rose-300">
      <AlertTriangle size={16} className="mt-0.5 shrink-0" />
      <span>{children}</span>
    </p>
  )
}

export function Modal({ title, onClose, children }) {
  const abriuNoFundo = useRef(false)

  /* No celular o modal é uma folha embaixo, então metade da tela é "fundo".
     Só fecha se o toque COMEÇOU e TERMINOU no fundo — assim arrastar de dentro
     pra fora (selecionando texto, por exemplo) não apaga o que ela digitou. */
  function fundoDown(e) {
    abriuNoFundo.current = e.target === e.currentTarget
  }
  function fundoUp(e) {
    if (abriuNoFundo.current && e.target === e.currentTarget) onClose()
    abriuNoFundo.current = false
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center"
      onPointerDown={fundoDown}
      onPointerUp={fundoUp}
    >
      <div
        className="max-h-[90dvh] w-full overflow-y-auto overscroll-contain rounded-t-3xl border border-edge bg-panel p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:max-w-md sm:rounded-3xl sm:pb-5"
      >
        {/* alcinha do bottom sheet — indica que dá pra fechar puxando/tocando fora */}
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-edge sm:hidden" />
        <div className="mb-4 flex items-center justify-between gap-2">
          <h2 className="text-lg font-bold">{title}</h2>
          <IconBtn onClick={onClose} aria-label="Fechar" className="-mr-2">
            <X size={20} />
          </IconBtn>
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
