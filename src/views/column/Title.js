/* eslint-disable react/prop-types */
import React from 'react'

const Title = ({ data }) => {
  if (data) {
    var name = data.name
    var description = data.description
  }
  return (
    <header id="home">
      <div className="row banner">
        <div className="banner-text">
          <h1 className="responsive-headline">{name}</h1>
          <h3>{description}.</h3>
          <hr />
        </div>
      </div>
    </header>
  )
}

export default Title
