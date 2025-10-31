// app/api/projects/[id]/route.ts
import connect from '@/lib/mongodb';
import Project from '@/models/Project';
import {
	uploadToCloudinary,
	destroyFromCloudinary,
} from '@/lib/cloudinary';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

interface ErrorResponse {
	error: string;
	details?: string;
}

// === GET: Fetch project by ID ===
export async function GET(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<any>> {
	const { id } = await params;

	await connect();

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
	} catch (error: any) {
		console.error('GET project error:', error);
		return NextResponse.json<ErrorResponse>(
			{
				error: 'Internal server error',
				details: error.message,
			},
			{ status: 500 },
		);
	}
}

// === PATCH: Update project (text + images) ===
export async function PATCH(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<any>> {
	const { id } = await params;

	await connect();

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return NextResponse.json<ErrorResponse>(
			{ error: 'Invalid project ID' },
			{ status: 400 },
		);
	}

	try {
		const formData = await request.formData();

		// Text fields
		const title = formData.get('title')?.toString().trim();
		const excerpt = formData
			.get('excerpt')
			?.toString()
			.trim();
		const description = formData
			.get('description')
			?.toString()
			.trim();
		const location = formData
			.get('location')
			?.toString()
			.trim();
		const category = formData
			.get('category')
			?.toString()
			.trim();

		// Files
		const newImageFiles = formData
			.getAll('images')
			.filter(
				(f): f is File => f instanceof File && f.size > 0,
			);

		// At least one field or image
		if (
			!title &&
			!excerpt &&
			!description &&
			!location &&
			!category &&
			newImageFiles.length === 0 &&
			!formData.get('mainImageIndex') &&
			!formData.getAll('deleteImagePublicIds').length
		) {
			return NextResponse.json<ErrorResponse>(
				{ error: 'No fields to update' },
				{ status: 400 },
			);
		}

		// Find project
		const project = await Project.findById(id);
		if (!project) {
			return NextResponse.json<ErrorResponse>(
				{ error: 'Project not found' },
				{ status: 404 },
			);
		}

		// === 1. Handle image deletions ===
		const deletePublicIds: string[] = [];
		formData
			.getAll('deleteImagePublicIds')
			.forEach((id) => {
				const pid = id.toString().trim();
				if (pid) deletePublicIds.push(pid);
			});

		// Remove from project.images
		project.images = project.images.filter((img: any) => {
			if (deletePublicIds.includes(img.public_id)) {
				// Queue for Cloudinary delete
				destroyFromCloudinary(img.public_id).catch((err) =>
					console.warn(
						'Failed to delete image:',
						img.public_id,
						err,
					),
				);
				return false;
			}
			return true;
		});

		// === 2. Upload new images ===
		const uploadedImages = await Promise.all(
			newImageFiles.map(async (file) => {
				const buffer = Buffer.from(
					await file.arrayBuffer(),
				);
				const result = await uploadToCloudinary(
					buffer as any,
					'arc9consult/projects',
					[{ width: 1600, crop: 'limit' }],
				);
				return {
					url: result.secure_url,
					public_id: result.public_id,
					isMain: false,
				};
			}),
		);

		// Append new images
		project.images.push(...uploadedImages);

		// === 3. Set main image (by index) ===
		const mainImageIndexStr = formData
			.get('mainImageIndex')
			?.toString()
			.trim();
		if (mainImageIndexStr) {
			const idx = parseInt(mainImageIndexStr, 10);
			if (
				!isNaN(idx) &&
				idx >= 0 &&
				idx < project.images.length
			) {
				// Reset all
				project.images.forEach(
					(img: any) => (img.isMain = false),
				);
				// Set new main
				project.images[idx].isMain = true;
			}
		}

		// === 4. Update text fields ===
		if (title) project.title = title;
		if (excerpt) project.excerpt = excerpt;
		if (description) project.description = description;
		if (location) project.location = location;
		if (category) {
			const validCategories = [
				'Architecture',
				'Interior design',
				'Project management',
			];
			if (validCategories.includes(category)) {
				project.category = category;
			}
		}

		project.updatedAt = new Date();

		// Save
		const updatedProject = await project.save();

		return NextResponse.json(
			{ success: true, project: updatedProject.toObject() },
			{ status: 200 },
		);
	} catch (error: any) {
		console.error('PATCH project error:', error);
		return NextResponse.json<ErrorResponse>(
			{
				error: 'Failed to update project',
				details: error.message,
			},
			{ status: 500 },
		);
	}
}

// === DELETE: Remove project + all images ===
export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<any>> {
	const { id } = await params;

	await connect();

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return NextResponse.json<ErrorResponse>(
			{ error: 'Invalid project ID' },
			{ status: 400 },
		);
	}

	try {
		const project = await Project.findById(id).select(
			'images.public_id',
		);
		if (!project) {
			return NextResponse.json<ErrorResponse>(
				{ error: 'Project not found' },
				{ status: 404 },
			);
		}

		// Delete from DB
		await Project.deleteOne({ _id: id });

		// Delete all images from Cloudinary
		if (project.images && project.images.length > 0) {
			const publicIds = project.images.map(
				(img: any) => img.public_id,
			);
			await Promise.all(
				publicIds.map((pid: any) =>
					destroyFromCloudinary(pid).catch((err) =>
						console.warn(
							`Failed to delete Cloudinary image ${pid}:`,
							err,
						),
					),
				),
			);
		}

		return NextResponse.json(
			{
				success: true,
				message: 'Project deleted successfully',
			},
			{ status: 200 },
		);
	} catch (error: any) {
		console.error('DELETE project error:', error);
		return NextResponse.json<ErrorResponse>(
			{
				error: 'Internal server error',
				details: error.message,
			},
			{ status: 500 },
		);
	}
}
