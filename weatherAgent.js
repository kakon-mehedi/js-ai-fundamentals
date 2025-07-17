require('dotenv').config();
import "dotenv/config.js";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { ChatOpenAI } from "langchain/chat_models/openai";


const { getWeatherTool } = require('./tools/getWeatherTool');
const { pdfGenerateTool } = require('./tools/pdfGenerateTool');
const { emailSendTool } = require('./tools/emailSendTool');

async function runAgent() {
	const model = new ChatOpenAI({
		temperature: 0,
		openAIApiKey: process.env.OPENAI_API_KEY,
	});
	const tools = [getWeatherTool, pdfGenerateTool, emailSendTool];

	const executor = await initializeAgentExecutorWithOptions(tools, model, {
		agentType: 'openai-functions',
		verbose: true,
	});

	const result = await executor.invoke({
		input: "Check tomorrow's weather in Dhaka and email me the report as a PDF.",
	});

	console.log('Final Output:', result.output);
}

runAgent();
