const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = process.env.port || 3000
app.listen(port, () => {
    console.log(`Starting Server at ${port}`);
});
app.use(express.static('public'));


const apiKey = process.env.WEATHER_API_KEY;
const baseURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}&q=`;

app.get('/weather/:cityName', async (request, response) => {
    const cityName = request.params.cityName;
    const finalURL = baseURL + cityName;

    const fetch_response = await fetch(finalURL);
    const response_json = await fetch_response.json();

    if (response_json.cod == '404')
        response.status(404).json({ message: response_json.message });
    else
        response.json(response_json);
});
