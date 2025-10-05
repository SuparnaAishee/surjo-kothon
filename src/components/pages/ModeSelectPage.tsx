'use client'

import { motion } from 'framer-motion'
import { BookOpen, Brain, Gamepad2 } from 'lucide-react'
import { PageType } from '@/types'

interface ModeSelectPageProps {
  onNavigate: (page: PageType) => void
}

export default function ModeSelectPage({ onNavigate }: ModeSelectPageProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-space-primary to-space-aurora bg-clip-text text-transparent"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
        >
          Choose Your Adventure! 🚀
        </motion.h1>
        <p className="text-xl text-gray-300">
          Pick how you want to learn about space weather!
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Story Mode */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -10, scale: 1.02 }}
          className="cursor-pointer"
          onClick={() => onNavigate('story')}
        >
          <div className="glass-card rounded-3xl p-8 h-full border-2 border-transparent hover:border-space-primary/50 transition-all">
            <motion.div
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <BookOpen className="w-12 h-12 text-white" />
            </motion.div>

            <h2 className="text-3xl font-bold mb-4 text-center">Story Mode 📖</h2>
            <p className="text-lg text-gray-300 text-center mb-6">
              Meet Sunny the Solar Flare! Listen to an exciting story about space weather and learn step by step.
            </p>

            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Narrator guided journey</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Voice narration</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Fun facts & animations</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Great for younger kids</span>
              </div>
            </div>

            <motion.button
              className="btn-primary w-full mt-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Story Mode
            </motion.button>
          </div>
        </motion.div>

        {/* Quiz/Interactive Mode */}
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ y: -10, scale: 1.02 }}
          className="cursor-pointer"
          onClick={() => onNavigate('interactive')}
        >
          <div className="glass-card rounded-3xl p-8 h-full border-2 border-transparent hover:border-space-aurora/50 transition-all">
            <motion.div
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Brain className="w-12 h-12 text-white" />
            </motion.div>

            <h2 className="text-3xl font-bold mb-4 text-center">Interactive Mode 🎮</h2>
            <p className="text-lg text-gray-300 text-center mb-6">
              Make choices that affect the story! Choose your path and see different outcomes.
            </p>

            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span className="text-blue-400">✓</span>
                <span>Choice-based adventure</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-400">✓</span>
                <span>Multiple story paths</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-400">✓</span>
                <span>Different endings</span>
              </div>
            </div>

            <motion.button
              className="btn-secondary w-full mt-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Interactive
            </motion.button>
          </div>
        </motion.div>

        {/* Game Mode */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ y: -10, scale: 1.02 }}
          className="cursor-pointer"
          onClick={() => onNavigate('game')}
        >
          <div className="glass-card rounded-3xl p-8 h-full border-2 border-transparent hover:border-green-500/50 transition-all">
            <motion.div
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Gamepad2 className="w-12 h-12 text-white" />
            </motion.div>

            <h2 className="text-3xl font-bold mb-4 text-center">Game Mode 🕹️</h2>
            <p className="text-lg text-gray-300 text-center mb-6">
              Play fun mini-games to learn about solar storms and space weather in an exciting way!
            </p>

            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Solar storm dodger</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Planet protector</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Aurora collector</span>
              </div>
            </div>

            <motion.button
              className="btn-ghost w-full mt-6 border-green-500/30 hover:bg-green-500/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Play Games
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
