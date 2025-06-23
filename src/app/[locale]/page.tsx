import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Footer } from "@/components/footer"
import SimplePricing from "@/components/mvpblocks/simple-pricing"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <SimplePricing />
      <LanguageSwitcher />
      <Footer />
    </main>
  )
}
