'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
	Playfair_Display,
	Work_Sans,
} from 'next/font/google';
import {
	FaPhoneAlt,
	FaEnvelope,
	FaMapMarkerAlt,
	FaFacebookF,
	FaTwitter,
	FaLinkedinIn,
	FaInstagram,
} from 'react-icons/fa';
import Image from 'next/image';

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

const ContactPage = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<
		'idle' | 'success' | 'error'
	>('idle');
	const [errorMessage, setErrorMessage] = useState('');

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement
		>,
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
	) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus('idle');
		setErrorMessage('');

		// Basic validation
		if (
			!formData.name ||
			!formData.email ||
			!formData.subject ||
			!formData.message
		) {
			setSubmitStatus('error');
			setErrorMessage('Please fill in all fields.');
			setIsSubmitting(false);
			return;
		}

		// Simulate API call
		try {
			// In a real application, you would make a POST request here:
			// const response = await fetch('/api/contact', {
			//     method: 'POST',
			//     headers: {
			//         'Content-Type': 'application/json',
			//     },
			//     body: JSON.stringify(formData),
			// });

			// if (!response.ok) {
			//     throw new Error('Failed to send message.');
			// }

			// const result = await response.json();
			// console.log(result); // Log success message from API

			// Simulate network delay
			await new Promise((resolve) =>
				setTimeout(resolve, 1500),
			);

			// Assuming success after simulation
			setSubmitStatus('success');
			setFormData({
				name: '',
				email: '',
				subject: '',
				message: '',
			}); // Clear form
		} catch (error: any) {
			setSubmitStatus('error');
			setErrorMessage(
				error.message ||
					'Something went wrong. Please try again.',
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<main className="bg-white text-gray-900">
			{/* Hero Section */}
			<section
				className={`relative h-[55vh] flex items-center justify-center text-center bg-cover bg-center`}
				style={{
					backgroundImage: 'url(/images/contact-hero.jpg)',
				}} // Use a relevant hero image
			>
				<div className="absolute inset-0 bg-black/60"></div>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="relative z-10 px-4 sm:px-6 lg:px-8"
				>
					<h1
						className={`text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight mb-4 ${playfair.className}`}
					>
						Get In Touch
					</h1>
					<p
						className={`text-lg sm:text-xl text-white/90 max-w-3xl mx-auto ${work_sans.className}`}
					>
						We'd love to hear from you! Reach out to discuss
						your project or any inquiries you may have.
					</p>
				</motion.div>
			</section>

			{/* Contact Details & Form Section */}
			<section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
				<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
					{/* Contact Information */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="space-y-10 text-center lg:text-left"
					>
						<h2
							className={`text-4xl font-extrabold text-[#9C110E] mb-6 ${playfair.className}`}
						>
							Let's Connect
						</h2>
						<p
							className={`text-lg text-gray-700 mb-8 ${work_sans.className}`}
						>
							We are eager to collaborate on your next
							architectural or design venture. Contact us
							through any of the following channels.
						</p>

						<div className="space-y-6">
							<div className="flex items-center justify-center lg:justify-start gap-4">
								<FaPhoneAlt className="text-[#9C110E] text-2xl" />
								<div>
									<h3
										className={`text-xl font-semibold ${playfair.className}`}
									>
										Phone
									</h3>
									<p
										className={`text-lg text-gray-700 ${work_sans.className}`}
									>
										+234 810 275 1710
									</p>
								</div>
							</div>
							<div className="flex items-center justify-center lg:justify-start gap-4">
								<FaEnvelope className="text-[#9C110E] text-2xl" />
								<div>
									<h3
										className={`text-xl font-semibold ${playfair.className}`}
									>
										Email
									</h3>
									<p
										className={`text-lg text-gray-700 ${work_sans.className}`}
									>
										arc9consultlimited@gmail.com
									</p>
								</div>
							</div>
							<div className="flex items-center justify-center lg:justify-start gap-4">
								<FaMapMarkerAlt className="text-[#9C110E] text-2xl" />
								<div>
									<h3
										className={`text-xl font-semibold ${playfair.className}`}
									>
										Address
									</h3>
									<p
										className={`text-lg text-gray-700 ${work_sans.className}`}
									>
										House 10, Covenant Estate Off Chief
										Yesufu Abiodun, Oniru Road, Maroko Lagos
									</p>
								</div>
							</div>
						</div>

						<div className="mt-10">
							<h3
								className={`text-2xl font-bold mb-4 ${playfair.className}`}
							>
								Follow Us
							</h3>
							<div className="flex justify-center lg:justify-start gap-6">
								{/* <motion.a
									href="https://facebook.com"
									target="_blank"
									rel="noopener noreferrer"
									whileHover={{
										scale: 1.2,
										color: '#4267B2',
									}}
									className="text-gray-600 hover:text-[#9C110E] transition-colors duration-300"
								>
									<FaFacebookF size={28} />
								</motion.a>
								<motion.a
									href="https://twitter.com"
									target="_blank"
									rel="noopener noreferrer"
									whileHover={{
										scale: 1.2,
										color: '#1DA1F2',
									}}
									className="text-gray-600 hover:text-[#9C110E] transition-colors duration-300"
								>
									<FaTwitter size={28} />
								</motion.a>
								<motion.a
									href="https://linkedin.com"
									target="_blank"
									rel="noopener noreferrer"
									whileHover={{
										scale: 1.2,
										color: '#0077B5',
									}}
									className="text-gray-600 hover:text-[#9C110E] transition-colors duration-300"
								>
									<FaLinkedinIn size={28} />
								</motion.a> */}
								<motion.a
									href="https://www.instagram.com/arc9consult/?hl=en"
									target="_blank"
									rel="noopener noreferrer"
									whileHover={{
										scale: 1.2,
										color: '#E4405F',
									}}
									className="text-gray-600 hover:text-[#9C110E] transition-colors duration-300"
								>
									<FaInstagram size={28} />
								</motion.a>
							</div>
						</div>
					</motion.div>

					{/* Contact Form */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="bg-white p-8 md:p-10 rounded-xl shadow-2xl"
					>
						<h2
							className={`text-4xl font-extrabold text-gray-800 mb-8 text-center ${playfair.className}`}
						>
							Send Us a Message
						</h2>
						<form
							onSubmit={handleSubmit}
							className="space-y-6"
						>
							<div>
								<label
									htmlFor="name"
									className={`block text-lg font-medium text-gray-700 mb-2 ${work_sans.className}`}
								>
									Your Name
								</label>
								<input
									type="text"
									id="name"
									name="name"
									value={formData.name}
									onChange={handleChange}
									className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9C110E] focus:border-transparent transition-all duration-200 ${work_sans.className}`}
									placeholder="John Doe"
									required
								/>
							</div>
							<div>
								<label
									htmlFor="email"
									className={`block text-lg font-medium text-gray-700 mb-2 ${work_sans.className}`}
								>
									Your Email
								</label>
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9C110E] focus:border-transparent transition-all duration-200 ${work_sans.className}`}
									placeholder="john.doe@example.com"
									required
								/>
							</div>
							<div>
								<label
									htmlFor="subject"
									className={`block text-lg font-medium text-gray-700 mb-2 ${work_sans.className}`}
								>
									Subject
								</label>
								<input
									type="text"
									id="subject"
									name="subject"
									value={formData.subject}
									onChange={handleChange}
									className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9C110E] focus:border-transparent transition-all duration-200 ${work_sans.className}`}
									placeholder="Project Inquiry, Collaboration, etc."
									required
								/>
							</div>
							<div>
								<label
									htmlFor="message"
									className={`block text-lg font-medium text-gray-700 mb-2 ${work_sans.className}`}
								>
									Your Message
								</label>
								<textarea
									id="message"
									name="message"
									rows={5}
									value={formData.message}
									onChange={handleChange}
									className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9C110E] focus:border-transparent transition-all duration-200 ${work_sans.className}`}
									placeholder="Describe your project or inquiry in detail..."
									required
								></textarea>
							</div>

							{submitStatus === 'success' && (
								<motion.p
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									className="text-green-600 font-semibold text-center mt-4"
								>
									Message sent successfully! We'll get back
									to you soon.
								</motion.p>
							)}
							{submitStatus === 'error' && (
								<motion.p
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									className="text-red-600 font-semibold text-center mt-4"
								>
									{errorMessage ||
										'Failed to send message. Please try again later.'}
								</motion.p>
							)}

							<motion.button
								type="submit"
								className={`w-full px-6 py-3 rounded-lg text-xl font-semibold shadow-md transition-all duration-300 ease-in-out ${
									isSubmitting
										? 'bg-gray-400 cursor-not-allowed'
										: 'bg-[#9C110E] text-white hover:bg-[#7b0d0c] hover:shadow-lg'
								}`}
								whileHover={{
									scale: isSubmitting ? 1 : 1.02,
								}}
								whileTap={{
									scale: isSubmitting ? 1 : 0.98,
								}}
								disabled={isSubmitting}
							>
								{isSubmitting
									? 'Sending...'
									: 'Send Message'}
							</motion.button>
						</form>
					</motion.div>
				</div>
			</section>

			{/* Google Map Section (Optional - Requires Google Maps API Key) */}
			<section className="py-16 bg-gray-100">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.h2
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: 'easeOut' }}
						className={`text-4xl sm:text-5xl font-serif font-bold leading-tight tracking-tight text-center text-gray-800 mb-12 ${playfair.className}`}
					>
						Find Our{' '}
						<span className="text-[#9C110E]">Office</span>
					</motion.h2>
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-xl border border-gray-200"
					>
						{/* Replace with your actual Google Map embed or a map component */}
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.636612711311!2d3.3982823750000003!3d6.43806299355745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b1a2d1d1d1d%3A0x1c1c1c1c1c1c1c1c!2sVictoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1678886400000!5m2!1sen!2sng" // Example iframe for Victoria Island, Lagos
							width="100%"
							height="100%"
							style={{ border: 0 }}
							allowFullScreen={false}
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
							title="Office Location"
						></iframe>
						{/* Placeholder overlay if map doesn't load or for design */}
						<div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center pointer-events-none">
							<p className="text-gray-700 text-lg font-semibold">
								Map loading... (Replace with actual Google
								Maps embed)
							</p>
						</div>
					</motion.div>
				</div>
			</section>
		</main>
	);
};

export default ContactPage;
