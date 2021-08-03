import React, { useState, useEffect } from 'react'
import RecomPost from './RecomPost'
import axios from 'axios'
const Recommendation = () => {
  const [data, setData] = useState([])
  const getData = () => {
    axios
      .get('/api/recommendation')
      .then((posts) => setData(posts))
      .catch((err) => {
        err.response.data.description && alert('錯誤\n' + err.response.data.description)
      })
  }
  useEffect(() => {
    getData()
  }, [])
  return <div className="text-color-black">{data.posts && <RecomPost data={data.posts} />}</div>
}

export default Recommendation
