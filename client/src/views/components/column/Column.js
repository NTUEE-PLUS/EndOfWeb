import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'
import Title from './Title'
import Resume from './Resume'
import Testimonials from './Testimonials'

// export default App;
const Column = () => {
  const id = useParams().id
  const [data, setData] = useState([])
  const getData = () => {
    axios
      .get('/api/column/detail', { params: { id: id } })
      .then((res) => {
        console.log(res)
        setData(res.data)
      })
      .catch((err) => console.log(err.response))
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="column">
      {data.top && <Title data={data.top} />}
      {data.body && <Resume data={data.body} />}
      {data.annotation && <Testimonials data={data.annotation} />}
    </div>
  )
}
Column.propTypes = {
  id: PropTypes.string,
}
export default Column
