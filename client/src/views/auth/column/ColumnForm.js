import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCareer, clearCroppedDataUrl, clearCroppedFile } from '../../../slices/careerSlice'
import ColumnImageEditor from './ColumnImageEditor'
import ColumnPreview from './ColumnPreview'
import Page1 from './Page1'
import Page2 from './Page2'
import Page3 from './Page3'
import ReactTooltip from 'react-tooltip'
import PropTypes from 'prop-types'
// import { NavHashLink } from 'react-router-hash-link'
import {
  // CFormTextarea,
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
// import  CDatePicker  from '@coreui/react-pro'

// import packagename.classname;
// import java.lang.Math;

const ColumnForm = ({ data }) => {
  const add = data ? false : true //有資料:data=true add=false,反之則新增
  const formTemplate = add //add=true:前者，否則後者(更新資料)
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
  const [page, setPage] = useState('1')
  const [hashtag, setHashtag] = useState(add ? [''] : data.top.hashtags)
  const [anno, setAnno] = useState(add ? [''] : data.anno)
  const [exp, setExp] = useState(add ? [''] : data.exp)
  const [edu, setEdu] = useState(add ? [''] : data.edu)
  const [intro, setIntro] = useState(add ? [''] : data.intro)
  const [fileButton, setFileButton] = useState(null)
  const [dataForm, setDataForm] = useState(formTemplate)
  // const calendarDate = new Date(2022, 2, 1)

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

  // const button1 = document.getElementById("1");
  // const button2 = document.getElementById("2");
  // const line = document.querySelector(".line");
  //const button1Rect = button1.getBoundingClientRect();
  // const button2Rect = button2.getBoundingClientRect();
  //line.style.left = 30 + 40 / 2 + "px";
  // line.style.top = button1Rect.top + button1Rect.height / 2 + "px";
  // line.style.width = button2Rect.left - button1Rect.left - button1Rect.width + "px";
  //line.style.transform = "rotate(" + Math.atan2(button2Rect.top - button1Rect.top, button2Rect.left - button1Rect.left) + "rad)";

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
          <CButton
            color="warning"
            onClick={clearImage}
            style={{ display: croppedFile ? 'none' : 'block' }}
          >
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
                <CCardBody className="p-4 columnbg">
                  <CForm>
                    <h1>
                      <font color="#fff">{add ? 'Ready to post' : 'Want to edit'} a column?</font>
                    </h1>
                    <p className="text-medium-emphasis">{add ? 'Create' : 'Edit'} a column</p>

                    <CButton className="btn-column1" id="1" onClick={(e) => setPage(e.target.id)}>
                      About Respondent
                    </CButton>
                    <CButton className="btn-column2" id="2" onClick={(e) => setPage(e.target.id)}>
                      Interview Content
                    </CButton>
                    <CButton className="btn-column3" id="3" onClick={(e) => setPage(e.target.id)}>
                      About Interview
                    </CButton>

                    {page != '3' ? (
                      page != '2' ? (
                        <Page1
                          dataForm={dataForm}
                          exp={exp}
                          edu={edu}
                          hashtag={hashtag}
                          intro={intro}
                          handleInputChange={handleInputChange}
                          handleInputArray={handleInputArray}
                          handleAddArray={handleAddArray}
                          handleDeleteArray={handleDeleteArray}
                        />
                      ) : (
                        <Page2
                          dataForm={dataForm}
                          body={body}
                          handleAddSection={handleAddSection}
                          handleDeleteBigsection={handleDeleteBigsection}
                          handleSubtitleChange={handleSubtitleChange}
                          handleSubsectionChange={handleSubsectionChange}
                          handleInputArray={handleInputArray}
                          handleAddArray={handleAddArray}
                          handleDeleteArray={handleDeleteArray}
                        />
                      )
                    ) : (
                      <Page3
                        dataForm={dataForm}
                        annotation={annotation}
                        anno={anno}
                        handleInputChange={handleInputChange}
                        handleInputArray={handleInputArray}
                        handleAnnotationChange={handleAnnotationChange}
                        handleAddArray={handleAddArray}
                        handleDeleteArray={handleDeleteArray}
                        handleChangeImage={handleChangeImage}
                      />
                    )}
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
