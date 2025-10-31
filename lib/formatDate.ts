// utils/formatDate.ts
import { formatInTimeZone } from 'date-fns-tz';

const WAT = 'Africa/Lagos'; // UTC+1

/**
 * Formats an ISO date string into a readable format in WAT (West African Time)
 * @param isoString - ISO date string (e.g., "2025-10-31T09:26:46.163Z")
 * @param formatStr - Optional format (default: "MMMM d, yyyy, h:mm a")
 * @returns Formatted date string
 */
export function formatDate(
	isoString: string | Date,
	formatStr: string = 'MMMM d, yyyy, h:mm a',
): string {
	try {
		const date =
			typeof isoString === 'string'
				? new Date(isoString)
				: isoString;

		if (isNaN(date.getTime())) {
			throw new Error('Invalid date');
		}

		return formatInTimeZone(date, WAT, formatStr);
	} catch (error) {
		console.error('Date formatting error:', error);
		return 'Invalid Date';
	}
}
