'use client';

import { useEffect } from 'react';
import { sendGAEvent } from '@next/third-parties/google';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function getEnclosingSection(element: Element): string {
  const container = element.closest('section, header, nav, footer, .mobile-menu, .floating-contact-buttons');
  if (!container) return 'unknown';
  if (container.id) return container.id;
  if (container.classList.contains('mobile-menu')) return 'mobile-menu';
  if (container.classList.contains('floating-contact-buttons')) return 'floating-bar';
  if (container.classList.contains('hero-section-bg')) return 'hero';
  const ariaLabel = container.getAttribute('aria-label');
  if (ariaLabel) return ariaLabel;
  return container.tagName.toLowerCase();
}

function sendTrackedEvent(eventName: string, params: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  } else {
    sendGAEvent('event', eventName, params);
  }
}

export function AnalyticsEvents() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const element = target.closest('a, button');
      if (!element) return;

      const href = element.getAttribute('href') || (element as HTMLAnchorElement).href || '';
      const text = (element.textContent || '').trim().replace(/\s+/g, ' ');

      // 1. Phone link click
      if (href.startsWith('tel:')) {
        sendTrackedEvent('phone_click', { link_url: href });
        return;
      }

      // 2. WhatsApp click
      if (href.includes('wa.me') || href.includes('whatsapp')) {
        sendTrackedEvent('whatsapp_click', { link_url: href });
        return;
      }

      // 3. Book action click
      if (/book/i.test(text)) {
        const section = getEnclosingSection(element);
        sendTrackedEvent('book_click', {
          link_text: text,
          section,
        });
        return;
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, []);

  return null;
}
