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
  screenshots?: string[];
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
    slug: 'through-the-void',
    title: 'Through The Void',
    description:
      'A void-soaked take on the flappy formula. Guide your spirit orb through glowing purple pillars in the depths of space.',
    genre: ['Arcade', 'Casual'],
    thumbnail: '/thumbnails/through-the-void.png',
    status: 'available',
    url: 'https://through-the-void.vercel.app',
  },
  {
    slug: 'astro-cat',
    title: 'AstroCat',
    description:
      'Load your astronaut cat into a void-powered catapult and launch it into space. Collect coins mid-flight, bounce on landing, and upgrade your way to the stars.',
    longDescription:
      'AstroCat is a distance launcher set in the Void Soul universe. Time your angle and power, tap to boost mid-flight, and rack up coins to unlock 8 upgrades across 20 levels each. Push far enough to unlock the Void Ascend prestige system and permanent upgrades that carry through every reset.',
    genre: ['Arcade', 'Casual', 'Idle'],
    thumbnail: '/thumbnails/astro-cat.png',
    status: 'available',
    url: 'https://astro-cat-one.vercel.app',
  },
  {
    slug: 'new-heights',
    title: 'New Heights',
    description:
      'Leap through the void on crumbling platforms, bouncing pads, and shifting ground. How high can your spirit climb before the darkness swallows you?',
    longDescription:
      'New Heights is a fast-paced vertical platformer inspired by Doodle Jump, built with the Void Soul aesthetic. Land on glowing platforms to keep climbing — but watch out for crumbling tiles and moving platforms as the difficulty ramps up. Compete against your best score and chase milestone rewards as you ascend into the unknown.',
    genre: ['Platformer', 'Arcade', 'Casual'],
    thumbnail: '/thumbnails/new-heights.png',
    status: 'available',
    url: 'https://new-heights-neon.vercel.app',
  },
  {
    slug: 'space-worm',
    title: 'SpaceWorm',
    description:
      'A snake remake set in the void. Eat food to grow, collect power orbs, and survive as long as you can in the depths of space.',
    longDescription:
      'SpaceWorm is a void-aesthetic snake game with multiple food types, four power-ups (shield, slow, score doubler, shrink), speed progression, and particle effects. Collect normal pellets, cyan crystals, and rare pink stars for bonus points. Watch for roaming power orbs — grab them before they vanish. Mobile-ready with swipe and D-pad controls.',
    genre: ['Arcade', 'Casual'],
    thumbnail: '/thumbnails/space-worm.png',
    status: 'available',
    url: 'https://space-worm-delta.vercel.app',
  },
  {
    slug: 'asteroids',
    title: 'Asteroids',
    description:
      'A wave-survival remake of the arcade classic. Blast splitting rocks, chain combos, and outlast hunting UFOs and boss cores deep in the void.',
    longDescription:
      'Asteroids is a wave-survival arcade shooter set in the Void Soul universe. Survive escalating waves of splitting rocks, dodge UFOs that hunt you down and fire back, and tear apart mega-core bosses every few rounds. Chain fast back-to-back kills to stack a score multiplier up to 9x, grab power-ups — Rapid Fire, Spread Shot, Shield and Pierce — and pick your challenge across Casual, Normal and Insane. Plays on desktop with keyboard controls and on mobile with an on-screen virtual joystick.',
    genre: ['Arcade', 'Action', 'Shooter'],
    thumbnail: '/thumbnails/asteroids.png',
    status: 'available',
    url: 'https://asteroids-navy.vercel.app',
  },
  {
    slug: 'space-builder',
    title: 'Space Builder',
    description:
      'A block-stacking puzzler with a twist — every line you clear builds a space station that arms you with power-ups.',
    longDescription:
      'Space Builder is a Tetris-style puzzler set in the Void Soul universe. Drop and rotate falling blocks to clear full lines — and every clear feeds a six-module space station alongside the well. Each completed module hands you a power-up: Bomb to blast the bottom rows, Laser to wipe a line, or Single to shrink your piece into one block for tight gaps. Play Marathon for an endless climb, Sprint to race 40 lines against the clock, or Zen for a relaxed no-fail build. Keyboard on desktop, on-screen controls and swipe gestures on mobile.',
    genre: ['Puzzle', 'Arcade', 'Casual'],
    thumbnail: '/thumbnails/space-builder.png',
    status: 'available',
    url: 'https://space-builder.vercel.app',
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
    screenshots: [
      '/spiritless/hero-banner.png',
      '/spiritless/art.png',
      '/spiritless/3d.png',
      '/spiritless/interaction.jpg',
      '/spiritless/store-icon.png',
    ],
  },
];

export function getGame(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}

export function getFeaturedGame(): Game | undefined {
  return games.find((g) => g.featured);
}
