import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash'
import { 
  TickerState, 
  TickerPayload
} from '../types/initialStates'

export const tickerSlice = createSlice({
  name: 'ticker',
  initialState: {
    ticker: {}
  } as TickerState,
  reducers: {
    addTicker(state, action: PayloadAction<TickerPayload>) {
      const response: TickerPayload = action.payload
      state.ticker = {
        ...state.ticker,
        [response[3] as string]: response[1]              // store new ticker data
      }
    },
    clearTickers(state, action: any) {
      state.ticker = {}
    }
  }
})

export const { addTicker, clearTickers } = tickerSlice.actions

export const getAllTickers = (state: TickerState) => _.valuesIn(state.ticker)

export default tickerSlice.reducer