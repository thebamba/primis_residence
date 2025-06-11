import { Redis } from '@upstash/redis'

if (!process.env.UPSTASH_REDIS_REST_URL) {
  throw new Error('UPSTASH_REDIS_REST_URL is not defined in environment variables')
}

if (!process.env.UPSTASH_REDIS_REST_TOKEN) {
  throw new Error('UPSTASH_REDIS_REST_TOKEN is not defined in environment variables')
}

// Create Redis Client
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

// Unit type configurations
export const UNIT_CAPACITIES: Record<string, number> = {
  'mini-studio': 1,
  'studio-suite': 2,
  'appartement-f3': 2,
  'chambre-standard': 6
}

// Key format: unit:dates (e.g., "mini-studio:dates")
export const getUnitKey = (unit: string) => `${unit}:dates`

export type Reservation = {
  from: string
  to: string
}

function normalizeDate(date: string | Date): string {
  const d = new Date(date)
  return d.toISOString().split('T')[0]
}

export function isOverlap(startA: string, endA: string, startB: string, endB: string): boolean {
  const start1 = new Date(normalizeDate(startA))
  const end1 = new Date(normalizeDate(endA))
  const start2 = new Date(normalizeDate(startB))
  const end2 = new Date(normalizeDate(endB))
  return start1 <= end2 && end1 >= start2
}

function getOverlappingReservationsForDate(reservations: Reservation[], date: string): number {
  return reservations.filter(r => {
    const startDate = normalizeDate(r.from)
    const endDate = normalizeDate(r.to)
    const checkDate = normalizeDate(date)
    return new Date(startDate) <= new Date(checkDate) && new Date(endDate) >= new Date(checkDate)
  }).length
}

export async function getReservations(unit: string): Promise<Reservation[]> {
  const key = getUnitKey(unit)
  const reservations = await redis.get<Reservation[]>(key)
  return reservations || []
}

export async function areDatesAvailable(unit: string, from: string, to: string): Promise<boolean> {
  const reservations = await getReservations(unit)
  const capacity = UNIT_CAPACITIES[unit] || 1
  
  const start = new Date(from)
  const end = new Date(to)
  const current = new Date(start)
  
  while (current <= end) {
    const overlappingCount = getOverlappingReservationsForDate(reservations, normalizeDate(current))
    if (overlappingCount >= capacity) {
      return false
    }
    current.setDate(current.getDate() + 1)
  }
  
  return true
}

export async function getBlockedDates(unit: string, startDate: Date, endDate: Date): Promise<Date[]> {
  const reservations = await getReservations(unit)
  const capacity = UNIT_CAPACITIES[unit] || 1
  const blockedDates: Date[] = []
  
  const current = new Date(startDate)
  while (current <= endDate) {
    const currentStr = normalizeDate(current)
    const overlappingCount = getOverlappingReservationsForDate(reservations, currentStr)
    
    if (overlappingCount >= capacity) {
      blockedDates.push(new Date(current))
    }
    current.setDate(current.getDate() + 1)
  }
  
  return blockedDates
}

export async function addReservation(unit: string, newRes: Reservation): Promise<boolean> {
  const key = getUnitKey(unit)
  const existing = await getReservations(unit)
  const capacity = UNIT_CAPACITIES[unit] || 1
  
  const normalizedFrom = normalizeDate(newRes.from)
  const normalizedTo = normalizeDate(newRes.to)
  
  const start = new Date(normalizedFrom)
  const end = new Date(normalizedTo)
  const current = new Date(start)
  
  while (current <= end) {
    const currentStr = normalizeDate(current)
    const overlappingCount = getOverlappingReservationsForDate(existing, currentStr)
    
    if (overlappingCount >= capacity) {
      return false
    }
    current.setDate(current.getDate() + 1)
  }
  
  const normalized = {
    from: normalizedFrom,
    to: normalizedTo
  }
  await redis.set(key, [...existing, normalized])
  return true
}

export async function initializeUnits() {
  const units = Object.keys(UNIT_CAPACITIES)
  
  for (const unit of units) {
    const key = getUnitKey(unit)
    const exists = await redis.exists(key)
    if (!exists) {
      await redis.set(key, [])
    }
  }
} 