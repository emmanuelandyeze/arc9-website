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
	imageUrl: string;
	date: string; // Date string (e.g., 'July 15, 2025')
	author: string;
	tags: string[]; // For categorization/filtering
}

// Mock data for all blog posts
const allBlogPosts: BlogPost[] = [
	{
		slug: 'designing-the-future-trends-in-modern-architecture',
		title:
			'Designing the Future: Trends in Modern Architecture',
		excerpt:
			'Explore the latest trends shaping the world of architecture, from sustainable materials to innovative designs that prioritize human well-being and environmental harmony. This deep dive covers biophilic design, smart building integration, and adaptive reuse strategies.',
		imageUrl: '/images/projects/v2.png', // New placeholder image
		date: 'July 25, 2025',
		author: 'Arc9 Insights',
		tags: ['Architecture', 'Trends', 'Sustainability'],
	},
	{
		slug: 'creating-timeless-interiors-a-design-philosophy',
		title:
			'Creating Timeless Interiors: A Design Philosophy',
		excerpt:
			'Learn how to craft interior spaces that blend functionality with timeless elegance and personal style. We discuss the principles of classic design, material selection, and how to create lasting beauty in any home or commercial space.',
		imageUrl: '/images/projects/v2.png', // New placeholder image
		date: 'July 20, 2025',
		author: 'Aisha K.',
		tags: ['Interior Design', 'Home Decor', 'Style'],
	},
	{
		slug: 'mastering-project-management-in-construction',
		title: 'Mastering Project Management in Construction',
		excerpt:
			'Discover key strategies for managing construction projects efficiently, ensuring quality, timeliness, and budget adherence. This article delves into risk management, stakeholder communication, and technological advancements in project oversight.',
		imageUrl: '/images/projects/v2.png', // New placeholder image
		date: 'July 15, 2025',
		author: 'David L.',
		tags: [
			'Project Management',
			'Construction',
			'Efficiency',
		],
	},
	{
		slug: 'the-rise-of-smart-homes-integrating-technology',
		title:
			'The Rise of Smart Homes: Integrating Technology Seamlessly',
		excerpt:
			'Explore how smart home technology is revolutionizing modern living, from automated climate control to integrated security systems, enhancing convenience and energy efficiency.',
		imageUrl: '/images/projects/v2.png', // New placeholder image
		date: 'July 10, 2025',
		author: 'Arc9 Tech',
		tags: ['Technology', 'Smart Home', 'Innovation'],
	},
	{
		slug: 'sustainable-building-materials-for-a-greener-future',
		title:
			'Sustainable Building Materials for a Greener Future',
		excerpt:
			'A comprehensive guide to eco-friendly building materials that reduce environmental impact and improve indoor air quality, contributing to a healthier planet and living spaces.',
		imageUrl: '/images/projects/v2.png', // New placeholder image
		date: 'July 5, 2025',
		author: 'EcoBuild Team',
		tags: ['Sustainability', 'Materials', 'Green Building'],
	},
	{
		slug: 'reimagining-urban-spaces-the-power-of-public-design',
		title:
			'Reimagining Urban Spaces: The Power of Public Design',
		excerpt:
			'How thoughtful urban planning and design can transform public spaces into vibrant, functional, and aesthetically pleasing environments for communities to thrive.',
		imageUrl: '/images/projects/v2.png', // New placeholder image
		date: 'July 1, 2025',
		author: 'Urban Visionaries',
		tags: ['Urban Planning', 'Design', 'Community'],
	},
	// Add more blog posts here to test pagination if needed
	{
		slug: 'future-of-workspaces',
		title:
			'The Future of Workspaces: Design for Productivity',
		excerpt:
			'How modern office design is evolving to boost productivity and employee well-being in hybrid work environments.',
		imageUrl: '/images/projects/v2.png',
		date: 'June 28, 2025',
		author: 'Office Innovators',
		tags: ['Interior Design', 'Workspaces', 'Innovation'],
	},
	{
		slug: 'innovative-lighting-solutions',
		title: 'Innovative Lighting Solutions for Modern Homes',
		excerpt:
			'Discover how smart and artistic lighting can transform the ambiance and functionality of any contemporary home.',
		imageUrl: '/images/projects/v2.png',
		date: 'June 20, 2025',
		author: 'Light Masters',
		tags: ['Interior Design', 'Home Decor', 'Technology'],
	},
];

const BlogPage = () => {
	// For hero section and static header animations
	const heroControls = useAnimation();

	const [displayedPosts, setDisplayedPosts] = useState<
		BlogPost[]
	>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 6; // Number of posts to show per page

	// Calculate total pages for pagination
	const totalPages = Math.ceil(
		allBlogPosts.length / postsPerPage,
	);

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
		setDisplayedPosts(
			allBlogPosts.slice(startIndex, endIndex),
		);
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
												src={post.imageUrl}
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
												{post.date} • {post.author}
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
