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
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Clients"
          value={stats.totalClients}
          bgColor="bg-blue-50"
          textColor="text-blue-600"
        />
        <StatCard
          title="Total Conversations"
          value={stats.totalConversations}
          bgColor="bg-green-50"
          textColor="text-green-600"
        />
        <StatCard
          title="Total Tickets"
          value={stats.totalTickets}
          bgColor="bg-yellow-50"
          textColor="text-yellow-600"
        />
        <StatCard
          title="Knowledge Base Entries"
          value={stats.totalKBEntries}
          bgColor="bg-purple-50"
          textColor="text-purple-600"
        />
      </div>
    </div>
  )
}

function StatCard({ title, value, bgColor, textColor }: {
  title: string
  value: number
  bgColor: string
  textColor: string
}) {
  return (
    <div className={`${bgColor} rounded-lg p-6`}>
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <p className={`text-3xl font-bold ${textColor} mt-2`}>{value}</p>
    </div>
  )
}
