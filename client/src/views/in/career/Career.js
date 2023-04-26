/* eslint-disable prettier/prettier */
import React from 'react'
import { Link } from 'react-router-dom'
import { CCol, CRow, CContainer, CImage } from '@coreui/react'
import { Recruitment_image, Recommendation_image } from './index'

const Career = () => {
  return (
    <div className="d-flex flex-row align-items-center career min-vh-100">
      <CContainer className="align-items-center">
        <CRow className="justify-content-around d-flex">
          <CCol md="4" sm="8">
            <Link className="d-flex justify-content-center" to="/recruitment">
              <CImage
                src={Recruitment_image}
                alt="Register by Account"
                className="career_img img-fluid"
              />
            </Link>
            <h3 className="text-light text-center mt-4">來看看各家公司的內推機會！</h3>
            <h3 className="text-light text-center mt-4">
              或
              <Link to="/add_recruitment" className="text-warning">
                <u>新增內推機會！</u>
              </Link>
            </h3>
          </CCol>
          <CCol md="4" sm="8">
            <Link className="d-flex justify-content-center" to="/recommendation">
              <CImage
                src={Recommendation_image}
                alt="Register by Account"
                className="career_img img-fluid"
              />
            </Link>
            <h3 className="text-light text-center mt-4">電機系人才都在這！</h3>
            <h3 className="text-light text-center mt-4">
              或
              <Link to="/own_recommendation" className="text-warning">
                <u>上傳自己的簡歷</u>
              </Link>
              ！
            </h3>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Career
