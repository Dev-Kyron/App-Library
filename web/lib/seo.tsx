/**
 * Central SEO constants and JSON-LD builders.
 *
 * Why everything lives in one file:
 * - `SITE_URL` is referenced by metadata, sitemap, robots, and every JSON-LD
 *   payload. Keeping one source of truth means swapping domains (or local
 *   dev) is a one-line change.
 * - The JSON-LD builders return typed plain objects rather than strings so
 *   pages can serialise them via `JSON.stringify` inside a single
 *   `<script type="application/ld+json">` tag (see `jsonLdScript` below).
 *
 * Notes on what we deliberately do NOT add:
 * - `aggregateRating` — we don't have real first-party reviews on the
 *   marketing pages (the AI Companion review section is opt-in / mostly
 *   placeholder), and Google penalises fabricated rating schema.
 * - `SearchAction` on WebSite — there's no on-site search endpoint yet.
 * - Founder / personal-name fields on Organization — keep it lean until
 *   there's a public About-the-Founder page to back the claim up.
 */

import type { Game } from './games';

export const SITE_URL = 'https://voidsoulstudio.com';
export const SITE_NAME = 'Void Soul Studio';
export const SITE_LOCALE = 'en_AU';

/** Used in OG image fallbacks and the Organization logo claim. */
export const SITE_LOGO = `${SITE_URL}/Logo.png`;

/** Hard-coded social handles — pulled from the existing header/footer so
 *  the Organization "sameAs" array agrees with what's actually linked. */
export const SOCIAL = {
  youtube: 'https://www.youtube.com/@voidsoul_studio',
  discord: 'https://discord.gg/Tn78RHqT4',
  github: 'https://github.com/Dev-Kyron',
} as const;

/**
 * Default site-wide description. Kept under ~160 chars so Google doesn't
 * truncate it in SERP listings. Targets the studio's main audiences:
 * indie game players, devlog watchers, and AI-tool buyers.
 */
export const SITE_DESCRIPTION =
  'Void Soul Studio is an Australian indie game studio crafting atmospheric platformers, free browser games, and AI desktop tools. Explore the library, watch the devlog.';

/**
 * Keyword set that appears in the root layout `keywords` field. Google
 * mostly ignores this in 2026, but Bing + DuckDuckGo still weight it, and
 * it's a useful index of what the site actually targets.
 */
export const SITE_KEYWORDS = [
  // Studio
  'indie game studio',
  'Australian indie studio',
  'indie game developer',
  'Void Soul Studio',
  // Flagship game
  'atmospheric platformer',
  'Unreal Engine 5 indie',
  '2.5D platformer',
  'Project Spiritless',
  // Casual / browser games
  'free browser games',
  'idle clicker',
  'flappy remake',
  'snake game online',
  'asteroids browser game',
  'tetris-style puzzle',
  // Apps
  'AI desktop assistant',
  'local AI companion',
  'multi-provider AI',
  'Jarvis-like AI',
  'call centre productivity',
  'agent dashboard',
  'AgentHub',
  'VoidSoul AI Companion',
];

/* ------------------------------------------------------------------
   JSON-LD builders

   Each helper returns a plain object (typed loosely as `Record<string,
   unknown>` because Schema.org is sprawling and a strict type would be
   more friction than benefit). Embed with the `<JsonLd>` component
   below — that wraps `JSON.stringify` in a single `<script>` tag.
   ------------------------------------------------------------------ */

type JsonLdObject = Record<string, unknown>;

/** The root studio entity. Lives on every page via the layout. */
export function organizationJsonLd(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: SITE_LOGO,
    description:
      'Independent game studio crafting atmospheric games and AI desktop tools.',
    foundingLocation: {
      '@type': 'Country',
      name: 'Australia',
    },
    sameAs: [SOCIAL.youtube, SOCIAL.discord, SOCIAL.github],
  };
}

/** The website itself — separate node so Google can connect Organization
 *  → WebSite → WebPage in its knowledge graph. */
