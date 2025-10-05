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

// Character avatar components with full bodies
const StellaAvatar = () => (
  <svg viewBox="0 0 200 240" className="w-full h-full">
    {/* Backpack/Jetpack */}
    <rect x="70" y="120" width="60" height="45" rx="8" fill="#2563EB"/>
    <circle cx="85" cy="140" r="6" fill="#60A5FA"/>
    <circle cx="115" cy="140" r="6" fill="#60A5FA"/>

    {/* Body - Space Suit */}
    <ellipse cx="100" cy="130" rx="35" ry="45" fill="#3B82F6"/>
    <ellipse cx="100" cy="130" rx="28" ry="38" fill="#60A5FA"/>

    {/* Arms */}
    <ellipse cx="65" cy="125" rx="12" ry="35" fill="#3B82F6" transform="rotate(-20 65 125)"/>
    <ellipse cx="135" cy="125" rx="12" ry="35" fill="#3B82F6" transform="rotate(20 135 125)"/>
    <circle cx="60" cy="150" r="10" fill="#1E3A8A"/>
    <circle cx="140" cy="150" r="10" fill="#1E3A8A"/>

    {/* Legs */}
    <rect x="80" y="165" width="18" height="45" rx="9" fill="#2563EB"/>
    <rect x="102" y="165" width="18" height="45" rx="9" fill="#2563EB"/>
    <ellipse cx="89" cy="210" rx="12" ry="8" fill="#1E3A8A"/>
    <ellipse cx="111" cy="210" rx="12" ry="8" fill="#1E3A8A"/>

    {/* Belt */}
    <rect x="70" y="145" width="60" height="10" fill="#FBBF24"/>
    <circle cx="100" cy="150" r="6" fill="#F59E0B"/>

    {/* Neck */}
    <rect x="90" y="85" width="20" height="15" fill="#FDE68A"/>

    {/* Helmet bubble */}
    <circle cx="100" cy="55" r="38" fill="#93C5FD" opacity="0.4"/>
    <circle cx="100" cy="55" r="38" fill="none" stroke="#60A5FA" strokeWidth="3"/>

    {/* Head */}
    <circle cx="100" cy="55" r="30" fill="#FDE68A"/>

    {/* Hair - cute bangs */}
    <ellipse cx="100" cy="35" rx="32" ry="20" fill="#92400E"/>
    <path d="M 75 40 Q 70 35 73 30 Q 77 35 80 30 Q 85 35 90 30 Q 95 35 100 30 Q 105 35 110 30 Q 115 35 120 30 Q 123 35 127 30 Q 130 35 125 40" fill="#92400E"/>

    {/* Eyes - bigger and cuter */}
    <ellipse cx="88" cy="50" rx="6" ry="8" fill="white"/>
    <ellipse cx="112" cy="50" rx="6" ry="8" fill="white"/>
    <circle cx="88" cy="51" r="5" fill="#1F2937"/>
    <circle cx="112" cy="51" r="5" fill="#1F2937"/>
    <circle cx="90" cy="49" r="2.5" fill="white"/>
    <circle cx="114" cy="49" r="2.5" fill="white"/>

    {/* Happy eyebrows */}
    <path d="M 78 42 Q 83 40 88 42" stroke="#92400E" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M 112 42 Q 117 40 122 42" stroke="#92400E" strokeWidth="2" fill="none" strokeLinecap="round"/>

    {/* Cute little nose */}
    <ellipse cx="100" cy="58" rx="2" ry="1.5" fill="#FCA5A5"/>

    {/* Big happy smile */}
    <path d="M 85 62 Q 100 70 115 62" stroke="#78350F" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M 88 64 Q 100 69 112 64" fill="#F97316" opacity="0.3"/>

    {/* Helmet details */}
    <line x1="100" y1="18" x2="100" y2="12" stroke="#3B82F6" strokeWidth="3"/>
    <circle cx="100" cy="10" r="4" fill="#EF4444"/>
  </svg>
)

