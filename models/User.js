// models/User.ts
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	name: String,
	email: { type: String, required: true, unique: true },
	passwordHash: { type: String },
	role: {
		type: String,
		enum: ['admin', 'editor'],
		default: 'admin',
	},
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User ||
	mongoose.model('User', UserSchema);
