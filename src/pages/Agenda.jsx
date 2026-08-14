import { useEffect, useMemo, useState } from 'react'
import { Plus, ChevronLeft, ChevronRight, Trash2, CalendarDays } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { Btn, Field, inputCls, Modal, Empty, Spinner, Tag } from '../lib/ui'
import { todayISO, fmtTime, WEEKDAYS, MONTHS } from '../lib/dates'

const PROCEDURES = ['Correção de orelha', 'Remodelação baby', 'Fragilização de cartilagem', 'Retorno / avaliação', 'Outro']
const STATUSES = [
  { key: 'agendado', label: 'Agendado', color: 'gold' },
  { key: 'concluido', label: 'Concluído', color: 'green' },
  { key: 'cancelado', label: 'Cancelado', color: 'rose' },
]

const BLANK = { patient_id: '', procedure: PROCEDURES[0], appointment_date: todayISO(), appointment_time: '', status: 'agendado', notes: '' }

export default function Agenda() {
  const [rows, setRows] = useState(null)
  const [patients, setPatients] = useState([])
  const [cursor, setCursor] = useState(() => { const d = new Date(); return { y: d.getFullYear(), m: d.getMonth() } })
  const [selected, setSelected] = useState(todayISO())
  const [editing, setEditing] = useState(null)

  const load = () =>
    supabase.from('appointments').select('*, patients(name)').order('appointment_date').order('appointment_time')
      .then(({ data }) => setRows(data ?? []))

  useEffect(() => {
    load()
    supabase.from('patients').select('id,name').order('name').then(({ data }) => setPatients(data ?? []))
  }, [])

  const byDate = useMemo(() => {
    const map = {}
    for (const e of rows ?? []) (map[e.appointment_date] ??= []).push(e)
    return map
  }, [rows])

  if (!rows) return <Spinner />

  const first = new Date(cursor.y, cursor.m, 1)
  const daysInMonth = new Date(cursor.y, cursor.m + 1, 0).getDate()
  const startPad = first.getDay()
  const cells = [
    ...Array.from({ length: startPad }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  const iso = (day) => `${cursor.y}-${String(cursor.m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  const dayEvents = byDate[selected] ?? []
  const [sy, sm, sd] = selected.split('-')

  async function save(e) {
    e.preventDefault()
    const payload = { ...editing, appointment_time: editing.appointment_time || null }
    delete payload.id
    delete payload.created_at
    delete payload.user_id
    delete payload.patients
    const query = editing.id
      ? supabase.from('appointments').update(payload).eq('id', editing.id)
      : supabase.from('appointments').insert(payload)
    const { error } = await query
    if (!error) { setEditing(null); setSelected(payload.appointment_date); load() }
  }

  async function remove(ev) {
    if (!confirm(`Apagar o atendimento de "${ev.patients?.name ?? 'paciente'}"?`)) return
    await supabase.from('appointments').delete().eq('id', ev.id)
    load()
  }

  function moveMonth(delta) {
    const d = new Date(cursor.y, cursor.m + delta, 1)
    setCursor({ y: d.getFullYear(), m: d.getMonth() })
  }

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight">Agenda</h1>
          <p className="text-sm text-mute">Atendimentos marcados</p>
        </div>
        <Btn onClick={() => setEditing({ ...BLANK, appointment_date: selected })} disabled={patients.length === 0}>
          <Plus size={16} /> Novo
        </Btn>
      </header>

      {patients.length === 0 && (
        <p className="rounded-2xl border border-dashed border-edge bg-panel px-4 py-3 text-sm text-mute">
          Cadastra uma paciente primeiro pra poder marcar atendimento.
        </p>
      )}

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        {/* calendário */}
        <section className="rounded-3xl border border-edge bg-panel p-4">
          <div className="mb-3 flex items-center justify-between px-1">
            <button onClick={() => moveMonth(-1)} className="rounded-lg p-1.5 text-mute hover:bg-raise hover:text-ink"><ChevronLeft size={18} /></button>
            <p className="font-display text-sm font-bold">{MONTHS[cursor.m]} {cursor.y}</p>
            <button onClick={() => moveMonth(1)} className="rounded-lg p-1.5 text-mute hover:bg-raise hover:text-ink"><ChevronRight size={18} /></button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {WEEKDAYS.map((w) => (
              <span key={w} className="py-1 text-[10px] font-bold uppercase text-mute">{w}</span>
            ))}
            {cells.map((day, i) => {
              if (!day) return <span key={`p${i}`} />
              const dISO = iso(day)
              const has = (byDate[dISO] ?? []).length > 0
              const isSel = dISO === selected
              const isToday = dISO === todayISO()
              return (
                <button
                  key={dISO}
                  onClick={() => setSelected(dISO)}
                  className={`relative mx-auto flex h-10 w-10 flex-col items-center justify-center rounded-xl text-sm transition-colors ${
                    isSel ? 'bg-gold font-bold text-night' : isToday ? 'bg-raise font-bold text-goldsoft' : 'hover:bg-raise'
                  }`}
                >
                  {day}
                  {has && <span className={`absolute bottom-1 h-1 w-1 rounded-full ${isSel ? 'bg-night' : 'bg-gold'}`} />}
                </button>
              )
            })}
          </div>
        </section>

        {/* atendimentos do dia */}
        <section className="rounded-3xl border border-edge bg-panel p-5">
          <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-mute">
            {sd}/{sm}/{sy}
          </h2>
          {dayEvents.length === 0 ? (
            <Empty icon={CalendarDays} text="Nada marcado nesse dia. Toca em Novo pra agendar." />
          ) : (
            <ul className="space-y-2">
              {dayEvents.map((ev) => {
                const st = STATUSES.find((s) => s.key === ev.status)
                return (
                  <li key={ev.id} className="flex items-start gap-3 rounded-xl bg-raise px-3.5 py-3">
                    <span className="min-w-[46px] pt-0.5 font-display text-sm font-bold text-goldsoft">
                      {ev.appointment_time ? fmtTime(ev.appointment_time) : '—'}
                    </span>
                    <button onClick={() => setEditing({ ...ev, appointment_time: ev.appointment_time ?? '' })} className="flex-1 text-left">
                      <p className="text-sm font-medium">{ev.patients?.name ?? 'Paciente'}</p>
                      <p className="mt-0.5 text-xs text-mute">{ev.procedure}</p>
                      {st && <span className="mt-1.5 inline-block"><Tag color={st.color}>{st.label}</Tag></span>}
                    </button>
                    <button onClick={() => remove(ev)} className="rounded-lg p-1.5 text-mute hover:bg-rose-500/10 hover:text-rose-400">
                      <Trash2 size={15} />
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      </div>

      {editing && (
        <Modal title={editing.id ? 'Editar atendimento' : 'Novo atendimento'} onClose={() => setEditing(null)}>
          <form onSubmit={save} className="space-y-4">
            <Field label="Paciente *">
              <select required className={inputCls} value={editing.patient_id} onChange={(e) => setEditing({ ...editing, patient_id: e.target.value })}>
                <option value="" disabled>selecionar…</option>
                {patients.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </Field>
            <Field label="Procedimento *">
              <select required className={inputCls} value={editing.procedure} onChange={(e) => setEditing({ ...editing, procedure: e.target.value })}>
                {PROCEDURES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Data *">
                <input type="date" required className={inputCls} value={editing.appointment_date} onChange={(e) => setEditing({ ...editing, appointment_date: e.target.value })} />
              </Field>
              <Field label="Hora">
                <input type="time" className={inputCls} value={editing.appointment_time} onChange={(e) => setEditing({ ...editing, appointment_time: e.target.value })} />
              </Field>
            </div>
            <Field label="Status">
              <select className={inputCls} value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })}>
                {STATUSES.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
              </select>
            </Field>
            <Field label="Anotações">
              <textarea rows={3} className={inputCls} value={editing.notes ?? ''} onChange={(e) => setEditing({ ...editing, notes: e.target.value })} />
            </Field>
            <Btn type="submit" className="w-full">Salvar</Btn>
          </form>
        </Modal>
      )}
    </div>
  )
}
