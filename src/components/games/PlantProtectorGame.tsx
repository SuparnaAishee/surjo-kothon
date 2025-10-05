'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { Home, RotateCcw, Droplets, Sun, Wind, Bug, Sprout, BookOpen, Award } from 'lucide-react'
import { PageType } from '@/types'

interface PlantProtectorGameProps {
  onNavigate: (page: PageType) => void
}

interface Plant {
  id: number
  x: number
  health: number
  waterLevel: number
  sunLevel: number
  stage: 'seed' | 'sprout' | 'growing' | 'blooming'
}

interface Threat {
  id: number
  x: number
  y: number
  type: 'bug' | 'drought' | 'storm'
  speed: number
}

interface FactData {
  title: string
  fact: string
  icon: string
}

const plantFacts: FactData[] = [
  {
    title: "Water for Life",
    fact: "Plants need water to grow! They drink water through their roots and use it to make food. 💧",
    icon: "💧"
  },
  {
    title: "Sunshine Power",
    fact: "Plants use sunlight to make their own food through photosynthesis. The sun is like a plant's kitchen! ☀️",
    icon: "☀️"
  },
  {
    title: "Plant Protectors",
    fact: "Ladybugs are helpful insects that protect plants by eating harmful bugs! 🐞",
    icon: "🐞"
  },
  {
    title: "Strong Roots",
    fact: "Plant roots hold the plant in the ground and suck up water and nutrients from the soil! 🌱",
    icon: "🌱"
  },
  {
    title: "Clean Air",
    fact: "Plants clean the air we breathe! They take in carbon dioxide and give us fresh oxygen. 🌿",
    icon: "🌿"
  },
  {
    title: "Flower Power",
    fact: "Flowers help plants make seeds and new baby plants. They also attract bees and butterflies! 🌸",
    icon: "🌸"
  },
  {
    title: "Growing Stages",
    fact: "Plants grow from tiny seeds into sprouts, then into big plants with flowers! 🌻",
    icon: "🌻"
  }
]