export function websiteJsonLd(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: 'en-AU',
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

/**
 * VideoGame schema for a single game in the library. `gamePlatform` and
 * `operatingSystem` are both set to "Web Browser" for browser-playable
 * titles; the unreleased flagship gets `availability: PreOrder`.
 */
export function videoGameJsonLd(game: Game): JsonLdObject {
  const url = `${SITE_URL}/games/${game.slug}`;
  const thumb = game.thumbnail.startsWith('http')
    ? game.thumbnail
    : `${SITE_URL}${game.thumbnail}`;
  const isPlayable = game.status === 'available' && !!game.url;
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    '@id': `${url}#videogame`,
    name: game.title,
    description: game.longDescription ?? game.description,
    url,
    image: thumb,
    genre: game.genre,
    gamePlatform: isPlayable ? 'Web Browser' : 'PC',
    applicationCategory: 'Game',
    operatingSystem: isPlayable ? 'Web' : 'Windows',
    playMode: 'SinglePlayer',
    inLanguage: 'en-AU',
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'AUD',
      availability: isPlayable
        ? 'https://schema.org/InStock'
        : 'https://schema.org/PreOrder',
      url: isPlayable ? game.url : url,
    },
  };
}

/**
 * SoftwareApplication schema — used by the desktop AI Companion. Offers
 * cover the Free Forever beta tier and the Founder's lifetime upgrade.
 */
export function softwareApplicationJsonLd(args: {
  name: string;
  description: string;
  url: string;
  image: string;
  version?: string;
  category: string;
  operatingSystems: string[];
  offers: { name: string; price: string; priceCurrency?: string }[];
}): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${args.url}#software`,
    name: args.name,
    description: args.description,
    url: args.url,
    image: args.image,
    applicationCategory: args.category,
    operatingSystem: args.operatingSystems.join(', '),
    softwareVersion: args.version,
    inLanguage: 'en',
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    offers: args.offers.map((o) => ({
      '@type': 'Offer',
      name: o.name,
      price: o.price,
      priceCurrency: o.priceCurrency ?? 'AUD',
      availability: 'https://schema.org/InStock',
    })),
  };
}

/**
 * WebApplication schema — for AgentHub. Lives at agenthub.solutions but
 * is marketed from this site, so the URL points at the canonical product
 * domain while the BreadcrumbList still walks back to voidsoulstudio.com.
 */
export function webApplicationJsonLd(args: {
  name: string;
  description: string;
  url: string;
  image: string;
  category: string;
  offers: { name: string; price: string; priceCurrency?: string }[];
}): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${args.url}#webapp`,
    name: args.name,
    description: args.description,
    url: args.url,
    image: args.image,
    applicationCategory: args.category,
    operatingSystem: 'Web Browser',
    browserRequirements: 'Requires a modern desktop browser. Chromium, Firefox, or Safari.',
    inLanguage: 'en',
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    offers: args.offers.map((o) => ({
      '@type': 'Offer',
      name: o.name,
      price: o.price,
      priceCurrency: o.priceCurrency ?? 'AUD',
      availability: 'https://schema.org/InStock',
    })),
  };
}

/** BreadcrumbList — emitted alongside the page schema on every subpage. */
export function breadcrumbJsonLd(items: { name: string; url: string }[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

/* ------------------------------------------------------------------
   <JsonLd /> — server-component-safe wrapper that emits one or more
   JSON-LD payloads as a single script tag. Using a real <script> tag
   (not next/script) keeps the payload in the SSR HTML where crawlers
   can see it immediately.
   ------------------------------------------------------------------ */

export function JsonLd({ data }: { data: JsonLdObject | JsonLdObject[] }) {
  // Single-element arrays would render as `[{...}]` which Google still
  // accepts, but unwrapping to a bare object is the canonical form for
  // a single schema and avoids confusing rich-results testing tools.
  const payload = Array.isArray(data) && data.length === 1 ? data[0] : data;
  return (
    <script
      type="application/ld+json"
      // Stringify with no indentation — every byte counts for first-paint
      // and Google doesn't care about formatting.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
