/**
 * Download config for VoidSoul Assistant — the Electron app lives in the
 * sibling SoulVoidAI repo and ships builds via GitHub Releases.
 *
 * URLs use GitHub's `/releases/latest/download/<filename>` redirect, which
 * always points at the latest published release's asset with that exact
 * filename. As long as electron-builder is configured to emit stable
 * artifact names on every release, the site never needs an update.
 *
 * To flip the site from "Soon" to live downloads:
 *   1. Publish the first GitHub Release on Dev-Kyron/SoulVoidAI with the
 *      three asset filenames below attached.
 *   2. Set `enabled: true` here.
 *   3. Bump `version` for display ("v1.0.0 · 78MB" etc.) — purely cosmetic.
 *
 * The artifact filenames must match `artifactName` in electron-builder's
 * `build` config, e.g.:
 *   "win":   { "artifactName": "VoidSoul-Assistant-Setup.exe" }
 *   "mac":   { "artifactName": "VoidSoul-Assistant.dmg" }
 *   "linux": { "artifactName": "VoidSoul-Assistant.AppImage" }
 */

export type Platform = 'windows' | 'macos' | 'linux';

export const DOWNLOAD_CONFIG = {
  /** Flip to true once the first release ships on GitHub. */
  enabled: true,
  /** Cosmetic — shown next to the download button. */
  version: 'v1.3.5',
  releasesPage: 'https://github.com/Dev-Kyron/SoulVoidAI/releases',
  baseUrl: 'https://github.com/Dev-Kyron/SoulVoidAI/releases/latest/download',
  assets: {
    windows: 'VoidSoul-Assistant-Setup.exe',
    macos: 'VoidSoul-Assistant.dmg',
    linux: 'VoidSoul-Assistant.AppImage',
  } satisfies Record<Platform, string>,
} as const;

export const PLATFORM_LABEL: Record<Platform, string> = {
  windows: 'Windows',
  macos: 'macOS',
  linux: 'Linux',
};

export function getDownloadUrl(platform: Platform): string {
  return `${DOWNLOAD_CONFIG.baseUrl}/${DOWNLOAD_CONFIG.assets[platform]}`;
}

/**
 * Best-effort UA sniff. Runs only on the client; returns null during SSR
 * and for unknown UAs so callers can render a neutral fallback (e.g. the
 * releases page) until hydration resolves the platform.
 */
export function detectPlatform(): Platform | null {
  if (typeof navigator === 'undefined') return null;
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('win')) return 'windows';
  if (ua.includes('mac')) return 'macos';
  if (ua.includes('linux') || ua.includes('x11')) return 'linux';
  return null;
}
