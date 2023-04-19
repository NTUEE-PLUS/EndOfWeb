import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Masonry from 'react-masonry-css'
import CareerBlock from '../../career/CareerBlock'
import axios from 'axios'
import { Spinner } from './index'
import { CFormSelect } from '@coreui/react'
let datas = []

const OwnRecruitment = () => {
  const [isPending, setIsPending] = useState(true)
  const [data, setData] = useState([])
  const breakpointColumnsObj = {
    default: 2,
    1100: 2,
    500: 1,
  }
  const getData = () => {
    axios
      .get('/api/recruitment')
      .then((res) => {
        datas = res.data
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
      <Link to="/add_recruitment">
        <div className="d-flex justify-content-center add" width="100%">
          +
        </div>
      </Link>
      {isPending ? (
        <Spinner />
      ) : data.length !== 0 ? (
        <>
          <CFormSelect className="mx-auto my-3 w-50" onChange={switchType}>
            <option value="both">Both</option>
            <option value="intern">Intern</option>
            <option value="fulltime">Fulltime</option>
          </CFormSelect>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
            columnAttrs={{
              className: 'should be overridden',
              'data-test': '',
              style: { '--test': 'test' },
            }}
            style={{ display: 'flex' }}
          >
            {data.map((post, i) => (
              <CareerBlock post={post} setData={setData} index={i} key={i} />
            ))}
          </Masonry>
        </>
      ) : (
        <div className="display-4 d-flex justify-content-center mt-3 text-white">
          You have not post your recruitment yet
        </div>
      )}
    </div>
  )
}

export default OwnRecruitment
