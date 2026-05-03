'use client'

import { EnergyEntry } from '@/lib/types'

interface StatsSummaryProps {
  weekEntries: EnergyEntry[]
}

export default function StatsSummary({ weekEntries }: StatsSummaryProps) {
  const low = weekEntries.filter((e) => e.energy === 'low').length
  const medium = weekEntries.filter((e) => e.energy === 'medium').length
  const high = weekEntries.filter((e) => e.energy === 'high').length
  const total = Math.max(weekEntries.length, 1)

  const stats = [
    { label: '😴 Low', count: low, barColor: 'bg-green-400', pct: Math.round((low / total) * 100) },
    { label: '⚡ Med', count: medium, barColor: 'bg-amber-400', pct: Math.round((medium / total) * 100) },
    { label: '🔥 High', count: high, barColor: 'bg-red-400', pct: Math.round((high / total) * 100) },
  ]

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4">
      <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-3">This week</p>
      <div className="space-y-2.5">
        {stats.map(({ label, count, barColor, pct }) => (
          <div key={label} className="flex items-center gap-2">
            <span className="text-xs text-gray-500 w-14">{label}</span>
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                style={{ width: `${weekEntries.length ? pct : 0}%` }}
              />
            </div>
            <span className="text-xs font-medium text-gray-700 w-4 text-right">{count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
