import Lottie from 'lottie-react';
import React, { useEffect, useState } from 'react';
import SpeechRecognition, {
	useSpeechRecognition,
} from 'react-speech-recognition';
import talkAnimation from '../../../assets/animations/talkAnimation.json';

import './AiGfChat.css';
;
import { textToSpeechLocalAsync } from '../../../shared/helpers/textToVoiceConverterLocal';
import { askLmStudio } from '../../../shared/helpers/askLmStudio';
import { cleanTextForVoiceOver } from '../../../shared/helpers/cleanTextForVoiceOver';


const AiGfChat: React.FC = () => {
	const {
		transcript,
		listening,
		browserSupportsSpeechRecognition,
		finalTranscript,
	} = useSpeechRecognition();

	const [isTalking, setIsTalking] = useState(false);

	const handleStart = () => {
		setIsTalking(false);
		SpeechRecognition.startListening({
			continuous: false,
			interimResults: false,
		});
	};

	const handleStop = () => {
		SpeechRecognition.stopListening();

		if (transcript.trim().length > 0) {
			setIsTalking(true);
			setTimeout(() => setIsTalking(false), 3000);
		}
	};

	useEffect(() => {
		if (!listening && transcript.trim().length > 0) {
			setIsTalking(true);
			setTimeout(() => setIsTalking(false), 3000);
		}
	}, [listening, transcript]);

	useEffect(() => {
		if (!finalTranscript) return;
		queryAndSpeak(finalTranscript);
	}, [finalTranscript]);

	async function queryAndSpeak(query: string) {
		const answer = await askLmStudio(query);
		const cleanedText = cleanTextForVoiceOver(answer);
		await textToSpeechLocalAsync(cleanedText);
	}

	if (!browserSupportsSpeechRecognition) {
		return <p>Your browser does not support speech recognition.</p>;
	}

	console.log(isTalking);

	return (
		<div className='chat-container'>
			<button className='download-btn'>Download</button>

			<div className='avatar'>
				<Lottie
					animationData={talkAnimation}
					loop
					className='avatar-animation'
				/>
			</div>

			<div className='controls'>
				{!listening ? (
					<button
						className='talk-button'
						onClick={handleStart}
					>
						🎙️ Start Talking
					</button>
				) : (
					<button
						className='talk-button stop'
						onClick={handleStop}
					>
						⏹️ Stop
					</button>
				)}
				<p className='status-text'>
					{listening ? 'Listening...' : 'Click start to talk'}
				</p>
				{transcript && (
					<p className='transcript-text'>
						<strong>You said:</strong> {transcript}
					</p>
				)}
			</div>
		</div>
	);
};

export default AiGfChat;
