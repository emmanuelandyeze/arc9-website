// app/api/projects/[id]/route.ts
import connect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { parseForm } from '@/lib/parseForm';
import {
	uploadToCloudinary,
	destroyFromCloudinary,
} from '@/lib/cloudinary';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

// The GetRequestParams interface is no longer needed.

interface ErrorResponse {
	error: string;
}

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ slug: string }> },
): Promise<NextResponse<any>> {
	const { slug } = await params;

	await connect();

	try {
		const blog = await Blog.find({slug: slug}).lean();

		if (!blog) {
			return NextResponse.json<ErrorResponse>(
				{ error: 'Project not found' },
				{ status: 404 },
			);
		}

		return NextResponse.json(blog);
	} catch (error) {
		return NextResponse.json<ErrorResponse>(
			{ error: 'Internal server error' },
			{ status: 500 },
		);
	}
}

export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ slug: string }> },
): Promise<NextResponse<any>> {
	const { slug } = await params;

	await connect();

	try {
		// Find the blog
		const blog = await Blog.findOne({ slug })
			.select('image.public_id')
			.lean();

		if (!blog) {
			return NextResponse.json<ErrorResponse>(
				{ error: 'Blog not found' },
				{ status: 404 },
			);
		}

		// Delete from MongoDB
		const deleteResult = await Blog.deleteOne({ slug });

		if (deleteResult.deletedCount === 0) {
			return NextResponse.json<ErrorResponse>(
				{ error: 'Failed to delete blog' },
				{ status: 500 },
			);
		}

		// Delete image from Cloudinary if exists
		// if (blog.image?.public_id) {
		// 	try {
		// 		await destroyFromCloudinary(blog.image.public_id);
		// 		console.log(
		// 			`Deleted Cloudinary image: ${blog.image.public_id}`,
		// 		);
		// 	} catch (cloudinaryError) {
		// 		// Log but don't fail the delete if image can't be removed
		// 		console.warn(
		// 			`Failed to delete image from Cloudinary: ${blog.image.public_id}`,
		// 			cloudinaryError,
		// 		);
		// 	}
		// }

		return NextResponse.json(
			{
				success: true,
				message: 'Blog deleted successfully',
			},
			{ status: 200 },
		);
	} catch (error: any) {
		console.error('Blog deletion failed:', error);
		return NextResponse.json<ErrorResponse>(
			{
				error: 'Internal server error',
				// details: error.message,
			},
			{ status: 500 },
		);
	}
}

