import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Btn, Field, inputCls } from '../lib/ui'

export default function Login() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState(null)
  const [busy, setBusy] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setBusy(true)
    setMsg(null)
    const fn =
      mode === 'login'
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({ email, password })
    const { error } = await fn
    if (error) {
      const friendly = {
        'Invalid login credentials': 'E-mail ou senha incorretos.',
        'User already registered': 'Esse e-mail já tem conta — usa "Entrar".',
      }
      setMsg(friendly[error.message] || error.message)
    } else if (mode === 'signup') {
      setMsg('Conta criada! Confirma o e-mail e já podes entrar.')
      setMode('login')
    }
    setBusy(false)
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-night px-5">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-edge bg-panel">
            <img src="/simbolo.png" alt="" className="h-9 w-9 object-contain" />
          </div>
          <h1 className="font-display text-3xl tracking-tight">Julisbel Kurtz</h1>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-goldsoft">Enfermeira Esteta</p>
          <p className="mt-2 text-sm text-mute">CRM · Pacientes & Agenda</p>
        </div>

        <form onSubmit={submit} className="space-y-4 rounded-3xl border border-edge bg-panel p-6">
          <Field label="E-mail">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="teu@email.com" />
          </Field>
          <Field label="Senha">
            <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} placeholder="mínimo 6 caracteres" />
          </Field>
          {msg && <p className="text-sm text-goldsoft">{msg}</p>}
          <Btn type="submit" disabled={busy} className="w-full">
            {busy ? 'Aguarda…' : mode === 'login' ? 'Entrar' : 'Criar conta'}
          </Btn>
          <button
            type="button"
            onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setMsg(null) }}
            className="w-full text-center text-sm text-mute hover:text-ink"
          >
            {mode === 'login' ? 'Primeira vez? Criar conta' : 'Já tenho conta — entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
