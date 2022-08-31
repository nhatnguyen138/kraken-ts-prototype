import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { getAllTickers } from '../../store/ticker.slice'
import './styles.scss'

interface Props {
  pair: string
}

export default function DetailBox({ pair } : Props) {
  const tickers = useSelector(getAllTickers)
  

  const calcGrowth = (a: string, b: string) => {
    const result = ((parseFloat(a)-parseFloat(b))/parseFloat(b)) * 100
    if (result>=0)
      return result.toFixed(2) + '%'
    else
      return result.toFixed(2) + '%'
  }

  return (
    <div className="detail-box">
      <h1>{pair}</h1>
      <div className="price">
        <p>Price</p>
          {_.get(tickers, ['0', `${pair}`, 'p', '0'])
            ? parseFloat(_.get(tickers, ['0', `${pair}`, 'p', '0'])).toFixed(2)
            : "0.00"
          }
          {' '}  
          {_.get(tickers, ['0', `${pair}`, 'p']) && 
            <span style={
              _.includes(calcGrowth(_.get(tickers, ['0', `${pair}`, 'p', '0']), _.get(tickers, ['0', `${pair}`, 'p', '1'])), '-')
                ? {color: 'red'}
                : {color: '#2DC344'}
            }>
              {calcGrowth(_.get(tickers, ['0', `${pair}`, 'p', '0']), _.get(tickers, ['0', `${pair}`, 'p', '1']))}
            </span>
          }
      </div>
      <div className="bid">
        <p>Bid</p>
          {_.get(tickers, ['0', `${pair}`, 'b', '0'])
            ? parseFloat(_.get(tickers, ['0', `${pair}`, 'b', '0'])).toFixed(2)
            : "0.00"
          }
      </div>
      <div className="ask">
        <p>Ask</p>
          {_.get(tickers, ['0', `${pair}`, 'a', '0'])
            ? parseFloat(_.get(tickers, ['0', `${pair}`, 'a', '0'])).toFixed(2)
            : "0.00"
          }
      </div>
    </div>
  )
}
