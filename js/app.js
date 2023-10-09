const apiKey = '62e800a47abaee1147481cfef305fee8'
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='
const weatherTemp = document.getElementById('weather-temp')
const city = document.getElementById('city')
const humidity = document.getElementById('humidity')
const wind = document.getElementById('wind')
const searchButton = document.getElementById('search-button')
const weatherInfoContainer = document.querySelector('.weather-info__container')
const errorDiv = document.querySelector('.error')
const weatherContainer = document.querySelector('.weather-container')
const weatherImg = document.getElementById('weather-img')

weatherContainer.style.backgroundColor = "#31353a"
//background-image: linear-gradient(0deg, #600684 0%, #08cbf7 100%);
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
    wind.textContent = data.wind.speed.toFixed(1) + ' km / h'
    weatherInfoContainer.style.display = 'block'
    errorDiv.style.display = 'none'

    switch (data.weather[0].main) {
      case 'Clouds':
        weatherImg.src = 'img/cloudy.png'
        break
      case 'Rain':
        weatherImg.src = 'img/storm.png'
        break
      case 'Drizzle':
        weatherImg.src = 'img/drizzle.png'
        break
      case 'Snow':
        weatherImg.src = 'img/snow.png'
        break
    }
  }
}
 


searchButton.addEventListener('click', () => {
  const cityInput = document.getElementById('input').value
  checkWeather(cityInput)
})