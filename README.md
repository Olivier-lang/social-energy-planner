Social Energy Planner
A lightweight self-awareness app that helps you track your daily social energy and get personalized suggestions.

What it does

Pick Low / Medium / High energy each day
Get an instant randomized suggestion
Tracks history and streaks locally — no account needed
Adapts advice based on your last 7 days
Stack

Next.js 14
TypeScript
Tailwind CSS
localStorage
Getting started

npm install
npm run dev
Adaptive advice rules

Pattern	Message
4+ Low days	"You seem drained. Prioritize rest."
4+ High days	"You've been very active. Rest too."
3+ days, balanced	"Your energy looks balanced."
Fewer than 3 entries	No advice shown yet
