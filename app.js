const apiKey = "49144f1653786902a8edaa421481bdd7";
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}&q=`;

const input = document.querySelector('input');
const button = document.querySelector('button');

const errorContainer = document.querySelector('.error-container');
const mainContainer = document.querySelector('main');
const resultContainer = document.querySelector('.result-container');

const errorMsg = document.querySelector('.error');
const weatherIcon = document.querySelector('img');
const temperature = document.querySelector('.temperature');
const city = document.querySelector('.city');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');


function handleError (msg) {
    errorContainer.classList.remove('hidden');
    errorMsg.textContent = msg;
    resultContainer.classList.add('hidden');
    mainContainer.style.height = "249px";
}


async function checkWeather() {
    errorContainer.classList.add('hidden');

    if (input.value == '') {
        handleError("Provide City Name!");
        return;
    }

    try {
        const response = await fetch(baseUrl + input.value);
        if (response.status == "404") {
            handleError("Invalid City Name!");
            return;
        }

        let data = await response.json();
    
        weatherIcon.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
        temperature.textContent = Math.round(data.main.temp) + '°C';
        city.textContent = data.name;
        humidity.textContent = data.main.humidity + '%';
        windSpeed.textContent = data.wind.speed + ' Km/hr';

        resultContainer.classList.remove('hidden');
        mainContainer.style.height = "500px";
    }
    catch {
    }
}


input.addEventListener('change', checkWeather);
button.addEventListener('click', checkWeather);
