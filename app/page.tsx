// src/app/page.tsx
import AboutSection from '@/components/AboutSection';
import BlogSection from '@/components/BlogSection';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import QuoteSection from '@/components/QuoteSection';
import ServicesSection from '@/components/ServicesSection';

export default function Home() {
	return (
		<>
			{/* Hero Section is the full-screen, scroll-driven slider */}
			<HeroSection />
			<AboutSection />
			<QuoteSection />
			<ServicesSection />
			<ProjectsSection />
			<BlogSection />
		</>
	);
}
