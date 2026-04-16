import { useState, useEffect } from 'react'

export interface Quote {
  q: string
  a: string
}

const COOKIE_NAME = 'zen_quotes'
const COOKIE_TTL_HOURS = 1
const MAX_QUOTES = 10
const API_URL = 'https://zenquotes.io/api/quotes/'

const FALLBACK_QUOTES: Quote[] = [
  { q: 'The only way to do great work is to love what you do.', a: 'Steve Jobs' },
  { q: 'Code is like humor. When you have to explain it, it\'s bad.', a: 'Cory House' },
  { q: 'First, solve the problem. Then, write the code.', a: 'John Johnson' },
  { q: 'Simplicity is the soul of efficiency.', a: 'Austin Freeman' },
  { q: 'Make it work, make it right, make it fast.', a: 'Kent Beck' },
  { q: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', a: 'Martin Fowler' },
  { q: 'The best error message is the one that never shows up.', a: 'Thomas Fuchs' },
  { q: 'Programming is the art of telling another human what one wants the computer to do.', a: 'Donald Knuth' },
  { q: 'Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.', a: 'Antoine de Saint-Exupéry' },
  { q: 'Talk is cheap. Show me the code.', a: 'Linus Torvalds' },
]

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

function setCookie(name: string, value: string, hours: number): void {
  const expires = new Date(Date.now() + hours * 3600_000).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`
}

function getStoredQuotes(): Quote[] | null {
  const raw = getCookie(COOKIE_NAME)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : null
  } catch {
    return null
  }
}

function pickRandom(quotes: Quote[]): Quote {
  return quotes[Math.floor(Math.random() * quotes.length)]
}

async function fetchAndStoreQuotes(): Promise<Quote[]> {
  try {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error(`${res.status}`)
    const data: Quote[] = await res.json()
    const trimmed = data.slice(0, MAX_QUOTES).map(({ q, a }) => ({ q, a }))
    setCookie(COOKIE_NAME, JSON.stringify(trimmed), COOKIE_TTL_HOURS)
    return trimmed
  } catch {
    return FALLBACK_QUOTES
  }
}

export async function getRandomQuote(): Promise<Quote> {
  const stored = getStoredQuotes()
  if (stored) return pickRandom(stored)
  const quotes = await fetchAndStoreQuotes()
  return pickRandom(quotes)
}

export function useRandomQuote(): Quote | null {
  const [quote, setQuote] = useState<Quote | null>(null)

  useEffect(() => {
    getRandomQuote().then(setQuote)
  }, [])

  return quote
}
