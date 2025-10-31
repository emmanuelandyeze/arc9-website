// components/LogoutButton.jsx or within your client component
'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
	const handleLogout = (e: any) => {
		e.preventDefault(); // Prevent default link behavior if still using <Link> or <a>

		// This is the correct way to ensure the session is cleared
		// AND THEN the user is redirected to the home page (/).
		signOut({ callbackUrl: '/' });
	};

	return (
		<button
			onClick={handleLogout}
			className="px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-md"
		>
			Log Out
		</button>
	);
}
