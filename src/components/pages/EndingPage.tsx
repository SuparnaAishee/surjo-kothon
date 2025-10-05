'use client'

import { motion } from 'framer-motion'
import { RotateCcw, Camera, Home } from 'lucide-react'
import { PageType } from '@/types'
import { useNASAData } from '@/hooks/useNASAData'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface EndingPageProps {
  onNavigate: (page: PageType) => void
  nasaData: ReturnType<typeof useNASAData>
}

export default function EndingPage({ onNavigate, nasaData }: EndingPageProps) {
  const { state, fetchAPOD } = nasaData
  const [hasLoadedAPOD, setHasLoadedAPOD] = useState(false)

  const handleLoadAPOD = async () => {
    try {
      await fetchAPOD()
      setHasLoadedAPOD(true)
    } catch (error) {
      console.error('Failed to load APOD:', error)
    }
  }

  const handleReplay = () => {
    onNavigate('story')
  }

  const handleHome = () => {
    onNavigate('home')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto text-center"
    >
      <div className="glass-card rounded-3xl p-8 md:p-12">
        {/* Celebration Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-space-primary via-space-aurora to-space-accent bg-clip-text text-transparent">
            🌌 The End
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            Congratulations, Space Explorer! You've completed Sunny's adventure and learned about space weather!
          </p>
        </motion.div>

        {/* APOD Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* APOD Image */}
          {state.apodData ? (
            <div className="mb-6">
              {state.apodData.media_type === 'image' ? (
                <div className="relative rounded-2xl overflow-hidden">
                  <Image
                    src={state.apodData.url}
                    alt={state.apodData.title}
                    width={800}
                    height={450}
                    className="w-full max-h-96 object-contain bg-gradient-to-br from-space-bg1 to-space-bg2 hover:scale-105 transition-transform duration-300"
                    style={{
                      filter: 'drop-shadow(0 0 30px rgba(255,209,102,0.1))'
                    }}
                  />
                </div>
              ) : (
                <div className="bg-space-card rounded-2xl p-8 border border-white/10">
                  <p className="text-gray-400">
                    Today's APOD is a video. Visit NASA's website to view it!
                  </p>
                </div>
              )}

              <motion.div
                className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="font-bold text-space-primary mb-2">{state.apodData.title}</h3>
                <p className="text-sm text-gray-400 mb-2">{state.apodData.date}</p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {state.apodData.explanation.substring(0, 200)}
                  {state.apodData.explanation.length > 200 ? '...' : ''}
                </p>
              </motion.div>
            </div>
          ) : (
            <div className="mb-6">
              <div className="bg-space-card rounded-2xl p-12 border border-white/10">
                <div className="text-gray-400 mb-4">
                  {state.loading.apod ? (
                    <div className="nasa-status loading">
                      <span className="loading-spinner"></span>
                      Loading NASA's Astronomy Picture of the Day...
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-lg">🌌 Discover Today's Cosmic Wonder!</p>
                      <p className="text-sm">
                        Click "NASA Image of the Day" to see today's amazing space photo
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Error State */}
          {state.error.apod && (
            <div className="nasa-status error mb-6">
              Failed to load NASA's Astronomy Picture of the Day
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            className="btn-primary"
            onClick={handleReplay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-5 h-5" />
            Replay Adventure
          </motion.button>

          <motion.button
            className="btn-secondary"
            onClick={handleLoadAPOD}
            disabled={state.loading.apod}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Camera className="w-5 h-5" />
            {state.loading.apod ? 'Loading...' : 'NASA Image of the Day'}
          </motion.button>

          <motion.button
            className="btn-ghost"
            onClick={handleHome}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-5 h-5" />
            Return Home
          </motion.button>
        </motion.div>

        {/* Achievement Section */}
        <motion.div
          className="p-6 rounded-2xl bg-gradient-to-r from-space-primary/10 to-space-aurora/10 border border-space-primary/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-xl font-bold text-space-primary mb-3">🎓 Space Weather Expert!</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌞</span>
              <span className="text-gray-300">Met Sunny the Solar Flare</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌌</span>
              <span className="text-gray-300">Learned about Auroras</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛰️</span>
              <span className="text-gray-300">Explored NASA Data</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            You've completed your journey through space weather! Now you understand how
            the Sun affects Earth and creates beautiful phenomena like auroras.
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}