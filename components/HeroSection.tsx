// src/components/HeroSection.tsx
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
} from 'react-icons/ri'; // Added new icons
import { FaCircleArrowRight } from 'react-icons/fa6';

// Helper to check if it's a mobile view (adjust breakpoint as needed)
const isMobileView = () => window.innerWidth < 768; // Tailwind's 'md' breakpoint

// Define the content for each 'slide' within the Hero Section
interface HeroSlide {
	id: string;
	title: string;
	subtitle: string;
	description: string;
	image: string;
	ctaText: string;
	ctaLink: string;
}

const heroSlides: HeroSlide[] = [
	{
		id: 'intro',
		title:
			'Shaping the Future Through Timeless Architecture',
		subtitle: '',
		description:
			'At Arc9 Consult, we merge creativity, technology, and precision to design spaces that inspire and endure. From residential masterpieces to commercial landmarks, our approach combines beauty with functionality.',
		image: '/images/projects/GA 3.png',
		ctaText: 'Explore Our Portfolio',
		ctaLink: '/projects',
	},
	{
		id: 'architecture',
		title: 'Architectural Design',
		subtitle:
			'Functional, Aesthetic Spaces Tailored to Your Vision',
		description:
			'Our architectural services bring your ideas to life with thoughtful design, contextual awareness, and innovative structures. Whether modern, minimalist, or Afro-contemporary, we shape buildings that resonate.',
		image: '/images/projects/v2.png',
		ctaText: 'See Architectural Works',
		ctaLink: '/services#architecture',
	},
	{
		id: 'interior-design',
		title: 'Interior Design',
		subtitle:
			'Sophisticated Interiors That Reflect Your Lifestyle',
		description:
			'We create bespoke interiors that balance elegance and comfort. Every space we design is a reflection of your taste, optimized for beauty, function, and emotional connection.',
		image: '/images/projects/interior-1.png',
		ctaText: 'Browse Interior Designs',
		ctaLink: '/services#interior-design',
	},
	{
		id: 'project-management',
		title: 'Project Management',
		subtitle:
			'Precision Planning & Seamless Execution from Start to Finish',
		description:
			'From concept to completion, our project management ensures every milestone is delivered with clarity, quality, and control. We keep your vision intact while managing cost, time, and scope.',
		image: '/images/projects/management-1.png',
		ctaText: 'Our Management Approach',
		ctaLink: '/services#project-management',
	},
];

