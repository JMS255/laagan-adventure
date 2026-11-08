import Link from 'next/link'
import SignOutButton from '@/components/admin/SignOutButton'
import type { AdminUser } from '@/lib/admin-auth'

interface Props {
  admin: AdminUser
  active: 'today' | 'bookings'
  children: React.ReactNode
}

export default function AdminShell({ admin, active, children }: Props) {
  return (
    <>
      <header className="adm-header">
        <div className="container adm-header__inner">
          <div>
            <p className="adm-brand">Laagan PH Admin</p>
            <p className="adm-who">{admin.name || admin.email} · {admin.role}</p>
          </div>
          <nav className="adm-nav" aria-label="Admin">
            <Link href="/admin" className={active === 'today' ? 'is-active' : ''}>Today</Link>
            <Link href="/admin/bookings" className={active === 'bookings' ? 'is-active' : ''}>Bookings</Link>
          </nav>
          <SignOutButton />
        </div>
      </header>
      <main className="adm-main">
        <div className="container">{children}</div>
      </main>
    </>
  )
}
