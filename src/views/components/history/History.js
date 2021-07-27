import React, { useState, useEffect } from 'react'

import Timeline from './Timeline'
const History = () => {
  const [data, setData] = useState([])
  const getData = () => {
    fetch('historyData.json', {
      headers: {
        ContentType: 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data))
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div style={{ width: '100%' }}>{data.history && data.member && <Timeline data={data} />}</div>
  )
}

export default History
