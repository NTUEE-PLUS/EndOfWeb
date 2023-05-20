/* eslint-disable react/prop-types */
import React from 'react'
import background from '../../../assets/images/background.png'

const Testimonials = ({ data }) => {
  return (
    <section id="testimonials">
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundPosition: 'bottom',
          backgroundSize: 'cover',
          padding: '8rem 0',
        }}
      >
        <div className="row">
          <div className="ten columns flex-container">
            <ul className="slides">
              {data.annotation.map((annotation) => {
                return (
                  <li key={annotation.contributor}>
                    <blockquote>
                      <p className="text-dark">{annotation.job}</p>
                      <cite className="text-dark">{annotation.contributor}</cite>
                    </blockquote>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
