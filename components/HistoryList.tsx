'use client'

import { EnergyEntry, EnergyLevel } from '@/lib/types'

interface HistoryListProps {
  entries: EnergyEntry[]
}

const pillStyles: Record<EnergyLevel, string> = {
  low: 'bg-green-50 text-green-700',
  medium: 'bg-amber-50 text-amber-700',
  high: 'bg-red-50 text-red-700',
}

const pillLabels: Record<EnergyLevel, string> = {
  low: 'Low',
  medium: 'Med',
  high: 'High',
}

function formatDate(iso: string): string {
  const d = new Date(iso + 'T12:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function HistoryList({ entries }: HistoryListProps) {
  const recent = entries.slice(0, 6)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4">
      <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-3">History</p>
      {recent.length === 0 ? (
        <p className="text-sm text-gray-400 italic text-center py-4">No entries yet</p>
      ) : (
        <ul className="space-y-0 divide-y divide-gray-50">
          {recent.map((entry) => (
            <li key={entry.date} className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-500">{formatDate(entry.date)}</span>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${pillStyles[entry.energy]}`}>
                {pillLabels[entry.energy]}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
