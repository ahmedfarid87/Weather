let searchLocation = document.getElementById("searchLocation")

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(location) {
        let latitude = location.coords.latitude
        let longitude = location.coords.longitude
        getWeather(`${latitude},${longitude}`)
    })
}

async function getWeather(city) {
   let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${city}&days=3&key=7111e84058c140129a8164716241806`)
   let data = await res.json()
   displayCurrentDayWeather(data)
   displayTomorrowDay(data)
   displayAfterTomorrowDay(data)
}

searchLocation.addEventListener('input', function(eventInfo) {
    getWeather(eventInfo.target.value)
})

function displayCurrentDayWeather(data) {
    let currentDate = data.current.last_updated
    let date = new Date(currentDate)
    let todayDay = date.getDate();
    let todayWeek = date.toLocaleString('en-us', {weekday: 'long'})
    let todayMonth = date.toLocaleString('en-us', {month: 'long'})
    weekDayName.innerHTML = todayWeek
    dateToday.innerHTML = `${todayDay} ${todayMonth}`
    yourLocation.innerHTML = data.location.name
    tempToday.innerHTML = data.current.temp_c +'°C'
    natureOfDay.innerHTML = data.current.condition.text
    clearIcon.innerHTML = `<img src="${data.current.condition.icon}" alt="">`
    humidityToday.innerHTML = `${data.current.humidity} %`
    windSpeedToday.innerHTML = `${data.current.wind_kph} km/h`
    dirToday.innerHTML = `${data.current.wind_dir}`
}

function displayTomorrowDay(data) {
    let currentDate = data.forecast.forecastday[1].date
    let date = new Date(currentDate)
    let todayWeek = date.toLocaleString('en-us', {weekday: 'long'})
    tomorrowday.innerHTML = todayWeek
    clearIconTomorrow.innerHTML =  `<img src="${data.forecast.forecastday[1].day.condition.icon}" alt="">`
    maxTempTomorrow.innerHTML = data.forecast.forecastday[1].day.maxtemp_c +'°C'
    avgTempTomorrow.innerHTML = data.forecast.forecastday[1].day.avgtemp_c +'°C'
    natureofTempTomorrow.innerHTML = data.forecast.forecastday[1].day.condition.text
}

function displayAfterTomorrowDay(data) {
    let currentDate = data.forecast.forecastday[2].date
    let date = new Date(currentDate)
    let todayWeek = date.toLocaleString('en-us', {weekday: 'long'})
    afterTomorrowday.innerHTML = todayWeek
    afterClearIconTomorrow.innerHTML =  `<img src="${data.forecast.forecastday[2].day.condition.icon}" alt="">`
    afterMaxTempTomorrow.innerHTML = data.forecast.forecastday[2].day.maxtemp_c +'°C'
    afterAvgTempTomorrow.innerHTML = data.forecast.forecastday[2].day.avgtemp_c +'°C'
    afterNatureofTempTomorrow.innerHTML = data.forecast.forecastday[2].day.condition.text
}
