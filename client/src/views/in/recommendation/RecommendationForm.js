/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectLogin } from '../../../slices/loginSlice'
import { selectCareer, clearCroppedDataUrl, clearCroppedFile } from '../../../slices/careerSlice'
import { useHistory } from 'react-router'
import CareerImageEditor from '../../components/CareerImageEditor'
import { Spinner } from '.'
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
  CFormLabel,
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
const RecommendationForm = ({ data }) => {
  const add = data ? false : true
  const { cellphone: userPhone, email: userEmail, name: userName } = useSelector(selectLogin)
  const formTemplate = add
    ? {
        type: 'intern',
        title: String(new Date()),
        name: userName,
        desireWorkType: '',
        contact: userPhone,
        email: userEmail,
        diploma: '',
        file: '',
      }
    : {
        type: data.title.type == 'undefined' ? '' : data.title.type,
        title: data.title.title == 'undefined' ? '' : data.title.title,
        name: data.title.name == 'undefined' ? '' : data.title.name,
        desireWorkType:
          data.title.desire_work_type == 'undefined' ? '' : data.title.desire_work_type,
        contact: data.info.contact == 'undefined' ? '' : data.info.contact,
        email: data.info.email == 'undefined' ? '' : data.info.email,
        diploma: data.info.diploma == 'undefined' ? '' : data.info.diploma,
        file: data.image,
        resume: data.resume,
        _id: data._id,
      }
  const dispatch = useDispatch()
  const history = useHistory()
  const { croppedFile } = useSelector(selectCareer)
  const [isPending, setIsPending] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [blockModal, setBlockModal] = useState(false)
  const [imageButton, setImageButton] = useState(null)
  const [resumeBtn, setResumeBtn] = useState(null)
  const [resumeURL, setResumeURL] = useState(add ? null : data.resume)
  const [experience, setExperience] = useState(add ? [''] : data.spec.experience)
  const [speciality, setSpeciality] = useState(add ? [''] : data.spec.speciality)
  const [dataForm, setDataForm] = useState(formTemplate)
  const [requiredStyle, setRequiredStyle] = useState({
    name: '',
    desireWorkType: '',
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
    if (e.target.name === 'experience') {
      const newArray = experience.concat([''])
      setExperience(newArray)
    } else if (e.target.name === 'speciality') {
      const newArray = speciality.concat([''])
      setSpeciality(newArray)
    }
  }
  const handleInputArray = (e, index) => {
    if (e.target.name === 'experience') {
      const newArray = experience.map((exp, idx) => {
        if (idx !== index) return exp
        else return e.target.value
      })
      setExperience(newArray)
    } else if (e.target.name === 'speciality') {
      const newArray = speciality.map((req, idx) => {
        if (idx !== index) return req
        else return e.target.value
      })
      setSpeciality(newArray)
    }
  }
  const handleDeleteArray = (e, index) => {
    if (e.target.name === 'experience') {
      const newArray = experience.filter((exp, idx) => idx !== index)
      setExperience(newArray)
    } else if (e.target.name === 'speciality') {
      const newArray = speciality.filter((spec, idx) => idx !== index)
      setSpeciality(newArray)
    }
  }
  const handleChangeImage = (e) => {
    let reader = new FileReader()
    let file = e.target.files[0]
    // clear old edit image
    dispatch(clearCroppedDataUrl())
    dispatch(clearCroppedFile())
    reader.onloadend = () => {
      setImageButton(reader.result)
    }
    reader.readAsDataURL(file)
    // call the modal
    setIsModal(true)
  }

  const clearImage = (e) => {
    // close modal
    setIsModal(false)
    // clear all the image
    setImageButton(null)
    dispatch(clearCroppedDataUrl())
    dispatch(clearCroppedFile())
    setDataForm({ ...dataForm, file: null })
  }
  const saveEditImage = (e) => {
    // close the modal
    setIsModal(false)
    // fill the form
    setDataForm({ ...dataForm, file: croppedFile })
  }
  const handleResumeChange = (e) => {
    const uploadedFile = e.target.files[0]
    setResumeBtn(uploadedFile)
    setResumeURL(URL.createObjectURL(uploadedFile))
  }
  const handleSubmit = () => {
    setIsPending(true)
    const data = new FormData()
    data.append('title', dataForm.title)
    data.append('name', dataForm.name)
    data.append('type', dataForm.type)
    data.append('desire_work_type', dataForm.desireWorkType)
    data.append('contact', dataForm.contact)
    data.append('email', dataForm.email)
    data.append('diploma', dataForm.diploma)
    if (resumeBtn) {
      data.append('files[]', resumeBtn, '.pdf')
    }
    for (let exp of experience) {
      data.append('experience[]', exp)
    }
    for (let spec of speciality) {
      data.append('speciality[]', spec)
    }
    if (imageButton) {
      data.append('files[]', dataForm.file, '.png')
    }
    const config = { 'content-type': 'multipart/form-data' }
    if (add) {
      axios
        .post('/api/recommendation', data, config)
        .then(() => {
          setIsPending(false)
          alert('已新增')
          history.push('/own_recommendation')
        })
        .catch((err) => {
          err.response.data.description && alert('錯誤\n' + err.response.data.description)
        })
    } else {
      data.append('_id', dataForm._id)
      axios
        .patch('/api/recommendation', data, config)
        .then(() => {
          setIsPending(false)
          alert('已更新')
          history.push('/own_recommendation')
        })
        .catch((err) => {
          err.response.data.description && alert('錯誤\n' + err.response.data.description)
        })
    }
  }
  return isPending ? (
    <Spinner />
  ) : (
    <>
      <CModal size="l" visible={isModal} onDismiss={() => setIsModal(false)} alignment="center">
        <CModalHeader onDismiss={() => setIsModal(false)}>
          <CModalTitle>Edit Your Photo</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CareerImageEditor imgSrc={imageButton} />
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
        size="l"
        visible={blockModal}
        onDismiss={() => setBlockModal(false)}
        alignment="center"
      >
        <CModalHeader onDismiss={() => setBlockModal(false)}>
          <CModalTitle>Preview New Post</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CareerPreview
            post={dataForm}
            experience={experience}
            requirement={speciality}
            description={[]}
            resumeURL={resumeURL}
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
                    <h1>{add ? 'Ready to post' : 'Want to edit'} a recommendation?</h1>
                    <p className="text-medium-emphasis">
                      {add ? 'Create' : 'Edit'} your recommendation
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-user" />
                      </CInputGroupText>
                      <CFormSelect
                        className={requiredStyle.type}
                        data-for="type"
                        data-tip="Want to apply for intern or full-time?"
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
                        <CIcon icon="cil-user" />
                      </CInputGroupText>
                      <CFormControl
                        className={requiredStyle.name}
                        data-for="name"
                        data-tip="Enter your name"
                        placeholder="Your Name*"
                        value={dataForm.name}
                        name="name"
                        onChange={handleInputChange}
                      />
                      <ReactTooltip id="name" place="top" type="dark" effect="solid" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-braille" />
                      </CInputGroupText>
                      <CFormControl
                        className={requiredStyle.desireWorkType}
                        data-for="workType"
                        data-tip="What's your desired work?"
                        placeholder="Desired Job Position*"
                        value={dataForm.desireWorkType}
                        name="desireWorkType"
                        onChange={handleInputChange}
                      />
                      <ReactTooltip id="workType" place="top" type="dark" effect="solid" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon="cil-phone" />
                      </CInputGroupText>
                      <CFormControl
                        data-for="phone"
                        data-tip="Let others can call you!"
                        placeholder="Your Phone"
                        value={dataForm.contact}
                        name="contact"
                        onChange={handleInputChange}
                      />
                      <ReactTooltip id="phone" place="top" type="dark" effect="solid" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon="cil-send" />
                      </CInputGroupText>
                      <CFormControl
                        data-for="mail"
                        data-tip="Let others can email you!"
                        placeholder="Your Email"
                        value={dataForm.email}
                        name="email"
                        onChange={handleInputChange}
                      />
                      <ReactTooltip id="mail" place="top" type="dark" effect="solid" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-education" />
                      </CInputGroupText>
                      <CFormControl
                        data-for="diploma"
                        data-tip="Enter your highest education level"
                        placeholder="Your Highest Diploma"
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
                            data-tip="Enter your special experience"
                            placeholder="Your Special Experiences"
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
                    {speciality.map((req, index) => {
                      return (
                        <CInputGroup className="mb-3" key={index}>
                          <CInputGroupText>
                            <CIcon icon="cil-thumb-up" />
                          </CInputGroupText>
                          <CFormControl
                            data-for="specialty"
                            data-tip="Enter your strength or other specialty"
                            placeholder="Your Strengths Or Other Specialty"
                            name="speciality"
                            value={req}
                            onChange={(e) => handleInputArray(e, index)}
                          />
                          <ReactTooltip id="specialty" place="top" type="dark" effect="solid" />
                          <CButton
                            type="button"
                            name="speciality"
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
                        name="speciality"
                        className="form-add"
                        onClick={addArray}
                      >
                        +
                      </CButton>
                    </CInputGroup>
                    <h5 className="text-medium-emphasis">Put a picture of you!</h5>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-image" />
                      </CInputGroupText>
                      <CFormControl
                        type="file"
                        onChange={handleChangeImage}
                        onClick={(e) => (e.target.value = null)}
                        accept="image/*"
                      ></CFormControl>
                    </CInputGroup>
                    <h5 className="text-medium-emphasis">
                      Please upload your resume in pdf format
                    </h5>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-address-book" />
                      </CInputGroupText>
                      <CFormControl
                        placeholder="Your Resume"
                        onChange={handleResumeChange}
                        name="resume"
                        type="file"
                        accept=".pdf"
                      />
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
RecommendationForm.propTypes = {
  data: PropTypes.object,
}
export default RecommendationForm