const NovaAvatar = () => (
  <svg viewBox="0 0 200 240" className="w-full h-full">
    {/* Lab coat */}
    <path d="M 60 110 L 50 200 L 75 220 L 100 210 L 125 220 L 150 200 L 140 110 Z" fill="white" stroke="#E5E7EB" strokeWidth="2"/>

    {/* Body */}
    <ellipse cx="100" cy="130" rx="32" ry="42" fill="#A855F7"/>

    {/* Arms */}
    <ellipse cx="70" cy="130" rx="13" ry="38" fill="#D8B4FE" transform="rotate(-15 70 130)"/>
    <ellipse cx="130" cy="130" rx="13" ry="38" fill="#D8B4FE" transform="rotate(15 130 130)"/>
    <circle cx="65" cy="160" r="11" fill="#FDE68A"/>
    <circle cx="135" cy="160" r="11" fill="#FDE68A"/>

    {/* Legs */}
    <rect x="78" y="165" width="20" height="50" rx="10" fill="#6B21A8"/>
    <rect x="102" y="165" width="20" height="50" rx="10" fill="#6B21A8"/>
    <ellipse cx="88" cy="215" rx="13" ry="9" fill="#4C1D95"/>
    <ellipse cx="112" cy="215" rx="13" ry="9" fill="#4C1D95"/>

    {/* Neck */}
    <rect x="88" y="82" width="24" height="18" fill="#FDE68A"/>

    {/* Head */}
    <circle cx="100" cy="60" r="32" fill="#FEF3C7"/>

    {/* Hair - long purple */}
    <ellipse cx="100" cy="45" rx="35" ry="30" fill="#9333EA"/>
    <path d="M 70 50 Q 65 70 68 90" fill="#9333EA"/>
    <path d="M 130 50 Q 135 70 132 90" fill="#9333EA"/>
    <ellipse cx="85" cy="85" rx="8" ry="20" fill="#9333EA"/>
    <ellipse cx="115" cy="85" rx="8" ry="20" fill="#9333EA"/>

    {/* Face */}
    <circle cx="100" cy="60" r="28" fill="#FDE68A"/>

    {/* Glasses - larger, rounder */}
    <circle cx="85" cy="56" r="11" fill="rgba(236,72,153,0.15)" stroke="#EC4899" strokeWidth="2.5"/>
    <circle cx="115" cy="56" r="11" fill="rgba(236,72,153,0.15)" stroke="#EC4899" strokeWidth="2.5"/>
    <line x1="96" y1="56" x2="104" y2="56" stroke="#EC4899" strokeWidth="2.5"/>

    {/* Eyes - big sparkly eyes */}
    <ellipse cx="85" cy="56" rx="5" ry="7" fill="white"/>
    <ellipse cx="115" cy="56" rx="5" ry="7" fill="white"/>
    <circle cx="85" cy="57" r="4.5" fill="#1F2937"/>
    <circle cx="115" cy="57" r="4.5" fill="#1F2937"/>
    <circle cx="87" cy="55" r="2" fill="white"/>
    <circle cx="117" cy="55" r="2" fill="white"/>
    <circle cx="84" cy="59" r="1" fill="white" opacity="0.6"/>
    <circle cx="114" cy="59" r="1" fill="white" opacity="0.6"/>

    {/* Friendly eyebrows */}
    <path d="M 73 48 Q 78 46 85 47" stroke="#9333EA" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M 115 47 Q 122 46 127 48" stroke="#9333EA" strokeWidth="2" fill="none" strokeLinecap="round"/>

    {/* Cute nose */}
    <ellipse cx="100" cy="65" rx="2" ry="1.5" fill="#FCA5A5"/>

    {/* Sweet smile */}
    <path d="M 87 70 Q 100 77 113 70" stroke="#78350F" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M 90 72 Q 100 76 110 72" fill="#F97316" opacity="0.2"/>

    {/* Lab coat details */}
    <line x1="100" y1="110" x2="100" y2="180" stroke="#D1D5DB" strokeWidth="2"/>
    <circle cx="95" cy="120" r="3" fill="#9333EA"/>
    <circle cx="95" cy="135" r="3" fill="#9333EA"/>
    <circle cx="95" cy="150" r="3" fill="#9333EA"/>
  </svg>
)

