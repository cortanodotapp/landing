import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/config';
import { PostHogProvider } from '@/components/providers/posthog-provider';
import { CookieConsent } from '@/components/cookie-consent';
import "../globals.css";

const Bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

export const viewport : Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  themeColor: "#66C72E"
}

export const metadata: Metadata = {
  title: {
    default: "Cortano - AI Call Agents for Business",
    template: "%s | Cortano"
  },
  description: "Deploy intelligent AI call agents for your business in minutes. Handle customer calls, book appointments, qualify leads, and provide 24/7 phone support with our no-code platform.",
  keywords: [
    "AI call agents",
    "AI phone support",
    "automated customer service",
    "AI receptionist",
    "call handling automation",
    "AI phone assistant",
    "business phone automation",
    "AI customer support",
    "automated appointment booking",
    "lead qualification calls",
    "AI voice agents",
    "intelligent call routing",
    "24/7 phone support",
    "conversational AI",
    "AI call center",
    "voice AI technology"
  ],
  authors: [{ name: "Cortano" }],
  creator: "Cortano",
  publisher: "Cortano",
  metadataBase: new URL("https://cortano.app"), // Update with your actual domain
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
    title: "Cortano - AI Call Agents for Business",
    description: "Deploy intelligent AI call agents for your business in minutes. Handle customer calls, book appointments, qualify leads, and provide 24/7 phone support with our no-code platform.",
    url: "https://cortano.app", // Update with your actual domain
    siteName: "Cortano",
    locale: "en_US",
    type: "website",
    images: [
      "https://upload.cortano.app/banners/main.png"
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Cortano - AI Call Agents for Business",
    description: "Deploy intelligent AI call agents for your business in minutes. Handle customer calls, book appointments, qualify leads, and provide 24/7 phone support with our no-code platform.",
    creator: "@cortanodotapp", // Update with your actual Twitter handle
    images: [
      "https://upload.cortano.app/banners/main.png"
    ]
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
  params
}: {
  children: React.ReactNode;
  params : Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  if (!locales.includes((await params).locale as any)) {
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
    "description": "Deploy intelligent AI call agents for your business in minutes. Handle customer calls, book appointments, qualify leads, and provide 24/7 phone support with our no-code platform.",
    "url": "https://cortano.app", // Update with your actual domain
    "logo": "https://upload.cortano.app/logos/logo.svg", // Update with your actual logo URL
    "sameAs": [
      "https://twitter.com/cortanodotapp",
      "https://github.com/cortanodotapp"
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
      "description": "AI Call Agent Services & Phone Automation Solutions",
      "category": "Artificial Intelligence Software"
    }
  };
  return (
    <html lang={(await params).locale} className="overflow-x-hidden">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${Bricolage.className} antialiased dark overflow-x-hidden`}>
        <NextIntlClientProvider messages={messages}>
          <PostHogProvider>
            {children}
            <CookieConsent />
          </PostHogProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
