import { useEffect, useMemo, useRef, useState } from 'react'
import {
  HelpCircle, Search, X, ChevronLeft, ChevronRight, GraduationCap,
  Smartphone, Check, Share, PlusSquare, Sparkles,
} from 'lucide-react'
import { IconBtn, Btn } from '../lib/ui'
import { indexar, buscar } from '../lib/busca-ajuda'
import { TOPICOS, TUTORIAL, SUGESTOES } from '../lib/conteudo-ajuda'
import { useInstalacao } from '../lib/instalar'

/* ---------------- Tutorial ---------------- */

function Tutorial({ onFechar }) {
  const [i, setI] = useState(0)
  const passo = TUTORIAL[i]
  const ultimo = i === TUTORIAL.length - 1

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-night">
      <header className="flex items-center justify-between gap-2 border-b border-edge px-3 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <span className="pl-2 text-xs font-bold uppercase tracking-wider text-goldsoft">
          Passo {i + 1} de {TUTORIAL.length}
        </span>
        <IconBtn onClick={onFechar} aria-label="Fechar tutorial">
          <X size={20} />
        </IconBtn>
      </header>

      {/* barrinha de progresso: ela precisa saber que isso acaba */}
      <div className="h-1 w-full bg-raise">
        <div
          className="h-full bg-gold transition-all duration-300"
          style={{ width: `${((i + 1) / TUTORIAL.length) * 100}%` }}
        />
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-8">
        <div className="mx-auto max-w-md">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-mute">
            {{ painel: 'No Painel', pacientes: 'Em Pacientes', agenda: 'Na Agenda', geral: 'No app' }[passo.tela]}
          </p>
          <h2 className="text-2xl font-bold leading-tight tracking-tight">{passo.titulo}</h2>
          <p className="mt-4 text-base leading-relaxed text-mute">{passo.texto}</p>
          {passo.dica && (
            <p className="mt-5 flex gap-2.5 rounded-2xl border border-gold/25 bg-gold/5 p-4 text-sm leading-relaxed text-goldsoft">
              <Sparkles size={16} className="mt-0.5 shrink-0" />
              <span>{passo.dica}</span>
            </p>
          )}
        </div>
      </div>

      <footer className="flex items-center gap-2 border-t border-edge px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
        <Btn kind="ghost" onClick={() => setI((n) => n - 1)} disabled={i === 0}>
          <ChevronLeft size={16} /> Voltar
        </Btn>
        <Btn className="flex-1" onClick={() => (ultimo ? onFechar() : setI((n) => n + 1))}>
          {ultimo ? 'Terminei' : <>Próximo <ChevronRight size={16} /></>}
        </Btn>
      </footer>
    </div>
  )
}

/* ---------------- Instalar no celular ---------------- */

function Instalar() {
  const { podeInstalar, instalado, instalar, ios } = useInstalacao()

  if (instalado)
    return (
      <div className="flex items-center gap-2.5 rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-4 text-sm text-emerald-300">
        <Check size={17} className="shrink-0" />
        Pronto, o app já está instalado neste aparelho.
      </div>
    )

  return (
    <div className="rounded-2xl border border-edge bg-raise p-4">
      <h3 className="flex items-center gap-2 text-sm font-bold">
        <Smartphone size={16} className="text-goldsoft" /> Deixar na tela de início
      </h3>
      <p className="mt-1.5 text-sm text-mute">
        Vira um aplicativo de verdade: abre direto, sem barra de endereço, e sobra mais tela.
      </p>

      {podeInstalar ? (
        <Btn className="mt-3 w-full" onClick={instalar}>Instalar agora</Btn>
      ) : ios ? (
        <ol className="mt-3 space-y-2 text-sm text-mute">
          <li className="flex gap-2.5">
            <span className="font-bold text-goldsoft">1.</span>
            <span className="flex flex-wrap items-center gap-1.5">
              Toca no botão de compartilhar <Share size={14} className="inline text-goldsoft" /> aqui embaixo no Safari.
            </span>
          </li>
          <li className="flex gap-2.5">
            <span className="font-bold text-goldsoft">2.</span>
            <span className="flex flex-wrap items-center gap-1.5">
              Desce e toca em <b className="text-ink">Adicionar à Tela de Início</b>
              <PlusSquare size={14} className="inline text-goldsoft" />.
            </span>
          </li>
          <li className="flex gap-2.5">
            <span className="font-bold text-goldsoft">3.</span>
            <span>Toca em <b className="text-ink">Adicionar</b>, no canto de cima.</span>
          </li>
        </ol>
      ) : (
        <ol className="mt-3 space-y-2 text-sm text-mute">
          <li className="flex gap-2.5">
            <span className="font-bold text-goldsoft">1.</span>
            <span>Abre o menu do navegador, os três pontinhos no canto.</span>
          </li>
          <li className="flex gap-2.5">
            <span className="font-bold text-goldsoft">2.</span>
            <span>Toca em <b className="text-ink">Instalar aplicativo</b> ou <b className="text-ink">Adicionar à tela inicial</b>.</span>
          </li>
        </ol>
      )}
    </div>
  )
}

