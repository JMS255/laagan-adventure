import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
}

// The public site's floating chat buttons don't belong in the admin area.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{'.float-btns{display:none!important}'}</style>
      {children}
    </>
  )
}
