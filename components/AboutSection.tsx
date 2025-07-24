import Image from 'next/image';
import React from 'react';

const AboutSection = () => {
	return (
		<section className="bg-neutral-100 py-10 md:py-20 px-5 md:px-0 gap-4 text-left md:text-center w-full flex md:flex-row-reverse flex-col items-left md:items-center justify-center">
			<div className="max-w-3xl mx-auto">
				<h2 className="text-4xl font-heading text-neutral-800 mb-6">
					Our Vision Beyond Services
				</h2>
				<p className="text-lg text-neutral-600 font-body">
					At Arc9 Consult, we believe in creating more than
					just structures; we build legacies. Our
					multidisciplinary approach to architecture,
					interior design, and project management is rooted
					in a commitment to innovation, sustainability, and
					unparalleled client satisfaction.
				</p>
			</div>
			<div className="w-full flex justify-center items-center">
				<Image
					src={'/images/projects/v2.png'}
					alt={'Arc9 Consult Building Image'}
					width={700}
					height={700}
					className="rounded-2xl w-full max-w-md md:max-w-full object-cover border-white/20 transform hover:scale-105 transition-transform duration-300 ease-in-out"
				/>
			</div>
		</section>
	);
};

export default AboutSection;
