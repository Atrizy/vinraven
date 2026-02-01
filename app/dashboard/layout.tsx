import Sidebar from '@/components/Sidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-bg">
    <Sidebar />
    <main className="flex-1 overflow-y-auto">
    <div className="max-w-6xl mx-auto px-8 py-8">
    {children}
    </div>
    </main>
    </div>
  )
}
