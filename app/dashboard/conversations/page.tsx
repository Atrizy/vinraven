import { supabase } from '@/lib/supabase'

async function getConversations() {
  const { data, error } = await supabase
  .from('conversations')
  .select(`
  *,
  clients:client_id (
    business_name
  )
  `)
  .order('created_at', { ascending: false })
  .limit(50)

  if (error) {
    console.error('Error fetching conversations:', error)
    return []
  }

  return data || []
}

export default async function ConversationsPage() {
  const conversations = await getConversations()

  return (
    <div className="space-y-6">
    <div>
    <h1 className="text-2xl font-semibold tracking-tight mb-1">Conversations</h1>
    <p className="text-sm text-text-muted">
    Recent user interactions across all clients.
    </p>
    </div>

    <div className="rounded-lg border border-border bg-surface overflow-hidden">
    <table className="w-full text-sm">
    <thead className="bg-elevated/60">
    <tr>
    <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wide">
    Client
    </th>
    <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wide">
    User Message
    </th>
    <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wide">
    Bot Response
    </th>
    <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wide">
    Date
    </th>
    </tr>
    </thead>
    <tbody>
    {conversations.map((conv: any) => (
      <tr
      key={conv.id}
      className="border-t border-border hover:bg-elevated transition-colors hover:shadow-[0_0_0_1px_rgba(139,92,246,0.6)]"
      >
      <td className="px-4 py-3 align-top text-sm">
      <span className="font-medium">
      {conv.clients?.business_name || 'Unknown'}
      </span>
      </td>
      <td className="px-4 py-3 align-top text-sm text-text">
      <div className="max-w-xs truncate">
      {conv.user_message}
      </div>
      </td>
      <td className="px-4 py-3 align-top text-sm text-text-muted">
      <div className="max-w-xs truncate">
      {conv.bot_response}
      </div>
      </td>
      <td className="px-4 py-3 align-top text-xs text-text-muted whitespace-nowrap">
      {new Date(conv.created_at).toLocaleString()}
      </td>
      </tr>
    ))}
    </tbody>
    </table>
    </div>
    </div>
  )
}
