/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RecommendationForm from '../RecommendationForm'
import { Spinner } from './index'
import axios from 'axios'
const EditRecommendation = () => {
  const id = useParams().id
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const getData = () => {
    axios
      .get('/api/recommendation', { params: { _id: id } })
      .then((res) => {
        setData(res.data.data[0])
        setLoading(false)
      })
      .catch((err) => {
        err.response.data.description && alert('錯誤\n' + err.response.data.description)
      })
  }
  useEffect(() => {
    getData()
  }, [])
  return <>{loading ? <Spinner /> : <RecommendationForm data={data} />}</>
}

export default EditRecommendation
