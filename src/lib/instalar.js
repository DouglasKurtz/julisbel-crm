import { useEffect, useState } from 'react'

// o Android dispara este evento e deixa instalar com um toque; o iPhone não tem nada disso
let promptGuardado = null
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    promptGuardado = e
    window.dispatchEvent(new Event('crm:instalavel'))
  })
  window.addEventListener('appinstalled', () => {
    promptGuardado = null
    window.dispatchEvent(new Event('crm:instalado'))
  })
}

export function jaInstalado() {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  )
}

export function ehIOS() {
  if (typeof navigator === 'undefined') return false
  return /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
}

export function useInstalacao() {
  const [podeInstalar, setPodeInstalar] = useState(!!promptGuardado)
  const [instalado, setInstalado] = useState(jaInstalado())

  useEffect(() => {
    const on = () => setPodeInstalar(true)
    const off = () => { setPodeInstalar(false); setInstalado(true) }
    window.addEventListener('crm:instalavel', on)
    window.addEventListener('crm:instalado', off)
    return () => {
      window.removeEventListener('crm:instalavel', on)
      window.removeEventListener('crm:instalado', off)
    }
  }, [])

  async function instalar() {
    if (!promptGuardado) return false
    promptGuardado.prompt()
    const { outcome } = await promptGuardado.userChoice
    if (outcome === 'accepted') { promptGuardado = null; setPodeInstalar(false); setInstalado(true) }
    return outcome === 'accepted'
  }

  return { podeInstalar, instalado, instalar, ios: ehIOS() }
}
