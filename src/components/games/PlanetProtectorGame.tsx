'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { Home, RotateCcw, Shield, Zap, Award, BookOpen, Globe } from 'lucide-react'
import { PageType } from '@/types'

interface PlanetProtectorGameProps {
  onNavigate: (page: PageType) => void
}

interface Threat {
  id: number
  x: number
  y: number
  type: 'solar-flare' | 'meteor' | 'radiation' | 'cme'
  speed: number
  damage: number
}

interface ShieldSegment {
  id: number
  angle: number
  health: number
  active: boolean
}

interface SpaceFact {
  title: string
  fact: string
  icon: string
}

const spaceFacts: SpaceFact[] = [
  {
    title: "Earth's Magnetic Field",
    fact: "Earth has a protective magnetic field called the magnetosphere that shields us from harmful solar radiation! 🛡️",
    icon: "🛡️"
  },
  {
    title: "Solar Flares",
    fact: "Solar flares are huge explosions on the Sun that release massive amounts of energy - enough to power the entire Earth for 100,000 years! ⚡",
    icon: "⚡"
  },
  {
    title: "Meteor Showers",
    fact: "Meteors burn up in Earth's atmosphere, creating shooting stars! Most are smaller than a grain of sand. 🌠",
    icon: "🌠"
  },
  {
    title: "The Ozone Layer",
    fact: "Earth's ozone layer protects us from the Sun's harmful UV radiation, acting like a natural sunscreen! ☀️",
    icon: "☀️"
  },
  {
    title: "Space Weather",
    fact: "Space weather from the Sun can affect satellites, GPS, and even power grids on Earth! 🌍",
    icon: "🌍"
  },
  {
    title: "Aurora Borealis",
    fact: "When solar particles hit Earth's magnetic field, they create beautiful northern lights (aurora)! ✨",
    icon: "✨"
  },
  {
    title: "CME Events",
    fact: "Coronal Mass Ejections (CMEs) are huge clouds of solar plasma that can reach Earth in 1-3 days! 🌊",
    icon: "🌊"
  },
  {
    title: "Atmosphere Protection",
    fact: "Earth's atmosphere acts like a protective blanket, burning up most space debris before it reaches the ground! 🔥",
    icon: "🔥"
  }
]

