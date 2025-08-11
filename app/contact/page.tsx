'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaInstagram,
} from 'react-icons/fa';

const ContactPage = () => {
    // State to hold form input values
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    // State to manage the submission loading state
    const [isSubmitting, setIsSubmitting] = useState(false);
    // State to track the status of the submission (idle, success, error)
    const [submitStatus, setSubmitStatus] = useState<
        'idle' | 'success' | 'error'
    >('idle');
    // State to store and display any error messages
    const [errorMessage, setErrorMessage] = useState('');

    // Handles changes to input fields and updates the formData state
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

    // Handles the form submission
    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>,
    ) => {
        e.preventDefault(); // Prevent the default browser form submission
        setIsSubmitting(true); // Set submitting state to true to disable button and show loading text
        setSubmitStatus('idle'); // Reset submission status
        setErrorMessage(''); // Clear any previous error messages

        // Basic client-side validation: check if all fields are filled
        if (
            !formData.name ||
            !formData.email ||
            !formData.subject ||
            !formData.message
        ) {
            setSubmitStatus('error');
            setErrorMessage('Please fill in all fields.');
            setIsSubmitting(false); // Re-enable the button
            return; // Stop the submission process
        }

        try {
            // Make a POST request to your Next.js API route
            // This endpoint (which we'll create next) will handle sending the email
            const response = await fetch('/api/contact', {
                method: 'POST', // Use POST method to send data
                headers: {
                    'Content-Type': 'application/json', // Specify content type as JSON
                },
                body: JSON.stringify(formData), // Convert form data to JSON string for the request body
            });

            // Check if the server response was not OK (e.g., status 4xx or 5xx)
            if (!response.ok) {
                // Attempt to parse a specific error message from the server response
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to send message.');
            }

            // If the response is OK, parse the success message
            const result = await response.json();
            console.log(result); // Log the success message from your API route

            setSubmitStatus('success'); // Update submission status to success
            // Clear the form fields after a successful submission
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
            });
        } catch (error: any) {
            setSubmitStatus('error'); // Update submission status to error
            // Set the error message to display to the user
            setErrorMessage(
                error.message ||
                    'Something went wrong. Please try again.',
            );
        } finally {
            setIsSubmitting(false); // Always reset submitting state once the fetch request is complete
        }
    };

    return (
			<main className="min-h-screen bg-white text-gray-900 font-sans">
				{/* Hero Section */}
				<section
					className={`relative h-[55vh] flex items-center justify-center text-center bg-cover bg-center`}
					style={{
						// Using a placeholder image for demonstration in Canvas
						backgroundImage:
							'url(/images/projects/service2.png)',
					}}
				>
					<div className="absolute inset-0 bg-black/60"></div>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="relative z-10 px-4 sm:px-6 lg:px-8"
					>
						<h1
							className={`text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight mb-4 font-serif`}
						>
							Get In Touch
						</h1>
						<p
							className={`text-lg sm:text-xl text-white/90 max-w-3xl mx-auto font-sans`}
						>
							We'd love to hear from you! Reach out to
							discuss your project or any inquiries you may
							have.
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
								className={`text-4xl font-extrabold text-[#9C110E] mb-6 font-serif`}
							>
								Let's Connect
							</h2>
							<p
								className={`text-lg text-gray-700 mb-8 font-sans`}
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
											className={`text-xl font-semibold font-serif`}
										>
											Phone
										</h3>
										<p
											className={`text-lg text-gray-700 font-sans`}
										>
											+234 810 275 1710
										</p>
									</div>
								</div>
								<div className="flex items-center justify-center lg:justify-start gap-4">
									<FaEnvelope className="text-[#9C110E] text-2xl" />
									<div>
										<h3
											className={`text-xl font-semibold font-serif`}
										>
											Email
										</h3>
										<p
											className={`text-lg text-gray-700 font-sans`}
										>
											arc9consultlimited@gmail.com
										</p>
									</div>
								</div>
								<div className="flex items-center justify-center lg:justify-start gap-4">
									<FaMapMarkerAlt className="text-[#9C110E] text-2xl" />
									<div>
										<h3
											className={`text-xl font-semibold font-serif`}
										>
											Address
										</h3>
										<p
											className={`text-lg text-gray-700 font-sans`}
										>
											House 10, Covenant Estate Off Chief
											Yesufu Abiodun, Oniru Road, Maroko
											Lagos
										</p>
									</div>
								</div>
							</div>

							<div className="mt-10">
								<h3
									className={`text-2xl font-bold mb-4 font-serif`}
								>
									Follow Us
								</h3>
								<div className="flex justify-center lg:justify-start gap-6">
									{/* Social media links */}
									<motion.a
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
									</motion.a>
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
								className={`text-4xl font-extrabold text-gray-800 mb-8 text-center font-serif`}
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
										className={`block text-lg font-medium text-gray-700 mb-2 font-sans`}
									>
										Your Name
									</label>
									<input
										type="text"
										id="name"
										name="name"
										value={formData.name}
										onChange={handleChange}
										className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9C110E] focus:border-transparent transition-all duration-200 font-sans`}
										placeholder="John Doe"
										required
									/>
								</div>
								<div>
									<label
										htmlFor="email"
										className={`block text-lg font-medium text-gray-700 mb-2 font-sans`}
									>
										Your Email
									</label>
									<input
										type="email"
										id="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9C110E] focus:border-transparent transition-all duration-200 font-sans`}
										placeholder="john.doe@example.com"
										required
									/>
								</div>
								<div>
									<label
										htmlFor="subject"
										className={`block text-lg font-medium text-gray-700 mb-2 font-sans`}
									>
										Subject
									</label>
									<input
										type="text"
										id="subject"
										name="subject"
										value={formData.subject}
										onChange={handleChange}
										className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9C110E] focus:border-transparent transition-all duration-200 font-sans`}
										placeholder="Project Inquiry, Collaboration, etc."
										required
									/>
								</div>
								<div>
									<label
										htmlFor="message"
										className={`block text-lg font-medium text-gray-700 mb-2 font-sans`}
									>
										Your Message
									</label>
									<textarea
										id="message"
										name="message"
										rows={5}
										value={formData.message}
										onChange={handleChange}
										className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9C110E] focus:border-transparent transition-all duration-200 font-sans`}
										placeholder="Describe your project or inquiry in detail..."
										required
									></textarea>
								</div>

								{/* Submission status messages */}
								{submitStatus === 'success' && (
									<motion.p
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className="text-green-600 font-semibold text-center mt-4"
									>
										Message sent successfully! We'll get
										back to you soon.
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

								{/* Submit button with loading state */}
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
			</main>
		);
};

export default ContactPage;
