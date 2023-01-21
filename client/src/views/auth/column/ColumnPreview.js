/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CWidgetBrand } from '@coreui/react'
import { eesa } from './index'
import parser from 'html-react-parser'

const ColumnPreview = ({ post, hashtags, anno, exp, edu, intro }) => {
  const [isExpand, setIsExpand] = useState(false)
  const [previewURL, setPreviewURL] = useState(post.file)
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
        {li}
      </div>
    )
  }
  if (typeof post.description === 'string') {
    return (
      <div className="columnBlock" key={post.id}>
        <CWidgetBrand
          className="pt-4 widgetbrand"
          headerChildren={
            <img className="eesa img-fluid" src={previewURL ? previewURL : eesa} alt="eesa" />
          }
          values={post.title}
        />
        <hr></hr>
        <div className="columnContent">
          <h3 style={{ fontWeight: '600' }}>{post.title}</h3>
          <h2 style={{ margin: '1rem 0rem', fontWeight: '600', color: 'red' }}>{post.salary}</h2>
          {!isExpand && <button onClick={() => setIsExpand(true)}>Show more...</button>}
          {isExpand && (
            <>
              {hashtags.map((hashtag) => spec(hashtag))}
              {anno.map((anno) => spec(anno))}
              {exp.map((exp) => spec(exp))}
              {edu.map((edu) => spec(edu))}
              {intro.map((intro) => spec(intro))}
              <button onClick={() => setIsExpand(false)}>Show less...</button>
            </>
          )}
        </div>
      </div>
    )
  } else {
    return (
      <div className="columnBlock" key={post.id}>
        <CWidgetBrand
          className="pt-4 widgetbrand"
          headerChildren={
            <img className="eesa img-fluid" src={previewURL ? previewURL : eesa} alt="eesa" />
          }
          values={[[post.title]]}
        />
        <hr></hr>
        <div className="columnContent">
          <h1>
            {post.name} {post.experience}
          </h1>
          <div style={{ fontSize: '1.39rem' }}>
            <span style={{ color: 'blue', fontWeight: '500' }}>{post.date}</span>
          </div>
          {!isExpand && <button onClick={() => setIsExpand(true)}>Show more...</button>}
          {isExpand && (
            <>
              <h3 style={{ margin: '1.3rem 0 0.1rem' }}>Hashtag:</h3>
              {hashtags.map((hashtag) => spec(hashtag))}
              <h3 style={{ margin: '1.3rem 0 0.1rem' }}>採訪人員:</h3>
              {anno.map((anno) => spec(anno))}
              <h3 style={{ margin: '1.3rem 0 0.1rem' }}>職位:</h3>
              {exp.map((exp) => spec(exp))}
              <h3 style={{ margin: '1.3rem 0 0.1rem' }}>學歷:</h3>
              {edu.map((edu) => spec(edu))}
              <h3 style={{ margin: '1.3rem 0 0.1rem' }}>簡介:</h3>
              {intro.map((intro) => spec(intro))}
              <button onClick={() => setIsExpand(false)}>Show less...</button>
            </>
          )}
        </div>
      </div>
    )
  }
}
ColumnPreview.propTypes = {
  post: PropTypes.object,
  requirement: PropTypes.array,
}

export default ColumnPreview
