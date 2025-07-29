'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import Image from 'next/image';

interface NavLinkProps {
	href: string;
	children: React.ReactNode;
	onClick?: () => void;
	isTransparent?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({
	href,
	children,
	onClick,
	isTransparent,
}) => (
	<Link
		href={href}
		className={`relative block py-2 px-4 text-lg font-heading transition-all duration-300 rounded-full ${
			!isTransparent
				? 'text-neutral-800 hover:text-neutral-900 hover:bg-neutral-100/30'
				: 'text-white/90 hover:text-white hover:bg-white/20'
		}`}
		onClick={onClick}
	>
		{children}
		<motion.span
			className={`absolute bottom-0 left-0 h-[2px] ${
				isTransparent ? 'bg-neutral-800' : 'bg-white/80'
			}`}
			initial={{ scaleX: 0 }}
			whileHover={{ scaleX: 1 }}
			transition={{ duration: 0.3, ease: 'easeInOut' }}
			style={{ originX: 0 }}
		/>
	</Link>
);

const MobileNavLink: React.FC<NavLinkProps> = ({
	href,
	children,
	onClick,
}) => (
	<Link
		href={href}
		className="block text-4xl font-heading text-neutral-800 hover:text-neutral-900 hover:bg-neutral-100/30 py-4 px-6 transition-all duration-300 rounded-md"
		onClick={onClick}
	>
		{children}
	</Link>
);

const Navbar: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const scrollY = useRef(0);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const handleScroll = () => {
				const scrollThreshold = 100;
				if (window.scrollY > scrollThreshold) {
					setScrolled(true);
				} else {
					setScrolled(false);
				}
			};

			window.addEventListener('scroll', handleScroll);
			return () => {
				window.removeEventListener('scroll', handleScroll);
			};
		}
	}, []);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (isOpen) {
				// When modal opens, save current scroll position
				scrollY.current = window.scrollY;

				// Apply fixed positioning to body, accounting for scroll
				document.body.style.position = 'fixed';
				document.body.style.top = `-${scrollY.current}px`;
				document.body.style.width = '100%';
				document.body.style.overflow = 'hidden';
			} else {
				// When modal closes, restore body's original position and scroll
				document.body.style.position = '';
				document.body.style.top = '';
				document.body.style.width = '';
				document.body.style.overflow = '';
				window.scrollTo(0, scrollY.current); // Scroll back to saved position
			}
			// Clean up on component unmount
			return () => {
				document.body.style.position = '';
				document.body.style.top = '';
				document.body.style.width = '';
				document.body.style.overflow = '';
			};
		}
	}, [isOpen]);

	const navLinks = [
		{ name: 'About us', href: '/about' },

		{ name: 'Services', href: '/services' },
		{ name: 'Projects', href: '/projects' },
		{ name: 'Blog', href: '/blog' },
	];

	const modalVariants = {
		hidden: { opacity: 0, x: '100vw' },
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				type: 'spring',
				stiffness: 100,
				damping: 15,
				staggerChildren: 0.1,
				when: 'beforeChildren',
			},
		},
		exit: {
			opacity: 0,
			x: '100vw',
			transition: {
				ease: 'easeInOut',
				duration: 0.3,
				staggerChildren: 0.05,
				staggerDirection: -1,
			},
		},
	};

	const linkVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: 50 },
	};

	return (
		<motion.nav
			initial={{ y: -100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.5, ease: 'easeOut' }}
			className={`fixed w-full top-0 z-50 transition-all duration-300 ${
				scrolled
					? 'bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg'
					: 'bg-transparent shadow-none'
			}`}
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
				{/* Logo/Brand (Left) */}
				<Link
					href="/"
					className={`flex items-center space-x-2 text-2xl font-heading ${
						scrolled
							? 'text-white/90 hover:text-white'
							: 'text-neutral-800 hover:text-neutral-900'
					}`}
				>
					{scrolled ? (
						<Image
							src={'/images/logo_full_2.png'}
							alt={'Arc9 Consult Logo'}
							width={150}
							height={150}
							priority={true}
						/>
					) : (
						<Image
							src={'/images/logo_full.png'}
							alt={'Arc9 Consult Logo'}
							width={150}
							height={150}
							priority={true}
						/>
					)}
				</Link>

				{/* Desktop Navigation Links (Middle) */}
				<div className="hidden md:flex flex-1 justify-center">
					<div
						className={`flex items-center space-x-8 rounded-full px-6 py-2 ${'bg-white/10 backdrop-blur-md border border-white/20 shadow-lg'}`}
					>
						{navLinks.map((link) => (
							<NavLink
								key={link.name}
								href={link.href}
								isTransparent={!scrolled}
							>
								{link.name}
							</NavLink>
						))}
					</div>
				</div>

				{/* Consultation Button (Right) */}
				<div className="hidden md:flex">
					<Link href={'/contact'} passHref>
						<motion.button
							className={`px-8 py-3 rounded-full text-lg font-body transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-neutral-300/50 ${
								!scrolled
									? 'bg-white/10 backdrop-blur-md border border-white/20 text-white/90 hover:text-white hover:bg-white/20'
									: 'bg-neutral-800 text-white hover:bg-neutral-900'
							}`}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							Contact us
						</motion.button>
					</Link>
				</div>

				{/* Mobile Menu Button */}
				<div className="md:hidden">
					<button
						onClick={() => setIsOpen(true)}
						className={`focus:outline-none focus:ring-2 focus:ring-neutral-300/50 ${
							!scrolled
								? 'text-white/90 hover:text-white'
								: 'text-neutral-800 hover:text-neutral-900'
						}`}
						aria-label="Open mobile menu"
					>
						<RiMenu3Line size={28} />
					</button>
				</div>
			</div>

			{/* Full-Screen Mobile Menu Modal */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className={`fixed inset-0 z-[60] flex flex-col items-center p-8 md:hidden ${
							scrolled
								? 'bg-white/10 backdrop-blur-md border-t border-white/20'
								: 'bg-neutral-50'
						}`}
						// variants={modalVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
					>
						{/* Close Button */}
						<button
							onClick={() => setIsOpen(false)}
							className={`absolute top-6 right-6 focus:outline-none focus:ring-2 focus:ring-neutral-300/50 ${
								scrolled
									? 'text-white/90 hover:text-white'
									: 'text-neutral-800 hover:text-neutral-900'
							}`}
							aria-label="Close mobile menu"
						>
							<RiCloseLine size={36} />
						</button>

						{/* Navigation Links - SCROLLABLE CONTAINER */}
						<motion.div
							className="flex flex-col items-center w-full max-h-full overflow-y-auto py-12"
							style={{ paddingTop: 'calc(4rem + 24px)' }}
						>
							{navLinks.map((link) => (
								<motion.div
									key={link.name}
									variants={linkVariants}
								>
									<MobileNavLink
										href={link.href}
										onClick={() => setIsOpen(false)}
									>
										{link.name}
									</MobileNavLink>
								</motion.div>
							))}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.nav>
	);
};

export default Navbar;
