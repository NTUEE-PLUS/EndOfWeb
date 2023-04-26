import React, { useState, useEffect } from 'react'
import CareerBlock from '../../career/CareerBlock'
import { Link } from 'react-router-dom'
import Masonry from 'react-masonry-css'
import axios from 'axios'
import { Spinner } from './index'
import { CFormSelect } from '@coreui/react'
let datas = []
const OwnRecommendation = () => {
  const [isPending, setIsPending] = useState(true)
  const [data, setData] = useState([])
  const getData = () => {
    axios
      .get('/api/recommendation/mine')
      .then((res) => {
        setData(res.data)
        setIsPending(false)
      })
      .catch((err) => {
        err.response.data.description && alert('錯誤\n' + err.response.data.description)
      })
  }
  const switchType = (e) => {
    if (e.target.value === 'both') {
      setData(datas)
    } else {
      setData(datas.filter((data) => data.title.type === e.target.value))
    }
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="text-color-black">
      {isPending ? (
        <Spinner />
      ) : data ? (
        <CareerBlock post={data} setData={setData} />
      ) : (
        <div className="display-4 d-flex justify-content-center mt-3 text-white">
          <Link to="/add_recommendation">
            <div className="d-flex justify-content-center add" width="100%">
              +
            </div>
          </Link>
          You have not post your recommendation yet, please click the &apos;+&apos; button to post
          your recommendation.
          <br />
          One person can only has one recommendation
        </div>
      )}
    </div>
  )
}

export default OwnRecommendation
