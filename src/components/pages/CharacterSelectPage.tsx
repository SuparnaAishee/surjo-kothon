'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { PageType } from '@/types'
import { Rocket, Microscope, Wrench, Star } from 'lucide-react'

interface Character {
  id: string
  name: string
  role: string
  description: string
  icon: React.ReactNode
  color: string
}

const characters: Character[] = [
  {
    id: 'stella',
    name: 'Captain Stella',
    role: 'Astronaut',
    description: 'Brave explorer who loves adventure in space!',
    icon: <Rocket className="w-12 h-12" />,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'nova',
    name: 'Dr. Nova',
    role: 'Scientist',
    description: 'Curious scientist who discovers space secrets!',
    icon: <Microscope className="w-12 h-12" />,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'orbit',
    name: 'Engineer Orbit',
    role: 'Space Engineer',
    description: 'Smart builder who fixes spaceships!',
    icon: <Wrench className="w-12 h-12" />,
    color: 'from-orange-500 to-yellow-500'
  },
  {
    id: 'luna',
    name: 'Commander Luna',
    role: 'Mission Leader',
    description: 'Wise leader who guides the team!',
    icon: <Star className="w-12 h-12" />,
    color: 'from-green-500 to-emerald-500'
  }
]

interface CharacterSelectPageProps {
  onNavigate: (page: PageType) => void
  onCharacterSelect: (characterId: string, playerName: string) => void
}

export default function CharacterSelectPage({ onNavigate, onCharacterSelect }: CharacterSelectPageProps) {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null)
  const [playerName, setPlayerName] = useState('')
  const [step, setStep] = useState<'character' | 'name'>('character')

  const handleCharacterClick = (characterId: string) => {
    setSelectedCharacter(characterId)
    setTimeout(() => setStep('name'), 600)
  }

  const handleStart = () => {
    if (selectedCharacter && playerName.trim()) {
      onCharacterSelect(selectedCharacter, playerName.trim())
      onNavigate('mode-select')
    }
  }

  const selectedChar = characters.find(c => c.id === selectedCharacter)

  return (
    <div className="max-w-6xl mx-auto">
      {step === 'character' ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-space-primary to-space-aurora bg-clip-text text-transparent"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
          >
            Choose Your Space Hero!
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Pick who you want to be on this adventure! 🚀
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {characters.map((character, index) => (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, type: 'spring' }}
                whileHover={{ y: -10, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCharacterClick(character.id)}
                className={`glass-card rounded-3xl p-6 cursor-pointer relative overflow-hidden group ${
                  selectedCharacter === character.id ? 'ring-4 ring-space-primary' : ''
                }`}
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${character.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

                {/* Icon */}
                <motion.div
                  className={`w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br ${character.color} flex items-center justify-center text-white`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {character.icon}
                </motion.div>

                {/* Character info */}
                <h3 className="text-2xl font-bold mb-1">{character.name}</h3>
                <p className="text-space-primary font-semibold mb-2">{character.role}</p>
                <p className="text-sm text-gray-400">{character.description}</p>

                {/* Selection indicator */}
                {selectedCharacter === character.id && (
                  <motion.div
                    className="absolute top-4 right-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', bounce: 0.6 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-space-primary flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Selected character display */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.4 }}
            className="mb-8"
          >
            <motion.div
              className={`w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br ${selectedChar?.color} flex items-center justify-center text-white`}
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            >
              {selectedChar?.icon}
            </motion.div>
            <h2 className="text-3xl font-bold mb-2">{selectedChar?.name}</h2>
            <p className="text-xl text-space-primary">{selectedChar?.role}</p>
          </motion.div>

          {/* Name input */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-6">What's your name, space explorer?</h3>

            <motion.input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name..."
              className="w-full max-w-md mx-auto px-6 py-4 text-xl text-center rounded-2xl bg-space-card border-2 border-white/10 focus:border-space-primary outline-none transition-colors mb-8"
              whileFocus={{ scale: 1.02 }}
              maxLength={20}
            />

            <div className="flex gap-4 justify-center">
              <motion.button
                className="btn-ghost"
                onClick={() => {
                  setStep('character')
                  setSelectedCharacter(null)
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back
              </motion.button>

              <motion.button
                className="btn-primary text-xl px-8"
                onClick={handleStart}
                disabled={!playerName.trim()}
                whileHover={{ scale: playerName.trim() ? 1.05 : 1 }}
                whileTap={{ scale: playerName.trim() ? 0.95 : 1 }}
                animate={playerName.trim() ? {
                  boxShadow: [
                    '0 0 20px rgba(255,209,102,0.3)',
                    '0 0 40px rgba(255,209,102,0.5)',
                    '0 0 20px rgba(255,209,102,0.3)'
                  ]
                } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ opacity: playerName.trim() ? 1 : 0.5 }}
              >
                Start Adventure! 🚀
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
