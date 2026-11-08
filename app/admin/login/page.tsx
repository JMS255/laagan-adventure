import { redirect } from 'next/navigation'
import LoginForm from '@/components/admin/LoginForm'
import { getAdmin } from '@/lib/admin-auth'

export default async function AdminLoginPage() {
  if (await getAdmin()) redirect('/admin')

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--navy)', padding: '24px' }}>
      <LoginForm />
    </main>
  )
}
