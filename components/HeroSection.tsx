'use client';

import React, {
	useRef,
	useState,
	useEffect,
	useCallback,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
	RiArrowDownLine,
	RiArrowRightLine,
	RiMouseLine,
	RiArrowUpDoubleFill,
} from 'react-icons/ri';
import { FaCircleArrowRight } from 'react-icons/fa6';
import {
	Pacifico,
	Playfair_Display,
	Work_Sans,
} from 'next/font/google';

// Helper to check if it's a mobile view (Tailwind's 'md' breakpoint)
const isMobileView = () => {
	if (typeof window !== 'undefined') {
		return window.innerWidth <= 768;
	}
};

// Define content for each slide (without images, as they’re now in a separate carousel)
interface HeroSlide {
	id: string;
	title: string;
	subtitle: string;
	description: string;
	ctaText: string;
	ctaLink: string;
	textPosition: 'top-left' | 'center' | 'bottom-right'; // For creative placement
}

const heroSlides: HeroSlide[] = [
	{
		id: 'intro',
		title:
			'Shaping the Future Through Timeless Architecture',
		subtitle: '',
		description:
			'At Arc9 Consult, we merge creativity, technology, and precision to design spaces that inspire and endure. From residential masterpieces to commercial landmarks, our approach combines beauty with functionality.',
		ctaText: 'Explore Our Portfolio',
		ctaLink: '/projects',
		textPosition: 'top-left',
	},
	// {
	// 	id: 'architecture',
	// 	title: 'Architectural Design',
	// 	subtitle:
	// 		'Functional, Aesthetic Spaces Tailored to Your Vision',
	// 	description:
	// 		'Our architectural services bring your ideas to life with thoughtful design, contextual awareness, and innovative structures. Whether modern, minimalist, or Afro-contemporary, we shape buildings that resonate.',
	// 	ctaText: 'See Architectural Works',
	// 	ctaLink: '/services#architecture',
	// 	textPosition: 'center',
	// },
	// {
	// 	id: 'interior-design',
	// 	title: 'Interior Design',
	// 	subtitle:
	// 		'Sophisticated Interiors That Reflect Your Lifestyle',
	// 	description:
	// 		'We create bespoke interiors that balance elegance and comfort. Every space we design is a reflection of your taste, optimized for beauty, function, and emotional connection.',
	// 	ctaText: 'Browse Interior Designs',
	// 	ctaLink: '/services#interior-design',
	// 	textPosition: 'bottom-right',
	// },
	// {
	// 	id: 'project-management',
	// 	title: 'Project Management',
	// 	subtitle: 'Precision Planning & Seamless Execution',
	// 	description:
	// 		'From concept to completion, our project management ensures every milestone is delivered with clarity, quality, and control. We keep your vision intact while managing cost, time, and scope.',
	// 	ctaText: 'Our Management Approach',
	// 	ctaLink: '/services#project-management',
	// 	textPosition: 'top-left',
	// },
];

const pacifico = Pacifico({
	weight: '400',
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-pacifico',
});

const work_sans = Work_Sans({
	weight: '400',
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-worksans',
});

const playfair = Playfair_Display({
	weight: '400',
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-playfair',
});

// Background images for the carousel
const backgroundImages = [
	'/images/projects/landing2.png',
	'/images/projects/v2.png',
	'/images/projects/Living room 2.jpg',
	'/images/projects/GYM 3.png',
];

