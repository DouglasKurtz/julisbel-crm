import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, CalendarDays, LogOut, Search, X, Phone } from 'lucide-react'
import { AuthProvider, useAuth } from './lib/auth'
import { supabase } from './lib/supabase'
import { WEEKDAYS, MONTHS } from './lib/dates'
import { IconBtn } from './lib/ui'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Patients from './pages/Patients'
import Agenda from './pages/Agenda'

const NAV = [
  { to: '/', label: 'Painel', icon: LayoutDashboard },
  { to: '/pacientes', label: 'Pacientes', icon: Users },
  { to: '/agenda', label: 'Agenda', icon: CalendarDays },
]

function usePatientSearch() {
  const [q, setQ] = useState('')
  const [items, setItems] = useState([])

  async function load() {
    const { data } = await supabase.from('patients').select('id,name,phone')
    setItems(data ?? [])
  }

  const termo = q.trim().toLowerCase()
  const results =
    termo.length > 1
      ? items
          .filter((i) => i.name.toLowerCase().includes(termo) || (i.phone ?? '').includes(q.trim()))
          .slice(0, 8)
      : []

  return { q, setQ, load, results }
}

function Resultado({ p, onPick }) {
  return (
    <button
      onClick={() => onPick(p)}
      className="flex min-h-12 w-full items-center justify-between gap-3 px-4 py-2.5 text-left hover:bg-raise"
    >
      <span className="min-w-0 flex-1 truncate text-sm">{p.name}</span>
      {p.phone && (
        <span className="flex shrink-0 items-center gap-1 text-xs text-mute">
          <Phone size={11} /> {p.phone}
        </span>
      )}
    </button>
  )
}

/* Desktop: pílula de busca com resultados suspensos. */
function GlobalSearch() {
  const { q, setQ, load, results } = usePatientSearch()
  const [open, setOpen] = useState(false)
  const nav = useNavigate()
  const box = useRef(null)

  useEffect(() => {
    const close = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  function pick(p) {
    nav('/pacientes?q=' + encodeURIComponent(p.name))
    setQ('')
    setOpen(false)
  }

  return (
    <div ref={box} className="relative w-full max-w-[300px] max-md:hidden">
      <div className="flex items-center gap-2 rounded-full border border-edge bg-panel px-4 py-2.5">
        <Search size={15} className="shrink-0 text-mute" />
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true) }}
          onFocus={() => { load(); setOpen(true) }}
          placeholder="Buscar paciente…"
          className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-mute/60"
        />
      </div>
      {open && results.length > 0 && (
        <div className="absolute right-0 top-12 z-50 w-full overflow-hidden rounded-2xl border border-edge bg-panel shadow-xl shadow-black/40">
          {results.map((p) => <Resultado key={p.id} p={p} onPick={pick} />)}
        </div>
      )}
    </div>
  )
}

