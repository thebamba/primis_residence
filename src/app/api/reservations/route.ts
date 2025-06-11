import { NextRequest, NextResponse } from 'next/server'
import { addReservation, getBlockedDates, getReservations, initializeUnits, redis, getUnitKey } from '@/lib/redis'

// Initialize units on startup
initializeUnits()

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const unit = searchParams.get('unit')
  const checkDates = searchParams.get('checkDates') === 'true'
  
  if (!unit) {
    return NextResponse.json({ error: 'Unit type is required' }, { status: 400 })
  }
  
  try {
    if (checkDates) {
      const startDate = searchParams.get('startDate')
      const endDate = searchParams.get('endDate')
      
      if (!startDate || !endDate) {
        return NextResponse.json({ error: 'Start and end dates are required for date checking' }, { status: 400 })
      }
      
      const blockedDates = await getBlockedDates(unit, new Date(startDate), new Date(endDate))
      return NextResponse.json({ blockedDates })
    } else {
      const reservations = await getReservations(unit)
      return NextResponse.json(reservations)
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reservations' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { unit, from, to } = await request.json()
    
    if (!unit || !from || !to) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    const success = await addReservation(unit, { from, to })
    
    if (!success) {
      return NextResponse.json({ error: 'Dates not available' }, { status: 409 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create reservation' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const unit = request.nextUrl.searchParams.get('unit')
    
    if (!unit) {
      return NextResponse.json({ error: 'Unit parameter is required' }, { status: 400 })
    }
    
    const key = getUnitKey(unit)
    await redis.set(key, [])
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to clear reservations' }, { status: 500 })
  }
}
