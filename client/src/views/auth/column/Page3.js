import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCareer, clearCroppedDataUrl, clearCroppedFile } from '../../../slices/careerSlice'
import ColumnImageEditor from './ColumnImageEditor'
import ColumnPreview from './ColumnPreview'
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

const Page3 = ({
  dataForm,
  annotation,
  anno,
  handleInputChange,
  handleAnnotationChange,
  handleInputArray,
  handleAddArray,
  handleDeleteArray,
  handleChangeImage,
}) => {
  return (
    <div>
      {/* 3-1 */}
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
          type="date"
          onChange={handleInputChange}
        />
        <ReactTooltip id="date" place="top" type="dark" effect="solid" />
      </CInputGroup>
      {/* 3-2 */}
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
              className="btn-delete"
            >
              x
            </CButton>
            <CButton type="button" name="annotation" className="btn-add" onClick={handleAddArray}>
              +
            </CButton>
          </CInputGroup>
        )
      })}

      {/* 3-2 */}
      {anno.map((_, index) => {
        return (
          <CInputGroup className="mb-3" key={index}>
            <CInputGroupText>
              <i class="bi bi-people-fill"></i>
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
            {/* <CButton
              type="button"
              name="anno"
              onClick={(e) => handleDeleteArray(e, index)}
              className="btn-delete"
            >
              x
            </CButton>
            <CButton type="button" name="anno" className="btn-add" onClick={handleAddArray}>
              +
            </CButton> */}
          </CInputGroup>
        )
      })}

      {/* 3-3 */}
      <CInputGroup className="mb-3">
        <CInputGroupText>
          <CIcon icon="cil-image" />
        </CInputGroupText>
        <CFormControl
          data-for="image"
          data-tip="專欄照片 (請上傳 3:2 or 1500×1000px 之照片)"
          id="formFile"
          type="file"
          onChange={handleChangeImage}
          onClick={(e) => (e.target.value = null)}
        ></CFormControl>
        <ReactTooltip id="image" place="top" type="dark" effect="solid" />
      </CInputGroup>
    </div>
  )
}
export default Page3
