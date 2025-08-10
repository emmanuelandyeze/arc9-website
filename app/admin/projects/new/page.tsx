// app/admin/projects/new/page.tsx
'use client'; // This component uses client-side hooks like useState, so 'use client' is necessary.
import ProjectForm from '@/components/ProjectForm';
import {
	Playfair_Display,
	Work_Sans,
} from 'next/font/google'; // Import fonts for consistent styling

// Initialize Playfair Display for headings
const playfair = Playfair_Display({
	weight: ['400', '700'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-playfair',
});

// Initialize Work Sans for body text
const work_sans = Work_Sans({
	weight: ['400', '500', '600'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-worksans',
});

export default function NewProjectPage() {
	return (
		<main
			className={`min-h-screen bg-gray-50 ${work_sans.className}`}
		>
			{/* Hero Section: Consistent with other admin pages */}
			<section
				className={`relative h-[55vh] flex items-center justify-center text-center bg-cover bg-center`}
				style={{
					// Placeholder image for consistency; replace with a relevant image if available
					backgroundImage:
						'url(/images/projects/service2.png)',
				}}
			>
				{/* Overlay for better text readability */}
				<div className="absolute inset-0 bg-black/60"></div>
				{/* Content for the hero section */}
				<div className="relative z-10 px-4 sm:px-6 lg:px-8">
					<h1
						className={`text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight mb-4 ${playfair.className}`}
					>
						Create New Project
					</h1>
					<p
						className={`text-lg sm:text-xl text-white/90 max-w-3xl mx-auto ${work_sans.className}`}
					>
						Fill out the details to add a new architectural
						project to your portfolio.
					</p>
				</div>
			</section>

			{/* Main Content Area for the form */}
			<div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 md:p-12 -mt-20 relative z-20 mb-12">
				<h2
					className={`text-3xl font-bold text-gray-900 tracking-tight mb-8 ${playfair.className}`}
				>
					Project Details
				</h2>
				{/* Render the ProjectForm component */}
				<ProjectForm />
			</div>
		</main>
	);
}
