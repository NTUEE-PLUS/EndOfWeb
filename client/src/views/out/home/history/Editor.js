import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CModalTitle,
  CButton,
  CForm,
  CInputGroup,
  CFormControl,
  CInputGroupText,
  CImage,
} from '@coreui/react'
import ReactTooltip from 'react-tooltip'
import CIcon from '@coreui/icons-react'
import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

const Editor = ({ visible, setVisible, add, dataForm, setDataForm, refetch }) => {
  const [imgPreview, setImgPreview] = useState(dataForm.people.slice().fill(false))
  const [pending, setPending] = useState(false)
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
      console.log('updating id', data.get('_id'))
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
    refetch()
  }

  return (
    <>
      <CModal backdrop={false} visible={visible} alignment="center">
        <CModalHeader onDismiss={() => setVisible(false)} aria-disabled={pending}>
          <CModalTitle>{add ? 'Add a year' : 'Edit this year'} </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon="cil-calendar" />
              </CInputGroupText>
              <CFormControl
                data-for="grade"
                data-tip="Grade(Bxx)"
                placeholder="Grade*"
                value={dataForm.grade}
                name="grade"
                onChange={handleInputChange}
                disabled={pending}
              />
              <ReactTooltip id="grade" place="top" type="dark" effect="solid" />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon="cil-user" />
              </CInputGroupText>
              <CFormControl
                data-for="title"
                data-tip="Add Title Here"
                placeholder="Title*"
                value={dataForm.title}
                name="title"
                onChange={handleInputChange}
                disabled={pending}
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
                      data-for="name"
                      data-tip="Enter the name"
                      placeholder="Name*"
                      name="name"
                      value={person.name}
                      onChange={(e) => handlePeopleChange(e, index)}
                      disabled={pending}
                    />
                    <ReactTooltip id="name" place="top" type="dark" effect="solid" />
                    <CButton
                      type="button"
                      name="name"
                      onClick={(e) => handlePeopleDelete(e, index)}
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
                        style={{
                          top: '-250%',
                          left: '30%',
                          maxWidth: '50%',
                          zIndex: 5,
                        }}
                        className={'position-absolute '.concat(
                          imgPreview[index] && dataForm.people[index].img ? 'visible' : 'invisible',
                        )}
                      >
                        <CImage fluid src={dataForm.people[index].img} alt="img preview" />
                      </div>
                    </CInputGroupText>
                    <CFormControl
                      data-for="image"
                      data-tip="Put a picture"
                      id="formFile"
                      type="file"
                      onChange={(e) => handleChangeImage(e, index)}
                      onClick={(e) => (e.target.value = null)}
                      disabled={pending}
                    ></CFormControl>
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
                className="form-add"
                onClick={addPeople}
                style={{ width: '91.2%' }}
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
