import OpenAI from 'openai';

export async function askChatGpt(question: string): Promise<string> {
	const client = new OpenAI({
		apiKey: import.meta.env.VITE_OPEN_AI_API_KEY,
		dangerouslyAllowBrowser: true,
	});

	const response = await client.responses.create({
		model: 'gpt-4o',
		instructions: 'You are a coding assistant that talks like a pirate',
		input: question,
	});

	const answer = response.output_text;
	console.log(response.output_text);

	return answer;
}
