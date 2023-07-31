const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = process.env.port || 3000
app.listen(port, () => {
    console.log(`Starting Server at ${port}`);
});
app.use(express.static('public'));


const apiKey = "49144f1653786902a8edaa421481bdd7";
const baseURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}&q=`;

app.get('/weather/:cityName', async (request, response) => {
    const cityName = request.params.cityName;
    const finalURL = baseURL + cityName;

    const fetch_response = await fetch(finalURL);
    const json = await fetch_response.json();
    response.json(json);
});
