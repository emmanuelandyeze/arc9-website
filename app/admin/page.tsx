// app/admin/page.tsx
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Link from 'next/link';
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
	weight: ['400', '500', '600'], // Added more weights for versatility
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-worksans',
});

export default async function AdminPage() {
	// Ensure the user is authenticated before proceeding
	const session = await getServerSession(authOptions);
	if (!session) {
		redirect('/api/auth/signin');
	}

	return (
		<main
			className={`min-h-screen bg-gray-50 ${work_sans.className}`}
		>
			{/* Hero Section: Adds a prominent visual element with a background image */}
			<section
				className={`relative h-[55vh] flex items-center justify-center text-center bg-cover bg-center`}
				style={{
					// Use a dedicated hero image for the admin dashboard
					backgroundImage:
						'url(/images/projects/service2.png)',
				}}
			>
				{/* Overlay for better text readability and a polished look */}
				<div className="absolute inset-0 bg-black/60"></div>
				{/* Content for the hero section, with styled typography */}
				<div className="relative z-10 px-4 sm:px-6 lg:px-8">
					<h1
						className={`text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight mb-4 ${playfair.className}`}
					>
						Admin Dashboard
					</h1>
					<p
						className={`text-lg sm:text-xl text-white/90 max-w-3xl mx-auto ${work_sans.className}`}
					>
						Manage your architectural projects and blog
						posts.
					</p>
				</div>
			</section>

			{/* Main Content Area: Elevated card-like structure */}
			<div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8 md:p-12 -mt-20 relative z-20 mb-12">
				{/* Header for the dashboard, with user info and logout button */}
				<header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-gray-200">
					<div className="flex items-center gap-4">
						<div className="text-gray-600 text-sm md:text-base">
							<span className="font-semibold block md:inline">
								Logged in as
							</span>
							<span className="font-medium text-gray-800 ml-1">
								{session.user?.email}
							</span>
						</div>
						<Link
							href="/api/auth/signout"
							className="px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-md"
						>
							Log Out
						</Link>
					</div>
				</header>

				{/* Dashboard Navigation Cards */}
				<section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
					{/* Link Card for Projects Management */}
					<Link
						href="/admin/projects"
						className="group relative overflow-hidden p-8 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-200 flex flex-col justify-between h-full"
					>
						<div>
							<h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
								Manage Projects
							</h2>
							<p className="text-gray-500 text-sm mt-2">
								Add, edit, and delete architectural projects
								with images.
							</p>
						</div>
						<span className="mt-4 text-blue-600 font-semibold group-hover:underline transition-all duration-300">
							Go to Projects &rarr;
						</span>
					</Link>

					{/* Link Card for Blog Management */}
					<Link
						href="/admin/blog"
						className="group relative overflow-hidden p-8 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-200 flex flex-col justify-between h-full"
					>
						<div>
							<h2 className="text-2xl font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300">
								Manage Blog
							</h2>
							<p className="text-gray-500 text-sm mt-2">
								Create and update blog articles with
								featured images.
							</p>
						</div>
						<span className="mt-4 text-green-600 font-semibold group-hover:underline transition-all duration-300">
							Go to Blog &rarr;
						</span>
					</Link>
				</section>
			</div>
		</main>
	);
}
