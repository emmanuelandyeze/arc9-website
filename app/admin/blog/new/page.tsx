// app/admin/blog/new/page.tsx
'use client'; // This component uses client-side hooks like useState, so 'use client' is necessary.
import { useState } from 'react';
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

export default function NewBlog() {
	// State variables for form fields
	const [title, setTitle] = useState('');
	const [slug, setSlug] = useState('');
	const [excerpt, setExcerpt] = useState('');
	const [content, setContent] = useState('');
	const [file, setFile] = useState<File | null>(null);
	const [message, setMessage] = useState(''); // State for displaying success/error messages
	const [isLoading, setIsLoading] = useState(false); // State for loading indicator

	// Handles form submission
	async function handleSubmit(
		e: React.FormEvent<HTMLFormElement>,
	) {
		e.preventDefault(); // Prevent default form submission behavior
		setIsLoading(true); // Set loading state to true
		setMessage(''); // Clear previous messages

		const fd = new FormData(); // Create FormData object to send form data, including files
		fd.append('title', title);
		fd.append('slug', slug);
		fd.append('excerpt', excerpt);
		fd.append('content', content);
		if (file) fd.append('image', file);

		try {
			// Send form data to the API endpoint
			const res = await fetch('/api/blog', {
				method: 'POST',
				body: fd,
			});
			const data = await res.json(); // Parse the JSON response

			if (res.ok) {
				// Check if the response was successful (status code 2xx)
				console.log('Created blog:', data);
				setMessage('Blog post created successfully!'); // Set success message
				// Optionally clear form fields after successful submission
				setTitle('');
				setSlug('');
				setExcerpt('');
				setContent('');
				setFile(null);
			} else {
				console.error('Failed to create blog post:', data);
				setMessage(
					data.error || 'Failed to create blog post.',
				); // Set error message
			}
		} catch (error) {
			console.error('Error submitting form:', error);
			setMessage('An unexpected error occurred.'); // Catch network or other unforeseen errors
		} finally {
			setIsLoading(false); // Reset loading state
		}
	}

	return (
		<main
			className={`min-h-screen bg-gray-50 ${work_sans.className}`}
		>
			{/* Hero Section: Consistent with other admin pages */}
			<section
				className={`relative h-[55vh] flex items-center justify-center text-center bg-cover bg-center`}
				style={{
					// Use a dedicated hero image for the blog creation section
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
						Create New Blog Post
					</h1>
					<p
						className={`text-lg sm:text-xl text-white/90 max-w-3xl mx-auto ${work_sans.className}`}
					>
						Share your insights and updates with a new
						article.
					</p>
				</div>
			</section>

			{/* Main Content Area for the form */}
			<div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 md:p-12 -mt-20 relative z-20 mb-12">
				<h2
					className={`text-3xl font-bold text-gray-900 tracking-tight mb-8 ${playfair.className}`}
				>
					Blog Post Details
				</h2>
				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Input field for Blog Post Title */}
					<div>
						<label
							htmlFor="title"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Blog Post Title
						</label>
						<input
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Enter blog post title"
							className="block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-colors duration-200"
							required
						/>
					</div>

					{/* Input field for Slug */}
					<div>
						<label
							htmlFor="slug"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Slug (Optional, e.g., 'design-trends-2024')
						</label>
						<input
							id="slug"
							value={slug}
							onChange={(e) => setSlug(e.target.value)}
							placeholder="Auto-generated if left empty"
							className="block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-colors duration-200"
						/>
					</div>

					{/* Textarea for Excerpt */}
					<div>
						<label
							htmlFor="excerpt"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Excerpt (Short summary)
						</label>
						<textarea
							id="excerpt"
							value={excerpt}
							onChange={(e) => setExcerpt(e.target.value)}
							placeholder="A brief overview of the blog post"
							rows={3}
							className="block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-colors duration-200 resize-y"
							required
						/>
					</div>

					{/* Textarea for Content */}
					<div>
						<label
							htmlFor="content"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Content (HTML or Markdown)
						</label>
						<textarea
							id="content"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							placeholder="Write your blog post content here (supports HTML or Markdown)"
							rows={10}
							className="block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-colors duration-200 resize-y"
							required
						/>
					</div>

					{/* File input for Featured Image */}
					<div>
						<label
							htmlFor="image"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Featured Image
						</label>
						<input
							id="image"
							type="file"
							onChange={(e) =>
								setFile(
									e.target.files ? e.target.files[0] : null,
								)
							}
							className="block w-full text-sm text-gray-500
                                       file:mr-4 file:py-2 file:px-4
                                       file:rounded-md file:border-0
                                       file:text-sm file:font-semibold
                                       file:bg-blue-50 file:text-blue-700
                                       hover:file:bg-blue-100 transition-colors duration-200
                                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
						/>
						{file && (
							<p className="mt-2 text-sm text-gray-500">
								Selected: {file.name}
							</p>
						)}
					</div>

					{/* Submission Button */}
					<button
						type="submit"
						className="w-full px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-md focus:outline-none focus:ring-4 focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed"
						disabled={isLoading} // Disable button while loading
					>
						{isLoading ? 'Creating Post...' : 'Create Post'}
					</button>

					{/* Message Display (Success/Error) */}
					{message && (
						<div
							className={`mt-4 p-4 rounded-md text-center text-sm font-medium ${
								message.includes('successfully')
									? 'bg-green-100 text-green-700'
									: 'bg-red-100 text-red-700'
							}`}
						>
							{message}
						</div>
					)}
				</form>
			</div>
		</main>
	);
}
