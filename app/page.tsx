'use client'

import { useEffect, useState } from 'react'
import EnergySelector from '@/components/EnergySelector'
import SuggestionCard from '@/components/SuggestionCard'
import AdviceBanner from '@/components/AdviceBanner'
import HistoryList from '@/components/HistoryList'
import StatsSummary from '@/components/StatsSummary'
import { EnergyLevel, EnergyEntry, Suggestion } from '@/lib/types'
import { getRandomSuggestion } from '@/lib/suggestions'
import { saveEntry, getEntries, getTodayEntry, getWeekEntries, getStreak } from '@/lib/storage'
import { computeAdvice, Advice } from '@/lib/advice'

export default function HomePage() {
  const [selectedEnergy, setSelectedEnergy] = useState<EnergyLevel | null>(null)
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null)
  const [entries, setEntries] = useState<EnergyEntry[]>([])
  const [weekEntries, setWeekEntries] = useState<EnergyEntry[]>([])
  const [advice, setAdvice] = useState<Advice | null>(null)
  const [streak, setStreak] = useState(0)
  const [today, setToday] = useState('')

  // Load persisted state on mount
  useEffect(() => {
    const todayEntry = getTodayEntry()
    const allEntries = getEntries()
    const week = getWeekEntries()

    setEntries(allEntries)
    setWeekEntries(week)
    setAdvice(computeAdvice(week))
    setStreak(getStreak())
    setToday(
      new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      })
    )

    if (todayEntry) {
      setSelectedEnergy(todayEntry.energy)
      setSuggestion(getRandomSuggestion(todayEntry.energy))
    }
  }, [])

  function handleSelect(level: EnergyLevel) {
    // Save entry
    const updated = saveEntry(level)
    const week = getWeekEntries()

    // Update all state instantly
    setSelectedEnergy(level)
    setSuggestion(getRandomSuggestion(level))
    setEntries(updated)
    setWeekEntries(week)
    setAdvice(computeAdvice(week))
    setStreak(getStreak())
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-sm mx-auto space-y-4">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-block text-xs font-medium text-gray-400 bg-white border border-gray-100 px-3 py-1 rounded-full mb-3">
            {today}
          </span>
          <h1 className="font-serif text-3xl font-normal text-gray-900 tracking-tight">Social Energy</h1>
          <p className="text-sm text-gray-400 mt-1">How are you feeling today?</p>
        </div>

        {/* Energy selector */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-2">Select your energy</p>
          <EnergySelector selected={selectedEnergy} onSelect={handleSelect} />
        </div>

        {/* Suggestion */}
        <SuggestionCard energy={selectedEnergy} suggestion={suggestion} />

        {/* Advice banner */}
        <AdviceBanner advice={advice} />

        {/* Streak */}
        {streak >= 2 && (
          <div className="text-center text-sm text-gray-500 bg-white border border-gray-100 rounded-xl py-2">
            🔁 <span className="font-medium text-gray-700">{streak}-day streak</span> — you're building a habit
          </div>
        )}

        {/* Stats + History */}
        <div className="grid grid-cols-2 gap-3">
          <StatsSummary weekEntries={weekEntries} />
          <HistoryList entries={entries} />
        </div>
      </div>
    </main>
  )
}
