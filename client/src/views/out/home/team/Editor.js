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

const Editor = ({ visible, setVisible, dataForm, originData, setDataForm, refetch }) => {
  const [imgPreview, setImgPreview] = useState(dataForm.slice().fill(false))
  const [pending, setPending] = useState(false)
  const formTemplate = {
    name: '',
    job: '',
    img: null,
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
  const handleInputChange = (e, index) => {
    setDataForm((dataForm) =>
      dataForm.map((person, i) =>
        index === i ? { ...person, [e.target.name]: e.target.value } : person,
      ),
    )
  }
  const deletePeople = (e, index) => {
    setDataForm(dataForm.filter((v, i) => i !== index))
  }
  const addPeople = (e) => {
    setDataForm([...dataForm, formTemplate])
  }
  const handleChangeImage = (e, index) => {
    let reader = new FileReader()
    let file = e.target.files[0]
    reader.onloadend = () => {
      setDataForm((dataForm) => {
        dataForm[index].img = reader.result
        return dataForm
      })
    }
    reader.readAsDataURL(file)
  }
  const handleSubmit = async () => {
    setPending(true)
    let pList = []
    dataForm.forEach((person, index) => {
      if (
        !originData.some(
          ({ name, job, img, index: originIndex, _id }) =>
            index === originIndex &&
            name === person.name &&
            job === person.job &&
            img === person.img &&
            _id === person._id,
        )
      ) {
        pList.push(
          (async () => {
            const data = new FormData()
            data.append('name', person.name)
            data.append('job', person.job)
            data.append('index', index)
            if (person._id) data.append('_id', person._id)

            const blob = await fetch(person.img).then((res) => res.blob())
            data.append('img', blob, '.' + blob.type.replace('image/', ''))
            const config = { 'content-type': 'multipart/form-data' }
            if (!person._id) {
              console.log(`add data{title: ${data.get('name')}, job: ${data.get('job')}}`)

              await axios.post('/api/teamData', data, config)
            } else {
              console.log(
                `update data{title: ${data.get('name')}, job: ${data.get('job')}, _id:${data.get(
                  '_id',
                )}`,
              )

              await axios.patch('/api/teamData', data, config)
            }
          })(),
        )
      }
    })
    originData.forEach(({ _id }) => {
      if (!dataForm.some((person) => _id === person._id)) {
        console.log(`delete data{_id: ${_id}}`)

        pList.push(axios.delete('/api/teamData', { params: { _id } }))
      }
    })
    await Promise.all(pList)
      .then(() => alert('已更新'))
      .catch((err) => {
        err.response.data.description && alert('錯誤\n' + err.response.data.description)
      })
    refetch(true)
    setPending(false)
    setVisible(false)
  }

  return (
    <>
      <CModal backdrop={false} visible={visible} alignment="center" scrollable>
        <CModalHeader onDismiss={() => setVisible(false)} aria-disabled={pending}>
          <CModalTitle>{'TeamData Editor'} </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            {dataForm.map((person, index) => {
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
                      onChange={(e) => handleInputChange(e, index)}
                      disabled={pending}
                    />
                    <ReactTooltip id="name" place="top" type="dark" effect="solid" />
                    <CButton type="button" name="name" onClick={(e) => deletePeople(e, index)}>
                      x
                    </CButton>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormControl
                      data-for="job"
                      data-tip="Add job title Here"
                      placeholder="Job Title*"
                      value={person.job}
                      name="job"
                      onChange={(e) => handleInputChange(e, index)}
                      disabled={pending}
                    />
                    <ReactTooltip id="job" place="top" type="dark" effect="solid" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText className={dataForm[index].img ? 'bg-info' : ''}>
                      <CIcon
                        icon="cil-image"
                        onMouseEnter={() => handleEnterImgIcon(index)}
                        onMouseLeave={() => handleLeaveImgIcon(index)}
                      />
                      <div
                        style={{
                          top: index === dataForm.length - 1 ? '-330%' : '-250%',
                          left: '30%',
                          maxWidth: '50%',
                          zIndex: 5,
                        }}
                        className={'position-absolute '.concat(
                          imgPreview[index] && dataForm[index].img ? 'visible' : 'invisible',
                        )}
                      >
                        <CImage fluid src={dataForm[index].img} alt="img preview" />
                      </div>
                    </CInputGroupText>
                    <CFormControl
                      data-for="image"
                      data-tip="Put a picture"
                      id="formFile"
                      type="file"
                      onChange={(e) => handleChangeImage(e, index)}
                      onClick={(e) => {
                        e.target.value = null
                      }}
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
          <CButton onClick={handleSubmit} color="warning" disabled={pending}>
            {pending ? 'saving' : 'save'}
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
  dataForm: PropTypes.array,
  originData: PropTypes.array,
  setDataForm: PropTypes.func,
  refetch: PropTypes.func,
}
