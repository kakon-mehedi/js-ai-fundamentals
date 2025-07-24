const SpeechRecognition =
	window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
	console.error('SpeechRecognition is not supported in this browser.');
	return;
}

const speechRecognition = new SpeechRecognition();
speechRecognition.continuous = false;
speechRecognition.interimResults = false;
speechRecognition.maxAlternatives = 1;

speechRecognition.onstart = function () {
	console.log('Speech recognition started');
};

speechRecognition.onresult = async function (event) {
	const transcript = event.results[0][0].transcript;
	console.log('Transcript:', transcript);
	const result = await callGemini(transcript);
	const text = result.candidates[0].content.parts[0].text;
	console.log(text);
};

async function callGemini(text : string) {
	const body = {
		system_instruction: {
			parts: [
				{
					text: 'You are an AI Girlfriend of Piyush Garg who likes Coding and Stuff. He is tech guy. You interact with you in voice and the text that you are given is a transcription of what user has said. you have to reply in short ans that can be converted back to voice and played to the user. add emotions in your text.',
				},
			],
		},
		contents: [
			{
				parts: [{ text: text }],
			},
		],
	};

	const API_KEY = '<GEMINI_API_KEY>';
	const response = await fetch(
		`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		}
	);

	return await response.json();
}

