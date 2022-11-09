import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCareer, clearCroppedDataUrl, clearCroppedFile } from '../../../slices/careerSlice'
import { useHistory } from 'react-router'
import ColumnImageEditor from './ColumnImageEditor'
import ColumnPreview from './ColumnPreview'
import ReactTooltip from 'react-tooltip'
import PropTypes from 'prop-types'
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
  CRow,
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CModalFooter,
} from '@coreui/react'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
const ColumnForm = ({ data }) => {
  const add = data ? false : true
  const formTemplate = add
    ? {
        title: [''],
        id: '',
        // top: NULL,
        name: '',
        experience: '',
        hashtags: [''],
        // body: NULL,
        bigtitle: '',
        bigsections: '',
        subtitle: '',
        subsection: '',
        annotation: [''],
        job: [''],
        contributer: [''],
        anno: [''],
        date: [''],
        exp: [''],
        edu: [''],
        intro: [''],
        // file: NULL,
      }
    : {
        title: data.title,
        id: data.id,
        top: data.top,
        name: data.top.name,
        experience: data.top.experience,
        hashtags: data.top.hashtags,
        body: data.body.body,
        bigtitle: data.body.body.bigtitle,
        bigsections: data.body.body.bigsections,
        subtitle: data.body.body.bigsections.subtitle,
        subsection: data.body.body.bigsections.subsection,
        annotation: data.annotation.annotation,
        job: data.annotation.annotation.job,
        contributer: data.annotation.annotation.contributer,
        anno: data.anno,
        date: data.date,
        exp: data.exp,
        edu: data.edu,
        intro: data.intro,
        file: data.columnImg,
      }
  const dispatch = useDispatch()
  const history = useHistory()
  const { croppedFile } = useSelector(selectCareer)
  const [isModal, setIsModal] = useState(false)
  const [blockModal, setBlockModal] = useState(false)
  const [originalImage, setOriginalImage] = useState(null)
  const [hashtags, setHashtags] = useState(add ? [''] : data.spec.hashtags)
  const [fileButton, setFileButton] = useState(null)
  const [dataForm, setDataForm] = useState(formTemplate)
  const [requiredStyle, setRequiredStyle] = useState({
    title: '',
    name: '',
    experience: '',
    subtitle: '',
    subsection: '',
  })
  const handleInputChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value })
    if (requiredStyle.hasOwnProperty(e.target.name)) {
      if (e.target.value === '')
        setRequiredStyle({ ...requiredStyle, [e.target.name]: 'border-3 border-danger' })
      else setRequiredStyle({ ...requiredStyle, [e.target.name]: '' })
    }
  }
  const addArray = (e) => {
    if (e.target.name === 'hashtag') {
      const newArray = hashtags.concat([''])
      setHashtags(newArray)
    } else if (e.target.name === 'speciality') {
      // const newArray = speciality.concat([''])
      // setSpeciality(newArray)
    }
  }
  const handleInputArray = (e, index) => {
    if (e.target.name === 'hashtag') {
      const newArray = hashtags.map((hashtag, idx) => {
        if (idx !== index) return hashtag
        else return e.target.value
      })
      setHashtags(newArray)
    } else if (e.target.name === 'speciality') {
      // const newArray = speciality.map((req, idx) => {
      //   if (idx !== index) return req
      //   else return e.target.value
      // })
      // setSpeciality(newArray)
    }
  }
  const handleDeleteArray = (e, index) => {
    if (e.target.name === 'hashtag') {
      const newArray = hashtags.filter((hashtag, idx) => idx !== index)
      setHashtags(newArray)
    } else if (e.target.name === 'speciality') {
      // const newArray = speciality.filter((spec, idx) => idx !== index)
      // setSpeciality(newArray)
    }
  }
  const handleChangeImage = (e) => {
    let reader = new FileReader()
    let file = e.target.files[0]
    setFileButton(e.target)
    // clear old edit image
    dispatch(clearCroppedDataUrl())
    dispatch(clearCroppedFile())
    reader.onloadend = () => {
      setOriginalImage(reader.result)
    }
    reader.readAsDataURL(file)
    // call the modal
    setIsModal(true)
  }
  const clearImage = (e) => {
    // close modal
    setIsModal(false)
    // clear all the image
    setOriginalImage(null)
    dispatch(clearCroppedDataUrl())
    dispatch(clearCroppedFile())
    setDataForm({ ...dataForm, file: null })
    fileButton.value = ''
  }
  const saveEditImage = (e) => {
    // close the modal
    setIsModal(false)
    // fill the form
    setDataForm({ ...dataForm, file: croppedFile })
  }
  const handleSubmit = () => {
    const data = new FormData()
    data.append('title', dataForm.title)
    data.append('name', dataForm.name)
    data.append('experience', dataForm.experience)
    data.append('hashtags', dataForm.hashtags)
    data.append('bigtitle', dataForm.bigtitle)
    data.append('bigsections', dataForm.bigsections)
    for (let hashtag of hashtags) {
      data.append('hashtag[]', hashtag)
    }
    if (croppedFile) {
      data.append('file', dataForm.file, '.png')
    }
    const config = { 'content-type': 'multipart/form-data' }
    if (add) {
      axios
        .post('/api/addColumn', data, config)
        .then(() => {
          alert('已新增')
          // history.push('/own_recommendation') // should has one?
        })
        .catch((err) => {
          err.response.data.description && alert('錯誤\n' + err.response.data.description)
        })
    } else {
      data.append('_id', dataForm._id)
      axios
        .patch('/api/addColumn', data, config)
        .then(() => {
          alert('已更新')
          // history.push('/own_recommendation')
        })
        .catch((err) => {
          err.response.data.description && alert('錯誤\n' + err.response.data.description)
        })
    }
  }
  return (
    <>
      <CModal size="xl" visible={isModal} onDismiss={() => setIsModal(false)} alignment="center">
        <CModalHeader onDismiss={() => setIsModal(false)}>
          <CModalTitle>Edit Your Photo</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <ColumnImageEditor imgSrc={originalImage} />
        </CModalBody>
        <CModalFooter>
          <CButton color="warning" onClick={clearImage}>
            Clear
          </CButton>
          <CButton color="dark" onClick={saveEditImage}>
            OK
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal visible={blockModal} onDismiss={() => setBlockModal(false)} alignment="center">
        <CModalHeader onDismiss={() => setBlockModal(false)}>
          <CModalTitle>Preview New Post</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <ColumnPreview post={dataForm} hashtags={hashtags} description={[]} />
        </CModalBody>
        <CModalFooter>
          <CButton color="warning" onClick={() => setBlockModal(false)}>
            Back
          </CButton>
          <CButton color="dark" onClick={handleSubmit}>
            Post
          </CButton>
        </CModalFooter>
      </CModal>
      <div className="d-flex flex-row align-items-center text-color-black">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="11" lg="9" xl="8">
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <h1>{add ? 'Ready to post' : 'Want to edit'} a column?</h1>
                    <p className="text-medium-emphasis">{add ? 'Create' : 'Edit'} a column</p>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-image" name="cil-image" />
                      </CInputGroupText>
                      <CFormControl
                        data-for="image"
                        data-tip="Put a picture that can represent the column!"
                        id="formFile"
                        type="file"
                        onChange={handleChangeImage}
                        onClick={(e) => (e.target.value = null)}
                      ></CFormControl>
                      <ReactTooltip id="image" place="top" type="dark" effect="solid" />
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-user" name="cil-user" />
                      </CInputGroupText>
                      <CFormControl
                        data-for="title"
                        data-tip="Use impressing title to get people's attention!"
                        placeholder="Title*"
                        value={dataForm.title}
                        name="title"
                        onChange={handleInputChange}
                      />
                      <ReactTooltip id="title" place="top" type="dark" effect="solid" />
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-user" name="cil-user" />
                      </CInputGroupText>
                      <CFormControl
                        className={requiredStyle.name}
                        data-for="name"
                        data-tip="Enter interviewee's name (xxxx 級 xxx)"
                        placeholder="Name*"
                        value={dataForm.name}
                        name="name"
                        onChange={handleInputChange}
                      />
                      <ReactTooltip id="name" place="top" type="dark" effect="solid" />
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-braille" name="cil-braille" />
                      </CInputGroupText>
                      <CFormControl
                        className={requiredStyle.experience}
                        data-for="experience"
                        data-tip="What's the interviewee's experience?"
                        placeholder="Experience*"
                        value={dataForm.experience}
                        name="experience"
                        onChange={handleInputChange}
                      />
                      <ReactTooltip id="experience" place="top" type="dark" effect="solid" />
                    </CInputGroup>

                    {hashtags.map((hashtag, index) => {
                      return (
                        <CInputGroup className="mb-3" key={index}>
                          <CInputGroupText>
                            <CIcon icon="cil-address-book" name="cil-address-book" />
                          </CInputGroupText>
                          <CFormControl
                            data-for="hashtag"
                            data-tip="Enter a hashtag"
                            placeholder="Hashtags"
                            name="hashtag"
                            value={hashtag}
                            onChange={(e) => handleInputArray(e, index)}
                          />
                          <ReactTooltip id="hashtag" place="top" type="dark" effect="solid" />
                          <CButton
                            type="button"
                            name="hashtag"
                            onClick={(e) => handleDeleteArray(e, index)}
                          >
                            x
                          </CButton>
                        </CInputGroup>
                      )
                    })}
                    <CInputGroup className="mb-4 d-flex flex-row">
                      <CInputGroupText>
                        <CIcon icon="cil-address-book" name="cil-address-book" />
                      </CInputGroupText>
                      <CButton type="button" name="hashtag" className="form-add" onClick={addArray}>
                        +
                      </CButton>
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-braille" name="cil-braille" />
                      </CInputGroupText>
                      <CFormControl
                        className={requiredStyle.subtitle} //object輸入格式應為？
                        data-for="subtitle"
                        data-tip="What's the subtitle?"
                        placeholder="Subtitle"
                        value={dataForm.subtitle}
                        name="subtitle"
                        onChange={handleInputChange}
                      />
                      <ReactTooltip id="subtitle" place="top" type="dark" effect="solid" />
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-braille" name="cil-braille" />
                      </CInputGroupText>
                      <CFormControl
                        className={requiredStyle.subsection}
                        data-for="subsection"
                        data-tip="What's the subsection?"
                        placeholder="Subsection"
                        value={dataForm.subsection}
                        name="subsection"
                        onChange={handleInputChange}
                      />
                      <ReactTooltip id="subsection" place="top" type="dark" effect="solid" />
                    </CInputGroup>

                    <CRow className="justify-content-center mt-3">
                      <div className="d-flex d-flex justify-content-center">
                        <CButton
                          color="dark"
                          onClick={() => {
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
                            setBlockModal(true)
                          }}
                        >
                          Preview
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
ColumnForm.propTypes = {
  data: PropTypes.object,
}
export default ColumnForm
