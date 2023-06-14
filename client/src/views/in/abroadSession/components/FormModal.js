import React, { useState, Fragment } from 'react'
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
import PropTypes from 'prop-types'
import axios from 'axios'

const FormModal = ({ visible, setVisible, data, setData, refresh }) => {
  const [pending, setPending] = useState(false)
  const [imgPreview, setImgPreview] = useState(false)

  const handleEnterImgIcon = () => setImgPreview(true)
  const handleLeaveImgIcon = () => setImgPreview(false)

  const checkFormData = (data) => {
    const YTlinkRegExp =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)(?<videoId>[a-zA-Z0-9_-]{11})/
    const required = ['title', 'intro', 'YTlink', 'img']

    const lack = required.filter((v) => !data[v])
    if (lack.length) {
      alert(`${lack.join(', ')} is required`)
      return false
    }
    if (!data.YTlink.match(YTlinkRegExp)) {
      alert(`The YTlink "${data.YTlink}" doesn't match the required format`)
      return false
    }

    return true
  }

  const isOtherLinks = (name) => ['link', 'desc'].includes(name)
  const handleInputChange = (e, index) => {
    if (isOtherLinks(e.target.name)) {
      return setData({
        ...data,
        otherLinks: data.otherLinks.map((v, i) =>
          i === index ? { ...v, [e.target.name]: e.target.value } : v,
        ),
      })
    }

    setData({ ...data, [e.target.name]: e.target.value, otherLinks: data.otherLinks.slice() })
  }
  const deleteLink = (e, index) => {
    setData({ ...data, otherLinks: data.otherLinks.filter((v, i) => i !== index) })
  }
  const addLink = (e) => {
    setData({ ...data, otherLinks: [...data.otherLinks, { link: '', desc: '' }] })
  }
  const handleChangeImage = (e) => {
    let reader = new FileReader()
    let file = e.target.files[0]
    reader.onloadend = () => {
      setData((data) => {
        data.img = reader.result
        return data
      })
    }
    reader.readAsDataURL(file)
  }
  const handleSubmit = async () => {
    if (!checkFormData(data)) return
    setPending(true)
    const form = new FormData()
    form.append('title', data.title)
    form.append('intro', data.intro)
    form.append('YTlink', data.YTlink)
    const blob = await fetch(data.img).then((res) => res.blob())
    form.append('img', blob, '.' + blob.type.replace('image/', ''))
    const config = { 'content-type': 'multipart/form-data' }
    if (data.otherLinks.length) {
      data.otherLinks.forEach((v) => form.append('otherLinks[]', v.link))
      data.otherLinks.forEach((v) => form.append('otherLinksDesc[]', v.desc))
    } else {
      // ? Add a default url(NTUEE+ website) when there's no URL?
      form.append('otherLinks[]', 'https://eeplus.ntuee.org/')
      form.append('otherLinksDesc[]', 'WebSite of NTUEE+')
    }
    if (!data._id) {
      await axios
        .post('/api/addAbroadSharing', form, config)
        .then(() => alert('已新增'))
        .then(() => refresh())
        .catch((err) => {
          err.response.data.description && alert('錯誤\n' + err.response.data.description)
        })
    } else {
      form.append('_id', data._id)
      await axios
        .patch('/api/updateAbroadSharing', form, { ...config })
        .then(() => alert('已更新'))
        .then(() => refresh())
        .catch((err) => {
          err.response.data.description && alert('錯誤\n' + err.response.data.description)
        })
    }
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
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon="cil-user" />
              </CInputGroupText>
              <CFormControl
                data-for="title"
                data-tip="Enter the title"
                placeholder="Title*"
                name="title"
                value={data.title}
                onChange={(e) => handleInputChange(e)}
                disabled={pending}
              />
              <ReactTooltip id="title" place="top" type="dark" effect="solid" />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon="cil-user" />
              </CInputGroupText>
              <CFormControl
                data-for="intro"
                data-tip="Enter the intro"
                placeholder="Intro*"
                name="intro"
                value={data.intro}
                onChange={(e) => handleInputChange(e)}
                disabled={pending}
              />
              <ReactTooltip id="intro" place="top" type="dark" effect="solid" />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon="cil-user" />
              </CInputGroupText>
              <CFormControl
                data-for="YT-link"
                data-tip="The youtube link of the video"
                placeholder="YT-link*"
                name="YTlink"
                value={data.YTlink}
                onChange={(e) => handleInputChange(e)}
                disabled={pending}
              />
              <ReactTooltip id="YTlink" place="top" type="dark" effect="solid" />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText className={data.img ? 'bg-info' : ''}>
                <CIcon
                  icon="cil-image"
                  onMouseEnter={() => handleEnterImgIcon()}
                  onMouseLeave={() => handleLeaveImgIcon()}
                />
                <div
                  style={{
                    top: '-250%',
                    left: '30%',
                    maxWidth: '50%',
                    zIndex: 5,
                  }}
                  className={'position-absolute '.concat(
                    imgPreview && data.img ? 'visible' : 'invisible',
                  )}
                >
                  <CImage fluid src={data.img} alt="img preview" />
                </div>
              </CInputGroupText>
              <CFormControl
                data-for="image"
                data-tip="Put a picture"
                id="formFile"
                type="file"
                onChange={(e) => handleChangeImage(e)}
                onClick={(e) => {
                  e.target.value = null
                }}
                disabled={pending}
              ></CFormControl>
              <ReactTooltip id="image" place="top" type="dark" effect="solid" />
            </CInputGroup>
            {data.otherLinks.map(({ desc, link }, index) => {
              return (
                <Fragment key={index}>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormControl
                      data-for="otherLinks"
                      data-tip="Enter other links"
                      placeholder="Other Link*"
                      name="link"
                      value={link}
                      onChange={(e) => handleInputChange(e, index)}
                      disabled={pending}
                    />
                    <ReactTooltip id="name" place="top" type="dark" effect="solid" />
                    <CButton type="button" name="link" onClick={(e) => deleteLink(e, index)}>
                      x
                    </CButton>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormControl
                      data-for="description"
                      data-tip="Add description for this link"
                      placeholder="Description"
                      value={desc}
                      name="desc"
                      onChange={(e) => handleInputChange(e, index)}
                      disabled={pending}
                    />
                    <ReactTooltip id="desc" place="top" type="dark" effect="solid" />
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
                name="link"
                className="form-add"
                onClick={addLink}
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

FormModal.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  data: PropTypes.object,
  setData: PropTypes.func,
  refresh: PropTypes.func,
}

export default FormModal
