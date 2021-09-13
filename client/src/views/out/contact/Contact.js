/* eslint-disable prettier/prettier */
import { CCol, CContainer, CRow } from '@coreui/react'
import React, { useState } from 'react'
import FBQRcode from '../../../assets/images/FBQRcode.png'
import IGQRcode from '../../../assets/images/IGQRcode.png'
import GithubQRcode from '../../../assets/images/GithubQRcode.png'
import emailjs from 'emailjs-com'

const initialState = {
  name: '',
  email: '',
  message: '',
}
const Contact = () => {
  const [{ name, email, message }, setState] = useState(initialState)

  const handleChange = (e) => {
    const { name, value } = e.target
    setState((prevState) => ({ ...prevState, [name]: value }))
  }
  const clearState = () => setState({ ...initialState })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name, email, message)
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_USER_ID').then(
      (result) => {
        console.log(result.text)
        clearState()
      },
      (error) => {
        console.log(error.text)
      },
    )
  }
  return (
    <div>
      <div id="contact">
        <div className="container row">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>Get In Touch</h2>
                <p>
                  Please fill out the form below to send us an email and we will get back to you as
                  soon as possible.
                </p>
              </div>
              <form name="sentMessage" validate onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        required
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        required
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    rows="4"
                    placeholder="Message"
                    required
                    onChange={handleChange}
                  ></textarea>
                  <p className="help-block text-danger"></p>
                </div>
                <div id="success"></div>
                <button type="submit" className="btn btn-custom btn-lg">
                  Send Message
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-4 col-md-offset-1 contact-info">
            <div className="contact-item">
              <h3>Contact Info</h3>
              <p>
                <span>
                  <i className="bi bi-alarm"></i> Address
                </span>
                4321 California St, San Francisco, CA 12345
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="bi bi-alarm"></i> Phone
                </span>{' '}
                +1 123 456 1234
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="bi bi-alarm"></i> Email
                </span>{' '}
                info@company.com
              </p>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row" style={{ color: 'white' }}>
              <div className="social">
                <ul>
                  <li>
                    <a href="https://www.facebook.com/groups/ntueeplus">
                      <i className="bi bi-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/ntueeplus/">
                      <i className="bi bi-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/NTUEE-PLUS/EndOfWeb/">
                      <i className="bi bi-github"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
