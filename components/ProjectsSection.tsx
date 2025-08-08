'use client';
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import {
	Playfair_Display,
	Work_Sans,
} from 'next/font/google';
import { useRouter } from 'next/navigation';

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

const ProjectsSection = () => {
	const projects = [
		{
			title: 'Galilee Tower',
			description:
				'A modern high-rise blending sustainable materials with cutting-edge architectural design.',
			category: 'Architecture',
			location: 'Banana Island, Lagos',
			imageUrl: '/images/home/projects/architecture.png',
		},
		{
			title: 'Dining room',
			description:
				'A beautifully crafted interior space combining comfort and elegance for modern living.',
			category: 'Interior Design',
			location: 'Banana Island, Lagos',
			imageUrl: '/images/home/projects/interior.png',
		},
		{
			title: 'Luxury Residential High-Rise ',
			description:
				'A meticulously managed project delivering a vibrant public space on time and within budget.',
			category: 'Project Management',
			location: 'Bourdillon, Ikoyi, Lagos',
			imageUrl: '/images/home/projects/project2.png',
		},
		{
			title: 'Riverside Walkway',
			description:
				'Connecting urban spaces with nature through thoughtful landscape design.',
			category: 'Urban Planning',
			location: 'Austin, TX',
			imageUrl:
				'https://via.placeholder.com/600x750/BEE9E4/000000?text=Riverside+Walk',
		},
		
	];

	const router = useRouter();

	const controls = useAnimation();

	// Animation for the section header
	useEffect(() => {
		controls.start({
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: 'easeOut' },
		});
	}, [controls]);

	// Animation for project cards
	const cardControls = useAnimation();
	useEffect(() => {
		cardControls.start((i) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: i * 0.15, // Slightly staggered animation for each card
				duration: 0.8,
				ease: 'easeOut',
			},
		}));
	}, [cardControls]);

	return (
		<section
			id="projects"
			className="py-14 md:py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white text-gray-900"
		>
			<div className="max-w-7xl mx-auto text-center">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={controls}
					className="mb-16"
				>
					<div className="flex items-center justify-center gap-4 mb-4">
						<div className="h-px w-16 bg-[#9C110E]"></div>
						<h2
							className={`text-4xl sm:text-5xl font-serif font-bold leading-tight tracking-tight ${playfair.className}`}
						>
							Our{' '}
							<span className="text-[#9C110E]">
								Projects
							</span>
						</h2>
						<div className="h-px w-16 bg-[#9C110E]"></div>
					</div>
					<p
						className={`text-lg text-gray-600 font-sans max-w-2xl mx-auto ${work_sans.className}`}
					>
						Explore our portfolio of innovative projects
						showcasing creativity, precision, and
						excellence.
					</p>
				</motion.div>

				{/* Grid container for project cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{/* Limiting to the first 3 projects for the initial display */}
					{projects.slice(0, 3).map((project, index) => (
						<motion.div
							key={index}
							custom={index}
							initial={{ opacity: 0, y: 50 }}
							animate={cardControls}
							className="relative rounded-2xl shadow-xl overflow-hidden group cursor-pointer transform hover:scale-103 transition-all duration-500 ease-out"
							style={{
								backgroundImage: `url(${project.imageUrl})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								minHeight: '600px', // Adjusted height for better 3-column display
							}}
						>
							{/* Darkened Overlay */}
							<motion.div className="absolute inset-0 bg-black/20 bg-opacity-20 group-hover:bg-opacity-50 transition-all duration-500 ease-out"></motion.div>
							{/* Project Content */}
							<div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-end text-white">
								<div
									className="bg-white/10 bg-opacity-90 rounded-lg p-5 w-full text-left"
									style={{ backdropFilter: 'blur(8px)' }}
								>
									<p className="text-sm font-sans uppercase tracking-wider text-red-800 mb-2">
										{project.category}
									</p>
									<h3 className="text-xl font-serif font-semibold text-white mb-2 tracking-wide">
										{project.title}
									</h3>
									<p className="text-sm font-sans text-gray-100 mb-4">
										{project.location}
									</p>
									<motion.button
										whileHover={{
											scale: 1.05,
											backgroundColor: '#bfdbfe',
											color: '#1e40af',
										}}
										whileTap={{ scale: 0.95 }}
										className="px-5 py-2 text-sm font-sans font-medium rounded-full shadow-md bg-blue-100 border border-blue-200 text-blue-700 transition-all duration-300 ease-in-out hover:shadow-lg"
										style={{ backdropFilter: 'blur(10px)' }}
									>
										View Project
									</motion.button>
								</div>
							</div>
						</motion.div>
					))}
				</div>

				{/* "View More Projects" Button */}
				<div className="mt-16">
					<motion.button
						whileHover={{
							scale: 1.05,
							boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
						}}
						whileTap={{ scale: 0.95 }}
						className="px-10 py-4 bg-blue-700 cursor-pointer text-white font-bold rounded-full shadow-lg hover:bg-blue-800 transition duration-300 ease-in-out text-lg"
						// You can replace this with a Next.js Link component or a function to navigate
						onClick={() =>
							router.push('/projects')
						}
					>
						View More Projects
					</motion.button>
				</div>
			</div>
		</section>
	);
};

export default ProjectsSection;
