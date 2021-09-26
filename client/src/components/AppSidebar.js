import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectLogin } from '../slices/loginSlice'
import { selectGlobal, sidebarHide } from '../slices/globalSlice'
import { CSidebar, CSidebarBrand, CSidebarNav, CImage, CCreateNavItem } from '@coreui/react'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navOut from '../_navOut'
import navIn from '../_navIn'

//sidebar top icon
import logo_row from '../assets/images/logo_row.png'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const { isLogin } = useSelector(selectLogin)
  const { sidebarShow, unfoldable } = useSelector(selectGlobal)
  const chNav = () => {
    if (isLogin) return [...navIn, ...navOut]
    else return navOut
  }
  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      className="bg-white"
      onVisibleChange={(visible) => (visible ? dispatch(sidebarShow()) : dispatch(sidebarHide()))}
    >
      <CSidebarBrand className="d-none d-md-flex pt-1 bg-white text-dark" to="/">
        <CImage src={logo_row} width="80%" />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <CCreateNavItem items={chNav()} />
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
