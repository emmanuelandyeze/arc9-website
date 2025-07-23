// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import {
	Outfit,
	Inter,
	Raleway,
	Pacifico,
} from 'next/font/google';
import Layout from '@/components/Layout'; // Import the Layout component

const outfit = Outfit({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-outfit',
});

const raleway = Raleway({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-raleway',
});

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
});

const pacifico = Pacifico({
	weight: '400',
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-pacifico',
});

export const metadata: Metadata = {
	title: 'Arc9 Consult - Architectural Portfolio & Blog',
	description:
		'Showcasing innovative architectural projects and thought leadership from Arc9 Consult.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${outfit.variable} ${pacifico.variable} ${raleway.variable}`}
		>
			<body className="font-heading text-neutral-800 bg-neutral-50 antialiased">
				<Layout>
					{' '}
					{/* Wrap the children with our new Layout component */}
					{children}
				</Layout>
			</body>
		</html>
	);
}
