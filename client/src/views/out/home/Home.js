/* eslint-disable prettier/prettier */
import React from 'react'
import Dashboard from '../../dashboard/Dashboard'
import About from '../about/About'
import Contact from '../contact/Contact'
import History from '../history/History'
import Team from '../team/Team'
import Services from '../services/Services'
import Feature from '../features/Features'
import Interviews from '../interviews/Interviews'
import Header from '../header/Header'

const Home = () => {
  return (
    <div
      className="landing"
      style={{ color: 'white', justifyContent: 'center', alignItems: 'center' }}
    >
      <Header />
      <Feature />
      <About />
      <Services />
      <Interviews />
      <History />
      <Team />
      <Contact />
    </div>
  )
}

export default Home
