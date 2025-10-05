'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Lightbulb, Satellite } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNASAData } from '@/hooks/useNASAData'

interface FunFactModalProps {
  isOpen: boolean
  onClose: () => void
  nasaData: ReturnType<typeof useNASAData>
  customFact?: string
}

export default function FunFactModal({ isOpen, onClose, nasaData, customFact }: FunFactModalProps) {
  const { state, fetchCMEs, getLatestCME, formatCMEData } = nasaData
  const [hasInitialLoad, setHasInitialLoad] = useState(false)

  useEffect(() => {
    if (isOpen && !hasInitialLoad && !customFact) {
      handleFetchData()
      setHasInitialLoad(true)
    }
  }, [isOpen, hasInitialLoad, customFact])

  const handleFetchData = async () => {
    try {
      await fetchCMEs(21)
    } catch (error) {
      console.error('Failed to fetch CME data:', error)
    }
  }

  const latestCME = getLatestCME()
  const cmeData = latestCME ? formatCMEData(latestCME) : null

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
          className="glass-card rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-space-primary" />
              <h3 className="text-xl font-bold text-white">Did You Know?</h3>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-space-card border border-white/10 text-xs text-gray-300">
                <Satellite className="w-3 h-3" />
                CME
              </span>
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
            {/* Custom Fact Display */}
            {customFact ? (
              <motion.div
                className="p-6 rounded-2xl bg-gradient-to-br from-space-primary/10 to-space-aurora/10 border border-space-primary/20"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">💡</div>
                  <p className="text-lg text-gray-200 leading-relaxed flex-1">
                    {customFact}
                  </p>
                </div>
              </motion.div>
            ) : (
              <>
                {/* Loading State */}
                {state.loading.cme && (
                  <div className="nasa-status loading">
                    <span className="loading-spinner"></span>
                    Loading real CME data from NASA...
                  </div>
                )}

                {/* Error State */}
                {state.error.cme && (
                  <div className="nasa-status error">
                    Could not load NASA data. Try again later.
                  </div>
                )}

                {/* Success State */}
                {!state.loading.cme && !state.error.cme && (
                  <>
                    {!latestCME ? (
                      <div className="nasa-status error">
                        No CME events found in the recent window.
                      </div>
                    ) : (
                  <>
                    <div className="nasa-status success">
                      🛰️ Live NASA Data
                    </div>

                    <div className="mb-6">
                      <p className="text-lg text-gray-300 leading-relaxed">
                        <strong>Recent Coronal Mass Ejection detected!</strong>
                        <br />
                        On {cmeData!.date}, NASA's DONKI system observed a CME traveling at{' '}
                        <span className="text-space-primary font-semibold">{cmeData!.speed}</span>.
                        {latestCME.speed && latestCME.speed > 800
                          ? ' This was a significant space weather event!'
                          : ' This represents typical solar activity.'}
                      </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      {[
                        ['Event Date', cmeData!.date],
                        ['Velocity', cmeData!.speed],
                        ['Severity Level', cmeData!.severity],
                        ['Source Region', cmeData!.source],
                        ['Detection Method', cmeData!.detectionMethod],
                        ['Impact Forecast', cmeData!.impactForecast]
                      ].map(([label, value], index) => (
                        <motion.div
                          key={label}
                          className="data-card"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="data-label">{label}</div>
                          <div className="data-value">{value}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Educational Content */}
                    <motion.div
                      className="mt-6 p-4 rounded-2xl bg-space-primary/5 border border-space-primary/20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <h4 className="text-space-primary font-bold mb-2">🌟 Fun Fact</h4>
                      <p className="text-sm text-gray-400">
                        Coronal Mass Ejections (CMEs) are huge explosions of magnetic field and plasma from the Sun's corona.
                        When they reach Earth, they can cause beautiful auroras and sometimes disrupt satellites and power grids!
                      </p>
                    </motion.div>
                    </>
                  )}
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