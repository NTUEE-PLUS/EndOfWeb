/* eslint-disable react/prop-types */
import React from 'react'
import background from '../../../assets/images/background.png'

const Testimonials = ({ data }) => {
  const annotations = data.annotation.map((annotation) => {
    return (
      <li key={annotation.contributor}>
        <blockquote>
          <p style={{ color: 'black' }}>{annotation.job}</p>
          <cite style={{ color: 'black' }}>{annotation.contributor}</cite>
        </blockquote>
      </li>
    )
  })
  return (
    <section id="testimonials">
      <div
        className="text-container"
        style={{
          backgroundImage: `url(${background})`,
          backgroundPosition: 'bottom',
          backgroundSize: 'cover',
        }}
      >
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
