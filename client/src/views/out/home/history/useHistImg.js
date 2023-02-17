import axios from 'axios'
import { useCallback } from 'react'

const fetchImg = async (_id) =>
  axios
    .get('/api/history/img', {
      params: { _id },
    })
    .then((res) => {
      return res.data
    })

export default function useHistImg() {
  // ? add redux store to cache img data?

  // use httpcache
  const getImg = (_id) =>
    fetchImg(_id).catch((err) => {
      err.response.data.description && alert('錯誤\n' + err.response.data.description)
    })

  return useCallback(getImg, [])
}
