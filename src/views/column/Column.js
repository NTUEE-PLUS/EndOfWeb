import React, { useState } from 'react'
import Title from './Title'
import Resume from './Resume'
import Testimonials from './Testimonials'
import './css/default.css'
import './css/layout.css'
const resumeData = require('./resumeData.json')

// export default App;
const App = () => {
  return (
    <div className="App">
      <Title data={resumeData.main} />
      <Resume data={resumeData.resume} />
      <Testimonials data={resumeData.testimonials} />
    </div>
  )
}

export default App
