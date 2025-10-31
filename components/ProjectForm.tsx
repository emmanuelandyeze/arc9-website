// components/ProjectForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Playfair_Display, Work_Sans } from 'next/font/google';
import Image from 'next/image';
import { X, Camera, CheckCircle } from 'lucide-react';

const playfair = Playfair_Display({
	weight: ['400', '700'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-playfair',
});

const work_sans = Work_Sans({
	weight: ['400', '500', '600'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-worksans',
});

interface ImageItem {
	url: string;
	public_id: string;
	isMain: boolean;
}

interface ProjectFormProps {
	initialData?: {
		_id?: string;
		title: string;
		excerpt?: string;
		description?: string;
		location?: string;
		category?: string;
		images: ImageItem[];
	};
}

export default function ProjectForm({ initialData }: ProjectFormProps) {
	const router = useRouter();
	const isEdit = !!initialData?._id;

	// Form state
	const [title, setTitle] = useState(initialData?.title || '');
	const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
	const [description, setDescription] = useState(initialData?.description || '');
	const [location, setLocation] = useState(initialData?.location || '');
	const [category, setCategory] = useState(initialData?.category || 'Architecture');

	// Images
	const [existingImages, setExistingImages] = useState<ImageItem[]>(
		initialData?.images || [],
	);
	const [newFiles, setNewFiles] = useState<FileList | null>(null);
	const [mainImageIndex, setMainImageIndex] = useState<number>(
		initialData?.images.findIndex((img) => img.isMain) ?? 0,
	);
	const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);

	const [message, setMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	// Reset form on success
	const resetForm = () => {
		setTitle('');
		setExcerpt('');
		setDescription('');
		setLocation('');
		setCategory('Architecture');
		setNewFiles(null);
		setExistingImages([]);
		setImagesToDelete([]);
		setMainImageIndex(0);
	};

	// Submit handler
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setMessage('');

		const fd = new FormData();
		fd.append('title', title);
		fd.append('excerpt', excerpt);
		fd.append('description', description);
		fd.append('location', location);
		fd.append('category', category);

		// New images
		if (newFiles) {
			for (let i = 0; i < newFiles.length; i++) {
				fd.append('images', newFiles[i]);
			}
		}

		// Images to delete
		imagesToDelete.forEach((id) => fd.append('deleteImagePublicIds', id));

		// Set main image (index in final array)
		// We calculate final index: existing (minus deleted) + new
		const finalImagesCount =
			existingImages.filter((img) => !imagesToDelete.includes(img.public_id))
				.length + (newFiles?.length || 0);
		const finalMainIndex =
			mainImageIndex < existingImages.length &&
			!imagesToDelete.includes(existingImages[mainImageIndex].public_id)
				? mainImageIndex
				: 0;
		fd.append('mainImageIndex', String(finalMainIndex));

		try {
			const url = isEdit ? `/api/projects/${initialData._id}` : '/api/projects';
			const method = isEdit ? 'PATCH' : 'POST';

			const res = await fetch(url, { method, body: fd });
			const data = await res.json();

			if (res.ok) {
				setMessage(
					isEdit
						? 'Project updated successfully!'
						: 'Project created successfully!',
				);
				setTimeout(() => {
					router.push('/admin/projects');
					router.refresh();
				}, 1500);
			} else {
				setMessage(data.error || 'Something went wrong.');
			}
		} catch (err: any) {
			setMessage('Network error: ' + err.message);
		} finally {
			setIsLoading(false);
		}
	};

	// Delete existing image
	const removeExistingImage = (public_id: string, index: number) => {
		setImagesToDelete((prev) => [...prev, public_id]);
		setExistingImages((prev) => prev.filter((_, i) => i !== index));

		// Adjust main index if needed
		if (mainImageIndex === index) {
			setMainImageIndex(0);
		} else if (mainImageIndex > index) {
			setMainImageIndex(mainImageIndex - 1);
		}
	};

	return (
		<form onSubmit={handleSubmit} className={`space-y-8 ${work_sans.className}`}>
			{/* Title */}
			<div>
				<label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
					Project Title <span className="text-red-500">*</span>
				</label>
				<input
					id="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Enter project title"
					className="block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
					required
				/>
			</div>

			{/* Location */}
			<div>
				<label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
					Location
				</label>
				<input
					id="location"
					value={location}
					onChange={(e) => setLocation(e.target.value)}
					placeholder="e.g., Lagos, Nigeria"
					className="block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
				/>
			</div>

			{/* Category */}
			<div>
				<label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
					Category
				</label>
				<select
					id="category"
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					className="block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
				>
					<option value="Architecture">Architecture</option>
					<option value="Interior design">Interior design</option>
					<option value="Project management">Project management</option>
				</select>
			</div>

			{/* Excerpt */}
			<div>
				<label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
					Excerpt (Short summary) <span className="text-red-500">*</span>
				</label>
				<textarea
					id="excerpt"
					value={excerpt}
					onChange={(e) => setExcerpt(e.target.value)}
					rows={3}
					className="block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm resize-y"
					required
				/>
			</div>

			{/* Description */}
			<div>
				<label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
					Full Description <span className="text-red-500">*</span>
				</label>
				<textarea
					id="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					rows={6}
					className="block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm resize-y"
					required
				/>
			</div>

			{/* Existing Images */}
			{existingImages.length > 0 && (
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-3">
						Current Images
					</label>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
						{existingImages.map((img, idx) => (
							<div
								key={img.public_id}
								className="relative group border-2 border-dashed rounded-xl overflow-hidden"
							>
								<Image
									src={img.url}
									alt={`Image ${idx + 1}`}
									width={300}
									height={200}
									className="w-full h-48 object-cover"
								/>
								<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
									<button
										type="button"
										onClick={() => removeExistingImage(img.public_id, idx)}
										className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
										title="Delete image"
									>
										<X className="w-5 h-5" />
									</button>
								</div>
								{/* Main image radio */}
								<div className="absolute top-2 left-2">
									<label className="flex items-center gap-1 text-white text-xs bg-black/60 px-2 py-1 rounded">
										<input
											type="radio"
											name="mainImage"
											checked={mainImageIndex === idx}
											onChange={() => setMainImageIndex(idx)}
											className="w-3 h-3"
										/>
										<span>Main</span>
									</label>
								</div>
								{img.isMain && (
									<div className="absolute bottom-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
										<CheckCircle className="w-4 h-4 inline" /> Main
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			)}

			{/* New Images */}
			<div>
				<label htmlFor="new-images" className="block text-sm font-medium text-gray-700 mb-1">
					Add New Images
				</label>
				<input
					id="new-images"
					type="file"
					multiple
					accept="image/*"
					onChange={(e) => setNewFiles(e.target.files)}
					className="block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-md file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100"
				/>
				{newFiles && newFiles.length > 0 && (
					<p className="mt-2 text-sm text-gray-600">
						{newFiles.length} new file(s) selected
					</p>
				)}
			</div>

			{/* Submit */}
			<button
				type="submit"
				disabled={isLoading}
				className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{isLoading ? (
					<>Saving...</>
				) : (
					<>
						<Camera className="w-5 h-5" />
						{isEdit ? 'Update Project' : 'Create Project'}
					</>
				)}
			</button>

			{/* Message */}
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