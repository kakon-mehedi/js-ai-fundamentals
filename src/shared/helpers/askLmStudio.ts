import { LM_STUDIO_COMPLETION_API_URL } from '../constants/api-urls';

export async function askLmStudio(query: string): Promise<string> {
	const maximumWordYourResponseShouldConsider = 1000;

	const res = await fetch(LM_STUDIO_COMPLETION_API_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			prompt: query,
			max_tokens: maximumWordYourResponseShouldConsider,
			temperature: 0.7,
			stop: ['</s>'],
		}),
	});
	if (!res.ok) throw new Error('LLM request failed');
	const data = await res.json();
	return data.choices?.[0]?.text || '';
}
