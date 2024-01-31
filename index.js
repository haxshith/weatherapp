const cityInput = document.querySelector('#city-name')
const form = document.querySelector('form')
const weatherData = document.querySelector('.data')
const loading = document.querySelector('.loading')
const alertBox = document.querySelector('.alert')


const apiKey = 'dc3ad3b4c9097cc45f30d92ade5b2181'

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const fetchWeather = async function () {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}`)
        const responseJSON = await response.json()
        return responseJSON;
    }

    const data = fetchWeather()
    data.then((response) => {
        loading.style['display'] = 'none'
        let html = `
                <div class="city">${response.name},${response.sys.country}</div>
                <div class="weather-text">${response.weather[0].main}</div>
                <div class="weather-details">
                    <div class="weather-logo"><img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png" alt=""></div>
                    <div class="weather-temp">${(response.main.temp - 273.15).toFixed(2)}°C</div>
                    <div class="min-max-container">
                        <div class="min">Min: ${(response.main.temp_min - 273.15).toFixed(2)}°C</div>
                        <div class="max">Max: ${(response.main.temp_max - 273.15).toFixed(2)}°C</div>
                    </div>
                </div>
        `
        
    }).catch((err) => {
        setTimeout(() => {
            alertBox.classList.remove('active-alert')
        }, 3000);
        alertBox.classList.add('active-alert')
    })
    loading.style['display'] = 'block'
    cityInput.value = ''
    weatherData.innerHTML = ''
})

