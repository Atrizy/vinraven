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
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Conversations</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User Message
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bot Response
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {conversations.map((conv: any) => (
              <tr key={conv.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {conv.clients?.business_name || 'Unknown'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                  {conv.user_message}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                  {conv.bot_response}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
