function attachEvents() {
    document.getElementById('submit').addEventListener('click', getWeatherForecast);
}

attachEvents();

async function getWeatherForecast() {
    const input = document.getElementById('location');
    const cityName = input.value;

    if(cityName.toLowerCase() != "new york"
     && cityName.toLowerCase() != "london"
    &&cityName.toLowerCase() != "barcelona"
    ){
        document.querySelector('#forecast').style.display = 'block';
        const current = document.getElementById('current');
        console.log(current.textContent = 'Error');
        return;
    }

    const code = await getWeatherCode(cityName);

    const current = await getCurrentForecast(code);
    const upcoming = await getUpcomingForecast(code);

    input.value = '';
}

async function getWeatherCode(cityName) {
    const url = 'http://localhost:3030/jsonstore/forecaster/locations';
    const response = await fetch(url);
    const data = await response.json();
    //console.log(data)
    return data.find(x => x.name.toLowerCase() == cityName.toLowerCase()).code

}

async function getCurrentForecast(code) {
    const currentUrl = 'http://localhost:3030/jsonstore/forecaster/today/' + code;
    const currentResponse = await fetch(currentUrl);
    const currentData = await currentResponse.json();

    const forecast = document.querySelector('#forecast');
    forecast.style.display = 'block';

    const symblos = {
        'Sunny': '&#x2600;',
        'Partly sunny': '&#x26C5;',
        'Overcast': '&#x2601;',
        'Rain': '&#x2614;',
        'Degrees': '&#176;'
    }

    const current = document.getElementById('current');
    const conditionSpan = document.createElement('span')
    conditionSpan.className = 'condition symbol';
    const weatherSymbol = currentData.forecast.condition;
    conditionSpan.innerHTML = symblos[weatherSymbol];
    current.appendChild(conditionSpan);

    const divForecast = e('div', { className: 'forecasts' });
    current.appendChild(divForecast);

    const condition = e('span', { className: 'condition' },
        e('span', { className: 'forecast-data' }, currentData.name));
    const weatherS = e('span', { className: 'forecast-data' });
    weatherS.innerHTML = `${currentData.forecast.low}&#176;/${currentData.forecast.high}&#176;`;
    condition.appendChild(weatherS);
    condition.appendChild(e('span', { className: 'forecast-data' }, currentData.forecast.condition));
    divForecast.appendChild(condition);

    //console.log(currentData.name);
}

async function getUpcomingForecast(code) {
    const threeDaysUrl = 'http://localhost:3030/jsonstore/forecaster/upcoming/' + code;
    const threeDaysResponse = await fetch(threeDaysUrl);
    const threeDaysData = await threeDaysResponse.json();

    const upcoming = document.getElementById('upcoming');
    const info = e('div', { className: 'forecast-info' });
    upcoming.appendChild(info);

    let day = Object.values(threeDaysData.forecast);
    const symblos = {
        'Sunny': '&#x2600;',
        'Partly sunny': '&#x26C5;',
        'Overcast': '&#x2601;',
        'Rain': '&#x2614;',
        'Degrees': '&#176;'
    }

    for (let d of day) {
        const upcomingSpan = e('span', { className: 'upcoming' });
        info.appendChild(upcomingSpan);
        const symbol = e('span', { className: 'symbol' });
        const wSymbol = d.condition;
        symbol.innerHTML = symblos[wSymbol];
        upcomingSpan.appendChild(symbol);
        //info.appendChild(symbol);
        const temp = e('span', { className: 'forecast-data' });
        temp.innerHTML = `${d.high}${symblos['Degrees']}/${d.low}${symblos['Degrees']}`
        upcomingSpan.appendChild(temp);
        const condition = e('span', { className: 'forecast-data' });
        condition.textContent = d.condition;
        upcomingSpan.appendChild(condition);
    }

}


function e(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        };
    });

    return result;
};
