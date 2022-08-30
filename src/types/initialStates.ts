export interface ChannelState {
  channel: {
    [name: string]: number
  }
}

export interface TickerState {
  ticker: {
    [pair: string]: any       // ticker data
  }
}

export interface SpreadState {
  spread: {
    [pair: string]: any       // Array<Array<string>>
  }
}

export interface ChannelPayload {
  channelID: number,
  channelName: string,
  event: string,
  pair: string,
  status: string,
  subscription: {
    name: string,
    depth?: number
  }
}

export interface TickerPayload extends Array<any>{}

export interface SpreadPayload extends Array<any>{}