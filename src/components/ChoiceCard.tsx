'use client'

import { motion } from 'framer-motion'
import { Choice } from '@/data/storyData'

interface ChoiceCardProps {
  choice: Choice
  index: number
  onSelect: () => void
}

export default function ChoiceCard({ choice, index, onSelect }: ChoiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        delay: index * 0.15,
        type: 'spring',
        stiffness: 100
      }}
      whileHover={{
        scale: 1.05,
        y: -10,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onSelect}
      className="relative cursor-pointer group"
      style={{ perspective: '1000px' }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-space-primary to-space-aurora opacity-0 group-hover:opacity-20 blur-xl transition-opacity"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      />

      {/* Card content */}
      <div className="relative glass-card rounded-2xl p-6 border-2 border-white/10 group-hover:border-space-primary/50 transition-colors">
        {/* Icon/Emoji */}
        <motion.div
          className="text-5xl mb-4 text-center"
          animate={{
            rotate: [0, -5, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1
          }}
        >
          {choice.icon || '✨'}
        </motion.div>

        {/* Choice text */}
        <h3 className="text-xl font-bold mb-3 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          {choice.text}
        </h3>

        {/* Consequence preview */}
        {choice.consequence && (
          <motion.p
            className="text-sm text-gray-400 text-center opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ height: 0 }}
            whileHover={{ height: 'auto' }}
          >
            {choice.consequence}
          </motion.p>
        )}

        {/* Hover indicator */}
        <motion.div
          className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
          initial={{ x: -10 }}
          whileHover={{ x: 0 }}
        >
          <svg className="w-6 h-6 text-space-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </motion.div>

        {/* Sparkle effects */}
        <motion.div
          className="absolute -top-2 -right-2 text-2xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'loop'
          }}
        >
          ✨
        </motion.div>
      </div>
    </motion.div>
  )
}
