import React, { useState } from 'react'
import axios from 'axios'
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
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CModalFooter,
  CLink,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Redirect, useParams } from 'react-router-dom'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const Register = () => {
  const { identity } = useParams()
  const RegisterFormTemplate = {
    account: '',
    password: '',
    ConfirmPassword: '',
    username: '',
    Email: '',
    file: null,
    isGraduated: identity === 'alumni',
  }
  // for web control
  const [isModal, setIsModal] = useState(false)
  const [previewURL, setPreviewURL] = useState(null)
  const [fileButton, setFileButton] = useState(null)
  const [toLogin, setToLogin] = useState(false)

  // data to backend
  const [registerForm, setRegisterForm] = useState(RegisterFormTemplate)
  const [showPassword, setShowPassword] = useState(false)
  const openModal = (e) => {
    setIsModal(true)
  }

  const closeModal = (e) => {
    setIsModal(false)
  }

  const handleChangeImage = (e) => {
    let reader = new FileReader()
    let file = e.target.files[0]
    setFileButton(e.target)
    setRegisterForm({ ...registerForm, file: file })
    reader.onloadend = () => {
      setPreviewURL(reader.result)
    }
    reader.readAsDataURL(file)
    // call the modal
    setIsModal(true)
  }

  const clearImage = (e) => {
    setIsModal(false)
    setPreviewURL(null)
    setRegisterForm({ ...registerForm, file: null })
    fileButton.value = ''
  }

  const handleInputChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (registerForm.password !== registerForm.ConfirmPassword) {
      return alert('密碼不一致')
    } else {
      let data = new FormData()
      if (identity === 'student')
        for (let key in registerForm) {
          if (key === 'Email') {
            data.append(key, `${registerForm.account}@ntu.edu.tw`)
          } else {
            if (key === 'account' && registerForm.account.substring(3, 6) !== '901') {
              return alert(
                '學號須為電機系學號格式，若您是雙轉輔系生，請用至系友身分註冊，並附上雙轉輔證明截圖',
              )
            }
            data.append(key, registerForm[key])
          }
        }
      else if (identity === 'alumni') {
        for (let key in registerForm) {
          //   if (!registerForm[key]) {
          //     console.log(key)
          //     return alert('請填寫完整資料。您可能沒有上傳系友證明，詳見下方說明')
          //   }
          data.append(key, registerForm[key])
        }
      }

      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
      // send to backend
      // then redirect to login
      axios
        .post('api/register', data, config)
        .then((res) => {
          alert(
            identity === 'student'
              ? '請至學校信箱接收開通信，您的帳號就會被啟動！'
              : '等待管理員確認您的身分後就會寄開通信至您的信箱，請耐心等候！',
          )
          setToLogin(true)
        })
        .catch((err) => {
          switch (err.response.status) {
            default:
              alert(err.response.data.description)
              break
          }
        })
    }
  }

  const handleShowPwd = (e) => {
    setShowPassword(!showPassword)
    const inputPwd = document.querySelector('input[name="password"]')
    const inputConfirmPwd = document.querySelector('input[name="ConfirmPassword"]')
    if (inputPwd.type === 'password') {
      inputPwd.type = 'text'
      inputConfirmPwd.type = 'text'
    } else {
      inputPwd.type = 'password'
      inputConfirmPwd.type = 'password'
    }
  }

  return toLogin ? (
    <Redirect to="/login" />
  ) : (
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
                    <p className="text-danger">
                      <b>注意！為了資安的考量，請不要用之前您用過的密碼！</b>
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-user" />
                      </CInputGroupText>
                      <CFormControl
                        placeholder="Your Chinese Name"
                        name="username"
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-education" />
                      </CInputGroupText>
                      <CFormControl
                        placeholder="Student ID"
                        name="account"
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-lock-locked" />
                      </CInputGroupText>
                      <CFormControl
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon="cil-lock-locked" />
                      </CInputGroupText>
                      <CFormControl
                        type="password"
                        placeholder="Repeat password"
                        name="ConfirmPassword"
                        onChange={handleInputChange}
                      />
                      <CButton color="transparent" onClick={handleShowPwd}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </CButton>
                    </CInputGroup>
                    {identity === 'alumni' && (
                      <>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>@</CInputGroupText>
                          <CFormControl
                            placeholder="Your commonly used Email"
                            name="Email"
                            onChange={handleInputChange}
                          />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon="cil-image" />
                          </CInputGroupText>
                          <CFormControl
                            id="formFile"
                            type="file"
                            accept="image/*"
                            onChange={handleChangeImage}
                          ></CFormControl>
                        </CInputGroup>
                        <CListGroup>
                          <CListGroupItem color="info">
                            Please go to{' '}
                            <a
                              href="https://my.ntu.edu.tw/alumnusJobManage/cst01-1.aspx"
                              target="_blank"
                              rel="noreferrer"
                              className="text-warning fw-bold"
                            >
                              this website
                            </a>{' '}
                            , <b>take a screenshot</b> and upload to prove your identity of alumni
                            of NTUEE
                            <br /> It should contain your <b>full name</b> and <b>studentID</b>.
                          </CListGroupItem>
                          <CListGroupItem color="success">
                            Screenshot is used to confirm your identity, and will be auto deleted
                            after account is activated
                          </CListGroupItem>
                          <CListGroupItem color="warning">
                            The size of screenshot is at most <b>1MB</b>.
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
                      </>
                    )}
                    <CRow className="justify-content-center mt-3">
                      <div className="d-flex justify-content-center">
                        <CButton color="dark" onClick={handleSubmit}>
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
