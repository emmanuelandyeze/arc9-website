// app/api/blog/[id]/route.ts
import connect from '@/lib/mongodb';
import Blog from '@/models/Blog';
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
		const project = await Blog.findById(id).lean();

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