const OrbitAvatar = () => (
  <svg viewBox="0 0 200 240" className="w-full h-full">
    {/* Tool belt back */}
    <rect x="65" y="145" width="70" height="15" fill="#92400E" rx="3"/>

    {/* Body - overalls */}
    <rect x="75" y="100" width="50" height="70" rx="8" fill="#F59E0B"/>
    <path d="M 85 100 L 85 85 L 95 80 L 95 100" fill="#EA580C"/>
    <path d="M 115 100 L 115 85 L 105 80 L 105 100" fill="#EA580C"/>

    {/* Shirt */}
    <ellipse cx="100" cy="110" rx="30" ry="35" fill="#FBBF24"/>

    {/* Arms */}
    <ellipse cx="72" cy="125" rx="14" ry="36" fill="#FB923C" transform="rotate(-18 72 125)"/>
    <ellipse cx="128" cy="125" rx="14" ry="36" fill="#FB923C" transform="rotate(18 128 125)"/>
    <circle cx="67" cy="155" r="11" fill="#FDE68A"/>
    <circle cx="133" cy="155" r="11" fill="#FDE68A"/>

    {/* Holding wrench */}
    <rect x="130" y="150" width="8" height="35" rx="4" fill="#78716C" transform="rotate(25 134 167)"/>
    <path d="M 140 145 L 145 140 L 150 145 L 145 150 Z" fill="#A8A29E" transform="rotate(25 145 145)"/>

    {/* Legs */}
    <rect x="80" y="165" width="18" height="48" rx="9" fill="#1C64F2"/>
    <rect x="102" y="165" width="18" height="48" rx="9" fill="#1C64F2"/>
    <ellipse cx="89" cy="213" rx="13" ry="9" fill="#92400E"/>
    <ellipse cx="111" cy="213" rx="13" ry="9" fill="#92400E"/>

    {/* Tool belt details */}
    <rect x="70" y="148" width="8" height="18" fill="#57534E"/>
    <rect x="122" y="148" width="8" height="18" fill="#57534E"/>
    <circle cx="100" cy="153" r="5" fill="#FBBF24"/>

    {/* Neck */}
    <rect x="88" y="75" width="24" height="16" fill="#FDE68A"/>

    {/* Hard hat */}
    <ellipse cx="100" cy="38" rx="38" ry="12" fill="#F59E0B"/>
    <path d="M 65 38 Q 65 30 72 25 L 128 25 Q 135 30 135 38 L 135 48 Q 135 52 130 52 L 70 52 Q 65 52 65 48 Z" fill="#FB923C"/>
    <rect x="95" y="25" width="10" height="8" fill="#FBBF24"/>

    {/* Head */}
    <circle cx="100" cy="60" r="30" fill="#FFEAA7"/>

    {/* Hair under hat - cute side hair */}
    <path d="M 70 52 Q 65 58 68 65" fill="#D68910"/>
    <path d="M 130 52 Q 135 58 132 65" fill="#D68910"/>

    {/* Eyes - simple happy eyes */}
    <circle cx="88" cy="58" r="8" fill="white"/>
    <circle cx="112" cy="58" r="8" fill="white"/>
    <circle cx="88" cy="59" r="6" fill="#2C3E50"/>
    <circle cx="112" cy="59" r="6" fill="#2C3E50"/>
    <circle cx="90" cy="57" r="3" fill="white"/>
    <circle cx="114" cy="57" r="3" fill="white"/>

    {/* Happy eyebrows */}
    <path d="M 78 50 Q 83 48 90 50" stroke="#D68910" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M 110 50 Q 117 48 122 50" stroke="#D68910" strokeWidth="2.5" fill="none" strokeLinecap="round"/>

    {/* Simple dot nose */}
    <circle cx="100" cy="66" r="2" fill="#E67E22"/>

    {/* Wide happy smile */}
    <path d="M 82 70 Q 100 78 118 70" stroke="#2C3E50" strokeWidth="2.5" fill="none" strokeLinecap="round"/>

    {/* Rosy cheeks */}
    <circle cx="73" cy="65" r="6" fill="#E67E22" opacity="0.25"/>
    <circle cx="127" cy="65" r="6" fill="#E67E22" opacity="0.25"/>
  </svg>
)

