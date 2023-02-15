/* eslint-disable react/prop-types */
import React from 'react'

const Testimonials = ({ data }) => {
  console.log(data)
  const annotations = data.annotation.map((annotation) => {
    return (
      <li key={annotation.contributor}>
        <blockquote>
          <p>{annotation.job}</p>
          <cite>{annotation.contributor}</cite>
        </blockquote>
      </li>
    )
  })
  return (
    <section id="testimonials">
      <div className="text-container">
        <div className="row">
          <div className="ten columns flex-container">
            <ul className="slides">{annotations}</ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
