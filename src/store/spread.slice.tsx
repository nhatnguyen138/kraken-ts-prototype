import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash'
import { 
  SpreadState, 
  SpreadPayload
} from '../types/initialStates'

export const spreadSlice = createSlice({
  name: 'spread',
  initialState: {
    spread: {}
  } as SpreadState,
  reducers: {
    addSpread(state, action: PayloadAction<SpreadPayload>) {
      const response: SpreadPayload = action.payload
      if (_.isNil(state.spread[response[3] as string]))
        state.spread = {
          ...state.spread,
          [response[3] as string]: response[1]
        }
      else state.spread[response[3] as string].push(response[1])        // keep adding new spread updates of that currency pair
    },
    clearSpreads(state, action: any) {
      state.spread = {}
    }
  }
})

export const { addSpread, clearSpreads } = spreadSlice.actions

export const getAllSpreads = (state: SpreadState) => _.valuesIn(state.spread)

export default spreadSlice.reducer