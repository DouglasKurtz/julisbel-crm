import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Plus, Phone, Search, Users, Cake, Pencil, ChevronLeft, ChevronRight,
  Trash2, GripVertical, Columns3, X,
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import { Btn, IconBtn, Field, inputCls, Modal, Empty, Spinner, Erro } from '../lib/ui'
import { fmtDate } from '../lib/dates'
import { DEFAULT_STAGES, STAGE_COLORS } from '../lib/patients'

const BLANK_PATIENT = { name: '', phone: '', email: '', birth_date: '', stage_id: '', notes: '' }
const BLANK_STAGE = { label: '', hint: '', color: 'gold' }

// telefone salvo como texto livre ("48 99123-4567") vira link de WhatsApp
function waLink(phone) {
  const d = (phone ?? '').replace(/\D/g, '')
  if (d.length < 10) return null
  return `https://wa.me/${d.length <= 11 ? '55' + d : d}`
}

export default function Patients() {
  const [params, setParams] = useSearchParams()
  const [stages, setStages] = useState(null)
  const [rows, setRows] = useState(null)
  const [editing, setEditing] = useState(null)
  const [editingStage, setEditingStage] = useState(null)
  // a busca do celular manda o nome por ?q= e já cai no quadro filtrado
  const [q, setQ] = useState(params.get('q') ?? '')
  const [drag, setDrag] = useState(null)
  const [busy, setBusy] = useState(false)
  const [erro, setErro] = useState(null)
  const seeding = useRef(false)
  const dragRef = useRef(null)
  const boardRef = useRef(null)
  const autoScrollRef = useRef(0)
  const rafRef = useRef(null)

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

  /* Se a tela já estava aberta, o valor inicial do useState não roda de novo —
     é preciso reagir à mudança do ?q= que a busca do celular manda. */
  useEffect(() => {
    const daUrl = params.get('q')
    if (daUrl) setQ(daUrl)
  }, [params])

  /* Antes o código só reagia ao sucesso: se o 4G do consultório caísse, a tela
     não mudava nada e ela tocava em Salvar de novo, criando pacientes repetidas. */
  async function savePatient(e) {
    e.preventDefault()
    if (busy) return
    setBusy(true)
    setErro(null)
    const payload = { ...editing, birth_date: editing.birth_date || null }
    delete payload.id
    delete payload.created_at
    delete payload.user_id
    const query = editing.id
      ? supabase.from('patients').update(payload).eq('id', editing.id)
      : supabase.from('patients').insert(payload)
    const { error } = await query
    setBusy(false)
    if (error) setErro('Não deu pra salvar. Confere a internet e tenta de novo.')
    else { setEditing(null); load() }
  }

  async function removePatient() {
    if (!confirm(`Apagar "${editing.name}"? Isso apaga também os atendimentos dela. Não tem volta.`)) return
    setBusy(true)
    setErro(null)
    const { error } = await supabase.from('patients').delete().eq('id', editing.id)
    setBusy(false)
    if (error) setErro('Não deu pra apagar. Tenta de novo.')
    else { setEditing(null); load() }
  }

  async function moveStage(patientId, stageId) {
    const current = rows.find((p) => p.id === patientId)
    if (!current || current.stage_id === stageId) return
    const anterior = current.stage_id
    setRows((prev) => prev.map((p) => (p.id === patientId ? { ...p, stage_id: stageId } : p)))
    const { error } = await supabase.from('patients').update({ stage_id: stageId }).eq('id', patientId)
    if (error) {
      // devolve o card pra coluna de origem em vez de mentir que salvou
      setRows((prev) => prev.map((p) => (p.id === patientId ? { ...p, stage_id: anterior } : p)))
      setErro('Não deu pra mover. Confere a internet.')
    }
  }

  /* Arrastar via Pointer Events: o drag-and-drop nativo do HTML5 não existe em
     navegador de celular. Pointer Events valem pra mouse e dedo igualmente.
     O arrasto sai de uma alça própria (touch-action: none) pra não brigar com
     a rolagem da lista quando ela desliza o dedo em cima do card. */
  // rola o quadro sozinho enquanto o dedo fica parado na borda
  function tickAutoScroll() {
    const board = boardRef.current
    if (board && autoScrollRef.current) board.scrollLeft += autoScrollRef.current * 12
    rafRef.current = requestAnimationFrame(tickAutoScroll)
  }

  function startDrag(e, patient) {
    e.stopPropagation()
    e.currentTarget.setPointerCapture(e.pointerId)
    const d = { id: patient.id, name: patient.name, x: e.clientX, y: e.clientY, over: patient.stage_id }
    dragRef.current = d
    setDrag(d)
    if (!rafRef.current) rafRef.current = requestAnimationFrame(tickAutoScroll)
  }

  function moveDrag(e) {
    if (!dragRef.current) return
    const under = document.elementFromPoint(e.clientX, e.clientY)
    const col = under?.closest('[data-stage-id]')
    const d = {
      ...dragRef.current,
      x: e.clientX,
      y: e.clientY,
      over: col?.getAttribute('data-stage-id') ?? dragRef.current.over,
    }
    dragRef.current = d
    setDrag(d)

    const board = boardRef.current
    if (board && board.scrollWidth > board.clientWidth) {
      const r = board.getBoundingClientRect()
      autoScrollRef.current = e.clientX > r.right - 56 ? 1 : e.clientX < r.left + 56 ? -1 : 0
    }
  }

  function endDrag() {
    const d = dragRef.current
    dragRef.current = null
    autoScrollRef.current = 0
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
    setDrag(null)
    if (d?.over) moveStage(d.id, d.over)
  }

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }, [])

  async function saveStage(e) {
    e.preventDefault()
    if (busy) return
    setBusy(true)
    setErro(null)
    const payload = { label: editingStage.label, hint: editingStage.hint, color: editingStage.color }
    const query = editingStage.id
      ? supabase.from('stages').update(payload).eq('id', editingStage.id)
      : supabase.from('stages').insert({ ...payload, position: stages.length })
    const { error } = await query
    setBusy(false)
    if (error) setErro('Não deu pra salvar a coluna. Tenta de novo.')
    else { setEditingStage(null); load() }
  }

  async function removeStage() {
    const count = rows.filter((p) => p.stage_id === editingStage.id).length
    if (count > 0) {
      // aviso na própria tela: caixa do sistema pode ser silenciada pelo Chrome
      setErro(`Essa coluna tem ${count} paciente${count > 1 ? 's' : ''}. Move ${count > 1 ? 'elas' : 'ela'} pra outra coluna antes de apagar.`)
      return
    }
    if (!confirm(`Apagar a coluna "${editingStage.label}"?`)) return
    setBusy(true)
    setErro(null)
    const { error } = await supabase.from('stages').delete().eq('id', editingStage.id)
    setBusy(false)
    if (error) setErro('Não deu pra apagar a coluna. Tenta de novo.')
    else { setEditingStage(null); load() }
  }

  async function reorderStage(stage, dir) {
    const idx = stages.findIndex((s) => s.id === stage.id)
    const swapWith = stages[idx + dir]
    if (!swapWith) return
    await Promise.all([
      supabase.from('stages').update({ position: swapWith.position }).eq('id', stage.id),
      supabase.from('stages').update({ position: stage.position }).eq('id', swapWith.id),
    ])
    setEditingStage(null)
    load()
  }

  if (!rows || !stages) return <Spinner />

  const filtered = q.trim()
    ? rows.filter((p) => p.name.toLowerCase().includes(q.trim().toLowerCase()) || (p.phone ?? '').includes(q.trim()))
    : rows
  const stageIdx = editingStage?.id ? stages.findIndex((s) => s.id === editingStage.id) : -1

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight">Pacientes</h1>
          <p className="text-sm text-mute">Interessados, oto e baby em tratamento</p>
        </div>
        {/* no celular os botões descem pra linha de baixo e dividem a largura */}
        <div className="flex w-full gap-2 sm:w-auto">
          <Btn kind="ghost" className="flex-1 sm:flex-none" onClick={() => { setErro(null); setEditingStage({ ...BLANK_STAGE }) }}>
            <Columns3 size={16} /> Coluna
          </Btn>
          <Btn
            className="flex-1 sm:flex-none"
            onClick={() => { setErro(null); setEditing({ ...BLANK_PATIENT, stage_id: stages[0]?.id ?? '' }) }}
            disabled={stages.length === 0}
          >
            <Plus size={16} /> Nova paciente
          </Btn>
        </div>
      </header>

      <div className="flex min-h-12 items-center gap-2 rounded-2xl border border-edge bg-panel px-4">
        <Search size={16} className="shrink-0 text-mute" />
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); if (params.get('q')) setParams({}, { replace: true }) }}
          placeholder="Buscar por nome ou telefone…"
          className="w-full bg-transparent py-3 text-base text-ink outline-none placeholder:text-mute/60 sm:text-sm"
        />
        {q && (
          <button
            onClick={() => { setQ(''); if (params.get('q')) setParams({}, { replace: true }) }}
            aria-label="Limpar busca"
            className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center text-mute hover:text-ink"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {stages.length === 0 ? (
        <Empty icon={Users} text="Nenhuma coluna ainda. Cria a primeira com o botão Coluna." />
      ) : (
        <div
          ref={boardRef}
          /* o snap puxa o quadro de volta e mata a rolagem automática — desliga durante o arraste */
          className={`-mx-4 flex gap-3 overflow-x-auto overscroll-x-contain px-4 pb-2 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0 ${
            drag ? '' : 'snap-x snap-mandatory'
          }`}
        >
          {stages.map((st) => {
            const cards = filtered.filter((p) => p.stage_id === st.id)
            const c = STAGE_COLORS[st.color] ?? STAGE_COLORS.gold
            const isTarget = drag?.over === st.id
            return (
              <div
                key={st.id}
                data-stage-id={st.id}
                className={`w-[80vw] max-w-[300px] shrink-0 snap-start rounded-2xl border-t-2 ${c.border} bg-panel p-3 transition-colors lg:w-auto lg:max-w-none ${
                  isTarget ? 'bg-raise ring-2 ring-gold/50' : ''
                }`}
              >
                <div className="mb-2 flex items-center gap-2 pl-1">
                  <span className={`h-2 w-2 shrink-0 rounded-full ${c.dot}`} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold uppercase tracking-wider text-mute">{st.label}</p>
                    {st.hint && <p className="truncate text-[11px] text-mute/70">{st.hint}</p>}
                  </div>
                  <span className="rounded-full bg-raise px-2 py-0.5 text-xs font-bold text-mute">{cards.length}</span>
                  <IconBtn onClick={() => { setErro(null); setEditingStage(st) }} aria-label={`Editar coluna ${st.label}`} className="-mr-1">
                    <Pencil size={16} />
                  </IconBtn>
                </div>

                {/* com centenas de contatos numa coluna a página virava uma tira sem fim:
                    cada coluna rola por dentro e as vizinhas continuam alcançáveis */}
                <div className="max-h-[60vh] space-y-2 overflow-y-auto overscroll-contain pr-0.5 lg:max-h-[calc(100dvh-22rem)]">
                  {cards.length === 0 && (
                    <p className="rounded-xl border border-dashed border-edge px-3 py-6 text-center text-xs text-mute/60">
                      {drag ? 'Solta aqui' : 'Nenhuma paciente'}
                    </p>
                  )}
                  {cards.map((p) => {
                    const wa = waLink(p.phone)
                    return (
                      <div
                        key={p.id}
                        className={`no-touch-callout flex overflow-hidden rounded-xl border border-edge bg-raise transition-opacity ${
                          drag?.id === p.id ? 'opacity-30' : ''
                        }`}
                      >
                        <button
                          type="button"
                          onPointerDown={(e) => startDrag(e, p)}
                          onPointerMove={moveDrag}
                          onPointerUp={endDrag}
                          onPointerCancel={endDrag}
                          onClick={(e) => e.stopPropagation()}
                          style={{ touchAction: 'none' }}
                          aria-label={`Mover ${p.name} de coluna`}
                          className="no-touch-callout flex w-10 shrink-0 cursor-grab items-center justify-center self-stretch text-mute/40 transition-colors hover:bg-night hover:text-mute active:cursor-grabbing"
                        >
                          <GripVertical size={16} />
                        </button>
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => { setErro(null); setEditing({ ...p, birth_date: p.birth_date ?? '' }) }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              setErro(null)
                              setEditing({ ...p, birth_date: p.birth_date ?? '' })
                            }
                          }}
                          className="min-w-0 flex-1 cursor-pointer py-3 pr-3 text-left transition-colors hover:bg-night/40"
                        >
                          <p className="text-sm font-semibold leading-snug">{p.name}</p>
                          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5">
                            {p.phone && (wa ? (
                              <a
                                href={wa}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="-my-1 inline-flex min-h-11 items-center gap-1.5 pr-2 text-xs text-goldsoft"
                              >
                                <Phone size={11} /> {p.phone}
                              </a>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 text-xs text-mute">
                                <Phone size={11} /> {p.phone}
                              </span>
                            ))}
                            {p.birth_date && (
                              <span className="inline-flex items-center gap-1.5 text-xs text-mute">
                                <Cake size={11} /> {fmtDate(p.birth_date)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* erro de mover card não tem modal pra aparecer: vira aviso flutuante */}
      {erro && !editing && !editingStage && (
        <div className="fixed inset-x-4 bottom-24 z-50 md:bottom-6 md:left-auto md:right-6 md:w-80">
          <button onClick={() => setErro(null)} className="w-full text-left">
            <Erro>{erro}</Erro>
          </button>
        </div>
      )}

      {/* fantasma que acompanha o dedo enquanto arrasta */}
      {drag && (
        <div
          className="pointer-events-none fixed z-[60] max-w-[220px] -translate-x-1/2 -translate-y-1/2 truncate rounded-xl border border-gold/60 bg-raise px-3 py-2 text-sm font-semibold shadow-2xl shadow-black/60"
          style={{ left: drag.x, top: drag.y }}
        >
          {drag.name}
        </div>
      )}

      {editing && (
        <Modal title={editing.id ? 'Editar paciente' : 'Nova paciente'} onClose={() => setEditing(null)}>
          <form onSubmit={savePatient} className="space-y-4">
            <Field label="Nome *">
              <input
                required
                autoCapitalize="words"
                className={inputCls}
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="WhatsApp">
                <input
                  type="tel"
                  inputMode="tel"
                  className={inputCls}
                  placeholder="48 99999-9999"
                  value={editing.phone ?? ''}
                  onChange={(e) => setEditing({ ...editing, phone: e.target.value })}
                />
              </Field>
              <Field label="Nascimento">
                <input
                  type="date"
                  className={inputCls}
                  value={editing.birth_date ?? ''}
                  onChange={(e) => setEditing({ ...editing, birth_date: e.target.value })}
                />
              </Field>
            </div>
            <Field label="E-mail">
              <input
                type="email"
                inputMode="email"
                autoCapitalize="none"
                className={inputCls}
                value={editing.email ?? ''}
                onChange={(e) => setEditing({ ...editing, email: e.target.value })}
              />
            </Field>
            <Field label="Etapa">
              <select
                required
                className={inputCls}
                value={editing.stage_id}
                onChange={(e) => setEditing({ ...editing, stage_id: e.target.value })}
              >
                {stages.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </Field>
            <Field label="Anotações / histórico">
              <textarea
                rows={3}
                className={inputCls}
                placeholder="observações clínicas, preferências…"
                value={editing.notes ?? ''}
                onChange={(e) => setEditing({ ...editing, notes: e.target.value })}
              />
            </Field>
            <Erro>{erro}</Erro>
            {/* Apagar longe do Salvar: colados, o polegar erra e não tem desfazer */}
            <div className="flex flex-col gap-2 pt-1">
              <Btn type="submit" disabled={busy}>{busy ? 'Salvando…' : 'Salvar'}</Btn>
              {editing.id && (
                <Btn type="button" kind="danger" onClick={removePatient} disabled={busy}>
                  <Trash2 size={15} /> Apagar paciente
                </Btn>
              )}
            </div>
          </form>
        </Modal>
      )}

      {editingStage && (
        <Modal title={editingStage.id ? 'Editar coluna' : 'Nova coluna'} onClose={() => setEditingStage(null)}>
          <form onSubmit={saveStage} className="space-y-4">
            <Field label="Nome *">
              <input
                required
                autoCapitalize="sentences"
                className={inputCls}
                value={editingStage.label}
                onChange={(e) => setEditingStage({ ...editingStage, label: e.target.value })}
              />
            </Field>
            <Field label="Descrição (opcional)">
              <input
                className={inputCls}
                placeholder="ex: aguardando retorno"
                value={editingStage.hint ?? ''}
                onChange={(e) => setEditingStage({ ...editingStage, hint: e.target.value })}
              />
            </Field>
            <Field label="Cor">
              <div className="flex flex-wrap gap-2">
                {Object.entries(STAGE_COLORS).map(([key, c]) => (
                  <button
                    key={key}
                    type="button"
                    aria-label={`Cor ${key}`}
                    onClick={() => setEditingStage({ ...editingStage, color: key })}
                    className={`h-11 w-11 rounded-full ${c.dot} ${
                      editingStage.color === key ? 'ring-2 ring-ink ring-offset-2 ring-offset-panel' : 'opacity-60'
                    }`}
                  />
                ))}
              </div>
            </Field>
            {stageIdx >= 0 && stages.length > 1 && (
              <Field label="Posição no quadro">
                <div className="flex gap-2">
                  <Btn
                    type="button"
                    kind="ghost"
                    className="flex-1"
                    disabled={stageIdx === 0}
                    onClick={() => reorderStage(editingStage, -1)}
                  >
                    <ChevronLeft size={16} /> Esquerda
                  </Btn>
                  <Btn
                    type="button"
                    kind="ghost"
                    className="flex-1"
                    disabled={stageIdx === stages.length - 1}
                    onClick={() => reorderStage(editingStage, 1)}
                  >
                    Direita <ChevronRight size={16} />
                  </Btn>
                </div>
              </Field>
            )}
            <Erro>{erro}</Erro>
            <div className="flex flex-col gap-2 pt-1">
              <Btn type="submit" disabled={busy}>{busy ? 'Salvando…' : 'Salvar'}</Btn>
              {editingStage.id && (
                <Btn type="button" kind="danger" onClick={removeStage} disabled={busy}>
                  <Trash2 size={16} /> Apagar coluna
                </Btn>
              )}
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
