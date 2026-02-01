'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Users, MessageSquare, Ticket, LogOut } from 'lucide-react'
import { signOut } from '@/lib/supabase'

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
{ name: 'Clients', href: '/dashboard/clients', icon: Users },
{ name: 'Conversations', href: '/dashboard/conversations', icon: MessageSquare },
{ name: 'Tickets', href: '/dashboard/tickets', icon: Ticket },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/login')
  }

  return (
    <div className="flex flex-col h-full w-64 bg-surface border-r border-border">
    <div className="flex items-center h-16 px-5 border-b border-border">
    <div className="flex flex-col">
    <span className="text-sm font-semibold tracking-tight">VinRaven</span>
    <span className="text-xs text-text-muted">Admin</span>
    </div>
    </div>

    <nav className="flex-1 px-3 py-4 space-y-1">
    {navigation.map((item) => {
      const isActive = pathname === item.href
      return (
        <Link
        key={item.name}
        href={item.href}
        className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
          isActive
          ? 'bg-elevated text-text'
          : 'text-text-muted hover:bg-elevated hover:text-text'
        }`}
        >
        <item.icon className="mr-3 h-4 w-4" />
        {item.name}
        </Link>
      )
    })}
    </nav>

    <div className="px-3 py-4 border-t border-border">
    <button
    onClick={handleSignOut}
    className="flex items-center w-full px-3 py-2 text-sm text-text-muted rounded-md hover:bg-elevated hover:text-text transition-colors"
    >
    <LogOut className="mr-3 h-4 w-4" />
    Sign Out
    </button>
    </div>
    </div>
  )
}
