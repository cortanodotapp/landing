import { CortanoWelcomeEmail } from './template/signup';
import { getEmailTranslations } from './email-translations';

// Example usage: Generate localized email for different languages

export function generateWelcomeEmail(locale: 'en' | 'de' | 'es' | 'pl' = 'en') {
  const { translations, steps, links } = getEmailTranslations(locale);
  
  return CortanoWelcomeEmail({
    steps,
    links,
    locale,
    translations,
  });
}

// Example: Generate English email
// const englishEmail = generateWelcomeEmail('en');

// Example: Generate German email  
// const germanEmail = generateWelcomeEmail('de');

// Example: Generate Spanish email
// const spanishEmail = generateWelcomeEmail('es');

// Example: Generate Polish email
// const polishEmail = generateWelcomeEmail('pl');
