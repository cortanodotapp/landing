import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { CookieConsent } from '@/components/cookie-consent';
import "./globals.css";

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
    default: "Cortano",
    template: "%s | Cortano"
  },
  description: "See what we're building here, at cortano",
  authors: [{ name: "Cortano" }],
  creator: "Cortano",
  publisher: "Cortano",
  metadataBase: new URL("https://cortano.app"), // Update with your actual domain
  openGraph: {
    title: "Cortano",
    description: "See what we're building here, at cortano",
    url: "https://cortano.app", // Update with your actual domain
    siteName: "Cortano",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cortano",
    description: "See what we're building here, at cortano",
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

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // JSON-LD structured data for better SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Cortano",
    "description": "See what we're building here, at cortano",
    "url": "https://cortano.app", // Update with your actual domain
    "logo": "https://upload.cortano.app/logos/logo.svg", // Update with your actual logo URL
    "sameAs": [
      "https://twitter.com/cortanodotapp",
      "https://github.com/cortanodotapp"
    ],
    "serviceArea": {
      "@type": "Place",
      "name": "Worldwide"
    },
  };
  return (
    <html className="overflow-x-hidden">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${Bricolage.className} antialiased dark overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
