import React, { lazy, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import {
  CAvatar,
  CContainer,
  CRow,
  CImage,
  CCarousel,
  CCarouselItem,
  CCarouselInner,
  CCarouselCaption,
  CCarouselIndicators,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'

const Dashboard = () => {
  const [recentColumns, setRecentColumns] = useState([])

  const getRecentColumns = () => {
    axios
      .get('api/column/recent')
      .then((res) => {
        console.log(res)
        setRecentColumns(res.data.data)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getRecentColumns()
  }, [])

  return (
    <CContainer className="align-items-center">
      <CRow className="justify-content-center">
        <CCarousel controls indicators transition="crossfade">
          {recentColumns.map((column) => {
            return (
              <CCarouselItem>
                <Link to={`/columnSummary/${column.id}`}>
                  <CImage className="d-block w-100" fluid src={column.imgSrc} alt={column.id} />
                  <CCarouselCaption className="d-none d-md-block w-100">
                    {column.title.map((title) => {
                      return <h3>{title}</h3>
                    })}
                  </CCarouselCaption>
                </Link>
              </CCarouselItem>
            )
          })}
        </CCarousel>
      </CRow>
    </CContainer>
  )
}

export default Dashboard
