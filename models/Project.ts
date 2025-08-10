import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
	url: String,
	public_id: String,
	isMain: { type: Boolean, default: false },
});

const ProjectSchema = new mongoose.Schema({
	title: { type: String, required: true },
	excerpt: { type: String },
	description: { type: String },
	location: { type: String },
	category: {
		type: String,
		enum: [
			'Architecture',
			'Interior design',
			'Project management',
		],
	},
	images: [ImageSchema], // array of uploaded images
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Project ||
	mongoose.model('Project', ProjectSchema);
