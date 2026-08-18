import { createClient } from '@supabase/supabase-js'

// Extensões de navegador (tradutores, Grammarly, bloqueadores de anúncio) costumam
// sobrescrever window.fetch e injetar headers inválidos, quebrando as chamadas do
// Supabase. Um iframe recém-criado tem seu próprio window/fetch intocado por essas
// extensões — pegamos essa referência "limpa" antes de qualquer interferência.
function getPristineFetch() {
  if (typeof document === 'undefined') return fetch
  try {
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    // o iframe precisa continuar no DOM — removê-lo destrói o window/fetch dele
    document.head.appendChild(iframe)
    return iframe.contentWindow.fetch.bind(iframe.contentWindow)
  } catch {
    return fetch
  }
}

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  { global: { fetch: getPristineFetch() } }
)
