import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /**
   * Permanent redirect for the pre-v1.6 app page slug. The folder under
   * app/apps/ was renamed from `voidsoul-assistant` to
   * `voidsoul-ai-companion` when the app rebranded. Without this
   * redirect, anyone with a bookmark to the old URL — or any inbound
   * link from a referrer, beta announcement, or social post — would
   * land on a 404.
   *
   * 301 (permanent) preserves SEO equity by signalling to search
   * engines that the canonical URL has moved, not gone away.
   */
  async redirects() {
    return [
      {
        source: '/apps/voidsoul-assistant',
        destination: '/apps/voidsoul-ai-companion',
        permanent: true
      }
    ];
  }
};

export default nextConfig;
