import { useEffect, useRef, useState } from 'react'
import { Plus, Phone, Search, Users, Cake, Pencil, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { Btn, Field, inputCls, Modal, Empty, Spinner } from '../lib/ui'
import { fmtDate } from '../lib/dates'
import { DEFAULT_STAGES, STAGE_COLORS } from '../lib/patients'

const BLANK_PATIENT = { name: '', phone: '', email: '', birth_date: '', stage_id: '', notes: '' }
const BLANK_STAGE = { label: '', hint: '', color: 'gold' }

export default function Patients() {
  const [stages, setStages] = useState(null)
  const [rows, setRows] = useState(null)
  const [editing, setEditing] = useState(null)
  const [editingStage, setEditingStage] = useState(null)
  const [q, setQ] = useState('')
  const [dragOverStage, setDragOverStage] = useState(null)
  const seeding = useRef(false)

  async function load() {
    let { data: st } = await supabase.from('stages').select('*').order('position')
    if ((!st || st.length === 0) && !seeding.current) {
      seeding.current = true
      await supabase.from('stages').insert(DEFAULT_STAGES)
      st = (await supabase.from('stages').select('*').order('position')).data
    }
    setStages(st ?? [])
    const { data: pt } = await supabase.from('patients').select('*').order('name')
    setRows(pt ?? [])
  }

  useEffect(() => { load() }, [])

  async function savePatient(e) {
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

  async function removePatient() {
    if (!confirm(`Apagar "${editing.name}"? Isso apaga também os atendimentos dela. Não tem volta.`)) return
    await supabase.from('patients').delete().eq('id', editing.id)
    setEditing(null)
    load()
  }

  async function moveStage(patientId, stageId) {
    setDragOverStage(null)
    const current = rows.find((p) => p.id === patientId)
    if (!current || current.stage_id === stageId) return
    setRows((prev) => prev.map((p) => (p.id === patientId ? { ...p, stage_id: stageId } : p)))
    await supabase.from('patients').update({ stage_id: stageId }).eq('id', patientId)
  }

  async function saveStage(e) {
    e.preventDefault()
    const payload = { label: editingStage.label, hint: editingStage.hint, color: editingStage.color }
    const query = editingStage.id
      ? supabase.from('stages').update(payload).eq('id', editingStage.id)
      : supabase.from('stages').insert({ ...payload, position: stages.length })
    const { error } = await query
    if (!error) { setEditingStage(null); load() }
  }

  async function removeStage() {
    const count = rows.filter((p) => p.stage_id === editingStage.id).length
    if (count > 0) { alert('Essa coluna tem pacientes. Move elas pra outra coluna antes de apagar.'); return }
    if (!confirm(`Apagar a coluna "${editingStage.label}"?`)) return
    await supabase.from('stages').delete().eq('id', editingStage.id)
    setEditingStage(null)
    load()
  }

  async function reorderStage(stage, dir) {
    const idx = stages.findIndex((s) => s.id === stage.id)
    const swapWith = stages[idx + dir]
    if (!swapWith) return
    await Promise.all([
      supabase.from('stages').update({ position: swapWith.position }).eq('id', stage.id),
      supabase.from('stages').update({ position: stage.position }).eq('id', swapWith.id),
    ])
    load()
  }

  if (!rows || !stages) return <Spinner />

  const filtered = q.trim()
    ? rows.filter((p) => p.name.toLowerCase().includes(q.trim().toLowerCase()) || (p.phone ?? '').includes(q.trim()))
    : rows

  return (
    <div className="space-y-5">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pacientes</h1>
          <p className="text-sm text-mute">Interessados, oto e baby em tratamento</p>
        </div>
        <div className="flex gap-2">
          <Btn kind="ghost" onClick={() => setEditingStage({ ...BLANK_STAGE })}>
            <Plus size={16} /> Coluna
          </Btn>
          <Btn onClick={() => setEditing({ ...BLANK_PATIENT, stage_id: stages[0]?.id ?? '' })} disabled={stages.length === 0}>
            <Plus size={16} /> Novo
          </Btn>
        </div>
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

      {stages.length === 0 ? (
        <Empty icon={Users} text="Nenhuma coluna ainda. Cria a primeira com o botão Coluna." />
      ) : (
        <div className="flex snap-x gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible">
          {stages.map((st, idx) => {
            const cards = filtered.filter((p) => p.stage_id === st.id)
            const c = STAGE_COLORS[st.color] ?? STAGE_COLORS.gold
            return (
              <div
                key={st.id}
                onDragOver={(e) => { e.preventDefault(); setDragOverStage(st.id) }}
                onDragLeave={() => setDragOverStage((s) => (s === st.id ? null : s))}
                onDrop={(e) => { e.preventDefault(); moveStage(e.dataTransfer.getData('text/plain'), st.id) }}
                className={`w-[280px] shrink-0 snap-start rounded-2xl border-t-2 ${c.border} bg-panel p-3 transition-colors lg:w-auto ${
                  dragOverStage === st.id ? 'bg-raise' : ''
                }`}
              >
                <div className="mb-0.5 flex items-center justify-between px-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-mute">{st.label}</p>
                  <div className="flex items-center gap-1">
                    <button onClick={() => reorderStage(st, -1)} disabled={idx === 0} className="rounded p-0.5 text-mute hover:bg-raise hover:text-ink disabled:opacity-20">
                      <ChevronLeft size={13} />
                    </button>
                    <button onClick={() => reorderStage(st, 1)} disabled={idx === stages.length - 1} className="rounded p-0.5 text-mute hover:bg-raise hover:text-ink disabled:opacity-20">
                      <ChevronRight size={13} />
                    </button>
                    <button onClick={() => setEditingStage(st)} className="rounded p-0.5 text-mute hover:bg-raise hover:text-ink">
                      <Pencil size={13} />
                    </button>
                    <span className="ml-1 rounded-full bg-raise px-2 py-0.5 text-xs font-bold text-mute">{cards.length}</span>
                  </div>
                </div>
                {st.hint && <p className="mb-3 px-1 text-[11px] text-mute/70">{st.hint}</p>}
                <div className="space-y-2">
                  {cards.map((p) => (
                    <div
                      key={p.id}
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData('text/plain', p.id)}
                      onClick={() => setEditing({ ...p, birth_date: p.birth_date ?? '' })}
                      className="cursor-grab rounded-xl border border-edge bg-raise p-3 text-left transition-colors hover:border-gold/40 active:cursor-grabbing"
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
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {editing && (
        <Modal title={editing.id ? 'Editar paciente' : 'Nova paciente'} onClose={() => setEditing(null)}>
          <form onSubmit={savePatient} className="space-y-4">
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
              <select required className={inputCls} value={editing.stage_id} onChange={(e) => setEditing({ ...editing, stage_id: e.target.value })}>
                {stages.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </Field>
            <Field label="Anotações / histórico">
              <textarea rows={3} className={inputCls} placeholder="observações clínicas, preferências…" value={editing.notes ?? ''} onChange={(e) => setEditing({ ...editing, notes: e.target.value })} />
            </Field>
            <div className="flex gap-2 pt-1">
              {editing.id && <Btn type="button" kind="danger" onClick={removePatient}>Apagar</Btn>}
              <Btn type="submit" className="flex-1">Salvar</Btn>
            </div>
          </form>
        </Modal>
      )}

      {editingStage && (
        <Modal title={editingStage.id ? 'Editar coluna' : 'Nova coluna'} onClose={() => setEditingStage(null)}>
          <form onSubmit={saveStage} className="space-y-4">
            <Field label="Nome *">
              <input required className={inputCls} value={editingStage.label} onChange={(e) => setEditingStage({ ...editingStage, label: e.target.value })} />
            </Field>
            <Field label="Descrição (opcional)">
              <input className={inputCls} placeholder="ex: aguardando retorno" value={editingStage.hint ?? ''} onChange={(e) => setEditingStage({ ...editingStage, hint: e.target.value })} />
            </Field>
            <Field label="Cor">
              <div className="flex gap-2">
                {Object.entries(STAGE_COLORS).map(([key, c]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setEditingStage({ ...editingStage, color: key })}
                    className={`h-8 w-8 rounded-full ${c.dot} ${editingStage.color === key ? 'ring-2 ring-ink ring-offset-2 ring-offset-panel' : ''}`}
                  />
                ))}
              </div>
            </Field>
            <div className="flex gap-2 pt-1">
              {editingStage.id && (
                <Btn type="button" kind="danger" onClick={removeStage}>
                  <Trash2 size={15} />
                </Btn>
              )}
              <Btn type="submit" className="flex-1">Salvar</Btn>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
