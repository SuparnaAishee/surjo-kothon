'use client'

import { motion } from 'framer-motion'
import { getNarratorEmoji } from '@/data/linearStoryData'

interface NarratorCharacterProps {
  emotion: 'happy' | 'excited' | 'worried' | 'explaining' | 'celebrating'
  text: string
}

export default function NarratorCharacter({ emotion, text }: NarratorCharacterProps) {
  const emoji = getNarratorEmoji(emotion)

  const sunAnimation = {
    happy: {
      scale: [1, 1.1, 1],
      rotate: [0, 10, -10, 0]
    },
    excited: {
      scale: [1, 1.2, 1],
      rotate: [0, 360]
    },
    worried: {
      scale: [1, 0.95, 1],
      y: [0, -5, 0]
    },
    explaining: {
      scale: [1, 1.05, 1],
      rotate: [0, 5, -5, 0]
    },
    celebrating: {
      scale: [1, 1.3, 1.2, 1],
      rotate: [0, 20, -20, 0]
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-start gap-4 mb-6"
    >
      {/* Sunny Character */}
      <motion.div
        className="relative flex-shrink-0"
        animate={sunAnimation[emotion]}
        transition={{
          duration: emotion === 'excited' ? 0.8 : 1.5,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      >
        {/* Sun glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 blur-2xl opacity-50"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />

        {/* Sun character */}
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-orange-500 flex items-center justify-center text-5xl shadow-2xl">
          {emoji}
        </div>

        {/* Sun rays */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-6 bg-gradient-to-t from-yellow-400 to-transparent rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transformOrigin: 'center',
              transform: `rotate(${i * 45}deg) translateY(-50px)`
            }}
            animate={{
              scaleY: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: i * 0.1
            }}
          />
        ))}
      </motion.div>

      {/* Speech bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="flex-1 relative"
      >
        {/* Speech bubble tail */}
        <div className="absolute -left-3 top-6 w-6 h-6 bg-gradient-to-br from-space-primary/20 to-space-aurora/20 border-l-2 border-t-2 border-space-primary/30 transform rotate-45" />

        {/* Speech bubble content */}
        <div className="relative glass-card rounded-2xl p-6 border-2 border-space-primary/30">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <div className="text-space-primary font-bold text-sm mb-2 flex items-center gap-2">
                <span className="text-2xl">☀️</span>
                Sunny the Solar Flare
              </div>
              <motion.p
                className="text-lg text-gray-200 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {text}
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
