import { supabase } from '@/lib/supabase'

async function getStats() {
  const [clients, conversations, tickets, kb] = await Promise.all([
    supabase.from('clients').select('id', { count: 'exact', head: true }),
                                                                  supabase.from('conversations').select('id', { count: 'exact', head: true }),
                                                                  supabase.from('tickets').select('id', { count: 'exact', head: true }),
                                                                  supabase.from('knowledge_base').select('id', { count: 'exact', head: true }),
  ])

  return {
    totalClients: clients.count || 0,
    totalConversations: conversations.count || 0,
    totalTickets: tickets.count || 0,
    totalKBEntries: kb.count || 0,
  }
}

export default async function DashboardOverview() {
  const stats = await getStats()

  return (
    <div className="space-y-8">
    <div>
    <h1 className="text-2xl font-semibold tracking-tight mb-1">Overview</h1>
    <p className="text-sm text-text-muted">
    High-level metrics across all VinRaven clients.
    </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <StatCard label="Clients" value={stats.totalClients} />
    <StatCard label="Conversations" value={stats.totalConversations} />
    <StatCard label="Tickets" value={stats.totalTickets} />
    <StatCard label="Knowledge Base" value={stats.totalKBEntries} />
    </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-surface">
    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
    <div className="relative px-5 py-4 space-y-1">
    <p className="text-xs font-medium text-text-muted uppercase tracking-wide">
    {label}
    </p>
    <p className="text-2xl font-semibold">
    {value.toLocaleString()}
    </p>
    </div>
    </div>
  )
}
