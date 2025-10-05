'use client'

import { motion } from 'framer-motion'
import { Play, Satellite, Info, Volume2 } from 'lucide-react'
import { PageType } from '@/types'
import NASALiveModal from '@/components/modals/NASALiveModal'
import AboutModal from '@/components/modals/AboutModal'
import { useState } from 'react'

interface HomePageProps {
  onNavigate: (page: PageType) => void
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [showLiveModal, setShowLiveModal] = useState(false)
  const [showAboutModal, setShowAboutModal] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="glass-card rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
        {/* Hero Sun Animation */}
        <motion.div
          className="hero-sun mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Hero Text */}
        <motion.p
          className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Learn about <strong className="text-space-primary">space weather</strong> (solar flares, CMEs, auroras)
          through a friendly story. Made better with real NASA data!
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.button
            className="btn-primary"
            onClick={() => onNavigate('character')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-5 h-5" />
            Start Your Space Journey
          </motion.button>

          <motion.button
            className="btn-secondary"
            onClick={() => setShowLiveModal(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Satellite className="w-5 h-5" />
            NASA Live Data
          </motion.button>

          <motion.button
            className="btn-ghost"
            onClick={() => setShowAboutModal(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Info className="w-5 h-5" />
            About Space Weather
          </motion.button>
        </motion.div>

        {/* Tip */}
        <motion.div
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-space-card border border-white/10 text-sm text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Volume2 className="w-4 h-4 text-space-aurora" />
          Tip: turn on your volume for narration
        </motion.div>
      </div>

      {/* Modals */}
      <NASALiveModal
        isOpen={showLiveModal}
        onClose={() => setShowLiveModal(false)}
      />
      <AboutModal
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)}
      />
    </motion.div>
  )
}