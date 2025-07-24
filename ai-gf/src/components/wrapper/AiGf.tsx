import React, { useRef, useState } from 'react';
import './AiGf.css';

const SpeechRecognition =
	window.SpeechRecognition || (window as any).webkitSpeechRecognition;

type Message = {
	sender: 'You' | 'Niko';
	text: string;
};

const AiGfChat: React.FC = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const audioRef = useRef<HTMLAudioElement>(null);

	const recognition = SpeechRecognition ? new SpeechRecognition() : null;

	const startListening = () => {
		if (!recognition) {
			alert('Speech Recognition not supported in this browser');
			return;
		}

		recognition.continuous = false;
		recognition.interimResults = false;
		recognition.lang = 'en-US';

		recognition.onresult = async (event: SpeechRecognitionEvent) => {
			const transcript = event.results[0][0].transcript;
			addMessage('You', transcript);
			const result = await callGemini(transcript);
			const aiText =
				result?.candidates?.[0]?.content?.parts?.[0]?.text ||
				'Sorry, something went wrong.';
			addMessage('Niko', aiText);
			await speak(aiText);
		};

		recognition.onerror = (e: any) => {
			console.error('Speech recognition error', e);
		};

		recognition.start();
	};

	const addMessage = (sender: 'You' | 'Niko', text: string) => {
		setMessages((prev) => [...prev, { sender, text }]);
	};

	const callGemini = async (input: string) => {
		const body = {
			system_instruction: {
				parts: [
					{
						text: 'You are an AI Girlfriend of Piyush Garg who likes Coding and Stuff. Add emotions and keep replies short and sweet.',
					},
				],
			},
			contents: [
				{
					parts: [{ text: input }],
				},
			],
		};

		const response = await fetch(
			`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=<GEMINI_API_KEY>`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			}
		);

		return await response.json();
	};

	const speak = async (text: string) => {
		const response = await fetch('https://api.openai.com/v1/audio/speech', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer <OPENAI_API_KEY>`, // Replace with your OpenAI API key
			},
			body: JSON.stringify({
				model: 'tts-1',
				voice: 'nova',
				input: text,
				response_format: 'mp3',
			}),
		});

		const audioBlob = await response.blob();
		const url = URL.createObjectURL(audioBlob);

		if (audioRef.current) {
			audioRef.current.src = url;
			audioRef.current.play();
		}
	};

	const exportToPDF = async () => {
		const jsPDF = (await import('jspdf')).jsPDF;
		const doc = new jsPDF();

		let y = 10;
		messages.forEach((msg) => {
			const lines = doc.splitTextToSize(
				`${msg.sender}: ${msg.text}`,
				180
			);
			lines.forEach((line: string) => {
				doc.text(line, 10, y);
				y += 7;
			});
		});

		doc.save('conversation.pdf');
	};

	return (
		<div style={styles.container}>
			<h2>🎙️ AI Girlfriend (Niko)</h2>
			<button
				onClick={startListening}
				style={styles.button}
			>
				Start Talking
			</button>
			<audio
				ref={audioRef}
				controls
				style={{ margin: '10px 0' }}
			/>
			<button
				onClick={exportToPDF}
				style={styles.button}
			>
				Export to PDF
			</button>

			<div style={styles.chatBox}>
				{messages.map((msg, idx) => (
					<div
						key={idx}
						style={{
							color: msg.sender === 'You' ? 'blue' : 'green',
						}}
					>
						<strong>{msg.sender}:</strong> {msg.text}
					</div>
				))}
			</div>
		</div>
	);
};

export default AiGfChat;
