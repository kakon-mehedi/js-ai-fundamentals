export function speakFromAudioBlob(
	audioBlob: Blob,
	audioElem?: HTMLAudioElement
): HTMLAudioElement | undefined {
	const audioElement = audioElem ?? createAndAttachHtmlAudioElement();

	if (!audioElement) {
		console.warn('Failed to create or use an audio element.');
		return;
	}

	const url = URL.createObjectURL(audioBlob);
	
	audioElement.src = url;
	
	audioElement.play().catch((err) => {
		console.error('Failed to play audio:', err);
	});

	return audioElement;
}

function createAndAttachHtmlAudioElement(): HTMLAudioElement | undefined {
	if (typeof window === 'undefined') return;

	const audio = document.createElement('audio');
	audio.controls = false;
	audio.style.display = 'none'; // hide it
	document.body.appendChild(audio);

	return audio;
}
