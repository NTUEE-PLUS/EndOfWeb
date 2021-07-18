import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormControl,
  CInputGroup,
  CInputGroupText,
  CListGroup,
  CListGroupItem,
  CFormLabel,
  CTooltip,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Register = () => {
  return (
    <div className="min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow>
          <CCol md="11" lg="8" xl="7">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Just A Few Steps to Join EE+!</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon name="cil-user" />
                    </CInputGroupText>
                    <CFormControl placeholder="Your Chinese Name" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon name="cil-education" />
                    </CInputGroupText>
                    <CFormControl placeholder="Student ID" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon name="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormControl
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon name="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormControl
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormControl placeholder="Email" autoComplete="email" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon name="cil-image" />
                    </CInputGroupText>
                    <CFormLabel htmlFor="formFile">ID Photo</CFormLabel>
                    <CTooltip
                      content="  ID photo is used to confirm your
                                        identity, and will be auto deleted after
                                        account is activated"
                    >
                      <CFormControl id="formFile" type="file"></CFormControl>
                    </CTooltip>
                  </CInputGroup>
                  <CRow className="justify-content-center">
                    <div className="d-flex justify-content-center">
                      <CButton color="dark" block>
                        Create Account
                      </CButton>
                    </div>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol className="ml-3" style={{ borderLeft: '1px solid gray' }}>
            {/* <CListGroup>
              <CListGroupItem>XDXDXDXDXDXDXDX</CListGroupItem>
            </CListGroup> */}
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
