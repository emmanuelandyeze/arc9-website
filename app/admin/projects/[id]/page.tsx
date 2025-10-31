// app/admin/projects/[id]/page.tsx
import EditProjectClient from '@/components/EditProjectClient';
import { notFound } from 'next/navigation';
import {
	Playfair_Display,
	Work_Sans,
} from 'next/font/google';

const playfair = Playfair_Display({
	weight: ['400', '700'],
	subsets: ['latin'],
	display: 'swap',
});

const work_sans = Work_Sans({
	weight: ['400', '500', '600'],
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

export default async function EditProjectPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	let project: Project | null = null;
	let error: string | null = null;

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_URL}/api/projects/${id}`,
			{
				cache: 'no-store',
			},
		);

		if (!res.ok) {
			if (res.status === 404) return notFound();
			throw new Error('Failed to load project');
		}

		project = await res.json();
	} catch (err: any) {
		error = err.message || 'Something went wrong';
	}

	return (
		<main
			className={`min-h-screen bg-gray-50 ${work_sans.className}`}
		>
			{/* Hero */}
			<section
				className="relative h-[55vh] flex items-center justify-center text-center bg-cover bg-center"
				style={{
					backgroundImage: project?.images.find(
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
					{project && (
						<p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
							Update{' '}
							<strong className="text-yellow-400">
								{project.title}
							</strong>
						</p>
					)}
				</div>
			</section>

			{/* Client Component */}
			<EditProjectClient
				initialProject={project}
				error={error}
			/>
		</main>
	);
}
