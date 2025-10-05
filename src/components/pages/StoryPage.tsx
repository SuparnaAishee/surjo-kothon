'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Volume2, VolumeX, Lightbulb, Home } from 'lucide-react'
import { PageType } from '@/types'
import { useStoryState } from '@/hooks/useStoryState'
import { useNASAData } from '@/hooks/useNASAData'
import Image from 'next/image'
import { useState } from 'react'
import FunFactModal from '@/components/modals/FunFactModal'

interface StoryPageProps {
  onNavigate: (page: PageType) => void
  storyState: ReturnType<typeof useStoryState>
  nasaData: ReturnType<typeof useNASAData>
}

export default function StoryPage({ onNavigate, storyState, nasaData }: StoryPageProps) {
  const [showFunFact, setShowFunFact] = useState(false)
  const { state, nextStory, prevStory, speak, pauseSpeak, storyData } = storyState

  const currentStory = storyData[state.storyIndex]
  const isLastStory = state.storyIndex === storyData.length - 1

  const handleNext = () => {
    if (isLastStory) {
      onNavigate('quiz')
    } else {
      nextStory()
    }
    pauseSpeak()
  }

  const handleBack = () => {
    if (state.storyIndex > 0) {
      prevStory()
      pauseSpeak()
    }
  }

  const handleNarration = () => {
    if (state.speaking) {
      pauseSpeak()
    } else {
      speak(`${currentStory.title}. ${currentStory.text}`)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="glass-card rounded-3xl p-8 md:p-12">
        {/* Story Title */}
        <motion.h2
          key={`title-${state.storyIndex}`}
          className="text-2xl md:text-4xl font-black mb-6 bg-gradient-to-r from-space-primary to-space-aurora bg-clip-text text-transparent text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {currentStory.title}
        </motion.h2>

        {/* Story Image */}
        <motion.div
          key={`image-${state.storyIndex}`}
          className="relative mb-6 rounded-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Image
            src={currentStory.img}
            alt={currentStory.title}
            width={600}
            height={375}
            className="w-full aspect-video object-cover hover:scale-105 transition-transform duration-300"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(255,209,102,0.1))'
            }}
          />
        </motion.div>

        {/* Story Text */}
        <motion.p
          key={`text-${state.storyIndex}`}
          className="text-lg md:text-xl text-gray-300 leading-relaxed text-center mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {currentStory.text}
        </motion.p>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
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
            className="btn-ghost"
            onClick={handleBack}
            disabled={state.storyIndex === 0}
            whileHover={{ scale: state.storyIndex > 0 ? 1.05 : 1 }}
            whileTap={{ scale: state.storyIndex > 0 ? 0.95 : 1 }}
            style={{ opacity: state.storyIndex === 0 ? 0.5 : 1 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </motion.button>

          <motion.button
            className="btn-primary"
            onClick={handleNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowRight className="w-5 h-5" />
            {isLastStory ? 'Quiz Time!' : 'Next'}
          </motion.button>

          <motion.button
            className="btn-secondary"
            onClick={handleNarration}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {state.speaking ? (
              <>
                <VolumeX className="w-5 h-5" />
                Pause
              </>
            ) : (
              <>
                <Volume2 className="w-5 h-5" />
                Play Narration
              </>
            )}
          </motion.button>

          <motion.button
            className="btn-ghost"
            onClick={() => setShowFunFact(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Lightbulb className="w-5 h-5" />
            NASA Fun Fact
          </motion.button>
        </div>

        {/* Page Indicator */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-space-card border border-white/10 text-sm text-gray-300">
            Page {state.storyIndex + 1} / {storyData.length}
          </span>
        </div>
      </div>

      {/* Fun Fact Modal */}
      <FunFactModal
        isOpen={showFunFact}
        onClose={() => setShowFunFact(false)}
        nasaData={nasaData}
      />
    </motion.div>
  )
}