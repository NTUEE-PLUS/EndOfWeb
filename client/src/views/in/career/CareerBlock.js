import React, { useState } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { CButton, CAvatar } from '@coreui/react'
import { eesa } from './index'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import parser from 'html-react-parser'
import { urlsToLinks } from './index'

const CareerBlock = ({ post, isAuth }) => {
  const location = useLocation()
  const history = useHistory()
  const recru = location.pathname.search('cruitment') > 0 ? true : false
  const recom = location.pathname.search('commendation') > 0 ? true : false
  const own = location.pathname.search('own') > 0 ? true : false
  const [isExpand, setIsExpand] = useState(false)
  const deleteCareer = (id) => {
    if (recru) {
      axios
        .delete('/api/deleteRecruitment', { data: { _id: id } })
        .then((res) => {
          alert('delete ' + res.data.data)
          history.go(0)
        })
        .catch((err) => {
          err.response.data.description && alert('錯誤\n' + err.response.data.description)
        })
    } else if (recom) {
      axios
        .delete('/api/recommendation', { data: { _id: id } })
        .then((res) => {
          alert('delete ' + res.data.title)
          history.go(0)
        })
        .catch((err) => {
          err.response.data.description && alert('錯誤\n' + err.response.data.description)
        })
    }
  }
  const handleDownload = (fileURL) => {
    fetch(fileURL)
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
  const spec = (li) => {
    return (
      <div key={li} className="my-2" style={{ lineHeight: '2.5rem', fontSize: '1.6rem' }}>
        {'\u2022 ' + li}
      </div>
    )
  }
  return recru
    ? post && (
        <div className="CareerBlock" key={post._id}>
          <Link to={`/profile/${post.account}`}>
            <div className="d-flex p-3 shadow">
              <img
                src={post.image ? post.image : eesa}
                alt="eesa"
                className="eesa img-fluid col-4"
              />
              <div className="col-7 d-flex flex-column justify-content-center align-items-center">
                {post.title.title ? (
                  <>
                    <h5 className="col-7 d-flex justify-content-center align-items-center">
                      <nobr>
                        {post.title.type === 'both' ? 'intern+fulltime' : post.title.type}
                      </nobr>
                    </h5>
                    <h2 className="d-flex justify-content-center align-items-center px-3">
                      {post.title.title} <br />
                    </h2>
                  </>
                ) : (
                  <h2 className="col-7 d-flex justify-content-center align-items-center">
                    <nobr>{post.title.type === 'both' ? 'intern+fulltime' : post.title.type}</nobr>
                  </h2>
                )}
              </div>
            </div>
          </Link>
          <hr></hr>
          <div className="careercontent">
            <h3 style={{ fontWeight: '600' }}>
              <nobr>{post.title.company_name}</nobr> 徵 <nobr>{post.title.work_type}</nobr>
              {own || isAuth ? (
                <>
                  <Link to={`/edit_recruitment/${post._id}`}>
                    <CIcon
                      icon="cil-pencil"
                      name="cil-pencil"
                      style={{ scale: '1.7', marginLeft: '1rem' }}
                    ></CIcon>
                  </Link>
                  <CAvatar className="hover-pointer">
                    <CIcon
                      icon="cil-trash"
                      name="cil-trash"
                      style={{ scale: '1.7' }}
                      onClick={() => deleteCareer(post._id)}
                    ></CIcon>
                  </CAvatar>
                </>
              ) : (
                <></>
              )}
            </h3>
            <h2 style={{ margin: '1rem 0rem', fontWeight: '600', color: 'red' }}>
              $ {post.info.salary}
            </h2>
            <h3 style={{ fontWeight: '600', margin: '1.3rem 0 0.1rem' }}>要求學歷：</h3>
            <div style={{ lineHeight: '2.5rem', fontSize: '1.6rem' }}>{post.info.diploma}</div>
            {!isExpand && <button onClick={() => setIsExpand(true)}>Show more...</button>}
            {isExpand && (
              <>
                <h3 style={{ fontWeight: '600', margin: '1.3rem 0 0.1rem' }}>工作經驗限制：</h3>
                <h4>{post.info.experience.map((exp) => spec(exp))}</h4>
                <h3 style={{ fontWeight: '600', margin: '1.3rem 0 0.1rem' }}>要求條件：</h3>
                <h4>{post.spec.requirement.map((req) => spec(req))}</h4>
                <h3 style={{ fontWeight: '600', margin: '1rem 0 0.1rem' }}>說明：</h3>
                <h4>{parser(urlsToLinks(post.spec.description))}</h4>
                <button onClick={() => setIsExpand(false)}>Show less...</button>
              </>
            )}
          </div>
        </div>
      )
    : post && (
        <div className="CareerBlock" key={post._id}>
          <Link to={`/profile/${post.account}`}>
            <div className="d-flex p-3">
              <img
                src={post.image ? post.image : eesa}
                alt="eesa"
                className="eesa img-fluid col-4"
              />
              <div className="col-7 d-flex flex-column justify-content-center align-items-center">
                {post.title.title ? (
                  <>
                    <h5 className="col-7 d-flex justify-content-center align-items-center">
                      <nobr>
                        {post.title.type === 'both' ? 'intern+fulltime' : post.title.type}
                      </nobr>
                    </h5>
                    <h3 className="col-7 d-flex justify-content-center align-items-center">
                      {post.title.title}
                    </h3>
                  </>
                ) : (
                  <h2 className="col-7 d-flex justify-content-center align-items-center">
                    <nobr>{post.title.type === 'both' ? 'intern+fulltime' : post.title.type}</nobr>
                  </h2>
                )}
              </div>
            </div>
          </Link>
          <hr></hr>
          <div className="careercontent">
            <h3>
              {post.title.name} 求內推 <nobr>{post.title.desire_work_type}</nobr>
              {own || isAuth ? (
                <>
                  <Link to={`/edit_recommendation/${post._id}`}>
                    <CIcon
                      icon="cil-pencil"
                      name="cil-pencil"
                      style={{ scale: '1.7', marginLeft: '1rem' }}
                    ></CIcon>
                  </Link>
                  <CAvatar className="hover-pointer">
                    <CIcon
                      icon="cil-trash"
                      name="cil-trash"
                      style={{ scale: '1.7', marginLeft: '1rem' }}
                      onClick={() => deleteCareer(post._id)}
                    ></CIcon>
                  </CAvatar>
                </>
              ) : (
                <></>
              )}
            </h3>
            <div style={{ fontSize: '1.39rem' }}>
              <span style={{ color: 'red', fontWeight: '500' }}>{post.info.diploma}</span> |{' '}
              <nobr>{post.info.contact}</nobr> | <nobr>{post.info.email}</nobr>
            </div>
            {!isExpand && <button onClick={() => setIsExpand(true)}>Show more...</button>}
            {isExpand && (
              <>
                <h3 className="mt-4 mb-2">個人簡歷：</h3>
                <h4>{post.spec.experience.map((exp) => spec(exp))}</h4>
                <h3 className="mt-4 mb-2">專業技能：</h3>
                <h4>{post.spec.speciality.map((speci) => spec(speci))}</h4>
                {post.resume && (
                  <h3 className="mt-3">
                    <CButton
                      color="success"
                      className="text-white"
                      onClick={() => handleDownload(post.resume)}
                    >
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
CareerBlock.propTypes = {
  post: PropTypes.object,
  isAuth: PropTypes.bool,
}
export default CareerBlock
