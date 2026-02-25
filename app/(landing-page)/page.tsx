import { Footer } from '@/components/footer'
import { Features } from './components/features'
import { FinalCTA } from './components/final-cta'
import { Header } from './components/header'
import { Hero } from './components/hero'
import { PainPoints } from './components/pain-points'

export default function Page() {
	return (
		<div className="min-h-screen bg-background text-foreground">
			<Header />
			<main>
				<Hero />
				<PainPoints />
				<Features />
				{/* <SocialProof /> */}
				<FinalCTA />
			</main>
			<Footer />
		</div>
	)
}
