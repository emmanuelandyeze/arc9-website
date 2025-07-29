// src/components/Layout.tsx
'use client'; // Ensure this is a client component

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from './Footer'; // Keep this here
import LogoLoader from './LogoLoader'; // Import the new loader component
import { AnimatePresence } from 'framer-motion';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [
		minimumLoadTimeReached,
		setMinimumLoadTimeReached,
	] = useState(false);

	useEffect(() => {
		// Set a minimum display time for the loader (e.g., 2 seconds)
		const timer = setTimeout(() => {
			setMinimumLoadTimeReached(true);
		}, 4000); // 2000ms = 2 seconds

		// Cleanup the timer if the component unmounts early
		return () => clearTimeout(timer);
	}, []);

	// Combine conditions to hide the loader:
	// 1. Minimum load time has passed
	// 2. (Optional, if you had other loading states like data fetch) All other critical resources are ready
	useEffect(() => {
		if (
			minimumLoadTimeReached /* && otherLoadingStatesAreFalse */
		) {
			setIsLoading(false);
		}
	}, [minimumLoadTimeReached]); // Add other loading states to dependency array if you use them

	return (
		<div className="flex flex-col min-h-screen">
			<AnimatePresence mode="wait">
				{' '}
				{/* Use mode="wait" to ensure loader fully exits */}
				{isLoading && (
					<LogoLoader
						onAnimationComplete={() => {
							// This callback is useful if the loader had a complex exit animation
							// For a simple fade out, the useEffect with setTimeout is primary.
							// You could use this to set isLoading(false) IF the loader's exit
							// animation duration matched your desired total display time.
							// For a fixed timeout, the useEffect is more reliable.
						}}
					/>
				)}
			</AnimatePresence>

			{/* Render Navbar, main content, and Footer only when not loading */}
			{!isLoading && (
				<>
					<Navbar />
					<main className="flex-grow">{children}</main>{' '}
					{/* Use flex-grow to push footer down */}
					<Footer />
				</>
			)}
		</div>
	);
};

export default Layout;
