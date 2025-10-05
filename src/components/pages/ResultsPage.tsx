'use client'

import { motion } from 'framer-motion'
import { Trophy, Star, Home, RotateCcw } from 'lucide-react'
import { PageType } from '@/types'

interface Badge {
  id: string
  name: string
  icon: string
  description: string
  earned: boolean
}

interface ResultsPageProps {
  onNavigate: (page: PageType) => void
  endingType: string
  score: number
  playerName: string
  characterId: string
  onRestart: () => void
}

const endingMessages: Record<string, { title: string; message: string; emoji: string }> = {
  hero: {
    title: 'Space Hero! 🦸',
    message: 'You saved the astronauts on Mars! Your bravery and quick thinking made you a true hero!',
    emoji: '🦸'
  },
  protector: {
    title: 'Earth Protector! 🛡️',
    message: 'You protected our home planet! Thanks to you, everyone on Earth stayed safe and connected!',
    emoji: '🛡️'
  },
  scientist: {
    title: 'Master Scientist! 🔬',
    message: 'Your research will help future explorers! You made important discoveries about solar storms!',
    emoji: '🔬'
  },
  explorer: {
    title: 'Amazing Explorer! 🚀',
    message: 'What an adventure! You learned so much about space weather and kept everyone safe!',
    emoji: '🚀'
  }
}

export default function ResultsPage({
  onNavigate,
  endingType,
  score,
  playerName,
  characterId,
  onRestart
}: ResultsPageProps) {
  const ending = endingMessages[endingType] || endingMessages.explorer
  const starsEarned = Math.min(3, Math.floor(score / 3) + 1)

  const badges: Badge[] = [
    {
      id: 'explorer',
      name: 'Space Explorer',
      icon: '🚀',
      description: 'Completed your first space journey!',
      earned: true
    },
    {
      id: 'learner',
      name: 'Quick Learner',
      icon: '📚',
      description: 'Learned about solar storms!',
      earned: score >= 3
    },
    {
      id: 'hero',
      name: 'Space Hero',
      icon: '⭐',
      description: 'Made brave choices!',
      earned: endingType === 'hero'
    },
    {
      id: 'scientist',
      name: 'Junior Scientist',
      icon: '🔬',
      description: 'Collected scientific data!',
      earned: endingType === 'scientist'
    },
    {
      id: 'protector',
      name: 'Earth Guardian',
      icon: '🌍',
      description: 'Protected our planet!',
      earned: endingType === 'protector'
    },
    {
      id: 'decision_maker',
      name: 'Decision Maker',
      icon: '🎯',
      description: 'Made important choices!',
      earned: score >= 5
    }
  ]

  const earnedBadges = badges.filter(b => b.earned)

  return (
    <div className="max-w-4xl mx-auto">
      {/* Confetti animation */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -50,
              rotate: 0
            }}
            animate={{
              y: window.innerHeight + 50,
              rotate: 360,
              opacity: [1, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 2,
              ease: 'linear'
            }}
          >
            {['🎉', '✨', '⭐', '🌟', '💫'][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', bounce: 0.4 }}
        className="glass-card rounded-3xl p-8 md:p-12 text-center"
      >
        {/* Ending emoji */}
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
          {ending.emoji}
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-space-primary to-space-aurora bg-clip-text text-transparent"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {ending.title}
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Great job, <span className="text-space-primary font-bold">{playerName}</span>!
        </motion.p>

        <motion.p
          className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {ending.message}
        </motion.p>

        {/* Stars */}
        <motion.div
          className="flex justify-center gap-4 mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.7 + i * 0.2,
                type: 'spring',
                bounce: 0.6
              }}
            >
              <Star
                className={`w-16 h-16 ${
                  i < starsEarned
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-gray-600 text-gray-600'
                }`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Score */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card border border-space-primary/30">
            <Trophy className="w-6 h-6 text-space-primary" />
            <span className="text-2xl font-bold">Journey Steps: {score}</span>
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <h2 className="text-2xl font-bold mb-6">Badges Earned! 🏅</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                animate={{
                  opacity: badge.earned ? 1 : 0.3,
                  scale: badge.earned ? 1 : 0.9,
                  rotateY: 0
                }}
                transition={{
                  delay: 1.4 + index * 0.1,
                  type: 'spring',
                  bounce: 0.5
                }}
                whileHover={badge.earned ? { scale: 1.1, rotate: 5 } : {}}
                className={`glass-card rounded-2xl p-4 ${
                  badge.earned
                    ? 'border-2 border-space-primary/50'
                    : 'border border-gray-700 grayscale'
                }`}
              >
                <div className="text-4xl mb-2">{badge.icon}</div>
                <h3 className="font-bold text-sm mb-1">{badge.name}</h3>
                <p className="text-xs text-gray-400">{badge.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Badge count */}
          <motion.p
            className="text-lg text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            You earned <span className="text-space-primary font-bold">{earnedBadges.length}</span> out of{' '}
            <span className="font-bold">{badges.length}</span> badges!
          </motion.p>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <motion.button
            className="btn-primary text-lg"
            onClick={onRestart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-5 h-5" />
            Try Different Path
          </motion.button>

          <motion.button
            className="btn-ghost text-lg"
            onClick={() => onNavigate('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-5 h-5" />
            Back Home
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
