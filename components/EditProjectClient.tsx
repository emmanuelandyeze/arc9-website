// app/admin/projects/[id]/EditProjectClient.tsx
'use client';

import ProjectForm from '@/components/ProjectForm';
import Link from 'next/link';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
	weight: ['400', '700'],
	subsets: ['latin'],
	display: 'swap',
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

interface EditProjectClientProps {
	initialProject: Project | null;
	error: string | null;
}

export default function EditProjectClient({
	initialProject,
	error,
}: EditProjectClientProps) {
	if (error || !initialProject) {
		return (
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
		);
	}

	return (
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
					Back to list
				</Link>
			</div>

			<ProjectForm initialData={initialProject} />
		</div>
	);
}
