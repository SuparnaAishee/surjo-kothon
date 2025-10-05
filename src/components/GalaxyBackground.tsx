'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function GalaxyBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-gray-900 via-purple-900 to-black">
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(120, 40, 200, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 70%, rgba(40, 120, 200, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(200, 40, 120, 0.3) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      />

      {/* Stars - small */}
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={`star-small-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: Math.random() * 2
          }}
        />
      ))}

      {/* Stars - medium */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={`star-medium-${i}`}
          className="absolute w-2 h-2 bg-blue-200 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(1px)'
          }}
          animate={{
            opacity: [0.4, 0.9, 0.4],
            scale: [1, 1.3, 1],
            x: mousePosition.x * (i % 3),
            y: mousePosition.y * (i % 3)
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: Math.random() * 3
          }}
        />
      ))}

      {/* Nebula clouds */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`nebula-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${200 + Math.random() * 300}px`,
            height: `${200 + Math.random() * 300}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, ${
              ['rgba(138, 43, 226, 0.2)', 'rgba(75, 0, 130, 0.2)', 'rgba(255, 20, 147, 0.2)'][i % 3]
            } 0%, transparent 70%)`,
            filter: 'blur(40px)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: mousePosition.x * (i % 2 === 0 ? -1 : 1) * 2,
            y: mousePosition.y * (i % 2 === 0 ? -1 : 1) * 2
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        />
      ))}

      {/* Shooting stars */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`shooting-star-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 50}%`,
            boxShadow: '0 0 20px 2px rgba(255, 255, 255, 0.8)'
          }}
          animate={{
            x: [0, 300],
            y: [0, 200],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 5 + i * 3,
            ease: 'linear'
          }}
        />
      ))}

      {/* Glowing planets in background */}
      <motion.div
        className="absolute w-40 h-40 rounded-full"
        style={{
          left: '10%',
          top: '20%',
          background: 'radial-gradient(circle, rgba(255, 200, 100, 0.4) 0%, transparent 70%)',
          filter: 'blur(20px)'
        }}
        animate={{
          scale: [1, 1.1, 1],
          x: mousePosition.x * -1,
          y: mousePosition.y * -1
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      />

      <motion.div
        className="absolute w-60 h-60 rounded-full"
        style={{
          right: '15%',
          bottom: '25%',
          background: 'radial-gradient(circle, rgba(100, 150, 255, 0.3) 0%, transparent 70%)',
          filter: 'blur(25px)'
        }}
        animate={{
          scale: [1, 1.15, 1],
          x: mousePosition.x * 1.5,
          y: mousePosition.y * 1.5
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      />

      {/* Cosmic dust particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: 'rgba(200, 150, 255, 0.4)',
            filter: 'blur(2px)'
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 0.8, 0],
            x: mousePosition.x * 0.5
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        />
      ))}
    </div>
  )
}
