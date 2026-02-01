import { supabase } from '@/lib/supabase'

async function getClients() {
  const { data, error } = await supabase
  .from('clients')
  .select('id, business_name, website_url, subscription_status, created_at, plan_name, plan_amount_cents, plan_interval')
  .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching clients:', error)
    return []
  }

  return data || []
}

export default async function ClientsPage() {
  const clients = await getClients()

  return (
    <div className="space-y-6">
    <div className="flex items-center justify-between">
    <div>
    <h1 className="text-2xl font-semibold tracking-tight mb-1">Clients</h1>
    <p className="text-sm text-text-muted">
    All businesses connected to VinRaven.
    </p>
    </div>
    <button className="px-4 py-2 rounded-md text-sm font-medium bg-accent text-text hover:bg-accent-soft transition-colors">
    Add Client
    </button>
    </div>

    <div className="rounded-lg border border-border bg-surface overflow-hidden">
    <table className="w-full text-sm">
    <thead className="bg-elevated/60">
    <tr>
    <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wide">
    Business
    </th>
    <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wide">
    Plan
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
    {clients.map((client: any) => (
      <tr
      key={client.id}
      className="border-t border-border hover:bg-elevated transition-colors"
      >
      <td className="px-4 py-3 align-top">
      <div className="font-medium">{client.business_name}</div>
      {client.website_url && (
        <div className="text-xs text-text-muted">
        {client.website_url}
        </div>
      )}
      </td>
      <td className="px-4 py-3 align-top">
      {client.plan_name ? (
        <div>
        <div className="font-medium text-sm">
        {client.plan_name}
        </div>
        {client.plan_amount_cents && (
          <div className="text-xs text-text-muted">
          ${(client.plan_amount_cents / 100).toFixed(0)}/{client.plan_interval || 'mo'}
          </div>
        )}
        </div>
      ) : (
        <span className="text-xs text-text-muted">No plan</span>
      )}
      </td>
      <td className="px-4 py-3 align-top">
      <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
        client.subscription_status === 'active'
        ? 'bg-accent/15 text-text'
        : 'bg-elevated text-text-muted'
      }`}
      >
      {client.subscription_status}
      </span>
      </td>
      <td className="px-4 py-3 align-top text-xs text-text-muted">
      {new Date(client.created_at).toLocaleDateString()}
      </td>
      </tr>
    ))}
    </tbody>
    </table>
    </div>
    </div>
  )
}
