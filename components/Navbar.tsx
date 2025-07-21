// src/components/Navbar.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react'; // Import useRef
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
		className={`relative block py-2 px-3 text-lg font-heading transition-colors duration-300 ${
			isTransparent
				? 'text-white hover:text-brandPrimary-light'
				: 'text-neutral-800 hover:text-brandPrimary-dark'
		}`}
		onClick={onClick}
	>
		{children}
		<motion.span
			className="absolute bottom-0 left-0 h-[2px] bg-brandPrimary w-full"
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
		className="block text-4xl font-heading text-neutral-900 hover:text-brandPrimary py-4 transition-colors duration-300"
		onClick={onClick}
	>
		{children}
	</Link>
);

const Navbar: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const scrollY = useRef(0); // Use useRef to store scroll position

	useEffect(() => {
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
	}, []);

	// ******* CRUCIAL CHANGE HERE *******
	useEffect(() => {
		if (isOpen) {
			// When modal opens, save current scroll position
			scrollY.current = window.scrollY;

			// Apply fixed positioning to body, accounting for scroll
			document.body.style.position = 'fixed';
			document.body.style.top = `-${scrollY.current}px`;
			document.body.style.width = '100%'; // Prevent horizontal shift if scrollbar disappears
			document.body.style.overflow = 'hidden'; // Keep this to prevent scrollbar
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
	}, [isOpen]); // Only run when isOpen changes

	const navLinks = [
		{ name: 'Home', href: '/' },
		{ name: 'About', href: '/about' },
		{ name: 'Services', href: '/services' },
		{ name: 'Projects', href: '/projects' },
		{ name: 'Blog', href: '/blog' },
		{ name: 'Contact', href: '/contact' },
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
					? 'bg-neutral-60/80 backdrop-blur-sm shadow-sm'
					: 'bg-transparent shadow-none'
			}`}
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
				{/* Logo/Brand */}
				<Link
					href="/"
					className={`flex items-center space-x-2 text-2xl font-heading ${
						scrolled
							? 'text-brandPrimary-dark'
							: 'text-white'
					}`}
				>
					<Image
						src={'/images/logo.png'}
						alt={'Arc9 Consult Logo'}
						width={50}
						height={50}
					/>
				</Link>

				{/* Desktop Navigation */}
				<div className="hidden md:flex space-x-8">
					{navLinks.map((link) => (
						<NavLink
							key={link.name}
							href={link.href}
							isTransparent={!scrolled}
						>
							{link.name}
						</NavLink>
					))}
					<motion.div className="">
						<Link href={'/contact'} passHref>
							<motion.button
								className="bg-brandPrimary hover:bg-brandPrimary-dark cursor-pointer text-white font-body px-8 py-3 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brandPrimary-light focus:ring-opacity-75"
								whileHover={{ scale: 1.0 }}
								whileTap={{ scale: 0.95 }}
							>
								Book a Consultation
							</motion.button>
						</Link>
					</motion.div>
				</div>

				{/* Mobile Menu Button */}
				<div className="md:hidden">
					<button
						onClick={() => setIsOpen(true)}
						className={`focus:outline-none focus:ring-2 focus:ring-brandPrimary ${
							scrolled ? 'text-neutral-800' : 'text-white'
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
						className="fixed inset-0 bg-neutral-50 z-[60] flex flex-col items-center p-8 md:hidden"
						// variants={modalVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
					>
						{/* Close Button */}
						<button
							onClick={() => setIsOpen(false)}
							className="absolute top-6 right-6 text-neutral-800 hover:text-brandPrimary focus:outline-none focus:ring-2 focus:ring-brandPrimary"
							aria-label="Close mobile menu"
						>
							<RiCloseLine size={36} />
						</button>

						{/* Navigation Links - SCROLLABLE CONTAINER */}
						<motion.div
							className="flex flex-col items-center w-full max-h-full overflow-y-auto py-12"
							style={{ paddingTop: 'calc(4rem + 24px)' }} // This needs to be responsive if header/close button changes
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
