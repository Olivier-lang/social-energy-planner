export type EnergyLevel = 'low' | 'medium' | 'high'

export interface EnergyEntry {
  date: string // ISO date string YYYY-MM-DD
  energy: EnergyLevel
}

export interface Suggestion {
  icon: string
  text: string
}

export interface WeekStats {
  low: number
  medium: number
  high: number
  total: number
}
