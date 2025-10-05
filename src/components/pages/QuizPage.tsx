'use client'

import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { PageType } from '@/types'
import { useStoryState } from '@/hooks/useStoryState'
import { useState, useEffect } from 'react'

interface QuizPageProps {
  onNavigate: (page: PageType) => void
  storyState: ReturnType<typeof useStoryState>
}

export default function QuizPage({ onNavigate, storyState }: QuizPageProps) {
  const { state, selectOption, submitQuiz, nextQuiz, quizData } = storyState
  const [feedback, setFeedback] = useState('')
  const [showNext, setShowNext] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const currentQuiz = quizData[state.quizIndex]
  const isLastQuiz = state.quizIndex === quizData.length - 1

  useEffect(() => {
    // Reset states when quiz changes
    setFeedback('')
    setShowNext(false)
    setSubmitted(false)
  }, [state.quizIndex])

  const handleOptionSelect = (optionIndex: number) => {
    if (submitted) return
    selectOption(optionIndex)
    setFeedback('')
  }

  const handleSubmit = () => {
    if (state.selectedOption === null) {
      setFeedback('Please select an answer first! 🚀')
      return
    }

    setSubmitted(true)
    const correct = state.selectedOption === currentQuiz.correct

    const encouragement = [
      'Outstanding space cadet! 🎆',
      'Stellar knowledge! ⭐',
      'You\'re a space weather expert! 🌌',
      'NASA would be proud! 🚀'
    ]

    const hints = [
      'Think about what causes those beautiful northern lights! 🌌',
      'Remember, space weather can affect technology on Earth! 📡',
      'Consider what happens when solar particles meet our atmosphere! ✨'
    ]

    if (correct) {
      submitQuiz()
      setFeedback(encouragement[Math.floor(Math.random() * encouragement.length)])
    } else {
      setFeedback(hints[Math.floor(Math.random() * hints.length)])
    }

    setShowNext(true)
  }

  const handleNext = () => {
    if (isLastQuiz) {
      onNavigate('ending')
    } else {
      nextQuiz()
    }
  }

  const getOptionClass = (optionIndex: number) => {
    let className = 'quiz-option'

    if (state.selectedOption === optionIndex && !submitted) {
      className += ' selected'
    }

    if (submitted) {
      if (optionIndex === currentQuiz.correct) {
        className += ' correct'
      } else if (optionIndex === state.selectedOption) {
        className += ' wrong'
      }
    }

    return className
  }

  const getFeedbackClass = () => {
    if (!feedback) return ''
    const isCorrect = state.selectedOption === currentQuiz.correct && submitted
    return isCorrect ? 'nasa-status success' : 'nasa-status error'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      <div className="glass-card rounded-3xl p-8 md:p-12">
        {/* Quiz Title */}
        <motion.h2
          className="text-3xl md:text-4xl font-black mb-8 text-center bg-gradient-to-r from-space-primary to-space-aurora bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Quiz Time! 🧠
        </motion.h2>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
            <span>Question {state.quizIndex + 1} of {quizData.length}</span>
            <span>Score: {state.score}/{quizData.length}</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-space-primary to-space-aurora h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((state.quizIndex + 1) / quizData.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question */}
        <motion.p
          key={`question-${state.quizIndex}`}
          className="text-xl md:text-2xl text-gray-300 mb-8 text-center font-semibold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {currentQuiz.q}
        </motion.p>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {currentQuiz.options.map((option, index) => (
            <motion.button
              key={`option-${state.quizIndex}-${index}`}
              className={getOptionClass(index)}
              onClick={() => handleOptionSelect(index)}
              disabled={submitted}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={!submitted ? { x: 4 } : {}}
            >
              ({String.fromCharCode(65 + index)}) {option}
            </motion.button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <motion.button
            className="btn-primary"
            onClick={handleSubmit}
            disabled={submitted}
            style={{ opacity: submitted ? 0.5 : 1 }}
            whileHover={!submitted ? { scale: 1.05 } : {}}
            whileTap={!submitted ? { scale: 0.95 } : {}}
          >
            <Check className="w-5 h-5" />
            Submit Answer
          </motion.button>

          <motion.button
            className="btn-ghost"
            onClick={handleNext}
            disabled={!showNext}
            style={{ opacity: showNext ? 1 : 0.5 }}
            whileHover={showNext ? { scale: 1.05 } : {}}
            whileTap={showNext ? { scale: 0.95 } : {}}
            animate={showNext ? { scale: [1, 1.05, 1] } : {}}
            transition={showNext ? { duration: 0.3 } : {}}
          >
            <ArrowRight className="w-5 h-5" />
            {isLastQuiz ? 'See Results!' : 'Next Question'}
          </motion.button>
        </div>

        {/* Feedback */}
        {feedback && (
          <motion.div
            className={`${getFeedbackClass()} text-center`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {feedback}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}