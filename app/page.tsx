'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/Header'
import HomePage from '@/components/pages/HomePage'
import CharacterSelectPage from '@/components/pages/CharacterSelectPage'
import ModeSelectPage from '@/components/pages/ModeSelectPage'
import LinearStoryPage from '@/components/pages/LinearStoryPage'
import InteractiveStoryPage from '@/components/pages/InteractiveStoryPage'
import GameSelectionPage from '@/components/pages/GameSelectionPage'
import GamePlaceholder from '@/components/pages/GamePlaceholder'
import SolarDodgeGame from '@/components/games/SolarDodgeGame'
import PlanetProtectorGame from '@/components/games/PlanetProtectorGame'
import QuizPage from '@/components/pages/QuizPage'
import ResultsPage from '@/components/pages/ResultsPage'
import EndingPage from '@/components/pages/EndingPage'
import GalaxyBackground from '@/components/GalaxyBackground'
import { useStoryState } from '@/hooks/useStoryState'
import { useNASAData } from '@/hooks/useNASAData'
import { PageType } from '@/types'

export default function StellarStories() {
  const [currentPage, setCurrentPage] = useState<PageType>('home')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState<string>('')
  const [playerName, setPlayerName] = useState<string>('')
  const [endingType, setEndingType] = useState<string>('explorer')
  const [storyScore, setStoryScore] = useState<number>(0)

  const storyState = useStoryState()
  const nasaData = useNASAData()

  const showPage = async (page: PageType) => {
    setIsTransitioning(true)
    await new Promise(resolve => setTimeout(resolve, 200))
    setCurrentPage(page)
    await new Promise(resolve => setTimeout(resolve, 50))
    setIsTransitioning(false)
  }

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  }

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  }

  const handleCharacterSelect = (characterId: string, name: string) => {
    setSelectedCharacter(characterId)
    setPlayerName(name)
  }

  const handleStoryComplete = (ending: string, score: number) => {
    setEndingType(ending)
    setStoryScore(score)
    showPage('results')
  }

  const handleRestart = () => {
    setSelectedCharacter('')
    setPlayerName('')
    setEndingType('explorer')
    setStoryScore(0)
    showPage('character')
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={showPage} />
      case 'character':
        return (
          <CharacterSelectPage
            onNavigate={showPage}
            onCharacterSelect={handleCharacterSelect}
          />
        )
      case 'mode-select':
        return <ModeSelectPage onNavigate={showPage} />
      case 'game':
        return <GameSelectionPage onNavigate={showPage} />
      case 'story':
        return (
          <LinearStoryPage
            onNavigate={showPage}
            characterId={selectedCharacter}
            playerName={playerName}
          />
        )
      case 'interactive':
        return (
          <InteractiveStoryPage
            onNavigate={showPage}
            characterId={selectedCharacter}
            playerName={playerName}
            onComplete={handleStoryComplete}
          />
        )
      case 'game-solar-dodge':
        return <SolarDodgeGame onNavigate={showPage} />
      case 'game-planet-shield':
        return <PlanetProtectorGame onNavigate={showPage} />
      case 'game-aurora-collect':
        return <GamePlaceholder onNavigate={showPage} gameTitle="Aurora Collector" gameIcon="✨" />
      case 'game-satellite-save':
        return <GamePlaceholder onNavigate={showPage} gameTitle="Satellite Saver" gameIcon="🎯" />
      case 'game-space-quiz':
        return <GamePlaceholder onNavigate={showPage} gameTitle="Space Quiz Challenge" gameIcon="🚀" />
      case 'quiz':
        return <QuizPage onNavigate={showPage} storyState={storyState} />
      case 'results':
        return (
          <ResultsPage
            onNavigate={showPage}
            endingType={endingType}
            score={storyScore}
            playerName={playerName}
            characterId={selectedCharacter}
            onRestart={handleRestart}
          />
        )
      case 'ending':
        return <EndingPage onNavigate={showPage} nasaData={nasaData} />
      default:
        return <HomePage onNavigate={showPage} />
    }
  }

  return (
    <div className="min-h-screen relative">
      <GalaxyBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        <Header />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className={isTransitioning ? 'pointer-events-none' : ''}
          >
            {renderCurrentPage()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-20 mb-8 text-center text-sm text-gray-400">
        Built for learning — uses NASA Open APIs (DONKI & APOD). 🚀
      </footer>
    </div>
  )
}