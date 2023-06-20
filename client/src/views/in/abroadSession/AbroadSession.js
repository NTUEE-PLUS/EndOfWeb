import React from 'react'

import { useEffect, useState, useCallback } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import axios from 'axios'

import Search from './Search'
import AbroadSessionPage from './Page'
const rootRoute = '/abroad_session'
const numPerPage = 5
const AbroadSession = () => {
  const [isPending, setIsPending] = useState(false)
  const [searchData, setSearchData] = useState([])
  const [maxPage, setMaxPage] = useState(1)
  const [pageData, setPageData] = useState({})
  const [ascTime, setAscTime] = useState(false)
  const { id, pageNum, searchFor } = useParams()
  const isSearchPage = id === 'search' || !id
  const getImage = (_id, refresh = false) =>
    axios
      .get('/api/getAbroadSharingImg', {
        params: { _id },
        headers: refresh ? { 'Cache-Control': 'no-cache' } : {},
      })
      .then((d) => d.data.imgSrc || null)
      .catch((e) => console.log('error:', e.message))

  const getSearchData = useCallback(
    (refresh = false) => {
      setIsPending(true)
      axios
        .get('/api/getSearchedAbroadSharing', {
          params: {
            numPerPage,
            pageNum: pageNum || 1,
            keywords: (searchFor ? decodeURIComponent(searchFor) : '').split(' '),
            reversedOrder: ascTime ? 1 : 0,
          },
          headers: refresh ? { 'Cache-Control': 'no-cache' } : {},
        })
        .then((d) => {
          setMaxPage(d.data.maxPage)
          return d.data.data
        })
        .then((data) => {
          setIsPending(false)
          setSearchData(data)
          return data
        })
        .then((data) =>
          Promise.all(
            data.map(async (value) => ({
              ...value,
              img: await getImage(value._id, refresh),
            })),
          ),
        )
        .then((dataWithImg) => setSearchData(dataWithImg))
        .catch((e) => console.error('error:', e.message))
    },
    [searchFor, pageNum, ascTime],
  )

  const getPageData = useCallback(() => {
    setIsPending(true)
    axios
      .get('/api/getoneAbroadSharing', { params: { _id: id } })
      .then((d) => d.data)
      .then((data) => {
        setIsPending(false)
        setPageData(data)
      })
      .catch((e) => console.error('error:', e.message))
  }, [id])

  useEffect(() => {
    if (isSearchPage) {
      getSearchData()
    } else {
      getPageData()
    }
  }, [getSearchData, getPageData, isSearchPage])

  return id ? (
    isSearchPage ? (
      <Search
        data={searchData}
        parPageNum={+pageNum}
        searchFor={searchFor}
        isPending={isPending}
        rootRoute={`${rootRoute}/search`}
        maxPage={+maxPage}
        refresh={() => {
          getSearchData(true)
        }}
        setAscTime={setAscTime}
        ascTime={ascTime}
      />
    ) : (
      <AbroadSessionPage data={pageData} isPending={isPending} />
    )
  ) : (
    <Redirect to={`${rootRoute}/search`} />
  )
}
export default AbroadSession
