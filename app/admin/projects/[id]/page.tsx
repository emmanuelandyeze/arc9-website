// app/admin/projects/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import ProjectForm from '@/components/ProjectForm';
import {
	Playfair_Display,
	Work_Sans,
} from 'next/font/google';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';

// Fonts
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

interface Project {
	_id: string;
	title: string;
	excerpt?: string;
	description?: string;
	location?: string;
	category?: string;
	images: Array<{
		url: string;
		public_id: string;
		isMain: boolean;
	}>;
}

export default function EditProjectPage({
	params,
}: {
	params: { id: string };
}) {
	const { id } = params;
	const router = useRouter();

	const [project, setProject] = useState<Project | null>(
		null,
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchProject() {
			try {
				const res = await fetch(`/api/projects/${id}`);
				if (!res.ok) {
					if (res.status === 404) return notFound();
					throw new Error('Failed to load project');
				}
				const data = await res.json();
				setProject(data);
			} catch (err: any) {
				setError(err.message || 'Something went wrong');
			} finally {
				setLoading(false);
			}
		}

		if (id) fetchProject();
	}, [id]);

	// Show loading state
	if (loading) {
		return (
			<main
				className={`min-h-screen bg-gray-50 ${work_sans.className}`}
			>
				<div className="flex items-center justify-center h-screen">
					<div className="text-xl text-gray-600">
						Loading project...
					</div>
				</div>
			</main>
		);
	}

	// Show error state
	if (error || !project) {
		return (
			<main
				className={`min-h-screen bg-gray-50 ${work_sans.className}`}
			>
				<div className="flex flex-col items-center justify-center h-screen text-center px-4">
					<h1
						className={`text-4xl font-bold text-red-600 mb-4 ${playfair.className}`}
					>
						Error
					</h1>
					<p className="text-lg text-gray-700 mb-6">
						{error || 'Project not found'}
					</p>
					<Link
						href="/admin/projects"
						className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
					>
						Back to Projects
					</Link>
				</div>
			</main>
		);
	}

	return (
		<main
			className={`min-h-screen bg-gray-50 ${work_sans.className}`}
		>
			{/* Hero Section */}
			<section
				className={`relative h-[55vh] flex items-center justify-center text-center bg-cover bg-center`}
				style={{
					backgroundImage: project.images.find(
						(img) => img.isMain,
					)?.url
						? `url(${
								project.images.find((img) => img.isMain)
									?.url
						  })`
						: 'url(/images/projects/service2.png)',
				}}
			>
				<div className="absolute inset-0 bg-black/60"></div>
				<div className="relative z-10 px-4 sm:px-6 lg:px-8">
					<h1
						className={`text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight mb-4 ${playfair.className}`}
					>
						Edit Project
					</h1>
					<p
						className={`text-lg sm:text-xl text-white/90 max-w-3xl mx-auto`}
					>
						Update the details of{' '}
						<strong className="text-yellow-400">
							{project.title}
						</strong>
					</p>
				</div>
			</section>

			{/* Form Card */}
			<div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 md:p-12 -mt-20 relative z-20 mb-12">
				<div className="flex items-center justify-between mb-8">
					<h2
						className={`text-3xl font-bold text-gray-900 tracking-tight ${playfair.className}`}
					>
						Edit Project Details
					</h2>
					<Link
						href="/admin/projects"
						className="text-sm text-gray-600 hover:text-gray-900 underline"
					>
						← Back to list
					</Link>
				</div>

				{/* Pass project data to form */}
				<ProjectForm initialData={project} />
			</div>
		</main>
	);
}
