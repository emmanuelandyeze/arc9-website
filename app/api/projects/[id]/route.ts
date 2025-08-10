// app/api/projects/[id]/route.ts
import connect from '@/lib/mongodb';
import Project from '@/models/Project';
import { parseForm } from '@/lib/parseForm';
import {
	uploadToCloudinary,
	destroyFromCloudinary,
} from '@/lib/cloudinary';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

interface GetRequestParams {
	params: {
		id: string;
	};
}

interface ErrorResponse {
	error: string;
}

export async function GET(
	request: Request,
	{ params }: GetRequestParams,
): Promise<NextResponse<any>> {
	const { id } = params;

	await connect();

	// Validate ObjectId format to avoid crash
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return NextResponse.json<ErrorResponse>(
			{ error: 'Invalid project ID' },
			{ status: 400 },
		);
	}

	try {
		const project = await Project.findById(id).lean();

		if (!project) {
			return NextResponse.json<ErrorResponse>(
				{ error: 'Project not found' },
				{ status: 404 },
			);
		}

		return NextResponse.json(project);
	} catch (error) {
		return NextResponse.json<ErrorResponse>(
			{ error: 'Internal server error' },
			{ status: 500 },
		);
	}
}

export async function PUT(
	req: Request,
	{ params }: { params: { id: string } },
) {
	try {
		await connect();
		// support both JSON and multipart updates
		const ct = req.headers.get('content-type') || '';
		let project = await Project.findById(params.id);
		if (!project)
			return new Response(null, { status: 404 });

		if (ct.includes('multipart/form-data')) {
			const { fields, files } = await parseForm(req);
			project.title = fields.title || project.title;
			project.excerpt = fields.excerpt || project.excerpt;
			project.description =
				fields.description || project.description;

			// add new images if provided
			const imagesField = files.images;
			const fileList = Array.isArray(imagesField)
				? imagesField
				: imagesField
				? [imagesField]
				: [];
			for (const f of fileList) {
				const filepath = f.filepath || (f as any).path;
				const res = await uploadToCloudinary(
					filepath,
					'architect/projects',
				);
				project.images.push({
					url: res.secure_url,
					public_id: res.public_id,
					isMain: false,
				});
			}

			// set main image
			if (fields.mainPublicId) {
                interface ProjectImage {
                    url: string;
                    public_id: string;
                    isMain: boolean;
                    toObject?: () => Omit<ProjectImage, 'toObject'>;
                }

                interface Fields {
                    mainPublicId?: string;
                    [key: string]: any;
                }

                project.images = project.images.map((img: ProjectImage) => ({
                    ...(img.toObject ? img.toObject() : img),
                    isMain: img.public_id === (fields as Fields).mainPublicId,
                }));
			}

			await project.save();
			return new Response(JSON.stringify(project), {
				status: 200,
			});
		} else {
			const body = await req.json();
			const updates: any = {
				...body,
				updatedAt: new Date(),
			};
			project = await Project.findByIdAndUpdate(
				params.id,
				updates,
				{ new: true },
			);
			if (!project)
				return new Response(null, { status: 404 });
			return new Response(JSON.stringify(project), {
				status: 200,
			});
		}
	} catch (err: any) {
		console.error(err);
		return new Response(
			JSON.stringify({ message: err.message }),
			{ status: 500 },
		);
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } },
) {
	try {
		await connect();
		const project = await Project.findById(params.id);
		if (!project)
			return new Response(null, { status: 404 });

		// remove images from Cloudinary
		for (const img of project.images) {
			if (img.public_id) {
				try {
					await destroyFromCloudinary(img.public_id);
				} catch (e) {
					console.warn('Cloudinary delete failed', e);
				}
			}
		}

		await project.remove();
		return new Response(JSON.stringify({ success: true }), {
			status: 200,
		});
	} catch (err: any) {
		console.error(err);
		return new Response(
			JSON.stringify({ message: err.message }),
			{ status: 500 },
		);
	}
}