/* Celular: a pílula não cabe no cabeçalho, então vira ícone que abre busca em tela cheia. */
function MobileSearch() {
  const { q, setQ, load, results } = usePatientSearch()
  const [open, setOpen] = useState(false)
  const nav = useNavigate()
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) { load(); inputRef.current?.focus() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  function pick(p) {
    nav('/pacientes?q=' + encodeURIComponent(p.name))
    setQ('')
    setOpen(false)
  }

  return (
    <>
      <IconBtn onClick={() => setOpen(true)} aria-label="Buscar paciente" className="md:hidden">
        <Search size={19} />
      </IconBtn>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-night md:hidden">
          <div className="flex items-center gap-2 border-b border-edge px-3 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
            <Search size={18} className="ml-2 shrink-0 text-mute" />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar paciente…"
              autoCapitalize="words"
              className="w-full bg-transparent py-2 text-base text-ink outline-none placeholder:text-mute/60"
            />
            <IconBtn onClick={() => { setOpen(false); setQ('') }} aria-label="Fechar busca">
              <X size={20} />
            </IconBtn>
          </div>
          <div className="flex-1 overflow-y-auto overscroll-contain">
            {results.map((p) => <Resultado key={p.id} p={p} onPick={pick} />)}
            {q.trim().length > 1 && results.length === 0 && (
              <p className="px-4 py-10 text-center text-sm text-mute">Nenhuma paciente encontrada.</p>
            )}
            {q.trim().length <= 1 && (
              <p className="px-4 py-10 text-center text-sm text-mute">Digite pelo menos 2 letras.</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

function Logo({ size = 'lg' }) {
  const s = size === 'lg' ? 'h-11 w-11 rounded-2xl' : 'h-9 w-9 rounded-xl'
  const img = size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'
  return (
    <div className={`flex ${s} shrink-0 items-center justify-center border border-edge bg-panel`}>
      <img src="/simbolo.png" alt="" className={`${img} object-contain`} />
    </div>
  )
}

function Shell() {
  const { session, loading } = useAuth()

  if (loading)
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#050705]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-edge border-t-gold" />
      </div>
    )

  if (!session) return <Login />

  const now = new Date()

  return (
    <div className="min-h-dvh bg-[#050705] text-ink md:p-4">
      <div className="mx-auto flex min-h-dvh max-w-[1400px] gap-2 bg-night md:min-h-[calc(100dvh-2rem)] md:rounded-[2rem] md:border md:border-edge md:p-4">
        {/* barra lateral flutuante (desktop) */}
        <aside className="hidden shrink-0 flex-col items-center gap-4 self-start py-2 md:sticky md:top-8 md:flex">
          <Logo />
          <nav className="flex flex-col gap-1.5 rounded-full border border-edge bg-panel p-2">
            {NAV.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                title={label}
                className={({ isActive }) =>
                  `flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                    isActive
                      ? 'bg-gold text-night shadow-[0_4px_14px_-2px_rgba(201,169,97,.55)]'
                      : 'text-mute hover:bg-raise hover:text-ink'
                  }`
                }
              >
                <Icon size={18} />
              </NavLink>
            ))}
          </nav>
          <div className="flex flex-col items-center gap-1.5 rounded-full border border-edge bg-panel p-2">
            <button
              onClick={() => supabase.auth.signOut()}
              title="Sair"
              className="flex h-10 w-10 items-center justify-center rounded-full text-mute transition-colors hover:bg-raise hover:text-ink"
            >
              <LogOut size={17} />
            </button>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 text-sm font-bold text-goldsoft">
              J
            </div>
          </div>
        </aside>

        {/* conteúdo — o padding de baixo abre espaço pra barra fixa + área segura do iPhone */}
        <div className="min-w-0 flex-1 px-4 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-4 md:px-4 md:pb-4 md:pt-2">
          <header className="mb-5 flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="md:hidden"><Logo size="sm" /></span>
              <div className="min-w-0">
                <h1 className="truncate text-xl font-bold tracking-tight">Olá, Julisbel!</h1>
                <p className="truncate text-xs text-mute">
                  {WEEKDAYS[now.getDay()]}, {now.getDate()} de {MONTHS[now.getMonth()].toLowerCase()}
                </p>
              </div>
            </div>
            <GlobalSearch />
            {/* no celular a busca e o sair vivem aqui — a lateral não existe */}
            <div className="flex shrink-0 items-center md:hidden">
              <MobileSearch />
              <IconBtn onClick={() => supabase.auth.signOut()} aria-label="Sair">
                <LogOut size={18} />
              </IconBtn>
            </div>
          </header>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pacientes" element={<Patients />} />
            <Route path="/agenda" element={<Agenda />} />
          </Routes>
        </div>
      </div>

      {/* nav mobile */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-edge bg-panel/95 pb-[max(env(safe-area-inset-bottom),8px)] pt-1.5 backdrop-blur md:hidden">
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex min-h-13 flex-1 flex-col items-center justify-center gap-1 rounded-lg py-1.5 text-[11px] font-medium transition-colors ${
                isActive ? 'text-goldsoft' : 'text-mute'
              }`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </AuthProvider>
  )
}
