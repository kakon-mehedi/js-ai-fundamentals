export async function speak(text: string) {
	const response = await fetch('https://api.openai.com/v1/audio/speech', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${OPENAI_API_KEY}`, // Replace with your actual API key
		},
		body: JSON.stringify({
			model: 'gpt-4o-mini-tts',
			voice: 'nova',
			input: text,
			instructions:
				'You name is Niko. User interact with you in voice and the text that you are given is a transcription of what user has said. You have to reply back in short ans that can be converted back to voice and played to the user. Add emotions in your text.',
			response_format: 'mp3',
		}),
	});

	const audioBlob = await response.blob();
	const url = URL.createObjectURL(audioBlob);
	const audio = document.getElementById('audio');
	audio.src = url;
	audio.play();
}
