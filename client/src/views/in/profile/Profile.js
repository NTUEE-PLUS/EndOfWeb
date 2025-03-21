import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { selectLogin } from '../../../slices/loginSlice'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CRow,
  CListGroup,
  CListGroupItem,
  CAvatar,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import default_male from '../../../assets/images/default_male.png'

const Profile = () => {
  const id = useParams().id
  const { studentID } = useSelector(selectLogin)
  const getProfile = () => {
    axios
      .post('api/searchProfile', { account: id })
      .then((res) => {
        setData(res.data[0])
      })
      .catch((err) => {
        switch (err.response.status) {
          case 404:
            alert(err.response.data.description)
            break
          default:
            alert(err.response.data.description)
            break
        }
      })
  }
  const [data, setData] = useState(null)

  useEffect(() => {
    getProfile()
  }, [id])

  return data ? (
    <CContainer>
      <CRow>
        <CCol md="4" className="mb-3">
          <CCard>
            <CCardBody>
              <div className="d-flex flex-column align-items-center text-center">
                <img
                  src={data.userimage === '' ? default_male : data.userimage}
                  alt="Admin"
                  className="rounded-circle"
                  width="150"
                />
                <div className="mt-3">
                  <h4>{data.username}</h4>
                  <p className="text-secondary mb-1">{data.profile}</p>
                  <p className="text-muted font-size-sm">{data.CC}</p>
                </div>
              </div>
            </CCardBody>
          </CCard>
          <CCard className="mt-3">
            <CListGroup>
              <CListGroupItem>
                <h6 className="mb-0">
                  <CAvatar>
                    <CIcon icon={React.icons.website}></CIcon>
                  </CAvatar>
                  Website
                </h6>
                <span className="text-secondary">{data.web}</span>
              </CListGroupItem>
              <CListGroupItem>
                <h6 className="mb-0">
                  <CAvatar>
                    <CIcon icon={React.icons.cibGithub}></CIcon>
                  </CAvatar>
                  Github
                </h6>
                <span className="text-secondary">{data.github}</span>
              </CListGroupItem>
              <CListGroupItem>
                <h6 className="mb-0">
                  <CAvatar>
                    <CIcon icon={React.icons.cibLinkedin}></CIcon>
                  </CAvatar>
                  Linkedin
                </h6>
                <span className="text-secondary">{data.Linkedin}</span>
              </CListGroupItem>
              <CListGroupItem>
                <h6 className="mb-0">
                  <CAvatar>
                    <CIcon icon={React.icons.cibFacebook}></CIcon>
                  </CAvatar>
                  Facebook
                </h6>
                <span className="text-secondary">{data.facebook}</span>
              </CListGroupItem>
            </CListGroup>
          </CCard>
        </CCol>
        <CCol md="8">
          <CCard>
            <CCardBody>
              <CRow>
                <CCol sm="3" className="px-4">
                  <h6 className="mb-0 ">Nickname</h6>
                </CCol>
                <CCol sm="9" className="text-secondary">
                  {data.nickname}
                </CCol>
              </CRow>
              <hr className="mt-1 mb-3" />
              <CRow>
                <CCol sm="3" className="px-4">
                  <h6 className="mb-0">Student ID</h6>
                </CCol>
                <CCol sm="9" className="text-secondary">
                  {data.account}
                </CCol>
              </CRow>
              <hr className="mt-1 mb-3" />
              <CRow>
                <CCol sm="3" className="px-4">
                  <h6 className="mb-0">Email</h6>
                </CCol>
                <CCol sm="9" className="text-secondary">
                  {data.publicEmail}
                </CCol>
              </CRow>
              <hr className="mt-1 mb-3" />
              <CRow>
                <CCol sm="3" className="px-4">
                  <h6 className="mb-0">Mobile</h6>
                </CCol>
                <CCol sm="9" className="text-secondary">
                  {data.cellphone}
                </CCol>
              </CRow>
              <hr className="mt-1 mb-3" />
              <CRow>
                <CCol sm="3" className="px-4">
                  <h6 className="mb-0 ">Advising Professor</h6>
                </CCol>
                <CCol sm="9" className="text-secondary">
                  {data.advisingProfessor.map((item, index) => {
                    return index === data.advisingProfessor.length - 1 ? (
                      <span key={index}>{item.value}</span>
                    ) : (
                      <span key={index}>{item.value}，</span>
                    )
                  })}
                </CCol>
              </CRow>
              <hr className="mt-1 mb-3" />
            </CCardBody>
          </CCard>
          <CRow>
            <CCol sm="6" className="my-3">
              <CCard className="h-100">
                <CCardBody className="p-3">
                  <h6 className="d-flex align-items-center mb-3 mt-1">
                    <i className="material-icons text-info mr-2">Education</i>
                  </h6>
                  <hr className="mt-1 mb-3" />
                  <div>
                    <div>
                      <h6 className="mb-0">Bachelor</h6>
                    </div>
                    <div className="text-secondary px-3 mt-2">{data.major}</div>
                  </div>
                  <hr className="mt-1 mb-3" />
                  <div>
                    <div>
                      <h6 className="mb-0">Master</h6>
                    </div>
                    <div className="text-secondary px-3 mt-2">{data.master}</div>
                  </div>
                  <hr className="mt-1 mb-3" />
                  <div>
                    <div>
                      <h6 className="mb-0">Doctor</h6>
                    </div>
                    <div className="text-secondary px-3 mt-2">{data.doctor}</div>
                  </div>
                  <hr className="mt-1 mb-3" />
                </CCardBody>
              </CCard>
            </CCol>
            <CCol sm="6" className="my-3">
              <CCard className="h-100">
                <CCardBody className="p-3">
                  <h6 className="d-flex align-items-center mb-3 mt-1">
                    <i className="material-icons text-info mr-2">Current Occupation</i>
                  </h6>
                  <hr className="mt-1 mb-3" />
                  <div>
                    <div>
                      <h6 className="mb-0">Company</h6>
                    </div>
                    <div className="text-secondary px-3 mt-2">
                      {data.Occupation.length != 0 ? data.Occupation[0].C : ''}
                    </div>
                  </div>
                  <hr className="mt-1 mb-3" />
                  <div>
                    <div>
                      <h6 className="mb-0">Division</h6>
                    </div>
                    <div className="text-secondary px-3 mt-2">
                      {data.Occupation.length != 0 ? data.Occupation[0].O : ''}
                    </div>
                  </div>
                  <hr className="mt-1 mb-3" />
                  <div>
                    <div>
                      <h6 className="mb-0">Position</h6>
                    </div>
                    <div className="text-secondary px-3 mt-2">
                      {data.Occupation.length != 0 ? data.Occupation[0].P : ''}
                    </div>
                  </div>
                  <hr className="mt-1 mb-3" />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          {studentID === id ? (
            <CRow>
              <CCol col-sm-3>
                <Link to="/edit_profile">
                  <CButton size="lg" color="info">
                    Edit
                  </CButton>
                </Link>
              </CCol>
            </CRow>
          ) : null}
        </CCol>
      </CRow>
    </CContainer>
  ) : null
}

export default Profile
