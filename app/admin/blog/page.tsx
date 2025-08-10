// app/admin/blog/page.tsx
import connect from '@/lib/mongodb';
import Blog from '@/models/Blog';
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
	weight: ['400', '500', '600'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-worksans',
});

export default async function BlogAdmin() {
	// Ensure the user is authenticated before proceeding
	const session = await getServerSession(authOptions);
	if (!session) {
		redirect('/api/auth/signin');
	}

	// Connect to MongoDB and fetch blog posts, sorting by creation date
	await connect();
	const posts = await Blog.find()
		.sort({ createdAt: -1 }) // Sort by most recent first
		.lean(); // Use .lean() for plain JavaScript objects, improving performance

	return (
		<main
			className={`min-h-screen bg-gray-50 ${work_sans.className}`}
		>
			{/* Hero Section: Consistent with other admin pages */}
			<section
				className={`relative h-[55vh] flex items-center justify-center text-center bg-cover bg-center`}
				style={{
					// Use a dedicated hero image for the blog section (replace if you have a specific one)
					backgroundImage:
						'url(/images/projects/service2.png)', // Using existing image for consistency
				}}
			>
				{/* Overlay for better text readability */}
				<div className="absolute inset-0 bg-black/60"></div>
				{/* Content for the hero section */}
				<div className="relative z-10 px-4 sm:px-6 lg:px-8">
					<h1
						className={`text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight mb-4 ${playfair.className}`}
					>
						Manage Blog Posts
					</h1>
					<p
						className={`text-lg sm:text-xl text-white/90 max-w-3xl mx-auto ${work_sans.className}`}
					>
						Create, edit, and publish engaging articles for
						your audience.
					</p>
				</div>
			</section>

			{/* Main Content Area */}
			<div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8 md:p-12 -mt-20 relative z-20 mb-12">
				{/* Header for the blog post list section */}
				<header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-gray-200 mb-8">
					{/* Page title for the blog post list */}
					<h2
						className={`text-3xl font-bold text-gray-900 tracking-tight ${playfair.className}`}
					>
						Blog Post List
					</h2>
					{/* User info and create new post button */}
					<div className="flex flex-col sm:flex-row items-center gap-4">
						<div className="text-gray-600 text-sm md:text-base">
							<span className="font-semibold block md:inline">
								Logged in as
							</span>
							<span className="font-medium text-gray-800 ml-1">
								{session.user?.email}
							</span>
						</div>
						<Link
							href="/admin/blog/new"
							className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
						>
							+ Create New Post
						</Link>
					</div>
				</header>

				{/* Blog Post List Section */}
				<section className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
					{posts.length > 0 ? (
						<ul className="divide-y divide-gray-100">
							{/* Map through posts and display them */}
							{posts.map((p) => (
								<li
									key={String(p._id)} // Unique key for list items
									className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-5 hover:bg-green-50 transition-colors duration-200"
								>
									<div className="flex-1">
										<strong className="block text-xl font-semibold text-gray-800">
											{p.title}
										</strong>
										<span className="text-gray-500 text-sm mt-1 block">
											Created:{' '}
											{new Date(
												p.createdAt,
											).toLocaleDateString()}
										</span>
									</div>
									<div className="mt-4 sm:mt-0">
										<Link
											href={`/admin/blog/${p._id}`}
											className="inline-flex items-center px-5 py-2 text-sm font-medium text-green-700 bg-green-100 rounded-md hover:bg-green-200 transition-colors duration-200 shadow-sm"
										>
											Edit Post
										</Link>
									</div>
								</li>
							))}
						</ul>
					) : (
						// Message when no blog posts are found
						<div className="p-8 text-center text-gray-500 text-lg">
							No blog posts found.
							<Link
								href="/admin/blog/new"
								className="text-blue-600 hover:underline ml-2 font-medium"
							>
								Create your first post here
							</Link>
							.
						</div>
					)}
				</section>
			</div>
		</main>
	);
}
