'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * PageLoader component displays an animated logo as a loading screen.
 * It animates the logo in, holds it briefly, and triggers a callback when complete.
 *
 * @param {Object} props - Component props.
 * @param {() => void} props.onAnimationComplete - Callback triggered when the animation and hold time are complete.
 */
const PageLoader = ({ onAnimationComplete }) => {
	useEffect(() => {
		const logoEntranceDuration = 1.0; // seconds
		const displayHoldTime = 0.5; // seconds
		const totalDelay =
			(logoEntranceDuration + displayHoldTime) * 1000; // Convert to ms
		const maxTimeout = 3000; // Fallback timeout to prevent infinite loading

		const timer = setTimeout(() => {
			console.log(
				'PageLoader: Triggering onAnimationComplete',
			);
			onAnimationComplete?.();
		}, totalDelay);

		// Fallback timeout to ensure loader doesn't persist
		const fallbackTimer = setTimeout(() => {
			console.warn(
				'PageLoader: Fallback timeout triggered',
			);
			onAnimationComplete?.();
		}, maxTimeout);

		return () => {
			clearTimeout(timer);
			clearTimeout(fallbackTimer);
		};
	}, [onAnimationComplete]);

	return (
		<motion.div
			className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#f1f1f1]"
			initial={{ opacity: 1 }}
			animate={{ opacity: 1 }}
			exit={{
				opacity: 0,
				transition: { duration: 0.5, ease: 'easeOut' },
			}}
			role="status"
			aria-live="polite"
			aria-label="Loading Arc9 Consult page"
		>
			<motion.div
				initial={{ scale: 0.5, opacity: 0 }}
				animate={{
					scale: [0.5, 1.1, 1],
					opacity: 1,
					transition: {
						type: 'spring',
						stiffness: 100,
						damping: 15,
						duration: 1.0,
						delay: 0.2,
					},
				}}
				className="relative w-48 h-48 md:w-64 md:h-64"
			>
				<Image
					src="/images/logo_full_2.png"
					alt="Arc9 Consult Logo"
					fill
					sizes="(max-width: 768px) 50vw, 25vw"
					priority
					className="object-contain"
					onError={() =>
						console.error(
							'PageLoader: Failed to load logo image',
						)
					}
					placeholder="empty" // Use 'blur' with blurDataURL if available
				/>
			</motion.div>
		</motion.div>
	);
};

export default PageLoader;