export default function PlantProtectorGame({ onNavigate }: PlantProtectorGameProps) {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [plants, setPlants] = useState<Plant[]>([])
  const [threats, setThreats] = useState<Threat[]>([])
  const [selectedTool, setSelectedTool] = useState<'water' | 'sun' | 'spray'>('water')
  const [factsLearned, setFactsLearned] = useState<number[]>([])
  const [currentFact, setCurrentFact] = useState<number | null>(null)
  const [showFactPopup, setShowFactPopup] = useState(false)
  const [nextThreatId, setNextThreatId] = useState(0)
  const [plantsGrown, setPlantsGrown] = useState(0)

  // Initialize plants
  useEffect(() => {
    if (gameStarted && plants.length === 0) {
      const initialPlants: Plant[] = [
        { id: 0, x: 20, health: 100, waterLevel: 50, sunLevel: 50, stage: 'seed' },
        { id: 1, x: 40, health: 100, waterLevel: 50, sunLevel: 50, stage: 'seed' },
        { id: 2, x: 60, health: 100, waterLevel: 50, sunLevel: 50, stage: 'seed' },
        { id: 3, x: 80, health: 100, waterLevel: 50, sunLevel: 50, stage: 'seed' }
      ]
      setPlants(initialPlants)
    }
  }, [gameStarted, plants.length])

  // Spawn threats
  useEffect(() => {
    if (!gameStarted || gameOver) return

    const interval = setInterval(() => {
      const threatTypes: ('bug' | 'drought' | 'storm')[] = ['bug', 'drought', 'storm']
      const randomType = threatTypes[Math.floor(Math.random() * threatTypes.length)]

      setThreats(prev => [...prev, {
        id: nextThreatId,
        x: Math.random() * 90 + 5,
        y: 0,
        type: randomType,
        speed: 1 + Math.random() * 0.5
      }])
      setNextThreatId(prev => prev + 1)
    }, 3000)

    return () => clearInterval(interval)
  }, [gameStarted, gameOver, nextThreatId])

  // Move threats and check collisions
  useEffect(() => {
    if (!gameStarted || gameOver) return

    const interval = setInterval(() => {
      setThreats(prev => {
        const updated = prev.map(threat => ({
          ...threat,
          y: threat.y + threat.speed
        })).filter(threat => {
          // Check collision with plants
          if (threat.y > 70) {
            const hitPlant = plants.find(plant =>
              Math.abs(plant.x - threat.x) < 10
            )

            if (hitPlant) {
              setPlants(prevPlants => prevPlants.map(p =>
                p.id === hitPlant.id
                  ? { ...p, health: Math.max(0, p.health - 25) }
                  : p
              ))
            }
            return false // Remove threat
          }
          return threat.y < 100
        })
        return updated
      })
    }, 50)

    return () => clearInterval(interval)
  }, [gameStarted, gameOver, plants])

  // Update plant growth and check game over
  useEffect(() => {
    if (!gameStarted || gameOver) return

    const interval = setInterval(() => {
      setPlants(prev => {
        const updated = prev.map(plant => {
          // Decrease levels over time
          let newWater = Math.max(0, plant.waterLevel - 0.5)
          let newSun = Math.max(0, plant.sunLevel - 0.5)
          let newHealth = plant.health

          // Health decreases if needs aren't met
          if (newWater < 20 || newSun < 20) {
            newHealth = Math.max(0, newHealth - 0.3)
          }

          // Determine stage based on levels
          let newStage = plant.stage
          const avgLevel = (newWater + newSun) / 2

          if (avgLevel > 80 && newHealth > 70) {
            if (plant.stage === 'seed') newStage = 'sprout'
            else if (plant.stage === 'sprout') newStage = 'growing'
            else if (plant.stage === 'growing') {
              newStage = 'blooming'
              // Unlock fact when plant blooms
              if (plant.stage !== 'blooming') {
                const unlockedFact = Math.floor(Math.random() * plantFacts.length)
                if (!factsLearned.includes(unlockedFact)) {
                  setFactsLearned(prev => [...prev, unlockedFact])
                  setCurrentFact(unlockedFact)
                  setShowFactPopup(true)
                  setTimeout(() => setShowFactPopup(false), 6000)
                }
                setPlantsGrown(prev => prev + 1)
                setScore(prev => prev + 50)
              }
            }
          }

          return { ...plant, waterLevel: newWater, sunLevel: newSun, health: newHealth, stage: newStage }
        })

        // Check game over
        if (updated.every(p => p.health <= 0)) {
          setGameOver(true)
        }

        return updated
      })
    }, 100)

    return () => clearInterval(interval)
  }, [gameStarted, gameOver, factsLearned])

  const handleGameClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!gameStarted || gameOver) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    // Check if clicking on a threat
    const clickedThreat = threats.find(threat =>
      Math.abs(threat.x - x) < 5 && Math.abs(threat.y - y) < 5
    )

    if (clickedThreat) {
      // Remove threat and award points
      setThreats(prev => prev.filter(t => t.id !== clickedThreat.id))
      setScore(prev => prev + 10)
      return
    }

    // Check if clicking on a plant
    const clickedPlant = plants.find(plant =>
      Math.abs(plant.x - x) < 8 && y > 65
    )

    if (clickedPlant) {
      setPlants(prev => prev.map(plant => {
        if (plant.id === clickedPlant.id) {
          if (selectedTool === 'water') {
            return { ...plant, waterLevel: Math.min(100, plant.waterLevel + 20) }
          } else if (selectedTool === 'sun') {
            return { ...plant, sunLevel: Math.min(100, plant.sunLevel + 20) }
          }
        }
        return plant
      }))
      setScore(prev => prev + 2)
    }
  }, [gameStarted, gameOver, threats, plants, selectedTool])

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setPlants([])
    setThreats([])
    setFactsLearned([])
    setPlantsGrown(0)
    setNextThreatId(0)
  }

  const getPlantEmoji = (stage: string) => {
    switch (stage) {
      case 'seed': return '🌰'
      case 'sprout': return '🌱'
      case 'growing': return '🌿'
      case 'blooming': return '🌻'
      default: return '🌱'
    }
  }

  const getThreatEmoji = (type: string) => {
    switch (type) {
      case 'bug': return '🐛'
      case 'drought': return '☁️'
      case 'storm': return '⛈️'
      default: return '⚠️'
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-3xl p-8"
      >
        <h1 className="text-4xl font-black mb-4 text-center bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
          🌱 Plant Protector
        </h1>

        <p className="text-center text-gray-300 mb-4">
          Protect your plants and help them grow! Water them, give them sunshine, and defend against threats!
        </p>

        <div className="text-center mb-6 p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
          <p className="text-sm text-green-200">
            🌟 <strong>Learn as you play:</strong> Click on plants to water or give sunshine. Click on threats to remove them. Watch your plants grow and unlock amazing plant facts!
          </p>
        </div>

        {/* Score and Stats */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-center flex-1">
            <span className="text-3xl font-bold text-green-400">Score: {score}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-emerald-400">
              <Sprout className="w-5 h-5" />
              <span className="text-sm font-bold">{plantsGrown} Plants Grown</span>
            </div>
            <div className="flex items-center gap-2 text-yellow-400">
              <BookOpen className="w-5 h-5" />
              <span className="text-sm font-bold">{factsLearned.length}/{plantFacts.length} Facts</span>
            </div>
          </div>
        </div>

        {/* Fact Popup */}
        {showFactPopup && currentFact !== null && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-4 p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/50"
          >
            <div className="flex items-start gap-3">
              <div className="text-4xl">{plantFacts[currentFact].icon}</div>
              <div>
                <h4 className="font-bold text-green-400 mb-1 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  New Fact Unlocked! 🎉
                </h4>
                <h5 className="font-bold text-white mb-1">{plantFacts[currentFact].title}</h5>
                <p className="text-sm text-gray-200">{plantFacts[currentFact].fact}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tool Selection */}
        {gameStarted && !gameOver && (
          <div className="flex gap-3 justify-center mb-4">
            <motion.button
              className={`px-4 py-2 rounded-xl flex items-center gap-2 ${
                selectedTool === 'water'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-gray-300'
              }`}
              onClick={() => setSelectedTool('water')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Droplets className="w-5 h-5" />
              Water
            </motion.button>
            <motion.button
              className={`px-4 py-2 rounded-xl flex items-center gap-2 ${
                selectedTool === 'sun'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white/10 text-gray-300'
              }`}
              onClick={() => setSelectedTool('sun')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sun className="w-5 h-5" />
              Sunshine
            </motion.button>
          </div>
        )}

        {/* Game Area */}
        <motion.div
          className="relative bg-gradient-to-b from-sky-300 to-green-200 rounded-2xl overflow-hidden cursor-pointer"
          style={{ height: '400px' }}
          onClick={handleGameClick}
        >
          {/* Sky and clouds */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-400 to-sky-200" />

          {/* Ground */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-green-700 to-green-900" />

          {!gameStarted ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                className="btn-primary text-2xl px-8 py-4"
                onClick={startGame}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Start Gardening!
              </motion.button>
            </div>
          ) : gameOver ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center max-w-md mx-auto"
              >
                <h2 className="text-4xl font-bold text-red-500 mb-4">Garden Ended!</h2>
                <p className="text-2xl text-white mb-2">Final Score: {score}</p>
                <p className="text-xl text-green-400 mb-2">
                  <Sprout className="w-6 h-6 inline" /> {plantsGrown} Plants Grown!
                </p>
                <p className="text-yellow-400 mb-4">
                  <BookOpen className="w-6 h-6 inline" /> You learned {factsLearned.length} plant facts!
                </p>

                {factsLearned.length > 0 && (
                  <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 max-h-48 overflow-y-auto">
                    <h3 className="font-bold text-green-300 mb-2">What You Learned:</h3>
                    <ul className="text-sm text-gray-300 text-left space-y-2">
                      {factsLearned.map(index => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-xl">{plantFacts[index].icon}</span>
                          <div>
                            <strong>{plantFacts[index].title}:</strong> {plantFacts[index].fact}
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
                  Play Again
                </motion.button>
              </motion.div>
            </div>
          ) : null}

          {/* Threats */}
          {threats.map(threat => (
            <motion.div
              key={threat.id}
              className="absolute text-3xl cursor-pointer"
              style={{
                left: `${threat.x}%`,
                top: `${threat.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.3 }}
            >
              {getThreatEmoji(threat.type)}
            </motion.div>
          ))}

          {/* Plants */}
          {plants.map(plant => (
            <div
              key={plant.id}
              className="absolute bottom-8 cursor-pointer"
              style={{ left: `${plant.x}%`, transform: 'translateX(-50%)' }}
            >
              {/* Plant */}
              <motion.div
                className="text-5xl"
                animate={{
                  scale: plant.health > 50 ? [1, 1.05, 1] : [1, 0.95, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {getPlantEmoji(plant.stage)}
              </motion.div>

              {/* Health bar */}
              <div className="w-16 h-2 bg-black/30 rounded-full mt-1">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${plant.health}%`,
                    backgroundColor: plant.health > 60 ? '#10b981' : plant.health > 30 ? '#f59e0b' : '#ef4444'
                  }}
                />
              </div>

              {/* Water/Sun indicators */}
              <div className="flex gap-1 mt-1">
                <div className="flex-1 h-1 bg-black/30 rounded-full">
                  <div
                    className="h-full bg-blue-400 rounded-full transition-all"
                    style={{ width: `${plant.waterLevel}%` }}
                  />
                </div>
                <div className="flex-1 h-1 bg-black/30 rounded-full">
                  <div
                    className="h-full bg-yellow-400 rounded-full transition-all"
                    style={{ width: `${plant.sunLevel}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Instructions */}
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-space-card border border-white/10">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <Sprout className="w-5 h-5 text-green-400" />
              How to Play:
            </h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Select Water or Sunshine tool</li>
              <li>• Click on plants to help them grow</li>
              <li>• Click on threats to remove them</li>
              <li>• Keep plants healthy to unlock facts!</li>
              <li>• Grow plants to blooming stage for bonus points</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-green-400" />
              What You're Learning:
            </h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>🌱 How plants grow from seeds to flowers</li>
              <li>💧 Why plants need water and sunshine</li>
              <li>🐞 How to protect plants from threats</li>
              <li>🌍 The importance of plants for Earth</li>
              <li>🌸 Different stages of plant growth</li>
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
