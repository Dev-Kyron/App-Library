/**
 * Form endpoints for the site.
 *
 * Currently just the Earliest-Adopters launch-notify list. Uses
 * Formspree as a no-backend POST sink — emails are stored in the
 * Formspree dashboard until launch, then archived (which deletes
 * every submission permanently).
 *
 * --------------------------- SETUP --------------------------------
 * 1. Sign up: https://formspree.io  (free tier = 50 submissions/month,
 *    plenty for a launch list — we expect <30).
 * 2. Create a new form → Name it "VoidSoul launch list" → set the
 *    notification email to your inbox.
 * 3. Copy the form endpoint URL — it looks like
 *      https://formspree.io/f/xyzabc123
 * 4. Paste it into `earliestAdoptersEndpoint` below.
 * 5. Commit + push. The form goes live.
 *
 * --------------------------- TEARDOWN ------------------------------
 * Once v1.0 ships and the launch email has been sent:
 *   1. Log into Formspree.
 *   2. Open the form → Submissions → "Delete all" (one-click).
 *   3. (Optional) Archive the form entirely.
 * Every email address is wiped from Formspree's storage.
 * ------------------------------------------------------------------
 */

export const FORMS = {
  /** Founder's-tier waitlist for paid-launch notification. */
  earliestAdoptersEndpoint: 'https://formspree.io/f/xjgzwypy',
  /**
   * In-app review submissions. The endpoint itself is configured in the
   * Electron app at `src/renderer/src/lib/reviews.ts` — the site doesn't
   * POST here, it only reads from `web/lib/reviews.ts` (the curated array).
   * Listed for discoverability so anyone auditing the form config sees the
   * full picture.
   */
  reviewsEndpoint: 'https://formspree.io/f/xlgvnlaa',
} as const;

/** True once a real Formspree URL has been pasted in. */
export function isFormReady(endpoint: string): boolean {
  return endpoint.startsWith('https://formspree.io/f/');
}
