import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, Users, ArrowRight, Ear, Wallet, PhoneMissed, Sprout, Phone } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/auth'
import { Spinner, Tag } from '../lib/ui'
import { todayISO, fmtTime, fmtDate, MONTHS } from '../lib/dates'
import { sourceLabel, brl } from '../lib/patients'
import { waLink } from '../lib/whatsapp'

export default function Dashboard() {
  const { session } = useAuth()
  const [data, setData] = useState(null)

  useEffect(() => {
    const today = todayISO()
    const inicioMes = today.slice(0, 8) + '01'
    const d = new Date()
    const fimMes = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()).padStart(2, '0')}`

    Promise.all([
      supabase.from('appointments').select('*, patients(name)').eq('appointment_date', today).order('appointment_time').order('created_at'),
      supabase.from('appointments').select('*, patients(name)').gt('appointment_date', today).eq('status', 'agendado').order('appointment_date').order('appointment_time').limit(5),
      supabase.from('patients').select('id,stage_id,source'),
      supabase.from('stages').select('id,label').order('position'),
      // dinheiro do mês corrente
      supabase.from('appointments').select('price,paid,status').gte('appointment_date', inicioMes).lte('appointment_date', fimMes).not('price', 'is', null),
      // quem já passou da data combinada e não voltou
      supabase.from('patients').select('id,name,phone,next_contact').not('next_contact', 'is', null).lte('next_contact', today).order('next_contact').limit(8),
    ]).then(([today, upcoming, patients, stages, mes, atrasadas]) =>
      setData({
        today: today.data ?? [],
        upcoming: upcoming.data ?? [],
        patients: patients.data ?? [],
        stages: stages.data ?? [],
        mes: mes.data ?? [],
        atrasadas: atrasadas.data ?? [],
      })
    )
  }, [])

  if (!data) return <Spinner />

  const stageCounts = data.stages.map((s) => ({ ...s, count: data.patients.filter((p) => p.stage_id === s.id).length }))

  const validos = data.mes.filter((a) => a.status !== 'cancelado')
  const recebido = validos.filter((a) => a.paid).reduce((s, a) => s + Number(a.price), 0)
  const aReceber = validos.filter((a) => !a.paid).reduce((s, a) => s + Number(a.price), 0)
  const mesNome = MONTHS[new Date().getMonth()].toLowerCase()

  const origens = Object.entries(
    data.patients.reduce((acc, p) => {
      if (p.source) acc[p.source] = (acc[p.source] ?? 0) + 1
      return acc
    }, {})
  ).sort((a, b) => b[1] - a[1])

  return (
    <div className="space-y-4">
      {/* No celular a primeira coisa tem que ser quem vem hoje, não os contadores:
          é pra isso que ela abre o app entre um atendimento e outro. */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card icon={CalendarDays} title="Hoje na agenda" to="/agenda">
          {data.today.length === 0 ? (
            <p className="py-5 text-center text-sm text-mute">Nada marcado pra hoje ✨</p>
          ) : (
            <ul className="space-y-2">
              {data.today.map((e) => {
                const feito = e.status === 'concluido' || e.status === 'cancelado'
                return (
                  <li
                    key={e.id}
                    className={`flex items-center gap-3 rounded-xl bg-raise px-3.5 py-2.5 ${feito ? 'opacity-45' : ''}`}
                  >
                    <span className={`min-w-[42px] text-sm font-bold ${feito ? 'text-mute' : 'text-goldsoft'}`}>
                      {e.appointment_time ? fmtTime(e.appointment_time) : '—'}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className={`truncate text-sm ${feito ? 'line-through' : ''}`}>{e.patients?.name ?? 'Paciente'}</p>
                      <p className="truncate text-xs text-mute">{e.procedure}</p>
                    </div>
                  </li>
                )
              })}
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

      {/* Quem passou da data combinada. Sem secretária, quem não é lembrado some. */}
      {data.atrasadas.length > 0 && (
        <section className="rounded-3xl border border-amber-500/30 bg-amber-500/5 p-4 sm:p-5">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amber-300">
            <PhoneMissed size={15} /> Precisam de um retorno
          </h2>
          <ul className="space-y-2">
            {data.atrasadas.map((p) => {
              const wa = waLink(p.phone)
              return (
                <li key={p.id} className="flex items-center gap-3 rounded-xl bg-raise px-3.5 py-2.5">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{p.name}</p>
                    <p className="text-xs text-mute">
                      {p.next_contact === todayISO() ? 'combinado pra hoje' : `desde ${fmtDate(p.next_contact)}`}
                    </p>
                  </div>
                  {wa && (
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-lg px-2 text-xs font-semibold text-goldsoft"
                    >
                      <Phone size={13} /> falar
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </section>
      )}

      {/* Dinheiro do mês: até agora ela não conseguia responder "quanto eu fiz?" */}
      <section className="rounded-3xl border border-edge bg-panel p-4 sm:p-5">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-mute">
          <Wallet size={15} /> Dinheiro de {mesNome}
        </h2>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-raise p-3">
            <p className="text-xl font-bold tabular-nums text-emerald-300">{brl(recebido) ?? 'R$ 0,00'}</p>
            <p className="mt-1 text-[11px] font-semibold text-mute">já recebido</p>
          </div>
          <div className="rounded-2xl bg-raise p-3">
            <p className="text-xl font-bold tabular-nums text-amber-300">{brl(aReceber) ?? 'R$ 0,00'}</p>
            <p className="mt-1 text-[11px] font-semibold text-mute">ainda a receber</p>
          </div>
        </div>
        {validos.length === 0 && (
          <p className="mt-3 text-xs text-mute">
            Põe o valor no atendimento, lá na Agenda, que ele aparece aqui.
          </p>
        )}
      </section>

      {origens.length > 0 && (
        <section className="rounded-3xl border border-edge bg-panel p-4 sm:p-5">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-mute">
            <Sprout size={15} /> De onde elas vêm
          </h2>
          <div className="flex flex-wrap gap-2">
            {origens.map(([key, n]) => (
              <span key={key} className="rounded-full bg-raise px-3 py-1.5 text-xs">
                <b className="tabular-nums">{n}</b> <span className="text-mute">{sourceLabel(key)}</span>
              </span>
            ))}
          </div>
        </section>
      )}

      <section className="rounded-3xl border border-edge bg-panel p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-mute">Pipeline de pacientes</h2>
          <Link to="/pacientes" className="flex min-h-11 items-center gap-1 text-xs font-semibold text-goldsoft">
            ver kanban <ArrowRight size={13} />
          </Link>
        </div>
        {/* colunas são criadas por ela: grade fixa estourava a tela com 5 etapas.
            Aqui cada bloco tem largura mínima e quebra em linhas conforme couber. */}
        <div className="grid grid-cols-2 gap-2 min-[420px]:grid-cols-3">
          {stageCounts.map((s) => (
            <Link key={s.id} to="/pacientes" className="rounded-2xl bg-raise p-3 text-center">
              <p className="text-xl font-bold">{s.count}</p>
              <p className="mt-1 break-words text-[11px] font-semibold leading-tight text-mute">{s.label}</p>
            </Link>
          ))}
        </div>
      </section>

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
          <p className="mt-2 text-2xl font-bold">{data.upcoming.length}</p>
        </div>
      </div>

      <section className="flex items-center justify-between gap-3 rounded-3xl border border-edge bg-panel p-4 sm:p-5">
        <div className="min-w-0">
          <p className="text-sm font-bold">Julisbel Kurtz</p>
          <p className="truncate text-xs text-mute">{session?.user?.email}</p>
        </div>
        <Link to="/pacientes" className="flex min-h-11 shrink-0 items-center gap-1 text-xs font-semibold text-goldsoft">
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
        <p className="mt-2 text-2xl font-bold">{value}</p>
      </div>
    </div>
  )
}

function Card({ icon: Icon, title, to, children }) {
  return (
    <section className="rounded-3xl border border-edge bg-panel p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-mute">
          <Icon size={15} /> {title}
        </h2>
        <Link to={to} className="flex min-h-11 items-center gap-1 pl-3 text-xs font-semibold text-goldsoft">
          ver tudo <ArrowRight size={13} />
        </Link>
      </div>
      {children}
    </section>
  )
}
