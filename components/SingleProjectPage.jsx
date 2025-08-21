'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Playfair_Display,
	Work_Sans,
} from 'next/font/google';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react'; // Icons for navigation and close
import Link from 'next/link';

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

// Component for the Single Project Page
const SingleProjectPage = ({ id }) => {
	const [project, setProject] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fetch project from backend API
	useEffect(() => {
		if (!id) return;

		const fetchProject = async () => {
			try {
				setLoading(true);
				const res = await fetch(`/api/projects/${id}`);
				if (!res.ok)
					throw new Error('Failed to fetch project');

				const data = await res.json();
				// --- START OF MODIFICATION ---
				// Add a placeholder video URL to demonstrate the functionality.
				// In your real application, this would come from the 'data' object.
				const projectWithVideo = {
					...data,
					videoUrl:
						data.youtube ||
						'https://www.youtube.com/embed/dQw4w9WgXcQ?si=f4tYwXqUfT5yU5zD', // Replace with your actual database field (e.g., data.youtube)
				};
				setProject(projectWithVideo);
				// --- END OF MODIFICATION ---
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchProject();
	}, [id]);

	const [isFullscreen, setIsFullscreen] = useState(false);
	const [currentImageIndex, setCurrentImageIndex] =
		useState(0);
	const modalRef = useRef(null);

	// Effect to handle keyboard navigation (ESC, Arrow keys)
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (isFullscreen) {
				if (e.key === 'Escape') {
					setIsFullscreen(false);
				} else if (e.key === 'ArrowRight') {
					showNextImage();
				} else if (e.key === 'ArrowLeft') {
					showPrevImage();
				}
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () =>
			window.removeEventListener('keydown', handleKeyDown);
	}, [isFullscreen, currentImageIndex, project]);

	// Handle click outside modal to close
	const handleOutsideClick = (e) => {
		if (
			modalRef.current &&
			!modalRef.current.contains(e.target)
		) {
			setIsFullscreen(false);
		}
	};
	if (loading)
		return (
			<div className="min-h-screen flex items-center justify-center">
				Loading project...
			</div>
		);

	if (error)
		return (
			<div className="min-h-screen flex items-center justify-center text-red-600">
				Error: {error}
			</div>
		);

	if (!project) {
		// Handle case where project is not found
		return (
			<main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-16">
				<div className="text-center">
					<h1
						className={`text-4xl font-extrabold text-[#9C110E] ${playfair.className}`}
					>
						Project Not Found
					</h1>
					<p
						className={`mt-4 text-lg text-gray-700 ${work_sans.className}`}
					>
						The project you are looking for does not exist
						or has been moved.
					</p>
					<Link href="/projects">
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className={`mt-8 px-8 py-3 bg-[#9C110E] text-white rounded-full shadow-lg hover:bg-[#7b0d0c] transition-all duration-300 ${work_sans.className}`}
						>
							Back to Projects
						</motion.button>
					</Link>
				</div>
			</main>
		);
	}

	const openModal = (index) => {
		setCurrentImageIndex(index);
		setIsFullscreen(true);
	};

	const showNextImage = () => {
		setCurrentImageIndex(
			(prevIndex) =>
				(prevIndex + 1) % project?.images?.length,
		);
	};

	const showPrevImage = () => {
		setCurrentImageIndex(
			(prevIndex) =>
				(prevIndex - 1 + project?.images?.length) %
				project?.images?.length,
		);
	};

	return (
		<main className="bg-white text-gray-900">
			{/* Hero Section: Main Project Image & Title */}
			<section
				className="relative h-[60vh] md:h-[70vh] flex items-end justify-start bg-cover bg-center"
				style={{
					backgroundImage: `url(${project.images[0]?.url})`, // Use the first image as background
				}}
			>
				<div className="absolute inset-0 bg-black/60"></div>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className="relative z-10 p-8 md:p-12 w-full text-white"
				>
					<p
						className={`text-lg uppercase tracking-widest mb-2 text-[#fff] ${work_sans.className}`}
					>
						{project.category}
					</p>
					<h1
						className={`text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-4 ${playfair.className}`}
					>
						{project.title}
					</h1>
					<div
						className={`flex items-center gap-6 text-xl font-medium ${work_sans.className}`}
					>
						<span>{project.location}</span>
						<span className="text-gray-400">•</span>
						<span>{project.year}</span>
						<span className="text-gray-400">•</span>
						<span>{project.area}</span>
					</div>
					<motion.button
						onClick={() => openModal(0)} // Open modal with main image as first
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className={`mt-6 px-6 py-3 bg-white text-[#9C110E] rounded-full shadow-lg font-semibold transition-all duration-300 ${work_sans.className}`}
					>
						View Gallery
					</motion.button>
				</motion.div>
			</section>

			{/* Project Document Content */}
			<section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
				<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
					{/* Sidebar for Key Info (Optional, but adds to "document" feel) */}
					<div className="md:col-span-1 bg-white p-8 rounded-lg shadow-md h-fit sticky top-8">
						<h2
							className={`text-3xl font-bold mb-6 text-[#9C110E] ${playfair.className}`}
						>
							{project.title}
						</h2>
						<ul
							className={`space-y-4 text-lg text-gray-700 ${work_sans.className}`}
						>
							<li>
								<strong className="font-semibold">
									Location:
								</strong>{' '}
								{project.location}
							</li>
						</ul>
						{/* You could add a "Download PDF" button here */}
					</div>

					{/* Main Content Area */}
					<div className="md:col-span-2 space-y-12">
						{/* Overview */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							className="bg-white p-8 rounded-lg shadow-md"
						>
							<h3
								className={`text-3xl font-bold mb-4 text-gray-800 ${playfair.className}`}
							>
								Project Overview
							</h3>
							<div
								className={`text-lg leading-relaxed text-gray-700 whitespace-pre-wrap ${work_sans.className}`}
							>
								{project.description}
							</div>
						</motion.div>
						{/* Additional content sections (Challenge, Solution, etc.) would go here if they exist */}
					</div>
				</div>
			</section>

			{/* Video Section */}
			{project.youtube && (
				<section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">
					<div className="max-w-7xl mx-auto text-center">
						<h2
							className={`text-4xl sm:text-5xl font-extrabold mb-12 text-gray-800 ${playfair.className}`}
						>
							Project Video
						</h2>
						<div className="relative overflow-hidden pt-[56.25%] rounded-lg shadow-lg">
							<iframe
								src={project.youtube}
								title="YouTube video player"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								className="absolute top-0 left-0 w-full h-full rounded-lg"
								allowFullScreen
							></iframe>
						</div>
					</div>
				</section>
			)}

			{/* Gallery Section - Displaying thumbnails */}
			{project?.images?.length > 0 && (
				<section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">
					<div className="max-w-7xl mx-auto text-center">
						<h2
							className={`text-4xl sm:text-5xl font-extrabold mb-12 text-gray-800 ${playfair.className}`}
						>
							Project Gallery
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
							{project?.images?.map((imgSrc, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{
										duration: 0.5,
										delay: index * 0.1,
									}}
									className="relative aspect-video overflow-hidden rounded-lg shadow-lg group cursor-pointer"
									onClick={() => openModal(index)}
									whileHover={{
										scale: 1.05,
										boxShadow:
											'0 10px 20px rgba(0,0,0,0.2)',
									}}
									whileTap={{ scale: 0.98 }}
								>
									<Image
										src={imgSrc?.url}
										alt={`${project.title} Gallery Image ${
											index + 1
										}`}
										layout="fill"
										objectFit="cover"
										className="transform transition-transform duration-300 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
										<span className="text-white text-lg font-semibold">
											View
										</span>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>
			)}

			{/* Fullscreen Image Modal */}
			<AnimatePresence>
				{isFullscreen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						onClick={handleOutsideClick}
						className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
						style={{ touchAction: 'none' }} // Prevent pinch-zoom on background
					>
						<motion.div
							ref={modalRef}
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.8, opacity: 0 }}
							transition={{ duration: 0.3 }}
							className="relative w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center"
						>
							{/* Close Button */}
							<button
								onClick={() => setIsFullscreen(false)}
								className="absolute top-4 right-4 text-white text-5xl font-bold z-50 hover:scale-110 transition-transform"
								aria-label="Close"
							>
								<X size={48} />
							</button>

							{/* Previous Button */}
							<button
								onClick={showPrevImage}
								className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 rounded-full text-white z-50 hover:bg-white/40 transition-colors"
								aria-label="Previous Image"
							>
								<ChevronLeft size={36} />
							</button>

							{/* Next Button */}
							<button
								onClick={showNextImage}
								className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 rounded-full text-white z-50 hover:bg-white/40 transition-colors"
								aria-label="Next Image"
							>
								<ChevronRight size={36} />
							</button>

							{/* Image */}
							<Image
								src={project.images[currentImageIndex]?.url}
								alt={`${project.title} - Fullscreen View ${
									currentImageIndex + 1
								}`}
								layout="fill"
								objectFit="contain" // Ensure the whole image is visible
								className="rounded-lg shadow-2xl"
								priority={true} // Load high priority as it's the main view
							/>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Call to Action Section */}
			<section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#9C110E] text-white text-center">
				<div className="max-w-4xl mx-auto">
					<h2
						className={`text-4xl sm:text-5xl font-extrabold mb-6 ${playfair.className}`}
					>
						Inspired by This Project?
					</h2>
					<p
						className={`text-lg sm:text-xl leading-relaxed mb-8 ${work_sans.className}`}
					>
						Let's discuss how we can bring a similar level
						of excellence to your next venture.
					</p>
					<Link href="/contact" passHref>
						<motion.button
							whileHover={{
								scale: 1.05,
								backgroundColor: '#ffffff',
							}}
							whileTap={{ scale: 0.95 }}
							className={`px-10 py-5 text-xl font-semibold rounded-full shadow-lg transition-all duration-300 ease-in-out
                            bg-white text-[#9C110E] hover:text-[#7b0d0c]
                            focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-opacity-75 ${work_sans.className}`}
						>
							Get in Touch
						</motion.button>
					</Link>
				</div>
			</section>
		</main>
	);
};

export default SingleProjectPage;
