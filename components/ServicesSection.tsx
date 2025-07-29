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
} from 'lucide-react';
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

// ServicesSection Component
const ServicesSection = () => {
	const services = [
		{
			icon: Building2,
			title: 'Architecture Design',
			description:
				'From conceptualization to detailed blueprints, we create innovative, functional, and aesthetically pleasing architectural designs that reflect your unique vision and needs.',
			imageUrl: '/images/projects/service1.png',
		},
		{
			icon: PencilRuler,
			title: 'Interior Design',
			description:
				'We transform interiors into captivating and comfortable spaces, focusing on optimizing layouts, selecting materials, and enhancing user experience.',
			imageUrl: '/images/projects/service2.png',
		},
		{
			icon: Briefcase,
			title: 'Project Management',
			description:
				'Our comprehensive project management ensures seamless execution, adherence to timelines, budget control, and high-quality results for every construction phase.',
			imageUrl: '/images/projects/service3.png',
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
			id="services"
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
							<span className="text-[#9C110E]">
								Expert Services
							</span>
						</h2>
						<div className="h-px w-16 bg-[#9C110E]"></div>
					</div>
					<p
						className={`text-lg text-gray-600 font-sans max-w-2xl mx-auto ${work_sans.className}`}
					>
						Discover our range of professional services
						designed to bring your vision to life with
						creativity and precision.
					</p>
				</motion.div>
				<div className="space-y-10 md:space-y-16">
					{services.map((service, index) => (
						<motion.div
							key={index}
							custom={index}
							initial={{ opacity: 0, y: 50 }}
							animate={controls}
							className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
								index % 2 === 1 ? 'md:flex-row-reverse' : ''
							}`}
						>
							{/* Service Image */}
							<div className="w-full md:w-3/5 relative">
								<motion.div
									whileHover={{
										scale: 1.05,
										rotate: index % 2 === 0 ? 2 : -2,
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
										className=" max-h-96 md:max-h-[36rem] object-cover rounded-xl"
										width={1200}
										height={800}
										priority={true}
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
									whileHover={{ scale: 1.02 }}
									transition={{ duration: 0.3 }}
									className="flex flex-col items-center md:items-start"
								>
									<service.icon
										size={56}
										className="text-[#9C110E] hidden md:block mb-6 transition-transform duration-300 group-hover:scale-110"
									/>
									<h3
										className={`text-3xl font-serif font-semibold mb-4 text-gray-800 tracking-wide ${playfair.className}`}
									>
										{service.title}
									</h3>
									<p
										className={`text-lg leading-relaxed text-gray-600 mb-8 font-sans ${work_sans.className}`}
									>
										{service.description}
									</p>
									<motion.button
										whileHover={{
											scale: 1.1,
											backgroundColor: '#9c100e25',
										}}
										whileTap={{ scale: 0.95 }}
										className="px-8 py-3 text-lg font-sans font-medium cursor-pointer rounded-full shadow-md bg-[#9c100e25] border border-[#9c100eb6] text-[#9C110E] transition-all duration-300 ease-in-out hover:shadow-lg"
										style={{ backdropFilter: 'blur(10px)' }}
									>
										Explore More
									</motion.button>
								</motion.div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ServicesSection;
