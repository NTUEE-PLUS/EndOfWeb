/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCareer, clearCroppedDataUrl, clearCroppedFile } from '../../../slices/careerSlice'
import { useHistory } from 'react-router'
import ColumnImageEditor from './ColumnImageEditor'
import ColumnPreview from './ColumnPreview'
import ReactTooltip from 'react-tooltip'
import PropTypes, { object } from 'prop-types'
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
// import { uuidv4 } from 'uuid'
const ColumnForm = ({ data }) => {
  const add = data ? false : true
  var d = new Date()
  var year = d.getFullYear()
  var month = d.getMonth() + 1
  var day = d.getDate()
  var hour = d.getHours()
  var min = d.getMinutes()
  var sec = d.getSeconds()
  var _id =
    year.toString() +
    month.toString() +
    day.toString() +
    hour.toString() +
    min.toString() +
    sec.toString()
  const formTemplate = add
    ? {
        title: [''],
        id: _id.toString(),
        top: { name: '', experience: '', hashtags: [''] },
        body: { body: [{ bigtitle: '', bigsections: { subtitle: '', subsection: '' } }] },
        annotation: { job: [''], contributer: [''] },
        date: '',
        file: '',
      }
    : {
        title: data.title,
        id: data.id,
        top: data.top,
        name: data.top.name,
        experience: data.top.experience,
        body: data.body.body,
        bigsections: data.body.body.bigsections,
        annotation: data.annotation.annotation,
        date: data.date,
        file: data.columnImg,
      }
  const dispatch = useDispatch()
  const { croppedFile } = useSelector(selectCareer)
  const [isModal, setIsModal] = useState(false)
  const [blockModal, setBlockModal] = useState(false)
  const [originalImage, setOriginalImage] = useState(null)

  const [bigtitle, setBigtitle] = useState(add ? [''] : data.body.body.bigtitle)
  const [subtitle, setSubtitle] = useState(add ? [''] : data.body.body.bigsections.subtitle)
  const [subsection, setSubsection] = useState(add ? [''] : data.body.body.bigsections.subsection)

  const [job, setJob] = useState(add ? [''] : data.annotation.annotation.job)
  const [contributor, setContributor] = useState(
    add ? [''] : data.annotation.annotation.contributor,
  )

  const [hashtag, setHashtag] = useState(add ? [''] : data.top.hashtags)
  const [anno, setAnno] = useState(add ? [''] : data.anno)
  const [exp, setExp] = useState(add ? [''] : data.exp)
  const [edu, setEdu] = useState(add ? [''] : data.edu)
  const [intro, setIntro] = useState(add ? [''] : data.intro)

  const [fileButton, setFileButton] = useState(null)
  const [dataForm, setDataForm] = useState(formTemplate)
  const [requiredStyle, setRequiredStyle] = useState({
    title: '',
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
      const newArray = hashtag.concat([''])
      setHashtag(newArray)
    } else if (e.target.name === 'bigtitle') {
      const newArray = bigtitle.concat([''])
      setBigtitle(newArray)
    } else if (e.target.name === 'subtitle') {
      const newArray = subtitle.concat([''])
      setSubtitle(newArray)
      const newArray2 = subsection.concat([''])
      setSubsection(newArray2)
    } else if (e.target.name === 'job') {
      const newArray = job.concat([''])
      setJob(newArray)
      const newArray2 = contributor.concat([''])
      setContributor(newArray2)
    } else if (e.target.name === 'anno') {
      const newArray = anno.concat([''])
      setAnno(newArray)
    } else if (e.target.name === 'exp') {
      const newArray = exp.concat([''])
      setExp(newArray)
    } else if (e.target.name === 'edu') {
      const newArray = edu.concat([''])
      setEdu(newArray)
    } else if (e.target.name === 'intro') {
      const newArray = intro.concat([''])
      setIntro(newArray)
    }
  }
  const handleInputArray = (e, index) => {
    if (e.target.name === 'hashtag') {
      const newArray = hashtag.map((req, idx) => {
        if (idx !== index) return req
        else return e.target.value
      })
      setHashtag(newArray)
    } else if (e.target.name === 'bigtitle') {
      const newArray = bigtitle.map((req, idx) => {
        if (idx !== index) return req
        else return e.target.value
      })
      setBigtitle(newArray)
    } else if (e.target.name === 'subtitle') {
      const newArray = subtitle.map((req, idx) => {
        if (idx !== index) return req
        else return e.target.value
      })
      setSubtitle(newArray)
    } else if (e.target.name === 'subsection') {
      const newArray = subsection.map((req, idx) => {
        if (idx !== index) return req
        else return e.target.value
      })
      setSubsection(newArray)
    } else if (e.target.name === 'job') {
      const newArray = job.map((req, idx) => {
        if (idx !== index) return req
        else return e.target.value
      })
      setJob(newArray)
    } else if (e.target.name === 'contributor') {
      const newArray = contributor.map((req, idx) => {
        if (idx !== index) return req
        else return e.target.value
      })
      setContributor(newArray)
    } else if (e.target.name === 'anno') {
      const newArray = anno.map((req, idx) => {
        if (idx !== index) return req
        else return e.target.value
      })
      setAnno(newArray)
    } else if (e.target.name === 'exp') {
      const newArray = exp.map((req, idx) => {
        if (idx !== index) return req
        else return e.target.value
      })
      setExp(newArray)
    } else if (e.target.name === 'edu') {
      const newArray = edu.map((req, idx) => {
        if (idx !== index) return req
        else return e.target.value
      })
      setEdu(newArray)
    } else if (e.target.name === 'intro') {
      const newArray = intro.map((req, idx) => {
        if (idx !== index) return req
        else return e.target.value
      })
      setIntro(newArray)
    }
  }
  const handleDeleteArray = (e, index) => {
    if (e.target.name === 'hashtag') {
      const newArray = hashtag.filter((hashtag, idx) => idx !== index)
      setHashtag(newArray)
    } else if (e.target.name === 'bigtitle') {
      const newArray = bigtitle.filter((bigtitle, idx) => idx !== index)
      setBigtitle(newArray)
    } else if (e.target.name === 'subtitle') {
      const newArray = subtitle.filter((subtitle, idx) => idx !== index)
      setSubtitle(newArray)
    } else if (e.target.name === 'subsection') {
      const newArray = subsection.filter((subsection, idx) => idx !== index)
      setSubsection(newArray)
    } else if (e.target.name === 'job') {
      const newArray = job.filter((job, idx) => idx !== index)
      setJob(newArray)
    } else if (e.target.name === 'contributor') {
      const newArray = contributor.filter((contributor, idx) => idx !== index)
      setContributor(newArray)
    } else if (e.target.name === 'anno') {
      const newArray = anno.filter((anno, idx) => idx !== index)
      setAnno(newArray)
    } else if (e.target.name === 'exp') {
      const newArray = exp.filter((exp, idx) => idx !== index)
      setAnno(newArray)
    } else if (e.target.name === 'edu') {
      const newArray = edu.filter((edu, idx) => idx !== index)
      setAnno(newArray)
    } else if (e.target.name === 'intro') {
      const newArray = intro.filter((intro, idx) => idx !== index)
      setAnno(newArray)
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
    for (let it of anno) {
      data.append('anno', it)
    }
    for (let it of exp) {
      data.append('exp', it)
    }
    for (let it of edu) {
      data.append('edu', it)
    }
    for (let it of intro) {
      data.append('intro', it)
    }
    const top = { name: dataForm.name, experience: dataForm.experience, hashtags: hashtag }
    // const body = {body: [{ bigtitle: bigtitle[0], bigsections: {subtitle: subtitle[0], subsection: subsection[0] } }]}
    // const annotation = {annotation: [{ job: job[0], contributor: contributor[0]}]}
    let body = { body: [] }
    let annotation = { annotation: [] }
    for (let i = 0; i < bigtitle.length; i++) {
      body.body.push({
        bigtitle: bigtitle[i],
        bigsections: [{ subtitle: subtitle[i], subsection: subsection[i] }],
      })
    } // 其實有問題，subtitle應該是二維陣列，但是好麻煩，先這樣
    for (let i = 0; i < annotation.length; i++) {
      annotation.annotation.push({ job: job[i], contributor: contributor[i] })
    }

    data.append('id', dataForm.id)
    data.append('date', dataForm.date)
    data.append('top', JSON.stringify(top))
    data.append('body', JSON.stringify(body))
    data.append('annotation', JSON.stringify(annotation))
    data.append('anno', dataForm.anno)
    data.append('exp', dataForm.exp)
    data.append('edu', dataForm.edu)
    data.append('intro', dataForm.intro)

    console.log(data.get('top'))
    console.log(data.get('body'))
    console.log(data.get('annotation'))

    if (croppedFile) {
      data.append('file', dataForm.file, '.png')
    }
    const config = { 'content-type': 'multipart/form-data' }
    if (add) {
      axios
        .post('/api/column/add', data, config)
        // .post('/api/addColumn', data, config)
        .then(() => {
          alert('已新增')
          // history.push('/own_recommendation') // should has one?
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
          <CButton color="dark" onClick={saveEditImage} disabled={!croppedFile}>
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
                        <CIcon icon="cil-image" name="cil-image" />
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
                        <CIcon icon="cil-user" name="cil-user" />
                      </CInputGroupText>
                      <CFormControl
                        className={requiredStyle.title}
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
                        <CIcon icon="cil-location-pin" name="cil-location-pin" />
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

                    {hashtag.map((hashtag, index) => {
                      return (
                        <CInputGroup className="mb-3" key={index}>
                          <CInputGroupText>
                            <CIcon icon="cil-lightbulb" name="cil-lightbulb" />
                          </CInputGroupText>
                          <CFormControl
                            data-for="hashtag"
                            data-tip="文章類別，訪問者姓名、級別、工作、相關組織與企業"
                            placeholder="Hashtag*"
                            name="hashtag"
                            value={dataForm.hashtag}
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
                        <CIcon icon="cil-lightbulb" name="cil-lightbulb" />
                      </CInputGroupText>
                      <CButton type="button" name="hashtag" className="form-add" onClick={addArray}>
                        +
                      </CButton>
                    </CInputGroup>

                    {bigtitle.map((bigtitle, index) => {
                      return (
                        <CInputGroup className="mb-3" key={index}>
                          <CInputGroupText>
                            <CIcon icon="cil-bell" name="cil-bell" />
                          </CInputGroupText>
                          <CFormControl
                            data-for="bigtitle"
                            data-tip="工作"
                            placeholder="Bigtitle*"
                            name="bigtitle"
                            value={bigtitle}
                            onChange={(e) => handleInputArray(e, index)}
                          />
                          <ReactTooltip id="contributor" place="top" type="dark" effect="solid" />
                          <CButton
                            type="button"
                            name="bigtitle"
                            onClick={(e) => handleDeleteArray(e, index)}
                          >
                            x
                          </CButton>
                        </CInputGroup>
                      )
                    })}
                    <CInputGroup className="mb-4 d-flex flex-row">
                      <CInputGroupText>
                        <CIcon icon="cil-bell" name="cil-bell" />
                      </CInputGroupText>
                      <CButton
                        type="button"
                        name="bigtitle"
                        className="form-add"
                        onClick={addArray}
                      >
                        +
                      </CButton>
                    </CInputGroup>

                    {subtitle.map((subtitle, index) => {
                      return (
                        <CInputGroup className="mb-3" key={index}>
                          <CInputGroupText>
                            <CIcon icon="cil-bell" name="cil-bell" />
                          </CInputGroupText>
                          <CFormControl
                            data-for="subtitle"
                            data-tip="工作"
                            placeholder="Subtitle*"
                            name="subtitle"
                            value={subtitle}
                            onChange={(e) => handleInputArray(e, index)}
                          />
                          <ReactTooltip id="contributor" place="top" type="dark" effect="solid" />
                          <CButton
                            type="button"
                            name="subtitle"
                            onClick={(e) => handleDeleteArray(e, index)}
                          >
                            x
                          </CButton>
                        </CInputGroup>
                      )
                    })}
                    {subsection.map((subsection, index) => {
                      return (
                        <CInputGroup className="mb-3" key={index}>
                          <CInputGroupText>
                            <CIcon icon="cil-bell" name="cil-bell" />
                          </CInputGroupText>
                          <CFormControl
                            data-for="subsection"
                            data-tip="工作"
                            placeholder="Subsection*"
                            name="subsection"
                            value={subsection}
                            onChange={(e) => handleInputArray(e, index)}
                          />
                          <ReactTooltip id="subsection" place="top" type="dark" effect="solid" />
                          <CButton
                            type="button"
                            name="subsection"
                            onClick={(e) => handleDeleteArray(e, index)}
                          >
                            x
                          </CButton>
                        </CInputGroup>
                      )
                    })}
                    <CInputGroup className="mb-4 d-flex flex-row">
                      <CInputGroupText>
                        <CIcon icon="cil-bell" name="cil-bell" />
                      </CInputGroupText>
                      <CButton
                        type="button"
                        name="subtitle"
                        className="form-add"
                        onClick={addArray}
                      >
                        +
                      </CButton>
                    </CInputGroup>

                    {job.map((job, index) => {
                      return (
                        <CInputGroup className="mb-3" key={index}>
                          <CInputGroupText>
                            <CIcon icon="cil-address-book" name="cil-address-book" />
                          </CInputGroupText>
                          <CFormControl
                            data-for="job"
                            data-tip="工作"
                            placeholder="Job*"
                            name="job"
                            value={job}
                            onChange={(e) => handleInputArray(e, index)}
                          />
                          <ReactTooltip id="contributor" place="top" type="dark" effect="solid" />
                          <CButton
                            type="button"
                            name="job"
                            onClick={(e) => handleDeleteArray(e, index)}
                          >
                            x
                          </CButton>
                        </CInputGroup>
                      )
                    })}
                    {contributor.map((contributor, index) => {
                      return (
                        <CInputGroup className="mb-3" key={index}>
                          <CInputGroupText>
                            <CIcon icon="cil-address-book" name="cil-address-book" />
                          </CInputGroupText>
                          <CFormControl
                            data-for="contributor"
                            data-tip="工作"
                            placeholder="Contributor*"
                            name="contributor"
                            value={contributor}
                            onChange={(e) => handleInputArray(e, index)}
                          />
                          <ReactTooltip id="contributor" place="top" type="dark" effect="solid" />
                          <CButton
                            type="button"
                            name="contributor"
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
                      <CButton type="button" name="job" className="form-add" onClick={addArray}>
                        +
                      </CButton>
                    </CInputGroup>

                    {anno.map((anno, index) => {
                      return (
                        <CInputGroup className="mb-3" key={index}>
                          <CInputGroupText>
                            <CIcon icon="cil-address-book" name="cil-address-book" />
                          </CInputGroupText>
                          <CFormControl
                            data-for="anno"
                            data-tip="所有採訪人員姓名"
                            placeholder="Anno*"
                            name="anno"
                            value={anno}
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
                        </CInputGroup>
                      )
                    })}
                    <CInputGroup className="mb-4 d-flex flex-row">
                      <CInputGroupText>
                        <CIcon icon="cil-address-book" name="cil-address-book" />
                      </CInputGroupText>
                      <CButton type="button" name="anno" className="form-add" onClick={addArray}>
                        +
                      </CButton>
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-calendar" name="cil-calendar" />
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

                    {exp.map((exp, index) => {
                      return (
                        <CInputGroup className="mb-3" key={index}>
                          <CInputGroupText>
                            <CIcon icon="cil-bookmark" name="cil-bookmark" />
                          </CInputGroupText>
                          <CFormControl
                            data-for="exp"
                            data-tip="職位"
                            placeholder="Exp*"
                            name="exp"
                            value={dataForm.exp}
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
                        </CInputGroup>
                      )
                    })}
                    <CInputGroup className="mb-4 d-flex flex-row">
                      <CInputGroupText>
                        <CIcon icon="cil-bookmark" name="cil-bookmark" />
                      </CInputGroupText>
                      <CButton type="button" name="exp" className="form-add" onClick={addArray}>
                        +
                      </CButton>
                    </CInputGroup>

                    {edu.map((edu, index) => {
                      return (
                        <CInputGroup className="mb-3" key={index}>
                          <CInputGroupText>
                            <CIcon icon="cil-envelope-closed" name="cil-envelope-closed" />
                          </CInputGroupText>
                          <CFormControl
                            data-for="edu"
                            data-tip="學歷[學士:校系(畢業年分),碩士:校系(畢業年分),博士:校系(畢業年分)]"
                            placeholder="Education*"
                            name="edu"
                            value={dataForm.edu}
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
                        </CInputGroup>
                      )
                    })}
                    <CInputGroup className="mb-4 d-flex flex-row">
                      <CInputGroupText>
                        <CIcon icon="cil-envelope-closed" name="cil-envelope-closed" />
                      </CInputGroupText>
                      <CButton type="button" name="edu" className="form-add" onClick={addArray}>
                        +
                      </CButton>
                    </CInputGroup>

                    {intro.map((intro, index) => {
                      return (
                        <CInputGroup className="mb-3" key={index}>
                          <CInputGroupText>
                            <CIcon icon="cil-basket" name="cil-basket" />
                          </CInputGroupText>
                          <CFormControl
                            data-for="intro"
                            data-tip="簡介(1個element是一段)"
                            placeholder="introduction*"
                            name="intro"
                            value={dataForm.intro}
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
                        </CInputGroup>
                      )
                    })}
                    <CInputGroup className="mb-4 d-flex flex-row">
                      <CInputGroupText>
                        <CIcon icon="cil-basket" name="cil-basket" />
                      </CInputGroupText>
                      <CButton type="button" name="intro" className="form-add" onClick={addArray}>
                        +
                      </CButton>
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
