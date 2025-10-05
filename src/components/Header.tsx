'use client'

import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header className="flex items-center justify-center gap-4 mb-8 text-center">
      <motion.div
        className="text-4xl animate-pulse"
        animate={{
          scale: [1, 1.1, 1],
          filter: [
            'drop-shadow(0 0 10px #ffd16680)',
            'drop-shadow(0 0 20px #ffd166)',
            'drop-shadow(0 0 10px #ffd16680)'
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        role="img"
        aria-label="Sun emoji"
      >
        🌞
      </motion.div>

      <motion.h1
        className="text-3xl md:text-5xl font-black bg-gradient-to-r from-space-primary to-space-solar bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Surjo Kothon: Sunny's Space Adventure
      </motion.h1>
    </header>
  )
}