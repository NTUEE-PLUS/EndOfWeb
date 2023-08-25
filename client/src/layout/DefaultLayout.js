import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectLogin } from '../slices/loginSlice'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react'

const DefaultLayout = () => {
  const pathname = useLocation().pathname.split('/')[1]
  const { isLogin } = useSelector(selectLogin)
  const noModal = ['forget', 'register_entry', 'reset_password', 'change_password']
  const [isModal, setIsModal] = useState(false)
  useEffect(() => {
    setIsModal(!noModal.includes(pathname) && isLogin)
  }, [isLogin])
  return (
    <>
      <CModal size="l" visible={isModal} onDismiss={() => setIsModal(false)} alignment="center">
        <CModalHeader onDismiss={() => setIsModal(false)}>
          <CModalTitle>注意！</CModalTitle>
        </CModalHeader>
        <CModalBody>
          為了資安的考量，請您先至<a href="/change_password">此網址</a>更改密碼。
        </CModalBody>
        <CModalFooter>
          <CButton
            color="warning"
            onClick={() => {
              setIsModal(false)
            }}
          >
            我更改過密碼了！
          </CButton>
          <CButton
            color="primary"
            onClick={() => {
              setIsModal(false)
            }}
          >
            我是新註冊的帳號！
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
