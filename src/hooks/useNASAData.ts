'use client'

import { useState, useCallback } from 'react'

export interface CMEData {
  startTime: string
  speed?: number
  sourceLocation?: string
  link?: string
}

export interface APODData {
  title: string
  explanation: string
  url: string
  media_type: string
  date: string
}

export interface NASADataState {
  cmeData: CMEData[]
  apodData: APODData | null
  loading: {
    cme: boolean
    apod: boolean
  }
  error: {
    cme: string | null
    apod: string | null
  }
}

const NASA_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY || '9FVBcpihm1Pc0cGSZsBWzR0g1Bk988yZQVRUgsfe'

export function useNASAData() {
  const [state, setState] = useState<NASADataState>({
    cmeData: [],
    apodData: null,
    loading: { cme: false, apod: false },
    error: { cme: null, apod: null }
  })

  const dateISOOffset = (days: number) => {
    const d = new Date()
    d.setDate(d.getDate() + days)
    return d.toISOString().slice(0, 10)
  }

  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60))

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    return 'Recent'
  }

  const fetchCMEs = useCallback(async (daysBack: number = 14) => {
    setState(prev => ({
      ...prev,
      loading: { ...prev.loading, cme: true },
      error: { ...prev.error, cme: null }
    }))

    try {
      const start = dateISOOffset(-daysBack)
      const end = dateISOOffset(0)
      const url = `https://api.nasa.gov/DONKI/CME?startDate=${start}&endDate=${end}&api_key=${NASA_KEY}`

      const response = await fetch(url)
      if (!response.ok) throw new Error('NASA DONKI request failed')

      const data: CMEData[] = await response.json()

      setState(prev => ({
        ...prev,
        cmeData: data,
        loading: { ...prev.loading, cme: false }
      }))

      return data
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: { ...prev.loading, cme: false },
        error: { ...prev.error, cme: error instanceof Error ? error.message : 'Unknown error' }
      }))
      throw error
    }
  }, [])

  const fetchAPOD = useCallback(async () => {
    setState(prev => ({
      ...prev,
      loading: { ...prev.loading, apod: true },
      error: { ...prev.error, apod: null }
    }))

    try {
      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`

      const response = await fetch(url)
      if (!response.ok) throw new Error('APOD request failed')

      const data: APODData = await response.json()

      setState(prev => ({
        ...prev,
        apodData: data,
        loading: { ...prev.loading, apod: false }
      }))

      return data
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: { ...prev.loading, apod: false },
        error: { ...prev.error, apod: error instanceof Error ? error.message : 'Unknown error' }
      }))
      throw error
    }
  }, [])

  const getLatestCME = useCallback(() => {
    if (!state.cmeData.length) return null

    // Find CME with speed data, or fallback to first
    const cmeWithSpeed = state.cmeData.find(cme => cme.speed && cme.speed > 300)
    return cmeWithSpeed || state.cmeData[0]
  }, [state.cmeData])

  const getCMESeverity = useCallback((speed?: number) => {
    if (!speed) return 'Unknown'
    if (speed > 1000) return 'Extreme'
    if (speed > 700) return 'High'
    if (speed > 400) return 'Moderate'
    return 'Low'
  }, [])

  const formatCMEData = useCallback((cme: CMEData) => {
    const date = new Date(cme.startTime)
    const timeAgo = getTimeAgo(date)
    const speed = cme.speed ? `${cme.speed.toLocaleString()} km/s` : 'Unknown'
    const severity = getCMESeverity(cme.speed)
    const impactForecast = cme.speed && cme.speed > 600
      ? 'Possible aurora activity'
      : 'Minimal impact expected'

    return {
      date: date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      timeAgo,
      speed,
      severity,
      source: cme.sourceLocation || 'Solar Corona',
      impactForecast,
      detectionMethod: 'SOHO/STEREO Spacecraft'
    }
  }, [getCMESeverity])

  return {
    state,
    fetchCMEs,
    fetchAPOD,
    getLatestCME,
    getCMESeverity,
    formatCMEData,
    getTimeAgo
  }
}