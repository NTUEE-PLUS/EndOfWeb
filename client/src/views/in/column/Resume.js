/* eslint-disable react/prop-types */
import React from 'react'
import { FormattedText } from './index'
const Resume = ({ data }) => {
  const getSubSections = (bigsection) => {
    const subSections = bigsection.bigsections.map((bigsection) => {
      return (
        <div key={bigsection.subtitle}>
          <h3>{bigsection.subtitle}</h3>
          <FormattedText text={bigsection.subsection} />
        </div>
      )
    })
    return subSections
  }
  const bigSections = data.body.map((bigsection) => {
    return (
      <div className="row education" key={bigsection.bigtitle}>
        <div className="three columns header-col">
          <h1 align="center" style={{ lineHeight: '2.6rem' }}>
            <span>{bigsection.bigtitle}</span>
          </h1>
        </div>
        <div className="nine columns main-col">
          <div className="row item">
            <div className="twelve columns">{getSubSections(bigsection)}</div>
          </div>
        </div>
      </div>
    )
  })
  return <section id="resume">{bigSections}</section>
}

export default Resume
