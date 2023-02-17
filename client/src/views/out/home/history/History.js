import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Timeline from './Timeline'
import useHistImg from './useHistImg'
const History = () => {
  const [data, setData] = useState([])
  const getImg = useHistImg(true)

  const getData = (refresh = false) => {
    axios
      .get('/api/history', { headers: refresh ? { 'Cache-Control': 'no-cache' } : {} }) // get the frame
      .then((res) => {
        setData({
          history: res.data
            .map((v) => ({
              ...v,
              people: v.people.map((per) => ({ name: per.name, queryId: per.img })),
            }))
            .sort(({ grade: g1 }, { grade: g2 }) => (g1 > g2 ? 1 : g1 === g2 ? 0 : -1)),
        })
      })
      .catch((err) => {
        err.response?.data?.description && alert('錯誤\n' + err.response.data.description)
      })
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <>{data.history && <Timeline data={data} refetch={() => getData(true)} getImg={getImg} />}</>
  )
}

export default History
