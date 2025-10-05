'use client'

import { motion } from 'framer-motion'
import { Zap, Shield, Sparkles, Target, Rocket, Home } from 'lucide-react'
import { PageType } from '@/types'

interface GameSelectionPageProps {
  onNavigate: (page: PageType) => void
}

const games = [
  {
    id: 'solar-dodge',
    title: 'Solar Storm Dodger',
    icon: <Zap className="w-12 h-12" />,
    description: 'Dodge incoming solar flares and collect energy!',
    color: 'from-orange-500 to-red-500',
    difficulty: 'Easy'
  },
  {
    id: 'planet-shield',
    title: 'Planet Protector',
    icon: <Shield className="w-12 h-12" />,
    description: 'Protect Earth from solar radiation!',
    color: 'from-blue-500 to-cyan-500',
    difficulty: 'Medium'
  },
  {
    id: 'aurora-collect',
    title: 'Aurora Collector',
    icon: <Sparkles className="w-12 h-12" />,
    description: 'Collect beautiful aurora particles!',
    color: 'from-purple-500 to-pink-500',
    difficulty: 'Easy'
  },
  {
    id: 'satellite-save',
    title: 'Satellite Saver',
    icon: <Target className="w-12 h-12" />,
    description: 'Guide satellites to safety zones!',
    color: 'from-green-500 to-emerald-500',
    difficulty: 'Medium'
  },
  {
    id: 'space-quiz',
    title: 'Space Quiz Challenge',
    icon: <Rocket className="w-12 h-12" />,
    description: 'Test your space weather knowledge!',
    color: 'from-yellow-500 to-orange-500',
    difficulty: 'Hard'
  }
]

export default function GameSelectionPage({ onNavigate }: GameSelectionPageProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
        >
          Choose Your Game! 🎮
        </motion.h1>
        <p className="text-xl text-gray-300">
          Play fun mini-games and learn about space weather!
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: 'spring' }}
            whileHover={{ y: -10, scale: 1.03 }}
            className="cursor-pointer"
            onClick={() => onNavigate(`game-${game.id}` as PageType)}
          >
            <div className="glass-card rounded-3xl p-6 h-full border-2 border-transparent hover:border-green-500/50 transition-all">
              {/* Icon */}
              <motion.div
                className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${game.color} flex items-center justify-center text-white`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {game.icon}
              </motion.div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-2 text-center">{game.title}</h3>

              {/* Description */}
              <p className="text-gray-400 text-center mb-4">{game.description}</p>

              {/* Difficulty Badge */}
              <div className="flex justify-center">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                  game.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400 border border-green-500/50' :
                  game.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' :
                  'bg-red-500/20 text-red-400 border border-red-500/50'
                }`}>
                  {game.difficulty}
                </span>
              </div>

              {/* Play Button */}
              <motion.button
                className="btn-ghost w-full mt-4 border-green-500/30 hover:bg-green-500/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Play Now
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Back Button */}
      <div className="flex justify-center">
        <motion.button
          className="btn-ghost"
          onClick={() => onNavigate('mode-select')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Home className="w-5 h-5" />
          Back to Modes
        </motion.button>
      </div>
    </div>
  )
}