const HeroSection: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [activeSlide, setActiveSlide] = useState(0);
	const [activeImage, setActiveImage] = useState(0);
	const isAnimating = useRef(false);

	// --- Background Image Carousel ---
	useEffect(() => {
		const interval = setInterval(() => {
			setActiveImage(
				(prev) => (prev + 1) % backgroundImages.length,
			);
		}, 5000); // Change image every 5 seconds
		return () => clearInterval(interval);
	}, []);

	// --- Scroll Logic ---
	const scrollToSlide = useCallback((index: number) => {
		if (containerRef.current && !isAnimating.current) {
			isAnimating.current = true;
			const dimension = isMobileView()
				? containerRef.current.offsetHeight
				: containerRef.current.offsetWidth;
			const scrollProperty = isMobileView()
				? 'top'
				: 'left';

			containerRef.current.scrollTo({
				[scrollProperty]: index * dimension,
				behavior: 'smooth',
			});

			setTimeout(() => {
				setActiveSlide(index);
				isAnimating.current = false;
			}, 700);
		}
	}, []);

	// Handle wheel event for desktop (horizontal) and mobile (vertical)
	useEffect(() => {
		const handleWheel = (e: WheelEvent) => {
			if (!containerRef.current) return;

			const delta = e.deltaY;

			if (isMobileView()) {
				let targetSlide = activeSlide;
				if (
					delta > 0 &&
					activeSlide < heroSlides.length - 1
				) {
					targetSlide = activeSlide + 1;
					e.preventDefault();
					scrollToSlide(targetSlide);
				} else if (delta < 0 && activeSlide > 0) {
					targetSlide = activeSlide - 1;
					e.preventDefault();
					scrollToSlide(targetSlide);
				}
			} else {
				let targetSlide = activeSlide;
				if (
					delta > 0 &&
					activeSlide < heroSlides.length - 1
				) {
					targetSlide = activeSlide + 1;
					e.preventDefault();
					scrollToSlide(targetSlide);
				} else if (delta < 0 && activeSlide > 0) {
					targetSlide = activeSlide - 1;
					e.preventDefault();
					scrollToSlide(targetSlide);
				}
			}
		};

		const container = containerRef.current;
		if (container) {
			container.addEventListener('wheel', handleWheel, {
				passive: false,
			});
		}
		return () => {
			if (container) {
				container.removeEventListener('wheel', handleWheel);
			}
		};
	}, [activeSlide, scrollToSlide]);

	// Variants for text animations
	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { duration: 0.6, ease: 'easeOut' },
		},
	};

	return (
		<section className="relative w-full h-screen overflow-hidden">
			{/* Background Image Carousel */}
			<div className="absolute inset-0 z-0">
				<AnimatePresence>
					<motion.div
						key={activeImage}
						className="absolute inset-0"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 1, ease: 'easeInOut' }}
					>
						<Image
							src={backgroundImages[activeImage]}
							alt={`Background ${activeImage + 1}`}
							fill
							style={{
								objectFit: 'cover',
								objectPosition: 'center',
							}}
							priority={true}
						/>
						<div className="absolute inset-0 bg-black/50" />{' '}
						{/* Overlay for text readability */}
					</motion.div>
				</AnimatePresence>
			</div>

			<div
				ref={containerRef}
				className={`flex h-full w-full scroll-smooth ${
					isMobileView()
						? 'flex-col overflow-y-hidden snap-y'
						: 'flex-row overflow-x-hidden snap-x'
				} snap-mandatory`}
			>
				{heroSlides.map((slide, index) => (
					<div
						key={slide.id}
						id={`hero-slide-${slide.id}`}
						className={`flex-shrink-0 relative snap-center flex pt-[10rem] md:pt-[5rem] justify-start px-6 pb-6 md:px-0 text-left ${
							isMobileView()
								? 'w-full h-screen'
								: 'w-screen h-full'
						}`}
					>
						{/* Content with Creative Text Placement */}
						<motion.div
							className={`relative z-20 text-white flex flex-col items-start max-w-6xl ${
								slide.textPosition === 'top-left'
									? 'lg:pl-14 lg:pt-20'
									: slide.textPosition === 'center'
									? 'lg:mx-auto lg:my-auto text-center items-center'
									: 'lg:pr-20 lg:pb-20 lg:ml-auto'
							}`}
							initial="hidden"
							animate={
								activeSlide === index ? 'visible' : 'hidden'
							}
							variants={{
								hidden: {
									opacity: 0,
									transition: {
										staggerChildren: 0.05,
										staggerDirection: -1,
									},
								},
								visible: {
									opacity: 1,
									transition: {
										staggerChildren: 0.15,
										delayChildren: 0.2,
									},
								},
							}}
						>
							<motion.div className="w-[100%] md:w-[60%]">
								<motion.p
									className={`mb-14 md:mb-[3.5rem] text-base  sm:text-lg lg:text-xl font-body max-w-2xl drop-shadow-lg ${work_sans.className}`}
									// variants={itemVariants}
								>
									Innovating architectural solutions,
									crafting bespoke interiors, and expertly
									managing projects for sustainable success.
								</motion.p>
							</motion.div>
							<motion.h1
								className={`text-6xl w-full lg:pl-[10rem] sm:text-7xl lg:text-[6.5rem] font-bold leading-tight drop-shadow-lg ${playfair.className} `}
							>
								Designing the future...
							</motion.h1>

							<motion.div
								// variants={itemVariants}
								className="mt-8 lg:ml-[10rem]"
							>
								<Link href={slide.ctaLink} passHref>
									<motion.button
										className="bg-white/10 backdrop-blur-md border cursor-pointer border-white/20 text-white/90 hover:bg-white/20 px-6 py-3 rounded-full text-lg font-body flex items-center gap-2 transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-white/30"
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										{slide.ctaText}
										<FaCircleArrowRight size={24} />
									</motion.button>
								</Link>
							</motion.div>
						</motion.div>

						{activeSlide === heroSlides.length - 1 && (
							<motion.div
								className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center text-white z-30 opacity-70"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 0.7, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.5, delay: 1 }}
							>
								<RiArrowDownLine className="text-4xl md:text-5xl animate-bounce" />
								<span className="mt-2 text-sm md:text-base font-body">
									Learn more about us
								</span>
							</motion.div>
						)}
					</div>
				))}
			</div>
			<motion.div className="absolute bottom-44 md:bottom-20 w-[50%] md:w-[25%] right-0 md:right-10 z-20">
				<motion.p
					className="mt-4 text-base sm:text-lg text-white text-left lg:text-xl font-body max-w-2xl drop-shadow-lg"
					// variants={itemVariants}
				>
					<span className="font-bold text-[1.3rem] sm:text-[1.3rem] lg:text-[1.45rem]">
						Beyond Blueprints
					</span>{' '}
					<br />
					Our approach combines beauty with functionality.
				</motion.p>
			</motion.div>

			{/* Navigation Dots for Hero Slides */}
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
				{heroSlides.map((_, index) => (
					<button
						key={index}
						className={`w-3 h-3 rounded-full transition-all duration-300 ${
							activeSlide === index
								? 'bg-white w-5'
								: 'bg-white/50'
						}`}
						onClick={() => scrollToSlide(index)}
						aria-label={`Go to hero slide ${index + 1}`}
					/>
				))}
			</div>
		</section>
	);
};

export default HeroSection;
