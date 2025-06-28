import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: {
    default: "Cortano - Background Agents & MCP Builder",
    template: "%s | Cortano"
  },
  description: "Deploy intelligent background agents for your business in minutes. Automate event processing, build custom MCP protocols, and create seamless integrations with our no-code platform.",
  keywords: [
    "background agents",
    "event automation",
    "MCP builder",
    "Model Context Protocol",
    "API integration",
    "webhook automation",
    "business process automation",
    "no-code platform",
    "event-driven automation",
    "custom protocols",
    "background processing",
    "integration orchestration"
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
    title: "Cortano - Background Agents & MCP Builder",
    description: "Deploy intelligent background agents for your business in minutes. Automate event processing, build custom MCP protocols, and create seamless integrations with our no-code platform.",
    url: "https://cortano.com", // Update with your actual domain
    siteName: "Cortano",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cortano - Background Agents & MCP Builder",
    description: "Deploy intelligent background agents for your business in minutes. Automate event processing, build custom MCP protocols, and create seamless integrations with our no-code platform.",
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
    "description": "Deploy intelligent background agents for your business in minutes. Automate event processing, build custom MCP protocols, and create seamless integrations with our no-code platform.",
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
      "description": "Background Agent & MCP Builder Services",
      "category": "Business Process Automation Software"
    }
  };
  return (
    <html lang={(await params).locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${Bricolage.className} antialiased dark`}>
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
