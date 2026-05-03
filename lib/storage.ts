import { EnergyEntry, EnergyLevel } from './types'

const STORAGE_KEY = 'social_energy_entries_v2'

export function getEntries(): EnergyEntry[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as EnergyEntry[]
  } catch {
    return []
  }
}

export function saveEntry(energy: EnergyLevel): EnergyEntry[] {
  const today = getTodayISO()
  const entries = getEntries()
  const idx = entries.findIndex((e) => e.date === today)
  const newEntry: EnergyEntry = { date: today, energy }

  if (idx >= 0) {
    entries[idx] = newEntry
  } else {
    entries.push(newEntry)
  }

  // Sort newest first
  entries.sort((a, b) => b.date.localeCompare(a.date))
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  return entries
}

export function getTodayEntry(): EnergyEntry | null {
  const today = getTodayISO()
  return getEntries().find((e) => e.date === today) ?? null
}

export function getWeekEntries(): EnergyEntry[] {
  const entries = getEntries()
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - 6)
  cutoff.setHours(0, 0, 0, 0)
  return entries.filter((e) => new Date(e.date + 'T00:00:00') >= cutoff)
}

export function getTodayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

export function getStreak(): number {
  const entries = getEntries()
  if (!entries.length) return 0
  const today = new Date(getTodayISO() + 'T00:00:00')
  let streak = 0
  for (let i = 0; i < entries.length; i++) {
    const expected = new Date(today)
    expected.setDate(today.getDate() - i)
    const entryDate = new Date(entries[i].date + 'T00:00:00')
    if (entryDate.toISOString().slice(0, 10) === expected.toISOString().slice(0, 10)) {
      streak++
    } else {
      break
    }
  }
  return streak
}
