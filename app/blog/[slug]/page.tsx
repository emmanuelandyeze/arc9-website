'use client';
import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
	Playfair_Display,
	Work_Sans,
} from 'next/font/google';
import Link from 'next/link';

// Define fonts
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

// Define BlogPost type
interface BlogPost {
	slug: string;
	title: string;
	excerpt: string;
	imageUrl: string;
	date: string;
	author: string;
	tags: string[];
	content: string;
}

// Define PageProps for dynamic route
interface PageProps {
	params: { slug: string };
}

// Blog posts data
const allBlogPosts: BlogPost[] = [
	// Your blog post data here (unchanged)
	// ...
];

// Mock function to get a blog post by slug
const getBlogPostBySlug = (
	slug: string,
): BlogPost | undefined => {
	return allBlogPosts.find((post) => post.slug === slug);
};

// Main Single Blog Post Page Component
const SingleBlogPostPage: React.FC<PageProps> = ({
	params,
}) => {
	const { slug } = params;

	// Memoize post lookup
	const post = useMemo(
		() => getBlogPostBySlug(slug),
		[slug],
	);

	useEffect(() => {
		if (post) {
			console.log(`Blog post "${post.title}" viewed.`);
		}
	}, [post]);

	if (!post) {
		return (
			<main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-16">
				<div className="text-center">
					<h1
						className={`text-4xl font-extrabold text-[#9C110E] ${playfair.className}`}
					>
						Blog Post Not Found
					</h1>
					<p
						className={`mt-4 text-lg text-gray-700 ${work_sans.className}`}
					>
						The article you are looking for does not exist
						or has been moved.
					</p>
					<Link href="/blog" passHref>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className={`mt-8 px-8 py-3 bg-[#9C110E] text-white rounded-full shadow-lg hover:bg-[#7b0d0c] transition-all duration-300 ${work_sans.className}`}
						>
							Back to Blog
						</motion.button>
					</Link>
				</div>
			</main>
		);
	}

	return (
		<main className="bg-white text-gray-900">
			{/* Hero Section */}
			<section
				className="relative h-[60vh] md:h-[70vh] flex items-end justify-start bg-cover bg-center"
				style={{ backgroundImage: `url(${post.imageUrl})` }}
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
						{post.tags.join(' • ')}
					</p>
					<h1
						className={`text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-4 ${playfair.className}`}
					>
						{post.title}
					</h1>
					<div
						className={`flex items-center gap-4 text-xl font-medium ${work_sans.className}`}
					>
						<span>By {post.author}</span>
						<span className="text-gray-400">•</span>
						<span>{post.date}</span>
					</div>
				</motion.div>
			</section>

			{/* Blog Post Content Section */}
			<section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
				<div className="max-w-4xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className={`prose prose-lg max-w-none ${work_sans.className} text-gray-800`}
					>
						<div
							dangerouslySetInnerHTML={{
								__html: post.content,
							}}
						/>
					</motion.div>

					{/* Tags */}
					{post.tags.length > 0 && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.6 }}
							className="mt-12 pt-8 border-t border-gray-200"
						>
							<h3
								className={`text-2xl font-bold mb-4 ${playfair.className}`}
							>
								Tags:
							</h3>
							<div className="flex flex-wrap gap-2">
								{post.tags.map((tag) => (
									<span
										key={tag}
										className={`px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium ${work_sans.className}`}
									>
										{tag}
									</span>
								))}
							</div>
						</motion.div>
					)}

					{/* Back to Blog Button */}
					<div className="mt-16 text-center">
						<Link href="/blog" passHref>
							<motion.button
								whileHover={{
									scale: 1.05,
									backgroundColor: '#bfdbfe',
								}}
								whileTap={{ scale: 0.95 }}
								className={`px-8 py-3 bg-blue-100 border border-blue-200 text-blue-700 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out text-lg font-semibold ${work_sans.className}`}
							>
								← Back to All Articles
							</motion.button>
						</Link>
					</div>
				</div>
			</section>

			{/* Call to Action Section */}
			<section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#9C110E] text-white text-center">
				<div className="max-w-4xl mx-auto">
					<h2
						className={`text-4xl sm:text-5xl font-extrabold mb-6 ${playfair.className}`}
					>
						Ready to Discuss Your Project?
					</h2>
					<p
						className={`text-lg sm:text-xl leading-relaxed mb-8 ${work_sans.className}`}
					>
						Whether it's architectural design or interior
						planning, we're here to help bring your vision
						to life.
					</p>
					<Link href="/contact" passHref>
						<motion.button
							whileHover={{
								scale: 1.05,
								backgroundColor: '#ffffff',
							}}
							whileTap={{ scale: 0.95 }}
							className={`px-10 py-5 text-xl font-semibold rounded-full shadow-lg transition-all duration-300 ease-in-out bg-white text-[#9C110E] hover:text-[#7b0d0c] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-opacity-75 ${work_sans.className}`}
						>
							Contact Our Team
						</motion.button>
					</Link>
				</div>
			</section>
		</main>
	);
};

export default SingleBlogPostPage;
