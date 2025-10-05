export interface StoryNode {
  id: string
  title: string
  text: string
  img: string
  characterDialogue?: string
  choices?: Choice[]
  planetImpact?: PlanetImpact[]
  funFact?: string
  isEnding?: boolean
  endingType?: 'hero' | 'scientist' | 'protector' | 'explorer'
}

export interface Choice {
  id: string
  text: string
  icon?: string
  nextNodeId: string
  consequence?: string
}

export interface PlanetImpact {
  planet: string
  level: 'low' | 'medium' | 'high' | 'critical'
  effect: string
}

export const storyNodes: Record<string, StoryNode> = {
  // === INTRO ===
  start: {
    id: 'start',
    title: 'A Solar Storm is Coming! ⚡',
    text: 'The Sun just released a massive solar flare! Charged particles are racing toward our solar system at incredible speeds.',
    img: 'https://images-assets.nasa.gov/image/PIA03149/PIA03149~orig.jpg',
    characterDialogue: 'Whoa! Look at that solar flare! This is going to be a big one. We need to act fast!',
    planetImpact: [
      { planet: 'Mercury', level: 'critical', effect: 'Direct solar wind impact' },
      { planet: 'Earth', level: 'high', effect: 'Satellites at risk' },
      { planet: 'Mars', level: 'medium', effect: 'Communication delays' }
    ],
    funFact: 'Solar flares travel at speeds up to 5 million miles per hour! That\'s fast enough to reach Earth in just 8 minutes.',
    choices: [
      {
        id: 'protect_earth',
        text: '🌍 Protect Earth',
        nextNodeId: 'earth_path_1',
        consequence: 'Focus on protecting our home planet'
      },
      {
        id: 'study_storm',
        text: '🔬 Study the Storm',
        nextNodeId: 'science_path_1',
        consequence: 'Collect valuable scientific data'
      },
      {
        id: 'warn_mars',
        text: '🚀 Warn Mars Mission',
        nextNodeId: 'mars_path_1',
        consequence: 'Help astronauts on Mars stay safe'
      }
    ]
  },

  // === EARTH PROTECTION PATH ===
  earth_path_1: {
    id: 'earth_path_1',
    title: 'Protecting Earth 🌍',
    text: 'You decide to focus on protecting Earth. The solar storm could disrupt satellites, power grids, and communication systems.',
    img: 'https://images-assets.nasa.gov/image/PIA03153/PIA03153~orig.jpg',
    characterDialogue: 'Good choice! Earth has billions of people depending on our technology. Let\'s make sure they stay safe.',
    planetImpact: [
      { planet: 'Earth', level: 'high', effect: 'GPS satellites vulnerable' }
    ],
    funFact: 'Earth\'s magnetic field acts like a shield, protecting us from most solar radiation!',
    choices: [
      {
        id: 'satellites',
        text: '🛰️ Protect Satellites',
        nextNodeId: 'earth_satellites',
        consequence: 'Save GPS and communication systems'
      },
      {
        id: 'power_grid',
        text: '⚡ Protect Power Grid',
        nextNodeId: 'earth_power',
        consequence: 'Prevent blackouts'
      }
    ]
  },

  earth_satellites: {
    id: 'earth_satellites',
    title: 'Satellite Shield Mission 🛰️',
    text: 'You work with space agencies to put satellites into safe mode. GPS, TV, and phone signals are protected!',
    img: 'https://images-assets.nasa.gov/image/PIA03163/PIA03163~orig.jpg',
    characterDialogue: 'Great work! Millions of people can still use their phones and find their way home thanks to you!',
    funFact: 'There are over 4,000 active satellites orbiting Earth right now!',
    choices: [
      {
        id: 'aurora',
        text: '🌈 Watch the Aurora',
        nextNodeId: 'ending_protector',
        consequence: 'See the beautiful result'
      }
    ]
  },

  earth_power: {
    id: 'earth_power',
    title: 'Power Grid Protection ⚡',
    text: 'You help power companies reduce energy flow and protect transformers. Cities stay lit up safely!',
    img: 'https://images-assets.nasa.gov/image/PIA03153/PIA03153~orig.jpg',
    characterDialogue: 'Awesome! No blackouts tonight. People can keep their lights on and stay safe at home.',
    funFact: 'A strong solar storm in 1989 caused a 9-hour blackout in Quebec, Canada!',
    choices: [
      {
        id: 'aurora',
        text: '🌈 Watch the Aurora',
        nextNodeId: 'ending_protector',
        consequence: 'Enjoy the light show'
      }
    ]
  },

  // === SCIENCE PATH ===
  science_path_1: {
    id: 'science_path_1',
    title: 'Science Mission! 🔬',
    text: 'You choose to study the solar storm with special instruments. This data will help us understand the Sun better!',
    img: 'https://images-assets.nasa.gov/image/PIA03149/PIA03149~orig.jpg',
    characterDialogue: 'Excellent! Every solar storm teaches us something new. Let\'s collect as much data as we can!',
    planetImpact: [
      { planet: 'Mercury', level: 'critical', effect: 'Measuring solar wind' },
      { planet: 'Venus', level: 'high', effect: 'Atmospheric readings' }
    ],
    funFact: 'NASA\'s Parker Solar Probe gets closer to the Sun than any spacecraft ever built!',
    choices: [
      {
        id: 'solar_probe',
        text: '🌡️ Use Solar Probe',
        nextNodeId: 'science_probe',
        consequence: 'Get up-close measurements'
      },
      {
        id: 'earth_observe',
        text: '🔭 Observe from Earth',
        nextNodeId: 'science_observe',
        consequence: 'Use ground telescopes'
      }
    ]
  },

  science_probe: {
    id: 'science_probe',
    title: 'Parker Solar Probe Data 🌡️',
    text: 'The probe sends back incredible data from inside the solar storm! You discover new patterns in how solar flares work.',
    img: 'https://images-assets.nasa.gov/image/PIA03149/PIA03149~orig.jpg',
    characterDialogue: 'Amazing discovery! This information will help us predict future solar storms even better!',
    funFact: 'The Parker Solar Probe can withstand temperatures of 2,500°F (1,377°C)!',
    choices: [
      {
        id: 'publish',
        text: '📚 Share Discovery',
        nextNodeId: 'ending_scientist',
        consequence: 'Help future scientists'
      }
    ]
  },

  science_observe: {
    id: 'science_observe',
    title: 'Earth Observatory 🔭',
    text: 'Using powerful telescopes on Earth, you capture stunning images of the solar storm and track its journey!',
    img: 'https://images-assets.nasa.gov/image/PIA03153/PIA03153~orig.jpg',
    characterDialogue: 'Beautiful data! These observations will help scientists for years to come.',
    funFact: 'Solar observatories watch the Sun 24/7 to keep us safe from space weather!',
    choices: [
      {
        id: 'publish',
        text: '📚 Share Discovery',
        nextNodeId: 'ending_scientist',
        consequence: 'Help future scientists'
      }
    ]
  },

  // === MARS PATH ===
  mars_path_1: {
    id: 'mars_path_1',
    title: 'Warning Mars Mission! 🚀',
    text: 'Astronauts on Mars need to know about the incoming solar storm! The radiation could be dangerous.',
    img: 'https://images-assets.nasa.gov/image/PIA03163/PIA03163~orig.jpg',
    characterDialogue: 'Those astronauts are counting on us! Mars has no magnetic field to protect them like Earth does.',
    planetImpact: [
      { planet: 'Mars', level: 'high', effect: 'Radiation danger for crew' }
    ],
    funFact: 'Mars lost its magnetic field billions of years ago, so it can\'t protect itself from solar storms!',
    choices: [
      {
        id: 'shelter',
        text: '🏠 Find Shelter',
        nextNodeId: 'mars_shelter',
        consequence: 'Keep astronauts safe underground'
      },
      {
        id: 'shield',
        text: '🛡️ Activate Shields',
        nextNodeId: 'mars_shield',
        consequence: 'Use habitat protection'
      }
    ]
  },

  mars_shelter: {
    id: 'mars_shelter',
    title: 'Underground Safety 🏠',
    text: 'The Mars crew moves to underground shelters where the Martian soil blocks harmful radiation. They\'re safe!',
    img: 'https://images-assets.nasa.gov/image/PIA03163/PIA03163~orig.jpg',
    characterDialogue: 'Smart thinking! The astronauts are safe and they can continue their mission when the storm passes.',
    funFact: 'Just 3 feet of Martian soil can block dangerous space radiation!',
    choices: [
      {
        id: 'continue',
        text: '🎯 Mission Success',
        nextNodeId: 'ending_hero',
        consequence: 'Everyone is safe!'
      }
    ]
  },

  mars_shield: {
    id: 'mars_shield',
    title: 'Habitat Shields Active 🛡️',
    text: 'The Mars base activates its magnetic shield system. The astronauts stay safe inside while working!',
    img: 'https://images-assets.nasa.gov/image/PIA03163/PIA03163~orig.jpg',
    characterDialogue: 'Perfect! The magnetic shield is working great. Future Mars missions will learn from this.',
    funFact: 'Scientists are developing magnetic shield technology to protect future Mars colonies!',
    choices: [
      {
        id: 'continue',
        text: '🎯 Mission Success',
        nextNodeId: 'ending_hero',
        consequence: 'Technology saves the day!'
      }
    ]
  },

  // === ENDINGS ===
  ending_hero: {
    id: 'ending_hero',
    title: 'Mission Complete! You\'re a Hero! 🎉',
    text: 'Thanks to your quick thinking, the astronauts on Mars are safe! You helped protect brave explorers millions of miles from home.',
    img: 'https://images-assets.nasa.gov/image/iss041e080102/iss041e080102~orig.jpg',
    characterDialogue: 'You did it! You\'re a true space hero. Those astronauts owe you their safety!',
    isEnding: true,
    endingType: 'hero',
    funFact: 'Real astronauts train for years to handle emergencies like solar storms in space!'
  },

  ending_protector: {
    id: 'ending_protector',
    title: 'Earth Protected! Beautiful Auroras! 🌈',
    text: 'You saved Earth\'s technology! As a bonus, the solar storm creates the most beautiful auroras ever seen. People around the world watch in wonder!',
    img: 'https://images-assets.nasa.gov/image/iss041e080102/iss041e080102~orig.jpg',
    characterDialogue: 'Look at those colors! You protected everyone AND gave them a spectacular light show. Amazing work!',
    isEnding: true,
    endingType: 'protector',
    funFact: 'Auroras can appear in many colors: green, pink, red, yellow, blue, and violet!'
  },

  ending_scientist: {
    id: 'ending_scientist',
    title: 'Scientific Discovery! 📚',
    text: 'Your research helps scientists understand solar storms better! Future space missions will be safer because of your work.',
    img: 'https://images-assets.nasa.gov/image/PIA03149/PIA03149~orig.jpg',
    characterDialogue: 'Your scientific work will help humanity for generations! You\'re making space exploration safer for everyone!',
    isEnding: true,
    endingType: 'scientist',
    funFact: 'Every solar storm we study helps us build better prediction models to keep everyone safe!'
  },

  ending_explorer: {
    id: 'ending_explorer',
    title: 'Amazing Adventure! 🚀',
    text: 'What an incredible journey through space weather! You learned so much and helped keep everyone safe.',
    img: 'https://images-assets.nasa.gov/image/PIA03163/PIA03163~orig.jpg',
    characterDialogue: 'You\'re a natural space explorer! Ready for your next adventure?',
    isEnding: true,
    endingType: 'explorer',
    funFact: 'Space weather affects all the planets in our solar system!'
  }
}

export const getStoryNode = (nodeId: string): StoryNode => {
  return storyNodes[nodeId] || storyNodes.start
}

export const getInitialNode = (): StoryNode => {
  return storyNodes.start
}
