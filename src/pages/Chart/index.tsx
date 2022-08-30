import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useWebSocket from 'react-use-websocket'
import _ from 'lodash'
import { addChannel, getAllChannels } from '../../store/channel.slice'
import { addTicker, getAllTickers } from '../../store/ticker.slice'
import { addSpread, getAllSpreads } from '../../store/spread.slice'
import { storageUtils } from '../../utils/localstorage.utils'
import { wsUtils } from '../../utils/ws.utils'


import LiveUpdateChart from '../../components/Chart'
import './styles.scss'


const WEB_SOCKET_URI = 'wss://ws.kraken.com'
const pairs = storageUtils.getJsonItem('pairs')       // get pairs from localStorage

export default function Chart() {
  const {
    sendMessage,
    lastMessage,
    getWebSocket
  } = useWebSocket(WEB_SOCKET_URI)
  const channels = useSelector(getAllChannels)
  const tickers = useSelector(getAllTickers)
  const spreads = useSelector(getAllSpreads)
  const dispatch = useDispatch()

  useEffect(() => {
    if (_.isNil(pairs))
      console.error('Error: No currency pairs found')
    else {
      // subscribe to book-25, ticker, and spread
      sendMessage(wsUtils.subscribeBook25(pairs))
      sendMessage(wsUtils.subscribeTicker(pairs))
      sendMessage(wsUtils.subscribeSpread(pairs))
    }
  }, [])

  useEffect(() => {
    if (!_.isNil(lastMessage)) {
      const data = JSON.parse(lastMessage.data)
      if (!_.isNil(data.errorMessage))                // check errorMessage
        console.error(`Error: ${data.errorMessage}`)
      if (!_.isNil(data.channelID))                   // check channelID for subscription
        dispatch(addChannel(data))
      if (_.isArray(data)) {                          // check live update
        if (data[2]==="spread") {
          // add spread thing
          dispatch(addSpread(data))
        }
        else if (data[2]==="book-25" &&
          !_.isNil(data[1].as) && !_.isNil(data[1].bs)) {
            // add/update historical data points at localStorage
            storageUtils.setJsonItem('historicalTrades', data[1])
          }
        else if (data[2]==="ticker") {
          // add ticker
          dispatch(addTicker(data))
        }
      }
    }
  }, [lastMessage])

  const entries = Object.entries(channels[0])


  return (
    <div className="chart-container">
      Chart
      <div style={{marginTop: "100px"}}>
        <button onClick={() => getWebSocket()?.close()}>Close</button>
        <LiveUpdateChart />
        <div>Channels:</div>
        {_.map(entries, (item: Array<any>) => {
          return (
            <p>{item[0]}: {item[1]}</p>
          )
        })}
        <br />
        <div>Tickers: {JSON.stringify(tickers)}</div>
        <br />
        <div>Spread: {JSON.stringify(spreads)}</div>
      </div>
    </div>
  )
}
