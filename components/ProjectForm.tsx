// components/ProjectForm.tsx
'use client';

import { useState } from 'react';
import {
	Playfair_Display,
	Work_Sans,
} from 'next/font/google';

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

export default function ProjectForm({
	existing,
}: {
	existing?: any;
}) {
	// State variables for form fields
	const [title, setTitle] = useState(existing?.title || '');
	// Removed 'slug' state as it's no longer in the schema
	const [excerpt, setExcerpt] = useState(
		existing?.excerpt || '',
	);
	const [description, setDescription] = useState(
		existing?.description || '',
	);
	const [location, setLocation] = useState(
		existing?.location || '',
	); // New state for location
	const [category, setCategory] = useState(
		existing?.category || 'Architecture',
	); // New state for category, with a default value
	const [files, setFiles] = useState<FileList | null>(null);
	const [message, setMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	// Handles form submission
	async function handleSubmit(
		e: React.FormEvent<HTMLFormElement>,
	) {
		e.preventDefault();
		setIsLoading(true);
		setMessage('');

		const fd = new FormData();
		fd.append('title', title);
		// Removed 'slug' from FormData
		fd.append('excerpt', excerpt);
		fd.append('description', description);
		fd.append('location', location); // Append new location field
		fd.append('category', category); // Append new category field

		if (files) {
			for (let i = 0; i < files.length; i++) {
				fd.append('images', files[i]);
			}
		}

		try {
			const res = await fetch('/api/projects', {
				method: 'POST',
				body: fd,
			});
			const data = await res.json();

			if (res.ok) {
				console.log('Project created:', data);
				setMessage('Project created successfully!');
				// Optionally clear form fields after successful submission
				setTitle('');
				setExcerpt('');
				setDescription('');
				setLocation('');
				setCategory('Architecture');
				setFiles(null);
			} else {
				console.error('Failed to create project:', data);
				setMessage(
					data.error || 'Failed to create project.',
				);
			}
		} catch (error) {
			console.error('Error submitting form:', error);
			setMessage('An unexpected error occurred.');
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className={`space-y-6 ${work_sans.className}`}
		>
			{/* Input field for Project Title */}
			<div>
				<label
					htmlFor="title"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Project Title
				</label>
				<input
					id="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Enter project title"
					className="block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-colors duration-200"
					required
				/>
			</div>

			{/* Input field for Location (New field) */}
			<div>
				<label
					htmlFor="location"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Location
				</label>
				<input
					id="location"
					value={location}
					onChange={(e) => setLocation(e.target.value)}
					placeholder="e.g., California, USA"
					className="block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-colors duration-200"
				/>
			</div>

			{/* Dropdown for Category (New field) */}
			<div>
				<label
					htmlFor="category"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Category
				</label>
				<select
					id="category"
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					className="block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-colors duration-200"
				>
					<option value="Architecture">Architecture</option>
					<option value="Interior design">
						Interior design
					</option>
					<option value="Project management">
						Project management
					</option>
				</select>
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
					placeholder="A brief overview of the project"
					rows={3}
					className="block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-colors duration-200 resize-y"
					required
				/>
			</div>

			{/* Textarea for Description */}
			<div>
				<label
					htmlFor="description"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Full Description
				</label>
				<textarea
					id="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Detailed description of the project"
					rows={6}
					className="block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-colors duration-200 resize-y"
					required
				/>
			</div>

			{/* File input for Images */}
			<div>
				<label
					htmlFor="images"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Project Images
				</label>
				<input
					id="images"
					type="file"
					multiple
					onChange={(e) => setFiles(e.target.files)}
					className="block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-md file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100 transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				/>
				{files && files.length > 0 && (
					<p className="mt-2 text-sm text-gray-500">
						Selected: {files.length} file(s)
					</p>
				)}
			</div>

			{/* Submission Button */}
			<button
				type="submit"
				className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
				disabled={isLoading}
			>
				{isLoading
					? 'Creating Project...'
					: 'Create Project'}
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
	);
}
