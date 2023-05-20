import React, { useState, useEffect } from 'react'
import CareerBlock from '../../career/CareerBlock'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Spinner } from './index'
const OwnRecommendation = () => {
  const [isPending, setIsPending] = useState(true)
  const [data, setData] = useState(null)
  const getData = () => {
    axios
      .get('/api/recommendation/mine')
      .then((res) => {
        console.log('res.data=', res.data)
        setData(res.data)
        setIsPending(false)
      })
      .catch((err) => {
        setIsPending(false)
        err.response.data.description && alert('錯誤\n' + err.response.data.description)
      })
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="text-color-black">
      <Link to="/add_recommendation">
        <div className="d-flex justify-content-center add" width="100%">
          +
        </div>
      </Link>
      {isPending ? (
        <Spinner />
      ) : data ? (
        <CareerBlock post={data} />
      ) : (
        <div className="display-4 d-flex text-center mt-3 text-white">
          You have not post your recommendation yet
        </div>
      )}
    </div>
  )
}

export default OwnRecommendation
