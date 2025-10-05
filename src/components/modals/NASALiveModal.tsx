'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, RefreshCw, Satellite } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNASAData } from '@/hooks/useNASAData'

interface NASALiveModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function NASALiveModal({ isOpen, onClose }: NASALiveModalProps) {
  const { state, fetchCMEs, getTimeAgo, getCMESeverity } = useNASAData()
  const [hasInitialLoad, setHasInitialLoad] = useState(false)

  useEffect(() => {
    if (isOpen && !hasInitialLoad) {
      handleRefresh()
      setHasInitialLoad(true)
    }
  }, [isOpen, hasInitialLoad])

  const handleRefresh = async () => {
    try {
      await fetchCMEs(21)
    } catch (error) {
      console.error('Failed to fetch CME data:', error)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Extreme': return 'text-red-400'
      case 'High': return 'text-orange-400'
      case 'Moderate': return 'text-yellow-400'
      case 'Low': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  const getSeverityEmoji = (severity: string) => {
    switch (severity) {
      case 'Extreme': return '🔴'
      case 'High': return '🟡'
      case 'Moderate': return '🟠'
      case 'Low': return '🟢'
      default: return '⚪'
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="glass-card rounded-3xl w-full max-w-4xl max-h-[85vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Satellite className="w-6 h-6 text-space-accent" />
              <h3 className="text-xl font-bold text-white">NASA Space Weather Updates</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Controls */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-gray-400">
                Latest CMEs from DONKI (past ~3 weeks)
              </span>
              <button
                onClick={handleRefresh}
                disabled={state.loading.cme}
                className="btn-ghost text-sm py-2 px-4"
              >
                <RefreshCw className={`w-4 h-4 ${state.loading.cme ? 'animate-spin' : ''}`} />
                Refresh Data
              </button>
            </div>

            {/* Loading State */}
            {state.loading.cme && (
              <div className="nasa-status loading">
                <span className="loading-spinner"></span>
                Connecting to NASA satellites...
              </div>
            )}

            {/* Error State */}
            {state.error.cme && (
              <div className="nasa-status error">
                Failed to load NASA data
              </div>
            )}

            {/* Success State */}
            {!state.loading.cme && !state.error.cme && (
              <>
                {state.cmeData.length === 0 ? (
                  <div className="nasa-status error">
                    <p className="text-gray-400">
                      No recent CME events found. NASA DONKI shows no Coronal Mass Ejections
                      in the past 3 weeks. This indicates relatively quiet solar conditions.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="nasa-status success">
                      Real-time data from NASA DONKI
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      {state.cmeData
                        .filter(item => item.startTime)
                        .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
                        .slice(0, 6)
                        .map((item, index) => {
                          const date = new Date(item.startTime)
                          const timeAgo = getTimeAgo(date)
                          const speed = item.speed || 0
                          const severity = getCMESeverity(speed)
                          const severityColor = getSeverityColor(severity)
                          const severityEmoji = getSeverityEmoji(severity)

                          return (
                            <motion.div
                              key={`${item.startTime}-${index}`}
                              className="data-card"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className="data-label">CME Event #{index + 1}</div>
                              <div className="data-value mb-3">{timeAgo}</div>

                              <div className="data-label">Velocity</div>
                              <div className="data-value">
                                {speed ? `${speed.toLocaleString()} km/s` : 'Unknown'}
                              </div>

                              <div className="data-label">Severity</div>
                              <div className={`data-value flex items-center gap-2 ${severityColor}`}>
                                <span>{severityEmoji}</span>
                                {severity}
                              </div>

                              <div className="data-label">Source</div>
                              <div className="data-value">
                                {item.sourceLocation || 'Solar Corona'}
                              </div>
                            </motion.div>
                          )
                        })}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}