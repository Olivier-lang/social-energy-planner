import { EnergyLevel, Suggestion } from './types'

const SUGGESTIONS: Record<EnergyLevel, Suggestion[]> = {
  low: [
    { icon: '🌿', text: 'Stay in and recharge quietly' },
    { icon: '🚶', text: 'Go for a slow solo walk' },
    { icon: '📖', text: 'Read something light and enjoyable' },
    { icon: '🎵', text: 'Put on music and do nothing' },
    { icon: '🛁', text: 'Take a long shower or bath' },
    { icon: '🍵', text: 'Make tea and watch something calming' },
  ],
  medium: [
    { icon: '☕', text: 'Grab food with one close friend' },
    { icon: '📞', text: 'Call someone you trust' },
    { icon: '🎬', text: 'Watch something together online' },
    { icon: '🛍️', text: 'Do a casual errand with company' },
    { icon: '🧩', text: 'Play a chill board game or activity' },
    { icon: '🚴', text: 'Go for a bike ride with someone' },
  ],
  high: [
    { icon: '🎉', text: 'Go out and meet new people' },
    { icon: '🏃', text: 'Join an event or group activity' },
    { icon: '🌆', text: 'Explore somewhere new in the city' },
    { icon: '🎤', text: 'Say yes to that invite you\'ve been avoiding' },
    { icon: '🤝', text: 'Reconnect with someone you miss' },
    { icon: '🎸', text: 'Try something spontaneous tonight' },
  ],
}

// Track last shown index per level to avoid repetition
const lastShownIndex: Record<EnergyLevel, number> = {
  low: -1,
  medium: -1,
  high: -1,
}

export function getRandomSuggestion(level: EnergyLevel): Suggestion {
  const pool = SUGGESTIONS[level]
  let idx: number
  do {
    idx = Math.floor(Math.random() * pool.length)
  } while (pool.length > 1 && idx === lastShownIndex[level])
  lastShownIndex[level] = idx
  return pool[idx]
}

export { SUGGESTIONS }
