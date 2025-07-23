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

// Helper to check if it's a mobile view (Tailwind's 'md' breakpoint)
const isMobileView = () => window.innerWidth < 768;

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

// Background images for the carousel
const backgroundImages = [
	'/images/projects/GA 3.png',
	'/images/projects/v2.png',
	'/images/projects/Living room 2.jpg',
	'/images/projects/2.png',
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

	// Handle touch events for mobile swiping
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		let touchStartX = 0;
		let touchStartY = 0;
		let touchEndX = 0;
		let touchEndY = 0;

		const handleTouchStart = (e: TouchEvent) => {
			touchStartX = e.touches[0].clientX;
			touchStartY = e.touches[0].clientY;
		};

		const handleTouchMove = (e: TouchEvent) => {
			touchEndX = e.touches[0].clientX;
			touchEndY = e.touches[0].clientY;

			const deltaX = touchEndX - touchStartX;
			const deltaY = touchEndY - touchStartY;

			if (e.cancelable) {
				if (isMobileView()) {
					if (
						Math.abs(deltaY) > Math.abs(deltaX) &&
						Math.abs(deltaY) > 10
					) {
						e.preventDefault();
					}
				} else {
					if (
						Math.abs(deltaX) > Math.abs(deltaY) &&
						Math.abs(deltaX) > 10
					) {
						e.preventDefault();
					}
				}
			}
		};

		const handleTouchEnd = () => {
			if (isAnimating.current) return;

			const swipeThreshold = 50;

			if (isMobileView()) {
				if (
					touchStartY - touchEndY > swipeThreshold &&
					activeSlide < heroSlides.length - 1
				) {
					scrollToSlide(activeSlide + 1);
				} else if (
					touchEndY - touchStartY > swipeThreshold &&
					activeSlide > 0
				) {
					scrollToSlide(activeSlide - 1);
				}
			} else {
				if (
					touchStartX - touchEndX > swipeThreshold &&
					activeSlide < heroSlides.length - 1
				) {
					scrollToSlide(activeSlide + 1);
				} else if (
					touchEndX - touchStartX > swipeThreshold &&
					activeSlide > 0
				) {
					scrollToSlide(activeSlide - 1);
				}
			}
			touchStartX = 0;
			touchStartY = 0;
			touchEndX = 0;
			touchEndY = 0;
		};

		container.addEventListener(
			'touchstart',
			handleTouchStart,
			{ passive: true },
		);
		container.addEventListener(
			'touchmove',
			handleTouchMove,
			{ passive: false },
		);
		container.addEventListener('touchend', handleTouchEnd);

		return () => {
			container.removeEventListener(
				'touchstart',
				handleTouchStart,
			);
			container.removeEventListener(
				'touchmove',
				handleTouchMove,
			);
			container.removeEventListener(
				'touchend',
				handleTouchEnd,
			);
		};
	}, [activeSlide, scrollToSlide]);

	// Update active slide based on native scroll
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		let scrollTimeout: NodeJS.Timeout;
		const onScroll = () => {
			clearTimeout(scrollTimeout);
			scrollTimeout = setTimeout(() => {
				let nearestSlideIndex;
				if (isMobileView()) {
					const currentScrollTop = container.scrollTop;
					const slideHeight = container.offsetHeight;
					nearestSlideIndex = Math.round(
						currentScrollTop / slideHeight,
					);
				} else {
					const currentScrollLeft = container.scrollLeft;
					const slideWidth = container.offsetWidth;
					nearestSlideIndex = Math.round(
						currentScrollLeft / slideWidth,
					);
				}

				if (nearestSlideIndex !== activeSlide) {
					setActiveSlide(nearestSlideIndex);
				}
			}, 150);
		};

		container.addEventListener('scroll', onScroll);
		return () => {
			container.removeEventListener('scroll', onScroll);
			clearTimeout(scrollTimeout);
		};
	}, [activeSlide]);

	// Manage body/html scroll lock
	useEffect(() => {
		const disableScroll =
			activeSlide < heroSlides.length - 1;
		if (disableScroll) {
			document.body.style.overflow = 'hidden';
			document.documentElement.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
			document.documentElement.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
			document.documentElement.style.overflow = '';
		};
	}, [activeSlide]);

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
							priority={activeImage === 0}
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
						className={`flex-shrink-0 relative snap-center flex items-center justify-start p-6 md:p-0 text-left ${
							isMobileView()
								? 'w-full h-screen'
								: 'w-screen h-full'
						}`}
					>
						{/* Content with Creative Text Placement */}
						<motion.div
							className={`relative z-20 text-white flex flex-col items-start max-w-6xl ${
								slide.textPosition === 'top-left'
									? 'lg:pl-20 lg:pt-20'
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
							<motion.h1
								className={`text-4xl sm:text-5xl lg:text-6xl font-heading font-semibold leading-tight drop-shadow-lg ${
									slide.textPosition === 'center'
										? 'max-w-3xl'
										: 'max-w-2xl'
								}`}
								// variants={itemVariants}
							>
								{slide.title}
							</motion.h1>
							{slide.subtitle && (
								<motion.p
									className="mt-4 text-lg sm:text-xl lg:text-2xl font-body max-w-2xl drop-shadow-lg"
									// variants={itemVariants}
								>
									{slide.subtitle}
								</motion.p>
							)}
							<motion.p
								className="mt-4 text-base sm:text-lg lg:text-xl font-body max-w-2xl drop-shadow-lg hidden md:block"
								// variants={itemVariants}
							>
								{slide.description}
							</motion.p>
							<motion.div
								// variants={itemVariants}
								className="mt-8"
							>
								<Link href={slide.ctaLink} passHref>
									<motion.button
										className="bg-white/10 backdrop-blur-md border border-white/20 text-white/90 hover:bg-white/20 px-6 py-3 rounded-full text-lg font-body flex items-center gap-2 transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-white/30"
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										{slide.ctaText}
										<FaCircleArrowRight size={24} />
									</motion.button>
								</Link>
							</motion.div>
						</motion.div>

						{/* Conditional Scroll Cues */}
						{activeSlide < heroSlides.length - 1 && (
							<motion.div
								className="absolute bottom-16 right-8 md:bottom-1/2 md:right-16 transform md:translate-y-1/2 flex flex-col items-center text-white z-30 opacity-70"
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 0.7, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								transition={{ duration: 0.5, delay: 1 }}
							>
								{isMobileView() ? (
									<>
										<RiArrowUpDoubleFill className="text-4xl md:text-5xl animate-bounce" />
										<span className="mt-2 text-sm md:text-base font-body">
											Swipe Up to continue
										</span>
									</>
								) : (
									<>
										<RiMouseLine className="text-4xl md:text-5xl animate-bounce-vertical" />
										<span className="mt-2 text-sm md:text-base font-body">
											Scroll to continue
										</span>
										<RiArrowRightLine className="text-3xl mt-2 animate-pulse-arrow" />
									</>
								)}
							</motion.div>
						)}

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
