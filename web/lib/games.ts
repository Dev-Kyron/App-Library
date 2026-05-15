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
    slug: 'spiritless',
    title: 'Project Spiritless',
    description:
      'A 2.5D atmospheric platformer where you navigate a world suspended between life and the void. Master fluid movement and uncover the truth of a forgotten soul.',
    longDescription:
      'Project Spiritless is a hand-crafted 2.5D platformer built in Unreal Engine 5. Traverse haunting environments rendered in stunning detail, combining Paper ZD sprite animation with a fully realized 3D world. Challenge your reflexes, explore hidden paths, and piece together a story told through the environment itself.',
    genre: ['Platformer', 'Action', 'Atmospheric'],
    thumbnail: '/thumbnails/spiritless.jpg',
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
    slug: 'nebula-drift',
    title: 'Nebula Drift',
    description:
      'A meditative space journey through hand-painted procedurally generated star fields.',
    genre: ['Casual', 'Exploration'],
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
