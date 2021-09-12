/* eslint-disable prettier/prettier */
import React from 'react'

const Header = () => {
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>
                  We are a landing page
                  <span></span>
                </h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, corporis.
                  Excepturi, porro libero ab consequuntur facilis suscipit ea ratione, illo a sit
                  vel quo esse delectus et rerum.
                </p>
                <a href="#features" className="btn btn-custom btn-lg page-scroll">
                  Learn More
                </a>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
