'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Playfair_Display,
    Work_Sans,
} from 'next/font/google';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react'; // Icons for navigation and close
import Link from 'next/link';

const playfair = Playfair_Display({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-playfair',
});

const work_sans = Work_Sans({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-worksans',
});

interface BlogPost {
	slug: string; // Unique slug for the post's URL (e.g., "designing-the-future")
	title: string;
	excerpt: string; // Short summary
	image: {
		url: string;
	};
	createdAt: string; // Date string (e.g., 'July 15, 2025')
}

// Component for the Single Project Page
const AdminBlogList = ({ posts }: { posts: BlogPost[] } ) => {
	// Function to handle blog post deletion
	async function deletePost(slug: string) {
		if (
			!confirm('Are you sure you want to delete this post?')
		) {
			return;
		}

		try {
			const res = await fetch(`/api/blog/${slug}`, {
				method: 'DELETE',
			});
			if (!res.ok) {
				throw new Error('Failed to delete post');
			}
			alert('Post deleted successfully');
			// Refresh the page to reflect changes
			window.location.reload();
		} catch (error) {
			alert(
				`Error deleting post: ${(error as Error).message}`,
			);
		}
    }
    
	return (
		<main className="bg-white text-gray-900">
			<section className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
				{posts.length > 0 ? (
					<ul className="divide-y divide-gray-100">
						{/* Map through posts and display them */}
						{posts.map((p: any) => (
							<li
								key={String(p._id)} // Unique key for list items
								className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-5 hover:bg-green-50 transition-colors duration-200"
							>
								<div className="flex-1">
									<strong className="block text-xl font-semibold text-gray-800">
										{p.title}
									</strong>
									<span className="text-gray-500 text-sm mt-1 block">
										Created:{' '}
										{new Date(
											p.createdAt,
										).toLocaleDateString()}
									</span>
								</div>
								<div className="mt-4 sm:mt-0">
									<button
										onClick={() => deletePost(p.slug)}
										className="inline-flex items-center px-5 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 transition-colors duration-200 shadow-sm"
									>
										Delete post
									</button>
								</div>
							</li>
						))}
					</ul>
				) : (
					// Message when no blog posts are found
					<div className="p-8 text-center text-gray-500 text-lg">
						No blog posts found.
						<Link
							href="/admin/blog/new"
							className="text-blue-600 hover:underline ml-2 font-medium"
						>
							Create your first post here
						</Link>
						.
					</div>
				)}
			</section>
		</main>
	);
};

export default AdminBlogList;