export default function PlanetProtectorGame({ onNavigate }: PlanetProtectorGameProps) {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [planetHealth, setPlanetHealth] = useState(100)
  const [threats, setThreats] = useState<Threat[]>([])
  const [shields, setShields] = useState<ShieldSegment[]>([])
  const [activeShield, setActiveShield] = useState<number | null>(null)
  const [factsLearned, setFactsLearned] = useState<number[]>([])
  const [currentFact, setCurrentFact] = useState<number | null>(null)
  const [showFactPopup, setShowFactPopup] = useState(false)
  const [nextThreatId, setNextThreatId] = useState(0)
  const [threatsBlocked, setThreatsBlocked] = useState(0)
  const [shieldEnergy, setShieldEnergy] = useState(100)

  // Initialize shields
  useEffect(() => {
    if (gameStarted && shields.length === 0) {
      const initialShields: ShieldSegment[] = []
      for (let i = 0; i < 8; i++) {
        initialShields.push({
          id: i,
          angle: i * 45,
          health: 100,
          active: false
        })
      }
      setShields(initialShields)
    }
  }, [gameStarted, shields.length])

  // Spawn threats
  useEffect(() => {
    if (!gameStarted || gameOver) return

    const interval = setInterval(() => {
      const threatTypes: { type: 'solar-flare' | 'meteor' | 'radiation' | 'cme', damage: number, speed: number }[] = [
        { type: 'solar-flare', damage: 15, speed: 1.2 },
        { type: 'meteor', damage: 20, speed: 2.5 },
        { type: 'radiation', damage: 10, speed: 0.8 },
        { type: 'cme', damage: 25, speed: 1.5 }
      ]

      const randomThreat = threatTypes[Math.floor(Math.random() * threatTypes.length)]
      const angle = Math.random() * 360

      setThreats(prev => [...prev, {
        id: nextThreatId,
        x: 50 + Math.cos(angle * Math.PI / 180) * 50,
        y: 50 + Math.sin(angle * Math.PI / 180) * 50,
        type: randomThreat.type,
        speed: randomThreat.speed,
        damage: randomThreat.damage
      }])
      setNextThreatId(prev => prev + 1)
    }, 2000)

    return () => clearInterval(interval)
  }, [gameStarted, gameOver, nextThreatId])

  // Move threats toward planet
  useEffect(() => {
    if (!gameStarted || gameOver) return

    const interval = setInterval(() => {
      setThreats(prev => {
        const updated = prev.map(threat => {
          const dx = 50 - threat.x
          const dy = 50 - threat.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 5) {
            // Hit the planet
            setPlanetHealth(h => {
              const newHealth = Math.max(0, h - threat.damage)
              if (newHealth <= 0) {
                setGameOver(true)
              }
              return newHealth
            })
            return null
          }

          const moveX = (dx / distance) * threat.speed
          const moveY = (dy / distance) * threat.speed

          return {
            ...threat,
            x: threat.x + moveX,
            y: threat.y + moveY
          }
        }).filter(Boolean) as Threat[]

        return updated
      })
    }, 50)

    return () => clearInterval(interval)
  }, [gameStarted, gameOver])

  // Shield energy regeneration
  useEffect(() => {
    if (!gameStarted || gameOver) return

    const interval = setInterval(() => {
      setShieldEnergy(prev => Math.min(100, prev + 0.5))
    }, 100)

    return () => clearInterval(interval)
  }, [gameStarted, gameOver])

  // Unlock facts based on score
  useEffect(() => {
    const milestones = [50, 100, 200, 350, 500, 700, 900, 1200]
    milestones.forEach((milestone, index) => {
      if (score >= milestone && !factsLearned.includes(index)) {
        setFactsLearned(prev => [...prev, index])
        setCurrentFact(index)
        setShowFactPopup(true)
        setTimeout(() => setShowFactPopup(false), 6000)
      }
    })
  }, [score, factsLearned])

  const activateShield = useCallback((shieldId: number) => {
    if (shieldEnergy < 10) return

    setActiveShield(shieldId)
    setShieldEnergy(prev => prev - 10)

    setShields(prev => prev.map(s =>
      s.id === shieldId ? { ...s, active: true } : s
    ))

    // Check for threat collisions with this shield
    const shield = shields.find(s => s.id === shieldId)
    if (!shield) return

    setThreats(prev => {
      const remaining = prev.filter(threat => {
        const angle = Math.atan2(threat.y - 50, threat.x - 50) * 180 / Math.PI
        const normalizedAngle = ((angle + 360) % 360)
        const shieldAngle = shield.angle
        const angleDiff = Math.abs(normalizedAngle - shieldAngle)

        const distance = Math.sqrt(
          Math.pow(threat.x - 50, 2) + Math.pow(threat.y - 50, 2)
        )

        if (angleDiff < 30 && distance < 35 && distance > 15) {
          // Threat blocked!
          setScore(s => s + 15)
          setThreatsBlocked(t => t + 1)
          return false
        }
        return true
      })
      return remaining
    })

    setTimeout(() => {
      setShields(prev => prev.map(s =>
        s.id === shieldId ? { ...s, active: false } : s
      ))
      setActiveShield(null)
    }, 300)
  }, [shieldEnergy, shields])

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setPlanetHealth(100)
    setThreats([])
    setShields([])
    setFactsLearned([])
    setThreatsBlocked(0)
    setShieldEnergy(100)
    setNextThreatId(0)
  }

  const getThreatEmoji = (type: string) => {
    switch (type) {
      case 'solar-flare': return '☀️'
      case 'meteor': return '☄️'
      case 'radiation': return '⚡'
      case 'cme': return '🌊'
      default: return '💥'
    }
  }

  const getThreatName = (type: string) => {
    switch (type) {
      case 'solar-flare': return 'Solar Flare'
      case 'meteor': return 'Meteor'
      case 'radiation': return 'Radiation'
      case 'cme': return 'CME'
      default: return 'Threat'
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-3xl p-8"
      >
        <h1 className="text-4xl font-black mb-4 text-center bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
          🛡️ Planet Protector
        </h1>

        <p className="text-center text-gray-300 mb-4">
          Protect Earth from space threats! Use your shields to block solar flares, meteors, and radiation!
        </p>

        <div className="text-center mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
          <p className="text-sm text-blue-200">
            🌟 <strong>Learn as you play:</strong> Click shield segments around Earth to activate them and block incoming threats. Learn about Earth's real protective systems!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20">
            <div className="text-2xl font-bold text-green-400">{score}</div>
            <div className="text-xs text-gray-400">Score</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
            <div className="text-2xl font-bold text-blue-400">{planetHealth}%</div>
            <div className="text-xs text-gray-400">Planet Health</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
            <div className="text-2xl font-bold text-purple-400">{threatsBlocked}</div>
            <div className="text-xs text-gray-400">Threats Blocked</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20">
            <div className="text-2xl font-bold text-yellow-400">{factsLearned.length}/8</div>
            <div className="text-xs text-gray-400">Facts Unlocked</div>
          </div>
        </div>

        {/* Shield Energy Bar */}
        {gameStarted && !gameOver && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-bold text-cyan-400">Shield Energy</span>
              <span className="text-sm text-gray-400">{Math.round(shieldEnergy)}%</span>
            </div>
            <div className="h-3 bg-black/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                style={{ width: `${shieldEnergy}%` }}
                animate={{ opacity: shieldEnergy < 20 ? [0.5, 1, 0.5] : 1 }}
                transition={{ duration: 0.5, repeat: shieldEnergy < 20 ? Infinity : 0 }}
              />
            </div>
          </div>
        )}

        {/* Fact Popup */}
        {showFactPopup && currentFact !== null && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-4 p-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-2 border-blue-500/50"
          >
            <div className="flex items-start gap-3">
              <div className="text-4xl">{spaceFacts[currentFact].icon}</div>
              <div>
                <h4 className="font-bold text-blue-400 mb-1 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  New Space Fact Unlocked! 🎉
                </h4>
                <h5 className="font-bold text-white mb-1">{spaceFacts[currentFact].title}</h5>
                <p className="text-sm text-gray-200">{spaceFacts[currentFact].fact}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Game Area */}
        <motion.div
          className="relative bg-gradient-to-b from-black to-purple-900 rounded-2xl overflow-hidden"
          style={{ height: '500px' }}
        >
          {/* Stars */}
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3,
                animation: `twinkle ${2 + Math.random() * 3}s infinite`
              }}
            />
          ))}

          {!gameStarted ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                className="btn-primary text-2xl px-8 py-4"
                onClick={startGame}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Shield className="w-6 h-6" />
                Start Protection!
              </motion.button>
            </div>
          ) : gameOver ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center max-w-md mx-auto p-6"
              >
                <h2 className="text-4xl font-bold text-red-500 mb-4">Planet Destroyed!</h2>
                <p className="text-2xl text-white mb-2">Final Score: {score}</p>
                <p className="text-xl text-cyan-400 mb-2">
                  <Shield className="w-6 h-6 inline" /> {threatsBlocked} Threats Blocked!
                </p>
                <p className="text-yellow-400 mb-4">
                  <BookOpen className="w-6 h-6 inline" /> {factsLearned.length}/8 Space Facts Learned!
                </p>

                {factsLearned.length > 0 && (
                  <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 max-h-64 overflow-y-auto">
                    <h3 className="font-bold text-blue-300 mb-2">What You Learned:</h3>
                    <ul className="text-sm text-gray-300 text-left space-y-2">
                      {factsLearned.map(index => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-xl">{spaceFacts[index].icon}</span>
                          <div>
                            <strong>{spaceFacts[index].title}:</strong> {spaceFacts[index].fact}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <motion.button
                  className="btn-primary"
                  onClick={startGame}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <RotateCcw className="w-5 h-5" />
                  Try Again
                </motion.button>
              </motion.div>
            </div>
          ) : null}

          {/* Earth */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            animate={{
              rotate: [0, 360]
            }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            <div className="relative">
              <div className="text-8xl">🌍</div>

              {/* Health indicator */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24">
                <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all"
                    style={{
                      width: `${planetHealth}%`,
                      backgroundColor: planetHealth > 60 ? '#10b981' : planetHealth > 30 ? '#f59e0b' : '#ef4444'
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Shield Segments */}
          {shields.map(shield => {
            const radius = 120
            const x = 50 + Math.cos((shield.angle - 90) * Math.PI / 180) * (radius / 500 * 100)
            const y = 50 + Math.sin((shield.angle - 90) * Math.PI / 180) * (radius / 500 * 100)

            return (
              <motion.div
                key={shield.id}
                className="absolute cursor-pointer"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={() => activateShield(shield.id)}
                whileHover={{ scale: 1.2 }}
              >
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    shield.active
                      ? 'bg-cyan-500 shadow-lg shadow-cyan-500/50'
                      : 'bg-blue-500/30 border-2 border-blue-400'
                  }`}
                  animate={shield.active ? {
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 0]
                  } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {!shield.active && <Shield className="w-6 h-6 text-blue-300" />}
                </motion.div>
              </motion.div>
            )
          })}

          {/* Threats */}
          {threats.map(threat => (
            <motion.div
              key={threat.id}
              className="absolute"
              style={{
                left: `${threat.x}%`,
                top: `${threat.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <div className="text-3xl" title={getThreatName(threat.type)}>
                {getThreatEmoji(threat.type)}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Instructions */}
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-space-card border border-white/10">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              How to Play:
            </h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Click on shield segments to activate them</li>
              <li>• Block threats before they hit Earth</li>
              <li>• Each shield use costs 10% energy</li>
              <li>• Shield energy regenerates over time</li>
              <li>• Unlock space facts by reaching score milestones!</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              What You're Learning:
            </h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>🛡️ Earth's magnetosphere protection</li>
              <li>⚡ Solar flares and space weather</li>
              <li>☄️ Meteors and Earth's atmosphere</li>
              <li>🌊 Coronal Mass Ejections (CMEs)</li>
              <li>✨ How Earth protects life from space threats</li>
            </ul>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-4 justify-center mt-6">
          <motion.button
            className="btn-ghost"
            onClick={() => onNavigate('game')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Games
          </motion.button>

          <motion.button
            className="btn-secondary"
            onClick={() => onNavigate('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-5 h-5" />
            Home
          </motion.button>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
