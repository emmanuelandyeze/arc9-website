// src/components/Layout.tsx
import React from 'react';
import Navbar from '@/components/Navbar';
// import Footer from './Footer'; // We'll create this later

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			{/* Main content area, takes up remaining vertical space */}
			<main className=" ">{children}</main>
			{/* <Footer /> */}{' '}
			{/* The footer, will be added later */}
		</div>
	);
};

export default Layout;
