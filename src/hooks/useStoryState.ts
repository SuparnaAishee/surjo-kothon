'use client'

import { useState, useCallback } from 'react'

export interface StoryState {
  storyIndex: number
  quizIndex: number
  selectedOption: number | null
  speaking: boolean
  score: number
}

export interface StoryData {
  title: string
  text: string
  img: string
}

export interface QuizData {
  q: string
  options: string[]
  correct: number
}

export const storyData: StoryData[] = [
  {
    title: "Meet Sunny 🌞",
    text: "Hi! I'm Sunny the Solar Flare. I burst out of the Sun with lots of energy! Let's see where I go.",
    img: "https://images-assets.nasa.gov/image/PIA03149/PIA03149~orig.jpg"
  },
  {
    title: "What is Space Weather?",
    text: "Space weather is like storms in space. It can shake Earth's magnetic field and affect satellites and radio.",
    img: "https://images-assets.nasa.gov/image/PIA03153/PIA03153~orig.jpg"
  },
  {
    title: "Auroras 🌌",
    text: "When charged particles meet Earth's atmosphere near the poles, they paint the sky with colorful auroras.",
    img: "https://images-assets.nasa.gov/image/iss041e080102/iss041e080102~orig.jpg"
  },
  {
    title: "Staying Safe",
    text: "Scientists watch the Sun with spacecraft and give alerts so pilots, astronauts, and engineers can prepare.",
    img: "https://images-assets.nasa.gov/image/PIA03163/PIA03163~orig.jpg"
  }
]

export const quizData: QuizData[] = [
  {
    q: "What causes auroras?",
    options: [
      "Moonlight reflected on clouds",
      "Solar wind colliding with the atmosphere",
      "Volcano dust"
    ],
    correct: 1
  },
  {
    q: "Which event can disturb GPS and radio?",
    options: [
      "Solar flare / CME",
      "Rainstorm",
      "Tides"
    ],
    correct: 0
  },
  {
    q: "What protects Earth from space weather?",
    options: [
      "The atmosphere only",
      "Earth's magnetic field",
      "The Moon"
    ],
    correct: 1
  }
]

export function useStoryState() {
  const [state, setState] = useState<StoryState>({
    storyIndex: 0,
    quizIndex: 0,
    selectedOption: null,
    speaking: false,
    score: 0
  })

  const updateState = useCallback((updates: Partial<StoryState>) => {
    setState(prev => ({ ...prev, ...updates }))
  }, [])

  const nextStory = useCallback(() => {
    setState(prev => ({
      ...prev,
      storyIndex: Math.min(prev.storyIndex + 1, storyData.length - 1)
    }))
  }, [])

  const prevStory = useCallback(() => {
    setState(prev => ({
      ...prev,
      storyIndex: Math.max(prev.storyIndex - 1, 0)
    }))
  }, [])

  const nextQuiz = useCallback(() => {
    setState(prev => ({
      ...prev,
      quizIndex: Math.min(prev.quizIndex + 1, quizData.length - 1),
      selectedOption: null
    }))
  }, [])

  const selectOption = useCallback((option: number) => {
    setState(prev => ({ ...prev, selectedOption: option }))
  }, [])

  const submitQuiz = useCallback(() => {
    setState(prev => {
      const correct = prev.selectedOption === quizData[prev.quizIndex].correct
      return {
        ...prev,
        score: correct ? prev.score + 1 : prev.score
      }
    })
  }, [])

  const resetStory = useCallback(() => {
    setState({
      storyIndex: 0,
      quizIndex: 0,
      selectedOption: null,
      speaking: false,
      score: 0
    })
  }, [])

  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech not supported on this browser.')
      return
    }

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = 1
    utterance.pitch = 1

    setState(prev => ({ ...prev, speaking: true }))

    utterance.onend = () => {
      setState(prev => ({ ...prev, speaking: false }))
    }

    window.speechSynthesis.speak(utterance)
  }, [])

  const pauseSpeak = useCallback(() => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel()
      setState(prev => ({ ...prev, speaking: false }))
    }
  }, [])

  return {
    state,
    updateState,
    nextStory,
    prevStory,
    nextQuiz,
    selectOption,
    submitQuiz,
    resetStory,
    speak,
    pauseSpeak,
    storyData,
    quizData
  }
}