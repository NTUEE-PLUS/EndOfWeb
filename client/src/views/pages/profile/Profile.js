import React, { useState, useEffect } from 'react'
// import './profile.css'
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

const Profile = () => {
  let recommendation = []
  const [recruitment, setRecruitment] = useState([])
  const getRecruitment = () => {
    fetch('recruitmentPosts.json', {
      headers: {
        ContentType: 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRecruitment(data)
        console.log(data)
      })
  }
  const [data, setData] = useState({
    account: {
      show: true,
      data: 'B08901072',
    },
    username: {
      show: true,
      data: 'Tim Wang',
    },
    nickname: {
      show: true,
      data: '提姆',
    },
    profile: {
      show: true,
      data: '一人救全系', //自介
    },
    education: {
      major: {
        show: true,
        SD: 'NTUEE', //school and department
        Note: '', //一些備註，如：畢業、在學....
      },
      double_major: {
        show: true,
        SD: '', //school and department
        Note: '', //一些備註，如：畢業、在學....
      },
      minor: {
        show: true,
        SD: '', //school and department
        Note: '', //一些備註，如：畢業、在學....
      },
      master: {
        show: true,
        SD: '', //school and department
        Note: '', //一些備註，如：畢業、在學....
      },
      doctor: {
        show: true,
        SD: '', //school and department
        Note: '', //一些備註，如：畢業、在學....
      },
    },
    publicEmail: {
      show: true,
      data: 'b08901072@ntu.edu.tw', //mongoose.SchemaTypes.Email ?
    },
    office: {
      show: true,
      data: '',
    }, //phone
    homephone: {
      show: false,
      data: '',
    },
    cellphone: {
      show: true,
      data: '0987654321',
    },
    CC: {
      show: true,
      data: 'Taipei, Taiwan',
    }, //city+country
    web: {
      show: true,
      data: '',
    },
    facebook: {
      show: true,
      data: 'https://www.facebook.com/noidname',
    },
    Linkedin: {
      show: true,
      data: '',
    },
    Occupation: [
      {
        show: true,
        O: '', //部門?
        P: 'CEO & CTO', //職稱?
        C: '友廷股份有限公司', //公司?
      },
    ],
    JobID: '', //有空去查一下mongoose的ref和populate
    userimage: 'https://avatars.githubusercontent.com/u/55401762?v=4', // not same as schema
  })

  useEffect(() => {
    getRecruitment()
  }, [])
  const DeleteRecruitment = () => {}
  const showRecruitment = (Recruitment) => {
    console.log(Recruitment)
    return Recruitment.posts.map((post, i) => {
      const editPath = '/#/editRecruitment/' + (i + 1)
      return (
        <>
          <CRow sm="3">
            <CCol>
              <h6 className="mb-0">post {i + 1}</h6>
            </CCol>
            <CCol sm="5">{post.title.title}</CCol>
            <CButton className="col-sm-2" color="dark" href={editPath}>
              Edit
            </CButton>
            <CButton className="col-sm-2" color="primary" onClick={DeleteRecruitment}>
              Delete
            </CButton>
          </CRow>
          <hr />
        </>
      )
    })
  }
  return (
    <CContainer>
      <CRow>
        <CCol md="4" className="mb-3">
          <CCard>
            <CCardBody>
              <div className="d-flex flex-column align-items-center text-center">
                <img src={data.userimage} alt="Admin" className="rounded-circle" width="150" />
                <div className="mt-3">
                  <h4>{data.username.show ? data.username.data : ''}</h4>
                  <p className="text-secondary mb-1">
                    {data.profile.show ? data.profile.data : ''}
                  </p>
                  <p className="text-muted font-size-sm">{data.CC.show ? data.CC.data : ''}</p>
                  <CButton>Follow</CButton>
                  <CButton>Message</CButton>
                </div>
              </div>
            </CCardBody>
          </CCard>
          <CCard className="mt-3">
            <CListGroup>
              <CListGroupItem>
                <h6 className="mb-0">
                  <CAvatar>
                    <CIcon name="website"></CIcon>
                  </CAvatar>
                  Website
                </h6>
                <span className="text-secondary">{data.web.show ? data.web.data : ''}</span>
              </CListGroupItem>
              <CListGroupItem>
                <h6 className="mb-0">
                  <CAvatar>
                    <CIcon name="cib-github"></CIcon>
                  </CAvatar>
                  Github
                </h6>
                <span className="text-secondary">noidname01</span>
              </CListGroupItem>
              <CListGroupItem>
                <h6 className="mb-0">
                  <CAvatar>
                    <CIcon name="cib-linkedin"></CIcon>
                  </CAvatar>
                  Linkedin
                </h6>
                <span className="text-secondary">
                  {data.Linkedin.show ? data.Linkedin.data : ''}
                </span>
              </CListGroupItem>
              <CListGroupItem>
                <h6 className="mb-0">
                  <CAvatar>
                    <CIcon name="cib-instagram"></CIcon>
                  </CAvatar>
                  Instagram
                </h6>
                <span className="text-secondary">bootdey</span>
              </CListGroupItem>
              <CListGroupItem>
                <h6 className="mb-0">
                  <CAvatar>
                    <CIcon name="cib-facebook"></CIcon>
                  </CAvatar>
                  Facebook
                </h6>
                <span className="text-secondary">
                  {data.facebook.show ? data.facebook.data : ''}
                </span>
              </CListGroupItem>
            </CListGroup>
          </CCard>
        </CCol>
        <CCol md="8">
          <CCard className="mb-3">
            <CCardBody>
              <CRow>
                <CCol sm="3">
                  <h6 className="mb-0">Nick Name</h6>
                </CCol>
                <CCol sm="9" className="text-secondary">
                  {data.nickname.show ? data.nickname.data : ''}
                </CCol>
              </CRow>
              <hr />
              <CRow>
                <CCol sm="3">
                  <h6 className="mb-0">Email</h6>
                </CCol>
                <CCol sm="9" className="text-secondary">
                  {data.publicEmail.show ? data.publicEmail.data : ''}
                </CCol>
              </CRow>
              <hr />
              <CRow>
                <CCol sm="3">
                  <h6 className="mb-0">Phone</h6>
                </CCol>
                <CCol sm="9" className="text-secondary">
                  {data.homephone.show ? data.homephone.data : ''}
                </CCol>
              </CRow>
              <hr />
              <CRow>
                <CCol sm="3">
                  <h6 className="mb-0">Mobile</h6>
                </CCol>
                <CCol sm="9" className="text-secondary">
                  {data.cellphone.show ? data.cellphone.data : ''}
                </CCol>
              </CRow>
              <hr />
              <CRow>
                <Link>
                  <CButton>Edit</CButton>
                </Link>
              </CRow>
            </CCardBody>
          </CCard>
          <CRow>
            <CCol sm="6" className="mb-3">
              <CCard className="h-100">
                <CCardBody>
                  <h6 className="d-flex align-items-center mb-3">
                    <i className="material-icons text-info mr-2">Education</i>
                  </h6>
                  <hr />
                  <CRow>
                    <CCol sm="3">
                      <h6 className="mb-0">Bachelor</h6>
                    </CCol>
                    <CCol sm="9" className="text-secondary">
                      {data.education.major.show ? data.education.major.SD : ''}
                    </CCol>
                  </CRow>
                  <hr />
                  <CRow>
                    <CCol sm="3">
                      <h6 className="mb-0">Master</h6>
                    </CCol>
                    <CCol sm="9" className="text-secondary">
                      {data.education.master.show ? data.education.master.SD : ''}
                    </CCol>
                  </CRow>
                  <hr />
                  <CRow>
                    <CCol sm="3">
                      <h6 className="mb-0">Doctor</h6>
                    </CCol>
                    <CCol sm="9" className="text-secondary">
                      {data.education.doctor.show ? data.education.doctor.SD : ''}
                    </CCol>
                  </CRow>
                  <hr />
                </CCardBody>
              </CCard>
            </CCol>
            <CCol sm="6" className="mb-3">
              <CCard className="h-100">
                <CCardBody>
                  <h6 className="d-flex align-items-center mb-3">
                    <i className="material-icons text-info mr-2">Current Occupation</i>
                  </h6>
                  <hr />
                  <CRow>
                    <CCol sm="4">
                      <h6 className="mb-0">Company</h6>
                    </CCol>
                    <CCol sm="9" className="text-secondary">
                      {data.Occupation[0].show ? data.Occupation[0].C : ''}
                    </CCol>
                  </CRow>
                  <hr />
                  <CRow>
                    <CCol sm="4">
                      <h6 className="mb-0">Department</h6>
                    </CCol>
                    <CCol sm="9" className="text-secondary">
                      {data.Occupation[0].show ? data.Occupation[0].O : ''}
                    </CCol>
                  </CRow>
                  <hr />
                  <CRow>
                    <CCol sm="4">
                      <h6 className="mb-0">Position</h6>
                    </CCol>
                    <CCol sm="9" className="text-secondary">
                      {data.Occupation[0].show ? data.Occupation[0].P : ''}
                    </CCol>
                  </CRow>
                  <hr />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          {recruitment.length !== 0 ? (
            <CCard className="mb-3">
              <CCardBody>{showRecruitment(recruitment)}</CCardBody>
            </CCard>
          ) : (
            <></>
          )}
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Profile
