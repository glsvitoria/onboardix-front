import { Footer } from '@/components/footer'
import { Features } from './_components/features'
import { FinalCTA } from './_components/final-cta'
import { Header } from './_components/header'
import { Hero } from './_components/hero'
import { PainPoints } from './_components/pain-points'

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
