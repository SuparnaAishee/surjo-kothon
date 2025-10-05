'use client'

import { motion } from 'framer-motion'
import { PlanetImpact as PlanetImpactType } from '@/data/storyData'

interface PlanetImpactProps {
  impacts: PlanetImpactType[]
}

const planetColors: Record<string, string> = {
  Mercury: 'from-gray-400 to-gray-600',
  Venus: 'from-orange-300 to-yellow-500',
  Earth: 'from-blue-400 to-green-500',
  Mars: 'from-red-400 to-orange-600',
  Jupiter: 'from-orange-300 to-red-400',
  Saturn: 'from-yellow-200 to-orange-400',
  Uranus: 'from-cyan-300 to-blue-400',
  Neptune: 'from-blue-500 to-indigo-600'
}

const levelColors: Record<string, { bg: string; border: string; text: string }> = {
  low: { bg: 'bg-green-500/20', border: 'border-green-500', text: 'text-green-400' },
  medium: { bg: 'bg-yellow-500/20', border: 'border-yellow-500', text: 'text-yellow-400' },
  high: { bg: 'bg-orange-500/20', border: 'border-orange-500', text: 'text-orange-400' },
  critical: { bg: 'bg-red-500/20', border: 'border-red-500', text: 'text-red-400' }
}

const levelLabels: Record<string, string> = {
  low: 'Low Risk',
  medium: 'Medium Risk',
  high: 'High Risk',
  critical: 'Critical!'
}

export default function PlanetImpact({ impacts }: PlanetImpactProps) {
  if (!impacts || impacts.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6 mb-6"
    >
      <motion.h3
        className="text-xl font-bold mb-4 flex items-center gap-2"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <span className="text-2xl">🌍</span>
        Planet Impact Alert
      </motion.h3>

      <div className="space-y-3">
        {impacts.map((impact, index) => {
          const colors = levelColors[impact.level]
          const planetGradient = planetColors[impact.planet] || 'from-gray-400 to-gray-600'

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 ${colors.border} ${colors.bg}`}
            >
              {/* Planet icon */}
              <motion.div
                className={`w-12 h-12 rounded-full bg-gradient-to-br ${planetGradient} flex-shrink-0`}
                animate={{
                  scale: impact.level === 'critical' ? [1, 1.1, 1] : 1,
                  boxShadow: impact.level === 'critical'
                    ? [
                        '0 0 0 0 rgba(239, 68, 68, 0.4)',
                        '0 0 0 10px rgba(239, 68, 68, 0)',
                        '0 0 0 0 rgba(239, 68, 68, 0)'
                      ]
                    : '0 0 0 0 rgba(0, 0, 0, 0)'
                }}
                transition={{
                  duration: 1.5,
                  repeat: impact.level === 'critical' ? Infinity : 0,
                  repeatType: 'loop'
                }}
              />

              {/* Planet info */}
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-lg">{impact.planet}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${colors.bg} ${colors.text} border ${colors.border}`}>
                    {levelLabels[impact.level]}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{impact.effect}</p>
              </div>

              {/* Danger indicator */}
              {impact.level === 'critical' && (
                <motion.div
                  animate={{ rotate: [0, 10, -10, 10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                  className="text-2xl"
                >
                  ⚠️
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Solar storm visualization */}
      <motion.div
        className="mt-4 relative h-2 bg-space-card rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </motion.div>
      <p className="text-xs text-gray-500 text-center mt-2">Solar storm energy wave</p>
    </motion.div>
  )
}
