'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
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

// Define a detailed type for a single blog post
interface BlogPost {
	slug: string; // Unique slug for the post's URL
	title: string;
	excerpt: string;
	imageUrl: string; // Main image for the blog post
	date: string;
	author: string;
	tags: string[];
	content: string; // Full content of the blog post (could be Markdown/HTML)
}

// Mock function to simulate fetching a single blog post by its slug
// In a real application, you'd fetch this from a CMS, database, or API
const getBlogPostBySlug = (
	slug: string,
): BlogPost | undefined => {
	const allBlogPosts: BlogPost[] = [
		{
			slug: 'designing-the-future-trends-in-modern-architecture',
			title:
				'Designing the Future: Trends in Modern Architecture',
			excerpt:
				'Explore the latest trends shaping the world of architecture, from sustainable materials to innovative designs that prioritize human well-being and environmental harmony.',
			imageUrl: '/images/blog/architecture-trends.jpg', // Ensure this image exists
			date: 'July 25, 2025',
			author: 'Arc9 Insights',
			tags: ['Architecture', 'Trends', 'Sustainability'],
			content: `
                <p>Modern architecture is constantly evolving, pushing the boundaries of what's possible while responding to the urgent demands of sustainability and human-centric design. At Arc9 Consult, we closely monitor these shifts to ensure our projects are not only aesthetically pleasing but also forward-thinking and responsible.</p>

                <h3 class="text-2xl font-bold mt-8 mb-4">1. Biophilic Design: Connecting with Nature</h3>
                <p>One of the most significant trends is biophilic design, which integrates natural elements and processes into built environments. This goes beyond just adding plants; it involves designing spaces that mimic natural patterns, maximize natural light and ventilation, and incorporate natural textures and materials. Research shows that biophilic design can improve occupant well-being, productivity, and reduce stress levels.</p>

                <h3 class="text-2xl font-bold mt-8 mb-4">2. Smart Buildings & IoT Integration</h3>
                <p>The Internet of Things (IoT) is transforming buildings into intelligent ecosystems. Smart buildings use sensors and interconnected devices to optimize energy consumption, enhance security, and personalize indoor environments. From automated lighting and climate control to predictive maintenance, these technologies are making buildings more efficient and responsive to their occupants' needs.</p>

                <h3 class="text-2xl font-bold mt-8 mb-4">3. Adaptive Reuse and Urban Regeneration</h3>
                <p>With a growing emphasis on sustainability, architects are increasingly looking at adaptive reuse – repurposing existing structures for new functions – rather than demolishing and rebuilding. This approach preserves historical character, reduces waste, and often revitalizes urban areas. It requires creative problem-solving and a deep understanding of structural integrity and modern building codes.</p>

                <h3 class="text-2xl font-bold mt-8 mb-4">4. Modular and Prefabricated Construction</h3>
                <p>To address the need for faster, more efficient, and often more affordable construction, modular and prefabricated techniques are gaining traction. Components are manufactured off-site in controlled environments, leading to higher quality, reduced waste, and quicker assembly times. This method is particularly impactful for repeatable housing designs and commercial developments.</p>

                <h3 class="text-2xl font-bold mt-8 mb-4">5. Resilient and Climate-Responsive Architecture</h3>
                <p>As climate change impacts become more evident, there's a heightened focus on designing buildings that are resilient to extreme weather events and adaptable to changing environmental conditions. This includes features like flood-resistant foundations, enhanced insulation, passive heating and cooling strategies, and integration of renewable energy sources.</p>

                <p>These trends highlight a future where architecture is not just about creating structures, but about fostering healthier, more sustainable, and more responsive environments for humanity.</p>
            `,
		},
		{
			slug: 'creating-timeless-interiors-a-design-philosophy',
			title:
				'Creating Timeless Interiors: A Design Philosophy',
			excerpt:
				'Learn how to craft interior spaces that blend functionality with timeless elegance and personal style. We discuss the principles of classic design, material selection, and how to create lasting beauty in any home or commercial space.',
			imageUrl: '/images/blog/timeless-interiors.jpg', // Ensure this image exists
			date: 'July 20, 2025',
			author: 'Aisha K.',
			tags: ['Interior Design', 'Home Decor', 'Style'],
			content: `
                <p>In the ephemeral world of trends, the pursuit of timeless interior design stands as a testament to enduring beauty and functionality. At Arc9 Consult, our philosophy centers on creating spaces that resonate with personal style while remaining relevant for years to come.</p>

                <h3 class="text-2xl font-bold mt-8 mb-4">The Essence of Timeless Design</h3>
                <p>Timeless design isn't about ignoring current trends entirely, but rather about selecting elements that transcend fleeting fads. It often involves a balanced blend of classic forms, quality materials, and a coherent color palette that brings tranquility and sophistication to a space. It emphasizes comfort and liveability, ensuring that the space serves its occupants beautifully for daily life.</p>

                <h3 class="text-2xl font-bold mt-8 mb-4">Key Principles We Follow:</h3>
                <ul>
                    <li><strong>Quality Over Quantity:</strong> Investing in well-crafted furniture and finishes ensures longevity and reduces the need for frequent replacements.</li>
                    <li><strong>Neutral Foundations:</strong> Using neutral colors for walls, large furniture pieces, and flooring provides a calm backdrop that can be easily updated with accessories and artwork.</li>
                    <li><strong>Classic Silhouettes:</strong> Opting for furniture with clean lines and balanced proportions that have stood the test of time.</li>
                    <li><strong>Natural Materials:</strong> Incorporating wood, stone, linen, wool, and cotton adds warmth, texture, and authenticity that never goes out of style.</li>
                    <li><strong>Functionality First:</strong> A well-designed space is one that works efficiently for its inhabitants, seamlessly integrating storage and practical solutions.</li>
                    <li><strong>Personal Touches:</strong> Allowing space for cherished items, art, and personal collections that tell a story and make the home uniquely yours.</li>
                </ul>

                <h3 class="text-2xl font-bold mt-8 mb-4">Crafting Your Timeless Space</h3>
                <p>Starting with a clear vision and understanding your lifestyle are paramount. Consider how you use each room, what feelings you want to evoke, and what existing pieces you cherish. Our designers work closely with clients to curate a collection of elements that reflect their individuality while adhering to principles that ensure lasting appeal.</p>

                <p>Ultimately, a timeless interior is a reflection of intentionality, a quiet confidence that values substance and comfort over passing whims. It’s an investment in enduring beauty that truly makes a house a home.</p>
            `,
		},
		{
			slug: 'mastering-project-management-in-construction',
			title: 'Mastering Project Management in Construction',
			excerpt:
				'Discover key strategies for managing construction projects efficiently, ensuring quality, timeliness, and budget adherence. This article delves into risk management, stakeholder communication, and technological advancements in project oversight.',
			imageUrl: '/images/blog/project-management.jpg', // Ensure this image exists
			date: 'July 15, 2025',
			author: 'David L.',
			tags: [
				'Project Management',
				'Construction',
				'Efficiency',
			],
			content: `
                <p>Successful construction projects are not just about grand designs; they are a testament to meticulous project management. At Arc9 Consult, we believe that effective oversight is the backbone of any build, ensuring that complex endeavors are completed on time, within budget, and to the highest quality standards.</p>

                <h3 class="text-2xl font-bold mt-8 mb-4">The Pillars of Construction Project Management:</h3>
                <ol>
                    <li><strong>Clear Scope Definition:</strong> Before breaking ground, a crystal-clear understanding of the project's scope, objectives, and deliverables is essential. Ambiguity here leads to delays and cost overruns.</li>
                    <li><strong>Rigorous Planning & Scheduling:</strong> Developing a detailed project plan, including a Work Breakdown Structure (WBS), Gantt charts, and critical path analysis, helps in sequencing tasks, allocating resources, and setting realistic timelines.</li>
                    <li><strong>Effective Resource Allocation:</strong> This involves managing manpower, materials, equipment, and finances optimally. Predicting needs and mitigating shortages are key.</li>
                    <li><strong>Robust Risk Management:</strong> Identifying potential risks (e.g., weather delays, material price fluctuations, labor shortages, regulatory changes) early and developing contingency plans is crucial to minimize disruptions.</li>
                    <li><strong>Stakeholder Communication:</strong> Keeping all parties – clients, contractors, suppliers, regulators, and end-users – informed and aligned through regular meetings and clear communication channels is vital for smooth progress.</li>
                    <li><strong>Quality Control & Assurance:</strong> Implementing strict quality checks at every stage ensures that the final product meets specified standards and client expectations.</li>
                    <li><strong>Budget Monitoring & Cost Control:</strong> Continuously tracking expenditures against the budget and taking corrective actions to prevent financial deviations is paramount.</li>
                    <li><strong>Leveraging Technology:</strong> Utilizing project management software, Building Information Modeling (BIM), drones for site monitoring, and digital collaboration tools enhances efficiency and accuracy.</li>
                </ol>

                <h3 class="text-2xl font-bold mt-8 mb-4">From Blueprint to Reality</h3>
                <p>Project management in construction is a dynamic field that demands foresight, adaptability, and strong leadership. It’s about more than just tasks; it’s about orchestrating a symphony of complex elements to bring architectural visions to tangible reality. Our experienced project managers are adept at navigating these complexities, ensuring a seamless journey from concept to completion.</p>
            `,
		},
		// Add more blog posts here following the same structure
	];
	return allBlogPosts.find((post) => post.slug === slug);
};

// Main Single Blog Post Page Component
const SingleBlogPostPage = ({
	params,
}: {
	params: { slug: string };
}) => {
	const { slug } = params;
	const post = getBlogPostBySlug(slug);

	// Initial animation for the content
	useEffect(() => {
		if (post) {
			// Can add more specific animations for elements within the content
		}
	}, [post]);

	if (!post) {
		// Handle case where post is not found
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
					<Link href="/blog">
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
			{/* Hero Section: Main Blog Post Image & Title */}
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
						{post.tags.join(' • ')} {/* Display tags */}
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
						{/*
                            WARNING: Using dangerouslySetInnerHTML is generally discouraged
                            due to XSS vulnerabilities if content is not sanitized.
                            For production, especially with user-generated content,
                            you should sanitize the HTML or use a Markdown renderer.
                        */}
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

			{/* Call to Action Section (Similar to other pages) */}
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
							className={`px-10 py-5 text-xl font-semibold rounded-full shadow-lg transition-all duration-300 ease-in-out
                            bg-white text-[#9C110E] hover:text-[#7b0d0c]
                            focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-opacity-75 ${work_sans.className}`}
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
