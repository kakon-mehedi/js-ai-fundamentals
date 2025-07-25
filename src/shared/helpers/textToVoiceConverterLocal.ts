import {
	OPENED_AI_SPEECH_API_URL_LOCAL,
	SELECTED_VOICE,
} from '../constants/opened-ai-speech-local';

export async function textToSpeechLocalAsync(text: string): Promise<void> {
	fetch(OPENED_AI_SPEECH_API_URL_LOCAL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			model: SELECTED_VOICE.model,
			input: text,
			voice: SELECTED_VOICE.voice,
			response_format: SELECTED_VOICE.response_format,
			speed: SELECTED_VOICE.speed,
		}),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.blob(); // since we're expecting audio/mp3
		})
		.then((blob) => {
			// Save or play the MP3 blob
			const url = URL.createObjectURL(blob);
			const audio = new Audio(url);
			audio.play(); // Or trigger a download if you want
		})
		.catch((error) => {
			console.error(
				'There was a problem with the fetch operation:',
				error
			);
		});
}
