/* eslint-disable prettier/prettier */
import React, { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
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
import CIcon from '@coreui/icons-react'
import JoditEditor from 'jodit-react'
import parser from 'html-react-parser'
const Announce = () => {
  const history = useHistory()
  const editor = useRef(null)
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  }
  const add = useParams().id
  const [blockModal, setBlockModal] = useState(false)
  const [ann, setAnn] = useState({ title: '', body: '', date: '' })
  const getAnnounce = () => {
    if (add !== 'add') {
      axios
        .get('/api/getAnnouncement', { params: { _id: add } })
        .then((res) => {
          setAnn(res.data)
        })
        .catch((err) => {
          err.response.data.description && alert('錯誤\n' + err.response.data.description)
        })
    }
  }
  const handleSubmit = (e) => {
    if (add === 'add') {
      axios
        .post('api/addAnnouncement', { ...ann, date: new Date().toISOString().substring(0, 10) })
        .then((res) => {
          history.go(-1)
        })
        .catch((err) => {
          err.response.data.description && alert('錯誤\n' + err.response.data.description)
        })
    } else {
      axios
        .patch('/api/editAnnouncement', { ...ann, _id: add })
        .then((res) => {
          history.go(-1)
        })
        .catch((err) => {
          err.response.data.description && alert('錯誤\n' + err.response.data.description)
        })
    }
  }
  useEffect(() => {
    getAnnounce()
  }, [])
  return (
    <>
      <CModal visible={blockModal} onDismiss={() => setBlockModal(false)} alignment="center">
        <CModalHeader onDismiss={() => setBlockModal(false)}>
          <CModalTitle>{ann.title}</CModalTitle>
        </CModalHeader>
        <CModalBody>{parser(ann.body)}</CModalBody>
        <CModalFooter>
          <CButton color="warning" onClick={() => setBlockModal(false)}>
            Back
          </CButton>
          <CButton color="dark" onClick={handleSubmit}>
            OK
          </CButton>
        </CModalFooter>
      </CModal>
      <div className="d-flex flex-row align-items-center text-color-black auth-announce">
        <CContainer>
          <CCard className="mx-4">
            <CCardBody className="p-4">
              <CForm>
                <h1>{add === 'add' ? 'Ready to post' : 'Want to edit'} an announcement?</h1>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-layers" />
                  </CInputGroupText>
                  <CFormControl
                    placeholder="Title*"
                    value={ann.title}
                    name="title"
                    onChange={(e) => setAnn({ ...ann, title: e.target.value })}
                  />
                </CInputGroup>
                <div className="mb-3 mw-100">
                  <JoditEditor
                    name="description"
                    ref={editor}
                    value={ann.body}
                    config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={(newContent) => setAnn({ ...ann, body: newContent })} // preferred to use only this option to update the content for performance reasons
                  />
                </div>
                <CRow className="justify-content-center mt-3">
                  <div className="d-flex d-flex justify-content-center">
                    <CButton color="dark" onClick={() => setBlockModal(true)}>
                      Preview
                    </CButton>
                  </div>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CContainer>
      </div>
    </>
  )
}

export default Announce
