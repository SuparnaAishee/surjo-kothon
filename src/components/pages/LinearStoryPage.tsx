'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ArrowRight, Home, Volume2, VolumeX, Lightbulb } from 'lucide-react'
import { PageType } from '@/types'
import { linearStory, StoryScene } from '@/data/linearStoryData'
import NarratorCharacter from '@/components/NarratorCharacter'
import AvatarCharacter from '@/components/AvatarCharacter'
import Image from 'next/image'

interface LinearStoryPageProps {
  onNavigate: (page: PageType) => void
  characterId: string
  playerName: string
}

export default function LinearStoryPage({
  onNavigate,
  characterId,
  playerName
}: LinearStoryPageProps) {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0)
  const [speaking, setSpeaking] = useState(false)
  const [showFunFact, setShowFunFact] = useState(false)

  const currentScene = linearStory[currentSceneIndex]
  const isLastScene = currentSceneIndex === linearStory.length - 1

  const handleNext = () => {
    pauseSpeak()
    if (isLastScene) {
      onNavigate('quiz')
    } else {
      setCurrentSceneIndex(prev => prev + 1)
      setShowFunFact(false)
    }
  }

  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech not supported on this browser.')
      return
    }

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = 0.9
    utterance.pitch = 1.1

    setSpeaking(true)

    utterance.onend = () => {
      setSpeaking(false)
    }

    window.speechSynthesis.speak(utterance)
  }

  const pauseSpeak = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel()
      setSpeaking(false)
    }
  }

  const handleNarration = () => {
    if (speaking) {
      pauseSpeak()
    } else {
      speak(currentScene.narratorText)
    }
  }

  // Visual effects
  const renderVisualEffect = () => {
    switch (currentScene.visualEffect) {
      case 'solar-flare':
        return (
          <motion.div
            className="absolute top-10 right-10 w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 blur-2xl"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />
        )

      case 'aurora':
        return (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bottom-0 w-full h-64"
                style={{
                  background: `linear-gradient(to top, transparent, ${
                    ['#00ff88', '#0088ff', '#ff0088', '#ffaa00', '#aa00ff'][i]
                  })`,
                  opacity: 0.3,
                  left: `${i * 20}%`
                }}
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  y: [0, -20, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}
          </>
        )

      case 'satellite-shake':
        return (
          <motion.div
            className="absolute top-20 right-20 text-6xl"
            animate={{
              rotate: [-10, 10, -10],
              x: [-5, 5, -5]
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity
            }}
          >
            🛰️
          </motion.div>
        )

      case 'planet-glow':
        return (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0,200,255,0.3) 0%, transparent 70%)'
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />
        )

      case 'sparkles':
        return (
          <>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-3xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              >
                ✨
              </motion.div>
            ))}
          </>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Story Progress</span>
          <span className="text-sm font-bold text-space-primary">
            {currentSceneIndex + 1} / {linearStory.length}
          </span>
        </div>
        <div className="h-2 bg-space-card rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-space-primary to-space-aurora"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentSceneIndex + 1) / linearStory.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-3xl p-8 md:p-12"
        >
          {/* Background Image with effects */}
          <div className="relative mb-8 rounded-2xl overflow-hidden h-64">
            <Image
              src={currentScene.backgroundImage}
              alt="Story background"
              fill
              className="object-cover"
              style={{ filter: 'brightness(0.7)' }}
            />
            {renderVisualEffect()}
          </div>

          <div className="grid md:grid-cols-[1fr,auto] gap-8 items-start">
            {/* Narrator */}
            <div>
              <NarratorCharacter
                emotion={currentScene.narratorEmotion}
                text={currentScene.narratorText}
              />

              {/* Fun Fact */}
              {currentScene.funFact && showFunFact && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-space-primary/10 to-space-aurora/10 border border-space-primary/20"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">💡</div>
                    <div>
                      <h4 className="text-space-primary font-bold mb-2">Did You Know?</h4>
                      <p className="text-gray-300">{currentScene.funFact}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Avatar */}
            <div className="flex justify-center">
              <AvatarCharacter
                characterId={characterId}
                action={currentScene.avatarAction}
                playerName={playerName}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <motion.button
              className="btn-ghost"
              onClick={() => {
                pauseSpeak()
                onNavigate('home')
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-5 h-5" />
              Home
            </motion.button>

            <motion.button
              className="btn-secondary"
              onClick={handleNarration}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {speaking ? (
                <>
                  <VolumeX className="w-5 h-5" />
                  Stop
                </>
              ) : (
                <>
                  <Volume2 className="w-5 h-5" />
                  Listen
                </>
              )}
            </motion.button>

            {currentScene.funFact && (
              <motion.button
                className="btn-ghost"
                onClick={() => setShowFunFact(!showFunFact)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Lightbulb className="w-5 h-5" />
                {showFunFact ? 'Hide' : 'Show'} Fun Fact
              </motion.button>
            )}

            <motion.button
              className="btn-primary text-lg px-8"
              onClick={handleNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(255,209,102,0.3)',
                  '0 0 40px rgba(255,209,102,0.5)',
                  '0 0 20px rgba(255,209,102,0.3)'
                ]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {isLastScene ? 'Start Quiz!' : 'Next'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
