import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LanguageSwitcher } from "@/components/language-switcher"
import { getLegalDocument, formatLegalDate } from "@/lib/legal"
import { Button } from "@/components/ui/button"
import { Alert } from "@/components/ui/alert"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { ArrowLeft, Calendar, FileText, Shield } from "lucide-react"
import ReactMarkdown from 'react-markdown'
import { mdxComponents } from "@/components/mdx-components"

interface LegalPageProps {
  params: Promise<{
    locale: string
    document?: string[]
  }>
}

export default async function LegalPage({ params }: LegalPageProps) {
  const { locale, document } = await params
  const t = await getTranslations('legal')
  
  // Default to privacy if no specific document is requested
  // Handle array from catch-all routes
  let documentSlug: string = 'privacy'
  if (Array.isArray(document) && document.length > 0) {
    documentSlug = document[0]
  } else if (typeof document === 'string') {
    documentSlug = document
  }
  
  const legalDoc = getLegalDocument(documentSlug)

  if (!legalDoc) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Back navigation */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        <Link href={`/${locale}`}>
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('backToHome')}
          </Button>
        </Link>
      </div>

      {/* Document Header */}
      <article className="container mx-auto px-4 pb-16">
        <header className="mb-12">
          <div className="max-w-4xl mx-auto">

            {/* Language Alert for non-English locales */}
            {locale !== 'en' && (
              <div className="mb-8">
                <Alert variant="warning">
                  <div className="font-medium">
                    {t('englishOnlyAlert')}
                  </div>
                </Alert>
              </div>
            )}

            {/* Document metadata */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{t('lastUpdated')}: {formatLegalDate(legalDoc.lastUpdated)}</span>
              </div>
            </div>

            {/* Document title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {legalDoc.title}
            </h1>
            
            <div className="prose prose-gray dark:prose-invert max-w-none mb-8">
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t('documentIntro')}
              </p>
            </div>
          </div>
        </header>

        {/* Document Content */}
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <ReactMarkdown components={mdxComponents}>
              {legalDoc.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Document Footer */}
        <footer className="max-w-4xl mx-auto mt-16 pt-8 border-t">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-sm text-muted-foreground">
              {t('lastUpdated')}: <strong>{formatLegalDate(legalDoc.lastUpdated)}</strong>
            </div>
            <div className="flex gap-2">
              <Link href={`/${locale}/legal/privacy`}>
                <Button variant="outline" size="sm">
                  {t('privacyPolicy')}
                </Button>
              </Link>
              <Link href={`/${locale}/legal/terms`}>
                <Button variant="outline" size="sm">
                  {t('termsOfService')}
                </Button>
              </Link>
            </div>
          </div>
        </footer>
      </article>

      <LanguageSwitcher />
      <Footer />
    </main>
  )
}

export async function generateMetadata({ params }: LegalPageProps) {
  const { document } = await params
  
  // Handle array from catch-all routes
  let documentSlug: string = 'privacy'
  if (Array.isArray(document) && document.length > 0) {
    documentSlug = document[0]
  } else if (typeof document === 'string') {
    documentSlug = document
  }
  
  const legalDoc = getLegalDocument(documentSlug)
  
  if (!legalDoc) {
    return {
      title: 'Legal Document Not Found',
      description: 'The requested legal document could not be found.',
    }
  }
  
  return {
    title: `${legalDoc.title} - Cortano`,
    description: `Read our ${legalDoc.title.toLowerCase()} to understand how we handle your data and what rights you have.`,
    openGraph: {
      title: `${legalDoc.title} - Cortano`,
      description: `Read our ${legalDoc.title.toLowerCase()} to understand how we handle your data and what rights you have.`,
      type: 'article',
    },
  }
}
