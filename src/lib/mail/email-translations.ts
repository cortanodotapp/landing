import { generateLocalizedSteps, generateLocalizedLinks } from './template/signup';

// Import translation files  
const enMessages = require('@/messages/en.json');
const deMessages = require('@/messages/de.json');
const esMessages = require('@/messages/es.json');
const plMessages = require('@/messages/pl.json');

const messages = {
  en: enMessages,
  de: deMessages,
  es: esMessages,
  pl: plMessages,
} as const;

export type SupportedLocale = keyof typeof messages;

export function getEmailTranslations(locale: SupportedLocale = 'en') {
  const localeMessages = messages[locale] || messages.en;
  const emailTranslations = localeMessages.welcomeEmail;

  return {
    translations: emailTranslations,
    steps: generateLocalizedSteps(emailTranslations),
    links: generateLocalizedLinks(emailTranslations),
    locale,
  };
}

export function getSupportedLocales(): SupportedLocale[] {
  return Object.keys(messages) as SupportedLocale[];
}
