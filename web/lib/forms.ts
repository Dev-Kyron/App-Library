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
  earliestAdoptersEndpoint: 'https://formspree.io/f/xjgzwypy',
} as const;

/**
 * Launch-giveaway counter.
 *
 * Bump `claimed` by 1 each time a Formspree notification email lands in
 * your inbox, commit, push. Vercel redeploys in ~30s and the pricing
 * card reflects the new state.
 *
 * When `claimed === total`:
 *   - Earliest-Adopters card swaps to a "sealed" celebration state.
 *   - Founder's card unlocks its own email-capture for paid waitlist.
 *
 * Formspree free tier doesn't expose submission counts via API, so this
 * stays manual. With only 3 spots total, that's fine — by the time you'd
 * notice latency, you've already hit the cap.
 */
export const LAUNCH: { claimed: number; total: number } = {
  claimed: 0,
  total: 3,
};

export const isFirst3Open = (): boolean => LAUNCH.claimed < LAUNCH.total;

/** True once a real Formspree URL has been pasted in. */
export function isFormReady(endpoint: string): boolean {
  return endpoint.startsWith('https://formspree.io/f/');
}
