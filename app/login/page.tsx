'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) throw authError

        const { data: userData, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('email', email)
        .single()

        if (userError || userData?.role !== 'master_admin') {
          await supabase.auth.signOut()
          throw new Error('Access denied. Master admin only.')
        }

        router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
    <div className="w-full max-w-sm">
    <div className="mb-6">
    <h1 className="text-xl font-semibold tracking-tight">VinRaven Admin</h1>
    <p className="text-sm text-text-muted mt-1">
    Sign in to manage your clients.
    </p>
    </div>

    <div className="rounded-lg border border-border bg-surface px-5 py-6">
    <form onSubmit={handleLogin} className="space-y-4">
    {error && (
      <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 px-3 py-2 rounded">
      {error}
      </div>
    )}

    <div className="space-y-1">
    <label htmlFor="email" className="text-xs font-medium text-text-muted">
    Email
    </label>
    <input
    id="email"
    type="email"
    required
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full rounded-md border border-border bg-elevated px-3 py-2 text-sm text-text outline-none focus:border-accent focus:ring-0"
    />
    </div>

    <div className="space-y-1">
    <label htmlFor="password" className="text-xs font-medium text-text-muted">
    Password
    </label>
    <input
    id="password"
    type="password"
    required
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full rounded-md border border-border bg-elevated px-3 py-2 text-sm text-text outline-none focus:border-accent focus:ring-0"
    />
    </div>

    <button
    type="submit"
    disabled={loading}
    className="w-full rounded-md bg-accent px-3 py-2 text-sm font-medium text-text hover:bg-accent-soft disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
    >
    {loading ? 'Signing in…' : 'Sign in'}
    </button>
    </form>
    </div>
    </div>
    </div>
  )
}
