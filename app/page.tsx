import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { PainPoints } from "@/components/pain-points"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { FinalCTA } from "@/components/final-cta"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <PainPoints />
        <Features />
        <HowItWorks />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
