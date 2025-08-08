'use client';

import {
	Playfair_Display,
	Work_Sans,
} from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Font configurations
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

const Card = ({
	title,
	children,
	titleColor = 'text-[#9C110E]',
}) => (
	<div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
		<h3
			className={`text-2xl font-bold mb-3 ${titleColor} ${playfair.className}`}
		>
			{title}
		</h3>
		<div className={`text-gray-700 ${work_sans.className}`}>
			{children}
		</div>
	</div>
);

const AboutPage = () => {
	const [isFullscreen, setIsFullscreen] = useState(false);
	const modalRef = useRef(null);

	// ESC key to close fullscreen
	useEffect(() => {
		const handleKeyDown = (e) => {
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
	const handleOutsideClick = (e) => {
		if (
			modalRef.current &&
			!modalRef.current.contains(e.target)
		) {
			setIsFullscreen(false);
		}
	};

	return (
		<>
			<Head>
				<title>
					About Arc9 Consult | Innovative Architectural
					Solutions
				</title>
				<meta
					name="description"
					content="Learn about Arc9 Consult, a leading architectural firm dedicated to innovative, sustainable, and client-centric design solutions."
				/>
				<meta
					name="keywords"
					content="architecture, design, sustainable, Arc9 Consult"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>
			<motion.main
				className="bg-white text-gray-900"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				{/* Hero Section */}
				<section className="relative h-[50vh] flex items-center justify-center text-center">
					<Image
						src="/images/projects/2.png"
						alt="Hero background showcasing Arc9 Consult's architectural project"
						layout="fill"
						objectFit="cover"
						className="z-0"
						priority
						onError={() =>
							console.error(
								'AboutPage: Failed to load hero image',
							)
						}
					/>
					<div className="absolute inset-0 bg-black/60 z-10"></div>
					<div className="relative z-20 px-4 sm:px-6 lg:px-8">
						<h1
							className={`text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight mb-4 ${playfair.className}`}
						>
							About Arc9 Consult
						</h1>
						<p
							className={`text-lg sm:text-xl text-white/90 max-w-2xl mx-auto ${work_sans.className}`}
						>
							Crafting innovative and sustainable
							architectural solutions that inspire and
							endure.
						</p>
					</div>
				</section>

				{/* Introduction & Philosophy Section */}
				<section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
					<div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
						<div className="text-center md:text-left">
							<h2
								className={`text-4xl sm:text-5xl font-extrabold mb-6 leading-tight ${playfair.className}`}
							>
								Our Vision: Shaping Tomorrow's Skylines
							</h2>
							<p
								className={`text-lg sm:text-xl leading-relaxed mb-6 text-gray-700 ${work_sans.className}`}
							>
								At Arc9 Consult, we believe that great
								architecture is more than just designing
								buildings – it's about shaping environments
								that inspire, function seamlessly, and stand
								the test of time. With a blend of innovative
								design, sustainable practices, and
								meticulous attention to detail, we bring
								your visions to life.
							</p>
							<p
								className={`text-lg sm:text-xl leading-relaxed text-gray-700 ${work_sans.className}`}
							>
								Our philosophy centers on a deep
								understanding of client needs, site context,
								and environmental responsibility, ensuring
								every project is a unique masterpiece.
							</p>
						</div>
						<div
							className="relative w-full h-80 md:h-96 group cursor-pointer overflow-hidden rounded-lg"
							onClick={() => setIsFullscreen(true)}
						>
							<Image
								src="/images/projects/plan.jpg"
								alt="Detailed architectural blueprint of a modern building designed by Arc9 Consult"
								layout="fill"
								objectFit="cover"
								className="transform transition-transform duration-700 hover:scale-105"
								onError={() =>
									console.error(
										'AboutPage: Failed to load blueprint image',
									)
								}
							/>
							<div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
								<p className="text-white text-lg font-semibold">
									Click to view full screen
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Mission, Vision, Values Section */}
				<section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
					<div className="max-w-7xl mx-auto">
						<h2
							className={`text-4xl sm:text-5xl font-extrabold text-center mb-12 ${playfair.className}`}
						>
							Our Core Principles
						</h2>
						<div className="grid md:grid-cols-3 gap-8">
							<Card title="Mission">
								To deliver exceptional architectural
								solutions that blend innovative design with
								practical functionality, enhancing lives and
								contributing positively to communities and
								the environment.
							</Card>
							<Card title="Vision">
								To be recognized as a leading architectural
								firm globally, known for our creativity,
								integrity, and commitment to sustainable and
								client-centric design.
							</Card>
							<Card title="Values">
								<ul
									className={`list-disc list-inside text-gray-700 ${work_sans.className}`}
								>
									<li>
										<strong className="font-semibold">
											Innovation:
										</strong>{' '}
										Pushing boundaries with fresh ideas.
									</li>
									<li>
										<strong className="font-semibold">
											Integrity:
										</strong>{' '}
										Operating with honesty and transparency.
									</li>
									<li>
										<strong className="font-semibold">
											Sustainability:
										</strong>{' '}
										Designing for a better future.
									</li>
									<li>
										<strong className="font-semibold">
											Collaboration:
										</strong>{' '}
										Working closely with clients and
										partners.
									</li>
									<li>
										<strong className="font-semibold">
											Excellence:
										</strong>{' '}
										Striving for the highest quality in
										every endeavor.
									</li>
								</ul>
							</Card>
						</div>
					</div>
				</section>

				{/* Our Story Section */}
				<section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
					<div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
						<div className="md:w-1/2">
							<Image
								src="/images/projects/v1.png"
								alt="Historical building designed by Arc9 Consult"
								width={800}
								height={600}
								className="rounded-lg shadow-lg"
								onError={() =>
									console.error(
										'AboutPage: Failed to load story image',
									)
								}
							/>
						</div>
						<div className="md:w-1/2 text-center md:text-left">
							<h2
								className={`text-4xl sm:text-5xl font-extrabold mb-6 leading-tight ${playfair.className}`}
							>
								Our Journey: Building on a Foundation of
								Passion
							</h2>
							<p
								className={`text-lg sm:text-xl leading-relaxed mb-6 text-gray-700 ${work_sans.className}`}
							>
								Founded in 2019 by a team of visionary
								architects, Arc9 Consult began with a simple
								yet profound goal: to create spaces that
								inspire and enrich lives. From our humble
								beginnings, we've grown into a respected
								firm, tackling diverse and complex
								architectural challenges.
							</p>
							<p
								className={`text-lg sm:text-xl leading-relaxed text-gray-700 ${work_sans.className}`}
							>
								Over the years, we've had the privilege of
								working on numerous landmark projects,
								continually pushing the boundaries of design
								and construction. Our commitment to client
								satisfaction and architectural excellence
								remains the cornerstone of our success.
							</p>
						</div>
					</div>
				</section>

				{/* Services/Expertise Section */}
				<section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
					<div className="max-w-7xl mx-auto">
						<h2
							className={`text-4xl sm:text-5xl font-extrabold text-center mb-12 ${playfair.className}`}
						>
							Our Expertise
						</h2>
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							<Card title="Architectural Design">
								From conceptualization to detailed
								blueprints, we create innovative and
								functional designs for residential,
								commercial, and public spaces.
							</Card>
							<Card title="Urban Planning">
								Developing sustainable and vibrant urban
								environments that integrate seamlessly with
								their surroundings.
							</Card>
							<Card title="Interior Design">
								Crafting interior spaces that are
								aesthetically pleasing, highly functional,
								and reflect your unique style.
							</Card>
							<Card title="Project Management">
								Overseeing projects from inception to
								completion, ensuring timely delivery and
								budget adherence.
							</Card>
							<Card title="Sustainable Design">
								Integrating eco-friendly practices and
								materials to create energy-efficient and
								environmentally responsible buildings.
							</Card>
							<Card title="Renovation & Restoration">
								Breathing new life into existing structures
								while preserving their historical integrity.
							</Card>
						</div>
					</div>
				</section>

				{/* Call to Action Section */}
				<section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#9C110E] text-white text-center">
					<div className="max-w-4xl mx-auto">
						<h2
							className={`text-4xl sm:text-5xl font-extrabold mb-6 ${playfair.className}`}
						>
							Ready to Start Your Project?
						</h2>
						<p
							className={`text-lg sm:text-xl leading-relaxed mb-8 ${work_sans.className}`}
						>
							We're passionate about bringing your
							architectural visions to life. Contact us
							today for a consultation.
						</p>
						<a
							href="/contact"
							className={`px-10 py-5 text-xl font-semibold rounded-full shadow-lg transition-all duration-300 ease-in-out bg-white text-[#9C110E] hover:bg-gray-100 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-opacity-75 ${work_sans.className}`}
						>
							Get In Touch
						</a>
					</div>
				</section>

				{/* Fullscreen Image Modal */}
				{isFullscreen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						onClick={handleOutsideClick}
						className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center transition-opacity duration-300"
						style={{ touchAction: 'none' }}
						role="dialog"
						aria-modal="true"
						aria-labelledby="modal-title"
					>
						<motion.div
							ref={modalRef}
							initial={{ scale: 0.8 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0.8 }}
							transition={{ duration: 0.3 }}
							className="relative w-full h-full flex items-center justify-center p-4"
						>
							<h2 id="modal-title" className="sr-only">
								Fullscreen Architectural Blueprint
							</h2>
							<button
								onClick={() => setIsFullscreen(false)}
								className="absolute top-6 right-6 text-white cursor-pointer text-5xl font-bold z-50 hover:scale-110 transition-transform focus:ring-2 focus:ring-white"
								aria-label="Close fullscreen image"
							>
								&times;
							</button>
							<Image
								src="/images/projects/plan.jpg"
								alt="Detailed architectural blueprint of a modern building designed by Arc9 Consult"
								className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
								style={{ touchAction: 'pinch-zoom' }}
								width={1200}
								height={800}
								priority
								onError={() =>
									console.error(
										'AboutPage: Failed to load fullscreen image',
									)
								}
							/>
						</motion.div>
					</motion.div>
				)}
			</motion.main>
		</>
	);
};

export default AboutPage;
