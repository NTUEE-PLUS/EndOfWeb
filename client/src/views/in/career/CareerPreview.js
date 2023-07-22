import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CButton } from '@coreui/react'
import { eesa, FormattedText } from './index'
const CareerPreview = ({ post, experience, requirement, resumeURL }) => {
  const [isExpand, setIsExpand] = useState(false)
  const [previewURL, setPreviewURL] = useState(post.file)

  const handleDownload = () => {
    fetch(resumeURL)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `resume.pdf`)
        link.click()
        window.URL.revokeObjectURL(url)
      })
  }

  if (post.file && typeof post.file === 'object') {
    let reader = new FileReader()
    reader.onloadend = () => {
      setPreviewURL(reader.result)
    }
    reader.readAsDataURL(post.file)
  }
  const spec = (li) => {
    return (
      <div key={li} style={{ lineHeight: '2.3rem', fontSize: '1.3rem' }}>
        {'\u2022 ' + li}
      </div>
    )
  }
  if (typeof post.description === 'string') {
    return (
      <div className="CareerBlock" key={post.id}>
        <div className="d-flex p-3 shadow">
          <img src={previewURL ? previewURL : eesa} alt="eesa" className="eesa img-fluid col-7" />
          <div className="col-5 d-flex flex-column justify-content-center align-items-center">
            <h2 className="d-flex justify-content-center align-items-center">
              <nobr>{post.type === 'both' ? 'intern+fulltime' : post.type}</nobr>
            </h2>
          </div>
        </div>
        <hr></hr>
        <div className="careercontent">
          <h3 style={{ fontWeight: '600' }}>
            {post.companyName} 徵 {post.workType}
          </h3>
          <h3 style={{ margin: '1rem 0rem', fontWeight: '600', color: 'red' }}>$ {post.salary}</h3>
          {post.diploma && (
            <>
              <h4 style={{ fontWeight: '600', margin: '1.3rem 0 0.1rem' }}>要求學歷：</h4>
              <h5 style={{ lineHeight: '2.5rem', fontSize: '1.3rem' }}>{post.diploma}</h5>
            </>
          )}
          {!isExpand && <button onClick={() => setIsExpand(true)}>Show more...</button>}
          {isExpand && (
            <>
              {experience.length !== 0 && experience[0] !== '' && (
                <>
                  <h4 style={{ fontWeight: '600', margin: '1.3rem 0 0.1rem' }}>工作經驗限制：</h4>
                  <h5>{experience.map((exp) => spec(exp))}</h5>
                </>
              )}
              {requirement.length !== 0 && requirement[0] !== '' && (
                <>
                  <h4 style={{ fontWeight: '600', margin: '1.3rem 0 0.1rem' }}>要求條件：</h4>
                  <h5>{requirement.map((req) => spec(req))}</h5>
                </>
              )}
              {post.description && (
                <>
                  <h4 style={{ fontWeight: '600', margin: '1.3rem 0 0.1rem' }}>說明：</h4>
                  <FormattedText text={post.description} />
                </>
              )}
              <button onClick={() => setIsExpand(false)}>Show less...</button>
            </>
          )}
        </div>
      </div>
    )
  } else {
    return (
      <div className="CareerBlock" key={post.id}>
        <div className="d-flex p-3">
          <img src={previewURL ? previewURL : eesa} alt="eesa" className="eesa img-fluid col-7" />
          <div className="col-4 d-flex flex-column justify-content-center align-items-center text-primary">
            <h5 className="d-flex justify-content-center align-items-center text-primary">
              {post.type === 'both' ? 'intern+fulltime' : post.type}
            </h5>
          </div>
        </div>
        <hr></hr>
        <div className="careercontent">
          <h4>
            {post.name} asking for <nobr>{post.desireWorkType}</nobr>
          </h4>
          <div style={{ fontSize: '1.39rem' }}>
            {post.diploma && post.diploma !== 'undefined' && (
              <span style={{ color: 'red', fontWeight: '500' }}>{post.diploma} |</span>
            )}{' '}
            {post.contact && post.contact !== 'undefined' && <nobr>{post.contact} |</nobr>}{' '}
            {post.email && <nobr>{post.email}</nobr>}
          </div>
          {!isExpand && <button onClick={() => setIsExpand(true)}>Show more...</button>}
          {isExpand && (
            <>
              {experience.length !== 0 && experience[0] !== '' && (
                <>
                  <h4 style={{ margin: '1.3rem 0 0.1rem' }}>個人簡歷：</h4>
                  <h5>{experience.map((exp) => spec(exp))}</h5>
                </>
              )}
              {experience.length !== 0 && experience[0] !== '' && (
                <>
                  <h4 style={{ margin: '1rem 0 0.1rem' }}>專業技能：</h4>
                  <h5>{requirement.map((speci) => spec(speci))}</h5>
                </>
              )}
              {resumeURL && (
                <h3>
                  <CButton color="success" className="text-white" onClick={handleDownload}>
                    Download Resume
                  </CButton>
                </h3>
              )}
              <button onClick={() => setIsExpand(false)}>Show less...</button>
            </>
          )}
        </div>
      </div>
    )
  }
}
CareerPreview.propTypes = {
  post: PropTypes.object,
  experience: PropTypes.array,
  requirement: PropTypes.array,
  resumeURL: PropTypes.string,
}

export default CareerPreview
