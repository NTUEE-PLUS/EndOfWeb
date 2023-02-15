import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCareer, clearCroppedDataUrl, clearCroppedFile } from '../../../slices/careerSlice'
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
        name: '',
        experience: '',
        date: '',
        file: '',
      }
    : {
        title: data.title,
        name: data.top.name,
        experience: data.top.experience,
        date: data.date,
        file: data.columnImg,
      }
  const dispatch = useDispatch()
  const { croppedFile } = useSelector(selectCareer)
  const [isModal, setIsModal] = useState(false)
  const [blockModal, setBlockModal] = useState(false)
  const [originalImage, setOriginalImage] = useState(null)
  const [body, setBody] = useState(
    add ? [{ bigtitle: '', bigsections: [{ subtitle: '', subsection: '' }] }] : data.body,
  )
  const [annotation, setAnnotation] = useState(
    add ? [{ job: '', contributor: '' }] : data.annotation.annotation,
  )
  const [hashtag, setHashtag] = useState(add ? [''] : data.top.hashtags)
  const [anno, setAnno] = useState(add ? [''] : data.anno)
  const [exp, setExp] = useState(add ? [''] : data.exp)
  const [edu, setEdu] = useState(add ? [''] : data.edu)
  const [intro, setIntro] = useState(add ? [''] : data.intro)
  const [fileButton, setFileButton] = useState(null)
  const [dataForm, setDataForm] = useState(formTemplate)

  const handleInputChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value })
  }
  const handleAddSection = (index) => {
    const newBody = [...body]
    newBody[index].bigsections.push({ subtitle: '', subsection: '' })
    setBody(newBody)
  }
  const handleAddArray = (e) => {
    switch (e.target.name) {
      case 'hashtag':
        setHashtag(hashtag.concat(['']))
        break
      case 'body':
        setBody([...body, { bigtitle: '', bigsections: [{ subtitle: '', subsection: '' }] }])
        break
      case 'annotation':
        setAnnotation([...annotation, { job: '', contributor: '' }])
        break
      case 'anno':
        setAnno(anno.concat(['']))
        break
      case 'exp':
        setExp(exp.concat(['']))
        break
      case 'edu':
        setEdu(edu.concat(['']))
        break
      case 'intro':
        setIntro(intro.concat(['']))
        break
      default:
        break
    }
  }
  const handleInputArray = (e, index) => {
    switch (e.target.name) {
      case 'hashtag':
        let newHashtag = [...hashtag]
        newHashtag[index] = e.target.value
        setHashtag(newHashtag)
        break
      case 'bigtitle':
        let newBody = [...body]
        newBody[index].bigtitle = e.target.value
        setBody(newBody)
        break
      case 'job' || 'contributor':
        const values = [...annotation]
        values[index][e.target.name] = e.target.value
        setAnnotation(values)
        break
      case 'anno':
        let newAnno = [...anno]
        newAnno[index] = e.target.value
        setAnno(newAnno)
        break
      case 'exp':
        let newExp = [...exp]
        newExp[index] = e.target.value
        setExp(newExp)
        break
      case 'edu':
        let newEdu = [...edu]
        newEdu[index] = e.target.value
        setEdu(newEdu)
        break
      case 'intro':
        let newIntro = [...intro]
        newIntro[index] = e.target.value
        setIntro(newIntro)
        break
      default:
        break
    }
  }
  const handleAnnotationChange = (event, index) => {
    const values = [...annotation]
    values[index][event.target.name] = event.target.value
    setAnnotation(values)
  }
  const handleSubtitleChange = (event, bodyIndex, sectionIndex) => {
    const newBody = [...body]
    newBody[bodyIndex].bigsections[sectionIndex].subtitle = event.target.value
    setBody(newBody)
  }
  const handleSubsectionChange = (event, bodyIndex, sectionIndex) => {
    const newBody = [...body]
    newBody[bodyIndex].bigsections[sectionIndex].subsection = event.target.value
    setBody(newBody)
  }
  const handleDeleteBigsection = (bodyIndex, sectionIndex) => {
    if (body[bodyIndex].bigsections.length > 1) {
      const newBody = [...body]
      newBody[bodyIndex].bigsections.splice(sectionIndex, 1)
      setBody(newBody)
    }
  }
  const handleDeleteArray = (e, index) => {
    if (e.target.name === 'hashtag' && hashtag.length > 1)
      setHashtag(hashtag.filter((_, idx) => idx !== index))
    else if (e.target.name === 'body' && body.length > 1)
      setBody(body.filter((_, idx) => idx !== index))
    else if (e.target.name === 'bigsection' && body[index].bigsections.length > 1) {
      let newBody = [...body]
      newBody[index].bigsections = newBody[index].bigsections.filter((_, idx) => idx !== index)
      setBody(newBody)
    } else if (e.target.name === 'annotation' && annotation.length > 1)
      setAnnotation(annotation.filter((_, idx) => idx !== index))
    else if (e.target.name === 'anno' && anno.length > 1)
      setAnno(anno.filter((_, idx) => idx !== index))
    else if (e.target.name === 'exp' && exp.length > 1)
      setExp(exp.filter((_, idx) => idx !== index))
    else if (e.target.name === 'edu' && edu.length > 1)
      setEdu(edu.filter((_, idx) => idx !== index))
    else if (e.target.name === 'intro' && intro.length > 1)
      setIntro(intro.filter((_, idx) => idx !== index))
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
    const top = { name: dataForm.name, experience: dataForm.experience, hashtags: hashtag }
    let _body = { body: body }
    let _annotation = { annotation: annotation }
    const _date = dataForm.date
    const _id = _date.substr(2, 8).split('/').join('')
    data.append('id', _id)
    data.append('date', _date)
    data.append('top', JSON.stringify(top))
    data.append('body', JSON.stringify(_body))
    data.append('annotation', JSON.stringify(_annotation))
    data.append('anno', JSON.stringify(anno))
    data.append('exp', JSON.stringify(exp))
    data.append('edu', JSON.stringify(edu))
    data.append('intro', JSON.stringify(intro))

    if (croppedFile) {
      data.append('file', dataForm.file, '.png')
    }
    const config = { 'content-type': 'multipart/form-data' }
    if (add) {
      axios
        .post('/api/column/add', data, config)
        .then(() => {
          alert('已新增')
        })
        .catch((err) => {
          err.response.data.description && alert('錯誤\n' + err.response.data.description)
        })
    } else {
      data.append('id', dataForm.id)
      axios
        .patch('/api/column/add', data, config)
        .then(() => {
          alert('已更新')
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
          <CButton
            color="dark"
            onClick={saveEditImage}
            style={{ display: croppedFile ? 'block' : 'none' }}
            disabled={!croppedFile}
          >
            OK
          </CButton>
        </CModalFooter>
      </CModal>
      <CModal visible={blockModal} onDismiss={() => setBlockModal(false)} alignment="center">
        <CModalHeader onDismiss={() => setBlockModal(false)}>
          <CModalTitle>Preview New Post</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <ColumnPreview
            post={dataForm}
            body={body}
            annotation={annotation}
            hashtags={hashtag}
            anno={anno}
            exp={exp}
            edu={edu}
            intro={intro}
          />
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
                        <CIcon icon="cil-image" />
                      </CInputGroupText>
                      <CFormControl
                        data-for="image"
                        data-tip="專欄照片"
                        id="formFile"
                        type="file"
                        onChange={handleChangeImage}
                        onClick={(e) => (e.target.value = null)}
                      ></CFormControl>
                      <ReactTooltip id="image" place="top" type="dark" effect="solid" />
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-user" />
                      </CInputGroupText>
                      <CFormControl
                        data-for="name"
                        data-tip="xxxx 級 xxx"
                        placeholder="Name*"
                        value={dataForm.name}
                        name="name"
                        onChange={handleInputChange}
                      />
                      <ReactTooltip id="name" place="top" type="dark" effect="solid" />
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-location-pin" />
                      </CInputGroupText>
                      <CFormControl
                        data-for="experience"
                        data-tip="公司名稱與職位"
                        placeholder="Experience*"
                        value={dataForm.experience}
                        name="experience"
                        onChange={handleInputChange}
                      />
                      <ReactTooltip id="experience" place="top" type="dark" effect="solid" />
                    </CInputGroup>

                    {hashtag.map((_, index) => {
                      return (
                        <CInputGroup className="mb-3" key={index}>
                          <CInputGroupText>
                            <CIcon icon="cil-lightbulb" />
                          </CInputGroupText>
                          <CFormControl
                            data-for="hashtag"
                            data-tip="文章類別，訪問者姓名、級別、工作、相關組織與企業"
                            placeholder="Hashtag*"
                            name="hashtag"
                            value={hashtag[index]}
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
                          <CButton type="button" name="hashtag" onClick={handleAddArray}>
                            +
                          </CButton>
                        </CInputGroup>
                      )
                    })}

                    {body.map((body, bodyIndex) => {
                      return (
                        <CInputGroup className="mb-3" key={bodyIndex}>
                          <CInputGroupText>
                            <CIcon icon="cil-bell" />
                          </CInputGroupText>
                          <CFormControl
                            data-for="bigtitle"
                            data-tip="文章內容"
                            placeholder="Bigtitle*"
                            name="bigtitle"
                            value={body.bigtitle}
                            onChange={(e) => handleInputArray(e, bodyIndex)}
                          />
                          <ReactTooltip id="bigtitle" place="top" type="dark" effect="solid" />
                          <CButton
                            type="button"
                            name="body"
                            onClick={(e) => handleDeleteArray(e, bodyIndex)}
                          >
                            x
                          </CButton>
                          <CButton type="button" name="body" onClick={handleAddArray}>
                            +
                          </CButton>
                          {body.bigsections.map((section, sectionIndex) => (
                            <CInputGroup key={sectionIndex}>
                              <CInputGroupText>
                                <CIcon />
                              </CInputGroupText>
                              <CFormControl
                                data-for="subtitle"
                                data-tip="子段落標題"
                                placeholder="Subtitle*"
                                name="subtitle"
                                value={section.subtitle}
                                onChange={(e) => handleSubtitleChange(e, bodyIndex, sectionIndex)}
                              />
                              <ReactTooltip id="subtitle" place="top" type="dark" effect="solid" />
                              <CFormControl
                                data-for="subsection"
                                data-tip="子段落"
                                placeholder="Subsection*"
                                name="subsection"
                                value={section.subsection}
                                onChange={(e) => handleSubsectionChange(e, bodyIndex, sectionIndex)}
                              />
                              <ReactTooltip
                                id="subsection"
                                place="top"
                                type="dark"
                                effect="solid"
                              />
                              <CButton
                                type="button"
                                name="bigsection"
                                onClick={(e) => handleDeleteBigsection(bodyIndex, sectionIndex)}
                              >
                                x
                              </CButton>
                              <CButton
                                type="button"
                                name="bigsection"
                                onClick={(e) => handleAddSection(bodyIndex)}
                              >
                                +
                              </CButton>
                            </CInputGroup>
                          ))}
                        </CInputGroup>
                      )
                    })}

                    {annotation.map((annotation, index) => {
                      return (
                        <CInputGroup className="mb-3" key={index}>
                          <CInputGroupText>
                            <CIcon icon="cil-address-book" />
                          </CInputGroupText>
                          <CFormControl
                            data-for="job"
                            data-tip="工作"
                            placeholder="Job*"
                            name="job"
                            value={annotation.job}
                            onChange={(e) => handleAnnotationChange(e, index)}
                          />
                          <ReactTooltip id="job" place="top" type="dark" effect="solid" />
                          <CFormControl
                            data-for="contributor"
                            data-tip="人員"
                            placeholder="Contributor*"
                            name="contributor"
                            value={annotation.contributor}
                            onChange={(e) => handleAnnotationChange(e, index)}
                          />
                          <ReactTooltip id="contributor" place="top" type="dark" effect="solid" />
                          <CButton
                            type="button"
                            name="annotation"
                            onClick={(e) => handleDeleteArray(e, index)}
                          >
                            x
                          </CButton>
                          <CButton type="button" name="annotation" onClick={handleAddArray}>
                            +
                          </CButton>
                        </CInputGroup>
                      )
                    })}

                    {anno.map((_, index) => {
                      return (
                        <CInputGroup className="mb-3" key={index}>
                          <CInputGroupText>
                            <CIcon icon="cil-address-book" />
                          </CInputGroupText>
                          <CFormControl
                            data-for="anno"
                            data-tip="所有採訪人員姓名"
                            placeholder="Anno*"
                            name="anno"
                            value={anno[index]}
                            onChange={(e) => handleInputArray(e, index)}
                          />
                          <ReactTooltip id="anno" place="top" type="dark" effect="solid" />
                          <CButton
                            type="button"
                            name="anno"
                            onClick={(e) => handleDeleteArray(e, index)}
                          >
                            x
                          </CButton>
                          <CButton type="button" name="anno" onClick={handleAddArray}>
                            +
                          </CButton>
                        </CInputGroup>
                      )
                    })}

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-calendar" />
                      </CInputGroupText>
                      <CFormControl
                        data-for="date"
                        data-tip="yyyy/mm/dd 星期x"
                        placeholder="Date*"
                        value={dataForm.date}
                        name="date"
                        onChange={handleInputChange}
                      />
                      <ReactTooltip id="date" place="top" type="dark" effect="solid" />
                    </CInputGroup>

                    {exp.map((_, index) => {
                      return (
                        <CInputGroup className="mb-3" key={index}>
                          <CInputGroupText>
                            <CIcon icon="cil-bookmark" />
                          </CInputGroupText>
                          <CFormControl
                            data-for="exp"
                            data-tip="職位"
                            placeholder="Exp*"
                            name="exp"
                            value={exp[index]}
                            onChange={(e) => handleInputArray(e, index)}
                          />
                          <ReactTooltip id="exp" place="top" type="dark" effect="solid" />
                          <CButton
                            type="button"
                            name="exp"
                            onClick={(e) => handleDeleteArray(e, index)}
                          >
                            x
                          </CButton>
                          <CButton type="button" name="exp" onClick={handleAddArray}>
                            +
                          </CButton>
                        </CInputGroup>
                      )
                    })}

                    {edu.map((_, index) => {
                      return (
                        <CInputGroup className="mb-3" key={index}>
                          <CInputGroupText>
                            <CIcon icon="cil-envelope-closed" />
                          </CInputGroupText>
                          <CFormControl
                            data-for="edu"
                            data-tip="學歷[學士:校系(畢業年分),碩士:校系(畢業年分),博士:校系(畢業年分)]"
                            placeholder="Education*"
                            name="edu"
                            value={edu[index]}
                            onChange={(e) => handleInputArray(e, index)}
                          />
                          <ReactTooltip id="edu" place="top" type="dark" effect="solid" />
                          <CButton
                            type="button"
                            name="edu"
                            onClick={(e) => handleDeleteArray(e, index)}
                          >
                            x
                          </CButton>
                          <CButton type="button" name="edu" onClick={handleAddArray}>
                            +
                          </CButton>
                        </CInputGroup>
                      )
                    })}

                    {intro.map((_, index) => {
                      return (
                        <CInputGroup className="mb-3" key={index}>
                          <CInputGroupText>
                            <CIcon icon="cil-basket" />
                          </CInputGroupText>
                          <CFormControl
                            data-for="intro"
                            data-tip="簡介(1個element是一段)"
                            placeholder="introduction*"
                            name="intro"
                            value={intro[index]}
                            onChange={(e) => handleInputArray(e, index)}
                          />
                          <ReactTooltip id="intro" place="top" type="dark" effect="solid" />
                          <CButton
                            type="button"
                            name="intro"
                            onClick={(e) => handleDeleteArray(e, index)}
                          >
                            x
                          </CButton>
                          <CButton type="button" name="intro" onClick={handleAddArray}>
                            +
                          </CButton>
                        </CInputGroup>
                      )
                    })}

                    <CRow className="justify-content-center mt-3">
                      <div className="d-flex d-flex justify-content-center">
                        <CButton
                          color="dark"
                          onClick={() => {
                            setBlockModal(true)
                            console.log(dataForm)
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
