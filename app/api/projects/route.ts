// app/api/projects/route.ts
import connect from '@/lib/mongodb';
import Project from '@/models/Project';
import type { NextRequest } from 'next/server';
import cloudinary from 'cloudinary';
import { Jimp } from 'jimp'; // <-- Use Jimp instead of sharp

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await connect();
        console.log('✅ Connected to MongoDB');

        console.log('📦 Fetching projects...');
        const projects = await Project.find()
            .sort({ createdAt: -1 })
            .lean();
        console.log(`✅ Found ${projects.length} project(s)`);

        return new Response(JSON.stringify(projects), {
            status: 200,
        });
    } catch (error) {
        console.error('❌ Error fetching projects:', error);
        return new Response(
            JSON.stringify({ message: (error instanceof Error ? error.message : String(error)) }),
            { status: 500 },
        );
    }
}

export async function POST(
    req: NextRequest,
): Promise<Response> {
    try {
        console.log('🚀 Upload handler started...');

        // Connect to DB first
        await connect();

        // Parse form data
        const formData = await req.formData();

        // Get project fields
        const title = formData.get('title')?.toString() || '';
        const excerpt =
            formData.get('excerpt')?.toString() || '';
        const description =
            formData.get('description')?.toString() || '';
        const location =
            formData.get('location')?.toString() || '';
        const category =
            formData.get('category')?.toString() || '';

        if (!title) {
            return new Response(
                JSON.stringify({ error: 'Title is required' }),
                { status: 400 },
            );
        }

        // Extract image files from formData
        const imagesFromForm = formData.getAll('images');

        if (!imagesFromForm.length) {
            return new Response(
                JSON.stringify({
                    error: 'At least one image is required',
                }),
                { status: 400 },
            );
        }

        // Filter valid files (instanceof File)
        const files = imagesFromForm.filter(
            (file): file is File => file instanceof File,
        );

        if (files.length === 0) {
            return new Response(
                JSON.stringify({
                    error: 'No valid image files provided',
                }),
                { status: 400 },
            );
        }

        const uploadedImages: {
            url: string;
            public_id: string;
        }[] = [];

        // Upload each image to Cloudinary
        for (const file of files) {
            console.log(
                `Compressing and uploading file: ${file.name}`,
            );
            const buffer = Buffer.from(await file.arrayBuffer());

            // --- Compression and resizing using Jimp ---
            const jimpImage = await Jimp.read(buffer);
            const compressedBuffer = await jimpImage
                .resize({ w: 1200, h: 1200 })
            // --- End of Jimp compression ---

            // Now, use the compressed buffer for the upload
            const uploadResult = await new Promise<any>(
                (resolve, reject) => {
                    const stream =
                        cloudinary.v2.uploader.upload_stream(
                            {
                                folder: 'arc9consult/uploads',
                                transformation: [
                                    {
                                        width: 800,
                                        height: 600,
                                        crop: 'limit',
                                    },
                                ],
                            },
                            (error, result) => {
                                if (error) return reject(error);
                                resolve(result);
                            },
                        );
                    stream.end(compressedBuffer);
                },
            );

            uploadedImages.push({
                url: uploadResult.secure_url,
                public_id: uploadResult.public_id,
            });

            console.log(`Uploaded: ${uploadResult.secure_url}`);
        }

        // Create new project document with uploaded images
        const project = new Project({
            title,
            excerpt,
            description,
            location,
            category,
            images: uploadedImages.map((img, idx) => ({
                url: img.url,
                public_id: img.public_id,
                isMain: idx === 0,
            })),
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Save to DB
        await project.save();

        return new Response(
            JSON.stringify({ success: true, project }),
            { status: 201 },
        );
    } catch (error: any) {
        console.error('❌ Upload or save failed:', error);
        return new Response(
            JSON.stringify({
                error: 'Upload or save failed',
                details: error.message,
            }),
            { status: 500 },
        );
    }
}