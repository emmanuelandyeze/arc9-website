// src/app/page.tsx
import AboutSection from '@/components/AboutSection';
import HeroSection from '@/components/HeroSection';

export default function Home() {
	return (
		<>
			{/* Hero Section is the full-screen, scroll-driven slider */}
			<HeroSection />
			<AboutSection />

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
