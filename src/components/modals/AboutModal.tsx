'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Info, Sun, Zap, Globe, Satellite } from 'lucide-react'

interface AboutModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="glass-card rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Info className="w-6 h-6 text-space-accent" />
              <h3 className="text-xl font-bold text-white">About Space Weather</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="space-y-6">
              {/* Main Description */}
              <motion.p
                className="text-lg text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Space weather is like storms in space: bursts from the Sun (solar flares & CMEs)
                send charged particles toward Earth. They can create beautiful auroras — and
                sometimes disturb radio, GPS, and power grids.
              </motion.p>

              {/* Key Concepts */}
              <div className="grid gap-4">
                {[
                  {
                    icon: Sun,
                    title: 'Solar Flares',
                    description: 'Sudden releases of electromagnetic energy from the Sun\'s surface, reaching Earth in just 8 minutes.',
                    color: 'text-space-primary'
                  },
                  {
                    icon: Zap,
                    title: 'Coronal Mass Ejections (CMEs)',
                    description: 'Massive bursts of solar wind and magnetic fields released from the Sun\'s corona into space.',
                    color: 'text-space-aurora'
                  },
                  {
                    icon: Globe,
                    title: 'Auroras',
                    description: 'Beautiful light displays in polar skies when solar particles interact with Earth\'s magnetic field.',
                    color: 'text-space-accent'
                  },
                  {
                    icon: Satellite,
                    title: 'Technology Impact',
                    description: 'Space weather can affect satellites, GPS systems, radio communications, and power grids on Earth.',
                    color: 'text-space-solar'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <div className={`${item.color} mt-1`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Educational Note */}
              <motion.div
                className="p-4 rounded-2xl bg-gradient-to-r from-space-primary/10 to-space-aurora/10 border border-space-primary/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h4 className="font-bold text-space-primary mb-2">🎓 Learning Goals</h4>
                <p className="text-sm text-gray-400">
                  This interactive story helps children understand space weather phenomena
                  through engaging narratives combined with real NASA data, making complex
                  scientific concepts accessible and fun!
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}