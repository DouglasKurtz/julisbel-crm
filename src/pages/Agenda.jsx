import { useEffect, useMemo, useState } from 'react'
import { Plus, ChevronLeft, ChevronRight, Trash2, CalendarDays, Phone, RotateCw } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { Btn, IconBtn, Field, inputCls, Modal, Empty, Spinner, Tag, Erro } from '../lib/ui'
import { todayISO, fmtTime, WEEKDAYS, MONTHS } from '../lib/dates'
import { PAYMENTS, brl } from '../lib/patients'
import { waLink, MENSAGENS, preencher } from '../lib/whatsapp'

const PROCEDURES = ['Correção de orelha', 'Remodelação baby', 'Fragilização de cartilagem', 'Retorno / avaliação', 'Outro']
const STATUSES = [
  { key: 'agendado', label: 'Agendado', color: 'gold' },
  { key: 'concluido', label: 'Concluído', color: 'green' },
  { key: 'cancelado', label: 'Cancelado', color: 'rose' },
]

const BLANK = {
  patient_id: '', procedure: PROCEDURES[0], appointment_date: todayISO(), appointment_time: '',
  status: 'agendado', price: '', payment_method: '', paid: false, notes: '',
}

// o formulário não aceita null nos campos controlados
const paraForm = (ev) => ({
  ...ev,
  appointment_time: (ev.appointment_time ?? '').slice(0, 5),
  price: ev.price ?? '',
  payment_method: ev.payment_method ?? '',
  paid: ev.paid ?? false,
  notes: ev.notes ?? '',
})

