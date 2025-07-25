export interface OpenedAiSpeechSetting {
	model: string;
	voice: string;
	response_format: string;
	speed: number; // 0.25-4.0 (and more)
}
