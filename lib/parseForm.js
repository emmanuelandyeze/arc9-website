// lib/parseForm.ts
import formidable from 'formidable';
import { Readable } from 'stream';

export const parseForm = async (req) => {
	console.log('📥 Parsing form data...');

	const form = formidable({ multiples: true });

	return new Promise((resolve, reject) => {
		// Convert Fetch API Request to Node-readable stream
		const stream = Readable.fromWeb(req.body);

		form.parse(stream, (err, fields, files) => {
			if (err) {
				console.error('❌ Error parsing form:', err);
				return reject(err);
			}
			console.log('✅ Form parsing completed.');
			console.log('📄 Fields:', fields);
			console.log('📂 Files:', files);
			resolve({ fields, files });
		});
	});
};
