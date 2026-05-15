export interface Game {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  genre: string[];
  thumbnail: string;
  status: 'available' | 'coming-soon' | 'beta';
  url?: string;
  featured?: boolean;
  releaseYear?: number;
}

export const games: Game[] = [
  {
    slug: 'spirit-counter',
    title: 'Spirit Counter',
    description:
      'An idle clicker set in the void. Harvest souls, unlock upgrades, and trigger Void Cascades to push your spirit count into the millions.',
    longDescription:
      'Spirit Counter is a browser-based idle game built in the void aesthetic of Void Soul Studio. Click to harvest spirits, spend them on upgrades and sources, and chain together powerful Void Cascade combos. How far into the ancient tiers can you ascend?',
    genre: ['Idle', 'Clicker'],
    thumbnail: '/thumbnails/spirit-counter.png',
    status: 'available',
    url: 'https://idle-spirits.vercel.app',
  },
  {
    slug: 'spiritless',
    title: 'Project Spiritless',
    description:
      'A 2.5D atmospheric platformer where you navigate a world suspended between life and the void. Master fluid movement and uncover the truth of a forgotten soul.',
    longDescription:
      'Project Spiritless is a hand-crafted 2.5D platformer built in Unreal Engine 5. Traverse haunting environments rendered in stunning detail, combining Paper ZD sprite animation with a fully realized 3D world. Challenge your reflexes, explore hidden paths, and piece together a story told through the environment itself.',
    genre: ['Platformer', 'Action', 'Atmospheric'],
    thumbnail: '/thumbnails/spiritless.png',
    status: 'coming-soon',
    featured: true,
  },
  {
    slug: 'void-echo',
    title: 'Void Echo',
    description:
      'Navigate pulsating sound waves through a dark dimension where every beat reshapes reality.',
    genre: ['Puzzle', 'Rhythm', 'Ambient'],
    thumbnail: '',
    status: 'coming-soon',
  },
  {
    slug: 'soul-fracture',
    title: 'Soul Fracture',
    description:
      'A brutally precise roguelike where death splinters your soul into fragments you must reclaim.',
    genre: ['Roguelike', 'Action'],
    thumbnail: '',
    status: 'coming-soon',
  },
];

export function getGame(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}

export function getFeaturedGame(): Game | undefined {
  return games.find((g) => g.featured);
}
