'use client';
import {
	Playfair_Display,
	Work_Sans,
} from 'next/font/google';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';

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

const AboutSection = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const modalRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	// ESC key to close fullscreen
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setIsFullscreen(false);
		};

		if (isFullscreen) {
			window.addEventListener('keydown', handleKeyDown);
		}

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isFullscreen]);

	// Outside click to close
	const handleOutsideClick = (
		e: React.MouseEvent<HTMLDivElement>,
	) => {
		if (
			modalRef.current &&
			!modalRef.current.contains(e.target as Node)
		) {
			setIsFullscreen(false);
		}
	};

	return (
		<section
			id="about"
			className={`py-10 md:py-16 px-4 sm:px-6 lg:px-8 bg-white text-gray-900 transition-opacity duration-1000 ${
				isVisible ? 'opacity-100' : 'opacity-0'
			}`}
		>
			<div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
				{/* Image Column */}
				<div
					className="relative w-full md:w-1/2 group cursor-pointer"
					onClick={() => setIsFullscreen(true)}
				>
					{/* <Image
						src="/images/projects/plan.jpg"
						alt="About Image"
						fill
						style={{
							objectFit: 'cover',
							objectPosition: 'center',
						}}
						className="w-full h-auto object-cover transform transition-transform duration-700 hover:scale-105"
					/> */}
					<img
						src="/images/projects/plan.jpg"
						alt="Full view"
						className="max-w-full max-h-full object-contain"
						style={{
							touchAction: 'pinch-zoom',
							width: 'auto',
							height: 'auto',
						}}
					/>
					{/* Overlay Text */}
					<div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
						<p className="text-white text-lg font-semibold">
							Click to view full screen
						</p>
					</div>
				</div>

				{/* Text Content Column */}
				<div className="w-full md:w-1/2 text-center md:text-left">
					<h2
						className={`text-4xl sm:text-5xl font-extrabold mb-6 leading-tight ${playfair.className}`}
					>
						Crafting Spaces,{' '}
						<span className="text-[#9C110E] font-bold">
							Defining Futures
						</span>
					</h2>
					<p
						className={`text-lg sm:text-xl leading-relaxed mb-8 text-gray-700 ${work_sans.className}`}
					>
						At Arc9 Consult, we believe that great
						architecture is more than just designing
						buildings – it's about shaping environments that
						inspire, function seamlessly, and stand the test
						of time. With a blend of innovative design,
						sustainable practices, and meticulous attention
						to detail, we bring your visions to life.
					</p>

					<button
						className={`px-8 py-4 text-lg font-semibold rounded-full shadow-xl transition-all duration-300 ease-in-out
						border border-white/30 bg-white/10 text-[#121212]
						backdrop-blur-lg hover:bg-white/20 hover:border-white/50
						transform hover:-translate-y-1 hover:scale-105
						focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-opacity-75 cursor-pointer ${work_sans.className}`}
						style={{
							backgroundColor: 'rgba(255, 255, 255, 0.15)',
							backdropFilter: 'blur(12px)',
							WebkitBackdropFilter: 'blur(12px)',
							boxShadow:
								'0 8px 32px 0 rgba(156, 16, 14, 0.5)',
						}}
					>
						Learn More About Us
					</button>
				</div>
			</div>

			{/* Fullscreen Image Modal */}
			{isFullscreen && (
				<div
					onClick={handleOutsideClick}
					className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center transition-opacity duration-300"
					style={{ touchAction: 'pinch-zoom' }}
				>
					<div
						ref={modalRef}
						className="relative w-full h-full flex items-center justify-center p-4"
					>
						<button
							onClick={() => setIsFullscreen(false)}
							className="absolute top-6 right-6 text-[#fff] cursor-pointer text-5xl font-bold z-50"
							aria-label="Close"
						>
							&times;
						</button>
						<img
							src="/images/projects/plan.jpg"
							alt="Full view"
							className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
							style={{
								touchAction: 'pinch-zoom',
								width: 'auto',
								height: 'auto',
							}}
						/>
					</div>
				</div>
			)}
		</section>
	);
};

export default AboutSection;
