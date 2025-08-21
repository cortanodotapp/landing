import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LanguageSwitcher } from "@/components/language-switcher"
import { getTranslations } from "next-intl/server"

interface HiringPageProps {
	params: Promise<{ locale: string }>
}

export default async function HiringPage({ params }: HiringPageProps) {
	const { locale } = await params
	const t = await getTranslations('hiring')

		return (
			<main className="min-h-screen flex flex-col bg-background">
				<Navbar />

				<section className="container mx-auto px-4 pt-24 pb-12 flex-grow flex items-center justify-center">
					<div className="max-w-3xl mx-auto text-center">
						<h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
						<p className="text-lg text-muted-foreground mb-8">{t('description')}</p>

						<div className="rounded-xl border border-white/5 bg-muted/5 p-8">
							<h2 className="text-xl font-semibold mb-2">{t('noOffersTitle') ?? 'No open roles'}</h2>
							<p className="text-sm text-muted-foreground">{t('noOffersDescription') ?? 'We are not hiring right now — please check back later.'}</p>
						</div>
					</div>
				</section>

				<LanguageSwitcher />
				<Footer />
			</main>
		)
}