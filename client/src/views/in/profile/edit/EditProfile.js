import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openEditImageModal } from '../../../../slices/profileSlice'
import { selectLogin } from '../../../../slices/loginSlice'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CFormControl,
  CInputGroup,
  CRow,
  CListGroup,
  CListGroupItem,
  CAvatar,
} from '@coreui/react'
import Select from 'react-select'
import CIcon from '@coreui/icons-react'
import { Link, useHistory } from 'react-router-dom'
import ProfileImageEditor from './ProfileImageEditor'
import axios from 'axios'

const ProfileEdit = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { imgSrc, studentID } = useSelector(selectLogin)
  const [data, setData] = useState(null)
  const getProfile = () => {
    axios
      .get('api/profile')
      .then((res) => {
        setData({ ...data, ...res.data })
      })
      .catch((err) => {
        console.log(err)
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
  const handleSave = () => {
    const newData = data
    newData.advisingProfessor = JSON.stringify(data.advisingProfessor)
    axios
      .patch('api/profile', newData)
      .then((res) => {
        alert(`completed`)
        history.push(`/profile/${studentID}`)
      })
      .catch((err) => {
        console.log(err)
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
  const handleOccupationChange = (index, key, value) => {
    let list = [...data.Occupation]
    let item = { ...list[index] }
    item[key] = value
    list[index] = item
    setData({ ...data, Occupation: list })
  }
  const inputStyle = {
    border: '0px',
    // outline: 'none',
  }
  useEffect(() => {
    getProfile()
  }, [])
  const chineseNames = [
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

  return data ? (
    <>
      <ProfileImageEditor />
      <CContainer>
        <CRow>
          <CCol md="4" className="mb-3">
            <CCard>
              <CCardBody>
                <CInputGroup className="d-flex flex-column align-items-center text-center">
                  <img src={imgSrc} alt="Admin" className="rounded-circle" width="150" />
                  <CButton
                    onClick={(e) => {
                      e.preventDefault()
                      dispatch(openEditImageModal())
                    }}
                  >
                    Edit
                  </CButton>

                  <div className="mt-3">
                    <CFormControl
                      style={inputStyle}
                      value={data.username}
                      onChange={(e) => setData({ ...data, username: e.target.value })}
                    />
                    <CFormControl
                      className="text-secondary mb-1"
                      style={inputStyle}
                      value={data.profile}
                      onChange={(e) => setData({ ...data, profile: e.target.value })}
                    />
                    <CFormControl
                      className="text-muted font-size-sm"
                      style={inputStyle}
                      value={data.CC}
                      onChange={(e) => setData({ ...data, CC: e.target.value })}
                    />
                  </div>
                </CInputGroup>
              </CCardBody>
            </CCard>
            <CCard className="mt-3">
              <CListGroup>
                <CListGroupItem>
                  <h6 className="mb-0">
                    <CAvatar>
                      <CIcon icon="website"></CIcon>
                    </CAvatar>
                    Website
                  </h6>
                  <CFormControl
                    className="text-secondary"
                    style={inputStyle}
                    value={data.web}
                    onChange={(e) => setData({ ...data, web: e.target.value })}
                  />
                </CListGroupItem>
                <CListGroupItem>
                  <h6 className="mb-0">
                    <CAvatar>
                      <CIcon icon="cib-github"></CIcon>
                    </CAvatar>
                    Github
                  </h6>
                  <CFormControl
                    className="text-secondary"
                    style={inputStyle}
                    value={data.github}
                    onChange={(e) => setData({ ...data, github: e.target.value })}
                  />
                </CListGroupItem>
                <CListGroupItem>
                  <h6 className="mb-0">
                    <CAvatar>
                      <CIcon icon="cib-linkedin"></CIcon>
                    </CAvatar>
                    Linkedin
                  </h6>
                  <CFormControl
                    className="text-secondary"
                    style={inputStyle}
                    value={data.Linkedin}
                    onChange={(e) => setData({ ...data, Linkedin: e.target.value })}
                  />
                </CListGroupItem>
                <CListGroupItem>
                  <h6 className="mb-0">
                    <CAvatar>
                      <CIcon icon="cib-facebook"></CIcon>
                    </CAvatar>
                    Facebook
                  </h6>
                  <CFormControl
                    className="text-secondary"
                    style={inputStyle}
                    value={data.facebook}
                    onChange={(e) => setData({ ...data, facebook: e.target.value })}
                  />
                </CListGroupItem>
              </CListGroup>
            </CCard>
          </CCol>
          <CCol md="8">
            <CCard className="mb-3">
              <CCardBody>
                <div>
                  <CCol sm="3">
                    <h6 className="mb-0">Nickname</h6>
                  </CCol>
                  <CCol sm="9" className="text-secondary my-2">
                    <CFormControl
                      style={inputStyle}
                      value={data.nickname}
                      onChange={(e) => setData({ ...data, nickname: e.target.value })}
                    />
                  </CCol>
                </div>
                <hr className="mt-1 mb-3" />
                <div>
                  <CCol sm="3">
                    <h6 className="mb-0">Student ID</h6>
                  </CCol>
                  <CCol sm="9" className="text-secondary my-2">
                    <CFormControl style={inputStyle} value={studentID} />
                  </CCol>
                </div>
                <hr className="mt-1 mb-3" />
                <div>
                  <CCol sm="3">
                    <h6 className="mb-0">Email</h6>
                  </CCol>
                  <CCol sm="9" className="text-secondary my-2">
                    <CFormControl
                      style={inputStyle}
                      value={data.publicEmail}
                      onChange={(e) => setData({ ...data, publicEmail: e.target.value })}
                    />
                  </CCol>
                </div>
                <hr className="mt-1 mb-3" />
                <div>
                  <CCol sm="3">
                    <h6 className="mb-0">Mobile</h6>
                  </CCol>
                  <CCol sm="9" className="text-secondary my-2">
                    <CFormControl
                      style={inputStyle}
                      value={data.cellphone}
                      onChange={(e) => setData({ ...data, cellphone: e.target.value })}
                    />
                  </CCol>
                </div>
                <hr className="mt-1 mb-3" />
                <div>
                  <CCol sm="3">
                    <h6 className="mb-0">Advising Professor</h6>
                  </CCol>
                  <Select
                    options={formattedNames}
                    isMulti
                    value={data.advisingProfessor}
                    onChange={(item) => {
                      console.log(item)
                      setData({ ...data, advisingProfessor: item })
                    }}
                  />
                </div>
                <hr className="mt-1 mb-3" />
              </CCardBody>
            </CCard>
            <CRow>
              <CCol sm="6" className="mb-3">
                <CCard className="h-100">
                  <CCardBody>
                    <h6 className="d-flex align-items-center mb-3">
                      <i className="material-icons text-info mr-2">Education</i>
                    </h6>
                    <hr className="mt-1 mb-3" />
                    <div>
                      <div>
                        <h6 className="mb-0">Bachelor</h6>
                      </div>
                      <CFormControl
                        className="my-2"
                        style={inputStyle}
                        value={data.major}
                        onChange={(e) => setData({ ...data, major: e.target.value })}
                      />
                    </div>
                    <hr className="mt-1 mb-3" />
                    <div>
                      <div>
                        <h6 className="mb-0">Master</h6>
                      </div>
                      <CFormControl
                        className="my-2"
                        style={inputStyle}
                        value={data.master}
                        onChange={(e) => setData({ ...data, master: e.target.value })}
                      />
                    </div>
                    <hr className="mt-1 mb-3" />
                    <div>
                      <div>
                        <h6 className="mb-0">Doctor</h6>
                      </div>
                      <CFormControl
                        className="my-2"
                        style={inputStyle}
                        value={data.doctor}
                        onChange={(e) => setData({ ...data, doctor: e.target.value })}
                      />
                    </div>
                    <hr className="mt-1 mb-3" />
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol sm="6" className="mb-3">
                <CCard className="h-100">
                  <CCardBody>
                    <h6 className="d-flex align-items-center mb-3">
                      <i className="material-icons text-info mr-2">Current Occupation</i>
                    </h6>
                    <hr className="mt-1 mb-3" />
                    <div>
                      <div>
                        <h6 className="mb-0">Company</h6>
                      </div>
                      <CFormControl
                        className="my-2"
                        style={inputStyle}
                        value={data.Occupation.length != 0 ? data.Occupation[0].C : ''}
                        onChange={(e) => handleOccupationChange(0, 'C', e.target.value)}
                      />
                    </div>
                    <hr className="mt-1 mb-3" />
                    <div>
                      <div>
                        <h6 className="mb-0">Division</h6>
                      </div>
                      <CFormControl
                        className="my-2"
                        style={inputStyle}
                        value={data.Occupation.length != 0 ? data.Occupation[0].O : ''}
                        onChange={(e) => handleOccupationChange(0, 'O', e.target.value)}
                      />
                    </div>
                    <hr className="mt-1 mb-3" />
                    <div>
                      <div>
                        <h6 className="mb-0">Position</h6>
                      </div>
                      <CFormControl
                        className="my-2"
                        style={inputStyle}
                        value={data.Occupation.length != 0 ? data.Occupation[0].P : ''}
                        onChange={(e) => handleOccupationChange(0, 'P', e.target.value)}
                      />
                    </div>
                    <hr className="mt-1 mb-3" />
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
            <CRow>
              <CCol col-sm-3>
                <CButton size="lg" color="info" onClick={handleSave}>
                  Save
                </CButton>
              </CCol>
            </CRow>
          </CCol>
        </CRow>
      </CContainer>
    </>
  ) : null
}

export default ProfileEdit
