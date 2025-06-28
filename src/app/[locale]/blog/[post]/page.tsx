import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LanguageSwitcher } from "@/components/language-switcher"
import { getBlogPost, getAllBlogSlugs, formatDate } from "@/lib/blog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useTranslations } from "next-intl"
import { ArrowLeft, Calendar, User, Tag } from "lucide-react"
import ReactMarkdown from 'react-markdown'
import { mdxComponents } from "@/components/mdx-components"

interface BlogPostPageProps {
  params: Promise<{
    locale: string
    post: string
  }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, post } = await params
  const t = useTranslations('blog')
  const blogPost = getBlogPost(locale, post)

  if (!blogPost) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Back to blog button */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        <Link href={`/${locale}/blog`}>
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('backToBlog')}
          </Button>
        </Link>
      </div>

      {/* Article Header */}
      <article className="container mx-auto px-4 pb-16">
        <header className="mb-12">
          <div className="max-w-4xl mx-auto">
            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <time dateTime={blogPost.date}>
                  {formatDate(blogPost.date, locale)}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{blogPost.author}</span>
              </div>
              {blogPost.featured && (
                <Badge variant="secondary">{t('featuredBadge')}</Badge>
              )}
            </div>

            {/* Title and description */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {blogPost.title}
            </h1>
            
            {blogPost.description && (
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {blogPost.description}
              </p>
            )}

            {/* Tags */}
            {blogPost.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="h-4 w-4 text-muted-foreground" />
                {blogPost.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <ReactMarkdown components={mdxComponents}>
              {blogPost.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Article Footer */}
        <footer className="max-w-4xl mx-auto mt-16 pt-8 border-t">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-sm text-muted-foreground">
              {t('publishedBy')} <strong>{blogPost.author}</strong> {t('on')} {formatDate(blogPost.date, locale)}
            </div>
            <Link href={`/${locale}/blog`}>
              <Button variant="outline">
                {t('backToBlog')}
              </Button>
            </Link>
          </div>
        </footer>
      </article>

      <LanguageSwitcher />
      <Footer />
    </main>
  )
}

export async function generateStaticParams() {
  const allSlugs = getAllBlogSlugs()
  
  return allSlugs.map(({ locale, slug }) => ({
    locale,
    post: slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { locale, post } = await params
  const blogPost = getBlogPost(locale, post)
  
  if (!blogPost) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }
  
  return {
    title: blogPost.title,
    description: blogPost.description,
    authors: [{ name: blogPost.author }],
    keywords: blogPost.tags,
    openGraph: {
      title: blogPost.title,
      description: blogPost.description,
      type: 'article',
      publishedTime: blogPost.date,
      authors: [blogPost.author],
      tags: blogPost.tags,
    },
  }
}
