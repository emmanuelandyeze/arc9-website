import connect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import cloudinary from 'cloudinary';
// Removed Jimp import as processing is now handled by Cloudinary
import { NextRequest, NextResponse } from 'next/server';

// Configure Cloudinary
cloudinary.v2.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
	// Using try...catch for GET route as well for robustness
	try {
		await connect();
		const blogs = await Blog.find()
			.sort({ createdAt: -1 })
			.lean(); // .lean() is great for performance when just reading data
		return NextResponse.json(blogs, { status: 200 });
	} catch (error: any) {
		console.error('Failed to fetch blogs:', error);
		return NextResponse.json(
			{
				error: 'Failed to fetch blogs',
				details: error.message,
			},
			{ status: 500 },
		);
	}
}

export async function POST(
	req: NextRequest,
): Promise<Response> {
	try {
		console.log('Blog upload handler started...'); // Connect to DB

		await connect(); // Parse form data

		const formData = await req.formData(); // Extract text fields

		const title = formData.get('title')?.toString().trim();
		const excerpt =
			formData.get('excerpt')?.toString().trim() || '';
		const content =
			formData.get('content')?.toString().trim() || '';
		// Generate slug from title if not provided
		const providedSlug = formData
			.get('slug')
			?.toString()
			.trim();
		const slug =
			providedSlug ||
			(title
				? title
						.toLowerCase()
						.replace(/\s+/g, '-')
						.replace(/[^a-z0-9-]/g, '')
				: ''); // Validate required fields

		if (!title || !content || !slug) {
			return NextResponse.json(
				{
					error: 'Title, content, and slug are required',
				},
				{ status: 400 },
			);
		} // Get image file(s)

		const imageFiles = formData
			.getAll('image')
			.filter(
				(file): file is File =>
					file instanceof File && file.size > 0,
			);

		if (imageFiles.length === 0) {
			return NextResponse.json(
				{
					error: 'At least one image is required',
				},
				{ status: 400 },
			);
		}

		let uploadedImage = null; // Process only the first image

		const file = imageFiles[0];
		console.log(
			`Uploading file: ${file.name} (${file.type}, ${file.size} bytes)`,
		); // Convert File → Buffer (raw image data)

		const buffer = Buffer.from(await file.arrayBuffer()); // Upload to Cloudinary

		// Jimp logic removed, using Cloudinary transformations instead.

		const uploadResult =
			await new Promise<cloudinary.UploadApiResponse>(
				(resolve, reject) => {
					const stream =
						cloudinary.v2.uploader.upload_stream(
							{
								folder: 'arc9consult/blogs',
								// CLOUDINARY TRANSFORMATION: Apply resizing,
								// auto quality, and convert to WebP/JPG format.
								transformation: [
									{ width: 1200, crop: 'limit' }, // Resize to max 1200px wide
								],
								quality: 'auto:good', // Use Cloudinary's dynamic quality detection
								fetch_format: 'auto', // Deliver best format (WebP/AVIF/JPEG) based on browser
							},
							(error, result) => {
								if (error) return reject(error);
								// Check if result is undefined (which it shouldn't be on success)
								if (!result)
									return reject(
										new Error(
											'Cloudinary upload failed to return a result.',
										),
									);
								resolve(result);
							},
						);
					// Stream the original (raw) buffer directly to Cloudinary
					stream.end(buffer);
				},
			);

		uploadedImage = {
			url: uploadResult.secure_url,
			public_id: uploadResult.public_id,
		};

		console.log(
			'Uploaded to Cloudinary:',
			uploadedImage.url,
		); // Create blog

		// POTENTIAL ISSUE: Ensure your Blog model's 'image' field
		// is defined to accept an object: { url: String, public_id: String }
		const blog = await Blog.create({
			title,
			slug,
			excerpt,
			content,
			image: uploadedImage,
			// 'createdAt' and 'updatedAt' are usually handled
			// by Mongoose timestamps, but setting them manually is fine.
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		return NextResponse.json(
			{ success: true, blog },
			{ status: 201 },
		);
	} catch (error: any) {
		console.error('Blog creation failed:', error);
		return NextResponse.json(
			{
				error: 'Failed to create blog', // Provide more detail from the actual error
				details:
					error.message || 'An unknown error occurred',
				stack:
					process.env.NODE_ENV === 'development'
						? error.stack
						: undefined,
			},
			{ status: 500 },
		);
	}
}
