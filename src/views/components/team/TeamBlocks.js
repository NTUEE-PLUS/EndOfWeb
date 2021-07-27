/* eslint-disable prettier/prettier */
import { CCol, CImage, CRow } from '@coreui/react'
import React from 'react'
import PropTypes from 'prop-types'

const TeamBlocks = ({ data }) => {
  const minister = data.minister.map((person) => {
    return (
      <CCol xs={2} key={person.name} align="center" className="justify-content-center">
        <CImage src={person.img} height="200rem" className="img-fluid" />
        <h3>{person.name}</h3>
      </CCol>
    )
  })
  const front = data.front.map((person) => {
    return (
      <CCol xs={2} key={person.name} align="center" className="justify-content-between">
        <CImage src={person.img} height="200rem" className="img-fluid" />
        <h3>{person.name}</h3>
      </CCol>
    )
  })
  const back = data.back.map((person) => {
    return (
      <CCol xs={2} key={person.name} align="center" className="justify-content-center">
        <CImage src={person.img} height="200rem" className="img-fluid" />
        <h3>{person.name}</h3>
      </CCol>
    )
  })
  const abroad = data.abroad.map((person) => {
    return (
      <CCol xs={2} key={person.name} align="center" className="justify-content-center">
        <CImage src={person.img} height="200rem" className="img-fluid" />
        <h3>{person.name}</h3>
      </CCol>
    )
  })
  return (
    <>
      <CCol>
        <CRow className="justify-content-around mt-4" style={{ marginBottom: '20rem' }} xs={5}>
          <h2 className="mb-4">負責人：</h2>
          {minister}
        </CRow>
        <CRow className="justify-content-around mt-4 " xs={5}>
          <h2 className="mb-4">網頁前端團隊：</h2>
          {front}
        </CRow>
        <CRow className="justify-content-around mt-4 " xs={5}>
          <h2 className="mb-4">網頁後端團隊：</h2>
          {back}
        </CRow>
        <CRow className="justify-content-around mt-4 " xs={5}>
          <h2 className="mb-4">留學資料蒐集團隊：</h2>
          {abroad}
        </CRow>
      </CCol>
    </>
  )
}
TeamBlocks.propTypes = {
  data: PropTypes.array,
}
export default TeamBlocks