const HeroSection: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [activeSlide, setActiveSlide] = useState(0);
	const isAnimating = useRef(false);

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
			}, 700); // Match CSS scroll-smooth duration
		}
	}, []);

	// Handle wheel event for both desktop (horizontal) and mobile (vertical)
	useEffect(() => {
		const handleWheel = (e: WheelEvent) => {
			if (!containerRef.current) return;

			const delta = e.deltaY; // Vertical scroll amount

			if (isMobileView()) {
				// Mobile: vertical scroll through hero slides
				let targetSlide = activeSlide;
				if (delta > 0) {
					// Scrolling down
					if (activeSlide < heroSlides.length - 1) {
						targetSlide = activeSlide + 1;
						e.preventDefault(); // Prevent default vertical page scroll
						scrollToSlide(targetSlide);
					} else {
						// At last slide on mobile, allow normal vertical page scroll
					}
				} else {
					// Scrolling up
					if (activeSlide > 0) {
						targetSlide = activeSlide - 1;
						e.preventDefault(); // Prevent default vertical page scroll
						scrollToSlide(targetSlide);
					} else {
						// At first slide on mobile, allow normal vertical page scroll up
					}
				}
			} else {
				// Desktop: horizontal scroll through hero slides
				let targetSlide = activeSlide;
				if (delta > 0) {
					// Scrolling down on desktop means next horizontal slide
					if (activeSlide < heroSlides.length - 1) {
						targetSlide = activeSlide + 1;
						e.preventDefault(); // Prevent default vertical page scroll
						scrollToSlide(targetSlide);
					} else {
						// At last slide on desktop, allow normal vertical page scroll
					}
				} else {
					// Scrolling up on desktop means previous horizontal slide
					if (activeSlide > 0) {
						targetSlide = activeSlide - 1;
						e.preventDefault(); // Prevent default vertical page scroll
						scrollToSlide(targetSlide);
					} else {
						// At first slide on desktop, allow normal vertical page scroll up
					}
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
	}, [activeSlide, scrollToSlide, heroSlides.length]);

	// Handle touch events for mobile swiping (responsive to direction)
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
					// Mobile: vertical swipe for slides
					if (
						Math.abs(deltaY) > Math.abs(deltaX) &&
						Math.abs(deltaY) > 10
					) {
						e.preventDefault(); // Prevent page scroll when a significant vertical swipe is detected
					}
				} else {
					// Desktop: horizontal swipe for slides (though mouse wheel is primary)
					if (
						Math.abs(deltaX) > Math.abs(deltaY) &&
						Math.abs(deltaX) > 10
					) {
						e.preventDefault(); // Prevent page scroll when a significant horizontal swipe is detected
					}
				}
			}
		};

		const handleTouchEnd = () => {
			if (isAnimating.current) return;

			const swipeThreshold = 50; // Pixels

			if (isMobileView()) {
				if (touchStartY - touchEndY > swipeThreshold) {
					// Swiped up (scroll down to next slide)
					if (activeSlide < heroSlides.length - 1) {
						scrollToSlide(activeSlide + 1);
					}
				} else if (
					touchEndY - touchStartY >
					swipeThreshold
				) {
					// Swiped down (scroll up to previous slide)
					if (activeSlide > 0) {
						scrollToSlide(activeSlide - 1);
					}
				}
			} else {
				// Desktop logic (horizontal swipe)
				if (touchStartX - touchEndX > swipeThreshold) {
					// Swiped left (scroll right to next slide)
					if (activeSlide < heroSlides.length - 1) {
						scrollToSlide(activeSlide + 1);
					}
				} else if (
					touchEndX - touchStartX >
					swipeThreshold
				) {
					// Swiped right (scroll left to previous slide)
					if (activeSlide > 0) {
						scrollToSlide(activeSlide - 1);
					}
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
	}, [activeSlide, scrollToSlide, heroSlides.length]);

	// Update active slide based on native scroll (e.g., if user drags scrollbar or uses keyboard)
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
			activeSlide < heroSlides.length - 1; // Lock until last slide
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
	}, [activeSlide, heroSlides.length]);

	// Variants for individual slide content animation
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
			<div
				ref={containerRef}
				// Responsive flex direction and overflow based on screen size
				className={`flex h-full w-full scroll-smooth
          ${
						isMobileView()
							? 'flex-col overflow-y-hidden snap-y'
							: 'flex-row overflow-x-hidden snap-x'
					} snap-mandatory`}
			>
				{heroSlides.map((slide, index) => (
					<div
						key={slide.id}
						id={`hero-slide-${slide.id}`}
						// Responsive width/height for slides
						className={`flex-shrink-0 relative snap-center flex items-center justify-start p-6 md:p-0 text-left
              ${
								isMobileView()
									? 'w-full h-screen'
									: 'w-screen h-full'
							}`}
					>
						{/* Background Image with Overlay */}
						<Image
							src={slide.image}
							alt={slide.title}
							fill
							style={{
								objectFit: 'cover',
								objectPosition: 'center',
							}}
							priority={index === 0}
							className="z-0"
						/>
						<div
							className={`absolute inset-0 z-10 ${
								index === 0 ? 'bg-black/60' : 'bg-black/60'
							}`}
						/>

						{/* Content for each slide */}
						<motion.div
							className="relative z-20 text-white flex flex-col items-start max-w-6xl lg:pl-40"
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
								className="text-4xl sm:text-5xl lg:text-5xl font-heading font-semibold leading-tight drop-shadow-lg"
								variants={itemVariants}
							>
								{slide.title}
							</motion.h1>
							<motion.p
								className="mt-4 text-lg sm:text-xl lg:text-2xl font-body max-w-2xl drop-shadow-lg"
								variants={itemVariants}
							>
								{slide.subtitle}
							</motion.p>
							<motion.p
								className="mt-4 text-lg sm:text-xl hidden md:block lg:text-2xl font-body max-w-2xl drop-shadow-lg"
								variants={itemVariants}
							>
								{slide.description}
							</motion.p>
							<motion.div
								variants={itemVariants}
								className="mt-10"
							>
								<Link href={slide.ctaLink} passHref>
									<motion.button
										className="bg-transparent flex flex-row border border-[#f1f1f1] cursor-pointer items-center hover:bg-brandPrimary-dark px-6 py-3 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brandPrimary-light focus:ring-opacity-75"
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										<p className="text-[#f1f1f1] font-body">
											{slide.ctaText}
										</p>
										<FaCircleArrowRight
											size={24}
											className="text-[#f1f1f1] ml-2"
										/>
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
									Continue to content
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
								? 'bg-brandPrimary-light w-5'
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
