/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectLogin } from '../../../slices/loginSlice'
import { selectCareer, clearCroppedDataUrl, clearCroppedFile } from '../../../slices/careerSlice'
import { useHistory } from 'react-router'
import CareerImageEditor from '../../components/CareerImageEditor'
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
  CFormSelect,
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
import CareerPreview from '../career/CareerPreview'
const CareerForm = ({ data }) => {
  const add = data ? false : true
  const { email: userEmail } = useSelector(selectLogin)
  const formTemplate = add
    ? {
        title: new Date().toLocaleTimeString(),
        type: 'intern',
        companyName: '',
        email: userEmail,
        workType: '',
        salary: '',
        diploma: '',
        description: '',
        file: '',
        hide: false,
      }
    : {
        title: data.title.title ? data.title.title : '',
        type: data.title.type,
        companyName: data.title.company_name,
        workType: data.title.work_type,
        email: data.info.email ? data.info.email : '',
        salary: data.info.salary ? data.info.salary : '',
        diploma: data.info.diploma ? data.info.diploma : '',
        description: data.spec.description ? data.spec.description : '',
        file: data.image,
        _id: data._id,
        hide: data.hide,
      }
  const dispatch = useDispatch()
  const history = useHistory()
  const { croppedFile } = useSelector(selectCareer)
  const [isModal, setIsModal] = useState(false)
  const [blockModal, setBlockModal] = useState(false)
  const [originalImage, setOriginalImage] = useState(null)
  const [experience, setExperience] = useState(add ? [''] : data.info.experience)
  const [requirement, setRequirement] = useState(add ? [''] : data.spec.requirement)
  const [fileButton, setFileButton] = useState(null)
  const [dataForm, setDataForm] = useState(formTemplate)
  const [requiredStyle, setRequiredStyle] = useState({
    title: '',
  })
  const handleInputChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value })
    if (requiredStyle[e.target.name] !== undefined) {
      if (e.target.value === '')
        setRequiredStyle({ ...requiredStyle, [e.target.name]: 'border-3 border-danger' })
      else setRequiredStyle({ ...requiredStyle, [e.target.name]: '' })
    }
  }
  const addArray = (e) => {
    if (e.target.name === 'experience') {
      const newArray = experience.concat([''])
      setExperience(newArray)
    } else if (e.target.name === 'requirement') {
      const newArray = requirement.concat([''])
      setRequirement(newArray)
    }
  }
  const handleInputArray = (e, index) => {
    if (e.target.name === 'experience') {
      const newArray = experience.map((exp, idx) => {
        if (idx !== index) return exp
        else return e.target.value
      })
      setExperience(newArray)
    } else if (e.target.name === 'requirement') {
      const newArray = requirement.map((req, idx) => {
        if (idx !== index) return req
        else return e.target.value
      })
      setRequirement(newArray)
    }
  }
  const handleDeleteArray = (e, index) => {
    if (e.target.name === 'experience') {
      const newArray = experience.filter((exp, idx) => idx !== index)
      setExperience(newArray)
    } else if (e.target.name === 'requirement') {
      const newArray = requirement.filter((req, idx) => idx !== index)
      setRequirement(newArray)
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
    data.append('company_name', dataForm.companyName)
    data.append('email', dataForm.email)
    data.append('work_type', dataForm.workType)
    data.append('salary', dataForm.salary)
    data.append('diploma', dataForm.diploma)
    data.append('description', dataForm.description)
    data.append('type', dataForm.type)
    data.append('hide', dataForm.hide)
    console.log('append type:', dataForm.type)
    for (let exp of experience) {
      data.append('experience[]', exp)
    }
    for (let req of requirement) {
      data.append('requirement[]', req)
    }
    if (croppedFile) {
      data.append('file', dataForm.file, '.png')
    }
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    }
    if (add) {
      axios
        .post('/api/addRecruitment', data, config)
        .then(() => {
          alert('已新增')
          history.push('/own_recruitment')
        })
        .catch((err) => {
          err.response.data.description && alert('錯誤\n' + err.response.data.description)
        })
    } else if (!add) {
      data.append('_id', dataForm._id)
      axios
        .patch('/api/recruitment', data, config)
        .then(() => {
          alert('已更新')
          history.push('/own_recruitment')
        })
        .catch((err) => {
          err.response.data.description && alert('錯誤\n' + err.response.data.description)
        })
    }
  }
  return (
    <>
      <CModal size="l" visible={isModal} onDismiss={() => setIsModal(false)} alignment="center">
        <CModalHeader onDismiss={() => setIsModal(false)}>
          <CModalTitle>Edit Your Photo</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CareerImageEditor imgSrc={originalImage} />
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
      <CModal
        size="xl"
        visible={blockModal}
        onDismiss={() => setBlockModal(false)}
        alignment="center"
      >
        <CModalHeader onDismiss={() => setBlockModal(false)}>
          <CModalTitle>Preview New Post</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CareerPreview post={dataForm} experience={experience} requirement={requirement} />
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
      <div className="d-flex flex-row align-items-center text-color-black career-form">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="11" lg="9" xl="8">
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <h1>{add ? 'Ready to post' : 'Want to edit'} a recruitment?</h1>
                    <p className="text-medium-emphasis">
                      {add ? 'Create' : 'Edit'} your recruitment
                    </p>
                    {/* <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-layers"/>
                      </CInputGroupText>
                      <CFormControl
                        className={requiredStyle.title}
                        data-for="title"
                        data-tip="Use impressing title to get people's attention!"
                        placeholder="Attractive Title*"
                        value={dataForm.title}
                        name="title"
                        onChange={handleInputChange}
                      />
                      <ReactTooltip id="title" place="top" type="dark" effect="solid" />
                    </CInputGroup> */}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-user" />
                      </CInputGroupText>
                      <CFormSelect
                        className={requiredStyle.type}
                        data-for="type"
                        data-tip="Want to recruit an intern or a full-time?"
                        value={dataForm.type}
                        name="type"
                        onChange={handleInputChange}
                      >
                        <option value="intern">Intern</option>
                        <option value="fulltime">Fulltime</option>
                        <option value="both">Both</option>
                      </CFormSelect>
                      <ReactTooltip id="type" place="top" type="dark" effect="solid" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-building" />
                      </CInputGroupText>
                      <CFormControl
                        data-for="companyName"
                        data-tip="Enter your company's name"
                        placeholder="Company Name"
                        value={dataForm.companyName}
                        name="companyName"
                        onChange={handleInputChange}
                      />
                      <ReactTooltip id="companyName" place="top" type="dark" effect="solid" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-send" />
                      </CInputGroupText>
                      <CFormControl
                        data-for="mail"
                        data-tip="Enter your contact email"
                        placeholder="Email"
                        value={dataForm.email}
                        name="email"
                        onChange={handleInputChange}
                      />
                      <ReactTooltip id="mail" place="top" type="dark" effect="solid" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-braille" />
                      </CInputGroupText>
                      <CFormControl
                        data-for="workType"
                        data-tip="The job position you are recruiting"
                        placeholder="Job Position"
                        value={dataForm.workType}
                        name="workType"
                        onChange={handleInputChange}
                      />
                      <ReactTooltip id="workType" place="top" type="dark" effect="solid" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon="cil-dollar" />
                      </CInputGroupText>
                      <CFormControl
                        data-for="salary"
                        data-tip="Salary paid (/month or /year)"
                        placeholder="Salary(/month or /year)"
                        name="salary"
                        value={dataForm.salary}
                        onChange={handleInputChange}
                      />
                      <ReactTooltip id="salary" place="top" type="dark" effect="solid" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-education" />
                      </CInputGroupText>
                      <CFormControl
                        data-for="diploma"
                        data-tip="Preferred education degree or major"
                        placeholder="Preferred Diploma"
                        value={dataForm.diploma}
                        name="diploma"
                        onChange={handleInputChange}
                      />
                      <ReactTooltip id="diploma" place="top" type="dark" effect="solid" />
                    </CInputGroup>
                    {experience.map((exp, index) => {
                      return (
                        <CInputGroup className="mb-3" key={index}>
                          <CInputGroupText>
                            <CIcon icon="cil-address-book" />
                          </CInputGroupText>
                          <CFormControl
                            data-for="experience"
                            data-tip="Prefered experience"
                            placeholder="Required Experience"
                            name="experience"
                            value={exp}
                            onChange={(e) => handleInputArray(e, index)}
                          />
                          <ReactTooltip id="experience" place="top" type="dark" effect="solid" />
                          <CButton
                            type="button"
                            name="experience"
                            onClick={(e) => handleDeleteArray(e, index)}
                          >
                            x
                          </CButton>
                        </CInputGroup>
                      )
                    })}
                    <CInputGroup className="mb-4 d-flex flex-row">
                      <CInputGroupText>
                        <CIcon icon="cil-address-book" />
                      </CInputGroupText>
                      <CButton
                        type="button"
                        name="experience"
                        className="form-add"
                        onClick={addArray}
                      >
                        +
                      </CButton>
                    </CInputGroup>
                    {requirement.map((req, index) => {
                      return (
                        <CInputGroup className="mb-3" key={index}>
                          <CInputGroupText>
                            <CIcon icon="cil-thumb-up" />
                          </CInputGroupText>
                          <CFormControl
                            data-for="requirement"
                            data-tip="Any requirement for this job"
                            placeholder="Required Skills Or Other Requirements"
                            name="requirement"
                            value={req}
                            onChange={(e) => handleInputArray(e, index)}
                          />
                          <ReactTooltip id="requirement" place="top" type="dark" effect="solid" />
                          <CButton
                            type="button"
                            name="requirement"
                            onClick={(e) => handleDeleteArray(e, index)}
                          >
                            x
                          </CButton>
                        </CInputGroup>
                      )
                    })}
                    <CInputGroup className="mb-4 d-flex flex-row">
                      <CInputGroupText>
                        <CIcon icon="cil-thumb-up" />
                      </CInputGroupText>
                      <CButton
                        type="button"
                        name="requirement"
                        className="form-add"
                        onClick={addArray}
                      >
                        +
                      </CButton>
                    </CInputGroup>
                    <h5 className="text-medium-emphasis">Upload your company's brand image</h5>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-image" />
                      </CInputGroupText>
                      <CFormControl
                        id="formFile"
                        type="file"
                        accept="image/*"
                        onChange={handleChangeImage}
                        onClick={(e) => (e.target.value = null)}
                      ></CFormControl>
                    </CInputGroup>
                    <CInputGroup
                      className="mb-3 mw-100 d-flex"
                      data-for="description"
                      data-tip="Some description for this job"
                    >
                      <CInputGroupText>
                        <CIcon icon="cil-building" />
                      </CInputGroupText>
                      <textarea
                        data-for="description"
                        data-tip="Some description for this job"
                        rows={5}
                        placeholder="Description of this job"
                        name="description"
                        className="form-control"
                        value={dataForm.description}
                        onChange={handleInputChange}
                      />
                      <ReactTooltip id="description" place="top" type="dark" effect="solid" />
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
CareerForm.propTypes = {
  data: PropTypes.object,
}
export default CareerForm
