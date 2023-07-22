/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectLogin } from '../../../../slices/loginSlice'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CForm,
  CInputGroup,
  CInputGroupText,
  CFormControl,
  CButton,
  CFormCheck,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ReactTooltip from 'react-tooltip'
import PropTypes from 'prop-types'
import Spinner from '../../../components/Spinner'

const strToArray = (str) => {
  let ad = [str]

  if (str.includes(',')) {
    ad = str.split(',')
  }
  if (str.includes('，')) {
    ad = str.split('，')
  }
  ad = ad.map((a) => (a = a.trim()))
  return ad
}
const MatchForm = () => {
  const { identity } = useParams()
  const history = useHistory()
  const senior = identity === 'senior' ? true : false
  const { email: userEmail, name: userName, studentID } = useSelector(selectLogin)
  const [degrees, setDegrees] = useState([false, false, false])
  const [hasPapers, setHasPapers] = useState([false, false, false, false])
  const [endTime, setEndTime] = useState(['', '', '', ''])
  const [loading, setLoading] = useState(true)

  const formTemplate = senior
    ? {
        identity: 'senior',
        name: userName,
        email: userEmail,
        major: [],
        degree: '',
        school: '',
        gpa: '',
        number: '',
        admission: [],
      }
    : {
        identity: 'junior',
        name: userName,
        email: userEmail,
        studentID: studentID,
        major: [],
        degree: '',
        gpa: '',
        hasPaper: '',
        school1: [],
        school2: [],
        school3: [],
      }
  const [requiredStyle, setRequiredStyle] = useState(
    senior
      ? {
          name: '',
          major: '',
          email: '',
          school: '',
          number: '',
        }
      : {
          name: '',
          email: '',
          major: '',
          school1: '',
          school2: '',
        },
  )
  const [dataForm, setDataForm] = useState(formTemplate)
  const handleInputChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value })
    handleInputRadio(e)
    if (requiredStyle.hasOwnProperty(e.target.name)) {
      if (e.target.value === '')
        setRequiredStyle({ ...requiredStyle, [e.target.name]: 'border-3 border-danger' })
      else setRequiredStyle({ ...requiredStyle, [e.target.name]: '' })
    }
  }
  const handleInputArray = (e) => {
    const a = strToArray(e.target.value)
    setDataForm({ ...dataForm, [e.target.name]: a })
    if (requiredStyle.hasOwnProperty(e.target.name)) {
      if (e.target.value === '')
        setRequiredStyle({ ...requiredStyle, [e.target.name]: 'border-3 border-danger' })
      else setRequiredStyle({ ...requiredStyle, [e.target.name]: '' })
    }
  }
  const handleInputRadio = (e) => {
    if (e.target.name === 'hasPaper') {
      let hp = Number(e.target.value)
      let hps = Array(4).fill(false)
      hps[hp] = true
      setHasPapers(hps)
    } else if (e.target.name === 'degree') {
      let deg = Number(e.target.value)
      let degs = Array(3).fill(false)
      degs[deg] = true
      setDegrees(degs)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (dataForm.gpa > 4.3 || isNaN(dataForm.gpa)) {
      alert('please fill in correct gpa')
      return
    }
    axios
      .post('/api/study/fillForm', dataForm)
      .then(() => {
        alert('已送出')
        history.push('/matching')
      })
      .catch((err) => {
        err.response.data.description && alert('錯誤\n' + err.response.data.description)
      })
  }
  const getPrevForm = async () => {
    await axios
      .get('/api/study/form')
      .then((res) => {
        const { degree: deg, hasPaper: hpaper, endTime: et } = res.data
        if (et) {
          const [year, month, day, h_m] = et.split('-')
          const [hour, min] = h_m.split(':')
          setEndTime(() => [year, month, day, hour, min])
        }
        if (deg) {
          setDataForm({ ...res.data, ['degree']: deg[0] })
          let degg = Number(deg[0])
          let degs = Array(3).fill(false)
          degs[degg] = true
          setDegrees(degs)
        }
        if (hpaper) {
          const hp = Number(hpaper)
          let hps = Array(4).fill(false)
          hps[hp] = true
          setHasPapers(hps)
        }
      })
      .then(() => setLoading(false))
      .catch((err) => alert('錯誤\n' + err))
  }
  useEffect(() => {
    getPrevForm()
  }, [studentID])
  return loading ? (
    <Spinner />
  ) : (
    <div className="matching-form">
      <div className="d-flex flex-row align-items-center text-color-black">
        <CRow className="justify-content-center">
          <CCol md="11" lg="10" xl="9">
            <CCard className="mx-2">
              <CCardBody className="px-5">
                <button
                  className="align-self-baseline btn btn-ghost-info my-3"
                  onClick={(e) => history.push('/matching')}
                >
                  <CIcon name="cil-arrow-left" size="lg" />
                </button>
                <CForm>
                  <h2>
                    {senior ? '學長姐' : '學弟妹'}您好，請於{endTime[1]}/{endTime[2]} {endTime[3]}:
                    {endTime[4]}前填妥以下表單，我們才會幫您配對
                    {senior ? '您的學弟妹' : '輔導您的學長姐'}喔！
                  </h2>
                  <p className="text-medium-emphasis">開通EEChain</p>

                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-layers" />
                    </CInputGroupText>
                    <CFormControl
                      className={requiredStyle.name}
                      data-for="name"
                      data-tip="Please fill in your name"
                      placeholder="Your Name*"
                      value={dataForm.name}
                      name="name"
                      onChange={handleInputChange}
                    />
                    <ReactTooltip id="name" place="top" type="dark" effect="solid" />
                  </CInputGroup>
                  {!senior && (
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon="cil-dollar" />
                      </CInputGroupText>
                      <CFormControl
                        data-for="studentID"
                        data-tip="Please fill in your student number"
                        placeholder="Your Student ID"
                        name="studentID"
                        value={dataForm.studentID}
                        onChange={handleInputChange}
                      />
                      <ReactTooltip id="studentID" place="top" type="dark" effect="solid" />
                    </CInputGroup>
                  )}
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-building" />
                    </CInputGroupText>
                    <CFormControl
                      className={requiredStyle.email}
                      data-for="email"
                      data-tip="Please fill in your email"
                      placeholder="Your Email*"
                      value={dataForm.email}
                      name="email"
                      onChange={handleInputChange}
                    />
                    <ReactTooltip id="email" place="top" type="dark" effect="solid" />
                  </CInputGroup>
                  <h5 className="text-medium-emphasis">
                    填入您{senior ? '現在研究的領域' : '想申請的領域(若有多個請用 , 分開)'}
                  </h5>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-braille" />
                    </CInputGroupText>
                    <CFormControl
                      className={requiredStyle.major}
                      placeholder="Your Major"
                      value={dataForm.major}
                      name="major"
                      onChange={senior ? handleInputChange : handleInputArray}
                    />
                  </CInputGroup>
                  <h5 className="text-medium-emphasis">
                    {senior ? '你申請到的學位' : '想申請的學位'}
                  </h5>
                  <CInputGroup className="mb-4">
                    <div className="d-flex justify-content-around">
                      <div style={{ 'margin-right': '1.2rem' }}>
                        <CFormCheck
                          type="radio"
                          name="degree"
                          value="0"
                          label="MS"
                          id="degree0"
                          onChange={handleInputChange}
                          checked={degrees[0]}
                        />
                      </div>
                      <div style={{ 'margin-right': '1.2rem' }}>
                        <CFormCheck
                          type="radio"
                          name="degree"
                          value="1"
                          label="PhD"
                          id="degree1"
                          onChange={handleInputChange}
                          checked={degrees[1]}
                        />
                      </div>
                      {senior ? null : (
                        <div>
                          <CFormCheck
                            type="radio"
                            name="degree"
                            value="2"
                            label="Both"
                            id="degree2"
                            onChange={handleInputChange}
                            checked={degrees[2]}
                          />
                        </div>
                      )}
                    </div>
                  </CInputGroup>
                  <h5 className="text-medium-emphasis">
                    請填入{senior ? '之前' : '目前'}的在校GPA
                  </h5>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-education" />
                    </CInputGroupText>
                    <CFormControl
                      placeholder="Overall GPA(in 4.3 scale)"
                      value={dataForm.gpa}
                      name="gpa"
                      onChange={handleInputChange}
                    />
                  </CInputGroup>
                  {senior ? (
                    <>
                      <h5 className="text-medium-emphasis">請填入您現在就讀的學校</h5>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon="cil-dollar" />
                        </CInputGroupText>
                        <CFormControl
                          className={requiredStyle.school}
                          placeholder="Your School"
                          name="school"
                          value={dataForm.school}
                          onChange={handleInputChange}
                        />
                      </CInputGroup>
                      <h5 className="text-medium-emphasis">請問您想接收幾位學弟妹呢?</h5>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon="cil-education" />
                        </CInputGroupText>
                        <CFormControl
                          placeholder="Number of juniors you'd like to mentor"
                          value={dataForm.number}
                          name="number"
                          onChange={handleInputChange}
                        />
                      </CInputGroup>
                      <h5 className="text-medium-emphasis">
                        填入您之前有錄取的學校(若有多個請用 , 分開)
                      </h5>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon="cil-braille" />
                        </CInputGroupText>
                        <CFormControl
                          placeholder="Your Admissions"
                          value={dataForm.admission}
                          name="admission"
                          onChange={handleInputArray}
                        />
                      </CInputGroup>
                    </>
                  ) : (
                    <>
                      <h5 className="text-medium-emphasis">發論文的經驗</h5>
                      <div className="d-flex justify-content-around">
                        <CInputGroup className="mb-4">
                          <div className="col-3">
                            <CFormCheck
                              type="radio"
                              name="hasPaper"
                              value="0"
                              label="無論文經驗"
                              id="hp0"
                              onChange={handleInputChange}
                              checked={hasPapers[0]}
                            />
                          </div>
                          <div className="col-3">
                            <CFormCheck
                              type="radio"
                              name="hasPaper"
                              value="1"
                              label="已投稿但尚未公佈"
                              id="hp1"
                              onChange={handleInputChange}
                              checked={hasPapers[1]}
                            />
                          </div>
                          <div className="col-3">
                            <CFormCheck
                              type="radio"
                              name="hasPaper"
                              value="2"
                              label="已發表 1 篇"
                              id="hp2"
                              onChange={handleInputChange}
                              checked={hasPapers[2]}
                            />
                          </div>
                          <div className="col-3">
                            <CFormCheck
                              type="radio"
                              name="hasPaper"
                              value="3"
                              id="hp3"
                              label="已發表 2 篇以上"
                              onChange={handleInputChange}
                              checked={hasPapers[3]}
                            />
                          </div>
                        </CInputGroup>
                      </div>
                      <h5 className="text-medium-emphasis">你的夢想學校(若有多個請用 , 分開)</h5>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon="cil-dollar" />
                        </CInputGroupText>
                        <CFormControl
                          className={requiredStyle.school1}
                          placeholder="Your Dream College"
                          name="school1"
                          value={dataForm.school1}
                          onChange={handleInputArray}
                        />
                      </CInputGroup>
                      <h5 className="text-medium-emphasis">稍有把握的學校(若有多個請用 , 分開)</h5>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon="cil-dollar" />
                        </CInputGroupText>
                        <CFormControl
                          className={requiredStyle.school2}
                          placeholder="Your Confident Colleges"
                          name="school2"
                          value={dataForm.school2}
                          onChange={handleInputArray}
                        />
                      </CInputGroup>
                      <h5 className="text-medium-emphasis">你的保底學校(若有多個請用 , 分開)</h5>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon="cil-dollar" />
                        </CInputGroupText>
                        <CFormControl
                          placeholder="Your Guaranteed Colleges"
                          name="school3"
                          value={dataForm.school3}
                          onChange={handleInputArray}
                        />
                      </CInputGroup>
                    </>
                  )}
                  <CRow className="justify-content-center mt-3">
                    <div className="d-flex d-flex justify-content-center">
                      <CButton
                        color="dark"
                        onClick={(e) => {
                          let miss = []
                          for (let info in requiredStyle) {
                            if (!dataForm[info]) {
                              miss.push(info)
                            }
                          }
                          if (miss.length !== 0) {
                            let missStyle = requiredStyle
                            for (let m of miss) {
                              missStyle[m] = 'border-3 border-danger'
                            }
                            alert(`You have to fill out ${miss}`)
                            setRequiredStyle({ ...requiredStyle, ...missStyle })
                            return
                          }
                          handleSubmit(e)
                        }}
                      >
                        確認送出
                      </CButton>
                    </div>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div>
    </div>
  )
}
MatchForm.propTypes = {
  identity: PropTypes.string,
  setIdentity: PropTypes.func,
  setOpened: PropTypes.func,
}
export default MatchForm
