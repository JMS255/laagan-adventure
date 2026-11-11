/**
 * The deposit a guest pays to secure a booking: a percentage of the booking
 * total, never less than a minimum, rounded to the nearest ₱50.
 * Used by the booking page (browser) and the server, so both always agree.
 */
export interface DepositRule {
  percent: number  // e.g. 10 means 10% of the total
  minimum: number  // smallest deposit in pesos
}

export const DEFAULT_DEPOSIT_RULE: DepositRule = { percent: 10, minimum: 300 }

const ROUND_TO_PESOS = 50

/** Deposit in pesos for a booking total. Returns 0 when the total is not known yet (price on request). */
export function calculateDeposit(total: number, rule: DepositRule): number {
  if (!(total > 0)) return 0
  const wanted = Math.max(rule.minimum, (total * rule.percent) / 100)
  const rounded = Math.round(wanted / ROUND_TO_PESOS) * ROUND_TO_PESOS
  return Math.min(rounded, total) // never ask for more than the total
}
