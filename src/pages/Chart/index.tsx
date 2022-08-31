import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useWebSocket from 'react-use-websocket'
import _ from 'lodash'
import { addChannel, getAllChannels } from '../../store/channel.slice'
import { addTicker, getAllTickers } from '../../store/ticker.slice'
import { addSpread, getAllSpreads } from '../../store/spread.slice'
import { storageUtils } from '../../utils/localstorage.utils'
import { wsUtils } from '../../utils/ws.utils'
import DetailBox from '../../components/DetailBox'
import LiveUpdateChart from '../../components/Chart'
import './styles.scss'

const WEB_SOCKET_URI = 'wss://ws.kraken.com'

export default function Chart() {
  const [pairs, setPairs] = useState<Array<string> | null>(storageUtils.getJsonItem('pairs'))  // get pairs from localStorage
  const [wsUri, setWsUri] = useState<string>('')
  const timerRef = useRef<NodeJS.Timeout>()
  const {
    sendMessage,
    lastMessage,
    getWebSocket
  } = useWebSocket(wsUri)
  const channels = useSelector(getAllChannels)
  const tickers = useSelector(getAllTickers)
  const spreads = useSelector(getAllSpreads)
  const dispatch = useDispatch()

  useEffect(() => {
    if (_.isNil(pairs))
      console.error('Error: No currency pairs found')
    else {
      // subscribe to book-25, ticker, and spread
      timerRef.current = setInterval(() => {
        setWsUri(WEB_SOCKET_URI)
        sendMessage(wsUtils.subscribeBook25(pairs))
        sendMessage(wsUtils.subscribeTicker(pairs))
        sendMessage(wsUtils.subscribeSpread(pairs))
        setTimeout(() => getWebSocket()?.close(), 4200)
      }, 5000)
      return () => clearInterval(timerRef.current!)
    }
  }, [timerRef, setWsUri])

  useEffect(() => {
    if (!_.isNil(lastMessage)) {
      const data = JSON.parse(lastMessage.data)
      if (!_.isNil(data.errorMessage))                // check errorMessage
        console.error(`Error: ${data.errorMessage}`)
      if (!_.isNil(data.channelID))                   // check channelID for subscription
        dispatch(addChannel(data))
      if (_.isArray(data)) {                          // check live update
        if (data[2]==="spread") {
          // add spread
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
      <div style={{marginTop: "100px"}}>
        {_.map(pairs, (pair: string) => {
          return (
            <div className="detail-card">
              <DetailBox pair={pair} />
              <LiveUpdateChart pair={pair} />
            </div>
          )
        })}
        <div className='channel-info'>
          <h1>Subscribed Channels</h1>
          <div className='channel-grid'>
            {_.map(entries, (item: Array<any>) => {
                return (
                  <span>{item[0]}: <span style={{color: '#2DC344'}}>{item[1]}</span></span>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}
