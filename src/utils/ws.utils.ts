const subscribeBook25 = (pairs: Array<string>) => {
  return JSON.stringify(
    {
      "event": "subscribe",
      "pair": pairs,
      "subscription": {
        "name": "book",
        "depth": 25
      }
    }
  )
}

const subscribeTicker = (pairs: Array<string>) => {
  return JSON.stringify(
    {
      "event": "subscribe",
      "pair": pairs,
      "subscription": {
        "name": "ticker"
      }
    }
  )
}

const subscribeSpread = (pairs: Array<string>) => {
  return JSON.stringify(
    {
      "event": "subscribe",
      "pair": pairs,
      "subscription": {
        "name": "spread"
      }
    }
  )
}

const unsubscribeSpread = (pairs: Array<string>) => {
  return JSON.stringify(
    {
      "event": "unsubscribe",
      "pair": pairs,
      "subscription": {
        "name": "spread"
      }
    }
  )
}

export const wsUtils = {
  subscribeBook25,
  subscribeTicker,
  subscribeSpread,
  unsubscribeSpread
}