import type { PricingTier, PromoResult } from '@/lib/types'
export type { PricingTier, PromoResult } from '@/lib/types'

// Add / remove promo codes here
const CODES: Record<string, { discount: number; type: 'fixed' | 'percent'; label: string }> = {
  'LAAGAN500':  { discount: 500, type: 'fixed',   label: '₱500 off your booking' },
  'SUMMER10':   { discount: 10,  type: 'percent',  label: '10% summer discount' },
  'GROUP20':    { discount: 20,  type: 'percent',  label: '20% group discount' },
  'WELCOME200': { discount: 200, type: 'fixed',   label: '₱200 off — first-time visitor' },
}

export function getPricePerPerson(
  tiers: PricingTier[] | undefined | null,
  basePrice: number,
  guests: number,
): number {
  if (tiers && tiers.length > 0) {
    const tier = tiers.find(t => {
      const min = t.minPax ?? 1
      const max = t.maxPax ?? 0
      return guests >= min && (max === 0 || guests <= max)
    })
    if (tier) return tier.pricePerPerson
  }
  return basePrice ?? 0
}

const CHILD_PRICE_RATIO = 0.5

/** Single source of truth for a booking's price — the server uses this, never the browser's number. */
export function calculateTotal(
  tiers: PricingTier[] | undefined | null,
  basePrice: number,
  adults: number,
  children: number,
  promoCode: string,
): { pricePerPerson: number; total: number } {
  const pricePerPerson = getPricePerPerson(tiers, basePrice, adults)
  const childPrice = Math.round(pricePerPerson * CHILD_PRICE_RATIO)
  const { finalTotal } = applyPromo(adults * pricePerPerson + children * childPrice, promoCode)
  return { pricePerPerson, total: finalTotal }
}

export function applyPromo(total: number, code: string): PromoResult {
  const promo = CODES[code.trim().toUpperCase()]
  if (!promo) return { valid: false, label: '', discount: 0, finalTotal: total }

  const discount =
    promo.type === 'fixed'
      ? Math.min(promo.discount, total)
      : Math.round((total * promo.discount) / 100)

  return { valid: true, label: promo.label, discount, finalTotal: total - discount }
}
