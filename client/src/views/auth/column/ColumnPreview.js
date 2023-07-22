import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CButton, CWidgetBrand } from '@coreui/react'
import { Column_Background } from './index'
import { eesa } from './index'

const ColumnPreview = ({ post, annotation, title, body, anno, exp, edu, intro }) => {
  const [isExpand, setIsExpand] = useState(false)
  const [previewURL, setPreviewURL] = useState(post.file)
  if (post.file && typeof post.file === 'object') {
    let reader = new FileReader()
    reader.onloadend = () => {
      setPreviewURL(reader.result)
    }
    reader.readAsDataURL(post.file)
  }
  const titles = (title) => {
    return (
      <h3 style={{ margin: '1.3rem 0 0.1rem' }} key={title}>
        {title}
      </h3>
    )
  }
  const subtitle = (subtitle) => {
    return (
      <h4 style={{ margin: '1.3rem 0 0.1rem' }} key={subtitle}>
        &nbsp;&nbsp;{subtitle}
      </h4>
    )
  }
  const section = (section) => {
    return (
      <div style={{ margin: '1rem 0', fontSize: '1.5rem' }} key={section}>
        &nbsp;&nbsp;&nbsp;&nbsp;{section}
      </div>
    )
  }
  const content = (li) => {
    return (
      <div key={li} style={{ fontSize: '1rem' }}>
        &nbsp;&nbsp;&nbsp;&nbsp;{li}
      </div>
    )
  }
  return (
    <div className="columnBlock" key={post.id}>
      <CWidgetBrand
        className="pt-4 widgetbrand"
        headerChildren={
          <img
            className="eesa img-fluid"
            src={previewURL ? previewURL : Column_Background}
            alt="column_image"
          />
        }
        values={[[title]]}
      />
      <hr />
      <div className="columnContent">
        <h2 style={{ textAlign: 'center' }}>
          {post.name}
          {post.experience}
        </h2>
        <div style={{ fontSize: '1.39rem', textAlign: 'center' }}>
          <span style={{ color: 'blue', fontWeight: '500' }}>{post.date}</span>
        </div>
        {!isExpand && <CButton onClick={() => setIsExpand(true)}>Show more...</CButton>}
        {isExpand && (
          <>
            {titles('標籤')}
            {post.hashtags.split('、').map((hashtag) => section(`#${hashtag}`))}
            <br />
            {titles('工作人員')}
            {annotation.map((annotation) =>
              section(`${annotation.job}: ${annotation.contributor}`),
            )}
            <br />
            {titles('採訪人員')}
            {anno.map((anno) => section(anno))}
            <br />
            {titles('職位')}
            {exp.map((exp) => section(exp))}
            <br />
            {titles('學歷')}
            {edu.map((edu) => section(edu))}
            <br />
            {titles('簡介')}
            {intro.map((intro) => section(intro))}
            <br />
            {titles('內容')}
            {body.map((body, bodyIdx) => (
              <div key={bodyIdx}>
                {subtitle(body.bigtitle)}
                {body.bigsections.map((bigsection, sectionIdx) => (
                  <div key={sectionIdx}>
                    <h3>{bigsection.subtitle}</h3>
                    <FormattedText text={bigsection.subsection} />
                  </div>
                ))}
              </div>
            ))}
            <br />
            <CButton onClick={() => setIsExpand(false)}>Show less...</CButton>
          </>
        )}
      </div>
    </div>
  )
}
ColumnPreview.propTypes = {
  post: PropTypes.object,
  requirement: PropTypes.array,
}

export default ColumnPreview
