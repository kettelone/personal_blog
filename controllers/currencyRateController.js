const axios = require('axios')
const currencyfrom1 = 'EUR'
const currencyfrom2 = 'USD'
const currenceTo = 'UAH'
const amount = '1'
const apiEUR = `https://api.getgeoapi.com/v2/currency/convert?api_key=${process.env.GEO_API_KEY}&from=${currencyfrom1}&to=${currenceTo}&amount=${amount}&format=json`
const apiUSD = `https://api.getgeoapi.com/v2/currency/convert?api_key=${process.env.GEO_API_KEY}&from=${currencyfrom2}&to=${currenceTo}&amount=${amount}&format=json`

const currencyData = async () => {
  try {
    const responseEUR = await axios.get(apiEUR)
    const responseUSD = await axios.get(apiUSD)

    const finalResponse = {
      eur: Number(responseEUR.data.rates.UAH.rate).toFixed(2),
      usd: Number(responseUSD.data.rates.UAH.rate).toFixed(2),
    }
    return finalResponse
  } catch (e) {
    console.log(e)
  }
  console.log('works')
}

module.exports = { currencyData }
