export const DEFAULT_STAGES = [
  { label: 'Interessados', hint: 'pensando em fazer', color: 'gold', position: 0 },
  { label: 'Oto', hint: 'em acompanhamento', color: 'sage', position: 1 },
  { label: 'Baby em tratamento', hint: 'remodelação baby', color: 'forest', position: 2 },
]

// de onde a paciente veio: o dado que ela mais precisa e não tinha
export const SOURCES = [
  { key: 'instagram', label: 'Instagram' },
  { key: 'indicacao', label: 'Indicação' },
  { key: 'anuncio', label: 'Anúncio' },
  { key: 'site', label: 'Site' },
  { key: 'google', label: 'Google' },
  { key: 'outro', label: 'Outro' },
]
export const sourceLabel = (k) => SOURCES.find((s) => s.key === k)?.label ?? null

export const PAYMENTS = [
  { key: 'pix', label: 'Pix' },
  { key: 'dinheiro', label: 'Dinheiro' },
  { key: 'cartao', label: 'Cartão' },
  { key: 'transferencia', label: 'Transferência' },
]
export const paymentLabel = (k) => PAYMENTS.find((p) => p.key === k)?.label ?? null

export const brl = (v) =>
  v == null || v === '' ? null : Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export const STAGE_COLORS = {
  gold: { border: 'border-gold', dot: 'bg-gold' },
  forest: { border: 'border-forest', dot: 'bg-forest' },
  sage: { border: 'border-sage', dot: 'bg-sage' },
  rose: { border: 'border-rose-400', dot: 'bg-rose-400' },
  sky: { border: 'border-sky-400', dot: 'bg-sky-400' },
  amber: { border: 'border-amber-400', dot: 'bg-amber-400' },
}
