// src/components/LogoLoader.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface LogoLoaderProps {
	onAnimationComplete: () => void; // Callback when the loader animation finishes
}

const LogoLoader: React.FC<LogoLoaderProps> = ({
	onAnimationComplete,
}) => {
	const textToType = 'Building tomorrow, today...';
	// Calculate the number of steps based on text length for a smoother "typing" feel
	// Roughly 1 step per character for typing effect
	const numberOfSteps = textToType.length + 2; // Add a couple extra steps for transition smoothness

	const typingDuration = 2; // Reduced duration slightly for faster perception, adjust as needed
	const typingDelay = 1.0; // Delay before typing starts (after logo animation begins)

	const textVariants = {
		hidden: {
			opacity: 0,
			width: 0,
			// Start at 50% from the left, then translate back by half its current width.
			// This is effectively its center. For an initial width of 0, this aligns it left.
			x: 0,
		},
		visible: {
			opacity: 1,
			width: 'auto', // Allow width to be determined by content
			x: '0%', // Reset x position. The centering is handled by the parent flexbox.
			transition: {
				// Animate opacity quickly, then reveal characters
				opacity: { delay: typingDelay, duration: 0.1 },
				// Use a keyframe animation for the "typing" effect on the text content itself
				// This will make characters appear one by one.
			},
		},
		exit: {
			opacity: 0,
			y: -20,
			transition: { duration: 0.3 },
		},
	};

	// Variants for individual characters for the typing effect
	const characterVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	};

	return (
		<motion.div
			className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#f1f1f1]"
			initial={{ opacity: 1 }}
			animate={{ opacity: 1 }}
			exit={{
				opacity: 0,
				transition: { duration: 0.5, ease: 'easeOut' },
			}}
			onAnimationComplete={() => {
				onAnimationComplete();
			}}
		>
			<motion.div
				initial={{ scale: 0.5, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{
					type: 'spring',
					stiffness: 100,
					damping: 15,
					duration: 1.0, // Main logo animation duration
				}}
				className="relative w-48 h-48 md:w-64 md:h-64"
			>
				<Image
					src="/images/logo_full_2.png" // Ensure this logo looks good on #f1f1f1 background
					alt="Arc9 Consult Logo Loader"
					fill
					sizes="(max-width: 768px) 50vw, 25vw"
					priority
					className="object-contain"
				/>
			</motion.div>

			{/* NEW APPROACH: Animate each character for true typing effect */}
			<motion.div
				className="mt-8 text-[#121212] text-lg font-semibold text-center" // Ensure parent container is centered
			>
				{/* Apply stagger and individual character animation */}
				<motion.span
					variants={textVariants} // Overall container for timing
					initial="hidden"
					animate="visible"
					exit="exit"
					style={{ display: 'inline-block' }} // Needed for character animations
				>
					{Array.from(textToType).map((char, i) => (
						<motion.span
							key={i} // Use index as key (safe for static text)
							variants={characterVariants}
							// Stagger each character's appearance
							animate={{ opacity: 1 }}
							initial={{ opacity: 0 }}
							transition={{
								duration: 0.05, // How long each character takes to appear
								delay:
									typingDelay +
									i * (typingDuration / numberOfSteps), // Stagger calculation
							}}
						>
							{char === ' ' ? '\u00A0' : char}{' '}
							{/* Render nbsp for spaces to maintain layout */}
						</motion.span>
					))}
				</motion.span>
			</motion.div>
		</motion.div>
	);
};

export default LogoLoader;
