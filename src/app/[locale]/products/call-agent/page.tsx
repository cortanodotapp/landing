import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LanguageSwitcher } from "@/components/language-switcher"
import { CallAgentHero } from "@/components/products/call-agent-hero"
import { CallAgentBento } from "@/components/products/call-agent-bento"
import { CallAgentCTA } from "@/components/products/call-agent-cta"

export default function CallAgentProductPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <CallAgentHero />
      <CallAgentBento />
      <CallAgentCTA />
      <LanguageSwitcher />
      <Footer />
    </main>
  )
}
