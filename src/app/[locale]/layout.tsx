import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/config';
import "../globals.css";

const Bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Cortano - AI Call Agents",
    template: "%s | Cortano"
  },
  description: "Deploy intelligent AI call agents for your business in minutes. Automate customer calls, lead qualification, and support with our no-code platform.",
  keywords: [
    "AI call agents",
    "automated calling",
    "customer service automation",
    "lead qualification",
    "business automation",
    "no-code platform",
    "AI voice agents",
    "call center automation",
    "conversational AI",
    "customer support AI"
  ],
  authors: [{ name: "Cortano" }],
  creator: "Cortano",
  publisher: "Cortano",
  metadataBase: new URL("https://cortano.com"), // Update with your actual domain
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "de-DE": "/de", 
      "es-ES": "/es",
      "pl-PL": "/pl"
    }
  },
  openGraph: {
    title: "Cortano - AI Call Agents",
    description: "Deploy intelligent AI call agents for your business in minutes. Automate customer calls, lead qualification, and support with our no-code platform.",
    url: "https://cortano.com", // Update with your actual domain
    siteName: "Cortano",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cortano - AI Call Agents",
    description: "Deploy intelligent AI call agents for your business in minutes. Automate customer calls, lead qualification, and support with our no-code platform.",
    creator: "@cortanodotapp", // Update with your actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "", // Add your Google Search Console verification code
    // yandex: "", // Add if needed
    // yahoo: "", // Add if needed
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  // JSON-LD structured data for better SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Cortano",
    "description": "Deploy intelligent AI call agents for your business in minutes. Automate customer calls, lead qualification, and support with our no-code platform.",
    "url": "https://cortano.com", // Update with your actual domain
    "logo": "https://cortano.com/logo.png", // Update with your actual logo URL
    "sameAs": [
      // Add your social media profiles
      // "https://twitter.com/cortano",
      // "https://linkedin.com/company/cortano",
      // "https://github.com/cortano"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["English", "German", "Spanish", "Polish"]
    },
    "serviceArea": {
      "@type": "Place",
      "name": "Worldwide"
    },
    "offers": {
      "@type": "Offer",
      "description": "AI Call Agent Services",
      "category": "Business Automation Software"
    }
  };
  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${Bricolage.className} antialiased dark`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
