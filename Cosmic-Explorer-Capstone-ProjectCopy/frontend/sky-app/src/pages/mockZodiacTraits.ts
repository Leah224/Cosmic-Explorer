export type SignInfo = {
  sign: string;
  element: string;
  traits: string;
  description: string;
  strengths: string;
  weaknesses: string;
  love: string;
  career: string;
  luckyColor: string;
  luckyNumber: number;
  luckyDay: string;
};

// Mock zodiac traits (keep your existing data)
export const mockZodiacTraits: Record<string, SignInfo> = {
  Aries: {
    sign: "Aries",
    element: "Fire",
    traits: "Bold, ambitious, energetic",
    description: "Aries are natural leaders, driven by passion and confidence.",
    strengths: "Courageous, determined, confident, enthusiastic",
    weaknesses: "Impulsive, impatient, short-tempered, aggressive",
    love: "Passionate and adventurous in relationships; needs excitement",
    career: "Ideal for leadership, entrepreneurship, or roles requiring initiative",
    luckyColor: "Red",
    luckyNumber: 9,
    luckyDay: "Tuesday"
  },
  Taurus: {
    sign: "Taurus",
    element: "Earth",
    traits: "Reliable, patient, practical",
    description: "Taurus values stability, comfort, and consistency.",
    strengths: "Patient, reliable, devoted, responsible",
    weaknesses: "Stubborn, possessive, uncompromising",
    love: "Romantic and loyal; seeks long-term stability",
    career: "Finance, design, agriculture, or anything requiring perseverance",
    luckyColor: "Green",
    luckyNumber: 6,
    luckyDay: "Friday"
  },
  Gemini: {
    sign: "Gemini",
    element: "Air",
    traits: "Curious, adaptable, expressive",
    description: "Geminis thrive on communication and intellectual exploration.",
    strengths: "Adaptable, outgoing, intelligent, witty",
    weaknesses: "Indecisive, anxious, superficial, inconsistent",
    love: "Playful and social; loves stimulating conversations in relationships",
    career: "Journalism, teaching, sales, or any role involving communication",
    luckyColor: "Yellow",
    luckyNumber: 5,
    luckyDay: "Wednesday"
  },
  Cancer: {
    sign: "Cancer",
    element: "Water",
    traits: "Intuitive, emotional, protective",
    description: "Cancer is deeply connected to home, emotions, and relationships.",
    strengths: "Tenacious, highly imaginative, loyal, empathetic",
    weaknesses: "Moody, pessimistic, clingy, insecure",
    love: "Nurturing and deeply caring; seeks emotional security",
    career: "Counseling, healthcare, education, or any caring role",
    luckyColor: "Silver",
    luckyNumber: 2,
    luckyDay: "Monday"
  },
  Leo: {
    sign: "Leo",
    element: "Fire",
    traits: "Confident, creative, charismatic",
    description: "Leos shine brightly and love to express themselves.",
    strengths: "Creative, passionate, generous, cheerful",
    weaknesses: "Arrogant, stubborn, self-centered, inflexible",
    love: "Warm-hearted and loyal; enjoys romance and admiration",
    career: "Entertainment, leadership roles, management, or creative fields",
    luckyColor: "Gold",
    luckyNumber: 1,
    luckyDay: "Sunday"
  },
  Virgo: {
    sign: "Virgo",
    element: "Earth",
    traits: "Analytical, kind, detail-oriented",
    description: "Virgos seek improvement and value precision.",
    strengths: "Loyal, analytical, kind, hardworking",
    weaknesses: "Overly critical, perfectionist, shy, worry-prone",
    love: "Thoughtful and reliable; seeks stable, meaningful relationships",
    career: "Healthcare, research, editing, or detail-oriented professions",
    luckyColor: "Navy Blue",
    luckyNumber: 5,
    luckyDay: "Wednesday"
  },
  Libra: {
    sign: "Libra",
    element: "Air",
    traits: "Balanced, social, fair-minded",
    description: "Libra strives for harmony and meaningful connections.",
    strengths: "Cooperative, diplomatic, gracious, fair-minded",
    weaknesses: "Indecisive, avoids confrontations, self-pitying",
    love: "Charming and romantic; values balance and harmony in relationships",
    career: "Law, art, diplomacy, design, or mediation roles",
    luckyColor: "Pink",
    luckyNumber: 6,
    luckyDay: "Friday"
  },
  Scorpio: {
    sign: "Scorpio",
    element: "Water",
    traits: "Passionate, resourceful, intense",
    description: "Scorpios experience emotions deeply and value truth.",
    strengths: "Resourceful, brave, passionate, stubborn",
    weaknesses: "Jealous, secretive, resentful, controlling",
    love: "Deeply loyal and intense; seeks emotional connection and honesty",
    career: "Research, psychology, investigation, or anything requiring focus",
    luckyColor: "Black",
    luckyNumber: 8,
    luckyDay: "Tuesday"
  },
  Sagittarius: {
    sign: "Sagittarius",
    element: "Fire",
    traits: "Adventurous, optimistic, honest",
    description: "Sagittarius seeks freedom and new experiences.",
    strengths: "Generous, idealistic, great sense of humor",
    weaknesses: "Impatient, tactless, promises more than can deliver",
    love: "Fun-loving and adventurous; values freedom and honesty in love",
    career: "Travel, education, philosophy, or roles involving exploration",
    luckyColor: "Purple",
    luckyNumber: 3,
    luckyDay: "Thursday"
  },
  Capricorn: {
    sign: "Capricorn",
    element: "Earth",
    traits: "Disciplined, responsible, ambitious",
    description: "Capricorns focus on long-term goals and success.",
    strengths: "Responsible, disciplined, self-control, good managers",
    weaknesses: "Know-it-all, unforgiving, condescending, expecting the worst",
    love: "Loyal and committed; seeks stability and long-term partnerships",
    career: "Management, finance, administration, or anything requiring persistence",
    luckyColor: "Brown",
    luckyNumber: 4,
    luckyDay: "Saturday"
  },
  Aquarius: {
    sign: "Aquarius",
    element: "Air",
    traits: "Innovative, independent, humanitarian",
    description: "Aquarius values individuality and progressive ideas.",
    strengths: "Progressive, original, independent, humanitarian",
    weaknesses: "Runs from emotional expression, temperamental, uncompromising",
    love: "Unconventional and curious; seeks intellectual and emotional connection",
    career: "Science, tech, social reform, or innovative fields",
    luckyColor: "Blue",
    luckyNumber: 7,
    luckyDay: "Saturday"
  },
  Pisces: {
    sign: "Pisces",
    element: "Water",
    traits: "Compassionate, artistic, intuitive",
    description: "Pisces are deeply empathetic and imaginative.",
    strengths: "Compassionate, artistic, intuitive, gentle",
    weaknesses: "Fearful, overly trusting, desire to escape reality",
    love: "Romantic and sensitive; seeks deep emotional bonds",
    career: "Art, music, therapy, healing professions, or anything creative",
    luckyColor: "Sea Green",
    luckyNumber: 7,
    luckyDay: "Thursday"
  }
};