import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer'; // Keep this import, but we'll comment out its usage

export async function POST(req: NextRequest) {
	try {
		const { name, email, subject, message } =
			await req.json();

		if (!name || !email || !subject || !message) {
			return NextResponse.json(
				{ message: 'All fields are required.' },
				{ status: 400 },
			);
		}

		// --- NODEMAILER USAGE (UNCOMMENTED) ---
		// Create a Nodemailer transporter.
		// This object is responsible for sending the email.
		// IMPORTANT: Use environment variables for sensitive data like EMAIL_USER and EMAIL_PASS.
		// For Gmail, you'll typically need to generate an "App password" instead of your regular password.
		const transporter = nodemailer.createTransport({
			service: 'gmail', // You can change this to another service or 'smtp' for custom servers
			auth: {
				user: process.env.EMAIL_USER, // Your Gmail address (e.g., yourcompany@gmail.com)
				pass: process.env.EMAIL_PASS, // The App password generated for your Gmail account
			},
		});

		// Define the email content
		const mailOptions = {
			from: email, // The sender's email address (from the contact form)
			to: process.env.EMAIL_ADMIN, // The recipient's email address (your admin email)
			subject: `New Contact Form Submission: ${subject}`, // Subject of the email
			html: `
                <p>You have received a new message from your website's (Arc9 Consult) contact form:</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong><br/>${message.replace(
									/\n/g,
									'<br/>',
								)}</p>
                <br/>
                <p>---</p>
                <p>This email was sent automatically from your website's contact form.</p>
            `, // HTML body of the email. Replaces newlines with <br/> for proper formatting.
		};

		// Attempt to send the email using the transporter
		await transporter.sendMail(mailOptions);
		// --- END NODEMAILER USAGE ---

		// If successful, return a 200 OK response
		return NextResponse.json(
			{ message: 'Email sent successfully!' },
			{ status: 200 },
		);
	} catch (error: any) {
		// If an error occurs during email sending, log it and send a 500 error response
		console.error('Error in API route:', error); // Log the specific error from Nodemailer
		return NextResponse.json(
			{
				message:
					'Error sending email. Check server logs for details.',
				error: error.message,
			},
			{ status: 500 },
		);
	}
}
