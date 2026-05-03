'use client'

import { EnergyLevel } from '@/lib/types'

interface EnergySelectorProps {
  selected: EnergyLevel | null
  onSelect: (level: EnergyLevel) => void
}

const BUTTONS: { level: EnergyLevel; icon: string; label: string; sub: string }[] = [
  { level: 'low', icon: '😴', label: 'Low', sub: 'Rest day' },
  { level: 'medium', icon: '⚡', label: 'Medium', sub: 'Balanced' },
  { level: 'high', icon: '🔥', label: 'High', sub: 'Charged up' },
]

const activeStyles: Record<EnergyLevel, string> = {
  low: 'bg-green-50 border-green-400 ring-2 ring-green-400 ring-offset-1',
  medium: 'bg-amber-50 border-amber-400 ring-2 ring-amber-400 ring-offset-1',
  high: 'bg-red-50 border-red-400 ring-2 ring-red-400 ring-offset-1',
}

const labelStyles: Record<EnergyLevel, string> = {
  low: 'text-green-700',
  medium: 'text-amber-700',
  high: 'text-red-700',
}

export default function EnergySelector({ selected, onSelect }: EnergySelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {BUTTONS.map(({ level, icon, label, sub }) => {
        const isActive = selected === level
        return (
          <button
            key={level}
            onClick={() => onSelect(level)}
            className={`
              flex flex-col items-center gap-1 py-4 px-2 rounded-2xl border
              transition-all duration-150 cursor-pointer
              ${isActive
                ? activeStyles[level]
                : 'bg-white border-gray-200 hover:border-gray-300 hover:-translate-y-0.5'
              }
              active:scale-[0.97]
            `}
          >
            <span className="text-2xl">{icon}</span>
            <span className={`text-sm font-medium ${isActive ? labelStyles[level] : 'text-gray-800'}`}>
              {label}
            </span>
            <span className="text-xs text-gray-400">{sub}</span>
          </button>
        )
      })}
    </div>
  )
}
