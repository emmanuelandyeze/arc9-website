'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import {
	Playfair_Display,
	Work_Sans,
} from 'next/font/google';
import {
	Building2,
	PencilRuler,
	Briefcase,
	DraftingCompass,
	Lightbulb,
	UserCheck,
} from 'lucide-react'; // Added more icons for expanded services
import Image from 'next/image';
import Link from 'next/link'; // For internal navigation

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

const ServicesPage = () => {
	// Expanded services data with more details for a dedicated page
	const services = [
		{
			icon: Building2,
			title: 'Architectural Design',
			shortDescription:
				'Innovative and functional designs for diverse spaces.',
			longDescription:
				'From initial concept sketches to detailed construction documents, our architectural design services cover residential, commercial, and institutional projects. We focus on creating spaces that are not only aesthetically captivating but also highly functional, sustainable, and tailored to your specific needs and aspirations. Our process involves deep collaboration, advanced visualization, and meticulous planning to bring your vision to life.',
			imageUrl: '/images/projects/service1.png',
			link: '/services/architectural-design', // Link to a sub-page for more details
		},
		{
			icon: PencilRuler,
			title: 'Interior Design & Space Planning',
			shortDescription:
				'Transforming interiors into captivating and comfortable environments.',
			longDescription:
				"Our interior design expertise transforms raw spaces into cohesive and inviting environments. We meticulously plan layouts, select furniture, fixtures, and equipment (FF&E), and advise on finishes and color palettes. Whether it's a residential renovation or a commercial fit-out, we create interiors that enhance user experience, optimize flow, and reflect your unique brand or personal style.",
			imageUrl: '/images/projects/service2.png',
			link: '/services/interior-design',
		},
		{
			icon: Briefcase,
			title: 'Project Management & Supervision',
			shortDescription:
				'Seamless execution from inception to completion.',
			longDescription:
				'We provide end-to-end project management services, ensuring your project is delivered on time, within budget, and to the highest quality standards. Our team oversees all phases, including contractor selection, scheduling, cost control, risk management, and on-site supervision. We act as your trusted advocate, ensuring seamless communication and coordination among all stakeholders.',
			imageUrl: '/images/projects/service3.png',
			link: '/services/project-management',
		},
		// {
		// 	icon: DraftingCompass,
		// 	title: 'Urban Planning & Development',
		// 	shortDescription:
		// 		'Shaping sustainable and vibrant urban landscapes.',
		// 	longDescription:
		// 		'Beyond individual buildings, we specialize in comprehensive urban planning. This includes master planning for new developments, revitalization strategies for existing areas, and feasibility studies. Our approach integrates social, economic, and environmental considerations to create livable, resilient, and economically viable communities.',
		// 	imageUrl: '/images/projects/service4.png', // Add new image for this service
		// 	link: '/services/urban-planning',
		// },
		// {
		// 	icon: Lightbulb,
		// 	title: 'Sustainable Design Consulting',
		// 	shortDescription:
		// 		'Integrating eco-friendly practices for a greener future.',
		// 	longDescription:
		// 		'Committed to environmental stewardship, we offer specialized consulting on sustainable design principles. This includes advising on energy-efficient solutions, renewable energy integration, passive design strategies, and the use of eco-friendly materials. We help clients achieve green building certifications and reduce their environmental footprint.',
		// 	imageUrl: '/images/projects/service5.png', // Add new image for this service
		// 	link: '/services/sustainable-design',
		// },
		// {
		// 	icon: UserCheck,
		// 	title: 'Feasibility Studies & Consultancy',
		// 	shortDescription:
		// 		'Expert insights to ensure project viability.',
		// 	longDescription:
		// 		'Before you break ground, our team conducts thorough feasibility studies to assess the technical, economic, and regulatory viability of your project. We provide detailed analyses, risk assessments, and strategic advice, empowering you to make informed decisions and optimize your investment.',
		// 	imageUrl: '/images/projects/service6.png', // Add new image for this service
		// 	link: '/services/feasibility-studies',
		// },
	];

	const controls = useAnimation();

	useEffect(() => {
		controls.start((i) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: i * 0.2, // Slightly reduced delay for a faster staggered animation on page load
				duration: 0.7,
				ease: 'easeOut',
			},
		}));
	}, [controls]);

	return (
		<main className="bg-white text-gray-900">
			{/* Hero Section for Services Page */}
			<section
				className={`relative h-[55vh] flex items-center justify-center text-center bg-cover bg-center`}
				style={{
					backgroundImage:
						'url(/images/projects/service4.png)',
				}} // Dedicated hero image for services
			>
				<div className="absolute inset-0 bg-black/60"></div>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="relative z-10 px-4 sm:px-6 lg:px-8"
				>
					<h1
						className={`text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight mb-4 ${playfair.className}`}
					>
						Our Comprehensive Services
					</h1>
					<p
						className={`text-lg sm:text-xl text-white/90 max-w-3xl mx-auto ${work_sans.className}`}
					>
						Bringing your architectural dreams to life with
						precision, creativity, and expertise across a
						wide range of specialties.
					</p>
				</motion.div>
			</section>

			{/* Introduction to Services */}
			<section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
				<div className="max-w-7xl mx-auto text-center">
					<motion.h2
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.6 }}
						className={`text-4xl sm:text-5xl font-extrabold mb-6 leading-tight ${playfair.className}`}
					>
						Building Future, One Service at a Time
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4, duration: 0.6 }}
						className={`text-lg sm:text-xl leading-relaxed text-gray-700 max-w-3xl mx-auto ${work_sans.className}`}
					>
						At Arc9 Consult, we offer a full spectrum of
						architectural and design services tailored to
						meet the unique demands of every project. Our
						dedicated team combines artistic vision with
						technical precision to deliver outstanding
						results.
					</motion.p>
				</div>
			</section>

			{/* Detailed Services Listing - Enhanced from homepage section */}
			<section className="py-14 md:py-14 px-4 sm:px-6 lg:px-8 bg-white text-gray-900">
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
								<span className="text-[#9C110E]">
									Comprehensive Offerings
								</span>
							</h2>
							<div className="h-px w-16 bg-[#9C110E]"></div>
						</div>
						<p
							className={`text-lg text-gray-600 font-sans max-w-2xl mx-auto ${work_sans.className}`}
						>
							Explore our diverse range of services, each
							meticulously crafted to ensure excellence and
							client satisfaction.
						</p>
					</motion.div>

					<div className="space-y-16">
						{' '}
						{/* Increased space for better separation on a full page */}
						{services.map((service, index) => (
							<motion.div
								key={index}
								custom={index}
								initial={{ opacity: 0, y: 50 }}
								animate={controls}
								className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
									index % 2 === 1
										? 'md:flex-row-reverse'
										: ''
								} bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg p-6 md:p-10 transform transition-transform duration-500 hover:scale-[1.01] hover:shadow-2xl`}
							>
								{/* Service Image */}
								<div className="w-full md:w-3/5 relative group">
									<motion.div
										whileHover={{
											scale: 1.03, // Slightly less aggressive hover for main service blocks
											rotate: index % 2 === 0 ? 1 : -1,
										}}
										transition={{
											duration: 0.4,
											ease: 'easeOut',
										}}
										className="relative z-10 overflow-hidden rounded-xl shadow-lg"
									>
										<Image
											src={service.imageUrl}
											alt={service.title}
											className="w-full h-auto max-h-96 md:max-h-[36rem] object-cover rounded-xl"
											width={1200}
											height={800}
											priority={index < 2} // Prioritize loading the first few images
										/>
									</motion.div>
									{/* Background Accent */}
									<div
										className="absolute inset-0 bg-blue-100 bg-opacity-30 rounded-xl -z-10 transform translate-x-4 translate-y-4"
										style={{ backdropFilter: 'blur(12px)' }}
									></div>
								</div>

								{/* Service Text Content */}
								<div className="w-full md:w-2/5 text-center md:text-left">
									<motion.div
										whileHover={{
											x: index % 2 === 0 ? 5 : -5,
										}} // Subtle text shift on hover
										transition={{ duration: 0.3 }}
										className="flex flex-col items-center md:items-start"
									>
										<service.icon
											size={64} // Larger icon for more prominence
											className="text-[#9C110E] mb-6 transition-transform duration-300 group-hover:scale-110"
										/>
										<h3
											className={`text-3xl sm:text-4xl font-serif font-bold mb-4 text-gray-800 tracking-wide ${playfair.className}`}
										>
											{service.title}
										</h3>
										<p
											className={`text-lg leading-relaxed text-gray-700 mb-8 font-sans ${work_sans.className}`}
										>
											{service.longDescription}{' '}
											{/* Use longDescription */}
										</p>
										{/* <Link href={service.link}>
											<motion.button
												whileHover={{
													scale: 1.05,
													backgroundColor: '#9c100e25',
												}}
												whileTap={{ scale: 0.98 }}
												className="px-10 py-4 text-lg font-sans font-medium cursor-pointer rounded-full shadow-md bg-[#9c100e20] border border-[#9c100eb6] text-[#9C110E] transition-all duration-300 ease-in-out hover:shadow-lg"
												style={{
													backdropFilter: 'blur(10px)',
												}}
											>
												Learn More
											</motion.button>
										</Link> */}
									</motion.div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Why Choose Arc9 Consult Section */}
			<section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">
				<div className="max-w-7xl mx-auto text-center">
					<h2
						className={`text-4xl sm:text-5xl font-extrabold mb-6 leading-tight ${playfair.className}`}
					>
						Why Choose{' '}
						<span className="text-[#9C110E]">
							Arc9 Consult?
						</span>
					</h2>
					<p
						className={`text-lg sm:text-xl leading-relaxed text-gray-700 max-w-3xl mx-auto mb-12 ${work_sans.className}`}
					>
						Our commitment to excellence, innovation, and
						client satisfaction sets us apart.
					</p>
					<div className="grid md:grid-cols-3 gap-8">
						<div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
							<h3
								className={`text-2xl font-bold mb-3 ${playfair.className}`}
							>
								Client-Centric Approach
							</h3>
							<p
								className={`text-gray-700 ${work_sans.className}`}
							>
								We prioritize your vision, working closely
								with you from concept to completion to
								ensure your aspirations are realized.
							</p>
						</div>
						<div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
							<h3
								className={`text-2xl font-bold mb-3 ${playfair.className}`}
							>
								Innovative & Sustainable
							</h3>
							<p
								className={`text-gray-700 ${work_sans.className}`}
							>
								Our designs blend cutting-edge innovation
								with sustainable practices, creating spaces
								that are both modern and environmentally
								responsible.
							</p>
						</div>
						<div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
							<h3
								className={`text-2xl font-bold mb-3 ${playfair.className}`}
							>
								Experienced Team
							</h3>
							<p
								className={`text-gray-700 ${work_sans.className}`}
							>
								Benefit from our team's extensive experience
								and deep industry knowledge, ensuring
								professional and high-quality outcomes.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Call to Action Section */}
			<section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#9C110E] text-white text-center">
				<div className="max-w-4xl mx-auto">
					<h2
						className={`text-4xl sm:text-5xl font-extrabold mb-6 ${playfair.className}`}
					>
						Ready to Begin Your Project?
					</h2>
					<p
						className={`text-lg sm:text-xl leading-relaxed mb-8 ${work_sans.className}`}
					>
						Let's discuss how our expertise can bring your
						architectural vision to life.
					</p>
					<Link href="/contact">
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
							Get a Free Consultation
						</motion.button>
					</Link>
				</div>
			</section>
		</main>
	);
};

export default ServicesPage;