const LunaAvatar = () => (
  <svg viewBox="0 0 200 240" className="w-full h-full">
    {/* Cape */}
    <path d="M 75 100 Q 50 130 45 180 L 60 200 L 75 185 L 75 110" fill="#047857" opacity="0.7"/>
    <path d="M 125 100 Q 150 130 155 180 L 140 200 L 125 185 L 125 110" fill="#047857" opacity="0.7"/>

    {/* Body - uniform */}
    <ellipse cx="100" cy="130" rx="34" ry="44" fill="#059669"/>

    {/* Jacket details */}
    <path d="M 100 95 L 85 130 L 90 170" stroke="#FBBF24" strokeWidth="2" fill="none"/>
    <path d="M 100 95 L 115 130 L 110 170" stroke="#FBBF24" strokeWidth="2" fill="none"/>

    {/* Stars/medals */}
    <circle cx="82" cy="115" r="6" fill="#FBBF24"/>
    <text x="82" y="118" fontSize="9" fill="#047857" textAnchor="middle" fontWeight="bold">★</text>
    <circle cx="118" cy="115" r="6" fill="#FBBF24"/>
    <text x="118" y="118" fontSize="9" fill="#047857" textAnchor="middle" fontWeight="bold">★</text>

    {/* Arms */}
    <ellipse cx="70" cy="128" rx="13" ry="38" fill="#10B981" transform="rotate(-20 70 128)"/>
    <ellipse cx="130" cy="128" rx="13" ry="38" fill="#10B981" transform="rotate(20 130 128)"/>
    <circle cx="64" cy="158" r="11" fill="#FDE68A"/>
    <circle cx="136" cy="158" r="11" fill="#FDE68A"/>

    {/* Legs */}
    <rect x="80" y="168" width="19" height="48" rx="9" fill="#065F46"/>
    <rect x="101" y="168" width="19" height="48" rx="9" fill="#065F46"/>
    <ellipse cx="89" cy="216" rx="13" ry="9" fill="#1F2937"/>
    <ellipse cx="110" cy="216" rx="13" ry="9" fill="#1F2937"/>

    {/* Belt */}
    <rect x="70" y="148" width="60" height="12" fill="#1F2937"/>
    <rect x="95" y="148" width="10" height="12" fill="#FBBF24"/>

    {/* Neck */}
    <rect x="88" y="78" width="24" height="18" fill="#FDE68A"/>

    {/* Commander hat */}
    <ellipse cx="100" cy="35" rx="40" ry="10" fill="#047857"/>
    <path d="M 62 35 L 60 45 Q 60 50 65 50 L 135 50 Q 140 50 140 45 L 138 35" fill="#059669"/>
    <rect x="85" y="28" width="30" height="8" fill="#065F46" rx="2"/>

    {/* Hat badge */}
    <circle cx="100" cy="42" r="8" fill="#FBBF24"/>
    <text x="100" y="47" fontSize="12" fill="#047857" textAnchor="middle" fontWeight="bold">★</text>

    {/* Head */}
    <circle cx="100" cy="62" r="30" fill="#FFE4B5"/>

    {/* Hair - neat side hair */}
    <path d="M 72 52 Q 68 60 70 68" fill="#8B4513"/>
    <path d="M 128 52 Q 132 60 130 68" fill="#8B4513"/>
    <ellipse cx="82" cy="52" rx="10" ry="15" fill="#8B4513"/>
    <ellipse cx="118" cy="52" rx="10" ry="15" fill="#8B4513"/>

    {/* Eyes - determined and kind */}
    <circle cx="88" cy="60" r="8" fill="white"/>
    <circle cx="112" cy="60" r="8" fill="white"/>
    <circle cx="88" cy="61" r="6" fill="#2C3E50"/>
    <circle cx="112" cy="61" r="6" fill="#2C3E50"/>
    <circle cx="90" cy="59" r="3" fill="white"/>
    <circle cx="114" cy="59" r="3" fill="white"/>

    {/* Confident eyebrows */}
    <path d="M 76 54 Q 82 52 88 53" stroke="#8B4513" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M 112 53 Q 118 52 124 54" stroke="#8B4513" strokeWidth="2.5" fill="none" strokeLinecap="round"/>

    {/* Simple nose */}
    <circle cx="100" cy="68" r="2" fill="#CD853F"/>

    {/* Confident smile */}
    <path d="M 85 74 Q 100 81 115 74" stroke="#2C3E50" strokeWidth="2.5" fill="none" strokeLinecap="round"/>

    {/* Rosy cheeks */}
    <circle cx="72" cy="67" r="6" fill="#E67E22" opacity="0.2"/>
    <circle cx="128" cy="67" r="6" fill="#E67E22" opacity="0.2"/>
  </svg>
)

