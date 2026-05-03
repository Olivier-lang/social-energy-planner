'use client'

import { Advice } from '@/lib/advice'

interface AdviceBannerProps {
  advice: Advice | null
}

const variantStyles = {
  green: 'bg-green-50 border-green-300 text-green-800',
  blue: 'bg-blue-50 border-blue-300 text-blue-800',
  neutral: 'bg-gray-50 border-gray-200 text-gray-600',
}

export default function AdviceBanner({ advice }: AdviceBannerProps) {
  if (!advice) return null

  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 rounded-xl border text-sm animate-in fade-in duration-400 ${variantStyles[advice.variant]}`}
    >
      <span className="text-base flex-shrink-0 mt-0.5">{advice.icon}</span>
      <span>{advice.text}</span>
    </div>
  )
}
