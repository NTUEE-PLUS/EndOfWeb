import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react'

const DefaultLayout = () => {
  const pathname = useLocation().pathname
  const [isModal, setIsModal] = useState(pathname !== '/forget' && pathname !== '/register_entry')
  return (
    <>
      <CModal size="l" visible={isModal} onDismiss={() => setIsModal(false)} alignment="center">
        <CModalHeader onDismiss={() => setIsModal(false)}>
          <CModalTitle>注意！</CModalTitle>
        </CModalHeader>
        <CModalBody>
          為了資安的考量，請您先至<a href="/forget">此網址</a>更改密碼！
        </CModalBody>
        <CModalFooter>
          <CButton
            color="warning"
            onClick={() => {
              setIsModal(false)
            }}
          >
            我已經更改過密碼了！
          </CButton>
          <CButton
            color="success"
            onClick={() => {
              setIsModal(false)
              window.location.href = '/register_entry'
            }}
          >
            我是要來註冊的！
          </CButton>
        </CModalFooter>
      </CModal>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100">
          <AppHeader />
          <div className="body flex-grow-1 flex-column px-3">
            <AppContent />
          </div>
        </div>
        <div className="wrapper d-flex flex-column">
          <AppFooter />
        </div>
      </div>
    </>
  )
}

export default DefaultLayout