// soma dias a uma data ISO sem depender de fuso
function somaDias(iso, dias) {
  const [y, m, d] = iso.split('-').map(Number)
  const dt = new Date(y, m - 1, d + dias)
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`
}

export default function Agenda() {
  const [rows, setRows] = useState(null)
  const [patients, setPatients] = useState([])
  const [cursor, setCursor] = useState(() => { const d = new Date(); return { y: d.getFullYear(), m: d.getMonth() } })
  const [selected, setSelected] = useState(todayISO())
  const [editing, setEditing] = useState(null)
  const [busy, setBusy] = useState(false)
  const [erro, setErro] = useState(null)

  const load = () =>
    supabase.from('appointments').select('*, patients(name,phone)').order('appointment_date').order('appointment_time')
      .then(({ data }) => setRows(data ?? []))

  useEffect(() => {
    load()
    supabase.from('patients').select('id,name,phone').order('name').then(({ data }) => setPatients(data ?? []))
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
  const hoje = todayISO()
  const mesDeHoje = cursor.y === Number(hoje.slice(0, 4)) && cursor.m === Number(hoje.slice(5, 7)) - 1

  // dois atendimentos no mesmo horário: ela atende sozinha, isso é sempre erro
  const conflito =
    editing?.appointment_time &&
    (byDate[editing.appointment_date] ?? []).some(
      (e) => e.id !== editing.id && e.appointment_time === editing.appointment_time && e.status !== 'cancelado'
    )

  async function save(e) {
    e.preventDefault()
    if (busy) return
    setBusy(true)
    setErro(null)
    const payload = {
      ...editing,
      appointment_time: editing.appointment_time || null,
      price: editing.price === '' || editing.price == null ? null : Number(editing.price),
      payment_method: editing.payment_method || null,
    }
    delete payload.id
    delete payload.created_at
    delete payload.user_id
    delete payload.patients
    const query = editing.id
      ? supabase.from('appointments').update(payload).eq('id', editing.id)
      : supabase.from('appointments').insert(payload)
    const { error } = await query
    setBusy(false)
    if (error) { setErro('Não deu pra salvar. Confere a internet e tenta de novo.'); return }
    setEditing(null)
    setSelected(payload.appointment_date)
    // agendou pro mês seguinte: o calendário tem que ir junto, senão "some"
    const [ay, am] = payload.appointment_date.split('-').map(Number)
    setCursor({ y: ay, m: am - 1 })
    load()
  }

  async function remove(ev) {
    if (!confirm(`Apagar o atendimento de "${ev.patients?.name ?? 'paciente'}"?`)) return
    const { error } = await supabase.from('appointments').delete().eq('id', ev.id)
    if (error) setErro('Não deu pra apagar. Tenta de novo.')
    else load()
  }

  // fluxo mais repetido dela: bebê volta toda semana
  function marcarRetorno(ev, dias) {
    setErro(null)
    setEditing({
      ...BLANK,
      patient_id: ev.patient_id,
      procedure: ev.procedure,
      appointment_date: somaDias(ev.appointment_date, dias),
      appointment_time: (ev.appointment_time ?? '').slice(0, 5),
    })
  }

  function moveMonth(delta) {
    const d = new Date(cursor.y, cursor.m + delta, 1)
    setCursor({ y: d.getFullYear(), m: d.getMonth() })
  }

  function irPraHoje() {
    const d = new Date()
    setCursor({ y: d.getFullYear(), m: d.getMonth() })
    setSelected(hoje)
  }

  const listaDoDia = (
    <section className="rounded-3xl border border-edge bg-panel p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-sm font-bold uppercase tracking-wider text-mute">
          {selected === hoje ? 'Hoje' : `${sd}/${sm}/${sy}`}
        </h2>
        {selected !== hoje && (
          <button onClick={irPraHoje} className="min-h-11 px-2 text-xs font-semibold text-goldsoft">
            ir pra hoje
          </button>
        )}
      </div>
      {dayEvents.length === 0 ? (
        <Empty icon={CalendarDays} text="Nada marcado nesse dia. Toca em Novo pra agendar." />
      ) : (
        <ul className="space-y-2">
          {dayEvents.map((ev) => {
            const st = STATUSES.find((s) => s.key === ev.status)
            const wa = waLink(ev.patients?.phone)
            return (
              <li key={ev.id} className="rounded-xl bg-raise p-3">
                <div className="flex items-start gap-3">
                  <span className="min-w-[46px] pt-0.5 text-sm font-bold text-goldsoft">
                    {ev.appointment_time ? fmtTime(ev.appointment_time) : '—'}
                  </span>
                  <button
                    onClick={() => { setErro(null); setEditing(paraForm(ev)) }}
                    className="min-w-0 flex-1 text-left"
                  >
                    <p className="text-sm font-medium">{ev.patients?.name ?? 'Paciente'}</p>
                    <p className="mt-0.5 text-xs text-mute">{ev.procedure}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                      {st && <Tag color={st.color}>{st.label}</Tag>}
                      {ev.price != null && (
                        <Tag color={ev.paid ? 'green' : 'amber'}>
                          {brl(ev.price)}{ev.paid ? ' recebido' : ' a receber'}
                        </Tag>
                      )}
                    </div>
                  </button>
                </div>
                {/* ações separadas do corpo: antes a lixeira ficava colada e o polegar errava */}
                <div className="mt-2 flex items-center gap-1 border-t border-edge/60 pt-1">
                  {wa && (
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-goldsoft"
                    >
                      <Phone size={13} /> WhatsApp
                    </a>
                  )}
                  <button
                    onClick={() => marcarRetorno(ev, 7)}
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-mute"
                  >
                    <RotateCw size={13} /> Retorno 7d
                  </button>
                  <button
                    onClick={() => remove(ev)}
                    aria-label={`Apagar atendimento de ${ev.patients?.name ?? 'paciente'}`}
                    className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-lg text-rose-400/80"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )

  const calendario = (
    <section className="rounded-3xl border border-edge bg-panel p-3 sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-1">
        <IconBtn onClick={() => moveMonth(-1)} aria-label="Mês anterior">
          <ChevronLeft size={20} />
        </IconBtn>
        <button onClick={irPraHoje} className="min-h-11 flex-1 text-sm font-bold" title="Ir pra hoje">
          {MONTHS[cursor.m]} {cursor.y}
        </button>
        <IconBtn onClick={() => moveMonth(1)} aria-label="Próximo mês">
          <ChevronRight size={20} />
        </IconBtn>
      </div>
      <div className="grid grid-cols-7 gap-0.5 text-center sm:gap-1">
        {WEEKDAYS.map((w) => (
          <span key={w} className="py-1 text-[10px] font-bold uppercase text-mute">{w}</span>
        ))}
        {cells.map((day, i) => {
          if (!day) return <span key={`p${i}`} />
          const dISO = iso(day)
          const has = (byDate[dISO] ?? []).length > 0
          const isSel = dISO === selected
          const isToday = dISO === hoje
          return (
            <button
              key={dISO}
              onClick={() => setSelected(dISO)}
              /* largura total da célula em vez de 40px fixos: em 360px os 7 dias
                 estouravam o cartão e davam rolagem lateral na página */
              className={`relative flex aspect-square w-full min-h-10 flex-col items-center justify-center rounded-xl text-sm transition-colors ${
                isSel ? 'bg-gold font-bold text-night' : isToday ? 'bg-raise font-bold text-goldsoft' : ''
              }`}
            >
              {day}
              {has && <span className={`absolute bottom-1 h-1 w-1 rounded-full ${isSel ? 'bg-night' : 'bg-gold'}`} />}
            </button>
          )
        })}
      </div>
      {!mesDeHoje && (
        <button onClick={irPraHoje} className="mt-2 min-h-11 w-full text-xs font-semibold text-goldsoft">
          voltar pro mês de hoje
        </button>
      )}
    </section>
  )

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Agenda</h1>
          <p className="text-sm text-mute">Atendimentos marcados</p>
        </div>
        <Btn
          className="w-full sm:w-auto"
          onClick={() => { setErro(null); setEditing({ ...BLANK, appointment_date: selected }) }}
          disabled={patients.length === 0}
        >
          <Plus size={16} /> Novo atendimento
        </Btn>
      </header>

      {patients.length === 0 && (
        <p className="rounded-2xl border border-dashed border-edge bg-panel px-4 py-3 text-sm text-mute">
          Cadastra uma paciente primeiro pra poder marcar atendimento.
        </p>
      )}

      <Erro>{erro}</Erro>

      {/* No celular a pergunta é "quem vem agora", não "que mês é": lista primeiro,
          calendário embaixo. No desktop o calendário volta pra esquerda. */}
      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className="contents lg:block">
          <div className="order-2 lg:order-none">{calendario}</div>
        </div>
        <div className="order-1 lg:order-none">{listaDoDia}</div>
      </div>

      {editing && (
        <Modal title={editing.id ? 'Editar atendimento' : 'Novo atendimento'} onClose={() => setEditing(null)}>
          <form onSubmit={save} className="space-y-4">
            <Field label="Paciente *">
              <select
                required
                className={inputCls}
                value={editing.patient_id}
                onChange={(e) => setEditing({ ...editing, patient_id: e.target.value })}
              >
                <option value="">selecionar…</option>
                {patients.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </Field>
            <Field label="Procedimento *">
              <select
                required
                className={inputCls}
                value={editing.procedure}
                onChange={(e) => setEditing({ ...editing, procedure: e.target.value })}
              >
                {PROCEDURES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </Field>
            {/* data e hora lado a lado só a partir de 380px: em tela menor o campo de data vaza */}
            <div className="grid grid-cols-1 gap-3 min-[380px]:grid-cols-2">
              <Field label="Data *">
                <input
                  type="date"
                  required
                  className={inputCls}
                  value={editing.appointment_date}
                  onChange={(e) => setEditing({ ...editing, appointment_date: e.target.value })}
                />
              </Field>
              <Field label="Hora">
                <input
                  type="time"
                  className={inputCls}
                  value={editing.appointment_time}
                  onChange={(e) => setEditing({ ...editing, appointment_time: e.target.value })}
                />
              </Field>
            </div>
            {conflito && (
              <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2.5 text-sm text-amber-300">
                Já tem outro atendimento nesse horário. Dá pra salvar assim mesmo, é só conferir.
              </p>
            )}
            <Field label="Status">
              <select
                className={inputCls}
                value={editing.status}
                onChange={(e) => setEditing({ ...editing, status: e.target.value })}
              >
                {STATUSES.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
              </select>
            </Field>

            <div className="grid grid-cols-1 gap-3 min-[380px]:grid-cols-2">
              <Field label="Valor">
                <input
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  min="0"
                  placeholder="0,00"
                  className={inputCls}
                  value={editing.price ?? ''}
                  onChange={(e) => setEditing({ ...editing, price: e.target.value })}
                />
              </Field>
              <Field label="Pagamento">
                <select
                  className={inputCls}
                  value={editing.payment_method ?? ''}
                  onChange={(e) => setEditing({ ...editing, payment_method: e.target.value })}
                >
                  <option value="">não definido</option>
                  {PAYMENTS.map((p) => <option key={p.key} value={p.key}>{p.label}</option>)}
                </select>
              </Field>
            </div>
            <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-edge bg-night px-3.5">
              <input
                type="checkbox"
                checked={!!editing.paid}
                onChange={(e) => setEditing({ ...editing, paid: e.target.checked })}
                className="h-5 w-5 accent-[#c4a880]"
              />
              <span className="text-sm">Já recebi este valor</span>
            </label>
            <Field label="Anotações">
              <textarea
                rows={3}
                className={inputCls}
                value={editing.notes ?? ''}
                onChange={(e) => setEditing({ ...editing, notes: e.target.value })}
              />
            </Field>
            {/* mensagens do contexto de atendimento: confirmar véspera, lembrar retorno, cuidados */}
            {(() => {
              const pac = patients.find((p) => p.id === editing.patient_id)
              const link = waLink(pac?.phone)
              const doAtendimento = MENSAGENS.filter((m) => m.contexto === 'atendimento')
              if (!link || doAtendimento.length === 0) return null
              const [ay, am, ad] = (editing.appointment_date ?? '').split('-')
              const dados = {
                nome: pac?.name,
                data: ay ? `${ad}/${am}` : '',
                hora: (editing.appointment_time ?? '').slice(0, 5),
              }
              return (
                <section className="rounded-2xl border border-edge bg-night/40 p-3">
                  <h3 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-mute">
                    <Phone size={13} /> Mandar mensagem
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {doAtendimento.map((m) => (
                      <a
                        key={m.id}
                        href={waLink(pac.phone, preencher(m.texto, dados))}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={m.quando}
                        className="inline-flex min-h-11 items-center rounded-full border border-edge bg-raise px-3.5 text-xs font-semibold text-goldsoft"
                      >
                        {m.rotulo}
                      </a>
                    ))}
                  </div>
                </section>
              )
            })()}

            <Erro>{erro}</Erro>
            <Btn type="submit" className="w-full" disabled={busy}>
              {busy ? 'Salvando…' : 'Salvar'}
            </Btn>
          </form>
        </Modal>
      )}
    </div>
  )
}
