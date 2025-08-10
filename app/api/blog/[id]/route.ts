// app/api/blog/[id]/route.ts
import connect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { parseForm } from '@/lib/parseForm';
import {
	uploadToCloudinary,
	destroyFromCloudinary,
} from '@/lib/cloudinary';

export async function GET(
	req: Request,
	{ params }: { params: { id: string } },
) {
	await connect();
	const blog = await Blog.findById(params.id).lean();
	if (!blog) return new Response(null, { status: 404 });
	return new Response(JSON.stringify(blog), {
		status: 200,
	});
}

export async function PUT(
	req: Request,
	{ params }: { params: { id: string } },
) {
	try {
		await connect();
		const ct = req.headers.get('content-type') || '';
		let updated: any;

		if (ct.includes('multipart/form-data')) {
			const { fields, files } = await parseForm(req);
			updated = {
				title: fields.title,
				content: fields.content,
				excerpt: fields.excerpt,
			};

			if (files.image) {
				const file = Array.isArray(files.image)
					? files.image[0]
					: files.image;
				const filepath =
					file.filepath || (file as any).path;
				const res = await uploadToCloudinary(
					filepath,
					'architect/blogs',
				);
				updated.image = {
					url: res.secure_url,
					public_id: res.public_id,
				};
			}
		} else {
			updated = await req.json();
		}

		const blog = await Blog.findByIdAndUpdate(
			params.id,
			{ ...updated, updatedAt: new Date() },
			{ new: true },
		);
		if (!blog) return new Response(null, { status: 404 });
		return new Response(JSON.stringify(blog), {
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

export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } },
) {
	try {
		await connect();
		const blog = await Blog.findById(params.id);
		if (!blog) return new Response(null, { status: 404 });

		if (blog.image?.public_id) {
			try {
				await destroyFromCloudinary(blog.image.public_id);
			} catch (e) {
				console.warn('cloud delete failed', e);
			}
		}

		await blog.remove();
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
