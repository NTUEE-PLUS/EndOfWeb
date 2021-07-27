/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
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
  CRow,
  CCollapse,
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CModalFooter,
  CLink,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Register = () => {
  // for web control
  const [isExpand, setIsExpand] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [previewURL, setPreviewURL] = useState(null)

  // data to backend
  const [IDphoto, setIDphoto] = useState(null)

  const expand = (e) => {
    e.preventDefault()
    setIsExpand(true)
  }
  const constract = (e) => {
    e.preventDefault()
    setIsExpand(false)
  }

  const openModal = (e) => {
    setIsModal(true)
  }

  const closeModal = (e) => {
    setIsModal(false)
  }

  const handleChangeImage = (e) => {
    let reader = new FileReader()
    let file = e.target.files[0]
    setIDphoto(file)
    reader.onloadend = () => {
      setPreviewURL(reader.result)
    }
    reader.readAsDataURL(file)
    // call the modal
    setIsModal(true)
  }

  const clearImage = (e) => {
    setIsModal(false)
    setIDphoto(null)
    setPreviewURL(null)
  }

  return (
    <>
      <CModal visible={isModal} onDismiss={closeModal} alignment="center">
        <CModalHeader onDismiss={closeModal}>
          <CModalTitle>Preview Your Photo</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <img src={previewURL} className="img-fluid container justify-content-center d-flex" />
        </CModalBody>
        <CModalFooter>
          <CButton color="warning" onClick={clearImage}>
            Clear
          </CButton>
          <CButton color="dark" onClick={closeModal}>
            OK
          </CButton>
        </CModalFooter>
      </CModal>
      <div className="min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="11" lg="9" xl="8">
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
                    <CInputGroup
                      className="mb-3"
                      onMouseEnter={expand}
                      onFocus={expand}
                      onBlur={constract}
                    >
                      <CInputGroupText>
                        <CIcon name="cil-image" />
                      </CInputGroupText>
                      <CFormControl
                        id="formFile"
                        type="file"
                        onChange={handleChangeImage}
                      ></CFormControl>
                    </CInputGroup>
                    <CCollapse visible={isExpand} onMouseLeave={constract}>
                      <CListGroup>
                        <CListGroupItem color="info">
                          ID photo should contain your <b>full name</b> and{' '}
                          <b>intact, clear face</b>.
                        </CListGroupItem>
                        <CListGroupItem color="success">
                          ID photo is used to confirm your identity, and will be auto deleted after
                          account is activated
                        </CListGroupItem>
                        <CListGroupItem color="warning">
                          The size of photo is at most <b>1MB</b>.
                        </CListGroupItem>
                      </CListGroup>
                      <div className="d-flex justify-content-end">
                        {previewURL ? (
                          <CLink color="link" onClick={openModal} style={{ cursor: 'pointer' }}>
                            Preview Again?
                          </CLink>
                        ) : (
                          <></>
                        )}
                      </div>
                    </CCollapse>
                    <CRow className="justify-content-center mt-3">
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
          </CRow>
        </CContainer>
      </div>
    </>
  )
}

export default Register
