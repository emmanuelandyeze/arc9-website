// lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true,
});

export async function uploadToCloudinary(
path: string, folder = 'architect', p0: { width: number; crop: string; }[],
) {
	return cloudinary.uploader.upload(path, {
		folder,
		use_filename: true,
		unique_filename: false,
	});
}

export async function destroyFromCloudinary(
	publicId: string,
): Promise<any> {
	return new Promise((resolve, reject) => {
		cloudinary.uploader.destroy(
			publicId,
			(error, result) => {
				if (error) return reject(error);
				resolve(result);
			},
		);
	});
}

export default cloudinary;
