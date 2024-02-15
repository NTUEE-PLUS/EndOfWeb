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
import Select from 'react-select'
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
    advisingProfessor: [],
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
  const handleSelectChange = (selectedOptions) => {
    setRegisterForm((currentForm) => ({
      ...currentForm,
      advisingProfessor: selectedOptions || [], // Update to the new array of selected options or an empty array if none
    }))
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
            if (key === 'advisingProfessor') {
              data.append(key, JSON.stringify(registerForm[key]))
            } else {
              data.append(key, registerForm[key])
            }
          }
        }
      else if (identity === 'alumni') {
        for (let key in registerForm) {
          //   if (!registerForm[key]) {
          //     console.log(key)
          //     return alert('請填寫完整資料。您可能沒有上傳系友證明，詳見下方說明')
          //   }
          if (key === 'advisingProfessor') {
            data.append(key, JSON.stringify(registerForm[key]))
          } else {
            data.append(key, registerForm[key])
          }
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
  const chineseNames = [
    '無',
    '張時中',
    '張子璿',
    '張耀文',
    '陳政維',
    '陳景然',
    '陳中平',
    '陳和麟',
    '陳宏銘',
    '陳信樹',
    '陳志宏',
    '陳銘憲',
    '陳士元',
    '陳耀銘',
    '陳怡然',
    '陳永耀',
    '鄭皓中',
    '陳奕君',
    '鄭宇翔',
    '簡韶逸',
    '邱奕鵬',
    '闕志達',
    '蔡永傑',
    '周俊廷',
    '周錫增',
    '莊曜宇',
    '鐘嘉德',
    '鍾孝文',
    '丁建均',
    '傅立成',
    '謝宏昀',
    '許源浴',
    '胡璧合',
    '黃鐘揚',
    '黃定洧',
    '黃建璋',
    '黃俊郎',
    '黃念祖',
    '黃寶儀',
    '黃升龍',
    '黃天偉',
    '胡振國',
    '江蕙如',
    '江介宏',
    '金藝璘',
    '郭柏齡',
    '郭斯彥',
    '李翔傑',
    '李心予',
    '李宏毅',
    '李君浩',
    '李致毅',
    '李泰成',
    '雷欽隆',
    '李建模',
    '李俊興',
    '李峻霣',
    '李百祺',
    '連豊力',
    '廖婉君',
    '林澤',
    '林建中',
    '林致廷',
    '林啟萬',
    '林清富',
    '林恭如',
    '林浩雄',
    '林晃巖',
    '林坤佑',
    '林茂昭',
    '林士駿',
    '林宗賢',
    '林宗男',
    '林怡成',
    '劉致為',
    '劉智弘',
    '劉志文',
    '劉俊麟',
    '劉浩澧',
    '劉深淵',
    '劉宗德',
    '劉子毓',
    '盧信嘉',
    '呂良鴻',
    '盧奕璋',
    '毛明華',
    '毛紹綱',
    '彭隆瀚',
    '馮世邁',
    '蘇柏青',
    '蘇國棟',
    '蘇炫榮',
    '孫啟光',
    '孫紹華',
    '宋孔彬',
    '蔡睿哲',
    '蔡坤諭',
    '蔡志宏',
    '曾雪峰',
    '王凡',
    '王暉',
    '王奕翔',
    '王倫',
    '王勝德',
    '王鈺強',
    '魏安祺',
    '魏宏宇',
    '吳安宇',
    '吳肇欣',
    '吳志毅',
    '吳忠幟',
    '吳沛遠',
    '吳瑞北',
    '吳宗霖',
    '吳育任',
    '楊家驤',
    '楊志忠',
    '楊東霖',
    '楊奕軒',
    '葉丙成',
    '顏嗣鈞',
    '于天立',
    '林則彬',
    '陳君朋',
    '陳良基',
    '陳少傑',
    '江明理',
    '莊哲明',
    '賴怡吉',
    '李紋霞',
    '林志達',
    '駱明凌',
    '潘正聖',
    '沈上翔',
    '王和盛',
    '王帛霞',
    '楊柏因',
    '楊進順',
    '李舉賢',
    '張煋',
    '朱燿衣',
    '許照',
    '楊維楨',
    '白光弘',
    '馬雲龍',
    '陳秋發',
    '于惠中',
    '許振發',
    '白光弘',
    '馬雲龍',
    '陳秋發',
    '于惠中',
    '許振發',
    '黃鐘洺',
    '馬志欽',
    '吳炎培',
    '劉群章',
    '楊武純',
    '李茂煇',
    '馮武雄',
    '吳建平',
    '龐台銘',
    '郭德盛',
    '詹國禎',
    '陳俊雄',
    '張璞曾',
    '莊晴光',
    '李學智',
    '馮蟻剛',
    '吳靜雄',
    '汪重光',
    '陳秋麟',
    '王維新',
    '馮哲川',
    '張帆人',
    '許博文',
    '林巍聳',
    '陳光禎',
    '陳德玉',
    '楊英杰',
    '曹建和',
    '郭正邦',
    '陳少傑',
    '瞿大雄',
    '呂學士',
    '貝蘇章',
    '張宏鈞',
    '李嗣涔',
    '江衍偉',
    '曹恆偉',
    '羅仁權',
    '陳良基',
    '鄭士康',
    '李枝宏',
    '李琳山',
    '江簡富',
    '賴飛羆',
    '林本堅',
    '王榮騰',
    '張致恩',
  ]
  const formattedNames = chineseNames.map((name) => ({
    value: name,
    label: name,
  }))

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
                        <CIcon icon="cil-user" name="cil-user" />
                      </CInputGroupText>
                      <CFormControl
                        placeholder="Your Chinese Name"
                        name="username"
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-education" name="cil-education" />
                      </CInputGroupText>
                      <CFormControl
                        placeholder="Student ID"
                        name="account"
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-lock-locked" name="cil-lock-locked" />
                      </CInputGroupText>
                      <CFormControl
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-lock-locked" name="cil-lock-locked" />
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
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cilPeople" name="cilPeople" />
                      </CInputGroupText>
                      <Select
                        options={formattedNames}
                        placeholder="專題教授"
                        isMulti
                        isSearchable
                        onChange={handleSelectChange}
                        value={registerForm.advisingProfessor}
                      />
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
                            <CIcon icon="cil-image" name="cil-image" />
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
