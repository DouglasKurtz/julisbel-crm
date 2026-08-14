import { useEffect, useState } from 'react'
import { Plus, Phone, Search, Users, Cake } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { Btn, Field, inputCls, Modal, Empty, Spinner } from '../lib/ui'
import { fmtDate } from '../lib/dates'
import { STAGES } from '../lib/patients'

const BLANK = { name: '', phone: '', email: '', birth_date: '', stage: 'lead', notes: '' }

export default function Patients() {
  const [rows, setRows] = useState(null)
  const [editing, setEditing] = useState(null)
  const [q, setQ] = useState('')

  const load = () =>
    supabase.from('patients').select('*').order('name').then(({ data }) => setRows(data ?? []))

  useEffect(() => { load() }, [])

  async function save(e) {
    e.preventDefault()
    const payload = { ...editing, birth_date: editing.birth_date || null }
    delete payload.id
    delete payload.created_at
    delete payload.user_id
    const query = editing.id
      ? supabase.from('patients').update(payload).eq('id', editing.id)
      : supabase.from('patients').insert(payload)
    const { error } = await query
    if (!error) { setEditing(null); load() }
  }

  async function remove() {
    if (!confirm(`Apagar "${editing.name}"? Isso apaga também os atendimentos dela. Não tem volta.`)) return
    await supabase.from('patients').delete().eq('id', editing.id)
    setEditing(null)
    load()
  }

  if (!rows) return <Spinner />

  const filtered = q.trim()
    ? rows.filter((p) => p.name.toLowerCase().includes(q.trim().toLowerCase()) || (p.phone ?? '').includes(q.trim()))
    : rows

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl tracking-tight">Pacientes</h1>
          <p className="text-sm text-mute">Leads, acompanhamento e bebês</p>
        </div>
        <Btn onClick={() => setEditing({ ...BLANK })}>
          <Plus size={16} /> Novo
        </Btn>
      </header>

      <div className="flex items-center gap-2 rounded-2xl border border-edge bg-panel px-4 py-3">
        <Search size={16} className="shrink-0 text-mute" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por nome ou telefone…"
          className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-mute/60"
        />
      </div>

      {filtered.length === 0 ? (
        <Empty icon={Users} text={rows.length === 0 ? 'Nenhuma paciente ainda. Cadastra a primeira!' : 'Nenhuma paciente encontrada.'} />
      ) : (
        <div className="flex snap-x gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible">
          {STAGES.map((st) => {
            const cards = filtered.filter((p) => p.stage === st.key)
            return (
              <div key={st.key} className={`w-[280px] shrink-0 snap-start rounded-2xl border-t-2 ${st.color} bg-panel p-3 lg:w-auto`}>
                <p className="mb-0.5 flex items-center justify-between px-1 text-xs font-bold uppercase tracking-wider text-mute">
                  {st.label}
                  <span className="rounded-full bg-raise px-2 py-0.5">{cards.length}</span>
                </p>
                <p className="mb-3 px-1 text-[11px] text-mute/70">{st.hint}</p>
                <div className="space-y-2">
                  {cards.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setEditing({ ...p, birth_date: p.birth_date ?? '' })}
                      className="block w-full rounded-xl border border-edge bg-raise p-3 text-left transition-colors hover:border-gold/40"
                    >
                      <p className="text-sm font-semibold">{p.name}</p>
                      <div className="mt-1.5 space-y-0.5">
                        {p.phone && (
                          <p className="flex items-center gap-1.5 text-xs text-mute"><Phone size={11} /> {p.phone}</p>
                        )}
                        {p.birth_date && (
                          <p className="flex items-center gap-1.5 text-xs text-mute"><Cake size={11} /> {fmtDate(p.birth_date)}</p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {editing && (
        <Modal title={editing.id ? 'Editar paciente' : 'Nova paciente'} onClose={() => setEditing(null)}>
          <form onSubmit={save} className="space-y-4">
            <Field label="Nome *">
              <input required className={inputCls} value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="WhatsApp">
                <input className={inputCls} placeholder="48 99999-9999" value={editing.phone ?? ''} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} />
              </Field>
              <Field label="Nascimento">
                <input type="date" className={inputCls} value={editing.birth_date ?? ''} onChange={(e) => setEditing({ ...editing, birth_date: e.target.value })} />
              </Field>
            </div>
            <Field label="E-mail">
              <input type="email" className={inputCls} value={editing.email ?? ''} onChange={(e) => setEditing({ ...editing, email: e.target.value })} />
            </Field>
            <Field label="Etapa">
              <select className={inputCls} value={editing.stage} onChange={(e) => setEditing({ ...editing, stage: e.target.value })}>
                {STAGES.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
              </select>
            </Field>
            <Field label="Anotações / histórico">
              <textarea rows={3} className={inputCls} placeholder="observações clínicas, preferências…" value={editing.notes ?? ''} onChange={(e) => setEditing({ ...editing, notes: e.target.value })} />
            </Field>
            <div className="flex gap-2 pt-1">
              {editing.id && <Btn type="button" kind="danger" onClick={remove}>Apagar</Btn>}
              <Btn type="submit" className="flex-1">Salvar</Btn>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