const characters: Character[] = [
  {
    id: 'stella',
    name: 'Captain Stella',
    role: 'Astronaut',
    description: 'Brave explorer who loves adventure in space!',
    icon: <StellaAvatar />,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'nova',
    name: 'Dr. Nova',
    role: 'Scientist',
    description: 'Curious scientist who discovers space secrets!',
    icon: <NovaAvatar />,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'orbit',
    name: 'Engineer Orbit',
    role: 'Space Engineer',
    description: 'Smart builder who fixes spaceships!',
    icon: <OrbitAvatar />,
    color: 'from-orange-500 to-yellow-500'
  },
  {
    id: 'luna',
    name: 'Commander Luna',
    role: 'Mission Leader',
    description: 'Wise leader who guides the team!',
    icon: <LunaAvatar />,
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

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {characters.map((character, index) => (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, type: 'spring' }}
                whileHover={{ y: -15, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCharacterClick(character.id)}
                className="cursor-pointer relative group"
              >
                {/* Character with platform */}
                <div className="relative">
                  {/* Glow effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${character.color} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity`}
                    animate={selectedCharacter === character.id ? {
                      opacity: [0.4, 0.6, 0.4],
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  {/* Character illustration - LARGE */}
                  <motion.div
                    className="w-48 h-56 mx-auto mb-4 relative z-10"
                    animate={selectedCharacter === character.id ? {
                      y: [0, -10, 0],
                    } : {}}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    {character.icon}
                  </motion.div>

                  {/* Platform/Shadow */}
                  <motion.div
                    className={`h-3 mx-auto mb-4 rounded-full bg-gradient-to-r ${character.color} opacity-30 blur-sm`}
                    style={{ width: '140px' }}
                    animate={{
                      scaleX: [1, 0.9, 1],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  {/* Character info */}
                  <div className="text-center">
                    <h3 className={`text-2xl font-black mb-1 bg-gradient-to-r ${character.color} bg-clip-text text-transparent`}>
                      {character.name}
                    </h3>
                    <p className={`text-sm font-bold mb-2 bg-gradient-to-r ${character.color} bg-clip-text text-transparent opacity-80`}>
                      {character.role}
                    </p>
                    <p className="text-xs text-gray-400 px-2">{character.description}</p>
                  </div>

                  {/* Selection indicator */}
                  {selectedCharacter === character.id && (
                    <motion.div
                      className="absolute -top-2 left-1/2 transform -translate-x-1/2"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', bounce: 0.6 }}
                    >
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${character.color} flex items-center justify-center shadow-lg`}>
                        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </motion.div>
                  )}
                </div>
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
            {/* Large character display */}
            <motion.div
              className="relative mb-6"
              animate={{
                y: [0, -15, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              {/* Glow effect */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${selectedChar?.color} opacity-30 blur-3xl`}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Big character */}
              <div className="w-64 h-72 mx-auto relative z-10">
                {selectedChar?.icon}
              </div>

              {/* Platform/Shadow */}
              <motion.div
                className={`h-4 mx-auto rounded-full bg-gradient-to-r ${selectedChar?.color} opacity-40 blur-md`}
                style={{ width: '180px' }}
                animate={{
                  scaleX: [1, 0.85, 1],
                  opacity: [0.4, 0.6, 0.4]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>

            <h2 className={`text-4xl font-black mb-2 bg-gradient-to-r ${selectedChar?.color} bg-clip-text text-transparent`}>
              {selectedChar?.name}
            </h2>
            <p className={`text-2xl font-bold bg-gradient-to-r ${selectedChar?.color} bg-clip-text text-transparent opacity-80`}>
              {selectedChar?.role}
            </p>
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
