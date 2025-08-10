// app/api/blog/route.ts
import connect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { parseForm } from '@/lib/parseForm';
import {
	uploadToCloudinary,
	destroyFromCloudinary,
} from '@/lib/cloudinary';

export async function GET() {
	await connect();
	const blogs = await Blog.find()
		.sort({ createdAt: -1 })
		.lean();
	return new Response(JSON.stringify(blogs), {
		status: 200,
	});
}

export async function POST(req: Request) {
	try {
		await connect();
		const { fields, files } = await parseForm(req);
		const title = fields.title;
		const slug =
			fields.slug ||
			(title && title.toLowerCase().replace(/\s+/g, '-'));
		const excerpt = fields.excerpt || '';
		const content = fields.content || '';

		let image = null;
		if (files.image) {
			const file = Array.isArray(files.image)
				? files.image[0]
				: files.image;
			const filepath = file.filepath || (file as any).path;
			const res = await uploadToCloudinary(
				filepath,
				'architect/blogs',
			);
			image = {
				url: res.secure_url,
				public_id: res.public_id,
			};
		}

		const blog = await Blog.create({
			title,
			slug,
			excerpt,
			content,
			image,
		});
		return new Response(JSON.stringify(blog), {
			status: 201,
		});
	} catch (err: any) {
		console.error(err);
		return new Response(
			JSON.stringify({ message: err.message }),
			{ status: 500 },
		);
	}
}
