// tira acento e pontuação: ela vai digitar "como mudo de coluna" ou "COLUNA" ou "mudar cor"
const normalizar = (s) =>
  (s ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

// palavras que aparecem em quase toda pergunta e não ajudam a distinguir
const VAZIAS = new Set([
  'como', 'o', 'a', 'os', 'as', 'de', 'do', 'da', 'dos', 'das', 'em', 'no', 'na', 'um', 'uma',
  'que', 'e', 'eu', 'meu', 'minha', 'pra', 'para', 'por', 'com', 'se', 'faco', 'fazer', 'quero',
  'posso', 'tem', 'ter', 'ser', 'esta', 'estao', 'isso', 'aqui', 'ai', 'la', 'onde', 'qual', 'quais',
])

function radical(p) {
  // corta plural e terminações verbais comuns pra "colunas" casar com "coluna"
  const cortado = p
    .replace(/(coes|oes)$/, 'ao')
    .replace(/(ando|endo|indo)$/, '')
    .replace(/(ar|er|ir)$/, '')
    .replace(/s$/, '')
  // "ir" viraria "" e string vazia é prefixo de qualquer coisa: casava com tudo
  return cortado.length >= 3 ? cortado : p
}

const tokens = (s) =>
  normalizar(s)
    .split(' ')
    .filter((p) => p.length > 1 && !VAZIAS.has(p))
    .map(radical)
    .filter(Boolean)

/** Índice pré-calculado uma vez, não a cada tecla. */
export function indexar(topicos) {
  return topicos.map((t) => ({
    ...t,
    _pergunta: tokens(t.pergunta),
    _variacoes: tokens((t.variacoes ?? []).join(' ')),
    _resposta: tokens(t.resposta),
  }))
}

/**
 * Pontua por onde a palavra bateu: título vale mais que corpo da resposta.
 * Casamento parcial (prefixo) conta menos, pra "col" ainda achar "coluna".
 */
export function buscar(indice, consulta, limite = 6) {
  const termos = tokens(consulta)
  if (termos.length === 0) return []

  const casa = (lista, termo) => lista.some((p) => p.startsWith(termo) || termo.startsWith(p))

  const pontuados = indice.map((t) => {
    let pontos = 0
    let noTitulo = 0
    let emQualquerLugar = 0

    for (const termo of termos) {
      const exato = (lista) => lista.includes(termo)

      if (exato(t._pergunta)) pontos += 10
      else if (casa(t._pergunta, termo)) pontos += 5

      if (exato(t._variacoes)) pontos += 7
      else if (casa(t._variacoes, termo)) pontos += 3

      if (exato(t._resposta)) pontos += 2
      else if (casa(t._resposta, termo)) pontos += 1

      // o que o tópico É (pergunta e variações) pesa mais que o que ele menciona de passagem
      if (casa(t._pergunta, termo) || casa(t._variacoes, termo)) noTitulo++
      if (casa(t._pergunta, termo) || casa(t._variacoes, termo) || casa(t._resposta, termo)) emQualquerLugar++
    }

    return {
      t,
      pontos,
      titulo: noTitulo / termos.length,
      cobertura: emQualquerLugar / termos.length,
    }
  })

  /* Ordem: primeiro quem TRATA de todas as palavras, depois quem só as menciona.
     Sem isso, "arrastar paciente" caía num tópico sobre apagar coluna que repete
     "paciente" no título e cita "arrasta" no meio da resposta. */
  return pontuados
    .filter((x) => x.pontos > 0 && x.cobertura >= 0.5)
    .sort((a, b) => b.titulo - a.titulo || b.cobertura - a.cobertura || b.pontos - a.pontos)
    .slice(0, limite)
    .map((x) => x.t)
}
