'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
	ArrowUp,
	Twitter,
	Linkedin,
	Instagram,
} from 'lucide-react';

// Footer Component
const Footer = () => {
	const handleScrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<footer className="py-12 px-4 sm:px-6 lg:px-8 bg-[#121212] text-white">
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* Logo and Company Info */}
					<div className="flex flex-col items-center md:items-start">
						<div className="mb-4">
							<img
								src="/images/logo.png"
								alt="Arc9 Consult Logo"
								className="h-12 w-auto"
							/>
						</div>
						<p className="text-sm font-sans text-gray-400 text-center md:text-left">
							Crafting innovative architecture, interiors,
							and project solutions with precision and
							creativity.
						</p>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-lg font-serif font-semibold text-[#9c100eab] mb-4">
							Quick Links
						</h3>
						<ul className="space-y-2 text-sm font-sans text-gray-400">
							<li>
								<a
									href="#services"
									className="hover:text-[#9c100eab] transition-colors duration-300"
								>
									Services
								</a>
							</li>
							<li>
								<a
									href="#blog"
									className="hover:text-[#9c100eab] transition-colors duration-300"
								>
									Blog
								</a>
							</li>
							<li>
								<a
									href="#projects"
									className="hover:text-[#9c100eab] transition-colors duration-300"
								>
									Projects
								</a>
							</li>
							<li>
								<a
									href="#contact"
									className="hover:text-[#9c100eab] transition-colors duration-300"
								>
									Contact
								</a>
							</li>
						</ul>
					</div>

					{/* Social Media Links */}
					<div>
						<h3 className="text-lg font-serif font-semibold text-[#9c100eab] mb-4">
							Follow Us
						</h3>
						<div className="flex space-x-4">
							<motion.a
								href="https://twitter.com"
								target="_blank"
								rel="noopener noreferrer"
								whileHover={{ scale: 1.2, rotate: 5 }}
								whileTap={{ scale: 0.9 }}
								className="text-gray-400 hover:text-blue-300 transition-colors duration-300"
							>
								<Twitter size={24} />
							</motion.a>
							<motion.a
								href="https://linkedin.com"
								target="_blank"
								rel="noopener noreferrer"
								whileHover={{ scale: 1.2, rotate: 5 }}
								whileTap={{ scale: 0.9 }}
								className="text-gray-400 hover:text-blue-300 transition-colors duration-300"
							>
								<Linkedin size={24} />
							</motion.a>
							<motion.a
								href="https://instagram.com"
								target="_blank"
								rel="noopener noreferrer"
								whileHover={{ scale: 1.2, rotate: 5 }}
								whileTap={{ scale: 0.9 }}
								className="text-gray-400 hover:text-blue-300 transition-colors duration-300"
							>
								<Instagram size={24} />
							</motion.a>
						</div>
					</div>

					{/* Back to Top */}
					<div className="flex justify-center md:justify-end">
						<motion.button
							onClick={handleScrollToTop}
							whileHover={{ scale: 1.1, y: -5 }}
							whileTap={{ scale: 0.95 }}
							className="flex items-center justify-center w-12 h-12 rounded-full bg-[#9c100eab] text-white shadow-md hover:bg-[#9c100ebd] transition-all duration-300"
							style={{ backdropFilter: 'blur(10px)' }}
						>
							<ArrowUp size={24} />
						</motion.button>
					</div>
				</div>
				<div className="mt-8 pt-8 border-t border-gray-800 text-center">
					<p className="text-sm font-sans text-gray-400">
						&copy; {new Date().getFullYear()} Arc9 Consult
						Limited. Built By{' '}
						<a
							className="underline text-[#9c100eab]"
							href="https://emmanueleze.vercel.app"
							target="_blank"
							rel="noopener noreferrer"
						>
							E.A.E
						</a>
						.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
