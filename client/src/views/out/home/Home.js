/* eslint-disable prettier/prettier */
import React from 'react'
import Dashboard from '../../dashboard/Dashboard'
import About from '../about/About'
import Contact from '../contact/Contact'
import History from '../history/History'
import Support from '../support/Support'
import Team from '../team/Team'

const Home = () => {
  return (
    <div>
      <h2 id="dashboard">Dashboard</h2>
      <Dashboard />
      <h2 id="about">About Us</h2>
      <About />
      <h2 id="contact">Contact</h2>
      <Contact />
      <h2 id="history">History</h2>
      <History />
      <h2 id="support">Support Us</h2>
      <Support />
      <h2 id="team">Our Team</h2>
      <Team />
      <h2 id="here1">1 in here</h2>
      <div style={{ height: '40px' }}></div>
      <h2 id="here2">2 in here</h2>
      <div style={{ height: '80px' }}></div>
      <a href="#here1">go to 1</a>
      <div style={{ height: '40px' }}></div>
      <a href="#here2">go to 2</a>
    </div>
  )
}

export default Home
