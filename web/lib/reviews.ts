/**
 * Curated reviews for the VoidSoul AI Companion landing page Reactions wall.
 *
 * Reviews don't auto-publish — beta testers submit them in-app via
 * Settings → About → "Leave a review", which emails the studio through
 * Formspree. The best ones get hand-picked in here.
 *
 * --------------------------- ADDING A REVIEW ----------------------------
 *   1. Open the Formspree dashboard for the "VoidSoul Reviews" form.
 *   2. Pick a review worth featuring.
 *   3. Append an entry to the REVIEWS array below.
 *      - `name`     : display name from the submission, or "Anonymous"
 *      - `rating`   : 1-5 (whole numbers; half-stars not supported by the
 *                    current SVG renderer)
 *      - `comment`  : the review text. Light edits for length/clarity OK;
 *                    don't change the sentiment.
 *      - `version`  : the app version they reviewed against (also in the
 *                    Formspree payload as `app_version`). Helps frame
 *                    older reviews.
 *      - `date`     : ISO-8601 date string. Used for sort order.
 *   4. Commit + push. The page revalidates on next build.
 *
 * When the array is empty, the landing page renders three "Beta tester ·
 * open" placeholder cards instead. Don't delete entries to clear the wall;
 * keep history.
 */

export interface Review {
  /** Display name, or "Anonymous" if the reviewer left the field blank. */
  name: string
  /** 1-5. */
  rating: 1 | 2 | 3 | 4 | 5
  /** Review body. Markdown not supported — keep it plain prose. */
  comment: string
  /** App version reviewed against, e.g. "1.1.0". */
  version: string
  /** ISO-8601 date. Used to sort newest-first. */
  date: string
}

export const REVIEWS: Review[] = [
  // Append approved reviews here. The wall stays in "Reviews open at launch"
  // placeholder mode until at least one entry is present.
]

/** True when at least one review has been curated in. */
export function hasReviews(): boolean {
  return REVIEWS.length > 0
}

/** Reviews sorted newest first — what the landing page renders. */
export function recentReviews(limit = 6): Review[] {
  return [...REVIEWS]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, limit)
}
