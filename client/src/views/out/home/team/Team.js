/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { CContainer, CRow, CButton } from '@coreui/react'
import Editor from './Editor'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectLogin } from '../../../../slices/loginSlice'

const Team = () => {
  const [data, setData] = useState([])
  const [visible, setVisible] = useState(false)
  const [dataForm, setDataForm] = useState([])
  const { isAuth, isLogin } = useSelector(selectLogin)
  const canEdit = isAuth && isLogin
  const fetchData = async (refresh = false) =>
    axios
      .get('/api/teamData', { headers: { 'Cache-Control': refresh ? 'no-cache' : '' } })
      .then((res) => {
        let data = res.data
        if (data.length && data[0].index) data.sort(({ index: a }, { index: b }) => a - b)
        setData(data)
      })
      .catch(
        (err) => err.response.data.description && alert('錯誤\n' + err.response.data.description),
      )

  const handleEditStart = () => {
    setDataForm(data)
    setVisible(true)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div id="team" className="text-center section">
        <CContainer data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
          <CRow className="section-title" style={{ display: 'flex' }}>
            {canEdit ? (
              <div>
                <h2>Meet the Team</h2>
                <CButton onClick={handleEditStart}>Edit</CButton>
              </div>
            ) : (
              <h2>Meet the Team</h2>
            )}
          </CRow>
          <CRow>
            {data.map(({ img: imgSrc, name, job }, index) => (
              <div className="col-sm-3 col-xs-6 team" key={index}>
                <div className="thumbnail">
                  {' '}
                  <div style={{ aspectRatio: '1' }} className="img-fluid">
                    <img
                      src={imgSrc}
                      alt="..."
                      className="team-img"
                      style={{
                        borderRadius: '50%',
                        objectFit: 'cover',
                        height: '100%',
                        width: '100%',
                      }}
                    />
                  </div>
                  <div className="caption">
                    <h4>{name}</h4>
                    <p>{job}</p>
                  </div>
                </div>
              </div>
            ))}
          </CRow>
        </CContainer>
      </div>
      <Editor
        visible={visible}
        setVisible={setVisible}
        dataForm={dataForm}
        setDataForm={setDataForm}
        refetch={fetchData}
        originData={data}
      />
    </>
  )
}

export default Team
