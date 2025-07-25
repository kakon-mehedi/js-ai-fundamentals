export function cleanTextForVoiceOver(rawText: string): string {
	const cleaned = rawText
		// Remove markdown-style bold/italic/code: **text**, *text*, `code`
		.replace(/[*_~`]+/g, '')

		// Remove bullet points: * item, - item, + item
		.replace(/^\s*[-*+]\s+/gm, '')

		// Remove numbered lists: 1. item
		.replace(/^\s*\d+\.\s+/gm, '')

		// Replace multiple newlines and carriage returns with a space
		.replace(/[\r\n]+/g, ' ')

		// Remove leading ? or similar symbols from the beginning of lines
		.replace(/^\s*[?.!,]+/gm, '')

		// Collapse multiple spaces
		.replace(/\s{2,}/g, ' ')

		// Trim final string
		.trim();

	return cleaned;
}
