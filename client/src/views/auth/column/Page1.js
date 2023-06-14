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
} from '@coreui/react'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
const Page1 = ({
  dataForm,
  exp,
  edu,
  title,
  intro,
  handleInputChange,
  handleInputArray,
  handleAddArray,
  handleDeleteArray,
}) => {
  return (
    <div>
      {title.map((t, index) => {
        return (
          <CInputGroup className="mb-3" key={index}>
            <CInputGroupText>
              <i className="bi bi-briefcase-fill"></i>
            </CInputGroupText>
            <CFormControl
              data-for="title"
              data-tip="從事過的職位"
              placeholder="title*"
              name="title"
              value={t}
              onChange={(e) => handleInputArray(e, index)}
            />
            <ReactTooltip id="title" place="top" type="dark" effect="solid" />
            <CButton
              type="button"
              name="title"
              onClick={(e) => handleDeleteArray(e, index)}
              className="btn-delete"
            >
              x
            </CButton>
            <CButton type="button" name="title" className="btn-add" onClick={handleAddArray}>
              +
            </CButton>
          </CInputGroup>
        )
      })}
      {/* 1-1 Name */}
      <CInputGroup className="mb-3">
        <CInputGroupText>
          <CIcon icon="cil-user" />
        </CInputGroupText>
        <CFormControl
          data-for="name"
          data-tip="xxx"
          placeholder="Name*"
          value={dataForm.name}
          name="name"
          onChange={handleInputChange}
        />
        <ReactTooltip id="name" place="top" type="dark" effect="solid" />
      </CInputGroup>
      {/* 1-2  experience*/}
      <CInputGroup className="mb-3">
        <CInputGroupText>
          <i className="bi bi-ui-radios"></i>
        </CInputGroupText>
        <CFormControl
          data-for="experience"
          data-tip="個人經歷或職稱頭銜"
          placeholder="Experience*"
          value={dataForm.experience}
          name="experience"
          onChange={handleInputChange}
        />
        <ReactTooltip id="experience" place="top" type="dark" effect="solid" />
      </CInputGroup>
      {/* 1-3 */}
      {exp.map((_, index) => {
        return (
          <CInputGroup className="mb-3" key={index}>
            <CInputGroupText>
              <i className="bi bi-briefcase-fill"></i>
            </CInputGroupText>
            <CFormControl
              data-for="exp"
              data-tip="從事過的職位"
              placeholder="Job*"
              name="exp"
              value={exp[index]}
              onChange={(e) => handleInputArray(e, index)}
            />
            <ReactTooltip id="exp" place="top" type="dark" effect="solid" />
            <CButton
              type="button"
              name="exp"
              onClick={(e) => handleDeleteArray(e, index)}
              className="btn-delete"
            >
              x
            </CButton>
            <CButton type="button" name="exp" className="btn-add" onClick={handleAddArray}>
              +
            </CButton>
          </CInputGroup>
        )
      })}

      {/* 1-4 */}
      {edu.map((t, index) => {
        return (
          <CInputGroup className="mb-3" key={index}>
            <CInputGroupText>
              <CIcon icon="cilEducation" />
            </CInputGroupText>
            <CFormControl
              data-for="edu"
              data-tip="學歷[學士:校系(畢業年分),碩士:校系(畢業年分),博士:校系(畢業年分)]"
              placeholder="Education*"
              name="edu"
              value={t}
              onChange={(e) => handleInputArray(e, index)}
            />
            <ReactTooltip id="edu" place="top" type="dark" effect="solid" />
            <CButton
              type="button"
              name="edu"
              onClick={(e) => handleDeleteArray(e, index)}
              className="btn-delete"
            >
              x
            </CButton>
            <CButton type="button" name="edu" className="btn-add" onClick={handleAddArray}>
              +
            </CButton>
          </CInputGroup>
        )
      })}
      {/* 1-5 */}
      <CInputGroup className="mb-3">
        <CInputGroupText>
          <CIcon icon="cil-lightbulb" />
        </CInputGroupText>
        <CFormControl
          data-for="hashtags"
          data-tip="文章類別，訪問者姓名、級別、工作、相關組織與企業"
          placeholder="Hashtag*"
          name="hashtags"
          onChange={handleInputChange}
        />
        <ReactTooltip id="hashtags" place="top" type="dark" effect="solid" />
      </CInputGroup>

      {/* 1-6 */}
      {intro.map((ii, index) => {
        return (
          <CInputGroup className="mb-3" key={index}>
            <CInputGroupText>
              <i className="bi bi-file-richtext"></i>
            </CInputGroupText>
            <textarea
              data-for="intro"
              data-tip="簡介(1個element是一段)"
              placeholder="introduction*"
              name="intro"
              value={ii}
              cols="75"
              rows="7"
              onChange={(e) => handleInputArray(e, index)}
            />
            <ReactTooltip id="intro" place="top" type="dark" effect="solid" />
            <CButton
              type="button"
              name="intro"
              onClick={(e) => handleDeleteArray(e, index)}
              className="btn-delete"
            >
              x
            </CButton>
            <CButton type="button" name="intro" className="btn-add" onClick={handleAddArray}>
              +
            </CButton>
          </CInputGroup>
        )
      })}
    </div>
  )
}

export default Page1
