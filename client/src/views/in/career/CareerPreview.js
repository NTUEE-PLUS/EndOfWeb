/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CButton } from '@coreui/react'
import { eesa } from './index'
import parser from 'html-react-parser'
import { urlsToLinks } from './index'

const CareerPreview = ({ post, experience, requirement, resumeURL }) => {
  console.log('post:', post)
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
      <div key={li} style={{ lineHeight: '2.5rem', fontSize: '1.6rem' }}>
        {'\u2022 ' + li}
      </div>
    )
  }
  if (typeof post.description === 'string') {
    return (
      <div className="CareerBlock" key={post.id}>
        <div className="d-flex p-3">
          <img src={previewURL ? previewURL : eesa} alt="eesa" className="eesa img-fluid col-4" />
          <div className="col-7 d-flex flex-column justify-content-center align-items-center">
            <h5 className="d-flex justify-content-center align-items-center text-primary">
              {post.type === 'both' ? 'intern+fulltime' : post.type}
            </h5>
            <h3 className="d-flex justify-content-center align-items-center text-primary">
              {post.companyName} 徵 {post.workType}
            </h3>
          </div>
        </div>
        <hr></hr>
        <div className="careercontent">
          <h3 style={{ fontWeight: '600' }}>{post.title}</h3>
          <h2 style={{ margin: '1rem 0rem', fontWeight: '600', color: 'red' }}>{post.salary}</h2>
          <h3 style={{ fontWeight: '600', margin: '1.3rem 0 0.1rem' }}>要求學歷：</h3>
          <h4 style={{ lineHeight: '2.5rem', fontSize: '1.6rem' }}>{post.diploma}</h4>
          {!isExpand && <button onClick={() => setIsExpand(true)}>Show more...</button>}
          {isExpand && (
            <>
              <h3 style={{ fontWeight: '600', margin: '1.3rem 0 0.1rem' }}>工作經驗限制：</h3>
              <h4>{experience.map((exp) => spec(exp))}</h4>
              <h3 style={{ fontWeight: '600', margin: '1.3rem 0 0.1rem' }}>要求條件：</h3>
              <h4>{requirement.map((req) => spec(req))}</h4>
              <h3 style={{ fontWeight: '600', margin: '1.3rem 0 0.1rem' }}>說明：</h3>
              <h4>{parser(urlsToLinks(post.description))}</h4>
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
          <img src={previewURL ? previewURL : eesa} alt="eesa" className="eesa img-fluid col-4" />
          <div className="col-7 d-flex flex-column justify-content-center align-items-center text-primary">
            <h5 className="d-flex justify-content-center align-items-center">
              {post.type === 'both' ? 'intern+fulltime' : post.type}
            </h5>
            <h3 className="d-flex justify-content-center align-items-center">{post.title}</h3>
          </div>
        </div>
        <hr></hr>
        <div className="careercontent">
          <h3>
            {post.name} asking for <nobr>{post.desireWorkType}</nobr>
          </h3>
          <div style={{ fontSize: '1.39rem' }}>
            <span style={{ color: 'red', fontWeight: '500' }}>{post.diploma}</span> |{' '}
            <nobr>{post.contact}</nobr> | <nobr>{post.email}</nobr>
          </div>
          {!isExpand && <button onClick={() => setIsExpand(true)}>Show more...</button>}
          {isExpand && (
            <>
              <h3 style={{ margin: '1.3rem 0 0.1rem' }}>個人簡歷：</h3>
              <h4>{experience.map((exp) => spec(exp))}</h4>
              <h3 style={{ margin: '1rem 0 0.1rem' }}>專業技能：</h3>
              <h4>{requirement.map((speci) => spec(speci))}</h4>
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
