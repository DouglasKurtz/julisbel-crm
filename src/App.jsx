import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, CalendarDays, LogOut, Search } from 'lucide-react'
import { AuthProvider, useAuth } from './lib/auth'
import { supabase } from './lib/supabase'
import { WEEKDAYS, MONTHS } from './lib/dates'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Patients from './pages/Patients'
import Agenda from './pages/Agenda'

const NAV = [
  { to: '/', label: 'Painel', icon: LayoutDashboard },
  { to: '/pacientes', label: 'Pacientes', icon: Users },
  { to: '/agenda', label: 'Agenda', icon: CalendarDays },
]

function GlobalSearch() {
  const [q, setQ] = useState('')
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)
  const nav = useNavigate()
  const box = useRef(null)

  async function load() {
    const { data } = await supabase.from('patients').select('id,name')
    setItems((data ?? []).map((x) => ({ label: x.name, sub: 'Paciente', to: '/pacientes' })))
  }

  useEffect(() => {
    const close = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const results =
    q.trim().length > 1
      ? items.filter((i) => i.label.toLowerCase().includes(q.trim().toLowerCase())).slice(0, 6)
      : []

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
          {results.map((r, i) => (
            <button
              key={i}
              onClick={() => { nav(r.to); setQ(''); setOpen(false) }}
              className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm hover:bg-raise"
            >
              <span className="truncate">{r.label}</span>
              <span className="ml-3 shrink-0 text-[10px] font-bold uppercase tracking-wider text-goldsoft">{r.sub}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Logo({ size = 'lg' }) {
  const s = size === 'lg' ? 'h-11 w-11 rounded-2xl' : 'h-9 w-9 rounded-xl'
  const img = size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'
  return (
    <div className={`flex ${s} items-center justify-center border border-edge bg-panel`}>
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
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 font-display text-sm font-bold text-goldsoft">
              J
            </div>
          </div>
        </aside>

        {/* conteúdo */}
        <div className="min-w-0 flex-1 px-4 pb-28 pt-5 md:px-4 md:pb-4 md:pt-2">
          <header className="mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="md:hidden"><Logo size="sm" /></span>
              <div>
                <h1 className="font-display text-xl font-extrabold tracking-tight">Olá, Julisbel!</h1>
                <p className="text-xs text-mute">
                  {WEEKDAYS[now.getDay()]}, {now.getDate()} de {MONTHS[now.getMonth()].toLowerCase()}
                </p>
              </div>
            </div>
            <GlobalSearch />
          </header>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pacientes" element={<Patients />} />
            <Route path="/agenda" element={<Agenda />} />
          </Routes>
        </div>
      </div>

      {/* nav mobile */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-around border-t border-edge bg-panel/95 pb-[max(env(safe-area-inset-bottom),8px)] pt-2 backdrop-blur md:hidden">
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 rounded-lg px-2 py-1 text-[10px] font-medium ${
                isActive ? 'text-goldsoft' : 'text-mute'
              }`
            }
          >
            <Icon size={19} />
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
