'use client';

import React, { useEffect, useState } from 'react';
import {
	motion,
	AnimatePresence,
	useAnimation,
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

// Define a type for project data for better type safety
interface Project {
	id: string; // Unique ID for each project for detail pages
	title: string;
	description: string;
	category: string;
	location: string;
	imageUrl: string;
	details?: string; // More detailed description for individual project pages
	year?: number; // Completion year
	client?: string; // Client name (optional)
	area?: string; // Project area/size (e.g., "5000 sq ft")
	// Add more fields as needed for a robust portfolio
}

const allProjects: Project[] = [
	{
		id: 'skyline-tower',
		title: 'Skyline Tower',
		description:
			'A modern high-rise blending sustainable materials with cutting-edge architectural design.',
		category: 'Architecture',
		location: 'New York, NY',
		imageUrl: '/images/projects/landing1.png',
		details:
			'Designed as a beacon of modern architecture and sustainability, Skyline Tower redefines urban living. Its innovative facade incorporates energy-efficient glazing, while internal systems optimize resource consumption. The project features mixed-use spaces including luxury residences, commercial offices, and ground-floor retail, all contributing to a vibrant city hub.',
		year: 2023,
		client: 'Apex Group',
		area: '500,000 sq ft',
	},
	{
		id: 'cozy-haven-residence',
		title: 'Cozy Haven Residence',
		description:
			'A beautifully crafted interior space combining comfort and elegance for modern living.',
		category: 'Interior Design',
		location: 'San Francisco, CA',
		imageUrl: '/images/projects/v3a.png',
		details:
			"This residential project focused on creating a serene and inviting atmosphere through a harmonious blend of natural materials, soft textures, and smart home technology. Every detail, from custom cabinetry to bespoke lighting, was meticulously chosen to enhance comfort and reflect the homeowner's sophisticated taste.",
		year: 2022,
		client: 'Private Client',
		area: '3,500 sq ft',
	},
	{
		id: 'urban-park-development',
		title: 'Urban Park Development',
		description:
			'A meticulously managed project delivering a vibrant public space on time and within budget.',
		category: 'Project Management',
		location: 'Chicago, IL',
		imageUrl: '/images/projects/pro1.jpg',
		details:
			'Spearheading the transformation of a derelict urban plot into a thriving community park. Our role encompassed full project lifecycle management, ensuring seamless coordination between landscape architects, city officials, and construction teams. The park now serves as a green lung for the city, featuring recreational areas, water features, and public art installations.',
		year: 2024,
		client: 'City of Chicago',
		area: '15 acres',
	},
	{
		id: 'riverside-walkway',
		title: 'Riverside Walkway',
		description:
			'Connecting urban spaces with nature through thoughtful landscape design.',
		category: 'Urban Planning',
		location: 'Austin, TX',
		imageUrl: '/images/projects/project-riverside.jpg', // Placeholder image from unsplash
		details:
			"A multi-phase urban planning initiative to rejuvenate the city's riverfront. The project included designing pedestrian walkways, bicycle paths, recreational zones, and integrating sustainable stormwater management solutions. The goal was to create an accessible and ecologically sensitive corridor that enhances public life and connection to nature.",
		year: 2021,
		client: 'Austin City Planning',
		area: '5 miles of riverfront',
	},
	{
		id: 'historic-district-renovation',
		title: 'Historic District Renovation',
		description:
			'Preserving heritage while integrating modern amenities and sustainable practices.',
		category: 'Restoration',
		location: 'Boston, MA',
		imageUrl: '/images/projects/project-historic.jpg', // Placeholder image from unsplash
		details:
			"Sensitive renovation of several landmark buildings within Boston's historic district. The project required careful adherence to preservation guidelines while introducing modern infrastructure and energy-efficient systems. Our work ensured the buildings maintained their original charm while offering contemporary functionality.",
		year: 2020,
		client: 'Boston Historic Trust',
		area: 'Multiple Buildings',
	},
	{
		id: 'tech-campus-landscape',
		title: 'Tech Campus Landscape',
		description:
			'Designing green spaces that foster innovation and well-being for a tech giant.',
		category: 'Landscape Architecture',
		location: 'Seattle, WA',
		imageUrl: '/images/projects/project-techcampus.jpg', // Placeholder image from unsplash
		details:
			'Development of an expansive, integrated landscape for a cutting-edge tech campus. The design focused on creating diverse outdoor work and relaxation zones, incorporating native plant species, and implementing smart irrigation systems to promote biodiversity and employee well-being.',
		year: 2023,
		client: 'Global Tech Corp',
		area: '20 acres',
	},
	{
		id: 'luxury-beachfront-villa',
		title: 'Luxury Beachfront Villa',
		description:
			'An exclusive residential project offering panoramic ocean views and bespoke interior finishes.',
		category: 'Architecture',
		location: 'Malibu, CA',
		imageUrl: '/images/projects/project-villa.jpg', // New image
		details:
			'This ultra-luxury villa was designed to seamlessly blend indoor and outdoor living. Features include expansive glass walls, infinity pools, and smart home automation, all meticulously crafted to create an unparalleled living experience with direct access to the beach.',
		year: 2024,
		client: 'Private Client',
		area: '10,000 sq ft',
	},
	{
		id: 'commercial-office-fitout',
		title: 'Modern Office Fit-out',
		description:
			'Creating dynamic and collaborative workspaces for a growing startup.',
		category: 'Interior Design',
		location: 'Austin, TX',
		imageUrl: '/images/projects/project-office.jpg', // New image
		details:
			'A complete interior redesign for a fast-paced tech startup. The project focused on open-plan workspaces, dedicated collaboration zones, and vibrant break areas to foster creativity and productivity. Sustainable materials and biophilic design elements were integrated throughout.',
		year: 2022,
		client: 'Innovate Solutions Inc.',
		area: '25,000 sq ft',
	},
	{
		id: 'hospitality-resort',
		title: 'Desert Oasis Resort',
		description:
			'A luxurious resort complex offering an immersive guest experience in a unique desert landscape.',
		category: 'Architecture',
		location: 'Dubai, UAE',
		imageUrl: '/images/projects/project-resort.jpg', // New image
		details:
			'Designed to harmonize with its desert surroundings, this resort complex combines traditional Arabian architectural elements with modern luxury. It features private villas, a wellness center, and extensive landscaping with indigenous flora, creating an exclusive and serene retreat.',
		year: 2025,
		client: 'Desert Holdings',
		area: '50 acres',
	},
];

const ProjectsPage = () => {
	// For hero section animation
	const heroControls = useAnimation();

	const [selectedCategory, setSelectedCategory] =
		useState('All');
	const [filteredProjects, setFilteredProjects] = useState<
		Project[]
	>([]);

	// Dynamically get categories from allProjects
	const categories = [
		'All',
		...new Set(allProjects.map((p) => p.category)),
	];

	// Initial animation for the hero section
	useEffect(() => {
		heroControls.start({
			opacity: 1,
			y: 0,
			transition: { duration: 0.8, ease: 'easeOut' },
		});
	}, [heroControls]);

	// Filter projects based on selected category.
	// This useEffect will run on initial render and when selectedCategory changes.
	useEffect(() => {
		if (selectedCategory === 'All') {
			setFilteredProjects(allProjects);
		} else {
			setFilteredProjects(
				allProjects.filter(
					(p) => p.category === selectedCategory,
				),
			);
		}
	}, [selectedCategory]); // Dependency on selectedCategory

	// Variant for individual project cards for staggered animation
	const cardVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: i * 0.1, // Stagger delay
				duration: 0.6,
				ease: 'easeOut',
			},
		}),
	};

	return (
		<main className="bg-white text-gray-900">
			{/* Hero Section */}
			<section
				className={`relative h-[55vh] flex items-center justify-center text-center bg-cover bg-center`}
				style={{
					backgroundImage: 'url(/images/projects/v2.png)',
				}} // Add a dedicated hero image for projects
			>
				<div className="absolute inset-0 bg-black/60"></div>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={heroControls} // Use heroControls for this animation
					className="relative z-10 px-4 sm:px-6 lg:px-8"
				>
					<h1
						className={`text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight mb-4 ${playfair.className}`}
					>
						Our Distinguished Portfolio
					</h1>
					<p
						className={`text-lg sm:text-xl text-white/90 max-w-3xl mx-auto ${work_sans.className}`}
					>
						Explore a curated collection of our most iconic
						architectural and design projects, showcasing
						our commitment to excellence.
					</p>
				</motion.div>
			</section>

			{/* Main Projects Grid Section */}
			<section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white text-gray-900">
				<div className="max-w-7xl mx-auto">
					{/* Section Header */}
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }} // Simple animate for this section header
						transition={{ duration: 0.6, ease: 'easeOut' }}
						className="mb-16 text-center"
					>
						<div className="flex items-center justify-center gap-4 mb-4">
							<div className="h-px w-16 bg-[#9C110E]"></div>
							<h2
								className={`text-4xl sm:text-5xl font-serif font-bold leading-tight tracking-tight ${playfair.className}`}
							>
								Featured{' '}
								<span className="text-[#9C110E]">
									Works
								</span>
							</h2>
							<div className="h-px w-16 bg-[#9C110E]"></div>
						</div>
						<p
							className={`text-lg text-gray-600 font-sans max-w-2xl mx-auto ${work_sans.className}`}
						>
							Our portfolio is a testament to our passion
							for innovative design and meticulous
							execution.
						</p>
					</motion.div>

					{/* Category Filter */}
					<div className="mb-12 flex flex-wrap justify-center gap-3 sm:gap-4">
						{categories.map((category) => (
							<motion.button
								key={category}
								onClick={() =>
									setSelectedCategory(category)
								}
								className={`px-6 py-2 rounded-full text-lg font-medium transition-all duration-300 ease-in-out ${
									selectedCategory === category
										? 'bg-[#9C110E] text-white shadow-lg'
										: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
								} ${work_sans.className}`}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								{category}
							</motion.button>
						))}
					</div>

					{/* Projects Grid */}
					<motion.div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
						// Key allows AnimatePresence to detect changes in children for exit/enter animations
						key={selectedCategory} // Important: This remounts the grid on category change
					>
						<AnimatePresence mode="wait">
							{' '}
							{/* Wait for exit animation to complete before new enter */}
							{filteredProjects.map((project, index) => (
								<motion.div
									key={project.id} // Use unique project ID as key for each individual item
									custom={index}
									// variants={cardVariants}
									initial="hidden"
									animate="visible"
									exit="hidden" // Animate out when filtered
									className="relative rounded-2xl shadow-xl overflow-hidden group cursor-pointer transform hover:scale-103 transition-all duration-500 ease-out"
									style={{
										backgroundImage: `url(${project.imageUrl})`,
										backgroundSize: 'cover',
										backgroundPosition: 'center',
										minHeight: '400px', // Consistent height for cards
									}}
								>
									<Link
										href={`/projects/${project.id}`}
										passHref
									>
										{/* Darkened Overlay */}
										<motion.div className="absolute inset-0 bg-black/20 group-hover:bg-opacity-50 transition-all duration-500 ease-out"></motion.div>

										{/* Project Content */}
										<div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-start text-white">
											<div
												className="bg-white/10 rounded-lg p-5 w-full text-left"
												style={{
													backdropFilter: 'blur(8px)',
												}}
											>
												<p className="text-sm font-sans uppercase tracking-wider text-[#9C110E] mb-2 font-semibold">
													{project.category}
												</p>
												<h3
													className={`text-2xl font-serif font-semibold text-white mb-2 tracking-wide ${playfair.className}`}
												>
													{project.title}
												</h3>
												<p
													className={`text-base font-sans text-gray-200 mb-4 ${work_sans.className}`}
												>
													{project.location}
												</p>
												<motion.button
													whileHover={{
														scale: 1.05,
														backgroundColor: '#ffffff',
														color: '#9C110E',
													}}
													whileTap={{ scale: 0.95 }}
													className={`px-6 py-3 text-base font-sans font-medium rounded-full shadow-md bg-[#9c100e20] border border-[#f1f1f1] text-white transition-all duration-300 ease-in-out hover:shadow-lg ${work_sans.className}`}
													style={{
														backdropFilter: 'blur(10px)',
													}}
												>
													View Details
												</motion.button>
											</div>
										</div>
									</Link>
								</motion.div>
							))}
						</AnimatePresence>
					</motion.div>

					{/* "Load More" or Pagination (Optional, if you have many projects) */}
					{/* For this example, we'll assume all projects are displayed.
                        If you have hundreds, you'd implement pagination here.
                    */}
					{/* <div className="mt-16 text-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-4 bg-gray-800 text-white font-bold rounded-full shadow-lg hover:bg-gray-700 transition duration-300 ease-in-out text-lg"
                        >
                            Load More Projects
                        </motion.button>
                    </div> */}
				</div>
			</section>

			{/* Call to Action Section */}
			<section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#9C110E] text-white text-center">
				<div className="max-w-4xl mx-auto">
					<h2
						className={`text-4xl sm:text-5xl font-extrabold mb-6 ${playfair.className}`}
					>
						Ready to Envision Your Next Project?
					</h2>
					<p
						className={`text-lg sm:text-xl leading-relaxed mb-8 ${work_sans.className}`}
					>
						Let Arc9 Consult bring your architectural
						aspirations to life.
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
							Discuss Your Vision
						</motion.button>
					</Link>
				</div>
			</section>
		</main>
	);
};

export default ProjectsPage;
