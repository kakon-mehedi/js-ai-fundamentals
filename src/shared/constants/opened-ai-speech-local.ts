import type { OpenedAiSpeechSetting } from '../interfaces/opened-ai-speech-local.interface';

export const OPENED_AI_SPEECH_API_URL_LOCAL =
	'http://localhost:8000/v1/audio/speech';

export const alloy: OpenedAiSpeechSetting = {
	model: 'tts-1',
	voice: 'alloy',
	response_format: 'mp3',
	speed: 1,
};

export const alloyHd: OpenedAiSpeechSetting = {
	model: 'tts-1-hd',
	voice: 'alloy',
	response_format: 'mp3',
	speed: 0.0,
};

export const fable: OpenedAiSpeechSetting = {
	model: 'tts-1',
	voice: 'fable',
	response_format: 'mp3',
	speed: 0.0,
};

export const nova: OpenedAiSpeechSetting = {
	model: 'tts-1',
	voice: 'nova',
	response_format: 'mp3',
	speed: 0.0,
};

export const onyx: OpenedAiSpeechSetting = {
	model: 'tts-1',
	voice: 'onyx',
	response_format: 'mp3',
	speed: 0.0,
};

export const SELECTED_VOICE = alloy;
