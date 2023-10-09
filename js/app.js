const apiKey = '62e800a47abaee1147481cfef305fee8'
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='
const weatherTemp = document.getElementById('weather-temp')
const city = document.getElementById('city')
const humidity = document.getElementById('humidity')
const wind = document.getElementById('wind')
const searchButton = document.getElementById('search-button')
const weatherInfoContainer = document.querySelector('.weather-info__container')
const errorDiv = document.querySelector('.error')

async function checkWeather(cityInput) {
  const response = await fetch(apiUrl + cityInput + `&appid=${apiKey}`)
  const data = await response.json()
  console.log(data);

  if (data.cod === '404') {
    weatherInfoContainer.style.display = 'none'
    errorDiv.style.display = 'flex'
  } else {
    weatherTemp.textContent = Math.round(data.main.temp) + '°C'
    city.textContent = data.name
    humidity.textContent = data.main.humidity
    wind.textContent = data.wind.speed + ' km / h'
    weatherInfoContainer.style.display = 'block'
    errorDiv.style.display = 'none'

    switch (data.weather[0].main) {
      case 'Clouds':
        document.getElementById('weather-img').src = 'img/cloudy.png'
        break
      case 'Rain':
        document.getElementById('weather-img').src = 'img/storm.png'
        break
      case 'Drizzle':
        document.getElementById('weather-img').src = 'img/drizzle.png'
        break
      case 'Snow':
        document.getElementById('weather-img').src = 'img/snow.png'
        break
    }
  }
}
 


searchButton.addEventListener('click', () => {
  const cityInput = document.getElementById('input').value
  checkWeather(cityInput)
})