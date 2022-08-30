import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash'
import { ChannelState, ChannelPayload } from '../types/initialStates'

export const channelSlice = createSlice({
  name: 'channel',
  initialState: {
    channel: {}
  } as ChannelState,
  reducers: {
    addChannel(state, action: PayloadAction<ChannelPayload>) {
      const response: ChannelPayload = action.payload
      if (response.status==="subscribed") {           // check if channel is subscribed
        state.channel = {
          ...state.channel,
          [response.channelName+'@'+response.pair as string]: response.channelID  // ie: book-25@XBT/USD: 336
        }
      }
    },
    clearChannels(state, action: any) {
      state.channel = {}
    }
  }
})

export const { addChannel, clearChannels } = channelSlice.actions

export const getAllChannels = (state: ChannelState) => _.valuesIn(state.channel)

export default channelSlice.reducer