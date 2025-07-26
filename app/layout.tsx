// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import {
	Kranky,
	Raleway,
	Pacifico,
} from 'next/font/google';
import Layout from '@/components/Layout'; // Import the Layout component

const raleway = Raleway({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-raleway',
});

const pacifico = Pacifico({
	weight: '400',
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-pacifico',
});

const kranky = Kranky({
	weight: '400',
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-kranky',
});

export const metadata: Metadata = {
	title:
		'Arc9 Consult | Innovative Architecture, Interior Design & Project Management in Nigeria',
	description:
		'Arc9 Consult delivers innovative and sustainable architectural designs, bespoke interior solutions, and expert project management across Nigeria. Partner with us for visionary spaces.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${pacifico.variable} ${kranky.variable} ${raleway.variable}`}
		>
			<body className="font-body text-neutral-800 bg-neutral-50 antialiased">
				<Layout>
					{' '}
					{/* Wrap the children with our new Layout component */}
					{children}
				</Layout>
			</body>
		</html>
	);
}
