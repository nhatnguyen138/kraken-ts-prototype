import moment from 'moment'

// Calculate Price:
// Price = (Price(ask) x Volume(bid) + Price(bid) x Volume(ask)) / (Volume(bid) + Volume(ask))
// Array parsed: arr = [Price(bid), Price(ask), Timestamp, Volume(bid), Volume(ask)]
// Source: https://docs.kraken.com/websockets/#message-spread
const calculatePrice = (arr: Array<string>) => {
  // convert from string
  const bid = parseFloat(arr[0])
  const ask = parseFloat(arr[1])
  const bidVolume = parseFloat(arr[3])
  const askVolume = parseFloat(arr[4])

  // return as float (with 4 decimal digits)
  return parseFloat(((ask*bidVolume + bid*askVolume)/(bidVolume + askVolume)).toFixed(4))
}

// Generate new data for chart
const generateNewEntry = (arr: Array<string>) => {
  return {
    name: moment().format('H:mm:ss'),
    price: calculatePrice(arr),
  }
}

export const chartUtils = {
  calculatePrice,
  generateNewEntry
}