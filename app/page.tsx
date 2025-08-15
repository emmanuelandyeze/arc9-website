// src/app/page.tsx

import AboutSection from '@/components/AboutSection';
import BlogSection from '@/components/BlogSection';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import QuoteSection from '@/components/QuoteSection';
import ServicesSection from '@/components/ServicesSection';

import { BsWhatsapp } from 'react-icons/bs'; 

const WhatsAppButton = () => {
	const whatsappNumber = '2348102751710';
	const message = encodeURIComponent(
		"Hello! I'd like to chat about your business services.",
	);

	return (
		<>
			<style>
				{`
                @keyframes whatsappPulse {
                    0% {
                        transform: scale(1);
                        box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
                    }
                    70% {
                        transform: scale(1.05);
                        box-shadow: 0 0 0 15px rgba(37, 211, 102, 0);
                    }
                    100% {
                        transform: scale(1);
                        box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
                    }
                }
                .animate-whatsapp-pulse {
                    animation: whatsappPulse 2s infinite cubic-bezier(0.66, 0, 0, 1);
                }
                `}
			</style>
			<a
				href={`https://wa.me/${whatsappNumber}?text=${message}`}
				target="_blank"
				rel="noopener noreferrer"
				// Tailwind CSS classes for styling and positioning
				className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white
                           p-4 rounded-full shadow-xl flex items-center justify-center
                           transition-all duration-300 transform hover:scale-110
                           animate-whatsapp-pulse z-50 cursor-pointer
                           focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-75"
				aria-label="Chat with us on WhatsApp"
				title="Chat with us on WhatsApp"
			>
				<BsWhatsapp size={32} />
			</a>
		</>
	);
};

export default function Home() {
	return (
		<>
			{/* Hero Section: Full-screen, scroll-driven slider */}
			<HeroSection />
			<AboutSection />
			<QuoteSection />
			<ServicesSection />
			<ProjectsSection />
			<BlogSection />

			{/* The animated WhatsApp Button, fixed at the bottom right of the screen */}
			<WhatsAppButton />
		</>
	);
}
