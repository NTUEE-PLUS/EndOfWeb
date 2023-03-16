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
const Page2 = ({
  dataForm,
  body,
  handleInputArray,
  handleAddArray,
  handleDeleteArray,
  handleAddSection,
  handleDeleteBigsection,
  handleSubtitleChange,
  handleSubsectionChange,
}) => {
  return (
    <div>
      {/* 2 */}
      {body.map((body, bodyIndex) => {
        return (
          <CInputGroup className="mb-3" key={bodyIndex}>
            <CInputGroupText>
              <i class="bi bi-megaphone-fill"></i>
            </CInputGroupText>
            <CFormControl
              data-for="bigtitle"
              data-tip="文章內容"
              placeholder="Bigtitle*"
              name="bigtitle"
              value={body.bigtitle}
              onChange={(e) => handleInputArray(e, bodyIndex)}
            />
            <ReactTooltip id="bigtitle" place="top" type="dark" effect="solid" />
            <CButton
              type="button"
              name="body"
              onClick={(e) => handleDeleteArray(e, bodyIndex)}
              className="btn-delete"
            >
              x
            </CButton>
            <CButton type="button" name="body" className="btn-add" onClick={handleAddArray}>
              +
            </CButton>
            {body.bigsections.map((section, sectionIndex) => {
              return (
                <CInputGroup key={sectionIndex} className="my-2">
                  <CInputGroupText>
                    <i className="bi bi-layout-text-window-reverse"></i>
                  </CInputGroupText>
                  <CFormControl
                    data-for="subtitle"
                    data-tip="子段落標題"
                    placeholder="Subtitle*"
                    name="subtitle"
                    value={section.subtitle}
                    onChange={(e) => handleSubtitleChange(e, bodyIndex, sectionIndex)}
                  />
                  <ReactTooltip id="subtitle" place="top" type="dark" effect="solid" />

                  <CButton
                    type="button"
                    name="bigsection"
                    onClick={(e) => handleDeleteBigsection(bodyIndex, sectionIndex)}
                    className="btn-delete"
                  >
                    x
                  </CButton>
                  <CButton
                    type="button"
                    name="bigsection"
                    onClick={(e) => handleAddSection(bodyIndex)}
                    className="btn-add"
                  >
                    +
                  </CButton>
                  <textarea
                    data-for="subsection"
                    data-tip="子段落"
                    placeholder="Subsection*"
                    name="subsection"
                    value={section.subsection}
                    onChange={(e) => handleSubsectionChange(e, bodyIndex, sectionIndex)}
                    cols="91"
                    rows="7"
                  />
                  <ReactTooltip id="subsection" place="top" type="dark" effect="solid" />
                </CInputGroup>
              )
            })}
          </CInputGroup>
        )
      })}
    </div>
  )
}
export default Page2
