import { configureStore } from '@reduxjs/toolkit'
import channelReducer from './channel.slice'
import tickerReducer from './ticker.slice'
import spreadReducer from './spread.slice'

export default configureStore({
  reducer: {
    channel: channelReducer,
    ticker: tickerReducer,
    spread: spreadReducer
  }
})