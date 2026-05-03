import { EnergyEntry } from './types'

export type AdviceType = 'drain' | 'overactive' | 'balance' | null

export interface Advice {
  type: AdviceType
  icon: string
  text: string
  variant: 'green' | 'blue' | 'neutral'
}

export function computeAdvice(weekEntries: EnergyEntry[]): Advice | null {
  if (weekEntries.length < 3) return null

  const lows = weekEntries.filter((e) => e.energy === 'low').length
  const highs = weekEntries.filter((e) => e.energy === 'high').length

  if (lows >= 4) {
    return {
      type: 'drain',
      icon: '🌙',
      text: 'You seem drained lately. Prioritize rest, sleep, and quiet time this week.',
      variant: 'green',
    }
  }

  if (highs >= 4) {
    return {
      type: 'overactive',
      icon: '💧',
      text: "You've been very active. Make sure you're building in real recovery time.",
      variant: 'blue',
    }
  }

  return {
    type: 'balance',
    icon: '✓',
    text: 'Your energy looks balanced. Keep listening to how you actually feel.',
    variant: 'neutral',
  }
}
