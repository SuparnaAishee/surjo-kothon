'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Volume2, VolumeX, Home, Lightbulb } from 'lucide-react'
import { PageType } from '@/types'
import { StoryNode, getStoryNode, getInitialNode } from '@/data/storyData'
import Image from 'next/image'
import PlanetImpact from '@/components/PlanetImpact'
import ChoiceCard from '@/components/ChoiceCard'
import FunFactModal from '@/components/modals/FunFactModal'
import { useNASAData } from '@/hooks/useNASAData'

interface InteractiveStoryPageProps {
  onNavigate: (page: PageType) => void
  characterId: string
  playerName: string
  onComplete: (endingType: string, score: number) => void
}

export default function InteractiveStoryPage({
  onNavigate,
  characterId,
  playerName,
  onComplete
}: InteractiveStoryPageProps) {
  const [currentNode, setCurrentNode] = useState<StoryNode>(getInitialNode())
  const [storyPath, setStoryPath] = useState<string[]>(['start'])
  const [speaking, setSpeaking] = useState(false)
  const [showFunFact, setShowFunFact] = useState(false)
  const nasaData = useNASAData()

  const handleChoice = (nextNodeId: string) => {
    pauseSpeak()
    const nextNode = getStoryNode(nextNodeId)
    setCurrentNode(nextNode)
    setStoryPath([...storyPath, nextNodeId])

    // If it's an ending, complete the story
    if (nextNode.isEnding) {
      setTimeout(() => {
        onComplete(nextNode.endingType || 'explorer', storyPath.length)
      }, 3000)
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
    utterance.pitch = 1

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
      const textToSpeak = currentNode.characterDialogue || currentNode.text
      speak(`${currentNode.title}. ${textToSpeak}`)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Progress breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex items-center gap-2 text-sm text-gray-400"
      >
        {storyPath.map((nodeId, index) => (
          <div key={nodeId} className="flex items-center gap-2">
            {index > 0 && <span>→</span>}
            <span className={index === storyPath.length - 1 ? 'text-space-primary font-semibold' : ''}>
              Step {index + 1}
            </span>
          </div>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentNode.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="glass-card rounded-3xl p-8 md:p-12"
        >
          {/* Story Title */}
          <motion.h2
            className="text-3xl md:text-5xl font-black mb-6 bg-gradient-to-r from-space-primary to-space-aurora bg-clip-text text-transparent text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
          >
            {currentNode.title}
          </motion.h2>

          {/* Story Image */}
          <motion.div
            className="relative mb-6 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Image
              src={currentNode.img}
              alt={currentNode.title}
              width={800}
              height={450}
              className="w-full aspect-video object-cover"
              style={{
                filter: 'drop-shadow(0 0 30px rgba(255,209,102,0.2))'
              }}
            />

            {/* Character badge overlay */}
            <motion.div
              className="absolute top-4 left-4 glass-card px-4 py-2 rounded-full flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-space-primary to-space-aurora flex items-center justify-center text-sm">
                {playerName[0].toUpperCase()}
              </div>
              <span className="font-semibold text-sm">{playerName}</span>
            </motion.div>
          </motion.div>

          {/* Character Dialogue */}
          {currentNode.characterDialogue && (
            <motion.div
              className="mb-6 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="glass-card rounded-2xl p-6 border-2 border-space-primary/30">
                <div className="flex items-start gap-4">
                  <motion.div
                    className="text-4xl"
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                  >
                    {characterId === 'stella' ? '🚀' : characterId === 'nova' ? '🔬' : characterId === 'orbit' ? '🛠️' : '⭐'}
                  </motion.div>
                  <p className="text-lg text-gray-200 flex-1">
                    <span className="text-space-primary font-bold">You: </span>
                    "{currentNode.characterDialogue}"
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Story Text */}
          <motion.p
            className="text-xl md:text-2xl text-gray-300 leading-relaxed text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {currentNode.text}
          </motion.p>

          {/* Planet Impact */}
          {currentNode.planetImpact && currentNode.planetImpact.length > 0 && (
            <PlanetImpact impacts={currentNode.planetImpact} />
          )}

          {/* Choices */}
          {currentNode.choices && currentNode.choices.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-8"
            >
              <motion.h3
                className="text-2xl font-bold text-center mb-6"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              >
                What will you do? 🤔
              </motion.h3>

              <div className={`grid gap-6 ${
                currentNode.choices.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'
              }`}>
                {currentNode.choices.map((choice, index) => (
                  <ChoiceCard
                    key={choice.id}
                    choice={choice}
                    index={index}
                    onSelect={() => handleChoice(choice.nextNodeId)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Ending message */}
          {currentNode.isEnding && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, type: 'spring', bounce: 0.5 }}
              className="text-center"
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                className="text-6xl mb-4 inline-block"
              >
                🎉
              </motion.div>
              <p className="text-xl text-space-primary font-bold">
                Loading your results...
              </p>
            </motion.div>
          )}

          {/* Controls */}
          {!currentNode.isEnding && (
            <div className="flex flex-wrap justify-center gap-3 mt-6">
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

              {currentNode.funFact && (
                <motion.button
                  className="btn-ghost"
                  onClick={() => setShowFunFact(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Lightbulb className="w-5 h-5" />
                  Fun Fact
                </motion.button>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Fun Fact Modal */}
      {currentNode.funFact && (
        <FunFactModal
          isOpen={showFunFact}
          onClose={() => setShowFunFact(false)}
          nasaData={nasaData}
          customFact={currentNode.funFact}
        />
      )}
    </div>
  )
}
