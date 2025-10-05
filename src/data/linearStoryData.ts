export interface StoryScene {
  id: number
  narratorText: string
  narratorEmotion: 'happy' | 'excited' | 'worried' | 'explaining' | 'celebrating'
  avatarAction: 'idle' | 'walking' | 'looking' | 'pointing' | 'worried' | 'excited' | 'celebrating'
  backgroundImage: string
  visualEffect?: 'solar-flare' | 'aurora' | 'satellite-shake' | 'planet-glow' | 'sparkles'
  funFact?: string
}

export const linearStory: StoryScene[] = [
  {
    id: 1,
    narratorText: "Hi there, space explorer! I'm Sunny the Solar Flare! ☀️ I just burst out from the Sun with TONS of energy!",
    narratorEmotion: 'excited',
    avatarAction: 'idle',
    backgroundImage: 'https://images-assets.nasa.gov/image/PIA03149/PIA03149~orig.jpg',
    visualEffect: 'solar-flare',
    funFact: 'Solar flares are the biggest explosions in our solar system!'
  },
  {
    id: 2,
    narratorText: "Watch me zoom through space! I'm traveling super fast - almost 5 MILLION miles per hour! Whoooosh! 🚀",
    narratorEmotion: 'excited',
    avatarAction: 'excited',
    backgroundImage: 'https://images-assets.nasa.gov/image/PIA03149/PIA03149~orig.jpg',
    funFact: 'Solar flares travel so fast they can reach Earth in just 8 minutes!'
  },
  {
    id: 3,
    narratorText: "Uh oh! When I get close to Earth, I might cause some problems. But don't worry - Earth has a special shield!",
    narratorEmotion: 'worried',
    avatarAction: 'worried',
    backgroundImage: 'https://images-assets.nasa.gov/image/PIA03153/PIA03153~orig.jpg',
    funFact: 'Earth\'s magnetic field protects us like an invisible force field!'
  },
  {
    id: 4,
    narratorText: "This is Earth's MAGNETIC FIELD! It's like a giant invisible bubble that keeps Earth safe from my solar energy.",
    narratorEmotion: 'explaining',
    avatarAction: 'pointing',
    backgroundImage: 'https://images-assets.nasa.gov/image/PIA03153/PIA03153~orig.jpg',
    visualEffect: 'planet-glow',
    funFact: 'The magnetic field is created by liquid iron spinning in Earth\'s core!'
  },
  {
    id: 5,
    narratorText: "Some satellites up here might get a little shaky! Scientists work hard to protect them when I arrive.",
    narratorEmotion: 'explaining',
    avatarAction: 'looking',
    backgroundImage: 'https://images-assets.nasa.gov/image/PIA03163/PIA03163~orig.jpg',
    visualEffect: 'satellite-shake',
    funFact: 'There are over 4,000 satellites orbiting Earth right now!'
  },
  {
    id: 6,
    narratorText: "But guess what? I'm not ALL bad! When my energy hits Earth's atmosphere, something MAGICAL happens!",
    narratorEmotion: 'excited',
    avatarAction: 'excited',
    backgroundImage: 'https://images-assets.nasa.gov/image/iss041e080102/iss041e080102~orig.jpg',
    visualEffect: 'sparkles'
  },
  {
    id: 7,
    narratorText: "AURORAS! Beautiful dancing lights in the sky! They're also called the Northern and Southern Lights! 🌈✨",
    narratorEmotion: 'celebrating',
    avatarAction: 'celebrating',
    backgroundImage: 'https://images-assets.nasa.gov/image/iss041e080102/iss041e080102~orig.jpg',
    visualEffect: 'aurora',
    funFact: 'Auroras can be green, pink, red, yellow, blue, and violet!'
  },
  {
    id: 8,
    narratorText: "Scientists use special spacecraft to watch me and my solar flare friends. They can warn people when we're coming!",
    narratorEmotion: 'explaining',
    avatarAction: 'pointing',
    backgroundImage: 'https://images-assets.nasa.gov/image/PIA03163/PIA03163~orig.jpg',
    funFact: 'NASA\'s Parker Solar Probe gets closer to the Sun than any spacecraft ever!'
  },
  {
    id: 9,
    narratorText: "Astronauts on the Moon or Mars need to be extra careful. They hide in special shelters to stay safe from my energy!",
    narratorEmotion: 'worried',
    avatarAction: 'worried',
    backgroundImage: 'https://images-assets.nasa.gov/image/PIA03163/PIA03163~orig.jpg',
    funFact: 'Mars has no magnetic field, so solar storms are more dangerous there!'
  },
  {
    id: 10,
    narratorText: "See? Space weather is just like weather on Earth - sometimes sunny, sometimes stormy! But now you know how to stay safe! 🌟",
    narratorEmotion: 'celebrating',
    avatarAction: 'celebrating',
    backgroundImage: 'https://images-assets.nasa.gov/image/iss041e080102/iss041e080102~orig.jpg',
    visualEffect: 'sparkles',
    funFact: 'Space weather affects all the planets in our solar system!'
  },
  {
    id: 11,
    narratorText: "You did AMAZING, space explorer! You learned all about solar flares and space weather! Ready for a fun quiz? 🎯",
    narratorEmotion: 'happy',
    avatarAction: 'celebrating',
    backgroundImage: 'https://images-assets.nasa.gov/image/PIA03149/PIA03149~orig.jpg',
    visualEffect: 'sparkles'
  }
]

export const getNarratorEmoji = (emotion: string): string => {
  const emojiMap: Record<string, string> = {
    happy: '😊',
    excited: '🤩',
    worried: '😟',
    explaining: '🤓',
    celebrating: '🎉'
  }
  return emojiMap[emotion] || '😊'
}
