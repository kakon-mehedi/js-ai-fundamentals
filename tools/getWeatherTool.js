const { default: axios } = require("axios");
const { Tool } = require("langchain/tools");

const getWeatherTool = new Tool({
	name: 'getWeather',
	description: "Get tomorrow's weather report for a given city",
	func: async (city) => {
		const API_KEY = 'your-openweather-api-key';
		const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
		const response = await axios.get(url);
		const tomorrowData = response.data.list[8]; // Approx 24hr later
		return `Tomorrow's weather in ${city}: ${tomorrowData.weather[0].description}, temp: ${tomorrowData.main.temp}°C.`;
	},
});

module.exports = {
	getWeatherTool
}
