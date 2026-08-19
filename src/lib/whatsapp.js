// telefone é texto livre ("48 99123-4567"); o WhatsApp precisa de dígitos com país
export function waDigits(phone) {
  const d = (phone ?? '').replace(/\D/g, '')
  if (d.length < 10) return null
  return d.length <= 11 ? '55' + d : d
}

export function waLink(phone, texto) {
  const d = waDigits(phone)
  if (!d) return null
  return `https://wa.me/${d}` + (texto ? `?text=${encodeURIComponent(texto)}` : '')
}

// {nome}, {data} e {hora} são preenchidos na hora de abrir a conversa
export function preencher(texto, { nome, data, hora } = {}) {
  const primeiro = (nome ?? '').trim().split(/\s+/)[0] ?? ''
  return texto
    .replaceAll('{nome}', primeiro)
    .replaceAll('{data}', data ?? '')
    .replaceAll('{hora}', hora ?? '')
}

export { MENSAGENS_PRONTAS as MENSAGENS } from './conteudo-ajuda'
