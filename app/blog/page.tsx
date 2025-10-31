'use client';

import React, { useEffect, useState } from 'react';
import {
	motion,
	useAnimation,
	AnimatePresence,
} from 'framer-motion'; // Import AnimatePresence
import {
	Playfair_Display,
	Work_Sans,
} from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/formatDate';

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

// Define a type for blog post data for better type safety
interface BlogPost {
	slug: string; // Unique slug for the post's URL (e.g., "designing-the-future")
	title: string;
	excerpt: string; // Short summary
	image: {
		url: string;
	};
	createdAt: string; // Date string (e.g., 'July 15, 2025')
}

// Mock data for all blog posts

const BlogPage = () => {
	// For hero section and static header animations
	const heroControls = useAnimation();

	const [displayedPosts, setDisplayedPosts] = useState<
		BlogPost[]
	>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 6; // Number of posts to show per page

	// Calculate total pages for pagination
	const totalPages = Math.ceil(
		displayedPosts.length / postsPerPage,
	);

	useEffect(() => {
		async function fetchBlogs() {
			try {
				const res = await fetch('/api/blog');
				if (!res.ok)
					throw new Error('Failed to fetch blogs');
				const data: BlogPost[] = await res.json();
				setDisplayedPosts(data);
				setLoading(false);
			} catch (err: any) {
				setError(err.message);
				setLoading(false);
			}
		}
		fetchBlogs();
	}, []);

	// Initial animation for the hero section
	useEffect(() => {
		heroControls.start({
			opacity: 1,
			y: 0,
			transition: { duration: 0.8, ease: 'easeOut' },
		});
	}, [heroControls]);

	// Update displayed posts based on current page
	// This useEffect runs on initial mount and whenever currentPage changes
	useEffect(() => {
		const startIndex = (currentPage - 1) * postsPerPage;
		const endIndex = startIndex + postsPerPage;
	}, [currentPage, postsPerPage]);

	// Variants for individual blog post cards for staggered animation
	const cardVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: i * 0.15, // Staggered animation for each card
				duration: 0.8,
				ease: 'easeOut',
			},
		}),
		exit: {
			opacity: 0,
			y: -50,
			transition: { duration: 0.5, ease: 'easeOut' },
		}, // Animate out
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		// Scroll to top of the section when changing page for better UX
		document
			.getElementById('blog-posts-grid')
			?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<main className="bg-white text-gray-900">
			{/* Hero Section */}
			<section
				className={`relative h-[55vh] flex items-center justify-center text-center bg-cover bg-center`}
				style={{
					backgroundImage:
						'url(/images/projects/service2.png)',
				}} // Add a dedicated hero image for blog
			>
				<div className="absolute inset-0 bg-black/60"></div>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={heroControls}
					className="relative z-10 px-4 sm:px-6 lg:px-8"
				>
					<h1
						className={`text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight mb-4 ${playfair.className}`}
					>
						Our Latest Insights
					</h1>
					<p
						className={`text-lg sm:text-xl text-white/90 max-w-3xl mx-auto ${work_sans.className}`}
					>
						Dive into our blog for expert articles, industry
						trends, and innovative ideas in architecture,
						design, and project management.
					</p>
				</motion.div>
			</section>

			{/* Main Blog Posts Section */}
			<section
				id="blog-posts-grid" // Add ID for scrolling on pagination
				className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white text-gray-900"
			>
				<div className="max-w-7xl mx-auto text-center">
					{/* Section Header */}
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: 'easeOut' }}
						className="mb-16"
					>
						<div className="flex items-center justify-center gap-4 mb-4">
							<div className="h-px w-16 bg-[#9C110E]"></div>
							<h2
								className={`text-4xl sm:text-5xl font-serif font-bold leading-tight tracking-tight ${playfair.className}`}
							>
								Latest{' '}
								<span className="text-[#9C110E]">
									Articles
								</span>
							</h2>
							<div className="h-px w-16 bg-[#9C110E]"></div>
						</div>
						<p
							className={`text-lg text-gray-600 font-sans max-w-2xl mx-auto ${work_sans.className}`}
						>
							Stay informed with our perspectives on
							industry innovation and best practices.
						</p>
					</motion.div>

					{/* Blog Post Grid */}
					<motion.div
						key={currentPage} // Crucial: Re-key the parent div to trigger re-render and animation on page change
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
					>
						<AnimatePresence mode="wait">
							{' '}
							{/* Use AnimatePresence for exit animations */}
							{displayedPosts.map((post, index) => (
								<motion.div
									key={post.slug} // Use unique slug as key for each individual item
									custom={index}
									// variants={cardVariants}
									initial="hidden"
									animate="visible"
									exit="exit" // Apply exit animation
									className="relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer"
								>
									<Link
										href={`/blog/${post.slug}`}
										passHref
									>
										{/* Blog Post Image */}
										<motion.div
											whileHover={{ scale: 1.05 }}
											transition={{
												duration: 0.4,
												ease: 'easeOut',
											}}
											className="relative h-64 overflow-hidden"
										>
											<Image
												src={post.image.url}
												alt={post.title}
												layout="fill"
												objectFit="cover"
												className="transform transition-transform duration-300 group-hover:scale-110"
											/>
											{/* Optional subtle overlay on hover */}
											<div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
										</motion.div>

										{/* Blog Post Content */}
										<div className="p-6 flex flex-col items-start text-left">
											<p
												className={`text-sm text-gray-500 font-sans mb-2 ${work_sans.className}`}
											>
												{formatDate(post.createdAt)} • Arc9 Consult
											</p>
											<h3
												className={`text-xl font-serif font-semibold mb-3 text-gray-800 tracking-wide ${playfair.className}`}
											>
												{post.title}
											</h3>
											<p
												className={`text-base text-gray-600 font-sans mb-4 line-clamp-3 ${work_sans.className}`}
											>
												{post.excerpt}
											</p>
											<motion.button
												whileHover={{
													scale: 1.05,
													backgroundColor: '#9c100e25',
												}}
												whileTap={{ scale: 0.95 }}
												className={`px-6 py-2 text-base font-sans font-medium rounded-full shadow-md bg-[#9c100e25] border border-[#9c100eb6] text-[#9C110E] transition-all duration-300 ease-in-out hover:shadow-lg`}
											>
												Read More
											</motion.button>
										</div>
									</Link>
								</motion.div>
							))}
						</AnimatePresence>
					</motion.div>

					{/* Pagination */}
					{totalPages > 1 && (
						<div className="mt-16 flex justify-center items-center space-x-4">
							{[...Array(totalPages)].map((_, i) => (
								<motion.button
									key={i + 1}
									onClick={() => handlePageChange(i + 1)}
									className={`px-5 py-3 rounded-full text-lg font-bold transition-all duration-300 ${
										currentPage === i + 1
											? 'bg-[#9C110E] text-white shadow-lg'
											: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
									}`}
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
								>
									{i + 1}
								</motion.button>
							))}
						</div>
					)}
				</div>
			</section>

			{/* Call to Action Section */}
			<section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#9C110E] text-white text-center">
				<div className="max-w-4xl mx-auto">
					<h2
						className={`text-4xl sm:text-5xl font-extrabold mb-6 ${playfair.className}`}
					>
						Never Miss an Update
					</h2>
					<p
						className={`text-lg sm:text-xl leading-relaxed mb-8 ${work_sans.className}`}
					>
						Subscribe to our newsletter for the latest
						articles, industry news, and exclusive content
						directly to your inbox.
					</p>
					<motion.button
						whileHover={{
							scale: 1.05,
							backgroundColor: '#ffffff',
						}}
						whileTap={{ scale: 0.95 }}
						className={`px-10 py-5 text-xl font-semibold rounded-full shadow-lg transition-all duration-300 ease-in-out
                            bg-white text-[#9C110E] hover:text-[#7b0d0c]
                            focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-opacity-75 ${work_sans.className}`}
						onClick={() =>
							alert('Subscription form would go here!')
						} // Replace with actual subscription form
					>
						Subscribe Now
					</motion.button>
				</div>
			</section>
		</main>
	);
};

export default BlogPage;
