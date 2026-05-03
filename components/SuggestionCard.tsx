'use client'

import { EnergyLevel, Suggestion } from '@/lib/types'

interface SuggestionCardProps {
  energy: EnergyLevel | null
  suggestion: Suggestion | null
}

const cardStyles: Record<EnergyLevel, string> = {
  low: 'bg-green-50 border-green-300',
  medium: 'bg-amber-50 border-amber-300',
  high: 'bg-red-50 border-red-300',
}

const hintStyles: Record<EnergyLevel, string> = {
  low: 'text-green-600',
  medium: 'text-amber-600',
  high: 'text-red-600',
}

const hints: Record<EnergyLevel, string> = {
  low: 'Rest mode',
  medium: 'Social mode',
  high: 'Go mode',
}

export default function SuggestionCard({ energy, suggestion }: SuggestionCardProps) {
  if (!energy || !suggestion) {
    return (
      <div className="flex items-center gap-4 p-5 rounded-2xl border border-gray-100 bg-gray-50 min-h-[88px]">
        <span className="text-3xl">✨</span>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-1">Suggestion</p>
          <p className="text-sm text-gray-400 italic">Pick an energy level to get started</p>
        </div>
      </div>
    )
  }

  return (
    <div
      key={suggestion.text}
      className={`flex items-center gap-4 p-5 rounded-2xl border min-h-[88px] ${cardStyles[energy]} animate-in fade-in slide-in-from-bottom-1 duration-300`}
    >
      <span className="text-3xl flex-shrink-0">{suggestion.icon}</span>
      <div>
        <p className={`text-xs font-medium uppercase tracking-wider mb-1 ${hintStyles[energy]}`}>
          {hints[energy]}
        </p>
        <p className="text-lg font-serif text-gray-900 leading-snug">{suggestion.text}</p>
      </div>
    </div>
  )
}
