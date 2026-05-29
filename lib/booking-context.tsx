'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type DrawerState = {
  open: boolean
  tour: string
  date: string
  guests: number
}

type BookingCtx = {
  state: DrawerState
  openDrawer: (opts?: Partial<Omit<DrawerState, 'open'>>) => void
  closeDrawer: () => void
  setTour: (t: string) => void
  setDate: (d: string) => void
  setGuests: (n: number) => void
}

const Ctx = createContext<BookingCtx | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DrawerState>({
    open: false,
    tour: 'Santa Cruz Island Tour',
    date: '',
    guests: 1,
  })

  return (
    <Ctx.Provider value={{
      state,
      openDrawer: (opts) => setState(s => ({ ...s, ...opts, open: true })),
      closeDrawer: () => setState(s => ({ ...s, open: false })),
      setTour:   (tour)   => setState(s => ({ ...s, tour })),
      setDate:   (date)   => setState(s => ({ ...s, date })),
      setGuests: (guests) => setState(s => ({ ...s, guests })),
    }}>
      {children}
    </Ctx.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useBooking must be inside BookingProvider')
  return ctx
}
