// lib/mongodb-client-promise.ts
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
if (!uri) throw new Error('MONGODB_URI missing');

declare global {
	// eslint-disable-next-line no-var
	var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
	client = new MongoClient(uri);
	clientPromise = client.connect();
	global._mongoClientPromise = clientPromise;
} else {
	clientPromise = global._mongoClientPromise;
}

export default clientPromise;
