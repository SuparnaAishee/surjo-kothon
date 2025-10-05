'use client'

import { motion } from 'framer-motion'
import { Rocket, Microscope, Wrench, Star } from 'lucide-react'

interface AvatarCharacterProps {
  characterId: string
  action: 'idle' | 'walking' | 'looking' | 'pointing' | 'worried' | 'excited' | 'celebrating'
  playerName: string
}

const characterIcons: Record<string, React.ReactNode> = {
  stella: <Rocket className="w-12 h-12" />,
  nova: <Microscope className="w-12 h-12" />,
  orbit: <Wrench className="w-12 h-12" />,
  luna: <Star className="w-12 h-12" />
}

const characterColors: Record<string, string> = {
  stella: 'from-blue-500 to-cyan-500',
  nova: 'from-purple-500 to-pink-500',
  orbit: 'from-orange-500 to-yellow-500',
  luna: 'from-green-500 to-emerald-500'
}

export default function AvatarCharacter({ characterId, action, playerName }: AvatarCharacterProps) {
  const icon = characterIcons[characterId] || characterIcons.stella
  const gradient = characterColors[characterId] || characterColors.stella

  const actionAnimations = {
    idle: {
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0]
    },
    walking: {
      x: [0, 10, 0, -10, 0],
      rotate: [0, -10, 10, -10, 0]
    },
    looking: {
      rotate: [-20, 20, -20],
      scale: [1, 1.1, 1]
    },
    pointing: {
      rotate: [0, -30, -30],
      x: [0, 20, 20],
      scale: [1, 1.1, 1]
    },
    worried: {
      y: [0, -5, 0],
      rotate: [0, -10, 10, -10, 0],
      scale: [1, 0.95, 1]
    },
    excited: {
      y: [0, -20, 0, -15, 0],
      rotate: [0, 360],
      scale: [1, 1.2, 1]
    },
    celebrating: {
      y: [0, -30, 0, -20, 0],
      rotate: [0, 15, -15, 10, -10, 0],
      scale: [1, 1.3, 1.1, 1]
    }
  }

  const actionEmojis: Record<string, string> = {
    idle: '😊',
    walking: '🚶',
    looking: '👀',
    pointing: '👉',
    worried: '😰',
    excited: '🤩',
    celebrating: '🎉'
  }

  return (
    <div className="relative">
      {/* Avatar container */}
      <motion.div
        className="relative"
        animate={actionAnimations[action]}
        transition={{
          duration: action === 'excited' || action === 'celebrating' ? 0.8 : 1.5,
          repeat: Infinity,
          repeatType: action === 'pointing' ? 'mirror' : 'reverse',
          ease: 'easeInOut'
        }}
      >
        {/* Glow effect */}
        <motion.div
          className={`absolute inset-0 rounded-full bg-gradient-to-r ${gradient} blur-xl opacity-30`}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />

        {/* Character icon */}
        <div className={`relative w-32 h-32 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-2xl border-4 border-white/20`}>
          {icon}
        </div>

        {/* Action emoji */}
        <motion.div
          className="absolute -top-2 -right-2 text-3xl"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.5 }}
          key={action}
        >
          {actionEmojis[action]}
        </motion.div>

        {/* Sparkles for excited/celebrating */}
        {(action === 'excited' || action === 'celebrating') && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + (i % 2) * 30}%`
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              >
                ✨
              </motion.div>
            ))}
          </>
        )}
      </motion.div>

      {/* Name tag */}
      <motion.div
        className="mt-4 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-space-primary/30">
          <span className="font-bold text-space-primary">{playerName}</span>
        </div>
      </motion.div>
    </div>
  )
}
