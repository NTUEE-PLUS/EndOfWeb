import React from 'react'
import { SiliconMatchmaker } from '.'
import { CContainer, CRow, CCol } from '@coreui/react'

const Sponsors = () => {
  return (
    <div id="sponsors" className="section">
      <CContainer data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
        <CRow>
          <div className="section-title">
            <h2>List of sponsors</h2>
          </div>
          <ul>
            <li className="h3 d-flex align-items-center mx-5">
              {'\u2022 '}
              <img
                src={SiliconMatchmaker}
                alt="Silicon Valley Taiwanese Matchmaker"
                className="img-fluid bg-white mx-3"
                style={{ maxHeight: '5rem' }}
              />
              <p className="mb-0">Silicon Valley Taiwanese Matchmaker</p>
            </li>
          </ul>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Sponsors
