import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ColumnForm from '../ColumnForm'
import { Spinner } from './index'
import axios from 'axios'

const EditColumn = () => {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  let temp = {}
  const getData = () => {
    Promise.all([
      axios
        .get('/api/column/detail', { params: { id: id } })
        .then((res) => {
          temp = { ...temp, ...res.data, body: res.data.body.body }
        })
        .catch((err) => {
          err.response.data.description && alert('錯誤\n' + err.response.data.description)
        }),
      axios.get('/api/column/outline', { params: { id: id } }).then((res) => {
        temp = { ...temp, ...res.data.data[0] }
      }),
    ]).then(() => {
      setData(temp)
      setLoading(false)
    })
  }
  useEffect(() => {
    getData()
  }, [])
  return <>{loading ? <Spinner /> : <ColumnForm data={data} />}</>
}
export default EditColumn
