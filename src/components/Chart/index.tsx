import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts'
import { getAllSpreads } from '../../store/spread.slice'
import { chartUtils } from '../../utils/chart.utils'
interface Props {
  pair: string
}

export default function LiveUpdateChart({ pair } : Props) {
  const spreads = useSelector(getAllSpreads)
  const [data, setData] = useState<Array<any>>([])
  const timerRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // set interval, update chart every 5 seconds
    timerRef.current = setInterval(() => {
      const arr = _.last(_.first(spreads)[pair]) as Array<string>     // fetch the latest value in redux store
      if (arr) {
        const newEntry = chartUtils.generateNewEntry(arr)
        setData([...data, newEntry])
        if (_.size(data)>10)
          setData(_.drop(data,1))
      }
    }, 3000)
    return () => clearInterval(timerRef.current!)
  }, [timerRef, data, setData, spreads])

  return (
    <LineChart
      width={650}
      height={320}
      data={data}
      syncId="anyId"
      margin={{
        top: 5,
        right: 40,
        left: 40,
        bottom: 5,
      }}
      >
      <XAxis dataKey="name" />
      <YAxis type="number" domain={[25000, 30000]}/>
      <Tooltip />
      <Line
        type="monotone"
        dataKey="price"
        stroke="#8884d8"
        fill="#8884d8"
        isAnimationActive={false}
        activeDot={{ r: 8 }}
      />
    </LineChart>
  )
}