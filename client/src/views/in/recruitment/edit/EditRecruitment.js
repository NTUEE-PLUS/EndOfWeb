/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RecruitmentForm from '../RecruitmentForm'
import { Spinner } from './index'
import axios from 'axios'
const EditRecruitment = () => {
  const id = useParams().id
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const getData = () => {
    axios
      .post('/api/searchRecruitment', { _id: id })
      .then((res) => {
        setData(res.data[0])
        setLoading(false)
      })
      .catch((err) => {
        err.response.data.description && alert('錯誤\n' + err.response.data.description)
      })
  }
  useEffect(() => {
    getData()
  }, [])
  return <>{loading ? <Spinner /> : <RecruitmentForm data={data} />}</>
}

export default EditRecruitment