/* ---------------- Assistente ---------------- */

export default function Ajuda() {
  const [aberto, setAberto] = useState(false)
  const [tutorial, setTutorial] = useState(false)
  const [q, setQ] = useState('')
  const [abertoId, setAbertoId] = useState(null)
  const inputRef = useRef(null)

  const indice = useMemo(() => indexar(TOPICOS), [])
  const resultados = useMemo(() => buscar(indice, q, 8), [indice, q])

  useEffect(() => {
    if (aberto) setTimeout(() => inputRef.current?.focus(), 80)
    else { setQ(''); setAbertoId(null) }
  }, [aberto])

  // Esc fecha, como em qualquer app
  useEffect(() => {
    if (!aberto && !tutorial) return
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      if (tutorial) setTutorial(false)
      else setAberto(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [aberto, tutorial])

  const mostrar = q.trim().length > 1 ? resultados : []
  const semResultado = q.trim().length > 1 && resultados.length === 0

  return (
    <>
      <IconBtn onClick={() => setAberto(true)} aria-label="Ajuda">
        <HelpCircle size={19} />
      </IconBtn>

      {aberto && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center"
          onPointerDown={(e) => { if (e.target === e.currentTarget) setAberto(false) }}
        >
          <div className="flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-3xl border border-edge bg-panel sm:max-w-lg sm:rounded-3xl">
            <header className="flex items-center justify-between gap-2 border-b border-edge p-4">
              <div>
                <h2 className="text-lg font-bold">Como posso ajudar?</h2>
                <p className="text-xs text-mute">Pergunta com suas palavras mesmo</p>
              </div>
              <IconBtn onClick={() => setAberto(false)} aria-label="Fechar ajuda" className="-mr-1">
                <X size={20} />
              </IconBtn>
            </header>

            <div className="border-b border-edge p-4">
              <div className="flex min-h-12 items-center gap-2 rounded-2xl border border-edge bg-night px-4">
                <Search size={16} className="shrink-0 text-mute" />
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => { setQ(e.target.value); setAbertoId(null) }}
                  placeholder="ex: como mudo de coluna"
                  className="w-full bg-transparent py-3 text-base text-ink outline-none placeholder:text-mute/60"
                />
                {q && (
                  <button onClick={() => setQ('')} aria-label="Limpar" className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center text-mute">
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain p-4">
              {mostrar.length > 0 && (
                <ul className="space-y-2">
                  {mostrar.map((t) => (
                    <li key={t.id} className="overflow-hidden rounded-2xl border border-edge bg-raise">
                      <button
                        onClick={() => setAbertoId(abertoId === t.id ? null : t.id)}
                        className="flex w-full items-start gap-3 p-3.5 text-left"
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold">{t.pergunta}</span>
                          <span className="mt-0.5 block text-[11px] uppercase tracking-wider text-mute/60">{t.categoria}</span>
                        </span>
                        <ChevronRight
                          size={16}
                          className={`mt-0.5 shrink-0 text-mute transition-transform ${abertoId === t.id ? 'rotate-90' : ''}`}
                        />
                      </button>
                      {abertoId === t.id && (
                        <p className="border-t border-edge/60 px-3.5 py-3 text-sm leading-relaxed text-mute">{t.resposta}</p>
                      )}
                    </li>
                  ))}
                </ul>
              )}

              {semResultado && (
                <div className="rounded-2xl border border-dashed border-edge p-5 text-center">
                  <p className="text-sm text-mute">
                    Não achei nada sobre isso. Tenta com outra palavra, ou vê o tutorial aqui embaixo.
                  </p>
                </div>
              )}

              {q.trim().length <= 1 && (
                <>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-mute">Dúvidas comuns</p>
                  <div className="mb-5 flex flex-wrap gap-2">
                    {SUGESTOES.map((s) => (
                      <button
                        key={s}
                        onClick={() => setQ(s)}
                        className="min-h-11 rounded-full border border-edge bg-raise px-3.5 text-xs text-mute"
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => { setAberto(false); setTutorial(true) }}
                      className="flex w-full items-center gap-3 rounded-2xl border border-edge bg-raise p-4 text-left"
                    >
                      <GraduationCap size={20} className="shrink-0 text-goldsoft" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold">Ver o tutorial</span>
                        <span className="block text-sm text-mute">
                          O passo a passo do começo ao fim. Pode rever quantas vezes quiser.
                        </span>
                      </span>
                    </button>
                    <Instalar />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {tutorial && <Tutorial onFechar={() => setTutorial(false)} />}
    </>
  )
}
