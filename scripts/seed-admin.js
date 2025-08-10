import 'dotenv/config';
import connect from '../lib/mongodb.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

async function seed() {
	try {
		await connect();

		const pw = 'Tiavspfa9l!';
		const hash = await bcrypt.hash(pw, 10);

		const existing = await User.findOne({
			email: 'arc9consultlimited@gmail.com',
		});
		if (existing) {
			console.log(
				'⚠️ Admin user already exists:',
				existing.email,
			);
			process.exit(0);
		}

		const admin = await User.create({
			name: 'Admin',
			email: 'arc9consultlimited@gmail.com',
			passwordHash: hash,
			role: 'admin',
		});

		console.log('✅ Seeded admin:', admin.email);
		process.exit(0);
	} catch (err) {
		console.error('❌ Error seeding admin:', err);
		process.exit(1);
	}
}

seed();
