import CIcon from '@coreui/icons-react'
import {
  CButton,
  CForm,
  CFormControl,
  CImage,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import axios from 'axios'
import PropTypes from 'prop-types'
import React, { Fragment, useRef, useState } from 'react'
import ReactTooltip from 'react-tooltip'

const Editor = ({ visible, setVisible, add, dataForm, setDataForm, refetch }) => {
  const [imgPreview, setImgPreview] = useState(new Array(dataForm.people.length).fill(false))
  const [pending, setPending] = useState(false)
  const [validated, setValidated] = useState(false)
  const formRef = useRef(null)
  const preventDefaultAndFocus = (e) => {
    e.preventDefault()
    e.target.focus()
  }
  const handleEnterImgIcon = (index) => {
    const result = imgPreview.slice()
    result[index] = true
    setImgPreview(result)
  }
  const handleLeaveImgIcon = (index) => {
    const result = imgPreview.slice()
    result[index] = false
    setImgPreview(result)
  }
  const handleInputChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value })
  }
  const handlePeopleChange = (e, index) => {
    setDataForm((dataForm) => ({
      ...dataForm,
      people: dataForm.people.map((person, i) => {
        if (i !== index) return person
        return { ...person, name: e.target.value }
      }),
    }))
  }
  const handlePeopleDelete = (e, index) => {
    setDataForm({ ...dataForm, people: dataForm.people.filter((v, i) => i !== index) })
  }
  const addPeople = (e) => {
    setDataForm({ ...dataForm, people: [...dataForm.people, { name: '', img: null }] })
  }
  const handleChangeImage = (e, index) => {
    let reader = new FileReader()
    let file = e.target.files[0]
    reader.onloadend = () => {
      setDataForm((dataForm) => {
        dataForm.people[index].img = reader.result
        return dataForm
      })
    }
    reader.readAsDataURL(file)
  }
  const handleSubmit = async () => {
    setValidated(true) // display the validation message & style
    // prevent the form from submitting if the form is invalid
    if (!formRef.current.checkValidity()) return

    setPending(true)
    const data = new FormData()
    data.append('grade', dataForm.grade)
    data.append('title', dataForm.title)
    if (!add) data.append('_id', dataForm._id)
    const pList = dataForm.people.map(async ({ name, img }) => {
      const res = await fetch(img)
      return { name, blob: await res.blob() }
    })
    // data.append('file', new Blob([dataForm.people[0].img], { type: 'image/png' }))
    await Promise.all(pList).then((arr) =>
      arr.forEach(({ name, blob }) =>
        data.append('peopleImages', blob, `${name}.${blob.type.replace('image/', '')}`),
      ),
    )

    const config = { 'content-type': 'multipart/form-data' }
    if (add) {
      await axios
        .post('/api/history', data, config)
        .then(() => {
          alert('已新增')
        })
        .catch((err) => {
          err.response.data.description && alert('錯誤\n' + err.response.data.description)
        })
    } else {
      await axios
        .patch('/api/history', data, config)
        .then(() => {
          alert('已更新')
        })
        .catch((err) => {
          err.response.data.description && alert('錯誤\n' + err.response.data.description)
        })
    }
    setPending(false)
    setVisible(false)
    setValidated(false)
    refetch()
  }

  return (
    <>
      <CModal backdrop={false} visible={visible} alignment="center">
        <CModalHeader onDismiss={() => setVisible(false)} aria-disabled={pending}>
          <CModalTitle>{add ? 'Add a year' : 'Edit this year'} </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm ref={formRef} validated={validated} noValidate>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon="cil-calendar" />
              </CInputGroupText>
              <CFormControl
                required
                pattern="B\d{2}"
                type="text"
                name="grade"
                data-for="grade" // for react-tooltip
                data-tip="Grade(Bxx)" // the hovering texts
                placeholder="Grade*"
                value={dataForm.grade}
                onChange={handleInputChange}
                disabled={pending}
                className="form-control"
                onInvalid={preventDefaultAndFocus}
              />
              <ReactTooltip id="grade" place="top" type="dark" effect="solid" />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon="cil-user" />
              </CInputGroupText>
              <CFormControl
                required
                type="text"
                name="title"
                placeholder="Title*"
                data-for="title"
                data-tip="Add Title Here"
                value={dataForm.title}
                onChange={handleInputChange}
                disabled={pending}
                className="form-control"
                onInvalid={preventDefaultAndFocus}
              />
              <ReactTooltip id="title" place="top" type="dark" effect="solid" />
            </CInputGroup>
            {dataForm.people.map((person, index) => {
              return (
                <Fragment key={index}>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormControl
                      type="text"
                      required
                      className="form-control"
                      data-for="name" // for react-tooltip
                      data-tip="Enter the name" // the hovering texts
                      placeholder="Name*"
                      value={person.name}
                      onChange={(e) => handlePeopleChange(e, index)}
                      disabled={pending}
                      onInvalid={preventDefaultAndFocus}
                    />
                    <ReactTooltip id="name" place="top" type="dark" effect="solid" />
                    <CButton
                      type="button"
                      name="name"
                      onClick={(e) => handlePeopleDelete(e, index)}
                      disabled={dataForm.people.length === 1 || pending}
                    >
                      x
                    </CButton>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText className={dataForm.people[index].img ? 'bg-info' : ''}>
                      <CIcon
                        icon="cil-image"
                        onMouseEnter={() => handleEnterImgIcon(index)}
                        onMouseLeave={() => handleLeaveImgIcon(index)}
                      />
                      <div
                        className="position-absolute form-floating-img-container"
                        hidden={!(imgPreview[index] && dataForm.people[index].img)}
                      >
                        <CImage fluid src={dataForm.people[index].img} alt="img preview" />
                      </div>
                    </CInputGroupText>
                    <CFormControl
                      type="file"
                      id="formFile"
                      onChange={(e) => handleChangeImage(e, index)}
                      onClick={(e) => (e.target.value = null)}
                      disabled={pending}
                      className="form-control"
                      data-for="image"
                      data-tip="Put a picture"
                      accept="image/png, image/jpeg, image/jpg, image/webp, image/avif"
                      required={dataForm.people[index].img === null}
                      onInvalid={preventDefaultAndFocus}
                    />
                    <ReactTooltip id="image" place="top" type="dark" effect="solid" />
                  </CInputGroup>
                </Fragment>
              )
            })}
            <CInputGroup className="mb-4 d-flex flex-row">
              <CInputGroupText>
                <CIcon icon="cil-user" />
              </CInputGroupText>
              <CButton
                type="button"
                name="person"
                className="form-add form-btn-full-width"
                onClick={addPeople}
                disabled={pending}
              >
                +
              </CButton>
            </CInputGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton onClick={() => setVisible(false)} color="dark" disabled={pending}>
            close
          </CButton>
          <CButton onClick={handleSubmit} color={add ? 'success' : 'warning'} disabled={pending}>
            {pending ? (add ? 'saving' : 'updating') : add ? 'save' : 'update'}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Editor
Editor.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  add: PropTypes.bool,
  dataForm: PropTypes.object,
  setDataForm: PropTypes.func,
  refetch: PropTypes.func,
}
