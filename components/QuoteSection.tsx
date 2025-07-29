'use client';
import { Quote } from 'lucide-react';
import {
	Playfair_Display,
	Work_Sans,
} from 'next/font/google';
import { useEffect, useState } from 'react';

const playfair = Playfair_Display({
	weight: ['400', '700'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-playfair',
});

const work_sans = Work_Sans({
	weight: '400',
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-worksans',
});

const QuoteSection = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const element =
				document.getElementById('quote-section');
			if (element) {
				const rect = element.getBoundingClientRect();
				// Check if the top of the element is within the viewport
				if (
					rect.top < window.innerHeight &&
					rect.bottom >= 0
				) {
					setIsVisible(true);
				}
			}
		};

		window.addEventListener('scroll', handleScroll);
		// Initial check in case the component is already in view
		handleScroll();

		return () =>
			window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<section
			id="quote-section"
			className={`relative py-18 md:py-32 px-4 sm:px-6 lg:px-8 bg-gray-100 text-gray-900 overflow-hidden
                 transition-opacity duration-1000 ${
										isVisible
											? 'opacity-100 translate-y-0'
											: 'opacity-0 translate-y-10'
									}`}
		>
			<div className="max-w-4xl mx-auto text-center relative z-10">
				{/* Large faded quote icon in the background */}
				<Quote
					className="absolute inset-0 w-full h-full text-[#9c100e86] opacity-20 -z-0 pointer-events-none transform scale-150 rotate-3"
					style={{
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%) rotate(3deg)',
						fontSize: '20rem',
					}}
				/>
				<p
					className={`text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight italic text-gray-800 relative z-10 ${work_sans.className}`}
				>
					"Architecture is the will of an epoch translated
					into space."
				</p>
				<p className="mt-8 text-xl md:text-2xl font-semibold text-[#9C110E] relative z-10">
					— Ludwig Mies van der Rohe
				</p>
			</div>
		</section>
	);
};

export default QuoteSection;
