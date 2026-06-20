import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get('address')
  if (!address) {
    return NextResponse.json({ error: 'Missing address' }, { status: 400 })
  }

  const url =
    `https://geocoding.geo.census.gov/geocoder/geographies/onelineaddress` +
    `?address=${encodeURIComponent(address)}` +
    `&benchmark=Public_AR_Current` +
    `&vintage=Census2020_Current` +
    `&layers=all` +
    `&format=json`

  const res = await fetch(url)
  if (!res.ok) {
    return NextResponse.json({ error: 'Geocoder error' }, { status: 502 })
  }

  const data = await res.json()
  return NextResponse.json(data)
}
