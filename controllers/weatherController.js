const axios = require('axios')
const API_key = '0b49511d77b150896aaa9774697aa3ba'
const latitude = '49.59'
const longtitude = '36.13'
const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longtitude}&units=metric&exclude=hourly&appid=${API_key}`

const weatherInfo = async () => {
  try {
    const response = await axios.get(api)
    if (response.data === undefined) {
      response.data.current.temp = 'N/A'
      response.data.current.weather[0].description = 'N/A'
      response.data.current.dt = '0'
    }
    return response.data
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  weatherInfo,
}
