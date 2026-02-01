import { supabase } from '@/lib/supabase'

async function getTickets() {
  const { data, error } = await supabase
  .from('tickets')
  .select(`
  *,
  clients:client_id (
    business_name
  )
  `)
  .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching tickets:', error)
    return []
  }

  return data || []
}

export default async function TicketsPage() {
  const tickets = await getTickets()

  return (
    <div className="space-y-6">
    <div>
    <h1 className="text-2xl font-semibold tracking-tight mb-1">Tickets</h1>
    <p className="text-sm text-text-muted">
    Support requests created from your VinRaven assistants.
    </p>
    </div>

    <div className="rounded-lg border border-border bg-surface overflow-hidden">
    <table className="w-full text-sm">
    <thead className="bg-elevated/60">
    <tr>
    <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wide">
    Ticket
    </th>
    <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wide">
    Client
    </th>
    <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wide">
    Customer Email
    </th>
    <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wide">
    Status
    </th>
    <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wide">
    Created
    </th>
    </tr>
    </thead>
    <tbody>
    {tickets.map((ticket: any) => (
      <tr
      key={ticket.id}
      className="border-t border-border hover:bg-elevated transition-colors hover:shadow-[0_0_0_1px_rgba(139,92,246,0.6)]"
      >
      <td className="px-4 py-3 align-top text-xs font-mono text-text">
      {ticket.id.slice(0, 8)}…
      </td>
      <td className="px-4 py-3 align-top text-sm">
      <span className="font-medium">
      {ticket.clients?.business_name || 'Unknown'}
      </span>
      </td>
      <td className="px-4 py-3 align-top text-sm text-text-muted">
      {ticket.customer_email}
      </td>
      <td className="px-4 py-3 align-top">
      <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
        ticket.status === 'open'
        ? 'bg-accent/15 text-text'
        : 'bg-elevated text-text-muted'
      }`}
      >
      {ticket.status}
      </span>
      </td>
      <td className="px-4 py-3 align-top text-xs text-text-muted whitespace-nowrap">
      {new Date(ticket.created_at).toLocaleDateString()}
      </td>
      </tr>
    ))}
    </tbody>
    </table>
    </div>
    </div>
  )
}
