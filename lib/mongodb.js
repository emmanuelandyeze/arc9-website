// lib/mongodb.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
// const MONGODB_URI =
// 	'mongodb+srv://3riveafrica:chexyemma8@cluster0.6n7hzgx.mongodb.net/arc9consult?retryWrites=true&w=majority&appName=Cluster0';
if (!MONGODB_URI) {
	throw new Error('MONGODB_URI is required');
}

// Global cache to avoid multiple connections in dev mode (hot reload)
let cached = global._mongoose;
if (!cached) {
	cached = global._mongoose = { conn: null, promise: null };
}

async function connect() {
	if (cached.conn) return cached.conn;

	if (!cached.promise) {
		cached.promise = mongoose
			.connect(MONGODB_URI)
			.then((m) => m);
	}

	cached.conn = await cached.promise;
	return cached.conn;
}

export default connect;
