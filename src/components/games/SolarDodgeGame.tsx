'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { Home, RotateCcw, Zap, BookOpen, Sparkles } from 'lucide-react'
import { PageType } from '@/types'

interface SolarDodgeGameProps {
  onNavigate: (page: PageType) => void
}

interface SolarFlare {
  id: number
  x: number
  y: number
  speed: number
  type: 'X-Class' | 'M-Class' | 'C-Class'
  color: string
  label: string
}

const funFacts = [
  "Solar flares are huge explosions on the Sun that release energy equal to millions of nuclear bombs! ☀️",
  "Solar flares travel at speeds up to 5 million miles per hour - that's super fast! 🚀",
  "The Sun releases solar flares when magnetic energy builds up and explodes! ⚡",
  "Solar storms can affect satellites and electronics on Earth! 🛰️",
  "Astronauts need special protection from solar radiation during space travel! 👨‍🚀",
  "Solar flares can create beautiful auroras (Northern Lights) when they reach Earth! ✨",
  "The Sun's surface is so hot it's about 10,000 degrees Fahrenheit! 🔥"
]

export default function SolarDodgeGame({ onNavigate }: SolarDodgeGameProps) {
  const [playerX, setPlayerX] = useState(50)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [solarFlares, setSolarFlares] = useState<SolarFlare[]>([])
  const [nextId, setNextId] = useState(0)
  const [currentFact, setCurrentFact] = useState(0)
  const [showFactPopup, setShowFactPopup] = useState(false)
  const [factsUnlocked, setFactsUnlocked] = useState<number[]>([])

  // Move player
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!gameStarted || gameOver) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    setPlayerX(Math.max(5, Math.min(95, x)))
  }, [gameStarted, gameOver])

  // Generate solar flares with types
  useEffect(() => {
    if (!gameStarted || gameOver) return

    const interval = setInterval(() => {
      const flareTypes = [
        { type: 'C-Class' as const, color: 'yellow', label: 'C-Class (Weak)', speed: 1.5 },
        { type: 'M-Class' as const, color: 'orange', label: 'M-Class (Medium)', speed: 2.5 },
        { type: 'X-Class' as const, color: 'red', label: 'X-Class (Strongest!)', speed: 3.5 }
      ]

      const randomType = flareTypes[Math.floor(Math.random() * flareTypes.length)]

      setSolarFlares(prev => [
        ...prev,
        {
          id: nextId,
          x: Math.random() * 90 + 5,
          y: 0,
          speed: randomType.speed + Math.random() * 0.5,
          type: randomType.type,
          color: randomType.color,
          label: randomType.label
        }
      ])
      setNextId(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [gameStarted, gameOver, nextId])

  // Move solar flares and check collisions
  useEffect(() => {
    if (!gameStarted || gameOver) return

    const interval = setInterval(() => {
      setSolarFlares(prev => {
        const updated = prev.map(flare => ({
          ...flare,
          y: flare.y + flare.speed
        })).filter(flare => {
          // Check collision
          if (flare.y > 85 && flare.y < 95 && Math.abs(flare.x - playerX) < 8) {
            setGameOver(true)
            return false
          }
          // Remove if off screen
          if (flare.y > 100) {
            setScore(s => {
              const newScore = s + 10
              // Unlock fun facts at score milestones
              if (newScore % 50 === 0 && newScore > 0) {
                const factIndex = Math.min(Math.floor(newScore / 50) - 1, funFacts.length - 1)
                if (!factsUnlocked.includes(factIndex)) {
                  setFactsUnlocked(prev => [...prev, factIndex])
                  setCurrentFact(factIndex)
                  setShowFactPopup(true)
                  setTimeout(() => setShowFactPopup(false), 5000)
                }
              }
              return newScore
            })
            return false
          }
          return true
        })
        return updated
      })
    }, 50)

    return () => clearInterval(interval)
  }, [gameStarted, gameOver, playerX, factsUnlocked])

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setSolarFlares([])
    setPlayerX(50)
    setNextId(0)
    setShowFactPopup(false)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-3xl p-8"
      >
        <h1 className="text-4xl font-black mb-4 text-center bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          ⚡ Solar Storm Dodger
        </h1>

        <p className="text-center text-gray-300 mb-2">
          Move your spaceship to dodge the solar flares! Use your mouse to move left and right.
        </p>
        <div className="text-center mb-6 p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
          <p className="text-sm text-blue-200">
            🌟 <strong>Learn as you play:</strong> Real solar flares are classified as C, M, or X class based on their strength. X-class are the most powerful and can disrupt satellites and power grids on Earth!
          </p>
        </div>

        {/* Score and Learning Progress */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-center flex-1">
            <span className="text-3xl font-bold text-space-primary">Score: {score}</span>
          </div>
          <div className="flex items-center gap-2 text-yellow-400">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-bold">{factsUnlocked.length}/{funFacts.length} Facts Unlocked</span>
          </div>
        </div>

        {/* Fun Fact Popup */}
        {showFactPopup && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-4 p-4 rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50"
          >
            <div className="flex items-start gap-3">
              <BookOpen className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-yellow-400 mb-1">New Fun Fact Unlocked! 🎉</h4>
                <p className="text-sm text-gray-200">{funFacts[currentFact]}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Game Area */}
        <motion.div
          className="relative bg-gradient-to-b from-purple-900 to-black rounded-2xl overflow-hidden"
          style={{ height: '400px' }}
          onMouseMove={handleMouseMove}
        >
          {/* Stars background */}
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3
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
                Start Game
              </motion.button>
            </div>
          ) : gameOver ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center max-w-md mx-auto"
              >
                <h2 className="text-4xl font-bold text-red-500 mb-4">Game Over!</h2>
                <p className="text-2xl text-white mb-2">Final Score: {score}</p>
                <p className="text-yellow-400 mb-4">
                  <Sparkles className="w-5 h-5 inline" /> You unlocked {factsUnlocked.length} fun facts!
                </p>

                {factsUnlocked.length > 0 && (
                  <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                    <h3 className="font-bold text-purple-300 mb-2">What You Learned:</h3>
                    <ul className="text-sm text-gray-300 text-left space-y-2">
                      {factsUnlocked.map(index => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-yellow-400">✓</span>
                          <span>{funFacts[index]}</span>
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
                  Play Again
                </motion.button>
              </motion.div>
            </div>
          ) : null}

          {/* Solar Flares with Educational Labels */}
          {solarFlares.map(flare => (
            <motion.div
              key={flare.id}
              className="absolute"
              style={{
                left: `${flare.x}%`,
                top: `${flare.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {/* Flare Label */}
              <motion.div
                className={`absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-bold px-2 py-1 rounded-full ${
                  flare.color === 'red' ? 'bg-red-500/80 text-white' :
                  flare.color === 'orange' ? 'bg-orange-500/80 text-white' :
                  'bg-yellow-500/80 text-black'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {flare.label}
              </motion.div>

              {/* Flare Icon */}
              <motion.div
                className="w-12 h-12"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity
                }}
              >
                <div className="relative">
                  <Zap className={`w-12 h-12 ${
                    flare.color === 'red' ? 'text-red-500 fill-red-500' :
                    flare.color === 'orange' ? 'text-orange-500 fill-orange-500' :
                    'text-yellow-500 fill-yellow-500'
                  }`} />
                  <div className={`absolute inset-0 ${
                    flare.color === 'red' ? 'bg-red-500' :
                    flare.color === 'orange' ? 'bg-orange-500' :
                    'bg-yellow-500'
                  } blur-xl opacity-50`} />
                </div>
              </motion.div>
            </motion.div>
          ))}

          {/* Player Spaceship with Shield */}
          <motion.div
            className="absolute bottom-8"
            style={{
              left: `${playerX}%`,
              transform: 'translateX(-50%)'
            }}
          >
            {/* Shield Label */}
            <motion.div
              className="absolute -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-bold px-2 py-1 rounded-full bg-blue-500/80 text-white"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🛡️ Magnetic Shield
            </motion.div>

            {/* Shield Effect */}
            <motion.div
              className="absolute -inset-8 border-2 border-blue-400 rounded-full"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            />

            {/* Spaceship */}
            <motion.div
              animate={{
                y: [0, -5, 0]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            >
              <div className="relative">
                <div className="text-6xl">🚀</div>
                <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-50" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Learning Section */}
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {/* Instructions */}
          <div className="p-4 rounded-xl bg-space-card border border-white/10">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-400" />
              How to Play:
            </h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Move your mouse to control the spaceship</li>
              <li>• Dodge the solar flares falling from the top</li>
              <li>• Each dodged flare gives you 10 points</li>
              <li>• Getting hit by a flare ends the game</li>
              <li>• Unlock fun facts at 50, 100, 150 points!</li>
            </ul>
          </div>

          {/* Educational Info */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-orange-400" />
              What You're Learning:
            </h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>🔴 <strong>X-Class:</strong> Most powerful flares (fastest in game!)</li>
              <li>🟠 <strong>M-Class:</strong> Medium strength (moderate speed)</li>
              <li>🟡 <strong>C-Class:</strong> Weakest flares (slower speed)</li>
              <li>🛡️ <strong>Magnetic Shields:</strong> Real spacecraft use magnetic fields for protection</li>
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
    </div>
  )
}
