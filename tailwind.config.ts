// tailwind.config.ts
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme'; // Import defaultTheme to extend sans/serif with fallbacks

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				// Client's Primary Brand Color (Red/Maroon)
				brandPrimary: {
					DEFAULT: '#C31B13', // The exact provided red
					light: '#DA4E43', // Lighter shade for hovers/highlights
					dark: '#9B160E', // Darker shade for contrast or deeper elements
				},
				// Client's Secondary/Neutral Brand Color (Medium Grey)
				brandNeutral: {
					DEFAULT: '#7A7A7A', // The exact provided grey
					light: '#A0A0A0', // Lighter grey for subtle backgrounds/borders
					dark: '#5C5C5C', // Darker grey for stronger emphasis
				},
				// General Neutrals (for backgrounds, body text, etc., ensuring readability)
				neutral: {
					'50': '#F9FAFB', // Very light background
					'100': '#F3F4F6',
					'200': '#E5E7EB',
					'300': '#D1D5DB',
					'400': '#9CA3AF',
					'500': '#6B7280', // Default body text (darker than brandNeutral for better contrast)
					'600': '#4B5563',
					'700': '#374151',
					'800': '#1F2937',
					'900': '#111827', // Darkest text/elements, close to black
				},
				// Semantic colors
				success: '#10B981',
				error: '#EF4444',
				warning: '#FBBF24',
			},
			fontFamily: {
				// Define CSS variables in layout.tsx first, then reference them here
				heading: [
					'var(--font-pacifico)',
					...defaultTheme.fontFamily.sans,
				],
				body: [
					'var(--font-pacifico)',
					...defaultTheme.fontFamily.sans,
				],
				kranky: [
					'var(--font-kranky)',
					...defaultTheme.fontFamily.sans,
				],
			},
			keyframes: {
				bounce: {
					// Default vertical bounce (used for RiArrowDownLine, RiSwipeUpLine)
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'bounce-mouse-vertical': {
					// Specific for desktop mouse icon
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(10px)' }, // Moves down
				},
				'pulse-arrow': {
					'0%, 100%': { opacity: '0.7' },
					'50%': { opacity: '1' },
				},
			},
			animation: {
				bounce: 'bounce 1.5s infinite',
				'bounce-mouse-vertical':
					'bounce-mouse-vertical 1.5s infinite',
				'pulse-arrow':
					'pulse-arrow 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
			},
		},
	},
	plugins: [],
};

export default config;
