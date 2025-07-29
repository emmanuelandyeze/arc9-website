'use client';
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import {
	Playfair_Display,
	Work_Sans,
} from 'next/font/google';
import Image from 'next/image';

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

// BlogSection Component
const BlogSection = () => {
	const posts = [
		{
			title:
				'Designing the Future: Trends in Modern Architecture',
			excerpt:
				'Explore the latest trends shaping the world of architecture, from sustainable materials to innovative designs.',
			imageUrl: '/images/projects/landing2.png',
			date: 'July 15, 2025',
		},
		{
			title: 'Creating Timeless Interiors',
			excerpt:
				'Learn how to craft interior spaces that blend functionality with timeless elegance and personal style.',
			imageUrl: '/images/projects/2.png',
			date: 'July 10, 2025',
		},
		{
			title: 'Mastering Project Management in Construction',
			excerpt:
				'Discover key strategies for managing construction projects efficiently, ensuring quality and timeliness.',
			imageUrl: '/images/projects/GYM 3.png',
			date: 'July 5, 2025',
		},
	];

	const controls = useAnimation();

	useEffect(() => {
		controls.start((i) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: i * 0.3,
				duration: 0.8,
				ease: 'easeOut',
			},
		}));
	}, [controls]);

	return (
		<section
			id="blog"
			className="py-14 md:py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white text-gray-900"
		>
			<div className="max-w-7xl mx-auto text-center">
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
							Our{' '}
							<span className="text-[#9C110E]">Blog</span>
						</h2>
						<div className="h-px w-16 bg-[#9C110E]"></div>
					</div>
					<p
						className={`text-lg text-gray-600 font-sans max-w-2xl mx-auto ${work_sans.className}`}
					>
						Stay updated with our latest insights, tips, and
						trends in architecture, design, and project
						management.
					</p>
				</motion.div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{posts.map((post, index) => (
						<motion.div
							key={index}
							custom={index}
							initial={{ opacity: 0, y: 50 }}
							animate={controls}
							className="relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
						>
							{/* Blog Post Image */}
							<motion.div
								whileHover={{ scale: 1.05 }}
								transition={{
									duration: 0.4,
									ease: 'easeOut',
								}}
								className="relative"
							>
								<Image
									src={post.imageUrl}
									alt={post.title}
									className="w-full h-64 object-cover"
									width={1200}
									height={800}
								/>
								<div
									className="absolute inset-0 bg-blue-100 bg-opacity-20 -z-10 transform translate-x-2 translate-y-2 rounded-xl"
									style={{ backdropFilter: 'blur(12px)' }}
								></div>
							</motion.div>
							{/* Blog Post Content */}
							<div className="p-6 flex flex-col items-start text-left">
								<p className="text-sm text-gray-500 font-sans mb-2">
									{post.date}
								</p>
								<h3 className="text-xl font-serif font-semibold mb-3 text-gray-800 tracking-wide">
									{post.title}
								</h3>
								<p className="text-base text-gray-600 font-sans mb-4 line-clamp-3">
									{post.excerpt}
								</p>
								<motion.button
									whileHover={{
										scale: 1.1,
										backgroundColor: '#9c100e25',
									}}
									whileTap={{ scale: 0.95 }}
									className="px-6 py-2 text-base font-sans font-medium rounded-full shadow-md  bg-[#9c100e25] border border-[#9c100eb6] text-[#9C110E] transition-all duration-300 ease-in-out hover:shadow-lg"
									style={{ backdropFilter: 'blur(10px)' }}
								>
									Read More
								</motion.button>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default BlogSection;
