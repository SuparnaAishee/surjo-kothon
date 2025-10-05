'use client'

import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import { PageType } from '@/types'

interface GamePlaceholderProps {
  onNavigate: (page: PageType) => void
  gameTitle: string
  gameIcon: string
}

export default function GamePlaceholder({ onNavigate, gameTitle, gameIcon }: GamePlaceholderProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card rounded-3xl p-12 text-center"
      >
        <motion.div
          className="text-8xl mb-6"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        >
          {gameIcon}
        </motion.div>

        <h1 className="text-4xl font-black mb-4 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          {gameTitle}
        </h1>

        <p className="text-xl text-gray-300 mb-8">
          🚧 Coming Soon! 🚧
        </p>

        <p className="text-gray-400 mb-8">
          This game is under development. We're working hard to make it awesome!
        </p>

        <div className="flex gap-4 justify-center">
          <motion.button
            className="btn-ghost"
            onClick={() => onNavigate('game')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Games
          </motion.button>

          <motion.button
            className="btn-primary"
            onClick={() => onNavigate('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-5 h-5" />
            Home
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
