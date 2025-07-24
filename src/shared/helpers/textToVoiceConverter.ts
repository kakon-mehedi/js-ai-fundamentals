

export async function convertTextToVoice(text: string): Promise<Blob> {
	const OPEN_AI_API_KEY = import.meta.env.VITE_OPEN_AI_API_KEY;

	const response = await fetch('https://api.openai.com/v1/audio/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${OPEN_AI_API_KEY}`, // Replace with your actual API key
		},
		body: JSON.stringify({
			model: 'gpt-4o-mini-tts',
			voice: 'nova',
			input: text,
			instructions:
				'Your name is Borsha. User interact with you in voice and the text that you are given is a transcription of what user has said. You have to reply back in short ans that can be converted back to voice and played to the user. Add emotions in your text.',
			response_format: 'mp3',
		}),
	});

	const audioBlob = await response.blob();

	console.log("Blob type:", audioBlob.type);

	return audioBlob;
}
