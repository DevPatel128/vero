import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import type { SupportedLocale } from '@rie/shared';

import en from '../locales/en.json';

// Locale files — lazy loaded except English (default)
const localeImports: Record<string, () => Promise<any>> = {
  'zh-CN': () => import('../locales/zh-CN.json'),
  hi: () => import('../locales/hi.json'),
  es: () => import('../locales/es.json'),
  fr: () => import('../locales/fr.json'),
  ar: () => import('../locales/ar.json'),
  bn: () => import('../locales/bn.json'),
  'pt-BR': () => import('../locales/pt-BR.json'),
  ru: () => import('../locales/ru.json'),
  ja: () => import('../locales/ja.json'),
};

/**
 * Initialize i18next with RIE configuration
 * English is bundled, other locales lazy-loaded on demand
 */
export function initI18n(detectedLocale?: SupportedLocale) {
  return i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
      },
      lng: detectedLocale || 'en',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false, // React handles escaping
      },
      react: {
        useSuspense: true,
      },
    });
}

/**
 * Load a locale dynamically
 * Called when user changes language or on first load for non-English
 */
export async function loadLocale(locale: SupportedLocale): Promise<void> {
  if (locale === 'en') return; // Already bundled

  const loader = localeImports[locale];
  if (!loader) {
    console.warn(`Locale ${locale} not available, falling back to English`);
    return;
  }

  const translations = await loader();
  i18n.addResourceBundle(locale, 'translation', translations.default || translations, true, true);
  await i18n.changeLanguage(locale);
}

/**
 * Get the document direction for a locale
 */
export function getDirection(locale: SupportedLocale): 'ltr' | 'rtl' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

/**
 * Get the font family stack for a locale
 */
export function getFontFamily(locale: SupportedLocale): string {
  const fonts: Partial<Record<SupportedLocale, string>> = {
    'zh-CN': "'Noto Sans SC', 'Inter', sans-serif",
    ja: "'Noto Sans JP', 'Inter', sans-serif",
    hi: "'Noto Sans Devanagari', 'Inter', sans-serif",
    bn: "'Noto Sans Bengali', 'Inter', sans-serif",
    ar: "'Noto Sans Arabic', 'Inter', sans-serif",
  };
  return fonts[locale] || "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
}

export { i18n };
export { useTranslation } from 'react-i18next';
