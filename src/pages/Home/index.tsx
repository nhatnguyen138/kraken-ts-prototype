import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Input from '../../components/Input'
import { clearChannels } from '../../store/channel.slice'
import { clearTickers } from '../../store/ticker.slice'
import { clearSpreads } from '../../store/spread.slice'
import { storageUtils } from '../../utils/localstorage.utils'
import './styles.scss'

export default function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    // clear redux data
    dispatch(clearSpreads({}))
    dispatch(clearTickers({}))
    dispatch(clearChannels({}))
    // clear localStorage data
    storageUtils.removeItem('pairs')
    storageUtils.removeItem('historicalTrades')     // historical data points
  }, [])

  return (
    <div className="home-container">
      <div className="selector-container prevent-highlight">
        <Input />
      </div>
    </div>
  )
}
