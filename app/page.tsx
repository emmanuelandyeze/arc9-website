// src/app/page.tsx
import HeroSection from '@/components/HeroSection';

export default function Home() {
	return (
		<>
			{/* Hero Section is the full-screen, scroll-driven slider */}
			<HeroSection />

			{/* Content that appears ONLY after scrolling past the Hero Section's last slide */}
			{/* This section now takes up 100vh of the screen */}
			<section className="bg-neutral-100 py-20 text-center w-full min-h-screen flex flex-col items-center justify-center">
				<div className="max-w-3xl mx-auto">
					<h2 className="text-4xl font-heading text-neutral-800 mb-6">
						Our Vision Beyond Services
					</h2>
					<p className="text-lg text-neutral-600 font-body">
						Welcome to the rest of our exciting homepage
						content! This section will become visible only
						after you've explored all our core offerings in
						the interactive hero section. We'll add featured
						projects, about us snippets, blog previews, and
						more here.
					</p>
					<div className="mt-10 h-[30vh] bg-neutral-200 flex items-center justify-center text-neutral-500">
						<p>More detailed sections will follow...</p>
					</div>
				</div>
			</section>

			{/* Example of another section that will scroll normally */}
			<section className="bg-neutral-50 py-20 px-4 sm:px-6 lg:px-8 text-center min-h-screen flex items-center justify-center">
				<h3 className="text-3xl font-heading text-neutral-700">
					Ready to start your project?
				</h3>
				{/* Placeholder for contact CTA */}
			</section>
		</>
	);
}
