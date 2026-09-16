import { useEffect } from 'react';
import { absoluteUrl, config } from './config';
import { event, site } from '@/data/site';

/**
 * Per-route document head management.
 *
 * The HTML shell already carries a complete static Open Graph block — crawlers
 * such as WhatsApp's do not execute JavaScript, and the shared link points at
 * the landing page, so the preview is always correct. This hook keeps the head
 * in sync for the two internal routes and for crawlers that do render.
 */
export interface SeoInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  jsonLd?: Record<string, unknown>;
  noIndex?: boolean;
}

const DEFAULT_OG_IMAGE = '/media/og-pulmo-mentor-pft.png';
const JSON_LD_ID = 'route-json-ld';

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function useSeo({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  jsonLd,
  noIndex = false,
}: SeoInput): void {
  useEffect(() => {
    const fullTitle = title.includes(site.hospital)
      ? title
      : `${title} | ${site.hospital}, ${site.centre}`;
    const url = absoluteUrl(path);
    const imageUrl = image.startsWith('http') ? image : absoluteUrl(image);

    document.title = fullTitle;

    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta(
      'meta[name="robots"]',
      'name',
      'robots',
      noIndex || !config.indexable ? 'noindex, follow' : 'index, follow, max-image-preview:large',
    );

    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);
    setMeta('meta[property="og:type"]', 'property', 'og:type', type);
    setMeta('meta[property="og:image"]', 'property', 'og:image', imageUrl);
    setMeta('meta[property="og:image:secure_url"]', 'property', 'og:image:secure_url', imageUrl);

    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl);

    setLink('canonical', url);

    document.getElementById(JSON_LD_ID)?.remove();
    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = JSON_LD_ID;
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      document.getElementById(JSON_LD_ID)?.remove();
    };
  }, [title, description, path, image, type, jsonLd, noIndex]);
}

/** WhatsApp share URL — always points at the landing page. */
export const whatsappShareUrl = (): string => {
  const message = `Recorded sessions from the ${event.name}, ${event.date} at ${event.venueShort}: ${absoluteUrl('/')}`;
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
};
