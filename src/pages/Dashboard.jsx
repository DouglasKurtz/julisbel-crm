import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, Users, ArrowRight, Ear } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/auth'
import { Spinner, Tag } from '../lib/ui'
import { todayISO, fmtTime, fmtDate } from '../lib/dates'

export default function Dashboard() {
  const { session } = useAuth()
  const [data, setData] = useState(null)

  useEffect(() => {
    const today = todayISO()
    Promise.all([
      supabase.from('appointments').select('*, patients(name)').eq('appointment_date', today).order('appointment_time'),
      supabase.from('appointments').select('*, patients(name)').gt('appointment_date', today).eq('status', 'agendado').order('appointment_date').order('appointment_time').limit(5),
      supabase.from('patients').select('id'),
    ]).then(([today, upcoming, patients]) =>
      setData({
        today: today.data ?? [],
        upcoming: upcoming.data ?? [],
        patients: patients.data ?? [],
      })
    )
  }, [])

  if (!data) return <Spinner />

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        <Stat icon={Users} label="Pacientes" value={data.patients.length} />
        <Stat icon={CalendarDays} label="Atendimentos hoje" value={data.today.length} />
        <div className="relative col-span-2 overflow-hidden rounded-3xl bg-gold p-4 text-night shadow-[0_10px_30px_-8px_rgba(201,169,97,.5)] lg:col-span-1">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10">
              <Ear size={15} />
            </span>
            <p className="text-xs font-semibold text-night/70">Próximos agendados</p>
          </div>
          <p className="mt-2 font-display text-2xl font-extrabold">{data.upcoming.length}</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card icon={CalendarDays} title="Hoje na agenda" to="/agenda">
          {data.today.length === 0 ? (
            <p className="py-5 text-center text-sm text-mute">Nada marcado pra hoje ✨</p>
          ) : (
            <ul className="space-y-2">
              {data.today.map((e) => (
                <li key={e.id} className="flex items-center gap-3 rounded-xl bg-raise px-3.5 py-2.5">
                  <span className="min-w-[42px] font-display text-sm font-bold text-goldsoft">
                    {e.appointment_time ? fmtTime(e.appointment_time) : '—'}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{e.patients?.name ?? 'Paciente'}</p>
                    <p className="truncate text-xs text-mute">{e.procedure}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card icon={CalendarDays} title="Próximos atendimentos" to="/agenda">
          {data.upcoming.length === 0 ? (
            <p className="py-5 text-center text-sm text-mute">Nenhum agendamento futuro ainda.</p>
          ) : (
            <ul className="space-y-2">
              {data.upcoming.map((e) => (
                <li key={e.id} className="flex items-center gap-3 rounded-xl bg-raise px-3.5 py-2.5">
                  <span className="min-w-[52px] text-xs font-bold text-mute">{fmtDate(e.appointment_date)}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{e.patients?.name ?? 'Paciente'}</p>
                    <p className="truncate text-xs text-mute">{e.procedure}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <section className="flex items-center justify-between rounded-3xl border border-edge bg-panel p-5">
        <div>
          <p className="font-display text-sm font-bold">Julisbel Kurtz</p>
          <p className="text-xs text-mute">{session?.user?.email}</p>
        </div>
        <Link to="/pacientes" className="flex items-center gap-1 text-xs font-semibold text-goldsoft hover:underline">
          ver pacientes <ArrowRight size={13} />
        </Link>
      </section>
    </div>
  )
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between rounded-3xl border border-edge bg-panel p-4">
      <div>
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-raise text-goldsoft">
            <Icon size={15} />
          </span>
          <p className="text-xs font-semibold text-mute">{label}</p>
        </div>
        <p className="mt-2 font-display text-2xl font-extrabold">{value}</p>
      </div>
    </div>
  )
}

function Card({ icon: Icon, title, to, children }) {
  return (
    <section className="rounded-3xl border border-edge bg-panel p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-mute">
          <Icon size={15} /> {title}
        </h2>
        <Link to={to} className="flex items-center gap-1 text-xs font-semibold text-goldsoft hover:underline">
          ver tudo <ArrowRight size={13} />
        </Link>
      </div>
      {children}
    </section>
  )
}
